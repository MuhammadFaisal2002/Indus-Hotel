# Indus Hotel — In-Room TV Screen (Phase 1: TV UI with mock data)

## Project in one paragraph

Indus Hotel (4-star, Hyderabad, Pakistan — https://www.indushotel.com/) wants a branded screen on every in-room LCD. The LCDs are Android TVs; later we will wrap this web app in a small Android WebView APK and a backend (Laravel + MySQL) will push data to each TV. **This first step is only the TV-side web UI, running entirely on mock data.** No backend, no auth, no database yet. The guest controls everything with a **TV remote** (arrow keys + OK + Back) — there is no mouse and no touch.

## Scope of this task

Build these screens in a Next.js app:

1. **Welcome screen** — shows for 30 seconds, then moves on automatically. Pressing **OK/Enter** on the remote skips it immediately.
2. **Promo video** — plays after the welcome screen, with soft background music feel (use a placeholder MP4 in `public/media/` or a muted sample; video must loop). Pressing OK or Back leaves the video and goes to Home. (Later, reception will choose which video each guest sees — for now pick it from mock guest data `guest.promoVideoId`.)
3. **Home screen** — branded background, greeting ("Welcome, Mr. Ali Khan · Room 204"), date/time, and the **footer menu**.
4. **Footer menu** — 7 focusable buttons, each opens its own detail panel:
   `TV · Room Service · Housekeeping · Dining · Spa · Front Desk · Billing`
   Wi-Fi name + password stays on the right side of the footer (see `reference/footer-reference.png`: Wi-Fi `Indus-Guest`, password `indus2026`).
5. **Detail panel for each of the 7 options** (all data from mock files):
   - **TV** — list of channels (name, number, category). Selecting one just shows a "Opening channel…" toast for now.
   - **Room Service** — items with price; each item has a **Request** button.
   - **Housekeeping** — services (extra towels, laundry, room cleaning, etc.) with price or "Free" and a **Request** button.
   - **Dining** — Lazzat Restaurant: timings, categories (Breakfast / Desi / Continental / BBQ / Drinks), items with prices, **Order** button.
   - **Spa** — Indus Beauty Parlor (ladies only — show this note), services with duration and price, **Book** button.
   - **Front Desk** — extension numbers, check-in/check-out time, hotel amenities (Fitness Gym, Event Spaces & Conference Halls, 24/7 Security, Complimentary Wi-Fi), a **Call Front Desk** button.
   - **Billing** — the guest's running bill: line items grouped by department (date, item, qty, amount), subtotal, tax, **total**. Read-only.
   - Request / Order / Book buttons only show a success toast ("Request sent to Housekeeping") and append to an in-memory `requests` array. No network.

Out of scope for now: backend, admin/staff portal, roles, login, birthday SMS, Android APK, real video management.

## Tech stack

- **Next.js (App Router) + TypeScript + Tailwind CSS**
- **`@noriginmedia/norigin-spatial-navigation`** for remote/D-pad focus movement
- `next/font` for fonts (self-hosted at build time, so the TV doesn't depend on Google at runtime)
- No UI kit needed. Keep dependencies minimal.
- Package manager: npm.

## Remote control rules (most important part)

- Every interactive element must be focusable via spatial navigation. Arrow keys move focus; **Enter = click**.
- **Back**: handle `Escape` and `Backspace` (and `GoBack` / keyCode `4` / `10009` defensively) → close the open panel, or go Home. Back on Home does nothing.
- On every screen, one element must have focus by default (e.g. first footer button on Home, first item when a panel opens). Focus must never get "lost".
- When a panel closes, focus returns to the footer button that opened it.
- **Focused state must be very obvious from 3 meters away**: scale ~1.08, red/white glow or border, brighter background. Not just a thin outline.
- Never rely on hover. No hover-only UI.
- Put all key handling in one place (e.g. `src/lib/remote.ts` + a `useRemoteKeys` hook) so the Android WebView bridge can plug into it later.
- Test in desktop Chrome with keyboard arrows + Enter + Escape.

## 10-foot UI / TV design rules

- Design at **1920×1080**, full screen, `overflow: hidden`, no scrollbars. Must also look right at 1280×720 (scale with `vw`/`clamp`).
- Keep content inside a **safe area** (~5% padding on all sides) — TVs overscan.
- Minimum body text ~28px at 1080p; headings much larger. High contrast.
- Smooth but light animations (CSS transforms/opacity only) — TV chipsets are weak.
- Detail panels: slide up from the footer or open as a large centered glass panel over the dimmed background. Lists inside panels must be navigable by arrows and scroll the focused item into view.

## Brand / theme

"Theme according to logo." The client wants something **more premium and professional** than their current screen (`reference/current-screen.jpg`).

- Logo: `public/brand/logo.png` (grey dolphin, "IndusHotel" in red, "HYDERABAD", 4 gold stars).
- Colors (derive tokens in `tailwind.config`):
  - Primary red `#E0202E` (logo wordmark)
  - Deep background `#0B0B0D` / charcoal `#16161A`
  - Dolphin grey `#8A8D93`
  - Gold accent `#F5B301` (stars) — use sparingly
  - Text white `#FFFFFF`, muted `#B8BAC0`
- Typography: an elegant serif for display (e.g. Cormorant Garamond or Playfair Display) + a clean spaced-uppercase sans for menu labels (e.g. Montserrat), matching the letter-spaced footer in `reference/footer-reference.png`.
- Background: the client wants us to pick the best one from `public/backgrounds/` (`bg-corridor.png` — red carpet corridor, `bg-lobby.png` — lobby). Use it with a dark gradient overlay so text stays readable. Make the background configurable in mock config so it can be switched.
- Welcome screen copy idea: "A Warm Welcome to Indus Hotel — We are delighted to have you with us. Relax. Unwind. Experience true hospitality."

## Mock data

Put all mock data in `src/mock/` as typed TS files, and read it only through a thin data layer `src/lib/api.ts` (async functions like `getGuest()`, `getServices()`, `getBill()`, `sendRequest()`), so we can later swap mocks for real Laravel API calls without touching components.

Suggested files:

- `room.ts` — `{ roomNo: "204", wifi: { ssid: "Indus-Guest", password: "indus2026" } }`
- `guest.ts` — `{ name: "Ali Khan", title: "Mr.", checkIn, checkOut, promoVideoId: "family" }`
- `services.ts` — data for TV, Room Service, Housekeeping, Dining, Spa, Front Desk
- `bill.ts` — ~8 line items across departments (Dining, Room Service, Housekeeping, Spa), in PKR
- `promoVideos.ts` — `{ id, title, src }`

Currency is **PKR**, formatted like `Rs. 2,500`. All prices are placeholders — mark them with a comment `// placeholder, client to confirm`.

Room/guest selection: support `?room=204` in the URL so later each TV can open its own room.

## Suggested structure

```
src/
  app/
    layout.tsx
    page.tsx              # state machine: welcome -> promo -> home
  components/
    WelcomeScreen.tsx
    PromoVideo.tsx
    HomeScreen.tsx
    FooterMenu.tsx
    panels/
      TvPanel.tsx  RoomServicePanel.tsx  HousekeepingPanel.tsx
      DiningPanel.tsx  SpaPanel.tsx  FrontDeskPanel.tsx  BillingPanel.tsx
    ui/ FocusableButton.tsx  Toast.tsx  Clock.tsx
  lib/
    api.ts  remote.ts  format.ts
  mock/
    room.ts guest.ts services.ts bill.ts promoVideos.ts
public/
  brand/logo.png
  backgrounds/bg-corridor.png  bg-lobby.png
  media/  (placeholder promo video + optional soft music)
reference/   (design references only, not served)
```

## Done when

- `npm run dev` opens the welcome screen; it auto-advances after 30s and skips on Enter.
- Promo video plays, Enter/Back goes to Home.
- All 7 footer buttons are reachable with Left/Right, open with Enter, close with Back, and focus returns correctly.
- Every panel is fully usable with arrows only, and shows its mock data.
- Request/Order/Book shows a toast.
- Billing total is computed from line items (not hard-coded).
- No console errors, `npm run build` passes, `npm run lint` passes.
- A short `README.md` explains how to run it and the keyboard mapping.

## Client feedback — 29 Sep 2026 (overrides the scope above)

From the client's voice note, after they tried the first build:

- Footer tabs are now **TV · Room Service · Housekeeping · Dining · Beauty Parlor**. **Front Desk** and **Billing** were removed, and **Spa** was renamed **Beauty Parlor**.
- **No menus or prices.** Each tab only shows its services, with **photos** of that service. Use the latest photos from the hotel website or Facebook.
- **Do not use the old lobby photo** (`bg-lobby.png`). The lobby was renovated with new sofas, carpet and decoration. A photo of the new lobby is still to come.
- Keep the **Call** option. The client will send the real phone numbers.

## Later phases (for context only — don't build now)

- Laravel + MySQL backend, real-time updates to each TV (Reverb/WebSocket).
- One staff portal with role-based login: Admin, Reception/Front Desk, Room Service, Housekeeping, Dining, Spa. Each department enters its own charges for a guest → shows in the guest's Billing.
- Reception assigns the promo video per guest.
- Guest history with CNIC + date of birth + mobile; daily job sends birthday wish on TV (if in-house) and SMS (also to past guests).
- Android TV WebView wrapper APK, installed on every LCD.

## Working style

- Commit in small, meaningful steps with clear messages.
- Ask before adding any heavy dependency.
- Keep components small and typed; no `any`.

@AGENTS.md
