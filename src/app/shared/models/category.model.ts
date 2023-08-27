import { FinancialRecordType } from "./financial-record.model";

export interface Category {
  id: CategoryId,
  priority: number,
  name: CategoryName
}

export interface AddCategoryCommand {
  name: string,
  type: FinancialRecordType
}

export type CategoryId = number & { _categoryIdBrand: never };

export type CategoryName = string & { _categoryIdBrand: never };