import { ValueObject } from "./value-object";

class StringValueObject extends ValueObject {
    constructor(readonly valus: string) {
        super();
    }
}

class ComplexValueObject extends ValueObject {
    constructor(readonly prop1: string, readonly prop2: number) {
        super();
    }
}

describe("Value object unit tests", function () {
    test("should be equals", function () {
        const vo1 = new StringValueObject("test");
        const vo2 = new StringValueObject("test");
        expect(vo1.equals(vo2)).toBeTruthy();
        expect(vo1.equals(null as any)).toBeFalsy();
        expect(vo1.equals(undefined as any)).toBeFalsy();
        const complexVo1 = new ComplexValueObject("test", 1);
        const complexVo2 = new ComplexValueObject("test", 1);
        expect(complexVo1.equals(complexVo2)).toBeTruthy();
        expect(complexVo1.equals(null as any)).toBeFalsy();
        expect(complexVo1.equals(undefined as any)).toBeFalsy();
    });

    test("should not be equals", function () {
        const vo1 = new StringValueObject("test");
        const vo2 = new StringValueObject("test2");
        expect(vo1.equals(vo2)).toBeFalsy();
        expect(vo1.equals(null as any)).toBeFalsy();
        expect(vo1.equals(undefined as any)).toBeFalsy();
        const complexVo1 = new ComplexValueObject("test", 1);
        const complexVo2 = new ComplexValueObject("test2", 1);
        expect(complexVo1.equals(complexVo2)).toBeFalsy();
        expect(complexVo1.equals(null as any)).toBeFalsy();
        expect(complexVo1.equals(undefined as any)).toBeFalsy();
    });
})