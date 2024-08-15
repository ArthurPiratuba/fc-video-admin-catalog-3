
import { ISearchableRepository } from "../../shared/domain/repository.interface";
import { SearchParams } from "../../shared/domain/search-params";
import { SearchResult } from "../../shared/domain/search-result";
import { Category } from "./category.entity";
import { Uuid } from "./uuid.vo";

export type CategoryFilter = string

export class CategorySearchParams extends SearchParams<CategoryFilter> {

}

export class CategorySearchResult extends SearchResult<Category> {

}

export interface ICategoryRepository extends ISearchableRepository<
  Category,
  Uuid,
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult
> { }