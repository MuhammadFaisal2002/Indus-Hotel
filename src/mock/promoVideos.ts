import type { PromoVideo } from "@/lib/types";

// Both entries use the hotel's promo until reception has more videos to choose from.
export const promoVideos: PromoVideo[] = [
  { id: "family", title: "Welcome to Indus Hotel", src: "/media/promo-indus.mp4" },
  { id: "business", title: "Business at Indus Hotel", src: "/media/promo-indus.mp4" },
];
