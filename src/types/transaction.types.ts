import type { Role } from "./role.types";

export type TransactionType = "income" | "expense";

export type Category =
  | "Food"
  | "Rent"
  | "Travel"
  | "Entertainment"
  | "Healthcare"
  | "Utilities"
  | "Shopping"
  | "Salary"
  | "Freelance";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  createdBy: Role;
}
