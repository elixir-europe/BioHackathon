/**
 * Created by rolando on 06/08/2018.
 */

const Promise = require('bluebird');
const ValidationReport = require('../../model/validation-report');

class FileValidationHandler {
    constructor(ingestClient) {
        this.ingestClient = ingestClient;
    }

    async handle(msg) {
        let msgContent = null;
        try {
            msgContent = JSON.parse(msg.content);
        } catch (err) {
            console.error("Failed to parse message content (ignoring): " + msg.content);
            return;
        }
        const validationJobId = msgContent['validation_id'];

        let validationOutput = null;
        try {
            validationOutput = JSON.parse(msgContent['stdout']);
        } catch (err) {
            console.error("Failed to JSON parse stdout in validation message (ignoring): " + msg.content);
            return;
        }

        const validationState = validationOutput['validation_state'];
        const validationErrors = validationOutput['validation_errors'];

        const validationReport = new ValidationReport(validationState, validationErrors);

        try {
            // TODO: extra GET request here could be cut out
            const fileDocument = await this.ingestClient.findFileByValidationId(validationJobId);
            const documentUrl = this.ingestClient.selfLinkForResource(fileDocument);
            await this.ingestClient.postValidationReport(documentUrl, validationReport);
        } catch(err) {
            console.error(err);
        }

    }
}

module.exports = FileValidationHandler;