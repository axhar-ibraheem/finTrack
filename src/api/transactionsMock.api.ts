import { mockTransactions } from "@fintrack/data";
import type { Transaction } from "@fintrack/types";

const STORAGE_KEY = "fintrack_transactions";

const MOCK_DELAYS_IN_MS = {
  FETCH: 800,
  MUTATE: 600,
} as const;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const readFromStorage = (): Transaction[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Transaction[]) : null;
  } catch {
    return null;
  }
};

const writeToStorage = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    console.error("Failed to persist transactions to localStorage");
  }
};

export class TransactionsMockApi {
  static async fetchAll(): Promise<Transaction[]> {
    await delay(MOCK_DELAYS_IN_MS.FETCH);
    const stored = readFromStorage();
    if (stored) return stored;
    writeToStorage(mockTransactions);
    return mockTransactions;
  }

  static async create(transaction: Transaction): Promise<Transaction> {
    await delay(MOCK_DELAYS_IN_MS.MUTATE);
    const current = readFromStorage() ?? [];
    const updated = [transaction, ...current];
    writeToStorage(updated);
    return transaction;
  }

  static async update(transaction: Transaction): Promise<Transaction> {
    await delay(MOCK_DELAYS_IN_MS.MUTATE);
    const current = readFromStorage() ?? [];
    const updated = current.map((t) =>
      t.id === transaction.id ? transaction : t,
    );
    writeToStorage(updated);
    return transaction;
  }

  static async remove(id: string): Promise<string> {
    await delay(MOCK_DELAYS_IN_MS.MUTATE);
    const current = readFromStorage() ?? [];
    const updated = current.filter((t) => t.id !== id);
    writeToStorage(updated);
    return id;
  }

  static clearStorage(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
