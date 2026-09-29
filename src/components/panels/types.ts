import type { Contact, Department } from "@/lib/types";

export interface PanelProps {
  onClose: () => void;
  /** Place a call to a department and show the confirmation toast. */
  onCall: (department: Department, contact: Contact) => void;
  /** Show a toast without sending anything. */
  notify: (text: string) => void;
}
