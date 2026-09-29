import { Suspense } from "react";
import { TvApp } from "@/components/TvApp";

// State machine lives in TvApp: welcome → promo → home.
// `?room=204` picks the room; `?bg=corridor` previews the other background.
export default function Page() {
  return (
    <Suspense fallback={<div className="size-full bg-ink" />}>
      <TvApp />
    </Suspense>
  );
}
