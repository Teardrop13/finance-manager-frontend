import { Amount, Brand, CategoryName, FinancialRecordType } from "./common.model";

export interface UpdateFinancialRecordRequest extends CreateFinancialRecordRequest {
  description: string | undefined,
  amount: Amount,
  category: CategoryName,
  transactionDate: string,
}

export interface CreateFinancialRecordRequest {
  description: string | undefined,
  amount: Amount,
  category: CategoryName,
  type: FinancialRecordType,
  transactionDate: string,
}

export interface FinancialRecordsHistory {
  count: number,
  records: FinancialRecord[]
}

export interface FinancialRecord {
  id: FinancialRecordId,
  amount: Amount,
  transactionDate: string,
  category: CategoryName,
  description?: string,
  type: FinancialRecordType,
}

export type FinancialRecordId = Brand<number, 'FinancialRecordId'>
