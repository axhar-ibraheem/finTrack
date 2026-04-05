import { format, parseISO } from "date-fns";
import type { Transaction, Category } from "@fintrack/types";
import { FormatUtils } from "./format.utils";

export interface CategorySummary {
  category: Category;
  total: number;
  percentage: number;
  count: number;
}

export interface MonthlyData {
  month: string;
  label: string;
  income: number;
  expenses: number;
  balance: number;
  savingsRate: number;
}

export class CalculationUtils {
  static totalIncome(transactions: Transaction[]): number {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  static totalExpenses(transactions: Transaction[]): number {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  static savingsRate(transactions: Transaction[]): number {
    const income = CalculationUtils.totalIncome(transactions);
    if (income === 0) return 0;
    const expenses = CalculationUtils.totalExpenses(transactions);
    return ((income - expenses) / income) * 100;
  }

  static categoryBreakdown(transactions: Transaction[]): CategorySummary[] {
    const expenses = transactions.filter((t) => t.type === "expense");
    const total = CalculationUtils.totalExpenses(expenses);

    const map = expenses.reduce<
      Partial<Record<Category, { total: number; count: number }>>
    >((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { total: 0, count: 0 };
      }
      acc[t.category]!.total += t.amount;
      acc[t.category]!.count += 1;
      return acc;
    }, {});

    return (
      Object.entries(map) as [Category, { total: number; count: number }][]
    )
      .map(([category, { total: catTotal, count }]) => ({
        category,
        total: catTotal,
        count,
        percentage: total > 0 ? (catTotal / total) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);
  }

  static monthlyData(transactions: Transaction[]): MonthlyData[] {
    const map = transactions.reduce<Record<string, Transaction[]>>((acc, t) => {
      const key = FormatUtils.monthKey(t.date);
      if (!acc[key]) acc[key] = [];
      acc[key].push(t);
      return acc;
    }, {});

    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, txns]) => {
        const income = CalculationUtils.totalIncome(txns);
        const expenses = CalculationUtils.totalExpenses(txns);
        return {
          month,
          label: format(parseISO(`${month}-01`), "MMM yyyy"),
          income,
          expenses,
          balance: income - expenses,
          savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
        };
      });
  }
}
