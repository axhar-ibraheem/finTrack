import { Plus } from "lucide-react";
import {
  useAppSelector,
  useFilteredTransactions,
  useTransactionStatus,
} from "@fintrack/hooks";
import {
  Card,
  TransactionTable,
  Button,
  TransactionCardSkeleton,
  TableSkeleton,
} from "@fintrack/components";
import { FormatUtils } from "@fintrack/utils";
import { TransactionFilters } from "./_components/TransactionFilters";
import { TransactionModal } from "./_components/TransactionModal";
import { useState, useMemo } from "react";
import { type Transaction } from "@fintrack/types";
import { TransactionUtils } from "./_utils/transactions.utils";

export const TransactionsPage = () => {
  const role = useAppSelector((state) => state.ui.role);
  const allTxns = useAppSelector((state) => state.transactions.items);
  const filtered = useFilteredTransactions();
  const { isLoading } = useTransactionStatus();

  const isAdmin = role === "admin";

  const summary = useMemo(
    () => TransactionUtils.getFilteredSummary(filtered, allTxns),
    [filtered, allTxns],
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            All transactions
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {allTxns.length} total transactions
          </p>
        </div>
        {isAdmin && (
          <Button
            variant="primary"
            onClick={handleAddTransaction}
            icon={<Plus size={15}></Plus>}
            className="rounded-sm"
          >
            Add transaction
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <TransactionCardSkeleton key={i}></TransactionCardSkeleton>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                +
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Filtered income
              </p>
              <p className="text-base font-semibold text-green-600 dark:text-green-400">
                {FormatUtils.currency(summary.income)}
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <span className="text-red-500 dark:text-red-400 text-sm font-bold">
                −
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Filtered expenses
              </p>
              <p className="text-base font-semibold text-red-500 dark:text-red-400">
                {FormatUtils.currency(summary.expenses)}
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
                #
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing results
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {summary.count} of {summary.total}
              </p>
            </div>
          </Card>
        </div>
      )}

      <Card>
        <TransactionFilters></TransactionFilters>
      </Card>

      {isLoading ? (
        <TableSkeleton rows={8}></TableSkeleton>
      ) : (
        <Card padding={false}>
          <TransactionTable onEdit={handleEditTransaction}></TransactionTable>
        </Card>
      )}

      <TransactionModal
        open={modalOpen}
        editingTransaction={editingTransaction}
        onClose={handleClose}
      ></TransactionModal>
    </div>
  );
};
