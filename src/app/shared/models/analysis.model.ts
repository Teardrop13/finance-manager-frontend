import { Amount, CategoryName } from "./common.model";

export interface Summary {
  category: CategoryName,
  amount: Amount
}