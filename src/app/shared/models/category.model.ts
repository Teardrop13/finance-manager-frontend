import { Brand, CategoryName, FinancialRecordType } from "./common.model";

export interface Category {
  id: CategoryId,
  priority: number,
  name: CategoryName
}

export interface AddCategoryRequest {
  name: string,
  type: FinancialRecordType
}

export interface UpdateCategoriesRequest {
  updateCategoryRequests: UpdateCategoryRequest[]
}

export interface UpdateCategoryRequest {
  id: CategoryId,
  priority: number,
  name: CategoryName
}

export type CategoryId = Brand<number, 'CategoryId'>
