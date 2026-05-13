# Vercel Deployment Guide

Deploy your website to the internet in minutes.

## 1. Push to GitHub

First, create a GitHub repository and push the code:

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: yashvijaykar.com MVP"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/yash-website.git
git branch -M main
git push -u origin main
```

## 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose the `yash-website` repository
5. Vercel auto-detects Next.js — no configuration needed
6. Click "Deploy"

Vercel will provide a temporary URL like `yash-website.vercel.app`

## 3. Add Environment Variables

1. In Vercel, go to your project **Settings → Environment Variables**
2. Add the following:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `REVALIDATE_SECRET`: A secure random string (generate with `openssl rand -hex 32`)
3. Click "Save"

Your site will redeploy automatically with the new variables.

## 4. Connect Custom Domain

1. In Vercel, go to **Settings → Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., `yashvijaykar.com`)
4. Follow Vercel's DNS instructions:
   - For a new domain: Change nameservers to Vercel's
   - For an existing domain: Add a CNAME record pointing to Vercel

SSL is provisioned automatically.

## 5. Enable Analytics (Optional)

In Vercel, go to **Settings → Analytics**:
- **Web Analytics**: Free, privacy-respecting page views
- Recommended to enable for understanding visitor patterns

## Deployment Workflow

From now on:
- Every push to `main` → production deployment (automatic)
- Every pull request → preview URL (automatic)
- No manual deploy steps needed

## Troubleshooting

**Site shows "Not Found" errors:**
- Check that `REVALIDATE_SECRET` matches in Vercel and Supabase webhook
- Verify environment variables are set

**Notes not appearing:**
- Check Supabase notes table has `published = true`
- Run the revalidation webhook manually

**Site loads slowly:**
- Check Vercel Analytics for bottlenecks
- Verify Supabase region is close to your visitors

## Updates and Maintenance

**To update the site:**
1. Edit code locally
2. `git push` to main
3. Vercel deploys automatically

**To update content:**
1. Go to Supabase Table Editor
2. Edit note content
3. Site updates within 30 seconds via webhook
