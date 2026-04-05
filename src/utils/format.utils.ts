import type { TransactionType } from "@fintrack/types";
import { format, parseISO } from "date-fns";

export class FormatUtils {
  static currency(amount: number, showSign = false): string {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

    return showSign ? `+${formatted}` : formatted;
  }

  static transactionAmount(amount: number, type: TransactionType): string {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

    return type === "income" ? `+${formatted}` : `-${formatted}`;
  }

  static date(dateStr: string): string {
    return format(parseISO(dateStr), "MMM dd, yyyy");
  }

  static monthYear(dateStr: string): string {
    return format(parseISO(dateStr), "MMMM yyyy");
  }

  static shortMonth(dateStr: string): string {
    return format(parseISO(dateStr), "MMM yyyy");
  }

  static monthKey(dateStr: string): string {
    return format(parseISO(dateStr), "yyyy-MM");
  }

  static percentage(value: number, decimals = 1): string {
    return `${value.toFixed(decimals)}%`;
  }
}
