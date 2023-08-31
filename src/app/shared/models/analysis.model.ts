import { AccountingPeriodId } from "./accounting-period.model";
import { Amount, CategoryName } from "./common.model";

export interface CategorySummary {
  category: CategoryName,
  amount: Amount
}

export interface AccountingPeriodSummary {
  income: Amount,
  expense: Amount
  startsOn: string,
  endsOn: string,
  accountingPeriodId: AccountingPeriodId
}