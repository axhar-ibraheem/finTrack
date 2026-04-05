export const ERROR_MESSAGES = {
  ROOT_NOT_FOUND: "Root element not found. Check your index.html.",
  PAGE_NOT_FOUND: "404 — Page not found",
  PAGE_NOT_FOUND_DESC: "The page you are looking for does not exist.",
  FETCH_TRANSACTIONS_FAILED: "Failed to fetch transactions",
  ADD_TRANSACTION_FAILED: "Failed to add transaction",
  UPDATE_TRANSACTION_FAILED: "Failed to update transaction",
  DELETE_TRANSACTION_FAILED: "Failed to delete transaction",
} as const;

export const EMPTY_STATE_MESSAGES = {
  NO_TRANSACTIONS: "No transactions found",
  NO_TRANSACTIONS_DESC:
    "Try adjusting your filters or search term to find what you are looking for.",
  NO_EXPENSE_DATA: "No expense data available",
  NOT_ENOUGH_DATA: "Not enough data to compare months yet.",
  NO_MONTHLY_DATA: "No monthly data available yet.",
} as const;

export const SUCCESS_MESSAGES = {
  TRANSACTION_ADDED: "Transaction added successfully",
  TRANSACTION_UPDATED: "Transaction updated successfully",
  TRANSACTION_DELETED: "Transaction deleted successfully",
} as const;

export const CONFIRM_MESSAGES = {
  DELETE_TRANSACTION_TITLE: "Delete transaction",
  DELETE_TRANSACTION_DESC:
    "Are you sure you want to delete this transaction? This action cannot be undone.",
  DELETE_CONFIRM_LABEL: "Yes, delete",
  DELETE_CANCEL_LABEL: "Cancel",
} as const;
