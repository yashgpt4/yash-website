# Next.js Migration Notes

## Current Setup (as of May 2026)

The live site at `yashvijaykar.com` is a **static `index.html`** — a single self-contained file with all CSS and JS inline. It uses `history.pushState` to update the URL when tabs are clicked, so the JS can read `window.location.pathname` on load and switch to the right tab.

After a lengthy debugging saga (see below), the site now deploys as a **pure static site** — Next.js has been completely removed from the repo.

---

## What Was Deleted & Where the Backup Lives

In May 2026, after 10+ failed attempts to make Vercel serve `index.html` correctly while Next.js code existed in the repo, all Next.js files were deleted. A full backup lives at:

```
_archive/nextjs/
  app/                        ← full Next.js App Router directory
    layout.tsx
    page.tsx                  (redirected / → /about)
    not-found.tsx
    robots.ts
    sitemap.ts
    [...slug]/route.ts        (the catch-all route handler — root of the bug)
    api/revalidate/route.ts
    notes/page.tsx
    notes/[slug]/page.tsx
  next.config.js              ← original Next.js config (with image domains + beforeFiles rewrites)
```

**Also removed from repo root (not archived — recoverable from git history):**
- `next.config.js.bak` (renamed from `next.config.js` during debugging)
- `node_modules/next`, `react`, `react-dom` (uninstalled)
- `.next/` build directory

---

## Why the Routing Bug Was So Hard to Fix

The repo had both a static `index.html` (the real production site) and a legacy Next.js `app/` directory. Vercel detects Next.js from **multiple signals simultaneously**:
- presence of `next.config.js`
- presence of `app/` directory
- `package.json` build script containing `next build`

**None of these alone stops detection.** Setting `"framework": null` in `vercel.json` does NOT override the Vercel dashboard Framework Preset. The dashboard setting wins.

The `app/[...slug]/route.ts` catch-all handler was created to serve `index.html` for tab routes, but it failed because:
1. `fs.readFile('index.html')` — Vercel Lambdas don't bundle project-root files; always threw `ENOENT`
2. `beforeFiles` rewrites → `/index.html` → `[...slug]` caught it with `slug=['index.html']` → explicit 404

Every fix was blocked by another layer of the same problem.

**Root fix:** Delete all Next.js files so Vercel has nothing to detect. Pure static serving, `vercel.json` rewrites work correctly at the edge.

---

## Current `vercel.json`

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

No `framework`, no `buildCommand`, no `outputDirectory` — Vercel serves the repo root as a static site. The catch-all rewrite transparently serves `index.html` for every tab URL (`/portfolio`, `/about`, etc.) while keeping the URL intact. The JS on the page reads `window.location.pathname` and activates the correct tab.

---

## When You Migrate Back to Next.js App Router

### The routing problem to solve

Your current tab URLs (`/portfolio`, `/about`, etc.) must continue working. In Next.js App Router, each becomes a proper page route.

### File structure to create

```
app/
  page.tsx                  → redirect to /about (or render about content directly)
  about/page.tsx            → AboutContent component
  portfolio/page.tsx        → PortfolioContent component
  principles/page.tsx       → PrinciplesContent component
  blog/page.tsx             → BlogContent component
  sakura/page.tsx           → SakuraContent component
  inspo/page.tsx            → InspoContent component
  entrepreneurship/page.tsx → EntrepreneurshipContent component
  layout.tsx                → shared sidebar + window chrome
```

Start from `_archive/nextjs/app/` — all the files are there.

### What `index.html` sections map to

| Tab | `index.html` section | Next.js component to create |
|---|---|---|
| `/about` | `#pane-about` | `components/AboutContent.tsx` |
| `/portfolio` | `#pane-portfolio` | `components/PortfolioContent.tsx` |
| `/principles` | `#pane-principles` + `PRINCIPLES` JS array | `components/PrinciplesContent.tsx` |
| `/blog` | `#pane-blog` + `BLOG` JS array | `components/BlogContent.tsx` |
| `/sakura` | `#pane-sakura` | `components/SakuraContent.tsx` |
| `/inspo` | `#pane-inspo` | `components/InspoContent.tsx` |
| `/entrepreneurship` | `#pane-entrepreneurship` | `components/EntrepreneurshipContent.tsx` |

### Tab switching → Next.js `<Link>` navigation

In `index.html`, tab switching uses `history.pushState` + toggling `.active` classes. In Next.js, replace with:
- `<Link href="/portfolio">` for navigation
- `usePathname()` hook in the sidebar to highlight the active tab

### Sidebar component

The sidebar `<nav>` becomes a Client Component (`"use client"`) because it needs `usePathname()`.

### Vercel dashboard settings when migrating back

- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`

Remove the `vercel.json` rewrites — Next.js App Router handles routing natively.

**CRITICAL — do not repeat the old mistake:** Do NOT mix a static `index.html` in the repo root with Next.js `app/` directory. Pick one or the other. When on Next.js, all content lives in React components.

### Analytics

The current `index.html` uses Vercel Analytics via script tag:
```html
<script defer src="/_vercel/insights/script.js"></script>
```

In Next.js, replace with:
```bash
npm i @vercel/analytics
```
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
// add <Analytics /> inside the layout
```
