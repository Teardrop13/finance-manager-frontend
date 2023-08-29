import { Brand } from "./common.model"

export interface AccountingPeriod {
  id: AccountingPeriodId,
  startsOn: string,
  endsOn: string
}

export type AccountingPeriodId = Brand<number, 'AccountingPeriodId'>