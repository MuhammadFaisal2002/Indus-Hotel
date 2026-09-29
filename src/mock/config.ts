import type { AppConfig } from "@/lib/types";

export const config: AppConfig = {
  // Lobby is the default: it is landscape and high enough resolution for 1080p.
  // The corridor photo is portrait (418×529), so it gets cropped and soft at full screen.
  // Switch here, or preview with ?bg=corridor.
  background: "lobby",
  backgrounds: {
    lobby: "/backgrounds/bg-lobby.png",
    corridor: "/backgrounds/bg-corridor.png",
  },
  welcomeSeconds: 30,
  timeZone: "Asia/Karachi",
  taxRate: 0.16, // placeholder, client to confirm (Sindh sales tax on services)
};
