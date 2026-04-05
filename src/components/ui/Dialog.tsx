import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@fintrack/utils";
import { Button } from "./Button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Dialog = ({
  open,
  onClose,
  title,
  children,
  className,
}: DialogProps) => {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-100 dark:border-gray-800 mx-4",
          className,
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            {title}
          </div>
          <Button
            onClick={onClose}
            variant="icon-only"
            size="sm"
            icon={<X size={16}></X>}
            className="p-1.5 border-0 shadow-none"
          ></Button>
        </div>
        <div id="dialog-body" className="px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
};
