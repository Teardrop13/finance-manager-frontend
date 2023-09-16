import BigNumber from "bignumber.js";
import { AccountingPeriodId } from "./accounting-period.model";
import { CategoryName } from "./common.model";

export interface CategorySummary {
  category: CategoryName,
  amount: BigNumber
}

export interface AccountingPeriodSummary {
  income: BigNumber,
  expense: BigNumber,
  startsOn: string,
  endsOn: string,
  accountingPeriodId: AccountingPeriodId
}