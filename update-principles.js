/**
 * Run this once from your terminal to push principles content to Supabase:
 *   node update-principles.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcmJjeGN1Zm9mbnFqenhkbW11Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODY2NDQ1NCwiZXhwIjoyMDk0MjQwNDU0fQ.joWcoDV4Y2_6kHp05zJKi_T842c6YiMDnv2VNsNthug';

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
