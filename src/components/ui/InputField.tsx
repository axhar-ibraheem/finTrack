import {
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@fintrack/utils";

type InputType = "text" | "email" | "password" | "number" | "date";

interface InputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "onBlur" | "type"
> {
  label: string;
  type?: InputType;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
}

export const InputField = ({
  label,
  type = "text",
  error = false,
  errorMessage,
  onChange,
  onBlur,
  className,
  inputClassName,
  id,
  ...rest
}: InputFieldProps) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={inputId}
        className="block text-xs font-medium text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(
          "w-full px-3 py-2 text-sm rounded-sm border transition-colors duration-150",
          "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
          "placeholder:text-gray-400",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-400 dark:border-red-500 focus:ring-red-400"
            : "border-gray-200 dark:border-gray-700 focus:ring-blue-500",
          inputClassName,
        )}
        {...rest}
      ></input>

      {error && errorMessage && (
        <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};
