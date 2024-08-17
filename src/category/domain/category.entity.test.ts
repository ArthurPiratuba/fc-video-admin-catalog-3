import { Category } from "./category.entity";
import { Uuid } from "./uuid.vo";

describe('Category Unit Tests', () => {

    let validateSpy: any;
    beforeEach(function () {
        validateSpy = jest.spyOn(Category, "validate");
    });

    describe("constructor", function () {

        test('should create a category with default values', () => {
            let category = new Category({ name: 'Movie' });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test('should create a category with all values', () => {
            let category = new Category({ name: 'Movie' });
            let created_at = new Date();
            category = new Category({
                name: 'Movie',
                description: 'some description',
                is_active: false,
                created_at,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('some description');
            expect(category.is_active).toBe(false);
            expect(category.created_at).toBe(created_at);

            category = new Category({
                name: 'Movie',
                description: 'other description',
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('other description');
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);

            category = new Category({
                name: 'Movie',
                is_active: true,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);

            created_at = new Date();
            category = new Category({
                name: 'Movie',
                created_at,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBe(created_at);
        });
    });


    describe('create command', () => {
        test('should create a category', () => {
            const category = Category.create({
                name: 'Movie',
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy as any).toHaveBeenCalledTimes(1);
        });

        test('should create a category with description', () => {
            const category = Category.create({
                name: 'Movie',
                description: 'some description',
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBe('some description');
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });

        test('should create a category with is_active', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: false,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(false);
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('category_id field', () => {
        const arrange = [
            { id: null },
            { id: undefined },
            { id: new Uuid() }
        ];

        test.each(arrange)('should be is %j', (props) => {
            const category = new Category(props as any);
            expect(category.category_id).toBeInstanceOf(Uuid);
        });
    });

    test('should change name', () => {
        const category = Category.create({
            name: 'Movie',
        });
        category.changeName('other name');
        expect(category.name).toBe('other name');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should change description', () => {
        const category = Category.create({
            name: 'Movie',
        });
        category.changeDescription('some description');
        expect(category.description).toBe('some description');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should active a category', () => {
        const category = new Category({
            name: 'Filmes',
            is_active: false,
        });
        category.activate();
        expect(category.is_active).toBe(true);
    });

    test('should disable a category', () => {
        const category = new Category({
            name: 'Filmes',
            is_active: true,
        });
        category.deactivate();
        expect(category.is_active).toBe(false);
    });
});

describe("Category Validator", function () {
    describe('create command', function () {
        test('should contain errors for an category with invalid name property', () => {
            expect(() => Category.create({ name: null })).toContainsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]
            });

            expect(() => Category.create({ name: "" })).toContainsErrorMessages({
                name: ["name should not be empty"]
            });

            expect(() => Category.create({ name: 5 as any })).toContainsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]
            });

            expect(() => Category.create({ name: "t".repeat(256) })).toContainsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"]
            });
        });

        test('should contain errors for an category with invalid description property', () => {
            expect(() => Category.create({ description: 5 } as any)).toContainsErrorMessages({
                description: ["description must be a string"]
            });
        });

        test('should contain errors for an category with invalid is_active property', () => {
            expect(() => Category.create({ is_active: 5 } as any)).toContainsErrorMessages({
                is_active: ["is_active must be a boolean value"]
            });
        });
    });

    describe("changeName method", function () {
        test('should contain errors for an category with invalid name property', () => {
            const category = Category.create({ name: "Movie" })
            expect(() => category.changeName(null)).toContainsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]
            });

            expect(() => category.changeName("")).toContainsErrorMessages({
                name: ["name should not be empty"]
            });

            expect(() => category.changeName(5 as any)).toContainsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters"
                ]
            });

            expect(() => category.changeName("t".repeat(256))).toContainsErrorMessages({
                name: [
                    "name must be shorter than or equal to 255 characters"
                ]
            });
        });
    });
});