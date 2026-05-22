'use client';

import { useRouter } from 'next/navigation';
import { Note, Tag } from '@/lib/types';
import { formatDate, getTagAccentColor } from '@/lib/utils';

const TAG_LABELS: Record<Tag, string> = {
  pinned: 'Pinned',
  now: 'Now',
  work: 'Work',
  writing: 'Writing',
  principles: 'Principles',
  reading: 'Reading',
};

// TODO: Replace with your Supabase storage URL once you upload your photo
const PHOTO_URL = '';

interface AboutContentProps {
  note: Note;
}

export function AboutContent({ note }: AboutContentProps) {
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

          <hr className="border-stone-200 dark:border-stone-700 mb-6" />

          {/* Body — image floats right, text flows alongside it */}
          <div className="text-[13px] text-stone-800 dark:text-stone-300 leading-7">

            {/* Float image right */}
            <div className="float-right ml-6 mb-4 text-center" style={{ maxWidth: '148px' }}>
              {PHOTO_URL ? (
                <img
                  src={PHOTO_URL}
                  alt="Yash at Kamo River, Kyoto"
                  className="w-36 rounded-lg"
                  loading="lazy"
                />
              ) : (
                <div className="w-36 h-40 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <span className="text-stone-300 dark:text-stone-600 text-xs">your photo</span>
                </div>
              )}
              <p className="text-xs italic text-stone-400 dark:text-stone-500 mt-2 leading-[1.4]">
                📍 kamo river, kyoto,<br />a real hooman - smiling
              </p>
            </div>

            {/* Text flows alongside the float */}
            <p className="mb-3">
              Hola I am yash (rhymes with brush 🪥/ 🖌️)<br />
              I&apos;m a builder at the intersection of AI, healthcare, and early-stage startups.
            </p>

            <p className="mb-3">
              i was part of the founding team of an AI healthcare consumer startup - it shut down, since then i have been just experimenting with life (cause why not 🤷) taking bets on myself (its daunting and you&apos;d never regret betting on yourself)
            </p>

            <ul className="pl-4 mb-3 list-disc space-y-1">
              <li>ended up learning a lot about myself</li>
              <li>
                was diagnosed with clinical depression,{' '}
                <a
                  href="https://x.com/yashgpt4/status/1932112899708952873"
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  solved for it
                </a>
              </li>
              <li>
                started living inside out (driving things from within (antifragile), than listening to external forces, people around me telling what i &quot;should&quot; / &quot;shouldn&apos;t&quot; do (fragile))
              </li>
              <li>rewarded myself a trip to Japan last dec - it was AWESOME!</li>
            </ul>

            <p className="mb-5 text-stone-500 dark:text-stone-400 italic text-xs">
              (I can say with certain confidence now, I&apos;ve gotten pretty good with navigating uncertainty)
            </p>

            <p className="mb-5">
              on the work side, been doing something unusual: identifying founders worth betting on (scouting like a vc), building unsolicited cases for how I&apos;d create leverage for them, and reaching out cold, before anyone asks.{' '}
              <a href="/notes/work" className="text-accent hover:underline">
                check out the portfolio.
              </a>
            </p>

            {/* Clear float before the next section */}
            <div className="clear-both" />

            <hr className="border-stone-200 dark:border-stone-700 my-5" />

            <p className="text-[10px] uppercase tracking-[0.1em] font-medium text-stone-400 dark:text-stone-500 mb-3">
              what now
            </p>

            <ol className="pl-4 mb-6 list-decimal space-y-2">
              <li>
                changing current environment (moving from Bengaluru -&gt; North America) - realised current environment is suboptimal (zero sum games, low trust, low opportunity), want to be surrounded with positive sum players and play the long term games with long term people
              </li>
              <li>
                i am excited to join a startup as soon as possible (small team energy is what I&apos;m craving)
              </li>
            </ol>

            <hr className="border-stone-200 dark:border-stone-700 my-5" />

            <p className="mb-1">
              if you find a vibe fit, email me with{' '}
              <strong className="font-medium text-stone-900 dark:text-stone-100">[subject]:</strong>{' '}
              to love icecream 🍦, is to be hooman
            </p>
            <p className="mb-4 text-stone-500 dark:text-stone-400">i read everything.</p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href="mailto:yashvijaykar98@gmail.com"
                className="text-[12px] text-accent hover:underline"
              >
                yashvijaykar98@gmail.com →
              </a>
              <span className="text-stone-300 dark:text-stone-600 text-xs">·</span>
              <a
                href="https://x.com/yashgpt5"
                className="text-[12px] text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @yashgpt5 on X →
              </a>
              <span className="text-stone-300 dark:text-stone-600 text-xs">·</span>
              <a
                href="https://open.substack.com/pub/yashyijaykar"
                className="text-[12px] text-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Substack →
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
