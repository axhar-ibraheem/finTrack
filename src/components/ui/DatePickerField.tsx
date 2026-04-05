import ReactDatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import { Calendar } from "lucide-react";
import { cn } from "@fintrack/utils";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePickerField = ({
  label,
  value,
  onChange,
  onBlur,
  error = false,
  errorMessage,
  className,
  minDate,
  maxDate,
}: DatePickerFieldProps) => {
  const selected = value ? parseISO(value) : null;

  const handleChange = (date: Date | null) => {
    onChange(date ? format(date, "yyyy-MM-dd") : "");
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
          {label}
        </label>
      )}

      <ReactDatePicker
        selected={selected}
        onChange={handleChange}
        onBlur={onBlur}
        dateFormat="MMM dd, yyyy"
        minDate={minDate}
        maxDate={maxDate}
        showPopperArrow={false}
        popperPlacement="top-start"
        withPortal={false}
        fixedHeight
        portalId="root"
        customInput={
          <button
            type="button"
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-sm border transition-colors duration-150 text-left",
              "bg-white dark:bg-gray-800",
              "focus:outline-none focus:ring-2",
              error
                ? "border-red-400 dark:border-red-500 focus:ring-red-400"
                : "border-gray-200 dark:border-gray-700 focus:ring-blue-500",
            )}
          >
            <Calendar
              size={14}
              className="text-gray-400 dark:text-gray-500 shrink-0"
            ></Calendar>
            <span
              className={cn(
                "text-sm",
                selected
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-500",
              )}
            >
              {selected ? format(selected, "MMM dd, yyyy") : "Select date"}
            </span>
          </button>
        }
      ></ReactDatePicker>
      {error && errorMessage && (
        <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};
