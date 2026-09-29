"use client";

import { formatPrice } from "@/lib/format";
import type { PricedItem } from "@/lib/types";
import { ItemGrid, itemKey } from "@/components/panels/ItemGrid";
import { Panel, PanelScroll } from "@/components/panels/Panel";
import type { PanelProps } from "@/components/panels/types";

export function HousekeepingPanel({ items, onClose, onRequest }: PanelProps & { items: PricedItem[] }) {
  return (
    <Panel
      title="Housekeeping"
      subtitle="Anything you need for a comfortable stay"
      initialFocusKey={itemKey("hk", 0)}
      onClose={onClose}
    >
      <PanelScroll>
        <ItemGrid
          keyPrefix="hk"
          actionLabel="Request"
          items={items.map((it) => ({ ...it, amount: it.price, price: formatPrice(it.price) }))}
          onSelect={(it) => onRequest("Housekeeping", it.name, it.amount)}
        />
      </PanelScroll>
    </Panel>
  );
}
