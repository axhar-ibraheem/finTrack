import { type Category, type TransactionType } from "@fintrack/types";

export const CATEGORIES: (Category | "All")[] = [
  "All",
  "Food",
  "Rent",
  "Travel",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Shopping",
  "Salary",
  "Freelance",
];

export const TRANSACTION_TYPES: TransactionType[] = ["income", "expense"];

export const VALIDATION_MESSAGES = {
  REQUIRED_DESCRIPTION: "Description is required",
  INVALID_AMOUNT: "Enter a valid amount",
  REQUIRED_DATE: "Date is required",
} as const;
