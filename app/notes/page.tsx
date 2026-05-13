import { Sidebar } from '@/components/Sidebar';
import { getAllPublishedNotes } from '@/lib/supabase-server';

export const revalidate = 3600; // Revalidate every hour, or on webhook

export default async function NotesPage() {
  const notes = await getAllPublishedNotes();

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-full md:w-64 md:relative md:flex md:flex-col">
        <Sidebar notes={notes} />
      </div>

      {/* Desktop: empty state on right */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-white text-center">
        <p className="text-sm text-stone-400">Select a note to read it.</p>
      </div>

      {/* Mobile: empty state hidden, sidebar takes full screen */}
      <div className="md:hidden flex-1" />
    </div>
  );
}
