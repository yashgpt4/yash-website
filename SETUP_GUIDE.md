# Complete Setup Guide

Get your yashvijaykar.com website running in 30 minutes.

## Overview

You'll complete these steps:

0. **GitHub & SSH Setup** (10 min) — Create GitHub repo, set up SSH keys
1. **Local Setup** (5 min) — Install dependencies
2. **Supabase Setup** (10 min) — Create database, seed data
3. **Environment Setup** (3 min) — Configure environment variables
4. **Local Testing** (5 min) — Run development server
5. **GitHub Push** (5 min) — Push code to GitHub
6. **Deployment** (7 min) — Deploy to Vercel

**Total time: ~45 minutes**

---

## Step 0: GitHub & SSH Setup

### 0.1 Create a GitHub Repository

You already have the code on your computer. Now you need to create a GitHub repository to store it.

**In your web browser:**

1. Go to [github.com](https://github.com) and log in as **yashgpt4**
2. Click the **+** icon (top right) → **New repository**
3. Fill in:
   - **Repository name**: `yash-website`
   - **Description**: "Personal website for Yash Vijaykar"
   - **Privacy**: Choose **Public** (so Vercel can access it)
   - Leave everything else as default
4. Click **Create repository**

You'll see a page with instructions. Don't follow them yet—just keep this page open.

### 0.2 Generate SSH Key (for secure Git access)

**Why SSH?** Old GitHub passwords don't work anymore. SSH keys are more secure and what GitHub requires now.

**On your Mac, open Terminal:**

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "yashvijaykar98@gmail.com"
```

**You'll see:**
```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/Users/yash/.ssh/id_ed25519):
```

**Just press Enter** (accept the default location).

Next it asks for a passphrase:
```
Enter passphrase (empty for no passphrase):
```

**Press Enter twice** (empty passphrase, for simplicity).

You'll see:
```
Your identification has been saved in /Users/yash/.ssh/id_ed25519
Your public key has been saved in /Users/yash/.ssh/id_ed25519.pub
...
```

✅ SSH keys created!

### 0.3 Add SSH Key to GitHub

**Back in Terminal:**

```bash
# Copy your public key to clipboard
cat ~/.ssh/id_ed25519.pub | pbcopy
```

**In your web browser:**

1. Go to [github.com/settings/ssh/new](https://github.com/settings/ssh/new)
2. Fill in:
   - **Title**: `MacBook Pro` (or your computer name)
   - **Key type**: Keep as **Authentication Key**
   - **Key**: Paste (Cmd+V) what you copied
3. Click **Add SSH key**

GitHub now recognizes your computer! ✅

### 0.4 Configure Git on Your Mac

**In Terminal:**

```bash
# Tell Git who you are
git config --global user.name "Yash Vijaykar"
git config --global user.email "yashvijaykar98@gmail.com"
```

**Verify it worked:**

```bash
git config --global user.name
git config --global user.email
```

You should see your name and email printed back.

---

## Step 1: Local Setup

### 1.1 Navigate to Your Project Folder

**In Terminal:**

```bash
cd ~/Documents/Claude/Projects/yash\ Portfolio\ 🧃
```

This is where your code already is. (Note the emoji 🧃 at the end.)

### 1.2 Initialize Git Repository

```bash
# Initialize Git in this folder
git init

# Connect to your GitHub repo (replace yashgpt4 with your username if different)
git remote add origin git@github.com:yashgpt4/yash-website.git

# Verify it worked
git remote -v
```

You should see:
```
origin  git@github.com:yashgpt4/yash-website.git (fetch)
origin  git@github.com:yashgpt4/yash-website.git (push)
```

✅ Git is now connected to your GitHub repo!

### 1.3 Install Dependencies

**Still in Terminal (same folder):**

```bash
npm install
```

**What's happening:** This downloads all the code libraries your website needs (Next.js, React, Tailwind, etc.). It may take 2-3 minutes and show a lot of text—this is normal.

**You'll see at the end:**
```
added XXX packages in XXs
```

✅ Dependencies installed!

---

## Step 2: Supabase Setup

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **New Project**
4. Choose:
   - **Name**: `yash-website`
   - **Database Password**: Use a secure password
   - **Region**: Pick the closest to you
5. Click **Create new project** and wait 2-3 minutes

### 2.2 Create the Database Schema

Once your project is created:

1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste the SQL from `docs/SUPABASE_SETUP.md` (the large SQL block)
4. Click **Run**

This creates the `notes` table and sets up security.

### 2.3 Seed Initial Notes

1. Still in **SQL Editor**, click **New Query** again
2. Copy and paste the seed data SQL from `docs/SUPABASE_SETUP.md`
3. Click **Run**

You now have 3 published notes (`about`, `now`, `principles`) ready to edit.

### 2.4 Get Your API Keys

1. Go to **Settings** (bottom left)
2. Click **API**
3. Under **Project API keys**, copy:
   - **Project URL** (looks like `https://[project-ref].supabase.co`)
   - **Anon public** key (a long string)

