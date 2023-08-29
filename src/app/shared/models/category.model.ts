import { Brand, CategoryName, FinancialRecordType } from "./common.model";

export interface Category {
  id: CategoryId,
  priority: number,
  name: CategoryName
}

export interface AddCategoryCommand {
  name: string,
  type: FinancialRecordType
}

export type CategoryId = Brand<number, 'CategoryId'>
