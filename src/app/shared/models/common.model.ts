export type Brand<T, K> = T & { _brand: K }

export type Amount = Brand<number, 'Amount'>

export declare type FinancialRecordType = 'income' | 'expense';

export type CategoryName = Brand<string, 'CategoryName'>  