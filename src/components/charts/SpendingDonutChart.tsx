import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FormatUtils, type CategorySummary } from "@fintrack/utils";
import { EmptyMessage } from "@fintrack/components";
import { PieChart as PieChartIcon } from "lucide-react";

interface SpendingDonutChartProps {
  data: CategorySummary[];
}

interface TooltipPayload {
  value: number;
  name: string;
  color: string;
  payload: CategorySummary;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const COLORS = [
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#f43f5e",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#6366f1",
];

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  const entry = payload[0];

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
        {entry.name}
      </p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {FormatUtils.currency(entry.value ?? 0)}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {FormatUtils.percentage(entry.payload.percentage)}
      </p>
    </div>
  );
};

export const SpendingDonutChart = ({ data }: SpendingDonutChartProps) => {
  if (data.length === 0) {
    return (
      <EmptyMessage
        icon={<PieChartIcon size={32}></PieChartIcon>}
        title="No spending data yet"
        description="Add some expense transactions to see your spending breakdown."
      ></EmptyMessage>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ResponsiveContainer
        width="100%"
        height={200}
        style={{ outline: "none" }}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            dataKey="total"
            nameKey="category"
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]}></Cell>
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-2">
        {data.slice(0, 5).map((entry, index) => (
          <div
            key={entry.category}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {entry.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-900 dark:text-white">
                {FormatUtils.currency(entry.total)}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 w-10 text-right">
                {FormatUtils.percentage(entry.percentage)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
