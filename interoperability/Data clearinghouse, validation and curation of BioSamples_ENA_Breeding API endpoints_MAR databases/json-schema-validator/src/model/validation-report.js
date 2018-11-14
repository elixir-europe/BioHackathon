/**
 * Created by rolando on 07/08/2018.
 */

class ValidationReport {
    constructor(validationState, validationErrors, validationJobId=null) {
        this.validationState = validationState;
        this.validationErrors = validationErrors;
        this.validationJobId = validationJobId;
    }

    static okReport(){
        return new ValidationReport("VALID", []);
    }

    static validatingReport () {
        return new ValidationReport("VALIDATING", []);
    }
}

module.exports = ValidationReport;