import { Entity } from "../../../shared/domain/entity";
import { SearchableRepository } from "../../../shared/domain/repository.interface";
import { SearchParams } from "../../../shared/domain/search-params";
import { SearchResult } from "../../../shared/domain/search-result";
import { Category } from "../../domain/category.entity";
import { Uuid } from "../../domain/uuid.vo";
import { CategoryModel } from "./category.model";

export class CategorySequelizeRepository implements SearchableRepository<Category, Uuid> {

    sortableFields: string[] = ["name", "created_at"];

    constructor(private categoryModelClass: typeof CategoryModel) { }

    async insert(entity: Category): Promise<void> {
        await this.categoryModelClass.create({
            category_id: entity.category_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at
        });
    }

    async bulkInsert(entities: Category[]): Promise<void> {
        await this.categoryModelClass.bulkCreate(entities.map(entity => ({
            category_id: entity.category_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at
        })));
    }

    update(entity: Category): Promise<void> {
        throw new Error("Method not implemented.");
    }

    delete(entity_id: Uuid): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(entity_id: Uuid): Promise<Category> {
        const model = await this.categoryModelClass.findByPk(entity_id.id);
        return new Category({
            category_id: new Uuid(model.category_id),
            name: model.name,
            description: model.description,
            is_active: model.is_active,
            created_at: model.created_at
        })
    }

    async findAll(): Promise<Category[]> {
        const models = await this.categoryModelClass.findAll();
        return models.map(model => {
            return new Category({
                category_id: new Uuid(model.category_id),
                name: model.name,
                description: model.description,
                is_active: model.is_active,
                created_at: model.created_at
            });
        });
    }

    getEntity(): new (...args: any[]) => Category {
        return Category;
    }

    search(props: SearchParams<string>): Promise<SearchResult<Entity>> {
        throw new Error("Method not implemented.");
    }
} 