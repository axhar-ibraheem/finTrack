import { FileX } from "lucide-react";
import { TransactionRow } from "./TransactionRow";
import { EmptyMessage, ConfirmDialog } from "@fintrack/components";
import {
  useAppDispatch,
  useFilteredTransactions,
  useTransactionStatus,
} from "@fintrack/hooks";
import { deleteTransactionAsync } from "@fintrack/store";
import { useState } from "react";
import { type Transaction } from "@fintrack/types";
import { EMPTY_STATE_MESSAGES, CONFIRM_MESSAGES } from "@fintrack/constants";
import { cn } from "@fintrack/utils";

interface TransactionTableProps {
  onEdit?: (transaction: Transaction) => void;
  hideActions?: boolean;
  transactions?: Transaction[];
}

const tableHeaderClasses =
  "py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide";

const columns = ["Date", "Description", "Category", "Amount", "Type"] as const;

export const TransactionTable = ({
  onEdit,
  hideActions,
  transactions: propTransactions,
}: TransactionTableProps) => {
  const dispatch = useAppDispatch();
  const filteredTransactions = useFilteredTransactions();
  const transactions = propTransactions ?? filteredTransactions;
  const { mutations } = useTransactionStatus();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>(null);

  const handleDeleteClick = (transaction: Transaction) => {
    setDeletingTransaction(transaction);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingTransaction) return;
    try {
      await dispatch(deleteTransactionAsync(deletingTransaction.id)).unwrap();
      setConfirmOpen(false);
      setDeletingTransaction(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleDeleteClose = () => {
    if (mutations.delete.loading) return;
    setConfirmOpen(false);
    setDeletingTransaction(null);
  };

  if (transactions.length === 0) {
    return (
      <EmptyMessage
        icon={<FileX size={40}></FileX>}
        title={EMPTY_STATE_MESSAGES.NO_TRANSACTIONS}
        description={EMPTY_STATE_MESSAGES.NO_TRANSACTIONS_DESC}
      ></EmptyMessage>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              {columns.map((col) => (
                <th
                  key={col}
                  className={cn(
                    tableHeaderClasses,
                    col === "Type" ? "px-7" : "px-4",
                  )}
                >
                  {col}
                </th>
              ))}

              {!hideActions && (
                <th className={`${tableHeaderClasses} ${"px-8"}`}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={handleDeleteClick}
                hideActions={hideActions}
              ></TransactionRow>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        title={CONFIRM_MESSAGES.DELETE_TRANSACTION_TITLE}
        description={CONFIRM_MESSAGES.DELETE_TRANSACTION_DESC}
        confirmLabel={CONFIRM_MESSAGES.DELETE_CONFIRM_LABEL}
        cancelLabel={CONFIRM_MESSAGES.DELETE_CANCEL_LABEL}
        variant="danger"
        loading={mutations.delete.loading}
      ></ConfirmDialog>
    </>
  );
};
