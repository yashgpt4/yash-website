import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import { NoteContent } from '@/components/NoteContent';
import { getAllPublishedNotes, getNoteBySlug } from '@/lib/supabase-server';

export const revalidate = 3600; // Revalidate every hour, or on webhook

export async function generateStaticParams() {
  const notes = await getAllPublishedNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const note = await getNoteBySlug(params.slug);

  if (!note) {
    return {
      title: 'Note Not Found',
    };
  }

  const description = note.content
    .slice(0, 160)
    .replace(/[#*`\[\]]/g, '')
    .trim();

  return {
    title: note.title,
    description,
    openGraph: {
      title: note.title,
      description,
      type: 'article',
      publishedTime: note.created_at,
      modifiedTime: note.updated_at,
    },
  };
}

interface NotePageProps {
  params: {
    slug: string;
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await getNoteBySlug(params.slug);
  const allNotes = await getAllPublishedNotes();

  if (!note) {
    notFound();
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar - hidden on mobile when note is active */}
      <div className="fixed inset-y-0 left-0 w-full md:w-64 md:relative md:flex md:flex-col">
        <Sidebar notes={allNotes} currentSlug={params.slug} />
      </div>

      {/* Note content - full screen on mobile, flex-1 on desktop */}
      <div className="w-full md:flex-1 md:relative">
        <NoteContent note={note} />
      </div>
    </div>
  );
}
