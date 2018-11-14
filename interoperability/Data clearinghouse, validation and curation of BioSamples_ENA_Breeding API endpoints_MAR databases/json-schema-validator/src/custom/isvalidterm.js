var Ajv = require("ajv");
var request = require("request");
const logger = require("../winston");
const CustomAjvError = require("../model/custom-ajv-error");

module.exports = function isValidTerm(ajv) {

  function findTerm(schema, data) {
    return new Promise((resolve, reject) => {
      if(schema) {
        const olsSearchUrl = "https://www.ebi.ac.uk/ols/api/search?q=";
        let errors = [];

        const termUri = data;
        const encodedTermUri = encodeURIComponent(termUri);
        const url = olsSearchUrl + encodedTermUri + "&exact=true&groupField=true&queryFields=iri";

        logger.log("debug", `Looking for term [${termUri}] in OLS.`);
        request(url, (error, Response, body) => {
          let jsonBody = JSON.parse(body);

          if(jsonBody.response.numFound === 1) {
            logger.log("debug", "Found 1 match!");
            resolve(true);
          } else if (jsonBody.response.numFound === 0) {
            logger.log("debug", "Could not find term in OLS.");
            errors.push(
              new CustomAjvError(
                "isValidTerm", `provided term does not exist in OLS: [${termUri}]`, 
                {keyword: "isValidTerm"})
              );
            reject(new Ajv.ValidationError(errors));
          } else {
            errors.push(
              new CustomAjvError(
                "isValidTerm", "Something went wrong while validating term, try again.", 
                {keyword: "isValidTerm"})
              );
            reject(new Ajv.ValidationError(errors));
          }
        });
      } else {
        resolve(true);
      }
    });
  }
  
  isValidTerm.definition = {
    async: true,
    type: "string",
    validate: findTerm,
    errors: true
  };

  ajv.addKeyword("isValidTerm", isValidTerm.definition);
  return ajv;
};
