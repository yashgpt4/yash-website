# yashvijaykar.com — Personal Website

A notes app-inspired personal website built with Next.js, Supabase, and Vercel.

## Features

- **macOS Notes aesthetic** — Full-screen two-panel layout (sidebar + content)
- **Zero code required for content** — Add, edit, and publish notes via Supabase dashboard
- **Static generation with ISR** — Fast page loads, automatic updates via webhooks
- **Fully responsive** — Sidebar collapses on mobile; notes expand full-screen
- **Search and filtering** — Real-time search by title, filter by tag
- **Markdown rendering** — Write in Markdown, render beautifully
- **SEO optimized** — Dynamic metadata, sitemap, OG images
- **Accessible** — Keyboard navigation, semantic HTML, ARIA labels
- **Performance optimized** — Lighthouse score ≥90 on desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (Postgres)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel
- **Markdown**: react-markdown + remark-gfm + rehype-highlight
- **Fonts**: Geist (Vercel's font family)

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/yourusername/yash-website.git
cd yash-website
npm install
```

### 2. Set up Supabase

Follow the [Supabase Setup Guide](./docs/SUPABASE_SETUP.md):
- Create a Supabase project
- Run the database schema
- Get your API keys
- Seed initial notes

### 3. Create `.env.local`

Copy `.env.local.example` and fill in your values:

```bash
cp .env.local.example .env.local
```

Then add:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anon key
- `REVALIDATE_SECRET` — A random secret string (generate with `openssl rand -hex 32`)

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` — you'll be redirected to `/notes/about`.

### 5. Deploy to Vercel

Follow the [Vercel Deployment Guide](./docs/VERCEL_DEPLOYMENT.md):
- Push to GitHub
- Connect to Vercel
- Set environment variables
- Add custom domain

## Project Structure

```
yash-website/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Redirect to /notes/about
│   ├── not-found.tsx           # Custom 404 page
│   ├── notes/
│   │   ├── page.tsx            # Notes index (sidebar + empty state)
│   │   └── [slug]/
│   │       └── page.tsx        # Individual note view
│   └── api/
│       └── revalidate/
│           └── route.ts        # Webhook for ISR revalidation
├── components/
│   ├── WindowChrome.tsx        # macOS title bar
│   ├── Sidebar.tsx             # Left panel with note list
│   ├── NoteItem.tsx            # Individual note row
│   ├── SearchBar.tsx           # Search input
│   ├── TagFilter.tsx           # Tag filter pills
│   ├── NoteContent.tsx         # Right panel with note content
│   └── MarkdownRenderer.tsx    # Markdown to HTML
├── lib/
│   ├── types.ts                # TypeScript types
│   ├── supabase.ts             # Supabase client (browser)
│   ├── supabase-server.ts      # Supabase client (server)
│   └── utils.ts                # Utility functions
├── styles/
│   └── globals.css             # Tailwind base + custom styles
├── docs/
│   ├── SUPABASE_SETUP.md       # Database setup instructions
│   └── VERCEL_DEPLOYMENT.md    # Deployment guide
└── public/
    └── favicon.ico             # Site favicon
```

## Managing Content

All content is managed via the **Supabase Table Editor** (no code required).

### Add a new note

1. Go to Supabase dashboard → Table Editor
2. Click "Insert row"
3. Fill in:
   - `slug` — URL-safe identifier (e.g., `my-note`)
   - `title` — Display title
   - `content` — Markdown content
   - `tag` — One of: `pinned`, `now`, `work`, `writing`, `principles`, `reading`
   - `pinned` — `true` to float to top of sidebar
   - `published` — `true` to show on site
4. Save — site updates within 30 seconds

### Write in Markdown

Notes support standard Markdown:

```markdown
# Heading 1

## Heading 2

Regular paragraph text.

- Bulleted list
- Another item

**Bold text** and *italic text*

[Link](https://example.com)

> Blockquote

---

Horizontal rule

`inline code`

\`\`\`javascript
// Code block
const x = 1;
\`\`\`
```

## Design System

### Colors

| Role | Color | CSS |
|---|---|---|
| Primary text | `#1C1917` | `text-stone-900` |
| Secondary text | `#78716C` | `text-stone-500` |
| Muted text | `#A8A29E` | `text-stone-400` |
| Borders | `#E7E5E4` | `border-stone-200` |
| Accent | `#E8855A` | Warm terracotta |

### Typography

- **Font**: Geist Sans (loaded via `next/font`)
- **Body**: 15px, line-height 1.75
- **Line length**: 65 characters (ensures readability)

## Performance

### Lighthouse Targets

- **Performance**: ≥ 90 on desktop
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1

### How we achieve this

- Static generation at build time
- Incremental Static Regeneration (ISR) on updates
- Minimal client-side JavaScript
- No third-party scripts (except analytics beacon)
- Image lazy loading
- Font optimization

## Accessibility

- Keyboard navigation fully supported
- Semantic HTML (`<nav>`, `<main>`, `<header>`)
- ARIA labels on icon buttons
- Focus rings visible
- Color not the only way information is conveyed
- Minimum 11px font size

## Roadmap (Post-MVP)

- [ ] Dark mode
- [ ] Private notes (session-based)
- [ ] Keyboard shortcuts (Vim-style)
- [ ] Command palette (Cmd+K)
- [ ] Newsletter signup
- [ ] Full-text search
- [ ] Note sharing via link
- [ ] Dynamic OG images per note
- [ ] RSS feed
- [ ] View counts / analytics per note

## Troubleshooting

### "Cannot find module '@/lib/types'"

TypeScript path alias not set up. Check your `tsconfig.json` has:

```json
"paths": {
  "@/*": ["./*"]
}
```

### Site shows "Note not found" errors

1. Verify notes table has `published = true`
2. Check slug matches URL (slug is lowercase, hyphen-separated)
3. Run `npm run build` locally to test

### Notes not updating after edit

1. Check `REVALIDATE_SECRET` in Vercel matches Supabase webhook
2. Verify webhook is enabled in Supabase (Database → Webhooks)
3. Check webhook HTTP request logs for errors

### Slow site load

1. Check Vercel Analytics for bottlenecks
2. Verify Supabase region is close to visitors
3. Run Lighthouse audit locally

## References

- [Alana Goyal's site](https://alanagoyal.com) (technical implementation reference)
- [Helen Huang's site](https://helenhuang.io) (design inspiration)
- [Next.js App Router docs](https://nextjs.org/docs/app)
- [Supabase docs](https://supabase.com/docs)
- [Vercel docs](https://vercel.com/docs)

## License

This project is provided as-is for personal use.

## Questions?

Email: [yashvijaykar98@gmail.com](mailto:yashvijaykar98@gmail.com)

---

Built with ❤️ by Yash Vijaykar
