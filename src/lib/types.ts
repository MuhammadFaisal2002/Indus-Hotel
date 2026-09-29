// Shared data contracts. The Laravel API in a later phase should return these same shapes.

export type PanelId =
  | "tv"
  | "roomService"
  | "housekeeping"
  | "dining"
  | "spa"
  | "frontDesk"
  | "billing";

export type Department = "Room Service" | "Housekeeping" | "Dining" | "Spa" | "Front Desk";

export interface Room {
  roomNo: string;
  wifi: { ssid: string; password: string };
}

export interface Guest {
  title: string;
  name: string;
  /** ISO date */
  checkIn: string;
  /** ISO date */
  checkOut: string;
  promoVideoId: string;
}

export interface PromoVideo {
  id: string;
  title: string;
  src: string;
}

export type BackgroundId = "lobby" | "corridor";

export interface AppConfig {
  background: BackgroundId;
  backgrounds: Record<BackgroundId, string>;
  /** Seconds the welcome screen stays before moving on. */
  welcomeSeconds: number;
  timeZone: string;
  taxRate: number;
}

export interface Channel {
  number: number;
  name: string;
  category: "News" | "Entertainment" | "Sports" | "Movies" | "Kids" | "Religious" | "Music";
}

export interface PricedItem {
  id: string;
  name: string;
  description?: string;
  /** PKR. 0 means free. */
  price: number;
}

export interface DiningCategory {
  id: string;
  name: string;
  items: PricedItem[];
}

export interface SpaService extends PricedItem {
  durationMin: number;
}

export interface Extension {
  name: string;
  ext: string;
}

export interface Services {
  channels: Channel[];
  roomService: PricedItem[];
  housekeeping: PricedItem[];
  dining: {
    name: string;
    timings: { label: string; hours: string }[];
    categories: DiningCategory[];
  };
  spa: {
    name: string;
    note: string;
    hours: string;
    services: SpaService[];
  };
  frontDesk: {
    extensions: Extension[];
    checkInTime: string;
    checkOutTime: string;
    amenities: string[];
  };
}

export interface BillLine {
  id: string;
  /** ISO date */
  date: string;
  department: Department;
  item: string;
  qty: number;
  /** PKR per unit */
  unitPrice: number;
}

export interface Bill {
  lines: BillLine[];
  taxRate: number;
}

export interface GuestRequest {
  department: Department;
  item: string;
  price?: number;
}

export interface SentRequest extends GuestRequest {
  id: number;
  roomNo: string;
  /** ISO timestamp */
  at: string;
}
