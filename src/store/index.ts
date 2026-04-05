import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "./slices/transactions/transactions.slice";
import filtersReducer from "./slices/filters.slice";
import uiReducer from "./slices/ui.slice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./slices/transactions";
export * from "./slices/filters.slice";
export * from "./slices/ui.slice";
