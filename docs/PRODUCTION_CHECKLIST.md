# Production Checklist
*Born from a painful lesson — May 2026*

---

## Before Every `git push`

**1. Never use `git add -A` or `git add .`**
Always name the exact files you're committing:
```bash
git add vercel.json package.json   # ✅
git add -A                         # ❌ sweeps in everything, including local scripts with secrets
```

**2. Review what's staged before committing**
```bash
git diff --staged   # see exactly what's going into the commit
git status          # check for surprise untracked files being added
```

**3. Scan for secrets before pushing**
Search for common patterns before any commit:
```bash
grep -r "eyJ" .                  # catches JWT tokens (Supabase keys start with this)
grep -r "service_role" .
grep -r "SECRET" . --include="*.js" --include="*.ts"
```

---

## Secrets — Hard Rules

- **Never hardcode a key, token, or password in any file** — even a "one-off local script"
- All secrets go in environment variables: `process.env.YOUR_KEY`
- Local scripts that need secrets should read from shell env:
  ```bash
  export SUPABASE_SERVICE_ROLE_KEY='your-key'
  node update-principles.js
  ```
- If you type a key into a file and later delete it, it's still in git history. Rotate the key anyway.

---

## `.gitignore` Must Cover

```
.env
.env.local
.env*.local
*.env
*secret*
*credentials*
```

One-off admin scripts (like `update-principles.js`) should either be in `.gitignore` or in a separate private repo entirely.

---

## Before Deploying to Vercel

- Check the build log's first line: **which commit hash is Vercel building?**
  Verify it matches your latest `git push` — if it doesn't, you're deploying stale code.
- Confirm the Framework Preset in Vercel dashboard is what you intend (Next.js vs Other)
- After deploy, **manually test** the specific URLs that have broken before: `/portfolio`, `/about`, etc.

---

## When Getting AI Help With Git Commands

- If an AI gives you a `git add` command, check whether it's `git add -A` (dangerous) or specific files (safe)
- Before running any destructive command (`rm -rf`, `git add -A`, `npm uninstall`), pause and ask: *what files does this touch that I haven't thought about?*
- `git add -A` is almost never the right command when fixing a specific bug

---

## If a Secret Is Ever Leaked

1. **Rotate the key immediately** (Supabase: Settings → API → rotate service role key)
2. Remove the secret from the file, replace with `process.env.YOUR_KEY`
3. Commit and push the clean file
4. Mark the GitHub secret alert as Revoked
5. Check Supabase logs for any unauthorized access during the exposure window
