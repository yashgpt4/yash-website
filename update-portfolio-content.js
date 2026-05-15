/**
 * Run this once from your terminal to push portfolio content to Supabase:
 *   node update-portfolio-content.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const sb = createClient(
  'https://yarbcxcufofnqjzxdmmu.supabase.co',
  'sb_publishable_s2JrNNOq3LBZbhBW99Go8g_7Idtq0wQ'
);

const content = fs.readFileSync(
  path.join(__dirname, 'portfolio_final.md'),
  'utf-8'
);

async function run() {
  const { data, error } = await sb
    .from('notes')
    .upsert(
      {
        slug: 'work',
        title: 'I show up before I\'m hired',
        content,
        tag: 'work',
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
