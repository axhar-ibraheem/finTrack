import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@fintrack/utils";

export interface SelectOption<VALUE_TYPE extends string = string> {
  label: string;
  value: VALUE_TYPE;
}

interface SelectFieldProps<VALUE_TYPE extends string = string> {
  value: VALUE_TYPE;
  onChange: (value: VALUE_TYPE) => void;
  options: SelectOption<VALUE_TYPE>[];
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const SelectField = <VALUE_TYPE extends string = string>({
  value,
  onChange,
  options,
  className,
  disabled = false,
  placeholder,
}: SelectFieldProps<VALUE_TYPE>) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (val: VALUE_TYPE) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((open) => !open)}
        className={cn(
          "inline-flex items-center justify-between gap-2 text-xs font-medium",
          "pl-3 pr-2.5 py-2 rounded-sm w-full",
          "border border-gray-200 dark:border-gray-600",
          "bg-white dark:bg-gray-800/60",
          "text-gray-800 dark:text-gray-200",
          "shadow-sm hover:shadow-md transition-all duration-200",
          "hover:border-gray-300 dark:hover:border-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none",
          "cursor-pointer select-none",
          open && "shadow-sm",
        )}
      >
        <span className={cn(!selected && "text-gray-400 dark:text-gray-500")}>
          {selected ? selected.label : (placeholder ?? "Select…")}
        </span>
        <ChevronDown
          size={12}
          strokeWidth={2.5}
          className={cn(
            "text-gray-400 dark:text-gray-500 transition-transform duration-200",
            open && "rotate-180",
          )}
        ></ChevronDown>
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-1.5 min-w-full",
            "bg-white dark:bg-gray-800",
            "border border-gray-200 dark:border-gray-600",
            "rounded-sm shadow-sm",
            "py-1 overflow-y-auto max-h-48",
            "animate-in fade-in-0 zoom-in-95 duration-100",
          )}
        >
          {options.map((opt) => {
            const isActive = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "w-full flex items-center justify-between gap-4",
                  "text-left text-xs font-medium px-3 py-2",
                  "transition-colors duration-100 cursor-pointer",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50",
                )}
              >
                {opt.label}
                {isActive && (
                  <Check
                    size={11}
                    strokeWidth={2.5}
                    className="shrink-0 text-blue-500"
                  ></Check>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
