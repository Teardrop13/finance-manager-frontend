import { Amount, Brand, CategoryName, FinancialRecordType } from "./common.model";

export interface FinancialRecord {
  id: FinancialRecordId,
  amount: Amount,
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
  amount: Amount,
  category: CategoryName,
  type: FinancialRecordType,
  transactionDate: string,
}

export type FinancialRecordId = Brand<number, 'FinancialRecordId'>
