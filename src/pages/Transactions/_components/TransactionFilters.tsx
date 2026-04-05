import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@fintrack/hooks";
import {
  setSearch,
  setCategory,
  setType,
  setMonth,
  setSortField,
  setSortOrder,
  resetFilters,
} from "@fintrack/store";
import type { Category, SortField, TransactionType } from "@fintrack/types";
import { cn } from "@fintrack/utils";
import { Button, type SelectOption, SelectField } from "@fintrack/components";
import { CATEGORIES } from "../_constants/transaction.contants";
import { useMemo } from "react";
import { TransactionUtils } from "../_utils/transactions.utils";

const categoryOptions: SelectOption<Category | "All">[] = CATEGORIES.map(
  (category) => ({
    label: category === "All" ? "All Categories" : category,
    value: category,
  }),
);

const typeOptions: SelectOption<TransactionType | "All">[] = [
  { label: "All Types", value: "All" },
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

const sortFieldOptions: SelectOption<SortField>[] = [
  { label: "Sort by Date", value: "date" },
  { label: "Sort by Amount", value: "amount" },
];

export const TransactionFilters = () => {
  const dispatch = useAppDispatch();
  const { search, category, type, month, sortField, sortOrder } =
    useAppSelector((state) => state.filters);
  const allTxns = useAppSelector((state) => state.transactions.items);

  const hasActiveFilters =
    search !== "" || category !== "All" || type !== "All" || month !== "All";

  const monthOptions = useMemo(
    () => TransactionUtils.getMonthOptions(allTxns),
    [allTxns],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          ></Search>
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className={cn(
              "w-full pl-9 pr-4 py-2 text-xs rounded-sm border border-gray-200 dark:border-gray-700",
              "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300",
              "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
            )}
          ></input>
        </div>

        <SelectField
          value={category}
          onChange={(value) => dispatch(setCategory(value as Category | "All"))}
          options={categoryOptions}
        ></SelectField>

        <SelectField
          value={type}
          onChange={(value) =>
            dispatch(setType(value as "income" | "expense" | "All"))
          }
          options={typeOptions}
        ></SelectField>

        <SelectField
          value={month}
          onChange={(value) => dispatch(setMonth(value))}
          options={monthOptions}
        ></SelectField>

        <SelectField
          value={sortField}
          onChange={(value) =>
            dispatch(setSortField(value as "date" | "amount"))
          }
          options={sortFieldOptions}
        ></SelectField>

        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))
          }
          className="rounded-sm"
        >
          {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(resetFilters())}
            icon={<X size={13}></X>}
            className="text-red-500 hover:text-red-600 dark:text-red-400 rounded-lg"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};
