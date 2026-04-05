import { createSlice } from "@reduxjs/toolkit";
import type { Transaction } from "@fintrack/types";
import {
  fetchTransactions,
  addTransactionAsync,
  updateTransactionAsync,
  deleteTransactionAsync,
} from "./transactions.thunks";

export type TransactionRequestStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface MutationState {
  loading: boolean;
  error: string | null;
}

export interface TransactionsState {
  items: Transaction[];
  status: TransactionRequestStatus;
  error: string | null;
  mutations: {
    add: MutationState;
    update: MutationState;
    delete: MutationState;
  };
}

const defaultMutation: MutationState = {
  loading: false,
  error: null,
};

const initialState: TransactionsState = {
  items: [],
  status: "idle",
  error: null,
  mutations: {
    add: { ...defaultMutation },
    update: { ...defaultMutation },
    delete: { ...defaultMutation },
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** Fetch transaction */
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });

    /** Create transaction */
    builder
      .addCase(addTransactionAsync.pending, (state) => {
        state.mutations.add.loading = true;
        state.mutations.add.error = null;
      })
      .addCase(addTransactionAsync.fulfilled, (state, action) => {
        state.mutations.add.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addTransactionAsync.rejected, (state, action) => {
        state.mutations.add.loading = false;
        state.mutations.add.error = action.payload ?? "Unknown error";
      });

    /** Update transaction */
    builder
      .addCase(updateTransactionAsync.pending, (state) => {
        state.mutations.update.loading = true;
        state.mutations.update.error = null;
      })
      .addCase(updateTransactionAsync.fulfilled, (state, action) => {
        state.mutations.update.loading = false;
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateTransactionAsync.rejected, (state, action) => {
        state.mutations.update.loading = false;
        state.mutations.update.error = action.payload ?? "Unknown error";
      });

    /** Delete transaction */
    builder
      .addCase(deleteTransactionAsync.pending, (state) => {
        state.mutations.delete.loading = true;
        state.mutations.delete.error = null;
      })
      .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
        state.mutations.delete.loading = false;
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTransactionAsync.rejected, (state, action) => {
        state.mutations.delete.loading = false;
        state.mutations.delete.error = action.payload ?? "Unknown error";
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export default transactionsSlice.reducer;
