# Supabase Setup Guide

Follow these steps to set up the database for the yashvijaykar.com website.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose a name (e.g., `yash-website`)
4. Choose a region (closest to your audience recommended)
5. Set a secure database password
6. Wait for the project to be created

## 2. Run the Database Schema

In the Supabase dashboard, go to **SQL Editor** and run the following SQL:

```sql
-- Create the notes table
create table notes (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  content     text not null,
  tag         text not null check (tag in ('pinned', 'now', 'work', 'writing', 'principles', 'reading')),
  pinned      boolean default false,
  published   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Create indexes for better query performance
create index notes_slug_idx on notes(slug);
create index notes_tag_idx on notes(tag);
create index notes_published_idx on notes(published);
create index notes_pinned_idx on notes(pinned);

-- Enable Row Level Security (RLS)
alter table notes enable row level security;

-- Public notes are readable by everyone
create policy "Public notes are viewable by everyone"
  on notes
  for select
  using (published = true);

-- Only authenticated users (you) can insert/update/delete
create policy "Only authenticated users can write"
  on notes
  for all
  using (auth.role() = 'authenticated');

-- Create trigger to auto-update the updated_at timestamp
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

## 3. Get Your API Keys

1. In Supabase, go to **Settings → API**
2. Copy your:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Add these to your `.env.local` file

## 4. Insert Seed Data

In the **SQL Editor**, run the seed data script below:

```sql
insert into notes (slug, title, content, tag, pinned, published) values
(
  'about',
  'Who is Yash',
  '## The arc

Sensemaker. Builder. Pre-founder in training.

[Add your authentic story here]

## What I am looking for

A pre-PMF founder building in mental health, preventive healthcare, or GenAI where I can be their most useful non-technical person.

## Start here

- [yashvijaykar98@gmail.com](mailto:yashvijaykar98@gmail.com)',
  'pinned',
  true,
  true
),
(
  'now',
  'What I''m doing now',
  '## Working on

[Add what you''re working on]

## Reading

[Add what you''re reading]

## Curious about

[Add what you''re curious about]

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
);
```

## 5. Set Up the Revalidation Webhook

This allows your site to update when you change notes in Supabase.

1. In Supabase, go to **Database → Webhooks**
2. Click "Create a new hook"
3. Fill in:
   - **Name**: `Site Revalidation`
   - **Table**: `notes`
   - **Events**: Check `INSERT`, `UPDATE`, `DELETE`
   - **HTTP URL**: `https://yashvijaykar.com/api/revalidate` (replace with your domain)
   - **Headers**: Add custom header
     - **Key**: `x-revalidate-secret`
     - **Value**: [Your REVALIDATE_SECRET from .env.local]
4. Click "Create webhook"

## 6. Test the Setup

1. Go to the Supabase **Table Editor**
2. Open the `notes` table
3. Try editing a note's content
4. Your live site should update within 30 seconds

## Managing Content

From now on, you manage all content via the Supabase Table Editor:

- **Add note**: Click "Insert row" and fill in the fields
- **Edit note**: Click the row and update the `content` field
- **Draft note**: Set `published = false`
- **Publish note**: Set `published = true`
- **Delete note**: Click the trash icon

No code changes needed. The site updates automatically via webhooks.
