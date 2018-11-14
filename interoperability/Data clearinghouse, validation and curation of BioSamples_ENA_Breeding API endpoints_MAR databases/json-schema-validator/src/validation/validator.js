let Ajv = require("ajv");
const logger = require("../winston");
let request = require("request-promise");
let IsChildTermOf = require("../custom/ischildtermof");
let IsValidTerm = require("../custom/isvalidterm");
const ValidationError = require("../model/validation-error");
const AppError = require("../model/application-error");
let GraphRestriction = require("../custom/graph_restriction");


let ajv = new Ajv({allErrors: true, schemaId: 'auto', loadSchema: loadSchemaRef});
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
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

const cachedSchemas = {};

function loadSchemaRef(uri) {
    if(cachedSchemas[uri]) {
        return Promise.resolve(cachedSchemas[uri]);
    } else {
        return new Promise((resolve, reject) => {
            request({
                method: "GET",
                url: uri,
                json: true
            }).then(resp => {
                const loadedSchema = resp;
                loadedSchema["$async"] = true;
                cachedSchemas[uri] = loadedSchema;
                resolve(loadedSchema);
            }).catch(err => {
                reject(err);
            });
        });
    }
}

module.exports = {
    validatorCache: {

    },
    validateSingleSchema: function(inputSchema, inputObject) {
        inputSchema["$async"] = true;
        const schemaId = inputSchema['$id'];
        logger.log("silly", "Running validation...");
        return new Promise((resolve, reject) => {

            let compiledSchemaPromise = null;
            if(this.validatorCache[schemaId]) {
                compiledSchemaPromise = Promise.resolve(this.validatorCache[schemaId]);
                console.info()
            } else {
                compiledSchemaPromise = ajv.compileAsync(inputSchema);
            }

            compiledSchemaPromise.then((validate) => {
                this.validatorCache[schemaId] = validate;
                Promise.resolve(validate(inputObject))
                    .then((data) => {
                            if (validate.errors) {
                                logger.log("debug", ajv.errorsText(validate.errors, {dataVar: inputObject.alias}));
                                resolve(validate.errors);
                            } else {
                                resolve([]);
                            }
                        }
                    ).catch((err, errors) => {
                    if (!(err instanceof Ajv.ValidationError)) {
                        logger.log("error", "An error ocurred while running the validation.");
                        reject(new AppError("An error ocurred while running the validation."));
                    } else {
                        logger.log("debug", ajv.errorsText(err.errors, {dataVar: inputObject.alias}));
                        resolve(err.errors);
                    }
                });
            }).catch((err) => {
                console.log("async schema compiled encountered and error");
                console.log(err.stack);
                reject(err);
            });
        });
    }
};