Keep these handy for the next step.

---

## Step 3: Environment Setup

### 3.1 Create `.env.local`

In the `yash-website` directory:

```bash
cp .env.local.example .env.local
```

### 3.2 Fill in the Variables

Open `.env.local` and paste:

```
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key-here]
REVALIDATE_SECRET=[generate-with-command-below]
```

**For REVALIDATE_SECRET**, generate a secure random string:

```bash
# On Mac or Linux:
openssl rand -hex 32

# Copy the output and paste it as the REVALIDATE_SECRET value
```

Save `.env.local`.

---

## Step 4: Local Testing

### 4.1 Start the Development Server

```bash
npm run dev
```

You'll see:

```
> next dev
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### 4.2 Visit the Site

Open your browser and go to **http://localhost:3000**

You'll be redirected to **http://localhost:3000/notes/about** — the about note.

### 4.3 Test the Features

- **Search**: Type in the search box at the top of the sidebar
- **Filter**: Click tag pills to filter by tag
- **Read**: Click any note to read it
- **Mobile**: Resize your browser to see mobile layout

### 4.4 Edit a Note (Optional)

To test the full loop:

1. Go to Supabase dashboard
2. **Table Editor** → `notes` table
3. Click the `about` row
4. Edit the `content` field (add some text)
5. Click **Save**
6. Refresh your browser — the change appears

---

## Step 5: Push Code to GitHub

You already set up Git and SSH in Step 0. Now let's send your code to GitHub.

**In Terminal (same folder):**

```bash
git add .
```

This stages all your files to be uploaded.

```bash
git commit -m "Initial commit: yashvijaykar.com MVP"
```

This creates a snapshot with a message.

```bash
git push -u origin main
```

This sends your code to GitHub.

**First time, you may see:**
```
The authenticity of host 'github.com' can't be established.
...
Are you sure you want to continue connecting (yes/no)?
```

Type `yes` and press Enter.

✅ Your code is now on GitHub!

---

## Step 6: Deploy to Vercel

### 6.1 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click **New Project**
4. Select the `yash-website` repository
5. Vercel auto-detects Next.js — no config needed
6. Click **Deploy**

Wait for the deployment to finish (~2 minutes).

### 6.2 Add Environment Variables

1. In Vercel, your project should now be visible
2. Go to **Settings** → **Environment Variables**
3. Add three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: [your Supabase URL]
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: [your anon key]
   - `REVALIDATE_SECRET`: [same value as in .env.local]
4. Click **Save**

Vercel will redeploy automatically with these variables.

### 6.3 Set Up Your Domain (Optional)

If you have a custom domain like `yashvijaykar.com`:

1. In Vercel, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your domain
4. Follow Vercel's DNS instructions (update nameservers or add CNAME record)
5. SSL certificate is provisioned automatically (takes a few minutes)

For now, your site is at `yash-website.vercel.app`.

### 6.4 Set Up the Revalidation Webhook

This makes your site update when you edit notes in Supabase.

1. Go to Supabase dashboard
2. **Database** → **Webhooks** (left sidebar)
3. Click **Create a new hook**
4. Fill in:
   - **Name**: `Site Revalidation`
   - **Table**: `notes`
   - **Events**: Check `INSERT`, `UPDATE`, `DELETE`
   - **HTTP URL**: `https://yash-website.vercel.app/api/revalidate` (or your custom domain)
   - **Headers**: Add custom header
     - **Key**: `x-revalidate-secret`
     - **Value**: [your REVALIDATE_SECRET]
5. Click **Create webhook**

---

## Done! 🎉

Your website is now live and ready.

### What You Can Do Now

✅ **Edit content**: Go to Supabase Table Editor, edit notes, and your site updates within 30 seconds  
✅ **Share notes**: Each note has a unique URL (e.g., `/notes/about`)  
✅ **Draft notes**: Set `published = false` to hide a note from the live site  
✅ **Add notes**: Insert a new row to add a note  
✅ **View stats**: Check Vercel Analytics for visitor data  

### Next Steps

1. **Update the "About" note** — Go to Supabase Table Editor, click the `about` row, and write your authentic story
2. **Update the "Now" note** — Tell people what you're currently working on
3. **Add your Twitter handle** in `app/layout.tsx` (line 18)
4. **Configure a favicon** (optional)
5. **Share your site** — Send the link to the founders and operators you want to connect with

### Need Help?

- **Questions**: Email [yashvijaykar98@gmail.com](mailto:yashvijaykar98@gmail.com)
- **Supabase issues**: See [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)
- **Vercel issues**: See [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md)
- **Code changes**: See [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)

---

*Happy shipping! 🚀*
