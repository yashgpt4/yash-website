import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey);

export async function getAllPublishedNotes() {
  const { data, error } = await supabaseServer
    .from('notes')
    .select('*')
    .eq('published', true)
    .order('pinned', { ascending: false })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching notes:', error);
    return [];
  }

  return data || [];
}

export async function getNoteBySlug(slug: string) {
  const { data, error } = await supabaseServer
    .from('notes')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching note:', error);
    return null;
  }

  return data || null;
}
