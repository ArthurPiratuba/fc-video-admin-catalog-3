import { ClassValidatorFields } from "../domain/class-validator-fields";
import { EntityValidatorError } from "../domain/validation.error";
import { FieldsErrors } from "../domain/validator-fields-interface";

type Expected =
    | { validator: ClassValidatorFields<any>; data: any }
    | (() => any);

expect.extend({
    toContainsErrorMessages(expected: Expected, received: FieldsErrors) {
        if (typeof expected === "function") {
            try {
                expected();
                return isValid();
            } catch (e) {
                const error = e as EntityValidatorError;
                return assertContainsErrorMessages(error.errors, received);
            }
        } else {
            const { validator, data } = expected;
            const validated = validator.validate(data);
            if (validated) {
                return isValid();
            }
            return assertContainsErrorMessages(validator.errors, received);
        }
    },
});

function assertContainsErrorMessages(expected: FieldsErrors, received: FieldsErrors) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
    return isMatch
        ? isValid()
        : {
            pass: false,
            message: () => `The validation errors not contains ${JSON.stringify(received)}. Current ${JSON.stringify(expected)}`
        }
}

function isValid() {
    return {
        pass: true, message: () => ""
    }
}