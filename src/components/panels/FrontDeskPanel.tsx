"use client";

import type { Services } from "@/lib/types";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { Panel, cardClass } from "@/components/panels/Panel";
import type { PanelProps } from "@/components/panels/types";

const AMENITY_ICONS: Record<string, string> = {
  "Fitness Gym": "M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11",
  "Event Spaces & Conference Halls": "M4 20V8l8-4 8 4v12M9 20v-6h6v6M4 20h16",
  "24/7 Security": "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5",
  "Complimentary Wi-Fi": "M2.5 9a14 14 0 0119 0M5.5 12.5a9.5 9.5 0 0113 0M8.5 16a5 5 0 017 0M12 19.5h.01",
};

export function FrontDeskPanel({ frontDesk, onClose, notify }: PanelProps & { frontDesk: Services["frontDesk"] }) {
  const reception = frontDesk.extensions[0];

  return (
    <Panel title="Front Desk" subtitle="We are here for you, day and night" initialFocusKey="fd-call" onClose={onClose}>
      <div className="grid h-full grid-cols-[1fr_1.35fr] gap-14 px-16 py-10">
        <div className="flex flex-col gap-8">
          <FocusableButton
            focusKey="fd-call"
            onPress={() => notify(`Calling ${reception.name} · Ext. ${reception.ext}…`)}
            label="Call Front Desk"
            className="rounded-2xl bg-brand px-10 py-9 data-[tv-focus=true]:bg-[#f0303e]"
          >
            <div className="flex items-center gap-7">
              <svg viewBox="0 0 24 24" className="size-14 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path
                  d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <div className="text-lead font-semibold tracking-[0.15em] uppercase">Call Front Desk</div>
                <div className="mt-1 text-body text-white/85">Dial {reception.ext} from your room phone</div>
              </div>
            </div>
          </FocusableButton>

          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-6">
              <div className="text-label tracking-[0.25em] text-muted uppercase">Check-in</div>
              <div className="mt-2 font-display text-[3rem] leading-none font-semibold">{frontDesk.checkInTime}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-6">
              <div className="text-label tracking-[0.25em] text-muted uppercase">Check-out</div>
              <div className="mt-2 font-display text-[3rem] leading-none font-semibold">{frontDesk.checkOutTime}</div>
            </div>
          </div>

          <div>
            <div className="mb-4 text-label tracking-[0.25em] text-muted uppercase">Hotel amenities</div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
              {frontDesk.amenities.map((a) => (
                <li key={a} className="flex items-center gap-4 text-body">
                  <svg viewBox="0 0 24 24" className="size-9 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d={AMENITY_ICONS[a] ?? "M5 12l5 5 9-10"} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="leading-tight">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-5 text-label tracking-[0.25em] text-muted uppercase">Extensions</div>
          <div className="grid grid-cols-2 gap-6">
            {frontDesk.extensions.map((x, i) => (
              <FocusableButton
                key={x.name}
                focusKey={`fd-ext-${i}`}
                onPress={() => notify(`Calling ${x.name} · Ext. ${x.ext}…`)}
                label={`Call ${x.name}, extension ${x.ext}`}
                className={`${cardClass} py-6`}
              >
                {(focused) => (
                  <div className="flex items-center justify-between gap-6">
                    <span className="text-lead font-semibold">{x.name}</span>
                    <span
                      className={`font-display text-[3rem] leading-none font-semibold tabular-nums ${
                        focused ? "text-white" : "text-gold"
                      }`}
                    >
                      {x.ext}
                    </span>
                  </div>
                )}
              </FocusableButton>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
