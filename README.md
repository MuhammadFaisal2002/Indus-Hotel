# Indus Hotel — In-Room TV Screen

Phase 1: the TV-side web UI for the in-room Android TVs, running entirely on mock data.
Flow: **Welcome** (30 s, or OK to skip) → **Promo video** (loops; OK or Back to leave) → **Home** with a 7-item footer menu, where each item opens a detail panel.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

Open full screen (F11) at 1920×1080. The layout also scales down to 1280×720.

URL options:

| Param | Example | Effect |
| --- | --- | --- |
| `room` | `/?room=305` | Loads that room's guest, Wi-Fi and bill (default `204`). Unknown rooms show a generic welcome. |
| `bg` | `/?bg=corridor` | Previews the other background (default comes from `src/mock/config.ts`). |

## Remote / keyboard mapping

| Remote | Keyboard | Action |
| --- | --- | --- |
| D-pad | Arrow keys | Move focus |
| OK | Enter | Press the focused button |
| Back | Escape or Backspace | Close the open panel. On Welcome or Promo it goes straight to Home. On Home it does nothing. |

Back also accepts `GoBack`/`BrowserBack` and keyCodes `4` (Android), `10009` (Tizen) and `461` (webOS).
Holding OK down does not skip several screens, because auto-repeat is ignored.

The mouse is not used anywhere, and nothing depends on hover.

## Where things live

```
src/
  app/page.tsx, layout.tsx   entry point; fonts via next/font (self-hosted at build)
  components/
    TvApp.tsx                state machine: welcome → promo → home, loads data
    WelcomeScreen.tsx  PromoVideo.tsx  HomeScreen.tsx  FooterMenu.tsx
    panels/                  one file per footer item, plus the Panel shell and ItemGrid
    ui/                      FocusableButton, Toast, Clock, Backdrop, Logo
  lib/
    remote.ts                ALL key handling (spatial nav config, Back stack, Android bridge)
    useRemoteKeys.ts         hook for screens and panels to handle Back
    api.ts                   the only way components get data (async, swap for Laravel later)
    format.ts                PKR formatting, bill totals
    types.ts                 data contracts
  mock/                      room, guest, services, bill, promoVideos, config
public/brand/logo-dark.png   transparent version of logo.png for dark backgrounds
public/media/promo-indus.mp4    hotel promo video (14 s, loops)
reference/                   design references (not served)
```

### Theme

Tailwind v4 is configured in CSS, not in `tailwind.config`. The brand tokens (`brand`, `ink`, `charcoal`, `dolphin`, `gold`, `muted`) and text sizes are in the `@theme` block of `src/app/globals.css`.
`1rem` is 16px at 1080p and scales with the viewport, so all sizes are in rem.

### Background choice

The **lobby** photo is the default. It is landscape and 1413 px wide, so it holds up at full screen. The corridor photo is portrait (418×529), so it gets heavily cropped and soft at 1080p. It is still available through `config.background` or `?bg=corridor`, and would work well if the client can supply a larger landscape shot.

### Android WebView bridge (later)

D-pad presses already arrive in a WebView as arrow and Enter key events. The APK only needs to forward the hardware Back button:

```js
window.IndusRemote.press("back"); // also "up" | "down" | "left" | "right" | "enter"
```

## Mock data notes

- All prices are placeholders and are marked `// placeholder, client to confirm`. Currency is PKR, shown as `Rs. 2,500`.
- Tax rate (16%) is in `src/mock/config.ts`. The bill's subtotal, tax and total are calculated from the line items.
- Request, Order and Book add to the in-memory `requests` array in `src/lib/api.ts` and show a toast. There are no network calls.
