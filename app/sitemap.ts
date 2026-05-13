import type { MetadataRoute } from 'next';
import { getAllPublishedNotes } from '@/lib/supabase-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getAllPublishedNotes();

  const noteEntries = notes.map((note) => ({
    url: `https://yashvijaykar.com/notes/${note.slug}`,
    lastModified: new Date(note.updated_at),
    changeFrequency: 'monthly' as const,
    priority: note.pinned ? 0.9 : 0.8,
  }));

  return [
    {
      url: 'https://yashvijaykar.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://yashvijaykar.com/notes',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...noteEntries,
  ];
}
