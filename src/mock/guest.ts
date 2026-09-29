import type { Guest } from "@/lib/types";

/** Guests currently checked in, keyed by room number. */
export const guestsByRoom: Record<string, Guest> = {
  "204": {
    title: "Mr.",
    name: "Ali Khan",
    checkIn: "2026-09-27",
    checkOut: "2026-10-01",
    promoVideoId: "family",
  },
  "305": {
    title: "Ms.",
    name: "Sana Mirza",
    checkIn: "2026-09-28",
    checkOut: "2026-09-30",
    promoVideoId: "business",
  },
};
