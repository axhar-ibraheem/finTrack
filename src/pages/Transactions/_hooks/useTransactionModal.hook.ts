import { useState, useEffect } from "react";
import {
  useAppDispatch,
  useTransactionStatus,
  useInput,
} from "@fintrack/hooks";
import { addTransactionAsync, updateTransactionAsync } from "@fintrack/store";
import {
  TransactionUtils,
  type TypeFormState,
} from "../_utils/transactions.utils";
import type { Transaction } from "@fintrack/types";

interface UseTransactionModalProps {
  open: boolean;
  editingTransaction: Transaction | null;
  onClose: () => void;
}

interface UseTransactionModalResult {
  isEditing: boolean;
  isMutating: boolean;
  description: ReturnType<typeof useInput>;
  amount: ReturnType<typeof useInput>;
  date: ReturnType<typeof useInput>;
  typeForm: TypeFormState;
  updateTypeForm: <K extends keyof TypeFormState>(
    field: K,
    value: TypeFormState[K],
  ) => void;
  handleSubmit: () => Promise<void>;
}

export const useTransactionModal = ({
  open,
  editingTransaction,
  onClose,
}: UseTransactionModalProps): UseTransactionModalResult => {
  const dispatch = useAppDispatch();
  const isEditing = editingTransaction !== null;
  const { mutations } = useTransactionStatus();
  const isMutating = mutations.add.loading || mutations.update.loading;

  const description = useInput(TransactionUtils.isDescriptionValid);
  const amount = useInput(TransactionUtils.isAmountValid);
  const date = useInput(TransactionUtils.isDateValid);

  const [typeForm, setTypeForm] = useState<TypeFormState>(
    TransactionUtils.getDefaultTypeForm(),
  );

  const updateTypeForm = <K extends keyof TypeFormState>(
    field: K,
    value: TypeFormState[K],
  ) => {
    setTypeForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!open) return;

    if (editingTransaction) {
      description.reset(editingTransaction.description);
      amount.reset(String(editingTransaction.amount));
      date.reset(editingTransaction.date);
      setTypeForm(
        TransactionUtils.getTypeFormFromTransaction(editingTransaction),
      );
    } else {
      description.reset();
      amount.reset();
      date.reset(TransactionUtils.getDefaultDate());
      setTypeForm(TransactionUtils.getDefaultTypeForm());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, editingTransaction]);

  const validate = (): boolean => {
    description.onBlur();
    amount.onBlur();
    date.onBlur();

    return (
      TransactionUtils.isDescriptionValid(description.value) &&
      TransactionUtils.isAmountValid(amount.value) &&
      TransactionUtils.isDateValid(date.value)
    );
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const transaction = TransactionUtils.buildTransaction(
      {
        description: description.value,
        amount: amount.value,
        date: date.value,
        type: typeForm.type,
        category: typeForm.category,
      },
      editingTransaction,
    );

    try {
      if (isEditing) {
        await dispatch(updateTransactionAsync(transaction)).unwrap();
      } else {
        await dispatch(addTransactionAsync(transaction)).unwrap();
      }
      onClose();
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return {
    isEditing,
    isMutating,
    description,
    amount,
    date,
    typeForm,
    updateTypeForm,
    handleSubmit,
  };
};
