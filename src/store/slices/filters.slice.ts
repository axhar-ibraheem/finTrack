import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  FilterState,
  Category,
  SortField,
  SortOrder,
  TransactionType,
} from "@fintrack/types";

const initialState: FilterState = {
  search: "",
  category: "All",
  type: "All",
  month: "All",
  sortField: "date",
  sortOrder: "desc",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setCategory(state, action: PayloadAction<Category | "All">) {
      state.category = action.payload;
    },

    setType(state, action: PayloadAction<TransactionType | "All">) {
      state.type = action.payload;
    },

    setMonth(state, action: PayloadAction<string | "All">) {
      state.month = action.payload;
    },

    setSortField(state, action: PayloadAction<SortField>) {
      state.sortField = action.payload;
    },

    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
    },

    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  setCategory,
  setType,
  setMonth,
  setSortField,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
