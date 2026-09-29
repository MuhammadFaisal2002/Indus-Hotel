"use client";

import { FocusContext, setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useState } from "react";
import { formatPKR } from "@/lib/format";
import type { DiningCategory, Services } from "@/lib/types";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { ItemGrid, itemKey } from "@/components/panels/ItemGrid";
import { Panel, PanelScroll } from "@/components/panels/Panel";
import type { PanelProps } from "@/components/panels/types";

const tabKey = (i: number) => `dn-tab-${i}`;
const gridPrefix = (c: DiningCategory) => `dn-${c.id}`;

interface CategoryTabsProps {
  categories: DiningCategory[];
  active: number;
  onChange: (index: number) => void;
}

/**
 * One focus group that remembers its last tab, so pressing Up from any item returns
 * to the current category instead of whichever tab happens to sit above it.
 * It must be its own component so it registers inside the Panel's focus boundary.
 */
function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  const { ref, focusKey } = useFocusable({ focusKey: "dn-tabs", saveLastFocusedChild: true, trackChildren: true });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="flex gap-4 px-16 pt-8 pb-2">
        {categories.map((c, i) => (
          <FocusableButton
            key={c.id}
            focusKey={tabKey(i)}
            onFocus={() => onChange(i)}
            onPress={() => setFocus(itemKey(gridPrefix(c), 0))}
            label={c.name}
            className={`rounded-full border-2 px-10 py-4 text-label font-semibold tracking-[0.25em] uppercase data-[tv-focus=true]:border-transparent data-[tv-focus=true]:bg-brand ${
              i === active ? "border-gold/80 text-gold" : "border-white/15 text-white/80"
            }`}
          >
            {c.name}
          </FocusableButton>
        ))}
      </div>
    </FocusContext.Provider>
  );
}

export function DiningPanel({ dining, onClose, onRequest }: PanelProps & { dining: Services["dining"] }) {
  const [active, setActive] = useState(0);
  const category = dining.categories[active];

  return (
    <Panel
      title={dining.name}
      subtitle="Order from our restaurant to your room"
      aside={
        <dl className="flex gap-8">
          {dining.timings.map((t) => (
            <div key={t.label} className="text-right">
              <dt className="text-[1rem] tracking-[0.3em] text-muted uppercase">{t.label}</dt>
              <dd className="mt-1 text-label font-medium whitespace-nowrap">{t.hours}</dd>
            </div>
          ))}
        </dl>
      }
      initialFocusKey={tabKey(0)}
      onClose={onClose}
    >
      <div className="flex h-full flex-col">
        <CategoryTabs categories={dining.categories} active={active} onChange={setActive} />
        <div className="relative min-h-0 flex-1">
          <PanelScroll className="pt-8">
            <ItemGrid
              key={category.id}
              keyPrefix={gridPrefix(category)}
              actionLabel="Order"
              items={category.items.map((it) => ({ ...it, amount: it.price, price: formatPKR(it.price) }))}
              onSelect={(it) => onRequest("Dining", it.name, it.amount)}
            />
          </PanelScroll>
        </div>
      </div>
    </Panel>
  );
}
