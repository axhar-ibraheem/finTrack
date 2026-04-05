import { useMemo, useState } from "react";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Receipt,
  Info,
  Calendar,
  RefreshCcw,
} from "lucide-react";
import { useAppSelector, useTransactionStatus } from "@fintrack/hooks";
import {
  Card,
  MonthlyComparisonChart,
  InsightCardSkeleton,
  ChartSkeleton,
} from "@fintrack/components";
import { CalculationUtils, FormatUtils, cn } from "@fintrack/utils";
import { InsightCard } from "./_components/InsightCard";
import { ObservationCard } from "./_components/ObservationCard";
import { CategoryBreakdown } from "./_components/CategoryBreakdown";
import { InsightUtils } from "./_utils/insights.utils";
import { type InsightPeriod } from "./_types/insights.types";
import { EMPTY_STATE_MESSAGES } from "@fintrack/constants";
import { INSIGHT_PERIODS } from "./_constants/insights.constants";

const SAVINGS_RATE_TARGET = 20;

export const InsightsPage = () => {
  const allTransactions = useAppSelector((state) => state.transactions.items);
  const { isLoading, isFailed, error } = useTransactionStatus();

  const [activePeriod, setActivePeriod] = useState<InsightPeriod>("All");

  const transactions = useMemo(
    () => InsightUtils.filterByPeriod(allTransactions, activePeriod),
    [allTransactions, activePeriod],
  );
  const categoryData = useMemo(
    () => CalculationUtils.categoryBreakdown(transactions),
    [transactions],
  );
  const monthlyData = useMemo(
    () => CalculationUtils.monthlyData(transactions),
    [transactions],
  );
  const savingsRate = useMemo(
    () => CalculationUtils.savingsRate(transactions),
    [transactions],
  );
  const monthOverMonthData = useMemo(
    () => InsightUtils.monthOverMonthComparison(transactions),
    [transactions],
  );
  const biggestExp = useMemo(
    () => InsightUtils.biggestExpense(transactions),
    [transactions],
  );
  const recurringCount = useMemo(
    () => InsightUtils.getRecurringCount(transactions),
    [transactions],
  );
  const topCategory = useMemo(
    () => InsightUtils.getTopCategory(transactions),
    [transactions],
  );
  const mostActiveMonth = useMemo(
    () => InsightUtils.getMostActiveMonth(monthlyData),
    [monthlyData],
  );

  if (isFailed) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Failed to load insights
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Spending insights
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Patterns and observations from your financial data
          </p>
        </div>

        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 ml-auto">
          {INSIGHT_PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer",
                activePeriod === period
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <InsightCardSkeleton key={i}></InsightCardSkeleton>
          ))
        ) : (
          <>
            <InsightCard
              label="Top spending category"
              value={topCategory ? topCategory.category : "—"}
              description={
                topCategory
                  ? `${FormatUtils.currency(topCategory.total)} across ${topCategory.count} transactions`
                  : EMPTY_STATE_MESSAGES.NO_EXPENSE_DATA
              }
              icon={
                <Trophy
                  size={16}
                  className="text-amber-600 dark:text-amber-400"
                ></Trophy>
              }
              iconBg="bg-amber-50 dark:bg-amber-900/30"
              trend="down"
              trendLabel={
                topCategory
                  ? `${FormatUtils.percentage(topCategory.percentage)} of total`
                  : ""
              }
            ></InsightCard>

            <InsightCard
              label="Biggest expense"
              value={biggestExp ? FormatUtils.currency(biggestExp.amount) : "—"}
              description={
                biggestExp
                  ? `${biggestExp.description} on ${biggestExp.date}`
                  : EMPTY_STATE_MESSAGES.NO_EXPENSE_DATA
              }
              icon={
                <Receipt
                  size={16}
                  className="text-red-500 dark:text-red-400"
                ></Receipt>
              }
              iconBg="bg-red-50 dark:bg-red-900/30"
              trend="down"
              trendLabel="single transaction"
            ></InsightCard>

            <InsightCard
              label="Savings rate"
              value={FormatUtils.percentage(savingsRate)}
              description="Percentage of income saved after all expenses"
              icon={
                <TrendingUp
                  size={16}
                  className="text-green-600 dark:text-green-400"
                ></TrendingUp>
              }
              iconBg="bg-green-50 dark:bg-green-900/30"
              trend={savingsRate >= SAVINGS_RATE_TARGET ? "up" : "down"}
              trendLabel={
                savingsRate >= SAVINGS_RATE_TARGET
                  ? "Healthy rate"
                  : "Below target"
              }
            ></InsightCard>
          </>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <ChartSkeleton className="xl:col-span-2"></ChartSkeleton>
          <ChartSkeleton></ChartSkeleton>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Monthly income vs expenses
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Side by side comparison per month
              </p>
            </div>
            <MonthlyComparisonChart data={monthlyData}></MonthlyComparisonChart>
          </Card>
          <CategoryBreakdown data={categoryData}></CategoryBreakdown>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <InsightCardSkeleton key={i}></InsightCardSkeleton>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ObservationCard
            icon={
              <TrendingDown
                size={16}
                className="text-blue-600 dark:text-blue-400"
              ></TrendingDown>
            }
            iconBg="bg-blue-50 dark:bg-blue-900/30"
            title="Month over month spending"
            body={
              monthOverMonthData ? (
                <span>
                  Your expenses{" "}
                  {monthOverMonthData.improved ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      decreased by{" "}
                      {FormatUtils.percentage(
                        Math.abs(monthOverMonthData.changePercent),
                      )}
                    </span>
                  ) : (
                    <span className="text-red-500 dark:text-red-400 font-medium">
                      increased by{" "}
                      {FormatUtils.percentage(
                        Math.abs(monthOverMonthData.changePercent),
                      )}
                    </span>
                  )}{" "}
                  compared to last month. Current month total is{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {FormatUtils.currency(monthOverMonthData.currentExpenses)}
                  </span>
                  .
                </span>
              ) : (
                EMPTY_STATE_MESSAGES.NOT_ENOUGH_DATA
              )
            }
          ></ObservationCard>

          <ObservationCard
            icon={
              <RefreshCcw
                size={16}
                className="text-amber-600 dark:text-amber-400"
              ></RefreshCcw>
            }
            iconBg="bg-amber-50 dark:bg-amber-900/30"
            title="Recurring transactions"
            body={
              <span>
                Found{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {recurringCount} recurring transactions
                </span>{" "}
                based on matching descriptions across multiple months.
              </span>
            }
          ></ObservationCard>

          <ObservationCard
            icon={
              <Calendar
                size={16}
                className="text-purple-600 dark:text-purple-400"
              ></Calendar>
            }
            iconBg="bg-purple-50 dark:bg-purple-900/30"
            title="Most active month"
            body={
              mostActiveMonth ? (
                <span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {mostActiveMonth.label}
                  </span>{" "}
                  had the highest total financial activity across income and
                  expenses.
                </span>
              ) : (
                EMPTY_STATE_MESSAGES.NO_MONTHLY_DATA
              )
            }
          ></ObservationCard>

          <ObservationCard
            icon={
              <Info
                size={16}
                className="text-teal-600 dark:text-teal-400"
              ></Info>
            }
            iconBg="bg-teal-50 dark:bg-teal-900/30"
            title="Savings health"
            body={
              <span>
                Your overall savings rate is{" "}
                <span
                  className={
                    savingsRate >= SAVINGS_RATE_TARGET
                      ? "font-medium text-green-600 dark:text-green-400"
                      : "font-medium text-red-500 dark:text-red-400"
                  }
                >
                  {FormatUtils.percentage(savingsRate)}
                </span>
                .{" "}
                {savingsRate >= SAVINGS_RATE_TARGET
                  ? "Great job — financial advisors recommend saving at least 20% of income."
                  : "Consider reducing discretionary spending to reach the recommended 20% savings rate."}
              </span>
            }
          ></ObservationCard>
        </div>
      )}
    </div>
  );
};
