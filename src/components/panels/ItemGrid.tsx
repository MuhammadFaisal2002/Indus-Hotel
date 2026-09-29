"use client";

import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { ActionPill, cardClass } from "@/components/panels/Panel";

export interface GridItem {
  id: string;
  name: string;
  description?: string;
  /** Small line under the name, e.g. duration. */
  meta?: string;
  /** Display price, e.g. "Rs. 2,500" or "Free". */
  price: string;
  /** PKR amount sent with the request. */
  amount: number;
}

interface ItemGridProps {
  /** Prefix for item focus keys: item N gets `${keyPrefix}-${N}`. */
  keyPrefix: string;
  items: GridItem[];
  actionLabel: string;
  onSelect: (item: GridItem) => void;
}

export const itemKey = (prefix: string, index: number) => `${prefix}-${index}`;

/** Two-column grid of priced cards; the whole card is the button. */
export function ItemGrid({ keyPrefix, items, actionLabel, onSelect }: ItemGridProps) {
  const { ref, focusKey } = useFocusable({ focusKey: `${keyPrefix}-grid`, saveLastFocusedChild: true, trackChildren: true });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="grid grid-cols-2 gap-x-10 gap-y-7">
        {items.map((item, i) => (
          <FocusableButton
            key={item.id}
            focusKey={itemKey(keyPrefix, i)}
            onPress={() => onSelect(item)}
            label={`${actionLabel} ${item.name}`}
            className={cardClass}
          >
            {(focused) => (
              <div className="flex items-center justify-between gap-8">
                <div className="min-w-0">
                  <div className="truncate text-lead font-semibold">{item.name}</div>
                  {(item.description || item.meta) && (
                    <div className={`mt-1 truncate text-body ${focused ? "text-white/85" : "text-muted"}`}>
                      {[item.meta, item.description].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-3">
                  <span
                    className={`font-display text-[2.5rem] leading-none font-semibold ${focused ? "text-white" : "text-gold"}`}
                  >
                    {item.price}
                  </span>
                  <ActionPill label={actionLabel} focused={focused} />
                </div>
              </div>
            )}
          </FocusableButton>
        ))}
      </div>
    </FocusContext.Provider>
  );
}
