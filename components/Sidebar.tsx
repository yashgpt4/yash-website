'use client';

import { useState, useMemo } from 'react';
import { WindowChrome } from './WindowChrome';
import { SearchBar } from './SearchBar';
import { TagFilter } from './TagFilter';
import { NoteItem } from './NoteItem';
import { Note, Tag } from '@/lib/types';

const TAG_LABELS: Record<Tag, string> = {
  pinned: 'PINNED',
  now: 'NOW',
  work: 'WORK',
  writing: 'WRITING',
  principles: 'PRINCIPLES',
  reading: 'READING',
};

interface SidebarProps {
  notes: Note[];
  currentSlug?: string;
}

export function Sidebar({ notes, currentSlug }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<Tag | null>(null);

  const availableTags = useMemo(() => {
    const tags = new Set<Tag>();
    notes.forEach((note) => {
      if (note.published) tags.add(note.tag);
    });
    return Array.from(tags).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch = note.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesTag = activeTag ? note.tag === activeTag : true;
      return matchesSearch && matchesTag;
    });
  }, [notes, searchQuery, activeTag]);

  const pinnedNotes = filteredNotes.filter((n) => n.pinned);
  const otherNotes = filteredNotes.filter((n) => !n.pinned);

  const sortedOtherNotes = otherNotes.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return (
    <div className="flex h-screen w-full flex-col border-r border-stone-200 dark:border-stone-700/50 bg-stone-100 dark:bg-stone-800 md:w-64">
      <WindowChrome />

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-stone-200 dark:border-stone-700/50">
        <h2 className="text-sm font-medium text-stone-900 dark:text-stone-100">Yash Vijaykar</h2>
        <svg
          className="h-4 w-4 text-stone-500 dark:text-stone-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>

      {/* Desktop sidebar header */}
      <div className="hidden md:block px-4 py-3 border-b border-stone-200 dark:border-stone-700/50">
        <h2 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
          Notes <span className="text-stone-400 dark:text-stone-500">({filteredNotes.length})</span>
        </h2>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <TagFilter
        activeTags={activeTag ? [activeTag] : []}
        availableTags={availableTags}
        onTagToggle={setActiveTag}
      />

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {pinnedNotes.length > 0 && (
          <div>
            <div className="px-4 pt-4 pb-2 text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wide">
              PINNED
            </div>
            <div className="border-b border-stone-200 dark:border-stone-700/50">
              {pinnedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isActive={note.slug === currentSlug}
                />
              ))}
            </div>
          </div>
        )}

        {sortedOtherNotes.length > 0 && (
          <div>
            <div className="px-4 pt-4 pb-2 text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wide">
              {activeTag ? TAG_LABELS[activeTag] : 'RECENT'}
            </div>
            {sortedOtherNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                isActive={note.slug === currentSlug}
              />
            ))}
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="flex items-center justify-center h-32">
            <p className="text-xs text-stone-400 dark:text-stone-500">No notes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
