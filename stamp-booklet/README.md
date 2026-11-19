# Stamp booklet: hand-off

An interactive page of the 33 Japanese stamps from Yash's Traveler's notebook. It shows sticker cut-outs on a dotted journal page. Tapping a stamp shows its name tag, a one-line caption, and its location on a hand-drawn map of Japan.

It's **one self-contained HTML file plus images**. No build step, no frameworks, no external requests.

```
stamp-booklet/
├── index.html        ← page, styles, script and data (≈38 KB)
├── stamps/           ← 34 transparent WebP stickers at 520px (big stamps / high-res screens)
│   └── sm/           ← 260px versions for small & medium stamps (≈13 KB each)
└── README.md
```

---

## How to ship (recommended)

The page has the site sidebar built in. Deploy the folder as its own route, the same way `/design-portfolio/` is set up:

1. Copy the `stamp-booklet/` folder into the site repo root.
2. It will be served at **`yashvijaykar.com/stamp-booklet/`**. Image paths are relative (`stamps/...`), so the trailing slash matters. GitHub Pages adds it automatically.
3. Link to it from wherever Yash decides (e.g. a sidebar note on the main site, or a section in the design portfolio).

**Don't paste it into the main `index.html`.** It uses class names that already exist there (`.chip`, `.divider`, `.conviction`, `.sub-line`), and the styles would clash. As a standalone page it inherits nothing and breaks nothing.

To match the main site's analytics, optionally add the Microsoft Clarity snippet from the main `index.html` inside `<head>`.

## Sidebar

The page includes a copy of the main site's sidebar (the `<nav class="sidebar">` list in `index.html`). Items link to the main site's routes (`/about`, `/library`, …). When the main sidebar changes, update this list too.

---

## What's on the page

| Area | Behaviour |
|---|---|
| **Place filters** | all / tokyo / kyoto / nara / osaka. Dims the other stamps and zooms the map. |
| **Journal page** | Stamps are packed into a dotted-paper grid with 3 sizes (L / M / S) for visual hierarchy. Each sticker gets a fixed random tilt. |
| **Hover (desktop)** | The sticker straightens and lifts, its washi-tape name tag appears, and its map pin lights up. |
| **Click / tap** | Stamp-press animation. The caption shows the title, place and one-liner, and the map zooms to Tokyo or Kansai with the pin pulsing. Clicking the same stamp again deselects it. `Esc` also deselects. |
| **Desktop ≥ 820px** | The map column on the right stays in view (`position: sticky`) while the stamps scroll. |
| **Phone < 820px** | Tapping opens a bottom panel with the caption and a mini map. It closes on swipe down, ✕, or a tap outside. The tapped stamp auto-scrolls above the panel. The full overview map sits below the grid. |
| **Map pins** | Clickable. Selecting a pin selects that spot's first stamp. |
| **Sign-off stamp** | "Have a good day…" tilts on hover. Clicking it sets off a confetti burst (with a light vibration on phones that support it). |
| **Reduced motion** | All animations are off when the OS setting is on. |

---

## Editing content (all in `index.html` → `<script>`)

- **`SPOTS`**: map locations. `name` is used in captions, `pin` is the short label on the map, `left: true` puts the label on the left of the pin, and `lon`/`lat` are coordinates.
- **`STAMPS`**: one entry per sticker. Array order is grid order.
  ```js
  { id: 'kyoto-station', spot: 'kyotostn', size: 'L', title: 'Kyoto Station', line: "Hiroshi Hara's 1997 glass-and-steel gate to the old capital." }
  ```
  - `id` must match `stamps/<id>.webp`.
  - `size` is `L` (2×2 cell), `M` or `S`.
- **To add a stamp:** add `stamps/<id>.webp` (520px long side) and `stamps/sm/<id>.webp` (260px), then add an entry to `STAMPS`.
- **Coastlines** (`COAST_S`, `COAST_N`, `AWAJI`, `SHIKOKU`, `BIWA`) are simplified OpenStreetMap outlines. You shouldn't need to touch them.

---

## Notes

- **Attribution:** the map outlines come from OpenStreetMap, which requires the credit line "© OpenStreetMap contributors" (ODbL). It already appears under the map. Please keep it.
- **Browsers:** tested in Chrome, desktop (1280px) and mobile (390px), with no console errors. It uses standard APIs only: CSS `aspect-ratio`, `ResizeObserver`, Web Animations, and `clip-path`. All of these are supported in current Safari, Chrome, Firefox and Edge.
- **Performance:** each stamp uses `srcset` (260px / 520px), so phones download about 0.65 MB. The first 12 stamps load with high priority, the rest lazily, and each fades in when ready.
- **Fonts:** it uses the system font stack (`-apple-system, Inter, Segoe UI`), the same as the main site.
- **Preview link:** a working copy is published as a private Claude artifact. Ask Yash for access if you want to compare it against your deploy.
