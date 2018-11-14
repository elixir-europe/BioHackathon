var Ajv = require("ajv");
var request = require("request");
const logger = require("../winston");
const CustomAjvError = require("../model/custom-ajv-error");

module.exports = function isChildTermOf(ajv) {

  function findChildTerm(schema, data) {
    return new Promise((resolve, reject) => {
      const parentTerm = schema.parentTerm;
      const ontologyId = schema.ontologyId;
      let errors = [];

      if(parentTerm && ontologyId) {
        const olsSearchUrl = "https://www.ebi.ac.uk/ols/api/search?q=";

        const termUri = encodeURIComponent(data);
        const url = olsSearchUrl + termUri
        + "&exact=true&groupField=true&allChildrenOf=" + encodeURIComponent(parentTerm)
        + "&ontology=" + ontologyId + "&queryFields=iri";

        logger.log("debug", `Evaluating isChildTermOf, query url: [${url}]`);
        request(url, (error, response, body) => {
          let jsonBody = JSON.parse(body);

          if(jsonBody.response.numFound === 1) {
            logger.log("debug", "It's a child term!");
            resolve(true);
          } else if(jsonBody.response.numFound === 0) {
            logger.log("debug", `Provided term is not child of [${parentTerm}]`);
            errors.push(
              new CustomAjvError(
                "isChildTermOf", `Provided term is not child of [${parentTerm}]`,
                {keyword: "isChildTermOf"})
              );
            reject(new Ajv.ValidationError(errors));
          } else {
            errors.push(
              new CustomAjvError(
                "isChildTermOf", "Something went wrong while validating term, try again.", 
                {keyword: "isChildTermOf"})
              );
            reject(new Ajv.ValidationError(errors));
          }
        });
      } else {
        errors.push(
          new CustomAjvError(
            "isChildTermOf",
            "Missing required variable in schema isChildTermOf, required properties are: parentTerm and ontologyId.",
            {keyword: "isChildTermOf"})
          );
        reject(new Ajv.ValidationError(errors));
      }
    });
  }

  isChildTermOf.definition = {
    async: true,
    type: "string",
    validate: findChildTerm,
    errors: true
  };

  ajv.addKeyword("isChildTermOf", isChildTermOf.definition);
  return ajv;
};
