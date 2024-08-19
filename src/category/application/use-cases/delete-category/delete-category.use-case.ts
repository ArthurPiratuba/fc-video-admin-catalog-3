import { UseCase } from "../../../../shared/application/use-case.interface";
import { CategoryRepository } from "../../../domain/category.repository";
import { Uuid } from "../../../domain/uuid.vo";

export class DeleteCategoryUseCase
  implements UseCase<DeleteCategoryInput, DeleteCategoryOutput> {
  constructor(private categoryRepo: CategoryRepository) { }

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const categoryId = new Uuid(input.id);
    await this.categoryRepo.delete(categoryId);
  }
}

export type DeleteCategoryInput = {
  id: string;
};

type DeleteCategoryOutput = void;
