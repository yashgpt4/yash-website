# PRD: yashvijaykar.com — Personal Website
**Version:** 1.0  
**Author:** Yash Vijaykar  
**Status:** Ready for Development  
**Last Updated:** May 2026  

---

## Table of Contents

1. [Overview](#1-overview)
2. [Goals & Success Criteria](#2-goals--success-criteria)
3. [Inspiration & Design Direction](#3-inspiration--design-direction)
4. [Tech Stack](#4-tech-stack)
5. [Information Architecture](#5-information-architecture)
6. [Database Schema](#6-database-schema)
7. [Page Specifications](#7-page-specifications)
8. [Component Specifications](#8-component-specifications)
9. [Design System](#9-design-system)
10. [Routing & URL Structure](#10-routing--url-structure)
11. [Supabase Setup](#11-supabase-setup)
12. [Vercel Setup & Deployment](#12-vercel-setup--deployment)
13. [Content Management](#13-content-management)
14. [Image Handling](#14-image-handling)
15. [SEO & Metadata](#15-seo--metadata)
16. [Performance Requirements](#16-performance-requirements)
17. [Mobile Responsiveness](#17-mobile-responsiveness)
18. [Accessibility](#18-accessibility)
19. [Out of Scope (MVP)](#19-out-of-scope-mvp)
20. [Open Questions](#20-open-questions)
21. [Acceptance Criteria](#21-acceptance-criteria)

---

## 1. Overview

### What This Is

A personal website for Yash Vijaykar — a pre-founder, product manager, and operator working at the intersection of AI, healthcare, and startups. The site functions as an async signal to the right founders, operators, and builders: showing who Yash is, how he thinks, and what he has shipped.

### Core Metaphor

The entire site is presented as a **macOS Notes app** — a sidebar of notes on the left, a reading pane on the right. Every page, essay, case study, and principle is a "note." This is the primary UI paradigm. There is no traditional navbar with dropdown menus. There are no hero banners. No carousels. The interface itself communicates the values: clarity, simplicity, depth over noise.

### Inspiration

- **Helen Huang's site:** [helenhuang.io](https://www.helenhuang.io) — uses the Notes app aesthetic as the primary experience
- **Alana Goyal's site:** [alanagoyal.com](https://www.alanagoyal.com) — the technical implementation reference; her site is open source on GitHub
- **Writing style:** Paul Graham — short paragraphs, max ~65-70 characters per line, no marketing language

### Who the Audience Is

1. **Pre-PMF founders** in mental health, preventive healthcare, or GenAI — evaluating Yash as a potential operator / Chief of Staff / Founder's Office hire
2. **VCs and angels** who want to understand his profile and thinking before a conversation
3. **Peers and builders** who resonate with his writing and want to follow his work

The site should filter *in* the right people and filter *out* everyone else. It is not trying to be discoverable by everyone — it is trying to be deeply resonant with a specific kind of person.

---

## 2. Goals & Success Criteria

### Primary Goals

- Ship a live, working site at a custom domain within the project timeline
- Present Yash's authentic story, thinking, and work in a format that earns trust from the right founders
- Establish a content hub that Yash can update himself without touching code

### Secondary Goals

- Create a system where adding new writing, case studies, or principles requires only inserting a row in Supabase (no redeployment, no code changes)
- Lay the foundation for future features (private notes, reader comments, newsletter integration) without needing to rebuild from scratch

### Success Looks Like

- A founder reads the About note and emails Yash to set up a call
- A note about a case study gets shared by someone in Yash's target network
- Yash can update the "Now" note in under 5 minutes via Supabase dashboard

---

## 3. Inspiration & Design Direction

### Helen's Implementation (What to Match)

From [helenhuang.io](https://www.helenhuang.io):
- Full-screen Notes app layout with no traditional page chrome
- Sidebar on the left: list of notes with title, tag, and date
- Main pane on the right: note content in clean markdown
- macOS window decorations at the top (traffic light dots, window title)
- Notes are organized by tags, not folders
- Mobile: sidebar collapses; tapping a note opens it full-screen; back button returns to list

### Alana's Technical Implementation (What to Reference)

From [alanagoyal.com/notes/how-this-works](https://www.alanagoyal.com/notes/how-this-works):
- Next.js App Router
- Notes stored in Supabase (Postgres)
- Notes statically generated and revalidated on change
- Note content stored as Markdown, rendered with `react-markdown`
- Supabase RLS policies for access control
- Open source on GitHub — **developer should reference this repo**

### What We Are NOT Building (vs. Alana's Full Feature Set)

The following features from Alana's implementation are explicitly **out of scope for MVP**:

| Feature | Status |
|---|---|
| Private notes with `session_id` (local storage) | ❌ Out of scope |
| Swipe gestures (pin, edit, delete on mobile) | ❌ Out of scope |
| Vim-inspired keyboard shortcuts | ❌ Out of scope |
| shadcn/ui Command Menu | ❌ Out of scope |
| pg_cron cleanup job (delete empty notes) | ❌ Out of scope |
| Dynamic OG image generation per note | ❌ Out of scope |
| User-created notes via the UI | ❌ Out of scope |
| Note editing and deletion from UI | ❌ Out of scope |
| Note sharing via link | ❌ Out of scope |

### What We ARE Building

| Feature | Status |
|---|---|
| Notes list sidebar | ✅ MVP |
| Single note reading view | ✅ MVP |
| Markdown rendering | ✅ MVP |
| macOS Notes aesthetic | ✅ MVP |
| Pinned notes (float to top) | ✅ MVP |
| Tag filtering | ✅ MVP |
| Static generation with Supabase | ✅ MVP |
| Mobile responsive layout | ✅ MVP |
| Search (client-side, filter by title) | ✅ MVP |
| Custom domain | ✅ MVP |

---

## 4. Tech Stack

### Decisions and Rationale

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 14** (App Router) | Industry standard, SSG support, Vercel-native, same as reference implementation |
| Language | **TypeScript** | Type safety, better DX for future maintenance |
| Database | **Supabase** (Postgres) | Free tier, built-in RLS, easy dashboard for content management, same as reference |
| Hosting | **Vercel** | Free for personal sites, zero-config Next.js deployment, instant previews |
| Styling | **Tailwind CSS** | Utility-first, easy to maintain, compatible with macOS Notes aesthetic |
| Markdown | **react-markdown** + **remark-gfm** | Standard, supports GitHub Flavored Markdown (tables, checklists, etc.) |
| Syntax highlighting | **rehype-highlight** | For code blocks in case studies / technical notes |
| Images | **Cloudflare Images** (or Supabase Storage for MVP) | Described in Image Handling section |
| Analytics | **Vercel Analytics** (built-in, free) | Zero setup, privacy-respecting |
| Fonts | **Geist** (Vercel's font) or **Inter** | Clean, readable, matches the Notes aesthetic |

### Why Not GitHub Pages

GitHub Pages serves only static files. It has no Node.js runtime, no API routes, and cannot support Next.js's server-side features (ISR, Server Components, API routes). Since we need Supabase revalidation hooks and potentially server-side rendering, Vercel is the correct host.

### Repository Structure

```
yash-website/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Redirects to /notes or renders home
│   ├── notes/
│   │   ├── page.tsx            # Notes list (sidebar + default state)
│   │   └── [slug]/
│   │       └── page.tsx        # Individual note view
│   └── api/
│       └── revalidate/
│           └── route.ts        # Webhook endpoint for Supabase revalidation
├── components/
│   ├── Sidebar.tsx             # Left panel — note list
│   ├── NoteItem.tsx            # Single row in sidebar
│   ├── NoteContent.tsx         # Right panel — note body
│   ├── SearchBar.tsx           # Client-side filter input
│   ├── TagFilter.tsx           # Tag pills for filtering
│   ├── WindowChrome.tsx        # macOS traffic light dots + title bar
│   └── MarkdownRenderer.tsx    # react-markdown wrapper with styles
├── lib/
│   ├── supabase.ts             # Supabase client (anon key)
│   ├── supabase-server.ts      # Supabase client (server-side)
│   └── types.ts                # TypeScript types for Note, Tag, etc.
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css             # Tailwind base + custom prose styles
├── .env.local                  # Environment variables (not committed)
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 5. Information Architecture

### The Mental Model

Every section of the site is a **note**. Notes have:
- A `title` (shown in sidebar and as the note heading)
- A `slug` (used in the URL: `/notes/about`)
- A `tag` (used for filtering and visual labeling)
- `content` in Markdown
- A `pinned` flag (pinned notes float to the top of the sidebar)
- A `published` flag (false = draft, not shown)
- `created_at` and `updated_at` timestamps

### Note Categories (Tags)

| Tag | Color (accent) | What it contains |
|---|---|---|
| `pinned` | Red/coral | About note — always at top |
| `now` | Blue | The "Now" note — what Yash is doing this month |
| `work` | Green | Case studies, portfolio pieces |
| `writing` | Amber | Essays, blog posts, YouTube links |
| `principles` | Purple | The principles list |
| `reading` | Teal | Reading list, book notes |

### Initial Note Inventory (Seed Data)

These are the notes that should exist at launch. Content to be provided by Yash — placeholders acceptable for development.

| Slug | Title | Tag | Pinned | Priority |
|---|---|---|---|---|
| `about` | Who is Yash | pinned | true | P0 |
| `now` | What I'm doing now | now | false | P0 |
| `principles` | Principles | principles | false | P0 |
| `why-i-declined-120k` | Why I declined $120k | work | false | P0 |
| `nintee` | Nintee: what I took away | work | false | P1 |
| `78health` | 78Health: GTM thinking | work | false | P1 |
| `on-clinical-depression` | On clinical depression | writing | false | P1 |
| `project-sushi` | Project Sushi: 2 years of scouting | writing | false | P1 |
| `reading-list` | Reading list | reading | false | P2 |

---

## 6. Database Schema

### Table: `notes`

```sql
create table notes (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  content     text not null,          -- Markdown string
  tag         text not null,          -- one of: pinned, now, work, writing, principles, reading
  pinned      boolean default false,
  published   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
```

### Indexes

```sql
create index notes_slug_idx on notes(slug);
create index notes_tag_idx on notes(tag);
create index notes_published_idx on notes(published);
create index notes_pinned_idx on notes(pinned);
```

### Row Level Security (RLS)

```sql
-- Enable RLS on the table
alter table notes enable row level security;

-- Anyone (including unauthenticated) can read published notes
create policy "Public notes are viewable by everyone"
  on notes
  for select
  using (published = true);

-- Only authenticated users (Yash via Supabase dashboard) can insert/update/delete
create policy "Only authenticated users can write"
  on notes
  for all
  using (auth.role() = 'authenticated');
```

### Trigger: Auto-update `updated_at`

```sql
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_notes_updated_at
  before update on notes
  for each row
  execute function update_updated_at_column();
```

### TypeScript Type

```typescript
// lib/types.ts
export type Tag = 'pinned' | 'now' | 'work' | 'writing' | 'principles' | 'reading';

export interface Note {
  id: string;
  slug: string;
  title: string;
  content: string;
  tag: Tag;
  pinned: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}
```

---

## 7. Page Specifications

### 7.1 Root (`/`)

**Behavior:** Redirect to `/notes/about` automatically. There is no standalone home page. The "home" is the Notes app itself, defaulting to the About note.

```typescript
// app/page.tsx
import { redirect } from 'next/navigation';
export default function Home() {
  redirect('/notes/about');
}
```

---

### 7.2 Notes Index (`/notes`)

**Layout:** Full-screen two-panel layout.
- Left panel: sidebar with list of all published notes
- Right panel: empty state (on desktop) or hidden (on mobile, sidebar is full-screen)

**Desktop empty state (right panel):**
```
Select a note to read it.
```
Centered, muted text, no other content.

**Data fetching:**
- Fetch all published notes from Supabase on the server
- Sort: pinned notes first, then by `updated_at` descending
- Statically generated with revalidation (see Section 12)

**Sidebar behavior:**
- Search bar at top filters notes by `title` (client-side, no DB call)
- Tag filter pills below search bar filter by `tag` (client-side)
- When a tag is selected, only notes with that tag show
- Active note highlighted in sidebar
- Clicking a note navigates to `/notes/[slug]`

---

### 7.3 Single Note (`/notes/[slug]`)

**Layout:** Same two-panel layout. Sidebar remains visible. Right panel shows note content.

**Right panel contents:**
1. Tag pill + date line (metadata row)
2. Note title (`h1`)
3. Horizontal rule
4. Markdown content (rendered)

**Data fetching:**
- Each note is statically generated at build time using `generateStaticParams`
- `notFound()` called if slug doesn't exist or `published = false`
- Revalidated via webhook when note is updated in Supabase

**On mobile:** Sidebar hidden when a note is open. Back button (`←`) appears at top left to return to sidebar/list.

**URL example:** `yashvijaykar.com/notes/why-i-declined-120k`

---

### 7.4 404 Page (`not-found.tsx`)

Custom 404 that matches the Notes aesthetic. Content:
```
Note not found.

← Back to notes
```

---

## 8. Component Specifications

### 8.1 `WindowChrome`

The macOS-style title bar at the very top of the app.

**Contents:**
- Left: Three dots (traffic lights) — red (`#FF5F57`), yellow (`#FEBC2E`), green (`#28C840`) — purely decorative, not interactive
- Center: The current URL or site name in muted text — `yashvijaykar.com`
- Right: Nothing (MVP)

**Styling:**
- Height: 40px
- Background: slightly off-white or `bg-stone-50` (light mode)
- Bottom border: 1px `border-stone-200`
- The three dots are 12px circles with 6px gap between them

---

### 8.2 `Sidebar`

**Structure:**

```
[WindowChrome]
[Header: "Notes" label + note count]
[SearchBar]
[TagFilter pills]
---
[Section: "Pinned"]
[NoteItem] (pinned notes)
---
[Section: "All Notes" or tag name if filtered]
[NoteItem] (remaining notes, sorted by updated_at desc)
```

**Width:**
- Desktop: 260px fixed, not resizable for MVP
- Tablet: 220px
- Mobile: full screen (sidebar = the entire viewport when no note is open)

**Sidebar header:**
- "Notes" in 13px medium weight, `text-stone-500`
- Note count in parentheses: "Notes (9)"

**Section dividers:**
- Small uppercase label in 10px, `text-stone-400`, e.g. "PINNED", "RECENT"

**Overflow:** `overflow-y: auto` with no visible scrollbar styling (use `scrollbar-hide` Tailwind plugin or `overflow-y: scroll; scrollbar-width: none`)

---

### 8.3 `NoteItem`

Each row in the sidebar representing one note.

**Layout (top to bottom within the row):**
1. Date or tag label (11px, muted)
2. Note title (13px, medium weight)
3. Content preview — first ~60 characters of content, stripped of Markdown syntax (11px, muted, single line, ellipsis)
4. Tag pill (see below)

**States:**
- Default: transparent background
- Hover: `bg-stone-100`
- Active (current note): `bg-white` + left border `2px solid [accent color]` (the accent shifts per tag)
- Pinned: small pin icon (`📌` or SVG) next to title, or simply listed under "PINNED" section header

**Tag pill:**
- Small rounded pill, 9px text, colored per tag (see Design System)
- Sits at the bottom of the NoteItem row

**Click behavior:** Navigate to `/notes/[slug]`

**Content preview generation:**
Strip all Markdown syntax from the first line of `content` that contains actual text. Truncate to 60 characters. This should be done at render time, not stored in DB.

---

### 8.4 `SearchBar`

**Placement:** Below sidebar header, above tag filter pills.

**Behavior:**
- Controlled input, client-side only
- Filters the note list in real time as user types
- Matches against `title` field (case insensitive)
- If no results: show "No notes found" in muted text where list would be
- Clearing search restores full list

**Styling:**
- Rounded pill shape (`border-radius: 20px`)
- Light gray background, no visible border
- Search icon (magnifying glass SVG) on the left inside the input
- Placeholder: "Search"
- 12px font size

---

### 8.5 `TagFilter`

**Placement:** Below search bar, above note list.

**Behavior:**
- Row of pill buttons, one per tag that has at least one published note
- Clicking a tag filters the list to only show notes with that tag
- Clicking the active tag again clears the filter (show all)
- Only one tag active at a time
- "All" pill shown first — clicking it clears any active filter

**Pills:**
- Tag name, 11px
- Default state: `bg-stone-100 text-stone-500`
- Active state: colored background per tag (see Design System)

**Tags shown:** All, Work, Writing, Now, Principles, Reading

---

### 8.6 `NoteContent`

The right reading panel.

**Layout:**
```
[Note metadata row]
[Note title — h1]
[Horizontal rule]
[Markdown content]
```

**Metadata row:**
- Tag pill (same style as sidebar pills) + bullet + date
- Example: `● work  ·  updated May 2026`
- 12px, `text-stone-400`

**Note title:**
- `h1`, 24px, `font-weight: 500` (not bold — medium weight)
- `text-stone-900`
- Bottom margin: `1.5rem`

**Content area:**
- Max width of text: `65ch` (enforces Paul Graham ~65 char line width)
- `line-height: 1.75`
- `font-size: 15px`
- `color: text-stone-800`

**Padding:**
- Desktop: `3rem 3.5rem`
- Mobile: `1.5rem 1.25rem`

**Overflow:** `overflow-y: auto` — the content pane scrolls independently of the sidebar

---

### 8.7 `MarkdownRenderer`

Wraps `react-markdown` with custom component overrides so all Markdown elements match the site's design.

**Dependencies:**
```
react-markdown
remark-gfm
rehype-highlight
```

**Custom component map:**

| Element | Styling |
|---|---|
| `h1` | 20px, font-weight 500, `text-stone-900`, `mb-4` |
| `h2` | 11px, uppercase, letter-spacing 0.06em, `text-stone-400`, `mb-2 mt-8` |
| `h3` | 14px, font-weight 500, `text-stone-700`, `mb-2 mt-6` |
| `p` | 15px, `text-stone-800`, `leading-7`, `mb-4`, max-width `65ch` |
| `a` | Accent color (terracotta/orange), no underline by default, underline on hover |
| `ul` / `ol` | `pl-4 mb-4`, list items use em-dash (`—`) as custom bullet for `ul` |
| `li` | `text-stone-800`, `mb-1`, `leading-7` |
| `hr` | `border-stone-200`, `my-6` |
| `blockquote` | Left border `3px solid [accent]`, `pl-4`, `text-stone-500`, italic |
| `code` (inline) | `bg-stone-100`, `text-stone-700`, `px-1 py-0.5`, `rounded`, `font-mono`, `text-sm` |
| `pre` (code block) | `bg-stone-900`, `text-stone-100`, `p-4`, `rounded-lg`, `overflow-x-auto`, `text-sm`, `font-mono` |
| `strong` | `font-weight: 500`, `text-stone-900` |
| `em` | Italic, `text-stone-700` |
| `img` | `rounded-lg`, `my-4`, `max-w-full`, lazy loaded |

**Note on bullets:** For unordered lists, override the `li` component to render `—` instead of a standard bullet. This matches the aesthetic of the site (em-dash lists used throughout).

---

### 8.8 Mobile Navigation

On screens narrower than `768px`:

- Sidebar is full-screen (takes entire viewport)
- When a note is tapped, the note content takes full screen
- A back button (`← Notes`) appears in the top-left of the content area
- The `WindowChrome` (traffic light dots) is hidden on mobile — replaced by the back button nav pattern
- The sidebar header shows a pencil/compose icon in the top-right (non-functional for MVP, reserved)

**Implementation approach:**
- Use `useState` to track whether sidebar or note is "active" on mobile
- CSS: sidebar `block md:block`, content `hidden md:block` by default; swap classes when note selected on mobile

---

## 9. Design System

### Color Palette

The site uses a warm neutral base (stone/warm gray) with a single accent color.

**Accent color:** `#E8855A` (warm terracotta / burnt orange)
- This is the single brand color used for: active note border, tag pills, links, tag filter active state

**Base palette (Tailwind stone scale):**

| Role | Color | Tailwind class |
|---|---|---|
| Page background | `#FAFAF9` | `bg-stone-50` |
| Sidebar background | `#F5F5F4` | `bg-stone-100` |
| Card / note bg | `#FFFFFF` | `bg-white` |
| Primary text | `#1C1917` | `text-stone-900` |
| Secondary text | `#78716C` | `text-stone-500` |
| Muted text | `#A8A29E` | `text-stone-400` |
| Borders | `#E7E5E4` | `border-stone-200` |
| Dividers | `#F5F5F4` | `border-stone-100` |

**Tag accent colors:**

| Tag | Background | Text | Active pill bg | Active pill text |
|---|---|---|---|---|
| pinned | `#FEF2F2` | `#DC2626` | `#DC2626` | `#FFFFFF` |
| now | `#EFF6FF` | `#2563EB` | `#2563EB` | `#FFFFFF` |
| work | `#F0FDF4` | `#16A34A` | `#16A34A` | `#FFFFFF` |
| writing | `#FFFBEB` | `#D97706` | `#D97706` | `#FFFFFF` |
| principles | `#FAF5FF` | `#9333EA` | `#9333EA` | `#FFFFFF` |
| reading | `#F0FDFA` | `#0D9488` | `#0D9488` | `#FFFFFF` |

### Typography

**Font:** Geist Sans (Vercel's default) or Inter as fallback. Load via `next/font/google`.

**Scale:**

| Use | Size | Weight | Color |
|---|---|---|---|
| Note title (content pane) | 24px | 500 | `stone-900` |
| Note title (sidebar) | 13px | 500 | `stone-800` |
| Body text | 15px | 400 | `stone-800` |
| Metadata / tag / date | 11–12px | 400 | `stone-400` |
| Section headers in sidebar | 10px | 500 | `stone-400` (uppercase) |
| Search placeholder | 12px | 400 | `stone-400` |

**Line length enforcement:**
- All body text in the content pane: `max-width: 65ch`
- This is a hard requirement — it ensures the Paul Graham-style readability at ~65 characters per line
- Apply via a wrapping div in `NoteContent`: `<div className="max-w-[65ch]">`

### Spacing

Use Tailwind's default spacing scale. Key values:

| Location | Value |
|---|---|
| Sidebar item padding | `10px 14px` |
| Content pane padding (desktop) | `3rem 3.5rem` |
| Content pane padding (mobile) | `1.5rem 1.25rem` |
| Gap between sidebar sections | `0` (divided by thin border only) |
| Gap between NoteItems | `0` (each row is full width, divided by `border-b`) |

### Borders and Radius

- Sidebar-to-content divider: `1px solid stone-200`
- NoteItem divider: `border-b border-stone-100`
- Tag pills: `border-radius: 4px` (slightly rounded, not pill-shaped)
- Search bar: `border-radius: 20px`
- Code blocks: `border-radius: 8px`
- Window chrome: `border-radius: 12px` on outer container (if shown with a drop shadow / device frame)

### No Dark Mode for MVP

Dark mode is explicitly out of scope for MVP. The site is light mode only. Add a `TODO: dark mode` comment in `tailwind.config.js`.

---

## 10. Routing & URL Structure

| URL | What it renders |
|---|---|
| `/` | Redirects to `/notes/about` |
| `/notes` | Notes app — sidebar + empty right pane |
| `/notes/about` | About note (default) |
| `/notes/[slug]` | Any individual note |
| `/notes/why-i-declined-120k` | Example note |
| `/api/revalidate` | Webhook endpoint (POST only) |

### `generateStaticParams`

In `app/notes/[slug]/page.tsx`:

```typescript
export async function generateStaticParams() {
  const { data: notes } = await supabaseServer
    .from('notes')
    .select('slug')
    .eq('published', true);

  return (notes ?? []).map((note) => ({ slug: note.slug }));
}
```

### Revalidation Webhook

Supabase can send webhooks on table changes (via Database Webhooks). Set up a webhook that POSTs to `/api/revalidate` on `INSERT`, `UPDATE`, `DELETE` on the `notes` table.

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const slug = body?.record?.slug;

  revalidatePath('/notes');
  if (slug) revalidatePath(`/notes/${slug}`);

  return NextResponse.json({ revalidated: true });
}
```

Add `REVALIDATE_SECRET` to environment variables.

---

## 11. Supabase Setup

### Step-by-Step

1. Create a free project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run the schema from Section 6 (table, indexes, RLS policies, trigger)
3. In Table Editor, insert the seed notes (see Section 5, Initial Note Inventory)
4. In Project Settings → API:
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. In Database Webhooks (under Database → Webhooks):
   - Create webhook on `notes` table
   - Events: `INSERT`, `UPDATE`, `DELETE`
   - HTTP URL: `https://yashvijaykar.com/api/revalidate`
   - Add header: `x-revalidate-secret: [your secret]`

### Supabase Client Setup

```typescript
// lib/supabase.ts — client-side (browser)
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

```typescript
// lib/supabase-server.ts — server-side (RSC, API routes)
import { createClient } from '@supabase/supabase-js';

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

For MVP, both use the `anon` key since RLS handles access control. No service role key needed.

### Content Management Workflow (for Yash)

Yash manages all content directly in the Supabase Table Editor (the GUI dashboard). No code changes required to:
- Add a new note: insert a row, set `published = true`
- Edit a note: update the `content` field
- Draft a note: insert with `published = false`
- Delete a note: delete the row (or set `published = false`)

The revalidation webhook ensures the live site updates within seconds of any change.

---

## 12. Vercel Setup & Deployment

### Initial Setup

1. Push the repository to GitHub (public or private)
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select the repository
4. Vercel auto-detects Next.js — no build configuration needed
5. Add environment variables in Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
REVALIDATE_SECRET=[random-string-generate-with-openssl]
```

6. Deploy — Vercel provides a `*.vercel.app` URL immediately

### Custom Domain

1. Buy domain (recommended: Cloudflare Registrar or Namecheap)
2. In Vercel project → Settings → Domains → Add Domain
3. Add `yashvijaykar.com` (or chosen domain)
4. Follow Vercel's DNS instructions (add CNAME or A record at registrar)
5. SSL certificate is provisioned automatically

### Deployment Workflow

- Every push to `main` triggers a production deployment
- Every pull request gets a preview deployment (useful if developer wants to preview before merging)
- No manual deployment steps needed after initial setup

### Environment Variables

| Variable | Where | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + `.env.local` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel + `.env.local` | Supabase anon/public key |
| `REVALIDATE_SECRET` | Vercel + `.env.local` | Secret for webhook auth |

**Important:** Never commit `.env.local` to the repository. Add it to `.gitignore`.

---

## 13. Content Management

### How Yash Adds/Edits Notes

All content is managed via the Supabase Table Editor dashboard — no code required.

**To add a new note:**
1. Open Supabase dashboard → Table Editor → `notes`
2. Click "Insert row"
3. Fill in:
   - `slug`: lowercase, hyphen-separated, URL-safe (e.g. `my-new-note`)
   - `title`: Display title
   - `content`: Full note content in Markdown
   - `tag`: One of `pinned | now | work | writing | principles | reading`
   - `pinned`: `true` or `false`
   - `published`: `false` to draft, `true` to publish
4. Save — site updates within seconds via webhook

**To edit an existing note:**
1. Open Supabase → Table Editor → `notes`
2. Click the row to edit
3. Update `content` field
4. Save

**To unpublish a note:**
1. Set `published = false`

### Markdown Formatting Guide (for Yash)

Notes are written in standard Markdown. Supported elements:

```markdown
# Heading 1 — use for section titles within a note
## Heading 2 — rendered as small uppercase label
### Heading 3

Regular paragraph text. Keep lines under 65 characters.

- List item using em-dash style
- Another item

**Bold text** and *italic text*

[Link text](https://url.com)

> Blockquote — for important quotes or callouts

---

Horizontal rule — use between sections

`inline code`

\`\`\`javascript
// code block
const x = 1;
\`\`\`
```

### Content Priorities for Launch

The following notes must have real content before the site goes live:

| Note | Status | Owner |
|---|---|---|
| About (`about`) | Yash to write | P0 |
| Now (`now`) | Yash to write | P0 |
| Principles (`principles`) | Yash to write (draft exists from PRD) | P0 |
| Why I declined $120k | Yash to write | P1 |
| On clinical depression | Yash to write | P1 |

Remaining notes can launch with placeholder content and be updated later.

---

## 14. Image Handling

### Strategy for MVP

For MVP, images are optional. The initial notes are text-only. When Yash wants to add images:

**Option A — Supabase Storage (simplest, MVP)**
- Upload images to Supabase Storage bucket (`notes-images`, set to public)
- Reference in Markdown: `![alt text](https://[project].supabase.co/storage/v1/object/public/notes-images/filename.jpg)`
- Free tier: 1GB storage, 2GB bandwidth/month

**Option B — Cloudflare Images (better for scale)**
- Free tier: 100,000 images served/month
- Upload via Cloudflare dashboard or API
- Delivers optimized images via CDN automatically
- Recommended if Yash plans to add many images (blog post screenshots, case study diagrams, etc.)

### Next.js Image Optimization

Use `next/image` for any images referenced in the site (not in Markdown):
- Automatic WebP conversion
- Lazy loading by default
- Responsive sizes

For images inside Markdown, the `MarkdownRenderer` component should override the `img` element:

```typescript
img: ({ src, alt }) => (
  <Image
    src={src ?? ''}
    alt={alt ?? ''}
    width={800}
    height={450}
    className="rounded-lg my-4 max-w-full h-auto"
    loading="lazy"
  />
)
```

Add allowed image domains to `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: [
      '[project-ref].supabase.co',
      'imagedelivery.net',  // Cloudflare Images
    ],
  },
};
```

---

## 15. SEO & Metadata

### Root Layout Metadata

```typescript
// app/layout.tsx
export const metadata = {
  title: {
    default: 'Yash Vijaykar',
    template: '%s — Yash Vijaykar',
  },
  description: 'Sensemaker. Builder. Pre-founder in training. Writing about startups, mental health, and AI.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yashvijaykar.com',
    siteName: 'Yash Vijaykar',
    images: [
      {
        url: 'https://yashvijaykar.com/og-image.jpg',  // Static OG image for MVP
        width: 1200,
        height: 630,
        alt: 'Yash Vijaykar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@[yash_twitter_handle]',  // TO BE FILLED
  },
};
```

### Per-Note Metadata

```typescript
// app/notes/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const note = await getNoteBySlug(params.slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.content.slice(0, 160).replace(/[#*`\[\]]/g, ''),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 160).replace(/[#*`\[\]]/g, ''),
      type: 'article',
      publishedTime: note.created_at,
      modifiedTime: note.updated_at,
    },
  };
}
```

### Robots & Sitemap

Add `app/robots.ts` and `app/sitemap.ts` for basic SEO hygiene:

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const notes = await getAllPublishedNotes();
  return [
    { url: 'https://yashvijaykar.com', lastModified: new Date() },
    ...notes.map((note) => ({
      url: `https://yashvijaykar.com/notes/${note.slug}`,
      lastModified: new Date(note.updated_at),
    })),
  ];
}
```

---

## 16. Performance Requirements

### Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| First Input Delay | < 100ms |
| Time to First Byte | < 800ms |
| Bundle size (JS, gzipped) | < 150KB |

### How to Hit These

- **Static generation:** All note pages are generated at build time (ISR). No server compute on request
- **Font optimization:** Use `next/font` — fonts preloaded, no FOUT
- **No heavy dependencies:** Avoid large client-side JS libraries. `react-markdown` is ~25KB gzipped — acceptable
- **Minimal client-side JS:** Most components are React Server Components. Client interactivity (search, tag filter, mobile nav) is isolated to `'use client'` components only
- **Image lazy loading:** All images use `loading="lazy"`
- **No third-party scripts:** No analytics scripts beyond Vercel Analytics (which uses a 1KB beacon)

---

## 17. Mobile Responsiveness

### Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 768px | Sidebar full-screen, note replaces sidebar when opened |
| Tablet | 768px – 1024px | Sidebar 220px, content pane fills rest |
| Desktop | > 1024px | Sidebar 260px, content pane with max-width, centered |

### Mobile-Specific Behavior

**On page load (mobile, `/notes`):**
- Show sidebar full-screen
- `WindowChrome` (traffic lights) hidden
- Simple header: "Yash Vijaykar" centered, with a search icon on the right

**When note selected (mobile):**
- Note content takes full screen
- Back button (`←  Notes`) in top-left
- Note title in top-center (truncated if long)
- Content scrollable

**Touch targets:**
- All tappable elements minimum 44×44px
- NoteItem rows minimum 56px tall
- Back button minimum 44×44px

**No swipe gestures for MVP.** Navigation is back-button only on mobile.

---

## 18. Accessibility

### Requirements

- All interactive elements reachable via keyboard (`Tab`, `Enter`, `Escape`)
- `NoteItem` components are `<button>` or `<a>` elements (not `<div onClick>`)
- Images have descriptive `alt` text
- Color is not the only way information is conveyed (tags have both color AND text label)
- Font size minimum 11px anywhere on the page
- Focus rings visible on all interactive elements (do not suppress `outline` without replacement)
- Semantic HTML: `<nav>` for sidebar, `<main>` for content pane, `<header>` for window chrome
- `aria-label` on icon-only buttons (back button, search icon)
- `aria-current="page"` on active note in sidebar

---

## 19. Out of Scope (MVP)

The following are explicitly deferred. Document them here so the developer does not implement them and Yash does not expect them at launch.

| Feature | Notes |
|---|---|
| Dark mode | Planned post-MVP |
| Private notes (session-based) | Planned post-MVP |
| Note creation/editing from the UI | Yash uses Supabase dashboard |
| Swipe gestures on mobile | Post-MVP |
| Keyboard shortcuts (Vim-style) | Post-MVP |
| Command palette (Cmd+K) | Post-MVP |
| Comments or reactions on notes | Not planned |
| Newsletter signup integration | Post-MVP |
| Search across note content (full-text) | MVP search is title-only, client-side |
| Note sharing via unique link | Post-MVP |
| Dynamic OG images per note | Post-MVP |
| Authentication / login for Yash | Yash uses Supabase dashboard directly |
| pg_cron cleanup jobs | Not needed (no user-generated content) |
| RSS feed | Post-MVP |
| Note categorization by folder | Tags are sufficient for MVP |
| View count / analytics per note | Post-MVP |
| Social preview cards per note | Post-MVP |

---

## 20. Open Questions

These must be resolved before or during development.

| # | Question | Owner | Priority |
|---|---|---|---|
| 1 | What is the exact domain name? (`yashvijaykar.com`? `yashgpt.com`? Other?) | Yash | P0 |
| 2 | What is Yash's Twitter/X handle for metadata? | Yash | P0 |
| 3 | Should the site have a favicon? If yes, what? (initials? custom icon?) | Yash | P1 |
| 4 | Should there be an OG image? If yes, Yash to provide a 1200×630px image | Yash | P1 |
| 5 | Which Supabase region? (Choose closest to audience — US East or Singapore) | Yash + Dev | P1 |
| 6 | Is Alana's open source repo the starting point, or build from scratch? | Dev | P0 |
| 7 | Should the `WindowChrome` (traffic light dots) be shown on mobile? | Yash | P2 |
| 8 | What should the 404 page say? | Yash | P2 |
| 9 | Supabase Storage vs Cloudflare Images for future images? | Yash | P2 |
| 10 | Should there be a `robots.txt` that blocks AI crawlers? | Yash | P2 |

---

## 21. Acceptance Criteria

The site is considered done and ready to launch when all of the following are true:

### Functionality
- [ ] Visiting `yashvijaykar.com` redirects to the About note
- [ ] All published notes appear in the sidebar, sorted: pinned first, then by date
- [ ] Clicking any note in sidebar loads it in the right pane without full page reload
- [ ] URL updates to `/notes/[slug]` when note is opened
- [ ] Direct link to `/notes/[slug]` works (shareable links)
- [ ] Search bar filters note list in real time by title
- [ ] Tag filter pills filter note list by tag
- [ ] Clearing search / tag filter restores the full note list
- [ ] Markdown renders correctly: headings, paragraphs, links, lists, bold, italic, horizontal rules, code blocks, blockquotes
- [ ] Links in note content open correctly
- [ ] Back button works on mobile
- [ ] Updating a note in Supabase dashboard reflects on the live site within 30 seconds

### Design
- [ ] macOS window chrome (traffic light dots) visible on desktop
- [ ] Sidebar is 260px on desktop, full-screen on mobile
- [ ] Body text max-width is approximately 65 characters per line
- [ ] Tag pills are correctly colored per tag
- [ ] Active note in sidebar has left border accent
- [ ] Font is clean and readable at all sizes
- [ ] No horizontal overflow / scroll on any viewport width

### Performance
- [ ] Lighthouse Performance score ≥ 90 on desktop
- [ ] Lighthouse Performance score ≥ 80 on mobile
- [ ] No layout shift visible on page load

### SEO & Meta
- [ ] Page title updates per note: `[Note Title] — Yash Vijaykar`
- [ ] OG metadata present and correct
- [ ] Sitemap available at `/sitemap.xml`
- [ ] No broken links in published notes

### Content
- [ ] About note has real content (not placeholder)
- [ ] Now note has real content
- [ ] Principles note has real content
- [ ] At least one Work case study has real content
- [ ] At least one Writing note has real content

### Infrastructure
- [ ] Custom domain configured and serving HTTPS
- [ ] Environment variables set in Vercel (not hardcoded)
- [ ] `.env.local` not committed to repository
- [ ] Revalidation webhook configured in Supabase and tested
- [ ] Vercel Analytics enabled

---

## Appendix A: Reference Links

- Alana Goyal's site (inspiration): [alanagoyal.com](https://www.alanagoyal.com)
- Alana's implementation notes: [alanagoyal.com/notes/how-this-works](https://www.alanagoyal.com/notes/how-this-works)
- Helen Huang's site (design reference): [helenhuang.io](https://www.helenhuang.io)
- Next.js App Router docs: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Vercel deployment docs: [vercel.com/docs](https://vercel.com/docs)
- react-markdown: [github.com/remarkjs/react-markdown](https://github.com/remarkjs/react-markdown)
- remark-gfm: [github.com/remarkjs/remark-gfm](https://github.com/remarkjs/remark-gfm)
- Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Appendix B: Suggested npm Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0",
    "rehype-highlight": "^7.0.0",
    "highlight.js": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

## Appendix C: Seed SQL

Run this in Supabase SQL Editor to seed initial notes with placeholder content. Replace placeholder content with real content before launch.

```sql
insert into notes (slug, title, content, tag, pinned, published) values
(
  'about',
  'Who is Yash',
  '## The arc

Sensemaker. Builder. Pre-founder in training.

[Placeholder — Yash to write]

## What I am looking for

A pre-PMF founder building in mental health, preventive healthcare, or GenAI where I can be their most useful non-technical person.

## Start here

- [Thinking doc](#) — read this before we talk
- [yashvijaykar98@gmail.com](mailto:yashvijaykar98@gmail.com)',
  'pinned',
  true,
  true
),
(
  'now',
  'What I''m doing now',
  '## Working on

[Placeholder — Yash to write]

## Reading

[Placeholder — Yash to write]

## Curious about

[Placeholder — Yash to write]

*Updated May 2026*',
  'now',
  false,
  true
),
(
  'principles',
  'Principles',
  '1. Be inside-out, not outside-in
2. Escape competition through authenticity
3. Outcomes are lagging indicators — focus on inputs
4. Feedback is a shortcut to improvement, not an instruction
5. Slow is smooth and smooth is fast
6. Decision quality over decision speed
7. If it''s not fun, value-creating, and lucrative — pass
8. Rejection is data, not identity
9. External advice is input, not instruction
10. When in doubt, move toward energy, not certainty
11. Play long-term games with long-term people
12. No one can compete with you being you

*Last updated May 2026*',
  'principles',
  false,
  true
),
(
  'why-i-declined-120k',
  'Why I declined $120k',
  '## The short version

[Placeholder — Yash to write the Kintsugi case study]',
  'work',
  false,
  false
),
(
  'nintee',
  'Nintee: what I took away',
  '## Context

[Placeholder — Yash to write the Nintee case study]',
  'work',
  false,
  false
),
(
  'on-clinical-depression',
  'On clinical depression',
  '## What happened

[Placeholder — Yash to write]',
  'writing',
  false,
  false
),
(
  'project-sushi',
  'Project Sushi: 2 years of scouting',
  '## What it was

[Placeholder — Yash to write]',
  'writing',
  false,
  false
);
```

---

*End of PRD. Questions to [yashvijaykar98@gmail.com](mailto:yashvijaykar98@gmail.com)*
