# Quick Start (5 minutes)

Get your site running locally RIGHT NOW.

## Prerequisites

- Node.js 18+ ([download](https://nodejs.org)) — Check if you have it: `node --version`
- GitHub account ([create free](https://github.com/signup)) — username: yashgpt4
- Supabase account ([free](https://supabase.com))

## Install & Run Locally

**Open Terminal on your Mac.**

```bash
# 1. Navigate to project folder (note the emoji at the end)
cd ~/Documents/Claude/Projects/yash\ Portfolio\ 🧃
```

```bash
# 2. Install dependencies (this downloads libraries, takes 2-3 min)
npm install
```

```bash
# 3. Copy the environment file
cp .env.local.example .env.local
```

```bash
# 4. Edit .env.local with your Supabase credentials
#    You'll get these from Supabase → Settings → API
```

Then edit the file and add your credentials (use any text editor, or nano).

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in browser. Done!

---

## Full Setup (45 minutes)

This includes Supabase database setup, GitHub SSH authentication, and Vercel deployment.

**→ Read [`SETUP_GUIDE.md`](./SETUP_GUIDE.md)**

**Note:** You MUST follow SETUP_GUIDE.md to set up:
- SSH keys for GitHub (old password auth doesn't work anymore)
- GitHub repository creation
- Supabase database
- Vercel deployment

---

## Key Files

| File | What to Read |
|---|---|
| `README.md` | Overview of the project |
| `SETUP_GUIDE.md` | Step-by-step full setup |
| `docs/SUPABASE_SETUP.md` | Database setup |
| `docs/VERCEL_DEPLOYMENT.md` | Deployment to production |
| `docs/DEVELOPMENT.md` | How to modify code |
| `PROJECT_STRUCTURE.md` | File-by-file breakdown |

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm run start            # Run production build locally
npm run lint             # Check for code issues

# Deployment
git push origin main     # Vercel auto-deploys
```

---

## Folder Structure

```
app/             → Pages and routes
components/      → React components
lib/             → Utilities and Supabase
styles/          → Global styles
docs/            → Documentation
```

---

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=[your-supabase-url]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
REVALIDATE_SECRET=[generate-with-openssl-rand-hex-32]
```

---

## Deploy to Production

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to Vercel and add environment variables

# 3. Done! Site is live
```

**→ Full instructions in [`docs/VERCEL_DEPLOYMENT.md`](./docs/VERCEL_DEPLOYMENT.md)**

---

## Manage Content

Go to Supabase Table Editor:

1. Add note: Click "Insert row"
2. Edit note: Click row, edit `content`
3. Publish: Set `published = true`
4. Site updates automatically within 30 seconds

No code changes needed!

---

## Questions?

- **Setup issues**: See [`SETUP_GUIDE.md`](./SETUP_GUIDE.md)
- **Database issues**: See [`docs/SUPABASE_SETUP.md`](./docs/SUPABASE_SETUP.md)
- **Deployment issues**: See [`docs/VERCEL_DEPLOYMENT.md`](./docs/VERCEL_DEPLOYMENT.md)
- **Code help**: See [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md)

---

**Ready? Read [`SETUP_GUIDE.md`](./SETUP_GUIDE.md) to get fully running in 30 minutes.**
