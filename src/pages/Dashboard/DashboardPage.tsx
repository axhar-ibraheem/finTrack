import { useMemo } from "react";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { useAppSelector, useTransactionStatus } from "@fintrack/hooks";
import {
  StatCard,
  Card,
  BalanceTrendChart,
  SpendingDonutChart,
  MonthlyComparisonChart,
  StatCardSkeleton,
  ChartSkeleton,
  TableSkeleton,
} from "@fintrack/components";
import { CalculationUtils, FormatUtils } from "@fintrack/utils";
import { DashboardUtils } from "./_utils/dashboard.utils";
import { RecentTransactions } from "./_components/RecentTransactions";

export const DashboardPage = () => {
  const transactions = useAppSelector((state) => state.transactions.items);

  const { isLoading, isFailed, error } = useTransactionStatus();

  const totalIncome = useMemo(
    () => CalculationUtils.totalIncome(transactions),
    [transactions],
  );
  const totalExpenses = useMemo(
    () => CalculationUtils.totalExpenses(transactions),
    [transactions],
  );

  const savingsRate = useMemo(
    () => CalculationUtils.savingsRate(transactions),
    [transactions],
  );
  const categoryData = useMemo(
    () => CalculationUtils.categoryBreakdown(transactions),
    [transactions],
  );
  const monthlyData = useMemo(
    () => CalculationUtils.monthlyData(transactions),
    [transactions],
  );
  const balanceTrend = useMemo(
    () => DashboardUtils.balanceTrend(transactions),
    [transactions],
  );
  const balance = useMemo(
    () => DashboardUtils.balance(transactions),
    [transactions],
  );

  if (isFailed) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
          <span className="text-red-500 text-xl">!</span>
        </div>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Failed to load transactions
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i}></StatCardSkeleton>
          ))
        ) : (
          <>
            <StatCard
              label="Total Balance"
              value={FormatUtils.currency(balance)}
              icon={<Wallet size={16}></Wallet>}
              accentColor="bg-blue-500"
              trend="up"
              trendLabel="vs last month"
            ></StatCard>
            <StatCard
              label="Total Income"
              value={FormatUtils.currency(totalIncome)}
              icon={<TrendingUp size={16}></TrendingUp>}
              accentColor="bg-green-500"
              trend="up"
              trendLabel="vs last month"
            ></StatCard>
            <StatCard
              label="Total Expenses"
              value={FormatUtils.currency(totalExpenses)}
              icon={<TrendingDown size={16}></TrendingDown>}
              accentColor="bg-red-500"
              trend="down"
              trendLabel="vs last month"
            ></StatCard>
            <StatCard
              label="Savings Rate"
              value={FormatUtils.percentage(savingsRate)}
              icon={<PiggyBank size={16}></PiggyBank>}
              accentColor="bg-purple-500"
              trend="up"
              trendLabel="vs last month"
            ></StatCard>
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
                Balance trend
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Running balance over time
              </p>
            </div>
            <BalanceTrendChart data={balanceTrend}></BalanceTrendChart>
          </Card>
          <Card>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Spending breakdown
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Expenses by category
              </p>
            </div>
            <SpendingDonutChart data={categoryData}></SpendingDonutChart>
          </Card>
        </div>
      )}

      {isLoading ? (
        <ChartSkeleton></ChartSkeleton>
      ) : (
        <Card>
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Monthly comparison
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Income vs expenses per month
            </p>
          </div>
          <MonthlyComparisonChart data={monthlyData}></MonthlyComparisonChart>
        </Card>
      )}
      {isLoading ? (
        <TableSkeleton rows={5}></TableSkeleton>
      ) : (
        <RecentTransactions transactions={transactions}></RecentTransactions>
      )}
    </div>
  );
};
