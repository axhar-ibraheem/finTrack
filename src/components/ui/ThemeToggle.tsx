import { Sun, Moon, Monitor } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@fintrack/hooks";
import { setTheme } from "@fintrack/store";
import { cn } from "@fintrack/utils";
import type { Theme } from "@fintrack/types";

interface ThemeOption {
  value: Theme;
  icon: React.ReactNode;
  label: string;
}

const themeOptions: ThemeOption[] = [
  { value: "light", icon: <Sun size={13}></Sun>, label: "Light" },
  { value: "system", icon: <Monitor size={13}></Monitor>, label: "System" },
  { value: "dark", icon: <Moon size={13}></Moon>, label: "Dark" },
];

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const activeTheme = useAppSelector((state) => state.ui.theme);

  return (
    <div
      className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
      title="Toggle theme"
    >
      {themeOptions.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => dispatch(setTheme(value))}
          title={label}
          className={cn(
            "p-1.5 rounded-md transition-colors duration-150 cursor-pointer",
            activeTheme === value
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300",
          )}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};
