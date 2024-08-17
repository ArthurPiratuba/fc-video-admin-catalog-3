import { literal, Op } from "sequelize";
import { NotFoundError } from "../../../shared/domain/not-found.error";
import { SearchableRepository } from "../../../shared/domain/repository.interface";
import { Category } from "../../domain/category.entity";
import { CategorySearchParams, CategorySearchResult } from "../../domain/category.repository";
import { Uuid } from "../../domain/uuid.vo";
import { CategoryModel } from "./category.model";
import { SortDirection } from "../../../shared/domain/search-params";

export class CategorySequelizeRepository implements SearchableRepository<Category, Uuid> {

    sortableFields: string[] = ["name", "created_at"];
    orderBy = {
        mysql: {
            name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`), //ascii
        },
    };

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

    async update(entity: Category): Promise<void> {
        const model = await this._get(entity.category_id.id);
        if (!model) throw new NotFoundError(entity.category_id, this.getEntity());
        this.categoryModelClass.update({
            category_id: entity.category_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at
        },
            { where: { category_id: entity.category_id.id } }
        );
    }

    async delete(category_id: Uuid): Promise<void> {
        const model = await this._get(category_id.id);
        if (!model) throw new NotFoundError(category_id, this.getEntity());
        await this.categoryModelClass.destroy({ where: { category_id: category_id.id } });
    }

    async findById(entity_id: Uuid): Promise<Category> {
        const model = await this._get(entity_id.id);
        return new Category({
            category_id: new Uuid(model.category_id),
            name: model.name,
            description: model.description,
            is_active: model.is_active,
            created_at: model.created_at
        })
    }

    private async _get(id: string) {
        return await this.categoryModelClass.findByPk(id);
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


    async search(props: CategorySearchParams): Promise<CategorySearchResult> {
        const offset = (props.page - 1) * props.per_page;
        const limit = props.per_page;
        const { rows: models, count } = await this.categoryModelClass.findAndCountAll({
            ...(props.filter && {
                where: {
                    name: { [Op.like]: `%${props.filter}%` },
                },
            }),
            ...(props.sort && this.sortableFields.includes(props.sort)
                ? { order: [[props.sort, props.sort_dir]] }
                : { order: [['created_at', 'desc']] }),
            offset,
            limit,
        });
        return new CategorySearchResult({
            items: models.map((model) => {
                return new Category({
                    category_id: new Uuid(model.category_id),
                    name: model.name,
                    description: model.description,
                    is_active: model.is_active,
                    created_at: model.created_at
                })
            }),
            current_page: props.page,
            per_page: props.per_page,
            total: count,
        });
    }

    getEntity(): new (...args: any[]) => Category {
        return Category;
    }
} 