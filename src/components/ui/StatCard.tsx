import { type ReactNode } from "react";
import { cn } from "@fintrack/utils";
import { Card } from "./Card";

type Trend = "up" | "down" | "neutral";

interface StatCardProps {
  label: string;
  value: string;
  trend?: Trend;
  trendLabel?: string;
  icon?: ReactNode;
  accentColor?: string;
  className?: string;
}

const trendConfig: Record<Trend, { color: string; symbol: string }> = {
  up: { color: "text-green-600 dark:text-green-400", symbol: "↑" },
  down: { color: "text-red-600 dark:text-red-400", symbol: "↓" },
  neutral: { color: "text-gray-500 dark:text-gray-400", symbol: "→" },
};

export const StatCard = ({
  label,
  value,
  trend,
  trendLabel,
  icon,
  accentColor = "bg-blue-500",
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("relative overflow-hidden shadow-sm", className)}>
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-1 rounded-l-xl",
          accentColor,
        )}
      />
      <div className="pl-3">
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {label}
          </p>
          {icon && (
            <div className="text-gray-400 dark:text-gray-500">{icon}</div>
          )}
        </div>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          {value}
        </p>
        {trend && trendLabel && (
          <p
            className={cn(
              "text-xs flex items-center gap-1",
              trendConfig[trend].color,
            )}
          >
            <span>{trendConfig[trend].symbol}</span>
            <span>{trendLabel}</span>
          </p>
        )}
      </div>
    </Card>
  );
};
