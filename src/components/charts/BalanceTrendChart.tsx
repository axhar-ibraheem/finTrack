import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { FormatUtils } from "@fintrack/utils";
import { EmptyMessage } from "@fintrack/components";
import { Activity } from "lucide-react";

export interface BalanceTrendPoint {
  date: string;
  balance: number;
}

interface BalanceTrendChartProps {
  data: BalanceTrendPoint[];
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
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2 shadow-md">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {FormatUtils.currency(payload[0].value ?? 0)}
      </p>
    </div>
  );
};

export const BalanceTrendChart = ({ data }: BalanceTrendChartProps) => {
  const formatted = data.map((point) => ({
    ...point,
    label: format(parseISO(point.date), "MMM dd"),
  }));

  if (data.length === 0) {
    return (
      <EmptyMessage
        icon={<Activity size={32}></Activity>}
        title="No balance data yet"
        description="Add some transactions to see your balance trend over time."
      ></EmptyMessage>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart
        data={formatted}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}></stop>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}></stop>
          </linearGradient>
        </defs>
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
          interval="preserveStartEnd"
        ></XAxis>
        <YAxis
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={45}
        ></YAxis>
        <Tooltip content={<CustomTooltip></CustomTooltip>}></Tooltip>
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#balanceGradient)"
          dot={false}
          activeDot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
        ></Area>
      </AreaChart>
    </ResponsiveContainer>
  );
};
