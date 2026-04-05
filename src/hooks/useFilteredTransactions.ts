import { useMemo } from "react";
import { useAppSelector } from "./useAppSelector";

export const useFilteredTransactions = () => {
  const items = useAppSelector((state) => state.transactions.items);
  const { search, category, type, month, sortField, sortOrder } =
    useAppSelector((state) => state.filters);

  const filtered = useMemo(() => {
    let result = [...items];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.description.toLowerCase().includes(q));
    }

    if (category !== "All") {
      result = result.filter((t) => t.category === category);
    }

    if (type !== "All") {
      result = result.filter((t) => t.type === type);
    }

    if (month !== "All") {
      result = result.filter((t) => t.date.startsWith(month));
    }

    result.sort((a, b) => {
      let comparison = 0;

      if (sortField === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === "amount") {
        comparison = a.amount - b.amount;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [items, search, category, type, month, sortField, sortOrder]);

  return filtered;
};
