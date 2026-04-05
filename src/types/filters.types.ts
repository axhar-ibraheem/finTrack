import type { Category, TransactionType } from "./transaction.types";

export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

export interface FilterState {
  search: string;
  category: Category | "All";
  type: TransactionType | "All";
  month: string | "All";
  sortField: SortField;
  sortOrder: SortOrder;
}
