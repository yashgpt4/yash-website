# Documentation Index

Complete guide to all files in the yash-website project.

---

## Start Here 👋

### New to the project?

1. **[QUICK_START.md](./QUICK_START.md)** — Get running in 5 minutes
2. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** — Full setup in 30 minutes
3. **[README.md](./README.md)** — Complete project overview

### About to deploy?

1. **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** — Pre-launch checklist
2. **[docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md)** — How to deploy to Vercel
3. **[docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)** — Database setup

### Want to modify code?

1. **[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** — How to make changes
2. **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** — File-by-file breakdown
3. **[BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** — What was built

---

## Documentation Files (Organized by Purpose)

### 🚀 Getting Started

| File | Purpose | Time |
|---|---|---|
| **[TERMINAL_GUIDE.md](./docs/TERMINAL_GUIDE.md)** | What is Terminal? How to use it? (for non-techies) | 10 min read |
| **[QUICK_START.md](./QUICK_START.md)** | Local setup in 5 min | 5 min read |
| **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** | Complete setup with GitHub SSH, Supabase & Vercel | 45 min read |

### 📋 Reference Docs

| File | Purpose | Audience |
|---|---|---|
| **[README.md](./README.md)** | Full project documentation | Everyone |
| **[BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** | What was built, features, metrics | You |
| **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** | File-by-file breakdown | Developers |
| **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** | Pre-launch verification | You (before launch) |

### 🛠️ How-To Guides

Located in `docs/` folder:

| File | Purpose |
|---|---|
| **[docs/TERMINAL_GUIDE.md](./docs/TERMINAL_GUIDE.md)** | Terminal explained for non-techies (SSH, Git, npm) |
| **[docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)** | How to set up Supabase database |
| **[docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md)** | How to deploy to Vercel |
| **[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)** | How to modify and extend code |

---

## Project Files

### Application Code

```
app/                    Pages and routes
├── layout.tsx          Root layout with metadata
├── page.tsx            / → redirects to /notes/about
├── not-found.tsx       Custom 404 page
├── robots.ts           SEO: robots.txt
├── sitemap.ts          SEO: XML sitemap
├── notes/
│   ├── page.tsx        /notes → notes list
│   └── [slug]/page.tsx /notes/[slug] → individual note
└── api/revalidate/
    └── route.ts        Webhook for ISR

components/             React components
├── WindowChrome.tsx    macOS title bar
├── Sidebar.tsx         Left panel
├── NoteItem.tsx        Note row
├── SearchBar.tsx       Search input
├── TagFilter.tsx       Tag filters
├── NoteContent.tsx     Right panel
└── MarkdownRenderer.tsx Markdown renderer

lib/                    Utilities
├── types.ts            TypeScript types
├── supabase.ts         Supabase client (browser)
├── supabase-server.ts  Supabase client (server)
└── utils.ts            Helper functions

styles/
└── globals.css         Global styles + Tailwind base

public/                 Static assets
└── favicon.ico         (to be added)
```

### Configuration Files

```
package.json            Dependencies and scripts
tsconfig.json           TypeScript config
next.config.js          Next.js config
tailwind.config.js      Tailwind config
postcss.config.js       PostCSS config
.eslintrc.json          ESLint config
.gitignore              Git ignore rules
.env.local.example      Environment template
```

---

## Reading Guide by Role

### I'm Yash (The Founder)

**First time setup:**
1. [QUICK_START.md](./QUICK_START.md) — Get running locally
2. [SETUP_GUIDE.md](./SETUP_GUIDE.md) — Full setup with Supabase
3. [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) — Deploy to internet

**Before launch:**
1. [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) — Verify everything

**Managing content:**
- Use Supabase Table Editor (no documentation needed, intuitive)
- See "Content Management" section in [README.md](./README.md)

**Questions:**
- Email: yashvijaykar98@gmail.com
- Or check [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)

---

### I'm a Developer

**First time:**
1. [README.md](./README.md) — Understand the project
2. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — Understand the code
3. [QUICK_START.md](./QUICK_START.md) — Get running locally

**Making changes:**
1. [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) — How to modify code
2. Check [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for file locations

**Deploying:**
1. [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) — How to deploy

**Understanding the build:**
1. [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) — What was built
2. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — Detailed file breakdown

---

### I'm a Future Contributor

1. [README.md](./README.md) — Project overview
2. [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) — How to contribute
3. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — Code organization
4. Check [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) for roadmap

---

## Quick Reference

### Common Tasks

```bash
# Local development
npm run dev              Read: QUICK_START.md

# Full setup
# Read: SETUP_GUIDE.md

# Deploy to production
git push origin main     Read: docs/VERCEL_DEPLOYMENT.md

# Manage content
# Go to Supabase Table Editor (no code needed)

# Modify code
# Read: docs/DEVELOPMENT.md

# Check if ready to launch
# Follow: DEPLOYMENT_CHECKLIST.md
```

### Key URLs

- **Site**: https://yashvijaykar.com (after deployment)
- **Local**: http://localhost:3000
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub**: (your repository URL)

### Key Files to Remember

| File | Why |
|---|---|
| `.env.local` | Your secrets (never commit) |
| `app/layout.tsx` | Site metadata and title |
| `tailwind.config.js` | Colors and design tokens |
| `lib/utils.ts` | Color mappings and helper functions |

---

## File Size & Complexity

| Type | Count | Complexity |
|---|---|---|
| React Components | 7 | ⭐⭐⭐ (mostly UI) |
| Pages | 4 | ⭐⭐⭐⭐ (data fetching) |
| API Routes | 1 | ⭐⭐ (simple webhook) |
| Config Files | 7 | ⭐ (boilerplate) |
| Documentation | 8 | ⭐⭐ (guides, not code) |

---

## Feature Status

### MVP (✅ Done)
- Notes app aesthetic
- Sidebar + content panel
- Search by title
- Filter by tag
- Markdown rendering
- Static generation + ISR
- Mobile responsive
- SEO + metadata
- Accessibility

### Post-MVP (📋 To Do)
- Dark mode
- Newsletter signup
- Private notes
- Full-text search
- Dynamic OG images
- Comments
- Analytics dashboard

See [Roadmap](./README.md#roadmap-post-mvp) in README for details.

---

## Getting Help

**"I want to get running quickly"**
→ [QUICK_START.md](./QUICK_START.md)

**"I want full setup with Supabase"**
→ [SETUP_GUIDE.md](./SETUP_GUIDE.md)

**"I want to deploy to production"**
→ [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md)

**"I want to modify the code"**
→ [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)

**"I want to understand the architecture"**
→ [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

**"I want to see what was built"**
→ [BUILD_SUMMARY.md](./BUILD_SUMMARY.md)

**"I'm not sure where to start"**
→ This file (you're reading it!)

**"I have a specific question"**
→ Email: yashvijaykar98@gmail.com

---

## Document Versions

All guides are current as of May 13, 2026.

| Document | Last Updated | Version |
|---|---|---|
| README.md | May 13, 2026 | 1.0 |
| SETUP_GUIDE.md | May 13, 2026 | 1.0 |
| docs/DEVELOPMENT.md | May 13, 2026 | 1.0 |
| docs/SUPABASE_SETUP.md | May 13, 2026 | 1.0 |
| docs/VERCEL_DEPLOYMENT.md | May 13, 2026 | 1.0 |

---

**Last Updated**: May 13, 2026  
**Author**: Claude  
**Status**: ✅ Complete & Production-Ready
