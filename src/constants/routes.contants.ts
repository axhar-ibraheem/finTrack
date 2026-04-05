import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export const ROUTES = {
  ROOT: "/",
  TRANSACTIONS: "/transactions",
  INSIGHTS: "/insights",
} as const;

export const PAGE_TITLES: Record<string, string> = {
  [ROUTES.ROOT]: "Dashboard",
  [ROUTES.TRANSACTIONS]: "Transactions",
  [ROUTES.INSIGHTS]: "Insights",
};

export const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.ROOT, label: "Dashboard", icon: LayoutDashboard },
  { to: ROUTES.TRANSACTIONS, label: "Transactions", icon: ArrowLeftRight },
  { to: ROUTES.INSIGHTS, label: "Insights", icon: Lightbulb },
];
