import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionsMockApi } from "@fintrack/api";
import { ERROR_MESSAGES } from "@fintrack/constants";
import type { Transaction } from "@fintrack/types";

const TRANSACTION_ACTION_TYPES = {
  FETCH_ALL: "transactions/fetchAll",
  CREATE: "transactions/create",
  UPDATE: "transactions/update",
  REMOVE: "transactions/remove",
} as const;

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>(TRANSACTION_ACTION_TYPES.FETCH_ALL, async (_, { rejectWithValue }) => {
  try {
    return await TransactionsMockApi.fetchAll();
  } catch {
    return rejectWithValue(ERROR_MESSAGES.FETCH_TRANSACTIONS_FAILED);
  }
});

export const addTransactionAsync = createAsyncThunk<
  Transaction,
  Transaction,
  { rejectValue: string }
>(TRANSACTION_ACTION_TYPES.CREATE, async (transaction, { rejectWithValue }) => {
  try {
    return await TransactionsMockApi.create(transaction);
  } catch {
    return rejectWithValue(ERROR_MESSAGES.ADD_TRANSACTION_FAILED);
  }
});

export const updateTransactionAsync = createAsyncThunk<
  Transaction,
  Transaction,
  { rejectValue: string }
>(TRANSACTION_ACTION_TYPES.UPDATE, async (transaction, { rejectWithValue }) => {
  try {
    return await TransactionsMockApi.update(transaction);
  } catch {
    return rejectWithValue(ERROR_MESSAGES.UPDATE_TRANSACTION_FAILED);
  }
});

export const deleteTransactionAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(TRANSACTION_ACTION_TYPES.REMOVE, async (id, { rejectWithValue }) => {
  try {
    return await TransactionsMockApi.remove(id);
  } catch {
    return rejectWithValue(ERROR_MESSAGES.DELETE_TRANSACTION_FAILED);
  }
});
