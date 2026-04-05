import { Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@fintrack/hooks";
import { setRole, toggleMobileSidebar } from "@fintrack/store";
import type { Role } from "@fintrack/types";
import { type SelectOption, SelectField, ThemeToggle, Button } from "../ui";

interface HeaderProps {
  title: string;
}

const roleOptions: SelectOption<Role>[] = [
  { label: "Admin", value: "admin" },
  { label: "Viewer", value: "viewer" },
];

export const Header = ({ title }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.ui);

  return (
    <header className="h-18 px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shrink-0">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleMobileSidebar())}
          icon={<Menu size={18}></Menu>}
          className="md:hidden px-0"
        ></Button>
        <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Role</span>
          <SelectField
            value={role}
            onChange={(value) => dispatch(setRole(value as Role))}
            options={roleOptions}
          ></SelectField>
        </div>
        <ThemeToggle></ThemeToggle>
      </div>
    </header>
  );
};
