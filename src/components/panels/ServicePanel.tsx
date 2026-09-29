"use client";

import type { ServiceSection } from "@/lib/types";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { PhoneIcon } from "@/components/ui/Icons";
import { Slideshow } from "@/components/ui/Slideshow";
import { Panel } from "@/components/panels/Panel";
import type { PanelProps } from "@/components/panels/types";

/** Photos of the service, what it offers, and a Call button. No menus or prices. */
export function ServicePanel({ section, onClose, onCall }: PanelProps & { section: ServiceSection }) {
  const callKey = `call-${section.id}`;
  // Short names fit two per row; entries with a detail line need the full width.
  const twoColumns = section.offers.every((o) => !o.detail);

  return (
    <Panel
      title={section.title}
      subtitle={section.tagline}
      aside={
        <div className="flex items-center gap-6">
          {section.hours && (
            <span className="text-label tracking-[0.2em] text-muted uppercase">
              Open <span className="font-semibold text-white">{section.hours}</span>
            </span>
          )}
          {section.note && (
            <span className="rounded-full border-2 border-gold/70 bg-gold/10 px-7 py-3 text-label font-semibold tracking-[0.25em] text-gold uppercase">
              {section.note}
            </span>
          )}
        </div>
      }
      initialFocusKey={callKey}
      onClose={onClose}
    >
      <div className="grid h-full grid-cols-[1.2fr_1fr] gap-14 px-16 py-8">
        <Slideshow photos={section.photos} className="h-full" />

        <div className="flex min-h-0 flex-col">
          <div className="mb-5 text-label tracking-[0.3em] text-muted uppercase">Our services</div>
          <ul className={`min-h-0 flex-1 content-start gap-x-8 gap-y-4 overflow-hidden ${twoColumns ? "grid grid-cols-2" : "flex flex-col"}`}>
            {section.offers.map((o) => (
              <li key={o.name} className="flex items-baseline gap-5">
                <span className="size-2.5 shrink-0 translate-y-[-0.3rem] rotate-45 bg-gold" aria-hidden />
                <span>
                  <span className="text-body leading-tight font-semibold">{o.name}</span>
                  {o.detail && <span className="block text-body leading-snug text-muted">{o.detail}</span>}
                </span>
              </li>
            ))}
          </ul>

          <FocusableButton
            focusKey={callKey}
            onPress={() => onCall(section.department, section.contact)}
            label={`Call ${section.contact.name}`}
            className="mt-6 shrink-0 rounded-2xl bg-brand px-10 py-5 data-[tv-focus=true]:bg-[#f0303e]"
          >
            <div className="flex items-center gap-7">
              <PhoneIcon className="size-12 shrink-0" />
              <div>
                <div className="text-lead font-semibold tracking-[0.15em] uppercase">Call {section.contact.name}</div>
                <div className="mt-1 text-body text-white/85">Ext. {section.contact.ext} from your room phone</div>
              </div>
            </div>
          </FocusableButton>
        </div>
      </div>
    </Panel>
  );
}
