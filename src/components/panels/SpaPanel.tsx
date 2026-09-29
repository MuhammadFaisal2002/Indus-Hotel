"use client";

import { formatDuration, formatPKR } from "@/lib/format";
import type { Services } from "@/lib/types";
import { ItemGrid, itemKey } from "@/components/panels/ItemGrid";
import { Panel, PanelScroll } from "@/components/panels/Panel";
import type { PanelProps } from "@/components/panels/types";

export function SpaPanel({ spa, onClose, onRequest }: PanelProps & { spa: Services["spa"] }) {
  return (
    <Panel
      title={spa.name}
      subtitle={`Open ${spa.hours}`}
      aside={
        <span className="rounded-full border-2 border-gold/70 bg-gold/10 px-7 py-3 text-label font-semibold tracking-[0.25em] text-gold uppercase">
          {spa.note}
        </span>
      }
      initialFocusKey={itemKey("spa", 0)}
      onClose={onClose}
    >
      <PanelScroll>
        <ItemGrid
          keyPrefix="spa"
          actionLabel="Book"
          items={spa.services.map((s) => ({
            id: s.id,
            name: s.name,
            meta: formatDuration(s.durationMin),
            price: formatPKR(s.price),
            amount: s.price,
          }))}
          onSelect={(it) => onRequest("Spa", it.name, it.amount)}
        />
      </PanelScroll>
    </Panel>
  );
}
