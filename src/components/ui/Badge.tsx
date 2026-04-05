import { cn } from "@fintrack/utils";
import type { Category, TransactionType } from "@fintrack/types";

const categoryColors: Record<Category, string> = {
  Food: "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Rent: "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  Travel: "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Entertainment:
    "bg-purple-50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  Healthcare: "bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  Utilities: "bg-teal-50 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  Shopping: "bg-pink-50 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  Salary: "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Freelance:
    "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
};

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export const CategoryBadge = ({ category, className }: CategoryBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      categoryColors[category],
      className,
    )}
  >
    {category}
  </span>
);

const typeColors: Record<TransactionType, string> = {
  income: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  expense: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

interface TypeBadgeProps {
  type: TransactionType;
  className?: string;
}

export const TypeBadge = ({ type, className }: TypeBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
      typeColors[type],
      className,
    )}
  >
    {type}
  </span>
);
