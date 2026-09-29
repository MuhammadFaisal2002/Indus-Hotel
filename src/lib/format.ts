import type { BillLine } from "@/lib/types";

const pkr = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

/** `2500` → `Rs. 2,500` */
export function formatPKR(amount: number): string {
  return `Rs. ${pkr.format(Math.round(amount))}`;
}

/** `0` → `Free`, otherwise PKR. */
export function formatPrice(amount: number): string {
  return amount === 0 ? "Free" : formatPKR(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** ISO date `2026-09-28` → `28 Sep` */
export function formatShortDate(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

export function lineTotal(line: BillLine): number {
  return line.qty * line.unitPrice;
}

export interface BillTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export function computeBillTotals(lines: BillLine[], taxRate: number): BillTotals {
  const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0);
  const tax = Math.round(subtotal * taxRate);
  return { subtotal, tax, total: subtotal + tax };
}
