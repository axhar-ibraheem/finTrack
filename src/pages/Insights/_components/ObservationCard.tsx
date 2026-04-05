import { type ReactNode } from "react";
import { Card } from "@fintrack/components";
import { cn } from "@fintrack/utils";

interface ObservationCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  body: ReactNode;
}

export const ObservationCard = ({
  icon,
  iconBg,
  title,
  body,
}: ObservationCardProps) => {
  return (
    <Card className="flex items-start gap-4">
      <div
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
          iconBg,
        )}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {body}
        </p>
      </div>
    </Card>
  );
};
