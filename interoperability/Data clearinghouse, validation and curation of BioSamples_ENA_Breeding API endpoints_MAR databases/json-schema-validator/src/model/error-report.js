/**
 * Created by rolando on 07/08/2018.
 */

class ErrorReport {
    constructor(ajvError=null) {
        this.ajvError = ajvError;
        this.message = null;
        this.absoluteDataPath = null;
        this.userFriendlyMessage = null;

        if(ajvError) {
            this.constructWithAjvError(this.ajvError);
        }
    }

    constructUserFriendlyMessage() {
        if(this.absoluteDataPath === null) {
            throw new Error("Can't construct a user friendly message: absoluteDataPath of error not set");
        } else if(!this.message) {
            throw new Error("Can't construct a user friendly message: error message not set");
        } else {
            if(this.absoluteDataPath === "") {
                this.absoluteDataPath = "root of document";
            }
            // depending on the schema keyword that caused the validation error, may need to parse the AJV error obj differently
            if(this.ajvError) {
                const keyword = this.ajvError["keyword"];
                if(keyword === "additionalProperties") {
                    const additionalProperty = this.ajvError["params"]["additionalProperty"];
                    this.userFriendlyMessage = "Found disallowed additional property " + additionalProperty + " at " + this.absoluteDataPath;
                } else if(keyword === "enum") {
                    const allowedValues = this.ajvError["params"]["allowedValues"];
                    this.userFriendlyMessage = this.absoluteDataPath + " " + this.message + ": " + "[" + allowedValues + "]";
                } else {
                    this.userFriendlyMessage = this.message + " at " + this.absoluteDataPath;
                }
            } else {
                this.userFriendlyMessage = this.message + " at " + this.absoluteDataPath;
            }
        }
    }

    constructWithAjvError(ajvError) {
        this.absoluteDataPath = ajvError.dataPath;
        this.message = ajvError.message;

        this.constructUserFriendlyMessage();
    }
}

module.exports = ErrorReport;