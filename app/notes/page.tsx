import { Sidebar } from '@/components/Sidebar';

export default function NotesPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="fixed inset-y-0 left-0 w-full md:w-64 md:relative md:flex md:flex-col">
        <Sidebar />
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center bg-white dark:bg-stone-900 text-center">
        <p className="text-sm text-stone-400 dark:text-stone-500">Select a note to read it.</p>
      </div>
      <div className="md:hidden flex-1" />
    </div>
  );
}
