/**
 * Run this once from your terminal to push principles content to Supabase:
 *   node update-principles.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// NEVER hardcode keys. Set this in your shell before running:
//   export SUPABASE_SERVICE_ROLE_KEY='your-key-here'
// Get the current key from: Supabase dashboard → Settings → API → Service Role Key
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable.');
  console.error('Run: export SUPABASE_SERVICE_ROLE_KEY=\'your-key-here\'');
  process.exit(1);
}

const sb = createClient(
  'https://yarbcxcufofnqjzxdmmu.supabase.co',
  SERVICE_ROLE_KEY
);

const content = fs.readFileSync(
  path.join(__dirname, 'portfolio content', 'principles.md'),
  'utf-8'
);

async function run() {
  const { data, error } = await sb
    .from('notes')
    .upsert(
      {
        slug: 'principles',
        title: 'Principles',
        content,
        tag: 'principles',
        published: true,
        pinned: false,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'slug' }
    )
    .select();

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log('Done. Updated note:', data?.[0]?.slug);
}

run();
