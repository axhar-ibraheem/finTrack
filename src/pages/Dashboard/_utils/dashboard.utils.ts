import type { Transaction } from "@fintrack/types";
import { CalculationUtils } from "@fintrack/utils";
import { type BalanceTrendPoint } from "@fintrack/components";

export class DashboardUtils {
  static getRecentTransactions(
    transactions: Transaction[],
    count: number,
  ): Transaction[] {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }

  static balance(transactions: Transaction[]): number {
    return (
      CalculationUtils.totalIncome(transactions) -
      CalculationUtils.totalExpenses(transactions)
    );
  }

  static balanceTrend(transactions: Transaction[]): BalanceTrendPoint[] {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    let runningBalance = 0;
    return sorted.map((t) => {
      runningBalance += t.type === "income" ? t.amount : -t.amount;
      return { date: t.date, balance: runningBalance };
    });
  }
}
