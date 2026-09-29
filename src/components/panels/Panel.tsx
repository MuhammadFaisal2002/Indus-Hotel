"use client";

import { FocusContext, setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect, type ReactNode } from "react";
import { useRemoteKeys } from "@/lib/useRemoteKeys";

interface PanelProps {
  title: string;
  subtitle?: ReactNode;
  /** Extra content on the right of the header (hours, notes…). */
  aside?: ReactNode;
  /** Focus key of the element that gets focus when the panel opens. */
  initialFocusKey: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Large glass panel over the dimmed home screen. It is a focus boundary, so the
 * arrows can't wander back to the footer while it is open.
 */
export function Panel({ title, subtitle, aside, initialFocusKey, onClose, children }: PanelProps) {
  const { ref, focusKey } = useFocusable({ focusKey: "panel", isFocusBoundary: true, trackChildren: true });

  useRemoteKeys({ onBack: onClose });

  useEffect(() => {
    setFocus(initialFocusKey);
  }, [initialFocusKey]);

  return (
    <FocusContext.Provider value={focusKey}>
      <section
        ref={ref}
        className="animate-rise-in absolute inset-x-[5vw] top-[5vh] bottom-4 flex flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-charcoal/92 shadow-[0_2rem_6rem_rgb(0_0_0/0.7)]"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand via-brand/60 to-transparent" />
        <header className="flex items-end justify-between gap-10 border-b border-white/10 px-16 pt-12 pb-8">
          <div>
            <h2 className="font-display text-hero leading-none font-semibold">{title}</h2>
            {subtitle && <div className="mt-4 text-body text-muted">{subtitle}</div>}
          </div>
          <div className="flex shrink-0 items-end gap-10">
            {aside}
            <span className="flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-label tracking-[0.2em] text-muted uppercase">
              <kbd className="font-sans font-semibold text-white">Back</kbd> to close
            </span>
          </div>
        </header>
        <div className="relative min-h-0 flex-1">{children}</div>
      </section>
    </FocusContext.Provider>
  );
}

/** Scrollable body. Focused items scroll themselves into view (see FocusableButton). */
export function PanelScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-tv-scroll className={`no-scrollbar absolute inset-0 overflow-y-auto px-16 py-10 ${className}`}>
      {children}
    </div>
  );
}

/** Shared card look for panel items. */
export const cardClass =
  "rounded-2xl border border-white/10 bg-white/[0.04] px-9 py-7 data-[tv-focus=true]:bg-brand data-[tv-focus=true]:border-transparent";
