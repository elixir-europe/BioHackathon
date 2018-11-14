/**
 * Created by rolando on 02/08/2018.
 */
const Promise = require('bluebird');
const NoUuidError = require('../../utils/ingest-client/ingest-client-exceptions').NoUuidError;
const ValidationReport = require('../../model/validation-report');

class NoCloudUrl extends Error {}
class NotEligibleForValidation extends Error {}

class DocumentUpdateHandler {
    constructor(validator, ingestClient) {
        this.validator = validator;
        this.ingestClient = ingestClient;
    }

    handle(msg) {
        const msgJson = JSON.parse(msg.content);

        const callbackLink = msgJson['callbackLink'];
        const documentUrl = this.ingestClient.urlForCallbackLink(callbackLink);
        const documentType = msgJson['documentType'].toUpperCase();

        return new Promise((resolve, reject) => {
            this.ingestClient.getMetadataDocument(documentUrl)
                .then(doc => {return this.checkElegibleForValidation(doc)})
                .then(doc => {return this.checkForCloudUrl(doc, documentType)})
                .then(doc => {return this.signalValidationStarted(doc)})
                .then(doc => {return this.validator.validate(doc, documentType)})
                .then(validationReport => {return this.ingestClient.postValidationReport(documentUrl, validationReport)})
                .then(resp => resolve(resp))
                .catch(NotEligibleForValidation, err => console.info("Document at " + documentUrl + " not eligible for validation, ignoring.."))
                .catch(NoCloudUrl, err => console.info("File document at " + documentUrl + " has no cloudUrl, ignoring.."))
                .catch(NoUuidError, err => console.info("Document at " + documentUrl + " has no uuid, ignoring..."))
                .catch(err => reject(err));
        });

    }

    /**
     * check if the document is a File and if so does an existence check for an assigned cloudUrl.
     * returns/resolves the document in question if it passes the check, else throws/rejects-with an exception
     *
     * @param document
     * @param documentType
     */
    checkForCloudUrl(document, documentType) {
        return new Promise((resolve, reject) => {
            if(documentType === 'FILE' && !document['cloudUrl']) {
                reject(new NoCloudUrl());
            } else {
                resolve(document);
            }
        });
    }

    /**
     *
     * Eligible if document is in DRAFT
     *
     * @param document
     * @param documentType
     */
    checkElegibleForValidation(document) {
        if(document['validationState'].toUpperCase() === 'DRAFT') {
            return Promise.resolve(document);
        } else {
            return Promise.reject(new NotEligibleForValidation());
        }
    }

    signalValidationStarted(document) {
        const documentUrl = this.ingestClient.selfLinkForResource(document);
        return this.ingestClient.postValidationReport(documentUrl, ValidationReport.validatingReport());
    }
}

module.exports = DocumentUpdateHandler;