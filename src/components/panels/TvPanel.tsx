"use client";

import type { Channel } from "@/lib/types";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { Panel, PanelScroll, cardClass } from "@/components/panels/Panel";
import type { PanelProps } from "@/components/panels/types";

export function TvPanel({ channels, onClose, notify }: PanelProps & { channels: Channel[] }) {
  return (
    <Panel title="TV Channels" subtitle={`${channels.length} channels`} initialFocusKey="tv-0" onClose={onClose}>
      <PanelScroll>
        <div className="grid grid-cols-3 gap-8">
          {channels.map((ch, i) => (
            <FocusableButton
              key={ch.number}
              focusKey={`tv-${i}`}
              onPress={() => notify(`Opening ${ch.name}…`)}
              label={`Channel ${ch.number}, ${ch.name}`}
              className={cardClass}
            >
              {(focused) => (
                <div className="flex items-center gap-7">
                  <span
                    className={`w-20 shrink-0 font-display text-[3.5rem] leading-none font-semibold tabular-nums ${
                      focused ? "text-white" : "text-gold"
                    }`}
                  >
                    {String(ch.number).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-lead font-semibold">{ch.name}</div>
                    <div
                      className={`mt-1 text-label tracking-[0.2em] uppercase ${focused ? "text-white/85" : "text-muted"}`}
                    >
                      {ch.category}
                    </div>
                  </div>
                </div>
              )}
            </FocusableButton>
          ))}
        </div>
      </PanelScroll>
    </Panel>
  );
}
