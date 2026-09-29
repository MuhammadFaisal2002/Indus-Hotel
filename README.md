# Indus Hotel — In-Room TV Screen

Phase 1: the TV-side web UI for the in-room Android TVs, running entirely on mock data.
Flow: **Welcome** (30 s, or OK to skip) → **Promo video** (loops; OK or Back to leave) → **Home** with a footer menu: **TV · Room Service · Housekeeping · Dining · Beauty Parlor**, plus a **Reception** call button and the Wi-Fi details.

Each service tab shows a photo slideshow, the list of services (no menus or prices) and a **Call** button.

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
| `room` | `/?room=305` | Loads that room's guest and Wi-Fi (default `204`). Unknown rooms show a generic welcome. |
| `bg` | `/?bg=corridor` | Picks a background from `src/mock/config.ts` (only `corridor` for now). |

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
    panels/                  Panel shell, TvPanel, and ServicePanel (used by every service tab)
    ui/                      FocusableButton, Slideshow, Toast, Clock, Backdrop, Logo, Icons
  lib/
    remote.ts                ALL key handling (spatial nav config, Back stack, Android bridge)
    useRemoteKeys.ts         hook for screens and panels to handle Back
    api.ts                   the only way components get data (async, swap for Laravel later)
    types.ts                 data contracts
  mock/                      room, guest, services (tabs, photos, extensions), promoVideos, config
public/brand/logo-dark.png   transparent version of logo.png for dark backgrounds
public/media/promo-indus.mp4    hotel promo video (14 s, loops)
public/services/<tab>/       slideshow photos per service tab (from indushotel.com)
reference/                   design references (not served)
```

### Theme

Tailwind v4 is configured in CSS, not in `tailwind.config`. The brand tokens (`brand`, `ink`, `charcoal`, `dolphin`, `gold`, `muted`) and text sizes are in the `@theme` block of `src/app/globals.css`.
`1rem` is 16px at 1080p and scales with the viewport, so all sizes are in rem.

### Background and photos

The background is the corridor photo from indushotel.com (`public/backgrounds/bg-corridor.jpg`). The old lobby photo was removed because the lobby has been renovated. When the client sends a photo of the new lobby, add it to `config.backgrounds` in `src/mock/config.ts`.

The service photos come from indushotel.com. The Beauty Parlor tab only has 2 photos so far. To change a tab's photos, replace the files in `public/services/<tab>/` or edit `photos` in `src/mock/services.ts`.

### Android WebView bridge (later)

D-pad presses already arrive in a WebView as arrow and Enter key events. The APK only needs to forward the hardware Back button:

```js
window.IndusRemote.press("back"); // also "up" | "down" | "left" | "right" | "enter"
```

## Mock data notes

- Each tab's services, photos and phone extension are in `src/mock/services.ts`. The extensions are placeholders marked `// placeholder, client to confirm` until the client sends the real numbers.
- **Call** buttons add a `Call` entry to the in-memory `requests` array in `src/lib/api.ts` and show a toast. There are no network calls.
