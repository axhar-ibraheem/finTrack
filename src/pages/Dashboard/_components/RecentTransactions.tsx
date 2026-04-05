import { Card, EmptyMessage, TransactionTable } from "@fintrack/components";
import { useMemo } from "react";
import { DashboardUtils } from "../_utils/dashboard.utils";
import type { Transaction } from "@fintrack/types";
import { Receipt } from "lucide-react";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RECENT_TRANSACTIONS_COUNT = 5;

export const RecentTransactions = ({
  transactions,
}: RecentTransactionsProps) => {
  const hasTransactions = transactions.length > 0;

  const recentTxns = useMemo(
    () =>
      DashboardUtils.getRecentTransactions(
        transactions,
        RECENT_TRANSACTIONS_COUNT,
      ),
    [transactions],
  );

  return (
    <Card padding={false}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Recent transactions
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Last {`${RECENT_TRANSACTIONS_COUNT}`} transactions
          </p>
        </div>
      </div>
      {hasTransactions ? (
        <TransactionTable
          transactions={recentTxns}
          hideActions
        ></TransactionTable>
      ) : (
        <EmptyMessage
          icon={<Receipt size={32}></Receipt>}
          title="No recent transactions"
          description="Add your first transaction to get started."
        ></EmptyMessage>
      )}
    </Card>
  );
};
