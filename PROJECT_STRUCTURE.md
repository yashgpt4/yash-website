# Project Structure

Complete breakdown of the yash-website MVP codebase.

## Directory Tree

```
yash-website/
├── app/
│   ├── layout.tsx              # Root layout with fonts, metadata, global styles
│   ├── page.tsx                # / → redirects to /notes/about
│   ├── not-found.tsx           # Custom 404 page
│   ├── robots.ts               # SEO: robots.txt configuration
│   ├── sitemap.ts              # SEO: XML sitemap generator
│   ├── notes/
│   │   ├── page.tsx            # /notes → notes list (sidebar + empty state)
│   │   └── [slug]/
│   │       └── page.tsx        # /notes/[slug] → individual note view
│   └── api/
│       └── revalidate/
│           └── route.ts        # POST /api/revalidate → ISR webhook
│
├── components/                 # React components (client-side interactive)
│   ├── WindowChrome.tsx        # macOS title bar (traffic lights + domain)
│   ├── Sidebar.tsx             # Left panel: notes list with search/filter
│   ├── NoteItem.tsx            # Individual note row in sidebar
│   ├── SearchBar.tsx           # Search input field
│   ├── TagFilter.tsx           # Tag filter pill buttons
│   ├── NoteContent.tsx         # Right panel: note content + metadata
│   └── MarkdownRenderer.tsx    # Markdown to HTML with custom styling
│
├── lib/                        # Utility functions and helpers
│   ├── types.ts                # TypeScript interfaces (Note, Tag, etc.)
│   ├── supabase.ts             # Supabase client (browser/client-side)
│   ├── supabase-server.ts      # Supabase client (server-side) + fetch functions
│   └── utils.ts                # Helper functions (format date, generate preview, etc.)
│
├── styles/
│   └── globals.css             # Tailwind base styles + custom prose/markdown styles
│
├── public/                     # Static assets (optional)
│   └── favicon.ico            # Site favicon
│
├── docs/                       # Documentation
│   ├── SUPABASE_SETUP.md      # How to set up Supabase database
│   ├── VERCEL_DEPLOYMENT.md   # How to deploy to Vercel
│   └── DEVELOPMENT.md         # Development guide for future changes
│
├── Configuration Files
│   ├── package.json           # Dependencies and scripts
│   ├── tsconfig.json          # TypeScript configuration
│   ├── next.config.js         # Next.js configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── .eslintrc.json         # ESLint configuration
│   ├── .gitignore             # Git ignore rules
│   └── .env.local.example     # Environment variable template
│
└── Documentation Files
    ├── README.md              # Main documentation
    ├── SETUP_GUIDE.md        # Step-by-step setup instructions
    ├── DEPLOYMENT_CHECKLIST.md # Pre-launch checklist
    └── PROJECT_STRUCTURE.md  # This file
```

---

## File Purposes

### App Directory (`app/`)

#### `layout.tsx`
- Root layout for the entire application
- Imports global styles and fonts
- Configures metadata (page title, description, OG tags)
- Wraps all pages with font variables

#### `page.tsx`
- Handles the root path `/`
- Simple redirect to `/notes/about`
- No content rendered (instant redirect)

#### `not-found.tsx`
- Custom 404 page
- Shows "Note not found" with back button
- Displayed when user visits non-existent slug

#### `robots.ts`
- SEO: Tells search engines which pages to crawl
- Allows crawling of `/` and `/notes/*`
- Blocks crawling of `/api/*`
- Points to sitemap.xml

#### `sitemap.ts`
- SEO: Generates XML sitemap
- Lists all published notes with modification dates
- Helps search engines discover pages

#### `notes/page.tsx`
- Two-panel layout: Sidebar on left, empty state on right
- Fetches all published notes on server
- Uses `<Sidebar />` component
- Static generation with 1-hour revalidation

#### `notes/[slug]/page.tsx`
- Individual note page
- Fetches note by slug (server-side)
- Generates static params for all published notes
- Generates dynamic metadata per note
- Uses `<Sidebar />` and `<NoteContent />` components
- Falls back to 404 if note not found

#### `api/revalidate/route.ts`
- Webhook endpoint for Supabase
- Listens for changes to `notes` table
- Validates `x-revalidate-secret` header
- Revalidates pages using `revalidatePath()`
- Enables instant updates without rebuilding entire site

### Components (`components/`)

Each component is a client component (`'use client'`) unless marked otherwise.

