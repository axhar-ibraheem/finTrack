import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FormatUtils, type MonthlyData } from "@fintrack/utils";
import { format, parseISO } from "date-fns";
import { EmptyMessage } from "@fintrack/components";
import { BarChart2 as BarChartIcon } from "lucide-react";

interface MonthlyComparisonChartProps {
  data: MonthlyData[];
}

interface TooltipPayload {
  value: number;
  name: string;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2 shadow-md min-w-36">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{label}</p>
      {payload.map((entry) => (
        <div
          key={entry.name}
          className="flex items-center justify-between gap-4 mb-1"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
              {entry.name}
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-900 dark:text-white">
            {FormatUtils.currency(entry.value ?? 0)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const MonthlyComparisonChart = ({
  data,
}: MonthlyComparisonChartProps) => {
  const formatted = data.map((d) => ({
    ...d,
    label: format(parseISO(`${d.month}-01`), "MMM yyyy"),
  }));

  if (data.length === 0) {
    return (
      <EmptyMessage
        icon={<BarChartIcon size={32}></BarChartIcon>}
        title="No monthly data yet"
        description="Add transactions across different months to see a comparison."
      ></EmptyMessage>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={formatted}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        barCategoryGap="30%"
        barGap={4}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        ></CartesianGrid>
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
        ></XAxis>
        <YAxis
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={45}
        ></YAxis>
        <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
        <Legend
          wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
          formatter={(value) => (
            <span className="text-gray-600 dark:text-gray-400 capitalize">
              {value}
            </span>
          )}
        ></Legend>
        <Bar
          dataKey="income"
          name="income"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
        ></Bar>
        <Bar
          dataKey="expenses"
          name="expenses"
          fill="#f43f5e"
          radius={[4, 4, 0, 0]}
        ></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
