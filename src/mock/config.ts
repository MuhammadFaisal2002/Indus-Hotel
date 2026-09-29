import type { AppConfig } from "@/lib/types";

export const config: AppConfig = {
  // Corridor shot from indushotel.com. The old lobby photo is gone because the lobby has been
  // renovated; add the new lobby here once the client sends a photo.
  background: "corridor",
  backgrounds: {
    corridor: "/backgrounds/bg-corridor.jpg",
  },
  welcomeSeconds: 30,
  timeZone: "Asia/Karachi",
};
