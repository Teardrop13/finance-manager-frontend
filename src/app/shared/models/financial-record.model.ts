export interface FinancialRecord {
  amount?: number|null,
  category?: string|null,
  description?: string|null,
  type?: string|null,
}

export enum FinancialRecordType {
  INCOME = 'income',
  EXPENSE = 'expense',
}