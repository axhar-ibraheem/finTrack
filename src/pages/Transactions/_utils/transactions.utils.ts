import type { Transaction, Category, TransactionType } from "@fintrack/types";
import { CalculationUtils } from "@fintrack/utils";
import { v4 as uuidv4 } from "uuid";
import { format, parseISO } from "date-fns";
import { type SelectOption } from "@fintrack/components";
import { CATEGORIES } from "../_constants/transaction.contants";

export interface FilteredSummary {
  income: number;
  expenses: number;
  count: number;
  total: number;
}

export interface TypeFormState {
  type: TransactionType;
  category: Category;
}

export interface TransactionFormValues {
  description: string;
  amount: string;
  date: string;
  type: TransactionType;
  category: Category;
}

export class TransactionUtils {
  static getFilteredSummary(
    filtered: Transaction[],
    all: Transaction[],
  ): FilteredSummary {
    return {
      income: CalculationUtils.totalIncome(filtered),
      expenses: CalculationUtils.totalExpenses(filtered),
      count: filtered.length,
      total: all.length,
    };
  }

  static getMonthOptions(transactions: Transaction[]): SelectOption[] {
    const uniqueMonths = Array.from(
      new Set(transactions.map((t) => format(parseISO(t.date), "yyyy-MM"))),
    )
      .sort((a, b) => a.localeCompare(b))
      .map((month) => ({
        label: format(parseISO(`${month}-01`), "MMMM yyyy"),
        value: month,
      }));

    return [{ label: "All Months", value: "All" }, ...uniqueMonths];
  }

  static getCategoryOptions() {
    return CATEGORIES.filter((cat) => cat !== "All").map((cat) => ({
      label: cat,
      value: cat,
    }));
  }

  static getDefaultTypeForm(): TypeFormState {
    return {
      type: "expense",
      category: "Food",
    };
  }

  static getTypeFormFromTransaction(transaction: Transaction): TypeFormState {
    return {
      type: transaction.type,
      category: transaction.category,
    };
  }

  static buildTransaction(
    values: TransactionFormValues,
    editingTransaction: Transaction | null,
  ): Transaction {
    return {
      id: editingTransaction ? editingTransaction.id : `txn_${uuidv4()}`,
      description: values.description.trim(),
      amount: Number(values.amount),
      type: values.type,
      category: values.category,
      date: values.date,
    };
  }

  static getDefaultDate(): string {
    return new Date().toISOString().split("T")[0];
  }

  static isDescriptionValid(value: string): boolean {
    return value.trim().length > 0;
  }

  static isAmountValid(value: string): boolean {
    return !isNaN(Number(value)) && Number(value) > 0;
  }

  static isDateValid(value: string): boolean {
    return value.length > 0;
  }
}
