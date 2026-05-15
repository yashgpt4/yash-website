'use client';

import { useRouter } from 'next/navigation';
import { Note, Tag } from '@/lib/types';
import { formatDate, getTagAccentColor } from '@/lib/utils';
import { MarkdownRenderer } from './MarkdownRenderer';

const TAG_LABELS: Record<Tag, string> = {
  pinned: 'Pinned',
  now: 'Now',
  work: 'Work',
  writing: 'Writing',
  principles: 'Principles',
  reading: 'Reading',
};

interface NoteContentProps {
  note: Note;
}

export function NoteContent({ note }: NoteContentProps) {
  const router = useRouter();
  const accentColor = getTagAccentColor(note.tag);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Mobile back button */}
      <div className="md:hidden flex items-center justify-between border-b border-stone-200 dark:border-stone-700/50 bg-white dark:bg-stone-900 px-4 py-3">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
          aria-label="Back to notes"
        >
          ← Notes
        </button>
        <h1 className="text-xs font-medium text-stone-900 dark:text-stone-100 truncate flex-1 text-center px-2">
          {note.title}
        </h1>
        <div className="w-8" />
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-stone-900">
        <div className="w-full px-6 py-8 md:px-16 md:py-12">
          {/* Metadata row */}
          <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-stone-500 mb-4">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span>{TAG_LABELS[note.tag]}</span>
            <span>·</span>
            <span>updated {formatDate(note.updated_at)}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-medium text-stone-900 dark:text-stone-100 mb-6 leading-tight">
            {note.title}
          </h1>

          {/* Horizontal rule */}
          <hr className="border-stone-200 dark:border-stone-700 mb-6" />

          {/* Markdown content */}
          <MarkdownRenderer content={note.content} />
        </div>
      </div>
    </div>
  );
}
