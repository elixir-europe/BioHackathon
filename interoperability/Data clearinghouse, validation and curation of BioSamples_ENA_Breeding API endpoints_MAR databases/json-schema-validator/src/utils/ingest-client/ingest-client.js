/**
 * Created by rolando on 01/08/2018.
 */
const request = require('request-promise');
const Promise = require('bluebird');
const exceptions = require('./ingest-client-exceptions');
const NoUuidError = exceptions.NoUuidError;

class IngestClient {
    constructor(connectionConfig) {
        this.ingestUrl = connectionConfig["scheme"] + "://" + connectionConfig["host"] + ":" + connectionConfig["port"];
    }

    retrieveMetadataDocument(entityUrl) {
        return new Promise((resolve, reject) => {
            request({
                method: "GET",
                url: entityUrl,
                json: true
            }).then(resp => {
                resolve(resp);
            }).catch(err => {
                reject(err);
            });
        });

    }

    /**
     *
     * Retrieves the metadata document, but throws a NoUuidError if the document has no uuid
     *
     * @param entityUrl
     * @returns {Promise} resolving to the metadata document JSON
     */
    getMetadataDocument(entityUrl) {
        return new Promise((resolve, reject) => {
            this.retrieveMetadataDocument(entityUrl).then(doc => {
                if(doc["uuid"] && doc["uuid"]["uuid"]) {
                    resolve(doc);
                } else {
                    throw new NoUuidError("document at " + entityUrl + "has no UUID");
                }
            }).catch(NoUuidError, (err) => {
                reject(err);
            })
        });
    }

    transitionDocumentState(...args) {
        return this.retry(5, this._transitionDocumentState.bind(this), args, "Retrying transitionDocumentState()")
    }

    _transitionDocumentState(entityUrl, validationState) {
        return new Promise((resolve, reject) => {
            this.retrieveMetadataDocument(entityUrl).then(doc => {
                    if(doc['validationState'].toUpperCase() === validationState.toUpperCase()) {
                        resolve(doc);
                    } else {
                        request({
                            method: "PUT",
                            url: doc["_links"][validationState.toLowerCase()]["href"],
                            body: {},
                            json: true
                        }).then(resp => {
                            resolve(resp);
                        }).catch(err => {
                            reject(err);
                        });
                    }
                }).catch(err => {
                    reject(err);
            });
        });
    }

    setValidationErrors(...args) {
        return this.retry(5, this._setValidationErrors.bind(this), args, "Retrying setValidationErrors()")
    }

    _setValidationErrors(entityUrl, validationErrors) {
        const patchPayload = {
            "validationErrors" : validationErrors
        };

        return new Promise((resolve, reject) => {
            request({
                method: "PATCH",
                url: entityUrl,
                json: true,
                body: patchPayload
            }).then(resp => {
                resolve(resp);
            }).catch(err =>{
                reject(err);
            });
        });
    }

    findFileByValidationId(validationId) {
        // TODO: determine search endpoint by following rels; cache the result
        const findByValidationUrl = this.ingestUrl + "/files/search/findByValidationId?validationId=" + validationId;

        return request({
                method: "GET",
                url: findByValidationUrl,
                json: true
        });
    }

    postValidationReport(entityUrl, validationReport) {
        if(! validationReport || ! validationReport.validationState) {
            console.info("Broken validation report");
        }

        if(validationReport.validationState.toUpperCase() === 'VALID') {
            console.info("posting a valid report")
        }

        return new Promise((resolve, reject) => {
            this.transitionDocumentState(entityUrl, validationReport.validationState).then(() => {
                this.setValidationErrors(entityUrl, validationReport.validationErrors).then((resp) => {
                    if(validationReport.validationJobId) {
                        resolve(this.reportValidationJobId(entityUrl, validationReport.validationJobId));
                    } else {
                        resolve(resp);
                    }
                }).catch(err => {
                    console.info("here now");
                    reject(err);
                });
            }).catch(err => {
                console.info("here now");
                reject(err);
            });
        });
    }

    fetchSchema(schemaUrl) {
        return request({
            method: "GET",
            url: schemaUrl,
            json: true,
        });
    }

    urlForCallbackLink(entityCallback) {
        return this.ingestUrl + entityCallback;
    }

    selfLinkForResource(resource) {
        return resource["_links"]["self"]["href"];
    }

    envelopesLinkForResource(resource) {
        return resource["_links"]["submissionEnvelopes"]["href"];
    }

    /**
     * gets envelopes associated with this metadata document
     * @param metadataDocument
     */
    envelopesForMetadataDocument(metadataDocument) {
        return new Promise((resolve, reject) => {
            request({
                method: "GET",
                url: this.envelopesLinkForResource(metadataDocument),
                json: true,
            }).then(resp => {
                // envelopes are embedded entities
                resolve(resp['_embedded']['submissionEnvelopes']);
            }).catch(err => {
                reject(err);
            });
        });
    }

    reportValidationJobId(fileDocumentUrl, validationJobId) {
        return request({
            method: "PATCH",
            url: fileDocumentUrl,
            body: {
                "validationId": validationJobId
            },
            json: true
        });
    }

    retry(maxRetries, func, args, retryMessage) {
        return this._retry(0, maxRetries, null, func, args, retryMessage);
    }

    _retry(attemptsSoFar, maxRetries, prevErr, func, args, retryMessage) {
        if(attemptsSoFar === maxRetries) {
            return Promise.reject(prevErr);
        } else {
            const boundFunc = func.bind(this);
            return Promise.delay(50).then(() => {
                return boundFunc.apply(null, args)
                    .then(allGood => {return Promise.resolve(allGood)})
                    .catch(err => {
                        const incAttempts = attemptsSoFar + 1;
                        console.info(retryMessage + " :: Attempt # " + incAttempts + " out of " + maxRetries);
                        return this._retry(attemptsSoFar + 1, maxRetries, err, func, args, retryMessage);
                    });
            });
        }
    }
}

module.exports = IngestClient;