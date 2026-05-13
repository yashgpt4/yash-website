# Deployment Checklist

Complete this checklist before deploying your website to production.

## Pre-Launch Checklist

### Content
- [ ] About note is written with authentic story
- [ ] Now note describes current work/interests
- [ ] At least one case study or essay added
- [ ] All notes use proper Markdown formatting
- [ ] No placeholder text remaining in published notes

### Configuration
- [ ] Supabase project created and database schema initialized
- [ ] All environment variables set in `.env.local` (for local testing)
- [ ] All environment variables set in Vercel dashboard (for production)
- [ ] `REVALIDATE_SECRET` is a secure random string (32+ characters)
- [ ] Custom domain configured in Vercel (if applicable)

### Technical
- [ ] `npm install` completed successfully
- [ ] `npm run build` passes without errors
- [ ] `npm run dev` runs without console errors
- [ ] Local testing complete:
  - [ ] Notes appear in sidebar
  - [ ] Search filters notes correctly
  - [ ] Tag filtering works
  - [ ] Individual notes load
  - [ ] Markdown renders correctly
  - [ ] Mobile layout works
  - [ ] Back button works on mobile

### Deployment
- [ ] Code pushed to GitHub main branch
- [ ] Vercel deployment successful
- [ ] Vercel preview URL loads without errors
- [ ] Revalidation webhook configured in Supabase
- [ ] Webhook tested: edit a note in Supabase, verify live site updates within 30 seconds

### Analytics & Monitoring
- [ ] Vercel Analytics enabled (optional but recommended)
- [ ] Error monitoring set up (optional)

### SEO & Meta
- [ ] Page title shows correctly: "Yash Vijaykar"
- [ ] Note titles show in browser tab
- [ ] Meta description is accurate
- [ ] Twitter handle added in layout.tsx (if applicable)

### Accessibility
- [ ] Keyboard navigation works (Tab through all interactive elements)
- [ ] Focus rings visible on all buttons
- [ ] Search input is accessible
- [ ] Mobile back button is accessible
- [ ] All links have descriptive text (no "click here")

### Performance
- [ ] Lighthouse Desktop score ≥ 90
- [ ] Lighthouse Mobile score ≥ 80
- [ ] No console errors
- [ ] No network errors
- [ ] Images load without issues

### Security
- [ ] `.env.local` is in `.gitignore` (never committed)
- [ ] `REVALIDATE_SECRET` is not hardcoded in code
- [ ] Supabase RLS policies are in place
- [ ] Only published notes are visible publicly

---

## Before You Go Live

### Final Testing (24 hours before launch)

1. **Fresh browser test** (incognito mode):
   - Clear cache completely
   - Visit your site on desktop
   - Visit on mobile (or DevTools responsive mode)
   - Read through a few notes

2. **Verify Supabase connection**:
   - Edit a note in Supabase
   - Wait 30 seconds
   - Verify the live site reflects the change

3. **Check all links**:
   - Click every note in the sidebar
   - Click every link within notes
   - Verify external links open in new tab

4. **Mobile check**:
   - Sidebar collapses on mobile
   - Note content is readable
   - Back button works
   - No horizontal scroll

5. **Performance audit**:
   - Run Lighthouse on desktop (F12 → Lighthouse)
   - Run Lighthouse on mobile
   - Check Vercel Analytics (if enabled)

### Launch Steps

1. **Verify domain is working** (if using custom domain)
   - Visit `yashvijaykar.com` in browser
   - Should load without errors

2. **Test webhook one more time**:
   - Edit a note
   - Wait 30 seconds
   - Refresh live site
   - Change should appear

3. **Share the link**:
   - Post to Twitter/X
   - Share with founders and operators
   - Email key people

4. **Monitor the first 48 hours**:
   - Check Vercel Analytics
   - Look for error patterns
   - Monitor Supabase database
   - Respond to any messages

---

## Troubleshooting

### Site doesn't load on Vercel

**Symptom**: "Error: Function failed" or 500 error

**Fix**:
1. Check environment variables in Vercel are set correctly
2. Verify Supabase project is accessible
3. Check `NEXT_PUBLIC_SUPABASE_URL` doesn't have trailing slash

### Notes don't appear

**Symptom**: Sidebar is empty or says "No notes found"

**Fix**:
1. Verify notes table has `published = true`
2. Check Supabase connection in `.env.local`
3. Try `npm run build && npm run start` locally
4. Check browser console for errors

### Webhooks don't fire

**Symptom**: Edit note in Supabase, live site doesn't update

**Fix**:
1. Verify webhook is enabled in Supabase (Database → Webhooks)
2. Check `x-revalidate-secret` header matches environment variable
3. Verify HTTP URL is correct (https, not http)
4. Check Supabase webhook logs for errors
5. Try manual revalidation: visit `https://yourdomain.com/api/revalidate` in DevTools

### Lighthouse score below target

**Symptom**: Lighthouse Performance < 90

**Fix**:
1. Check for large images (run `npm run build` and check `.next/static`)
2. Verify fonts are loading correctly (check Network tab)
3. Remove unused npm packages
4. Check for third-party scripts
5. Use Lighthouse "Performance" audit to identify bottlenecks

---

## Post-Launch

### Maintenance Schedule

**Daily**:
- Check for error reports
- Monitor incoming messages

**Weekly**:
- Review Vercel Analytics
- Check if any notes need updating
- Review incoming interest from founders

**Monthly**:
- Update "Now" note with current status
- Review and update case studies if needed
- Check performance metrics

### Future Enhancements

Consider these features after launch (not MVP):

- [ ] Dark mode
- [ ] Newsletter signup integration
- [ ] Full-text search across all notes
- [ ] Private notes (for drafts)
- [ ] Keyboard shortcuts
- [ ] Command palette (Cmd+K)
- [ ] Note view counts
- [ ] Dynamic OG images per note

See [README.md](./README.md) for full roadmap.

---

## Questions?

If you encounter issues not covered here:

1. Check the relevant doc:
   - [SETUP_GUIDE.md](./SETUP_GUIDE.md) — Getting started
   - [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md) — Database issues
   - [docs/VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) — Deployment issues
   - [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) — Code modification

2. Email: [yashvijaykar98@gmail.com](mailto:yashvijaykar98@gmail.com)

---

**Good luck with the launch! 🚀**
