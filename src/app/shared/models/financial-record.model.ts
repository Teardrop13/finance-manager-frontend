export interface FinancialRecord {
  id?: number | null,
  amount?: number | null,
  transactionDate?: Date | null,
  category?: string | null,
  description?: string | null,
  type?: string | null,
}

export enum FinancialRecordType {
  INCOME = 'income',
  EXPENSE = 'expense',
}