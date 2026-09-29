"use client";

import { setFocus } from "@noriginmedia/norigin-spatial-navigation";
import { useEffect, useRef } from "react";
import type { Guest, Room } from "@/lib/types";
import { useRemoteKeys } from "@/lib/useRemoteKeys";
import { Backdrop } from "@/components/ui/Backdrop";
import { FocusableButton } from "@/components/ui/FocusableButton";
import { Logo, Ornament } from "@/components/ui/Logo";

interface WelcomeScreenProps {
  guest: Guest | null;
  room: Room;
  background: string;
  seconds: number;
  onDone: () => void;
  /** Back skips straight to Home. */
  onBack: () => void;
}

export function WelcomeScreen({ guest, room, background, seconds, onDone, onBack }: WelcomeScreenProps) {
  useRemoteKeys({ onBack });

  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    setFocus("welcome-continue");
    const t = setTimeout(() => doneRef.current(), seconds * 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <main className="animate-fade-in relative size-full">
      <Backdrop src={background} variant="welcome" />

      <div className="safe-area relative flex size-full flex-col items-center justify-center text-center">
        <Logo className="animate-rise-in h-[8.5rem] w-auto" />

        <div className="animate-rise-in mt-10 [animation-delay:200ms]">
          <p className="text-lead tracking-[0.6em] text-muted uppercase">A Warm</p>
          <h1 className="mt-1 font-display text-[8.5rem] leading-[0.9] font-semibold tracking-wide">Welcome</h1>
          <p className="mt-2 font-display text-[3.5rem] leading-none text-white/90 italic">to Indus Hotel</p>
        </div>

        <Ornament className="animate-rise-in mt-8 [animation-delay:400ms]" />

        <div className="animate-rise-in mt-8 [animation-delay:500ms]">
          <p className="text-body tracking-[0.35em] uppercase">We are delighted to have you with us</p>
          <p className="mt-3 text-body text-muted">Relax. Unwind. Experience true hospitality.</p>
        </div>

        {guest && (
          <p className="animate-rise-in mt-8 font-display text-[2.75rem] leading-none text-gold [animation-delay:700ms]">
            {guest.title} {guest.name} <span className="text-dolphin">·</span> Room {room.roomNo}
          </p>
        )}

        <div className="animate-rise-in mt-12 flex flex-col items-center gap-5 [animation-delay:900ms]">
          <FocusableButton
            focusKey="welcome-continue"
            onPress={onDone}
            label="Continue"
            className="rounded-full border-2 border-white/25 bg-white/10 px-14 py-5 text-label font-semibold tracking-[0.3em] uppercase data-[tv-focus=true]:bg-brand"
          >
            Press OK to continue
          </FocusableButton>
          <div className="h-1 w-80 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full origin-left rounded-full bg-gold/80"
              style={{ animation: `countdown ${seconds}s linear both` }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