#### `WindowChrome.tsx`
- Decorative macOS window chrome
- Shows three traffic light dots (red, yellow, green)
- Displays domain name in center
- Hidden on mobile (< 768px)

#### `Sidebar.tsx`
- Left panel container
- Manages search and tag filtering state
- Renders notes list with sections (PINNED, RECENT)
- Responsive: full-width on mobile, fixed-width on desktop
- Passes `currentSlug` to highlight active note

#### `NoteItem.tsx`
- Individual note row in sidebar
- Shows: date, title, preview (first 60 chars), tag
- Highlights with accent color when active
- Links to `/notes/[slug]`
- Preview text is stripped of Markdown syntax

#### `SearchBar.tsx`
- Search input field
- Placeholder: "Search"
- Icons: magnifying glass
- State managed by parent (Sidebar)
- Filters on title field only (client-side, no DB query)

#### `TagFilter.tsx`
- Row of clickable tag pills
- Shows "All" + all unique tags from notes
- One tag active at a time
- Active state: colored background
- Inactive state: light gray background

#### `NoteContent.tsx`
- Right panel with note content
- Shows metadata (tag + date)
- Shows note title
- Renders Markdown content
- Mobile: Shows back button and note title
- Uses `<MarkdownRenderer />` component

#### `MarkdownRenderer.tsx`
- Wraps `react-markdown` library
- Custom component map for all Markdown elements
- Handles: headings, lists, code blocks, blockquotes, images, tables
- Uses `rehype-highlight` for syntax highlighting
- Styles match the design system (stone colors, accent, typography)

### Lib Directory (`lib/`)

#### `types.ts`
```typescript
type Tag = 'pinned' | 'now' | 'work' | 'writing' | 'principles' | 'reading';

interface Note {
  id: string;
  slug: string;
  title: string;
  content: string; // Markdown string
  tag: Tag;
  pinned: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}
```

#### `supabase.ts`
- Creates Supabase client for browser
- Uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Used by client components

#### `supabase-server.ts`
- Creates Supabase client for server
- Same credentials as `supabase.ts` (no service role needed for MVP)
- Exports helper functions:
  - `getAllPublishedNotes()` — Fetch all notes where `published = true`
  - `getNoteBySlug(slug)` — Fetch single note by slug
- Called by server components and API routes

#### `utils.ts`
- `generatePreview(content)` — Extract first 60 chars of note, strip Markdown
- `formatDate(dateString)` — Convert ISO date to "May 2026" format
- `getTagAccentColor(tag)` — Return hex color for tag (used in borders/pills)
- `getTagBgColor(tag)` — Return background color for tag pill

### Styles (`styles/`)

#### `globals.css`
- Tailwind directives: `@tailwind base/components/utilities`
- Custom prose styles for Markdown elements (headings, lists, code, blockquotes)
- Font face declarations for Geist
- Focus ring styles for accessibility
- Scrollbar hiding utility

---

## Configuration Files Explained

### `package.json`
- Lists all npm dependencies
- Scripts: `dev`, `build`, `start`, `lint`
- Dependencies include: Next.js, React, Supabase, react-markdown, Tailwind

### `tsconfig.json`
- Strict TypeScript mode enabled
- Path alias: `@/*` → root directory (allows `import from @/lib/utils`)
- Target: ES2020

### `next.config.js`
- Image domains: Supabase, Cloudflare Images
- Next.js doesn't need build config (App Router auto-detects)

### `tailwind.config.js`
- Content paths: `app/`, `components/`
- Extends theme with accent color `#E8855A`
- Adds scrollbar-hide utility
- Includes @tailwindcss/typography plugin

### `postcss.config.js`
- Processes Tailwind and autoprefixer

### `.eslintrc.json`
- Extends Next.js recommended rules
- Disables some rules that conflict with Next.js best practices

### `.gitignore`
- Ignores: `node_modules/`, `.next/`, `.env.local`
- Prevents committing sensitive files

### `.env.local.example`
- Template showing what environment variables are needed
- Copy this to `.env.local` and fill in your values

---

## Database Schema

### `notes` Table

```sql
CREATE TABLE notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,              -- URL identifier: "about", "why-i-declined-120k"
  title text NOT NULL,                    -- Display title
  content text NOT NULL,                  -- Markdown content
  tag text NOT NULL,                      -- One of 6 types
  pinned boolean DEFAULT FALSE,           -- Float to top of sidebar if true
  published boolean DEFAULT FALSE,        -- Only show if true
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);
```

