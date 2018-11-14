/**
 * Created by rolando on 08/08/2018.
 */
const Promise = require('bluebird');
const R = require('rambda');

const NoDescribedBy = require('./ingest-validation-exceptions').NoDescribedBy;
const NoFileValidationJob = require('./ingest-validation-exceptions').NoFileValidationJob;

const ErrorReport = require('../model/error-report');
const ValidationReport = require('../model/validation-report');

/**
 *
 * Wraps the generic validator, outputs errors in custom format.
 * Assumes documents have a describedBy
 *
 */
class IngestValidator {
    constructor(schemaValidator, fileValidator, ingestClient) {
        this.schemaValidator = schemaValidator;
        this.fileValidator = fileValidator;
        this.ingestClient = ingestClient;
        this.schemaCache = {};
    }

    validate(document, documentType) {
        const documentContent = document["content"];
        if(! documentContent["describedBy"]) {
            return Promise.reject(new NoDescribedBy("describedBy is a required field"));
        } else {
            let schemaUri = documentContent["describedBy"];

            return this.getSchema(schemaUri)
                .then(schema => {return this.insertSchemaId(schema)})
                .then(schema => {return this.schemaValidator.validateSingleSchema(schema, documentContent)})
                .then(valErrors => {return this.parseValidationErrors(valErrors)})
                .then(parsedErrors => {return this.generateValidationReport(parsedErrors)})
                .then(report => {return this.attemptFileValidation(report, document, documentType)})
        }
    }

    getSchema(schemaUri) {
        if(! this.schemaCache[schemaUri]) {
            return new Promise((resolve, reject) => {
                this.ingestClient.fetchSchema(schemaUri)
                    .then(schema => {
                        this.schemaCache[schemaUri] = schema;
                        resolve(schema);
                    })
                    .catch(err => {
                        reject(err);
                    })
            });
        } else {
            return Promise.resolve(this.schemaCache[schemaUri]);
        }
    }

    insertSchemaId(schema) {
        if(schema["id"]) {
            schema["$id"] = schema["id"];
        }
        return Promise.resolve(schema);
    }

    /**
     * Ingest error reports from ajvError objects
     * @param errors
     */
    parseValidationErrors(errors){
        return Promise.resolve(R.map(ajvErr => new ErrorReport(ajvErr), errors));
    }

    generateValidationReport(errors) {
        let report = null;

        if(errors.length > 0) {
            report = new ValidationReport("INVALID", errors);
        } else {
            report =  ValidationReport.okReport();
        }

        return Promise.resolve(report);
    }


    /**
     *
     * Only do file validation if schema validation passes for the resource and if
     * the resource is a file
     *
     * @param report
     * @param fileDocument
     * @param documentType
     *
     * @returns {Promise.<ValidationReport>}
     */
    attemptFileValidation(report, fileDocument, documentType) {
        if(documentType === 'FILE' && report.validationState === 'VALID') {
            const fileName = fileDocument['fileName'];
            const fileFormat = this.fileFormatFromFileName(fileName);

            return new Promise((resolve, reject) => {
                this.fileValidator.requestFileValidationJob(fileDocument, fileFormat, fileName)
                    .then(validationJobId => {
                        const fileValidatingReport = ValidationReport.validatingReport();
                        fileValidatingReport.validationJobId = validationJobId;
                        resolve(fileValidatingReport);
                    })
                    .catch(NoFileValidationJob, err => {
                        console.info("No matching validation image for file with file name " + fileName);
                        resolve(report);
                    }).catch(err => {
                        console.error("ERROR: error requesting file validation job " + err);
                        reject(err);
                    });
            });
        } else {
            return Promise.resolve(report); // just return original report if not eligible for file validation
        }
    }

    /**
     *  returns file extension given a file name, e.g
     *  given aaaabbbcc.fastq, returns fastq
     *  given aaabbbccc.fastq.gz, returns fastq.gz
     *  given aaaabbbccc.fastq.tar.gz, returns fastq.tar.gz
     *
     * @param fileName
     */
    fileFormatFromFileName(fileName) {
        const appendExtensions = (subExtension, subsequentSubExtension) => {
            if(subExtension === "") {
                return subsequentSubExtension;
            } else {
                return subExtension + '.' + subsequentSubExtension;
            }
        };

        const splitFilename = fileName.split('.');
        return R.reduce(appendExtensions, "", R.tail(splitFilename));
    }
}

module.exports = IngestValidator;