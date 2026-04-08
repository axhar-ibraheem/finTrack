import { Pencil, Trash2 } from "lucide-react";
import { CategoryBadge, TypeBadge, Button } from "@fintrack/components";
import { cn, FormatUtils } from "@fintrack/utils";
import type { Transaction } from "@fintrack/types";

interface TransactionRowProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
  hideActions?: boolean;
}

export const TransactionRow = ({
  transaction,
  onEdit,
  onDelete,
  hideActions = false,
}: TransactionRowProps) => {
  return (
    <tr className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {FormatUtils.date(transaction.date)}
      </td>

      <td className="px-4 py-3.5">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {transaction.description}
        </p>
      </td>

      <td className="px-4 py-3.5">
        <CategoryBadge category={transaction.category}></CategoryBadge>
      </td>

      <td className="px-4 py-3.5 whitespace-nowrap">
        <span
          className={cn(
            "text-sm font-semibold",
            transaction.type === "income"
              ? "text-green-600 dark:text-green-400"
              : "text-red-500 dark:text-red-400",
          )}
        >
          {FormatUtils.transactionAmount(transaction.amount, transaction.type)}
        </span>
      </td>

      <td className="px-4 py-3.5">
        <TypeBadge type={transaction.type}></TypeBadge>
      </td>

      <td className="px-4 py-3.5">
        {!hideActions && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(transaction)}
              title="Edit transaction"
              icon={<Pencil size={14}></Pencil>}
              className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            ></Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(transaction)}
              title="Delete transaction"
              icon={<Trash2 size={14}></Trash2>}
              className="text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
            ></Button>
          </div>
        )}
      </td>
    </tr>
  );
};
