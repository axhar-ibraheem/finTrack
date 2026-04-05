import { Card, EmptyMessage } from "@fintrack/components";
import type { Category } from "@fintrack/types";
import { cn, FormatUtils, type CategorySummary } from "@fintrack/utils";
import { Tag } from "lucide-react";

interface CategoryBreakdownProps {
  data: CategorySummary[];
}

const CATEGORY_COLORS: Record<Category, string> = {
  Food: "bg-amber-400",
  Rent: "bg-red-400",
  Travel: "bg-blue-400",
  Entertainment: "bg-purple-400",
  Healthcare: "bg-rose-400",
  Utilities: "bg-teal-400",
  Shopping: "bg-pink-400",
  Salary: "bg-green-400",
  Freelance: "bg-emerald-400",
};

const CATEGORY_TEXT: Record<Category, string> = {
  Food: "text-amber-700 dark:text-amber-400",
  Rent: "text-red-700 dark:text-red-400",
  Travel: "text-blue-700 dark:text-blue-400",
  Entertainment: "text-purple-700 dark:text-purple-400",
  Healthcare: "text-rose-700 dark:text-rose-400",
  Utilities: "text-teal-700 dark:text-teal-400",
  Shopping: "text-pink-700 dark:text-pink-400",
  Salary: "text-green-700 dark:text-green-400",
  Freelance: "text-emerald-700 dark:text-emerald-400",
};

export const CategoryBreakdown = ({ data }: CategoryBreakdownProps) => {
  if (data.length === 0) {
    return (
      <Card>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Spending by category
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Breakdown of all expenses
          </p>
        </div>
        <EmptyMessage
          icon={<Tag size={32}></Tag>}
          title="No category data yet"
          description="Add some expense transactions to see your spending breakdown by category."
        ></EmptyMessage>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Spending by category
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Breakdown of all expenses
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.category}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    CATEGORY_COLORS[item.category],
                  )}
                ></span>
                <span
                  className={cn(
                    "text-xs font-medium",
                    CATEGORY_TEXT[item.category],
                  )}
                >
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  {FormatUtils.currency(item.total)}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 w-9 text-right">
                  {FormatUtils.percentage(item.percentage)}
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  CATEGORY_COLORS[item.category],
                )}
                style={{ width: `${Math.min(item.percentage, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
