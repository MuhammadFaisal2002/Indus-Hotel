"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface ToastMessage {
  id: number;
  text: string;
}

const ToastContext = createContext<(text: string) => void>(() => {});

export function useToast(): (text: string) => void {
  return useContext(ToastContext);
}

const VISIBLE_MS = 3200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback((text: string) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), text });
    timer.current = setTimeout(() => setToast(null), VISIBLE_MS);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-[3.5vh] z-50 flex justify-center" aria-live="polite">
        {toast && (
          <div
            key={toast.id}
            className="animate-rise-in flex items-center gap-5 rounded-full border-2 border-gold/60 bg-charcoal/95 py-5 pr-12 pl-6 shadow-[0_1.5rem_4rem_rgb(0_0_0/0.6)]"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-gold text-ink">
              <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-lead font-medium">{toast.text}</span>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
