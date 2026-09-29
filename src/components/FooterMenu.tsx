"use client";

import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import type { PanelId, Room } from "@/lib/types";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { PhoneIcon } from "@/components/ui/Icons";

export interface MenuItem {
  id: PanelId;
  label: string;
}

export const footerKey = (id: PanelId) => `footer-${id}`;
export const CALL_RECEPTION_KEY = "footer-call-reception";

interface FooterMenuProps {
  items: MenuItem[];
  room: Room;
  active: PanelId | null;
  onOpen: (id: PanelId) => void;
  onCallReception: () => void;
}

const itemClass =
  "rounded-xl px-5 py-5 text-label font-medium tracking-[0.18em] whitespace-nowrap text-white/90 uppercase data-[tv-focus=true]:bg-brand data-[tv-focus=true]:text-white";

export function FooterMenu({ items, room, active, onOpen, onCallReception }: FooterMenuProps) {
  const { ref, focusKey } = useFocusable({ focusKey: "footer", saveLastFocusedChild: true, trackChildren: true });

  return (
    <footer className="relative border-t border-white/10 bg-ink/85 px-[5vw] pt-6 pb-[5vh]">
      <div className="flex items-center justify-between gap-8">
        <FocusContext.Provider value={focusKey}>
          <nav ref={ref} className="flex items-center gap-1">
            {items.map((item) => (
              <FocusableButton
                key={item.id}
                focusKey={footerKey(item.id)}
                onPress={() => onOpen(item.id)}
                label={item.label}
                className={itemClass}
              >
                {item.label}
                <span
                  className={`absolute inset-x-5 bottom-2 h-0.5 rounded-full bg-gold transition-opacity ${
                    active === item.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </FocusableButton>
            ))}
            <span className="mx-2 h-10 w-px bg-white/15" aria-hidden />
            <FocusableButton
              focusKey={CALL_RECEPTION_KEY}
              onPress={onCallReception}
              label="Call Reception"
              className={`${itemClass} flex items-center gap-3 border-2 border-brand/70`}
            >
              <PhoneIcon className="size-7" />
              Reception
            </FocusableButton>
          </nav>
        </FocusContext.Provider>

        <dl className="flex shrink-0 gap-8">
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
