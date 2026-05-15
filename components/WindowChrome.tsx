'use client';

import { useEffect, useState } from 'react';

export function WindowChrome() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    if (dark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  };

  return (
    <div className="hidden md:flex h-10 items-center justify-between border-b border-stone-200 dark:border-stone-700/50 bg-stone-50 dark:bg-stone-900 px-4">
      {/* Traffic light dots */}
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: '#28C840' }} />
      </div>

      {/* Site name */}
      <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">yashvijaykar.com</div>

      {/* Theme toggle */}
      <button
        onClick={toggle}
        aria-label="Toggle dark mode"
        className="w-12 text-right text-xs text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
      >
        {dark ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline' }}>
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline' }}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
