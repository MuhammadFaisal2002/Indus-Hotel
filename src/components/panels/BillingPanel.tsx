"use client";

import { computeBillTotals, formatPKR, formatShortDate, lineTotal } from "@/lib/format";
import type { Bill, BillLine, Department, Guest } from "@/lib/types";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { Panel, PanelScroll } from "@/components/panels/Panel";
import type { PanelProps } from "@/components/panels/types";

function groupByDepartment(lines: BillLine[]): { department: Department; lines: BillLine[] }[] {
  const groups = new Map<Department, BillLine[]>();
  for (const line of lines) {
    groups.set(line.department, [...(groups.get(line.department) ?? []), line]);
  }
  return [...groups].map(([department, lines]) => ({ department, lines }));
}

const noop = () => {};

export function BillingPanel({ bill, guest, onClose }: PanelProps & { bill: Bill; guest: Guest | null }) {
  const groups = groupByDepartment(bill.lines);
  const totals = computeBillTotals(bill.lines, bill.taxRate);
  // Focus keys follow on-screen order (grouped), not the original line order.
  const rowIndex = new Map(groups.flatMap((g) => g.lines).map((l, i) => [l.id, i]));

  return (
    <Panel
      title="Your Bill"
      subtitle={
        guest
          ? `${guest.title} ${guest.name} · ${formatShortDate(guest.checkIn)} – ${formatShortDate(guest.checkOut)}`
          : undefined
      }
      initialFocusKey={bill.lines.length ? "bill-0" : "bill-empty"}
      onClose={onClose}
    >
      <div className="grid h-full grid-cols-[1fr_30rem]">
        <div className="relative min-h-0">
          <PanelScroll>
            {groups.length === 0 && (
              <FocusableButton focusKey="bill-empty" onPress={noop} className="rounded-2xl px-8 py-6" wide>
                <span className="text-lead text-muted">No charges yet.</span>
              </FocusableButton>
            )}
            {groups.map((g) => (
              <section key={g.department} className="mb-10 last:mb-0">
                <div className="mb-3 flex items-baseline justify-between px-8">
                  <h3 className="text-label font-semibold tracking-[0.3em] text-gold uppercase">{g.department}</h3>
                  <span className="text-label text-muted">
                    {formatPKR(g.lines.reduce((s, l) => s + lineTotal(l), 0))}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {g.lines.map((line) => {
                    return (
                      <FocusableButton
                        key={line.id}
                        focusKey={`bill-${rowIndex.get(line.id)}`}
                        onPress={noop}
                        wide
                        label={`${line.item}, ${formatPKR(lineTotal(line))}`}
                        className="rounded-xl bg-white/[0.03] px-8 py-5 data-[tv-focus=true]:bg-white/[0.14]"
                      >
                        <div className="grid grid-cols-[8rem_1fr_6rem_12rem] items-center gap-6 text-body">
                          <span className="text-muted">{formatShortDate(line.date)}</span>
                          <span className="truncate font-medium">{line.item}</span>
                          <span className="text-right text-muted tabular-nums">× {line.qty}</span>
                          <span className="text-right font-semibold tabular-nums">{formatPKR(lineTotal(line))}</span>
                        </div>
                      </FocusableButton>
                    );
                  })}
                </div>
              </section>
            ))}
          </PanelScroll>
        </div>

        <aside className="flex flex-col justify-center border-l border-white/10 bg-ink/40 px-12 py-12">
          <dl className="flex flex-col gap-5 text-body">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="tabular-nums">{formatPKR(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Tax ({Math.round(bill.taxRate * 100)}%)</dt>
              <dd className="tabular-nums">{formatPKR(totals.tax)}</dd>
            </div>
            <div className="mt-4 border-t border-white/15 pt-8">
              <dt className="text-label tracking-[0.3em] text-muted uppercase">Total due</dt>
              <dd className="mt-3 font-display text-[4.5rem] leading-none font-semibold text-gold tabular-nums">
                {formatPKR(totals.total)}
              </dd>
            </div>
          </dl>
          <p className="mt-10 text-label leading-snug text-muted">
            Charges are updated by each department. Please settle at the Front Desk on check-out.
          </p>
        </aside>
      </div>
    </Panel>
  );
}
