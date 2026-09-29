// All TV-remote key handling lives here.
//
// - Arrows + OK are handled by norigin spatial navigation (configured below).
// - Back is handled by a small handler stack: the most recently mounted screen/panel wins.
// - `window.IndusRemote.press(key)` lets the Android WebView wrapper inject keys later.

import { init, setKeyMap } from "@noriginmedia/norigin-spatial-navigation";

export type RemoteKey = "up" | "down" | "left" | "right" | "enter" | "back";

// Numbers are legacy `keyCode`s. 19–23 are Android DPAD codes, 66 is Android ENTER.
const KEY_MAP = {
  left: [37, 21, "ArrowLeft"],
  up: [38, 19, "ArrowUp"],
  right: [39, 22, "ArrowRight"],
  down: [40, 20, "ArrowDown"],
  enter: [13, 23, 66, "Enter", "NumpadEnter", "Select"],
};

// 8 Backspace, 27 Escape, 4 Android BACK, 10009 Samsung Tizen, 461 LG webOS.
const BACK_KEYS: ReadonlySet<string> = new Set(["Escape", "Backspace", "GoBack", "BrowserBack"]);
const BACK_CODES: ReadonlySet<number> = new Set([4, 8, 27, 10009, 461]);

/** Which DOM key name to synthesize for each remote key (see `press`). */
const SYNTHETIC_KEY: Record<RemoteKey, string> = {
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  enter: "Enter",
  back: "Escape",
};

export function isBackKey(e: KeyboardEvent): boolean {
  return BACK_KEYS.has(e.key) || BACK_CODES.has(e.keyCode);
}

type BackHandler = () => void;
const backStack: BackHandler[] = [];

/** Register a Back handler. The latest one registered is the only one called. Returns an unsubscribe. */
export function pushBackHandler(handler: BackHandler): () => void {
  backStack.push(handler);
  return () => {
    const i = backStack.lastIndexOf(handler);
    if (i !== -1) backStack.splice(i, 1);
  };
}

function onKeyDown(e: KeyboardEvent) {
  if (!isBackKey(e)) return;
  // Stop Backspace from navigating the WebView history.
  e.preventDefault();
  if (e.repeat) return;
  backStack[backStack.length - 1]?.();
}

/** Inject a remote key as if it came from the keyboard. Used by the Android bridge. */
export function press(key: RemoteKey): void {
  const init: KeyboardEventInit = { key: SYNTHETIC_KEY[key], bubbles: true };
  window.dispatchEvent(new KeyboardEvent("keydown", init));
  window.dispatchEvent(new KeyboardEvent("keyup", init));
}

declare global {
  interface Window {
    IndusRemote?: { press: (key: RemoteKey) => void };
  }
}

let started = false;

/** Idempotent. Must run before any focusable mounts, so it is called at module load on the client. */
export function startRemote(): void {
  if (started || typeof window === "undefined") return;
  started = true;
  init({ throttle: 90, throttleKeypresses: true });
  setKeyMap(KEY_MAP);
  window.addEventListener("keydown", onKeyDown);
  window.IndusRemote = { press };
}
