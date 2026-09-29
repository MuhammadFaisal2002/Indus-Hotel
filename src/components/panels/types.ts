import type { Department } from "@/lib/types";

export interface PanelProps {
  onClose: () => void;
  /** Send a request/order/booking and show the confirmation toast. */
  onRequest: (department: Department, item: string, price?: number) => void;
  /** Show a toast without sending anything. */
  notify: (text: string) => void;
}
