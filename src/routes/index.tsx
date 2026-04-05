import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@fintrack/components";
import { DashboardPage, TransactionsPage, InsightsPage } from "@fintrack/pages";
import { ERROR_MESSAGES, ROUTES } from "@fintrack/constants";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <AppLayout></AppLayout>,
    children: [
      {
        index: true,
        element: <DashboardPage></DashboardPage>,
      },
      {
        path: ROUTES.TRANSACTIONS,
        element: <TransactionsPage></TransactionsPage>,
      },
      {
        path: ROUTES.INSIGHTS,
        element: <InsightsPage></InsightsPage>,
      },
      {
        path: "*",
        element: (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {ERROR_MESSAGES.PAGE_NOT_FOUND}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {ERROR_MESSAGES.PAGE_NOT_FOUND_DESC}
            </p>
          </div>
        ),
      },
    ],
  },
]);
