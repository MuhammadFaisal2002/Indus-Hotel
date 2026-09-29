/* eslint-disable @next/next/no-img-element -- plain <img> is lighter than next/image on a TV. */
"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/lib/types";

const INTERVAL_MS = 5000;

/** Auto-advancing crossfade. Only opacity animates, which is cheap on TV chipsets. */
export function Slideshow({ photos, className = "" }: { photos: Photo[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  const caption = photos[index]?.caption;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-ink ${className}`}>
      {photos.map((p, i) => (
        <img
          key={p.src}
          src={p.src}
          alt={p.caption ?? ""}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink/85 to-transparent" />
      <div className="absolute inset-x-8 bottom-6 flex items-end justify-between gap-6">
        <span className="font-display text-[2.25rem] leading-none font-semibold italic">{caption}</span>
        {photos.length > 1 && (
          <div className="flex gap-2.5 pb-2" aria-hidden>
            {photos.map((p, i) => (
              <span
                key={p.src}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-gold" : "w-4 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