### Indexes
- `slug` — Fast lookups by slug
- `tag` — Fast filtering by tag
- `published` — Fast filtering published notes
- `pinned` — Fast sorting pinned notes first

### Row Level Security (RLS)
- **Public read**: Anyone can read notes where `published = true`
- **Authenticated write**: Only authenticated users (you via Supabase dashboard) can create/update/delete

---

## Data Flow Diagram

```
User visits /notes/about
         ↓
app/notes/[slug]/page.tsx (server)
         ↓
getNoteBySlug("about") → Supabase
         ↓
Supabase returns Note object
         ↓
<NoteContent note={note} /> (client)
         ↓
<MarkdownRenderer content={note.content} /> (client)
         ↓
react-markdown renders HTML
         ↓
Browser displays styled note
```

---

## Component Hierarchy

```
RootLayout
├── app/page.tsx → redirect /notes/about
├── app/notes/page.tsx
│   └── <Sidebar>
│       ├── <WindowChrome />
│       ├── <SearchBar />
│       ├── <TagFilter />
│       └── <NoteItem /> × N
└── app/notes/[slug]/page.tsx
    ├── <Sidebar>
    │   └── <NoteItem /> × N
    └── <NoteContent>
        └── <MarkdownRenderer />
```

---

## Environment Variables

| Variable | Where Used | Example |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser & Server | `https://xyzabc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser & Server | `eyJhbG...` (long string) |
| `REVALIDATE_SECRET` | API route only | (generated with openssl) |

Note: `NEXT_PUBLIC_*` variables are exposed to the browser. The `anon` key is intentionally public; RLS policies control access.

---

## Build Output

After `npm run build`, the `.next/` directory contains:

```
.next/
├── static/          # Client-side JavaScript bundles
├── server/          # Server components and API routes
├── cache/           # Build cache
└── ... (internal Next.js files)
```

Total size is typically <1MB, optimized by Next.js.

---

## Performance Characteristics

| Page | Generation Method | Cache Duration |
|---|---|---|
| `/` | Redirect | Instant |
| `/notes` | Static (ISR) | 1 hour or webhook |
| `/notes/[slug]` | Static (ISR) | 1 hour or webhook |
| `/api/revalidate` | Dynamic | N/A (API) |

ISR = Incremental Static Regeneration. Pages are pre-generated at build time, revalidated on-demand via webhook.

---

## Security

- **Passwords**: Never stored in repo (`.env.local` in `.gitignore`)
- **API keys**: Only public/anon keys used (not service role key)
- **RLS policies**: Supabase database enforces access control
- **CORS**: Next.js API routes use secure defaults
- **CSP**: Not set (optional enhancement)
- **HTTPS**: Vercel enforces HTTPS automatically

---

## Future Expansion Points

### To Add Dark Mode

1. Update `tailwind.config.js` with dark variants
2. Create `<ThemeProvider>` component
3. Update all components to support `dark:` classes
4. Add toggle button in `<WindowChrome />`

### To Add Comments

1. Create `comments` table in Supabase
2. Add `NoteComments` component
3. Fetch comments in `[slug]/page.tsx`
4. RLS policy: users can write own comments, read all

### To Add Analytics

1. Integrate Supabase analytics or Vercel Web Analytics
2. Track page views in server component
3. Display dashboard (would need auth)

### To Add Newsletter

1. Add `subscribers` table in Supabase
2. Create `/api/subscribe` endpoint
3. Add email field to notes (optional)
4. Integrate email service (SendGrid, Resend, etc.)

---

## Common Tasks

### Add a new note
1. Go to Supabase Table Editor
2. Insert row with slug, title, content, tag, published=true

### Edit a note
1. Go to Supabase Table Editor
2. Click row, edit content field
3. Site updates within 30 seconds (via webhook)

### Change accent color
1. Update `tailwind.config.js`: `colors: { accent: '#NEWCOLOR' }`
2. Rebuild: `npm run build && npm run dev`

### Add a new tag
1. Update `Tag` type in `lib/types.ts`
2. Add color mappings in `lib/utils.ts`
3. Add label mappings in components (TagFilter, NoteItem, NoteContent)
4. Update Supabase check constraint

### Deploy changes
1. `git add . && git commit && git push origin main`
2. Vercel auto-deploys
3. Done!

---

## References

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

*Last updated: May 2026*
