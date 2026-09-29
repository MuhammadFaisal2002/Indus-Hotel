"use client";

import { formatPKR } from "@/lib/format";
import type { PricedItem } from "@/lib/types";
import { ItemGrid, itemKey } from "@/components/panels/ItemGrid";
import { Panel, PanelScroll } from "@/components/panels/Panel";
import type { PanelProps } from "@/components/panels/types";

export function RoomServicePanel({ items, onClose, onRequest }: PanelProps & { items: PricedItem[] }) {
  return (
    <Panel
      title="Room Service"
      subtitle="Delivered to your room, 24 hours a day"
      initialFocusKey={itemKey("rs", 0)}
      onClose={onClose}
    >
      <PanelScroll>
        <ItemGrid
          keyPrefix="rs"
          actionLabel="Request"
          items={items.map((it) => ({ ...it, amount: it.price, price: formatPKR(it.price) }))}
          onSelect={(it) => onRequest("Room Service", it.name, it.amount)}
        />
      </PanelScroll>
    </Panel>
  );
}
