let request = require("request-promise");
const logger = require("../winston");
const config = require('config');

const olsConnectionConfig = config.get("OLS_API.connection");
const olsSearchUrl = olsConnectionConfig["scheme"] + "://" + olsConnectionConfig["host"] + ":" + olsConnectionConfig["port"] + "/api/search?q="
const cachedOlsCurieResponses = {};

module.exports = {

    isCurie: function(term){
        let curie = true;
        if (term.split(":").length != 2 || term.includes("http")){
                curie = false;
        }
        return curie;
    },

    expandCurie: function(term){
        const termUri = encodeURIComponent(term);
        const url = olsSearchUrl + termUri
            + "&exact=true&groupField=true&queryFields=obo_id";

        return new Promise((resolve, reject) => {
            let curieExpandResponsePromise = null;

            if(cachedOlsCurieResponses[url]) {
                curieExpandResponsePromise = Promise.resolve(cachedOlsCurieResponses[url]);
            } else {
                curieExpandResponsePromise = request({
                    method: "GET",
                    url: url,
                    json: true
                })
            }

            curieExpandResponsePromise
                .then(resp => {
                    cachedOlsCurieResponses[url] = resp;
                    let jsonBody = resp;
                    if (jsonBody.response.numFound === 1) {
                        logger.log("debug", "Term found");
                        resolve(jsonBody.response.docs[0].iri);
                    }
                    else {
                        reject("Could not retrieve IRI for " + term);
                    }
                }).catch(err => {
                    reject(err)
                });
        });

    }
};