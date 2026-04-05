import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useAppDispatch, useAppSelector } from "@fintrack/hooks";
import { fetchTransactions } from "@fintrack/store";
import { PAGE_TITLES } from "@fintrack/constants";
import { ThemeUtils } from "@fintrack/utils";

export const AppLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const status = useAppSelector((state) => state.transactions.status);
  const title = PAGE_TITLES[location.pathname] ?? "Fintrak";

  useEffect(() => {
    ThemeUtils.applyTheme(theme);
    if (theme !== "system") return;
    const mediaQuery = ThemeUtils.getMediaQuery();
    const handleSystemChange = () => {
      ThemeUtils.applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions());
    }
  }, [dispatch, status]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar></Sidebar>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header title={title}></Header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};
