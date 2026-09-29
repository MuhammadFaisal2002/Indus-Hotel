"use client";

import { useEffect, useRef } from "react";
import { pushBackHandler } from "@/lib/remote";

interface RemoteKeyHandlers {
  /** Called on Back while this component is the top-most Back handler. */
  onBack?: () => void;
}

export function useRemoteKeys({ onBack }: RemoteKeyHandlers): void {
  const backRef = useRef(onBack);
  useEffect(() => {
    backRef.current = onBack;
  });

  const hasBack = onBack !== undefined;
  useEffect(() => {
    if (!hasBack) return;
    return pushBackHandler(() => backRef.current?.());
  }, [hasBack]);
}
