"use client";

import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import type { ReactNode } from "react";

interface FocusableButtonProps {
  focusKey?: string;
  onPress: () => void;
  onFocus?: () => void;
  className?: string;
  /** Wide rows grow less on focus so they don't overflow their container. */
  wide?: boolean;
  label?: string;
  children: ReactNode | ((focused: boolean) => ReactNode);
}

/** Keep the focused element visible inside the nearest `[data-tv-scroll]` container. */
function keepInView(node: HTMLElement) {
  const container = node.closest<HTMLElement>("[data-tv-scroll]");
  if (!container) return;
  const pad = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.5;
  const c = container.getBoundingClientRect();
  const n = node.getBoundingClientRect();
  if (n.top < c.top + pad) {
    container.scrollBy({ top: n.top - c.top - pad, behavior: "smooth" });
  } else if (n.bottom > c.bottom - pad) {
    container.scrollBy({ top: n.bottom - c.bottom + pad, behavior: "smooth" });
  }
}

export function FocusableButton({
  focusKey,
  onPress,
  onFocus,
  className = "",
  wide = false,
  label,
  children,
}: FocusableButtonProps) {
  const { ref, focused } = useFocusable<object, HTMLDivElement>({
    focusKey,
    accessibilityLabel: label,
    onEnterPress: (_props, details) => {
      // Ignore auto-repeat from a held OK button, otherwise one press skips several screens.
      if ((details.pressedKeys.enter ?? 0) > 1) return;
      onPress();
    },
    onFocus: (layout) => {
      keepInView(layout.node);
      onFocus?.();
    },
  });

  return (
    <div
      ref={ref}
      role="button"
      aria-label={label}
      data-tv-focus={focused}
      className={`tv-focusable ${wide ? "tv-wide" : ""} ${className}`}
    >
      {typeof children === "function" ? children(focused) : children}
    </div>
  );
}
