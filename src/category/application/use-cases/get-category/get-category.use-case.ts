import { UseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/not-found.error';
import { Category } from '../../../domain/category.entity';
import { CategoryRepository } from '../../../domain/category.repository';
import { Uuid } from '../../../domain/uuid.vo';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export class GetCategoryUseCase
  implements UseCase<GetCategoryInput, GetCategoryOutput> {
  constructor(private categoryRepo: CategoryRepository) { }

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const categoryId = new Uuid(input.id);
    const category = await this.categoryRepo.findById(categoryId);
    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    return CategoryOutputMapper.toOutput(category);
  }
}

export type GetCategoryInput = {
  id: string;
};

export type GetCategoryOutput = CategoryOutput;
