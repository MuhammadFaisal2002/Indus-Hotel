import type { BillLine } from "@/lib/types";

/** Running bill per room. Totals are computed in the UI, never stored. */
export const billLinesByRoom: Record<string, BillLine[]> = {
  "204": [
    { id: "b1", date: "2026-09-27", department: "Dining", item: "Dinner — Chicken Karahi (Full)", qty: 1, unitPrice: 3800 }, // placeholder, client to confirm
    { id: "b2", date: "2026-09-27", department: "Room Service", item: "Doodh Patti Chai", qty: 2, unitPrice: 450 }, // placeholder, client to confirm
    { id: "b3", date: "2026-09-28", department: "Dining", item: "Breakfast — Halwa Puri", qty: 2, unitPrice: 950 }, // placeholder, client to confirm
    { id: "b4", date: "2026-09-28", department: "Housekeeping", item: "Laundry", qty: 6, unitPrice: 250 }, // placeholder, client to confirm
    { id: "b5", date: "2026-09-28", department: "Spa", item: "Signature Facial", qty: 1, unitPrice: 4500 }, // placeholder, client to confirm
    { id: "b6", date: "2026-09-28", department: "Room Service", item: "Club Sandwich", qty: 1, unitPrice: 1400 }, // placeholder, client to confirm
    { id: "b7", date: "2026-09-29", department: "Dining", item: "BBQ Platter for Two", qty: 1, unitPrice: 4500 }, // placeholder, client to confirm
    { id: "b8", date: "2026-09-29", department: "Housekeeping", item: "Ironing", qty: 4, unitPrice: 150 }, // placeholder, client to confirm
    { id: "b9", date: "2026-09-29", department: "Spa", item: "Manicure", qty: 1, unitPrice: 2000 }, // placeholder, client to confirm
  ],
  "305": [
    { id: "c1", date: "2026-09-28", department: "Room Service", item: "Fresh Coffee", qty: 2, unitPrice: 650 }, // placeholder, client to confirm
    { id: "c2", date: "2026-09-29", department: "Dining", item: "Breakfast — English Breakfast", qty: 1, unitPrice: 1500 }, // placeholder, client to confirm
  ],
};
