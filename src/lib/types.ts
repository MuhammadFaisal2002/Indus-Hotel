// Shared data contracts. The Laravel API in a later phase should return these same shapes.

export type ServiceId = "roomService" | "housekeeping" | "dining" | "beautyParlor";
export type PanelId = "tv" | ServiceId;

export type Department = "Reception" | "Room Service" | "Housekeeping" | "Dining" | "Beauty Parlor";

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

export type BackgroundId = "corridor";

export interface AppConfig {
  background: BackgroundId;
  backgrounds: Record<BackgroundId, string>;
  /** Seconds the welcome screen stays before moving on. */
  welcomeSeconds: number;
  timeZone: string;
}

export interface Channel {
  number: number;
  name: string;
  category: "News" | "Entertainment" | "Sports" | "Movies" | "Kids" | "Religious" | "Music";
}

export interface Contact {
  name: string;
  /** Room-phone extension to dial. */
  ext: string;
}

export interface Photo {
  src: string;
  caption?: string;
}

export interface ServiceOffer {
  name: string;
  /** Short extra line, e.g. timings. */
  detail?: string;
}

/** One footer tab: photos of the service, what it offers, and who to call. No prices or menus. */
export interface ServiceSection {
  id: ServiceId;
  department: Department;
  label: string;
  title: string;
  tagline: string;
  hours?: string;
  /** Highlighted note in the header, e.g. "For ladies only". */
  note?: string;
  photos: Photo[];
  offers: ServiceOffer[];
  contact: Contact;
}

export interface Services {
  channels: Channel[];
  sections: ServiceSection[];
  reception: Contact;
}

export interface GuestRequest {
  department: Department;
  item: string;
}

export interface SentRequest extends GuestRequest {
  id: number;
  roomNo: string;
  /** ISO timestamp */
  at: string;
}
