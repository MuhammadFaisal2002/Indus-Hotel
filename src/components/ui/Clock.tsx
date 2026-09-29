"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 10_000);
  return () => clearInterval(id);
}

// Snapshot is the current minute, so React only re-renders when the display changes.
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

export function Clock({ timeZone }: { timeZone: string }) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  if (minute === null) return null;

  const now = new Date(minute * 60_000);
  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone });
  const date = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone });

  return (
    <div className="text-right">
      <div className="font-display text-[4.25rem] leading-none font-medium tabular-nums">{time}</div>
      <div className="mt-2 text-label tracking-[0.2em] text-muted uppercase">{date}</div>
    </div>
  );
}
