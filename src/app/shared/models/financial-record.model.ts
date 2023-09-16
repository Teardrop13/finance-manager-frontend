import BigNumber from "bignumber.js";
import { Brand, CategoryName, FinancialRecordType } from "./common.model";

export interface UpdateFinancialRecordRequest {
  description: string | null,
  amount: BigNumber,
  category: CategoryName,
  transactionDate: string,
}

export interface CreateFinancialRecordRequest {
  description: string | undefined,
  amount: BigNumber,
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
  amount: BigNumber,
  transactionDate: string,
  category: CategoryName,
  description: string | null,
  type: FinancialRecordType,
}

export type FinancialRecordId = Brand<number, 'FinancialRecordId'>
