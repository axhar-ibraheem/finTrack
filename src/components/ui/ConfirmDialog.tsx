import { AlertTriangle } from "lucide-react";
import { Dialog } from "./Dialog";
import { Button } from "./Button";
import { cn } from "@fintrack/utils";

type ConfirmDialogVariant = "danger" | "warning";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmDialogVariant;
  loading?: boolean;
}

const variantConfig: Record<
  ConfirmDialogVariant,
  {
    iconBg: string;
    iconColor: string;
    confirmVariant: "danger" | "primary";
  }
> = {
  danger: {
    iconBg: "bg-red-50 dark:bg-red-900/30",
    iconColor: "text-red-500 dark:text-red-400",
    confirmVariant: "danger",
  },
  warning: {
    iconBg: "bg-amber-50 dark:bg-amber-900/30",
    iconColor: "text-amber-500 dark:text-amber-400",
    confirmVariant: "primary",
  },
};

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) => {
  const config = variantConfig[variant];

  return (
    <Dialog open={open} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            config.iconBg,
          )}
        >
          <AlertTriangle size={22} className={config.iconColor}></AlertTriangle>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full pt-2 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="secondary"
            className="flex-1 rounded-sm"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={config.confirmVariant}
            className="flex-1 rounded-sm"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
