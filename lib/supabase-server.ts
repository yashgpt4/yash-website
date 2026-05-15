import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseServer: SupabaseClient | null = null;
if (supabaseUrl && supabaseAnonKey) {
  supabaseServer = createClient(supabaseUrl, supabaseAnonKey);
}

export async function getAllPublishedNotes() {
  if (!supabaseServer) return [];

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
  if (!supabaseServer) return null;

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
