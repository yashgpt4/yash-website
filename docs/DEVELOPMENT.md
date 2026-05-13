# Development Guide

How to modify and extend the yashvijaykar.com website.

## Getting Started

### Prerequisites

- Node.js 18+ (download from [nodejs.org](https://nodejs.org))
- A Supabase account (free at [supabase.com](https://supabase.com))
- A GitHub account (optional, for version control)

### Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/yash-website.git
cd yash-website
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env.local`**

```bash
cp .env.local.example .env.local
```

Fill in the values from your Supabase project settings.

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Architecture

### Data Flow

```
Supabase (notes table)
       ↓
supabase-server.ts (fetch functions)
       ↓
Next.js pages (app/notes/[slug]/page.tsx)
       ↓
Components (Sidebar, NoteContent, etc.)
       ↓
Browser
```

### Client vs. Server Components

- **Server Components** (default): Fetch data, render on server, send HTML
  - `app/notes/page.tsx`
  - `app/notes/[slug]/page.tsx`

- **Client Components** (`'use client'`): Interactive, render in browser
  - `Sidebar` (search, tag filtering)
  - `SearchBar`, `TagFilter`, `NoteItem`
  - `MarkdownRenderer`
  - `NoteContent` (back button, mobile nav)

## Making Changes

### Adding a New Component

Example: Adding a "Share" button.

1. **Create the component** in `components/ShareButton.tsx`

```typescript
'use client';

interface ShareButtonProps {
  url: string;
  title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
    }
  };

  return (
    <button onClick={handleShare} className="text-accent hover:underline">
      Share
    </button>
  );
}
```

2. **Import and use it** in `app/notes/[slug]/page.tsx`

```typescript
import { ShareButton } from '@/components/ShareButton';

// Inside the NoteContent component:
<ShareButton url={`https://yashvijaykar.com/notes/${note.slug}`} title={note.title} />
```

3. **Test locally**

```bash
npm run dev
# Visit http://localhost:3000/notes/about
```

### Modifying Styles

All styles use **Tailwind CSS** utility classes.

**Example: Change the accent color**

In `tailwind.config.js`:

```javascript
colors: {
  accent: '#E8855A', // Change this to your color
}
```

Then rebuild:

```bash
npm run build
npm run dev
```

**Example: Change the sidebar width on desktop**

In `components/Sidebar.tsx`:

```typescript
<div className="flex h-screen w-full flex-col border-r border-stone-200 bg-stone-100 md:w-64">
  {/* Change md:w-64 to md:w-72 for wider sidebar */}
```

### Adding a New Tag Type

1. **Update the Type** in `lib/types.ts`

```typescript
export type Tag = 'pinned' | 'now' | 'work' | 'writing' | 'principles' | 'reading' | 'new-tag';
```

2. **Add color mapping** in `lib/utils.ts`

```typescript
export function getTagAccentColor(tag: string): string {
  const colors: Record<string, string> = {
    pinned: '#DC2626',
    // ... other colors
    'new-tag': '#FFFFFF', // Your new tag color
  };
  return colors[tag] || '#78716C';
}
```

3. **Add label mapping** in components:
   - `components/TagFilter.tsx`
   - `components/NoteItem.tsx`
   - `components/NoteContent.tsx`

```typescript
const TAG_LABELS: Record<Tag, string> = {
  pinned: 'Pinned',
  // ... other labels
  'new-tag': 'New Tag',
};
```

4. **Update Supabase** check constraint

Go to Supabase SQL Editor and modify the check:

```sql
alter table notes 
drop constraint notes_tag_check;

alter table notes
add constraint notes_tag_check 
check (tag in ('pinned', 'now', 'work', 'writing', 'principles', 'reading', 'new-tag'));
```

### Adding a New Page Section

Example: Add an "Essays" link in the sidebar.

1. **Create a new page** at `app/notes/essays/page.tsx`

2. **Add navigation** in `Sidebar.tsx`

```typescript
<Link href="/notes/essays" className="block px-4 py-2 text-xs text-accent hover:underline">
  Essays
</Link>
```

## Testing

### Local Testing

```bash
npm run dev
# Visit pages and click around
# Check browser console for errors
```

### Build Testing

```bash
npm run build
npm run start
# Visit http://localhost:3000
```

### Lighthouse Audit

1. Open DevTools (F12)
2. Go to the Lighthouse tab
3. Click "Analyze page load"
4. Target: Performance ≥ 90, Accessibility 100

## Deployment

### Test a Preview Deployment

Push to a branch and open a PR on GitHub. Vercel creates a preview URL automatically.

```bash
git checkout -b my-feature
# Make changes
git add .
git commit -m "Add feature"
git push origin my-feature
# Open PR on GitHub
# Vercel provides a preview URL
```

### Deploy to Production

```bash
git checkout main
git merge my-feature
git push origin main
# Vercel auto-deploys
```

## Debugging

### Enable Debug Logging

Add `console.log()` statements:

```typescript
// In supabase-server.ts
export async function getNoteBySlug(slug: string) {
  console.log('Fetching note:', slug);
  const { data, error } = await supabaseServer.from('notes').select('*').eq('slug', slug).single();
  if (error) console.error('Error:', error);
  return data;
}
```

### View server logs

```bash
npm run dev
# Check the terminal output
```

### Check Vercel logs

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to **Deployments** and click on a deployment
4. View **Function Logs** and **Build Logs**

## Performance Optimization

### Cache Strategy

- **Pages**: Revalidated every hour (`revalidate = 3600`)
- **On update**: Revalidated via webhook (instant)

To change revalidation interval:

```typescript
// app/notes/page.tsx
export const revalidate = 7200; // 2 hours instead of 1
```

### Reducing Bundle Size

Current packages:
- `react-markdown` (~25KB gzipped)
- `remark-gfm` (~5KB gzipped)
- `rehype-highlight` (~10KB gzipped)

To reduce further, consider:
- Remove unused markdown features
- Use a lighter syntax highlighter
- Code split large components

### Image Optimization

Images are lazy-loaded by default:

```typescript
<img src="..." loading="lazy" />
```

To use Next.js Image:

```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.png"
  alt="..."
  width={800}
  height={600}
  loading="lazy"
/>
```

## Common Issues & Solutions

| Issue | Solution |
|---|---|
| TypeScript errors | Run `npm run build` to see full errors |
| Vercel deploy fails | Check `.env` variables are set in Vercel dashboard |
| Notes not showing | Verify `published = true` in Supabase |
| Styles look broken | Run `npm run dev` and rebuild (Tailwind must compile) |
| Search doesn't work | Check browser console for JavaScript errors |

## Code Style

We follow these conventions:

- **TypeScript**: Strict mode enabled
- **React**: Use `'use client'` at top of client components
- **Tailwind**: Use utility classes (no custom CSS unless necessary)
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Imports**: Absolute imports with `@/` alias

## Resources

- [Next.js App Router docs](https://nextjs.org/docs/app)
- [React docs](https://react.dev)
- [Tailwind CSS docs](https://tailwindcss.com)
- [TypeScript docs](https://www.typescriptlang.org/docs/)
- [Supabase docs](https://supabase.com/docs)

## Contributing

For improvements, please:

1. Create a feature branch
2. Make changes and test locally
3. Push to GitHub
4. Open a PR with a description
5. Review and merge

## Questions?

Email: [yashvijaykar98@gmail.com](mailto:yashvijaykar98@gmail.com)
