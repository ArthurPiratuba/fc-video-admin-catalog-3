import { InvalidUuidError, Uuid } from "../src/category/domain/uuid.vo";

describe("Uuid unit tests", function () {

    const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

    test("should throw error when uuid is invalid", function () {
        expect(() => new Uuid("invalid-uuid")).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should create a valid uuid", function () {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
    });

    test("should accept a valid uuid", function () {
        const id = "d91d6fb3-28ce-4a3c-a1ff-170da16fd3ca";
        const uuid = new Uuid(id);
        expect(uuid.id).toBe(id);
    });
});