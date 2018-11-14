/**
 * Created by rolando on 12/08/2018.
 */
const R = require('rambda');
const Promise = require('bluebird');
const request = require('request-promise');

const NoFileValidationJob = require('../../validation/ingest-validation-exceptions').NoFileValidationJob;

class IngestFileValidator {
    constructor(connectionConfig, apiKey, fileValidationImages, ingestClient) {
        this.fileValidationUrl = connectionConfig["scheme"] + "://" + connectionConfig["host"] + ":" + connectionConfig["port"];
        this.fileValidationServiceApiKey = apiKey;
        this.fileValidationImages = fileValidationImages;
        this.ingestClient = ingestClient;
    }

    requestFileValidationJob(fileDocument, fileFormat, fileName) {
        return new Promise((resolve, reject) => {
            this.uploadAreaForFile(fileDocument)
                .then(uploadAreaId => {
                    const validationImage = this.imageFor(fileFormat);
                    if(! validationImage) {
                        reject(new NoFileValidationJob());
                    } else {
                        const imageUrl = this.imageFor(fileFormat).imageUrl;
                        const validateFileUrl = this.fileValidationUrl + "/v1/area/" + uploadAreaId + "/" + encodeURIComponent(fileName) + "/validate";
                        request({
                            method: "PUT",
                            url: validateFileUrl,
                            json: true,
                            headers: {
                                "Api-key" : this.fileValidationServiceApiKey
                            },
                            body: {
                                "validator_image": imageUrl
                            }
                        }).then(resp => {
                            resolve(resp['validation_id']);
                        }).catch(err => {
                            console.error("ERROR: Failed to request a validation job for file at " + this.ingestClient.selfLinkForResource(fileDocument));
                            reject(err);
                        });
                        }
                });

        });
    }

    imageFor(fileFormat) {
        return R.find(R.propEq('fileFormat', fileFormat),this.fileValidationImages);
    }

    uploadAreaForFile(fileDocument) {
        return new Promise((resolve, reject) => {
            this.ingestClient.envelopesForMetadataDocument(fileDocument)
                .then(envelopes => {
                    const envelope = envelopes[0]; // assuming there is at least 1 envelope
                    const uploadAreaId = envelope["stagingDetails"]["stagingAreaUuid"]["uuid"];
                    resolve(uploadAreaId);
                })
                .catch(err => {
                    console.error("ERROR: Error retrieving upload area ID for file at " + this.ingestClient.selfLinkForResource(fileDocument));
                    reject(err);
                });
        });
    }

    static FileValidationImage(fileFormat, imageUrl) {
        return new _FileValidationImage(fileFormat, imageUrl);
    }
}

class _FileValidationImage {
    constructor(fileFormat, imageUrl) {
        this.fileFormat = fileFormat;
        this.imageUrl = imageUrl;
    }
}

module.exports = IngestFileValidator;