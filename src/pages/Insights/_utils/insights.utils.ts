import type { Transaction } from "@fintrack/types";
import {
  CalculationUtils,
  type MonthlyData,
  type CategorySummary,
} from "@fintrack/utils";
import { type InsightPeriod } from "../_types/insights.types";
import { subMonths, isAfter, parseISO } from "date-fns";
import { PERIOD_MONTHS } from "../_constants/insights.constants";

export interface MonthComparison {
  currentExpenses: number;
  previousExpenses: number;
  changePercent: number;
  improved: boolean;
}

export class InsightUtils {
  static getTopCategory(transactions: Transaction[]): CategorySummary | null {
    const breakdown = CalculationUtils.categoryBreakdown(transactions);
    return breakdown.length > 0 ? breakdown[0] : null;
  }

  static getMostActiveMonth(monthlyData: MonthlyData[]): MonthlyData | null {
    if (monthlyData.length === 0) return null;
    return monthlyData.reduce((a, b) =>
      a.income + a.expenses > b.income + b.expenses ? a : b,
    );
  }

  static getRecurringCount(transactions: Transaction[]): number {
    const counts = transactions.reduce<Record<string, number>>((acc, t) => {
      acc[t.description] = (acc[t.description] ?? 0) + 1;
      return acc;
    }, {});
    return Object.values(counts).filter((count) => count > 1).length;
  }

  static monthOverMonthComparison(
    transactions: Transaction[],
  ): MonthComparison | null {
    const monthly = CalculationUtils.monthlyData(transactions);
    if (monthly.length < 2) return null;

    const current = monthly[monthly.length - 1];
    const previous = monthly[monthly.length - 2];

    const changePercent =
      previous.expenses > 0
        ? ((current.expenses - previous.expenses) / previous.expenses) * 100
        : 0;

    return {
      currentExpenses: current.expenses,
      previousExpenses: previous.expenses,
      changePercent,
      improved: current.expenses <= previous.expenses,
    };
  }

  static biggestExpense(transactions: Transaction[]): Transaction | null {
    const expenses = transactions.filter((t) => t.type === "expense");
    if (expenses.length === 0) return null;
    return expenses.reduce((max, t) => (t.amount > max.amount ? t : max));
  }

  static filterByPeriod(
    transactions: Transaction[],
    period: InsightPeriod,
  ): Transaction[] {
    const months = PERIOD_MONTHS[period];
    if (months === null) return transactions;

    const cutoff = subMonths(new Date(), months);
    return transactions.filter((t) => isAfter(parseISO(t.date), cutoff));
  }
}
