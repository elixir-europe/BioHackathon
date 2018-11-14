/**
 * Created by rolando on 02/08/2018.
 */

/** Pre-setup: Configuring HTTP agents and DNS caching **/
const request = require('request-defaults');

request.globalDefaults({
    rejectUnauthorized: false,
    family: 4,
    pool: {
        maxSockets: 10
    }
});

const dnscache = require('dnscache')({
    "enable" : true,
    "ttl" : 300,
    "cachesize" : 1000
});

/** ------------------------------- **/
const config = require('config');
const R = require('rambda');

const DocumentUpdateListener = require('./listener/document-update-listener');
const DocumentUpdateHandler = require('./listener/handlers/document-update-handler');

const FileValidationListener = require('./listener/file-validation-listener');
const FileValidationHandler = require('./listener/handlers/file-validation-handler');

const IngestClient = require('./utils/ingest-client/ingest-client');
const IngestValidator = require('./validation/ingest-validator');
const IngestFileValidator = require('./utils/ingest-client/ingest-file-validator');

const schemaValidator = require('./validation/validator');


const ingestClient = (() => {
    const ingestConnectionConfig = config.get("INGEST_API.connection");
    return new IngestClient(ingestConnectionConfig);
})();

const ingestFileValidator = (() => {
    const fileValidationConnectionConfig = config.get("UPLOAD_API.connection");
    const apiKey = config.get("UPLOAD_API.apiKey");
    const validationImageConfigs = Object.entries(config.get("FILE_VALIDATION_IMAGES"));
    const validationImages = R.map(configEntry => IngestFileValidator.FileValidationImage(configEntry[0], configEntry[1])) (validationImageConfigs);

    return new IngestFileValidator(fileValidationConnectionConfig, apiKey, validationImages, ingestClient);
})();

const ingestValidator = (() => {
    return new IngestValidator(schemaValidator, ingestFileValidator, ingestClient);
})();

const documentUpdateListener = (() => {
    const handler = new DocumentUpdateHandler(ingestValidator, ingestClient);

    const rabbitConnectionConfig = config.get("AMQP.metadataValidation.connection");
    const rabbitMessagingConfig = config.get("AMQP.metadataValidation.messaging");

    const exchange = rabbitMessagingConfig["exchange"];
    const queue = rabbitMessagingConfig["queueName"];
    const exchangeType = rabbitMessagingConfig["exchangeType"];

    return new DocumentUpdateListener(rabbitConnectionConfig, exchange, queue, handler, exchangeType);
})();


const fileValidationListener = (() => {
    const handler = new FileValidationHandler(ingestClient);

    const rabbitConnectionConfig = config.get("AMQP.fileValidationResults.connection");
    const rabbitMessagingConfig = config.get("AMQP.fileValidationResults.messaging");


    const exchange = rabbitMessagingConfig["exchange"];
    const queue = rabbitMessagingConfig["queueName"];
    const exchangeType = rabbitMessagingConfig["exchangeType"];

    return new FileValidationListener(rabbitConnectionConfig, exchange, queue, handler, exchangeType);
})();


function begin() {
    documentUpdateListener.start();
    fileValidationListener.start();
}

begin();