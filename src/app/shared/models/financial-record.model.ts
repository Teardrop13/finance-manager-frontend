import { CategoryName } from "./category.model";

export interface FinancialRecord {
  id: FinancialRecordId,
  amount: number,
  transactionDate: string,
  category: CategoryName,
  description?: string,
  type: FinancialRecordType,
}

export interface UpdateFinancialRecordCommand extends CreateFinancialRecordCommand {
  recordId: FinancialRecordId
}

export interface CreateFinancialRecordCommand {
  description: string | undefined,
  amount: number,
  category: CategoryName,
  type: FinancialRecordType,
  transactionDate: string,
}

export declare type FinancialRecordType = 'income' | 'expense';

export type FinancialRecordId = number & { _financialRecordIdBrand: never };
