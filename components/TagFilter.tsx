'use client';

import { Tag } from '@/lib/types';

const TAG_LABELS: Record<Tag, string> = {
  pinned: 'Pinned',
  now: 'Now',
  work: 'Work',
  writing: 'Writing',
  principles: 'Principles',
  reading: 'Reading',
};

const TAG_COLORS: Record<Tag, { bg: string; text: string }> = {
  pinned: { bg: 'bg-red-600', text: 'text-white' },
  now: { bg: 'bg-blue-600', text: 'text-white' },
  work: { bg: 'bg-green-600', text: 'text-white' },
  writing: { bg: 'bg-amber-600', text: 'text-white' },
  principles: { bg: 'bg-purple-600', text: 'text-white' },
  reading: { bg: 'bg-teal-600', text: 'text-white' },
};

interface TagFilterProps {
  activeTags: Tag[];
  availableTags: Tag[];
  onTagToggle: (tag: Tag | null) => void;
}

export function TagFilter({ activeTags, availableTags, onTagToggle }: TagFilterProps) {
  const isActive = activeTags.length > 0;
  const activeTag = activeTags[0];

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      <button
        onClick={() => onTagToggle(null)}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          !isActive
            ? 'bg-stone-300 dark:bg-stone-600 text-stone-700 dark:text-stone-200'
            : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 hover:bg-stone-300 dark:hover:bg-stone-600'
        }`}
      >
        All
      </button>

      {availableTags.map((tag) => {
        const isActiveTag = activeTag === tag;
        const colors = TAG_COLORS[tag];

        return (
          <button
            key={tag}
            onClick={() => onTagToggle(isActiveTag ? null : tag)}
            className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
              isActiveTag
                ? `${colors.bg} ${colors.text}`
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 hover:bg-stone-300 dark:hover:bg-stone-600'
            }`}
          >
            {TAG_LABELS[tag]}
          </button>
        );
      })}
    </div>
  );
}
