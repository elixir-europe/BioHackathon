let Ajv = require("ajv");
const logger = require("../winston");
let IsChildTermOf = require("../custom/ischildtermof");
let IsValidTerm = require("../custom/isvalidterm");
const ValidationError = require("../model/validation-error");
const AppError = require("../model/application-error");
let GraphRestriction = require("../custom/graph_restriction");

let ajv = new Ajv({allErrors: true});

//this is the addition needed for draft-04
// let ajv = new Ajv({allErrors: true, schemaId: 'id'});
// ajv.addMetaSchema(require('../../node_modules/ajv/lib/refs/json-schema-draft-04.json'));

let graphRestriction = new GraphRestriction(ajv)
let isChildTermOf = new IsChildTermOf(ajv);
let isValidTerm = new IsValidTerm(ajv);

function convertToValidationErrors(ajvErrorObjects) {
    let localErrors = [];
    ajvErrorObjects.forEach( (errorObject) => {
        let tempValError = new ValidationError(errorObject);
        let index = localErrors.findIndex(valError => (valError.dataPath === tempValError.dataPath));

        if(index !== -1) {
            localErrors[index].errors.push(tempValError.errors[0]);
        } else {
            localErrors.push(tempValError);
        }
    });
    return localErrors;
}

function validate(schemas, entity, rootSchemaId) {
    logger.log("silly", "Running validation...");


    return new Promise((resolve, reject) => {
        for (var s of schemas){
            if (!ajv.getSchema(s.$id)){
            // if (!ajv.getSchema(s.id)){
                ajv.addSchema(s);
            }
        }
        var validate = ajv.getSchema(rootSchemaId);
        Promise.resolve(validate(entity))
            .then((data) => {
                    if (validate.errors) {
                        logger.log("debug", ajv.errorsText(validate.errors, {dataVar: entity.alias}));
                        resolve(convertToValidationErrors(validate.errors));
                    } else {
                        resolve([]);
                    }
                }
            ).catch((err, errors) => {
            if (!(err instanceof Ajv.ValidationError)) {
                logger.log("error", "An error ocurred while running the validation.");
                reject(new AppError("An error ocurred while running the validation."));
            } else {
                logger.log("debug", ajv.errorsText(err.errors, {dataVar: entity.alias}));
                resolve(convertToValidationErrors(err.errors));
            }
        });
    });
}


module.exports = validate;
