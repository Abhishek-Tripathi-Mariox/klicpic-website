# Klicpic Website

Marketing site for Klicpic, implemented from Figma:
<https://www.figma.com/design/0Risw5IFyKj8GlViCAo7pe/Klicpic?node-id=1550-2022>
(frame **Klicpic mithu**, `1550:2022`).

This is a standalone frontend — it is separate from the existing `klick-pic-frontend`
admin/CRM app, which is untouched.

## Stack

React 19 · Vite 7 · Tailwind CSS 4 · lucide-react

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Layout

Each Figma frame is its own folder under `src/pages/`; the shared chrome
(announcement bar, header, footer) lives in `src/components/`, and the home
page's sections stay in `src/landing/`. The Figma node id is recorded in a
comment at the top of every component.

| Route | Figma node | Page |
| --- | --- | --- |
| `/` | `1550:2022` | Home (16 sections under `src/landing/`) |
| `/photoshoots` | `1616:18859` | Photoshoot Catalog |
| `/photoshoots/themes` | `1550:5078` | Theme Library (Photoshoots active) |
| `/themes` | `1550:3598` | Theme Library (Themes active) |
| `/props` | `1550:6558` | Props Catalog |
| `/gowns` | `1550:7268` | Gown Collection |
| `/packages` | `1550:7831` | Packages |
| `/gallery` | `1550:8378` | Studio Gallery |
| `/studios` | — | Studio locations listing. No Figma frame — built to back the "View All" on the home Studios rail (`1550:2241`), reusing that rail's `StudioCard`. |
| `/offers` | `1550:9145` | Exclusive Offers |
| `/about` | `1550:9523` | About Klicpic |
| `/careers` | `1550:9954` · `10438` · `10988` | Careers (one page, three states) |
| `/faq` | `1616:20695` | FAQ |
| `/privacy` | `1616:21184` | Privacy Policy |
| `/terms` | `1616:21799` | Terms of Service |
| `/refund` | `1616:22448` | Refund & Cancellation Policy |
| `/portal` | `1615:9755` · `10008` · `10258` · `10956` | Customer portal — login, OTP, dashboard |
| `/book` | `1550:11454` · `11817` · `12236` · `13236` · `14898` · `15939` · `1561:1996` | Booking wizard (stateful flow) |

Frames that turned out to be the same screen are built once:

- **Theme Library** — `1550:3598` and `1550:5078` have byte-identical copy
  (260/260 text nodes match). They differ only in which nav item is gold and in
  the photos on the first three cards, so one component serves both routes.
- **Careers** — `1550:9954` (list), `1550:10438` (application form open) and
  `1550:10988` (submitted) are three states of one page, driven by component
  state.
- **Booking wizard** — the seven booking frames are screens and states of a
  single flow, not separate pages. `1550:11454`/`11817` are Step 1 before and
  after a shoot type is picked; `1550:14898`/`15939` are the Theme sub-step
  before and after a theme is picked. They live under `src/booking/` with the
  wizard state in `BookingContext`.

## Design tokens

Colours, fonts and the Google Font imports (Poppins, Dancing Script, Cousine)
live in `src/index.css` under `@theme`. Values are taken from the Figma frame —
the file defines no Figma variables, so the raw hex values are used.

## Assets

All photography is exported from the Figma node and committed under each
section's `assets/` folder. Icons are `lucide-react` components: the Figma
frame's icons are themselves Lucide glyphs, so the components are pixel-exact
and avoid duplicating SVGs. The logo comes from `public/logo.png`.

## Booking wizard

`/book` implements the Figma frames as one stateful flow (`src/booking/`):

| Screen | Figma node | Notes |
| --- | --- | --- |
| Step 1 Type | `1550:11454` · `1550:11817` | Offer banner + 6 shoot types; picking one applies the reel coupon |
| Step 2 Vibe | `1550:12236` | 5 vibes with "% Love It" badges, skip link |
| Step 3 Details — date | `1550:13236` | August 2026 calendar, time slots |
| Step 3 Details — theme | `1550:14898` · `1550:15939` | Sub-stepper, search, 6 filters, 24 themes, sticky action bar |
| Step 3 Details — props | `1552:16994` | Multi-select, 20 props, 5 categories |
| Step 3 Details — gowns | `1552:17865` | 5 gowns filtered to the shoot type |
| Step 3 Details — location | `1615:3632` · `4011` · `4459` · `5001` | Three options; each expands (studio branches / outdoor spots / venue note) |
| Theme detail | `1561:1996` · `1614:2` · `1614:588` · `1614:1174` | Gallery/BTS tabs, thumbnail strip, similar themes |
| Step 4 Extras | `1615:5393` · `1615:5956` | 7 deliverables with slot strips |
| Extras modals | `1615:6539` · `1615:7254` | Add-on detail — samples, features, sizes |
| Step 5 Package | `1615:7929` · `1615:8477` · `1615:8828` | Choose a Plan (3 tiers) / Build Your Own with bundle savings |
| Step 6 Book | `1615:9205` | Confirm-your-booking form |
| Success | `1615:9520` | Booking Request Submitted |

The wizard is complete end to end: Type → Vibe → Details (Date → Theme → Props
→ Gowns → Location) → Extras → Package → Book → Success.

**Not implemented** — no Figma frame exists for them yet:

- The Gowns → "Choose Backdrop" drill-in (`1614:3022`).
- The "Hear From Our Clients" video + Google-review rail below the date card on
  `1550:13236`.

Two Extras cards — Cinematic Video and Branded USB — render as empty image
placeholders in the Figma frame itself, so their `image` is `null` here too.

## Customer portal

`/portal` (`src/portal/`) implements the logged-in customer area:

| Screen | Figma node | Status |
| --- | --- | --- |
| Login — phone | `1615:9755` | Built |
| Login — OTP (demo code `1234`) | `1615:10008` | Built |
| Dashboard shell + Overview | `1615:10258` · `1615:10956` | Built |
| Payments tab | `1615:11685` | **Not built** |
| Selections / Album tab | `1615:12026` | **Not built** |
| Messages tab | `1615:12408` | **Not built** |
| Profile — Information | `1615:12707` | **Not built** |
| Profile — Security | `1615:13295` | **Not built** |
| Profile — Notifications | `1615:13847` | **Not built** |
| Refund tracking | `1615:15006` | **Not built** |
| My Bookings | `1615:16285` · `1615:18251` | **Not built** |
| Cancel Booking modal | `1615:16890` · `1615:17572` | **Not built** |

Unbuilt tabs render an explicit placeholder in the dashboard rather than
failing silently. `1615:14942` is the AnnouncementBar component, already built
as `src/components/AnnouncementBar.jsx`.

## Content still to supply

Every page's copy is taken verbatim from Figma except these spots, each flagged
in a comment in the file:

- **FAQ** (`/faq`) — all 27 questions and the 6 category pills come from the
  frame, but only the first answer is specified there (the other rows are drawn
  collapsed). The remaining 26 answers are written from facts stated elsewhere
  in the design (48hr delivery, 30 edited photos, the refund tiers) and should be
  replaced with approved copy.
- **Home FAQ section** — same situation; no expanded state in the frame.
- **Gallery** — the frame draws filter pills but tags no photo with a category,
  so each photo's `category` is derived from its name.
- **Testimonials** — four carousel dots are drawn but only the first slide has
  copy; `TESTIMONIALS` holds that one quote.
