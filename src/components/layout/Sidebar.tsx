import { NavLink, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@fintrack/utils";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@fintrack/hooks";
import {
  toggleSidebar,
  toggleMobileSidebar,
  closeMobileSidebar,
} from "@fintrack/store";
import { Button } from "@fintrack/components";
import { NAV_ITEMS } from "@fintrack/constants";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { sidebarCollapsed, mobileSidebarOpen } = useAppSelector(
    (state) => state.ui,
  );

  useEffect(() => {
    dispatch(closeMobileSidebar());
  }, [location.pathname, dispatch]);

  const sidebarContent = (
    <div
      className={cn(
        "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300",
        "max-md:w-64",
        !sidebarCollapsed ? "md:w-56" : "md:w-16",
      )}
    >
      <div
        className={cn(
          "items-center gap-3 px-4 py-5 h-18 border-b border-gray-100 dark:border-gray-800",
          "hidden md:flex",
          sidebarCollapsed && "md:justify-center md:px-0",
        )}
      >
        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">F</span>
        </div>
        {!sidebarCollapsed && (
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Fintrak
          </span>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800 md:hidden">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Fintrak
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(toggleMobileSidebar())}
          icon={<X size={16}></X>}
        ></Button>
      </div>

      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                sidebarCollapsed && "md:justify-center md:px-0",
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
              )
            }
          >
            <Icon size={18} className="shrink-0"></Icon>
            <span className={cn(sidebarCollapsed && "md:hidden")}>{label}</span>
          </NavLink>
        ))}
      </nav>
      <Button
        variant="icon-only"
        size="sm"
        onClick={() => dispatch(toggleSidebar())}
        icon={
          sidebarCollapsed ? (
            <ChevronRight size={12}></ChevronRight>
          ) : (
            <ChevronLeft size={12}></ChevronLeft>
          )
        }
        className="hidden md:flex absolute -right-3 top-6 p-1.5"
      ></Button>
    </div>
  );

  return (
    <>
      <div className="hidden md:flex relative h-full">{sidebarContent}</div>
      <>
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => dispatch(closeMobileSidebar())}
          ></div>
        )}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {sidebarContent}
        </div>
      </>
    </>
  );
};
