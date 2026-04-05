import { useAppSelector } from "./useAppSelector";
import type { TransactionRequestStatus, MutationState } from "@fintrack/store";

interface TransactionStatusResult {
  status: TransactionRequestStatus;
  isLoading: boolean;
  isSucceeded: boolean;
  isFailed: boolean;
  isIdle: boolean;
  error: string | null;
  mutations: {
    add: MutationState;
    update: MutationState;
    delete: MutationState;
  };
}

export const useTransactionStatus = (): TransactionStatusResult => {
  const status = useAppSelector((state) => state.transactions.status);
  const error = useAppSelector((state) => state.transactions.error);
  const mutations = useAppSelector((state) => state.transactions.mutations);

  return {
    status,
    isLoading: status === "loading",
    isSucceeded: status === "succeeded",
    isFailed: status === "failed",
    isIdle: status === "idle",
    error,
    mutations,
  };
};
