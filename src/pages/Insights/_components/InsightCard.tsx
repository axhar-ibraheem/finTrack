import { type ReactNode } from "react";
import { Card } from "@fintrack/components";
import { cn } from "@fintrack/utils";

type Trend = "up" | "down" | "neutral";

interface InsightCardProps {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  iconBg: string;
  trend?: Trend;
  trendLabel?: string;
}

const trendConfig: Record<Trend, { color: string; symbol: string }> = {
  up: { color: "text-green-600 dark:text-green-400", symbol: "↑" },
  down: { color: "text-red-500 dark:text-red-400", symbol: "↓" },
  neutral: { color: "text-gray-500 dark:text-gray-400", symbol: "→" },
};

export const InsightCard = ({
  label,
  value,
  description,
  icon,
  iconBg,
  trend,
  trendLabel,
}: InsightCardProps) => {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center",
            iconBg,
          )}
        >
          {icon}
        </div>
        {trend && trendLabel && (
          <span
            className={cn(
              "text-xs font-medium flex items-center gap-1",
              trendConfig[trend].color,
            )}
          >
            {trendConfig[trend].symbol} {trendLabel}
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </Card>
  );
};
