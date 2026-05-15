import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Sidebar } from '@/components/Sidebar';
import { NoteContent } from '@/components/NoteContent';
import { PortfolioContent } from '@/components/PortfolioContent';
import { getNoteBySlug } from '@/lib/supabase-server';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const note = await getNoteBySlug(params.slug);

  if (!note) {
    return { title: 'Note Not Found' };
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
  params: { slug: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await getNoteBySlug(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="fixed inset-y-0 left-0 w-full md:w-64 md:relative md:flex md:flex-col">
        <Sidebar />
      </div>
      <div className="w-full md:flex-1 md:relative">
        {params.slug === 'work' ? (
          <PortfolioContent />
        ) : (
          <NoteContent note={note} />
        )}
      </div>
    </div>
  );
}
