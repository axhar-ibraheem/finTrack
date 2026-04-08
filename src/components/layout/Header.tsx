import { Menu } from "lucide-react";
import { useAppDispatch } from "@fintrack/hooks";
import { toggleMobileSidebar } from "@fintrack/store";
import { ThemeToggle, Button } from "@fintrack/components";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const dispatch = useAppDispatch();

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
        <ThemeToggle></ThemeToggle>
      </div>
    </header>
  );
};
