import { type HTMLAttributes } from "react";
import { cn } from "@fintrack/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
}

export const Card = ({
  children,
  className,
  padding = true,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "shadow-sm bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm",
        padding && "p-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
