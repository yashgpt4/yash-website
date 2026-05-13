import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-stone-50">
      <div className="text-center">
        <h1 className="text-2xl font-medium text-stone-900 mb-4">Note not found</h1>
        <Link
          href="/notes"
          className="text-accent hover:underline text-sm flex items-center justify-center gap-1"
        >
          ← Back to notes
        </Link>
      </div>
    </div>
  );
}
