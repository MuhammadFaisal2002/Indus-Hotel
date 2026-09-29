"use client";

import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect, useRef, useState } from "react";
import type { PromoVideo as PromoVideoData } from "@/lib/types";
import { useRemoteKeys } from "@/lib/useRemoteKeys";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { Logo } from "@/components/ui/Logo";

interface PromoVideoProps {
  video: PromoVideoData;
  onDone: () => void;
}

export function PromoVideo({ video, onDone }: PromoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useRemoteKeys({ onBack: onDone });

  useEffect(() => {
    setFocus("promo-skip");
    const el = ref.current;
    if (!el) return;
    el.volume = 0.35;
    // Browsers block autoplay with sound until the user has pressed something.
    // Fall back to muted playback so the video still runs.
    el.play().catch(() => {
      el.muted = true;
      setMuted(true);
      el.play().catch(() => {});
    });
  }, []);

  return (
    <main className="animate-fade-in relative size-full bg-ink">
      <video
        ref={ref}
        src={video.src}
        className="absolute inset-0 size-full object-cover"
        loop
        playsInline
        preload="auto"
        onError={onDone}
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-ink/50" />

      <div className="safe-area relative flex size-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <Logo className="h-[6.5rem] w-auto" />
          {muted && (
            <span className="rounded-full bg-ink/70 px-6 py-3 text-label tracking-[0.2em] text-muted uppercase">
              Sound off
            </span>
          )}
        </div>

        <div className="flex items-end justify-between">
          <p className="font-display text-title italic">{video.title}</p>
          <FocusableButton
            focusKey="promo-skip"
            onPress={onDone}
            label="Continue to home"
            className="rounded-full border-2 border-white/25 bg-ink/70 px-12 py-5 text-label font-semibold tracking-[0.3em] uppercase data-[tv-focus=true]:bg-brand"
          >
            Press OK to continue
          </FocusableButton>
        </div>
      </div>
    </main>
  );
}
