"use client";

import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import type { PanelId, Room } from "@/lib/types";
import { FocusableButton } from "@/components/ui/FocusableButton";

export const MENU: { id: PanelId; label: string }[] = [
  { id: "tv", label: "TV" },
  { id: "roomService", label: "Room Service" },
  { id: "housekeeping", label: "Housekeeping" },
  { id: "dining", label: "Dining" },
  { id: "spa", label: "Spa" },
  { id: "frontDesk", label: "Front Desk" },
  { id: "billing", label: "Billing" },
];

export const footerKey = (id: PanelId) => `footer-${id}`;

interface FooterMenuProps {
  room: Room;
  active: PanelId | null;
  onOpen: (id: PanelId) => void;
}

export function FooterMenu({ room, active, onOpen }: FooterMenuProps) {
  const { ref, focusKey } = useFocusable({ focusKey: "footer", saveLastFocusedChild: true, trackChildren: true });

  return (
    <footer className="relative border-t border-white/10 bg-ink/85 px-[5vw] pt-6 pb-[5vh]">
      <div className="flex items-center justify-between gap-8">
        <FocusContext.Provider value={focusKey}>
          <nav ref={ref} className="flex items-center gap-1">
            {MENU.map((item) => (
              <FocusableButton
                key={item.id}
                focusKey={footerKey(item.id)}
                onPress={() => onOpen(item.id)}
                label={item.label}
                className="rounded-xl px-5 py-5 text-label font-medium tracking-[0.18em] whitespace-nowrap text-white/90 uppercase data-[tv-focus=true]:bg-brand data-[tv-focus=true]:text-white"
              >
                {item.label}
                <span
                  className={`absolute inset-x-5 bottom-2 h-0.5 rounded-full bg-gold transition-opacity ${
                    active === item.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </FocusableButton>
            ))}
          </nav>
        </FocusContext.Provider>

        <dl className="flex shrink-0 gap-10">
          <div>
            <dt className="text-[1rem] tracking-[0.3em] text-muted uppercase">Wi-Fi</dt>
            <dd className="mt-1 font-display text-[2rem] leading-none font-medium">{room.wifi.ssid}</dd>
          </div>
          <div>
            <dt className="text-[1rem] tracking-[0.3em] text-muted uppercase">Password</dt>
            <dd className="mt-1 font-display text-[2rem] leading-none font-medium">{room.wifi.password}</dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
