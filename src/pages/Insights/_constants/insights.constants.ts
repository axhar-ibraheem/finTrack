import { type InsightPeriod } from "../_types/insights.types";

export const INSIGHT_PERIODS: InsightPeriod[] = ["1M", "3M", "6M", "All"];

export const PERIOD_MONTHS: Record<InsightPeriod, number | null> = {
  "1M": 1,
  "3M": 3,
  "6M": 6,
  All: null,
};
