export interface AccountingPeriod {
  id: AccountingPeriodId,
  startsOn: string,
  endsOn: string
}

export type AccountingPeriodId = number & { _accountingPeriodIdBrand: never };