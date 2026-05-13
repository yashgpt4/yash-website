'use client';

import Link from 'next/link';
import { Note, Tag } from '@/lib/types';
import { generatePreview, formatDate, getTagAccentColor } from '@/lib/utils';

const TAG_LABELS: Record<Tag, string> = {
  pinned: 'Pinned',
  now: 'Now',
  work: 'Work',
  writing: 'Writing',
  principles: 'Principles',
  reading: 'Reading',
};

interface NoteItemProps {
  note: Note;
  isActive: boolean;
}

export function NoteItem({ note, isActive }: NoteItemProps) {
  const preview = generatePreview(note.content);
  const accentColor = getTagAccentColor(note.tag);

  return (
    <Link
      href={`/notes/${note.slug}`}
      aria-current={isActive ? 'page' : undefined}
      className={`block border-b border-stone-100 px-3.5 py-2.5 transition-colors ${
        isActive ? 'bg-white' : 'bg-transparent hover:bg-stone-100'
      } ${isActive ? 'border-l-2' : 'border-l-2 border-l-transparent'}`}
      style={isActive ? { borderLeftColor: accentColor } : undefined}
    >
      {/* Date */}
      <div className="text-xs text-stone-400 mb-1">{formatDate(note.updated_at)}</div>

      {/* Title */}
      <div className="text-xs font-medium text-stone-800 mb-1.5 truncate">
        {note.title}
      </div>

      {/* Preview */}
      <div className="text-xs text-stone-400 mb-2 line-clamp-1">{preview}</div>

      {/* Tag pill */}
      <div
        className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium text-white"
        style={{ backgroundColor: accentColor }}
      >
        {TAG_LABELS[note.tag]}
      </div>
    </Link>
  );
}
