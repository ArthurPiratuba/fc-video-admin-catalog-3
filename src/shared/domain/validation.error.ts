import { FieldsErrors } from "./validator-fields-interface";

export class EntityValidatorError extends Error {

    constructor(public errors: FieldsErrors, message = "Validation Error") {
        super(message);
    }

    count() {
        return Object.keys(this.errors).length;
    }
}