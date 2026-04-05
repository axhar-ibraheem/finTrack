import {
  Dialog,
  SelectField,
  InputField,
  Button,
  DatePickerField,
} from "@fintrack/components";
import { cn } from "@fintrack/utils";
import type { Transaction, Category } from "@fintrack/types";
import {
  TRANSACTION_TYPES,
  VALIDATION_MESSAGES,
} from "../_constants/transaction.contants";
import { TransactionUtils } from "../_utils/transactions.utils";
import { useTransactionModal } from "../_hooks/useTransactionModal.hook";

interface TransactionModalProps {
  open: boolean;
  editingTransaction: Transaction | null;
  onClose: () => void;
}

export const TransactionModal = ({
  open,
  editingTransaction,
  onClose,
}: TransactionModalProps) => {
  const {
    isEditing,
    isMutating,
    description,
    amount,
    date,
    typeForm,
    updateTypeForm,
    handleSubmit,
  } = useTransactionModal({ open, editingTransaction, onClose });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit transaction" : "Add transaction"}
    >
      <div className="flex flex-col gap-4">
        <InputField
          label="Description"
          type="text"
          placeholder="e.g. Grocery Store"
          value={description.value}
          onChange={description.onChange}
          onBlur={description.onBlur}
          error={description.hasError}
          errorMessage={VALIDATION_MESSAGES.REQUIRED_DESCRIPTION}
        ></InputField>

        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="Amount ($)"
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={amount.value}
            onChange={amount.onChange}
            onBlur={amount.onBlur}
            error={amount.hasError}
            errorMessage={VALIDATION_MESSAGES.INVALID_AMOUNT}
          ></InputField>

          <DatePickerField
            label="Date"
            value={date.value}
            onChange={(value) => date.reset(value)}
            onBlur={date.onBlur}
            error={date.hasError}
            errorMessage={VALIDATION_MESSAGES.REQUIRED_DATE}
          ></DatePickerField>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
            Category
          </label>
          <SelectField
            value={typeForm.category}
            onChange={(value) => updateTypeForm("category", value as Category)}
            options={TransactionUtils.getCategoryOptions()}
            className="w-full"
          ></SelectField>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
            Type
          </label>
          <div className="grid grid-cols-2 rounded-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {TRANSACTION_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => updateTypeForm("type", t)}
                className={cn(
                  "cursor-pointer py-2 text-sm font-medium capitalize transition-colors",
                  typeForm.type === t
                    ? t === "income"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="secondary"
            onClick={onClose}
            className="rounded-sm"
            disabled={isMutating}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="rounded-sm"
            loading={isMutating}
          >
            {isEditing ? "Save changes" : "Add transaction"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
