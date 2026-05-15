'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WindowChrome } from './WindowChrome';

const TABS = [
  {
    emoji: '🙋‍♂️',
    label: 'about',
    slug: 'about',
    preview: 'Yash Vijaykar',
  },
  {
    emoji: '🚣',
    label: 'portfolio (work work work)',
    slug: 'work',
    preview: 'I show up before I\'m hired',
  },
  {
    emoji: '🏔️',
    label: 'principles',
    slug: 'principles',
    preview: 'Operating system',
  },
  {
    emoji: '📝',
    label: 'blog',
    slug: 'blog',
    preview: 'Writing & thinking',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full flex-col border-r border-stone-200 dark:border-stone-700/50 bg-stone-100 dark:bg-stone-800 md:w-64">
      <WindowChrome />

      {/* Header */}
      <div className="hidden md:block px-4 py-3 border-b border-stone-200 dark:border-stone-700/50">
        <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wide">
          Notes
        </p>
      </div>

      {/* Mobile header */}
      <div className="md:hidden flex items-center px-4 py-3 border-b border-stone-200 dark:border-stone-700/50">
        <h2 className="text-sm font-medium text-stone-900 dark:text-stone-100">Yash Vijaykar</h2>
      </div>

      {/* Tab list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2 py-2">
        {TABS.map((tab) => {
          const isActive =
            pathname === `/notes/${tab.slug}` ||
            (pathname === '/notes' && tab.slug === 'about');

          return (
            <Link
              key={tab.slug}
              href={`/notes/${tab.slug}`}
              className={`block rounded-lg px-3 py-2 mb-1 transition-colors ${
                isActive
                  ? ''
                  : 'hover:bg-stone-200/60 dark:hover:bg-stone-700/40'
              }`}
              style={isActive ? { backgroundColor: '#FAD647' } : undefined}
            >
              <div
                className={`text-sm font-medium truncate leading-snug ${
                  isActive
                    ? 'text-stone-900'
                    : 'text-stone-800 dark:text-stone-200'
                }`}
              >
                {tab.emoji} {tab.label}
              </div>
              <div
                className={`text-xs mt-0.5 ${
                  isActive ? 'text-stone-600' : 'text-stone-400 dark:text-stone-500'
                }`}
              >
                {tab.preview}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
