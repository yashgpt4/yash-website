'use client';

import { useState } from 'react';

interface Company {
  num: string;
  name: string;
  tagLine1: string;
  tagLine2: string;
  meta: React.ReactNode;
  whatIDid: React.ReactNode;
  whatHappened: React.ReactNode;
  links: { label: string; href: string }[];
}

const COMPANIES: Company[] = [
  {
    num: '01',
    name: 'Kintsugi',
    tagLine1: 'AI mental health · SF',
    tagLine2: 'Offer declined',
    meta: (
      <>
        AI mental health screening ·{' '}
        <a href="https://www.linkedin.com/in/gracechang/" className="text-accent hover:underline">
          Grace Chang
        </a>{' '}
        · Series A, post-PMF · San Francisco
      </>
    ),
    whatIDid: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Cold emailed Grace twice — first email high signal, no reply. Followed up a week later with a better hook → got a reply and a meeting
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Built Kintsugi's business case from first principles before the call
          <ul className="list-[circle] pl-4 mt-1 space-y-1">
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">Mapped the core inefficiency: manual, human-dependent screening</li>
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">Quantified: insurers lose ~$1.26B/yr from missed depression in chronic-disease members</li>
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">Fermi estimate: flag 1% of calls + convert 20% to care → ~$240M saved → ROI of 120×</li>
          </ul>
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Mapped smart outreach, automated ops workflows (BD meeting summaries → Slack + HubSpot)
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Got an assignment from Albert (COO): build a CXO pitch deck — shipped with full autonomy, went beyond the brief
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Shipped a Loom walking through the work before the next call
        </li>
      </ul>
    ),
    whatHappened: (
      <>
        <blockquote className="border-l-[3px] border-accent pl-3 py-1 my-2 text-[12px] italic text-stone-500 dark:text-stone-400">
          "First time I've watched a video at 1x, Yash!" — Grace Chang
        </blockquote>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Got the offer (~$120k/yr) and declined</li>
          <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Wanted apprenticeship access to a founder I admire, not a contract. Long-term games with long-term people. Walked away respectfully.</li>
        </ul>
      </>
    ),
    links: [
      { label: 'Kintsugi →', href: 'https://www.kintsugihealth.com' },
      { label: 'See the work →', href: 'https://www.figma.com/board/ok5flRCSOLh4GjxVimn8rz/Portfolio-%7C-Yash-Vijaykar?node-id=335-247' },
      { label: 'Watch the Loom →', href: 'https://www.loom.com/share/36f0f3138e4d4beab9b69ba71ac29395' },
    ],
  },
  {
    num: '02',
    name: '78Health',
    tagLine1: 'Remote patient monitoring · CA + BLR',
    tagLine2: 'Offer discussion',
    meta: (
      <>
        Remote patient monitoring ·{' '}
        <a href="https://www.linkedin.com/in/naren-nachiappan-036387/" className="text-accent hover:underline">
          Naren Nachiappan
        </a>
        , 4× founder · Pre-PMF · California + Bengaluru
      </>
    ),
    whatIDid: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Identified the core constraint: clinician time
          <ul className="list-[circle] pl-4 mt-1 space-y-1">
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">One physician capped at ~20 patients/day</li>
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">78Health's model unlocks 1,500+ patients per physician</li>
          </ul>
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Built the revenue math: $6M run rate = 0.2 take rate × $250k/physician × 120 physicians
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Mapped the full funnel — physician signing to first live patient. Flagged missing denominators: active patients per physician, CAC, retention speed, activation rate
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Ran a pre-mortem on the fundraise and two-market risk (US + India bandwidth split)
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Asked the hard questions: EMR integration risk, platform risk from Epic/Cerner, why two markets simultaneously
        </li>
      </ul>
    ),
    whatHappened: (
      <>
        <blockquote className="border-l-[3px] border-accent pl-3 py-1 my-2 text-[12px] italic text-stone-500 dark:text-stone-400">
          "Apart from the product management basics, possess rare qualities — can navigate uncertainty. Possesses mental strength and resilience." — Naren Nachiappan
        </blockquote>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Got to offer discussion — equity, comp, onboarding — before fundraise timing created uncertainty</li>
        </ul>
      </>
    ),
    links: [
      { label: '78Health →', href: 'https://www.78health.com' },
      { label: 'See the work →', href: 'https://www.figma.com/board/ok5flRCSOLh4GjxVimn8rz/Portfolio-%7C-Yash-Vijaykar?node-id=410-1655' },
    ],
  },
  {
    num: '03',
    name: 'HealthyGamer GG',
    tagLine1: 'Mental health platform · TX',
    tagLine2: 'Rejected, flagged it',
    meta: <>Mental health platform · Dr. K · Texas</>,
    whatIDid: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Built two distinct ICPs with job-to-be-done mapping
          <ul className="list-[circle] pl-4 mt-1 space-y-1">
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">Guides ICP: 18–32, male-skewed, gamer identity, self-diagnosed ADHD/anxiety. Trigger: "I've watched 40 Dr. K videos, time to go deeper." Value prop: $120 vs $200/therapy session</li>
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">Membership ICP: 18–35, long-term Dr. K follower. Wants ongoing growth, not a one-off fix. $10–15/mo frictionless</li>
          </ul>
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Mapped both funnels end-to-end
          <ul className="list-[circle] pl-4 mt-1 space-y-1">
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">Guides CVR at 0.5–1% of 1.5M monthly site visitors</li>
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">Membership: 6–12K active subscribers, $72–144K MRR, 8–15% monthly churn</li>
          </ul>
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Identified revenue bottlenecks and built the 6-month path to 50% growth: $1M → $1.5M
        </li>
      </ul>
    ),
    whatHappened: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Asked hard questions in the interview because I genuinely cared what moves the needle — got a generic rejection with zero context</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Flagged it directly to Dr. K: "For a company whose mission is built on trust, care, and honest conversation — these small interactions carry disproportionate weight." Said my part. Moved on.</li>
      </ul>
    ),
    links: [
      { label: 'HealthyGamer GG →', href: 'https://www.youtube.com/c/HealthyGamerGG' },
      { label: 'See the work →', href: 'https://www.figma.com/board/ok5flRCSOLh4GjxVimn8rz/Portfolio-%7C-Yash-Vijaykar?node-id=335-508' },
      { label: 'Book thread (liked by Dr. K) →', href: 'https://x.com/yashgpt5/status/1950630867216605270' },
    ],
  },
  {
    num: '04',
    name: 'Nabeel Qureshi',
    tagLine1: 'Stealth healthcare · NYC',
    tagLine2: 'Stalled on visa',
    meta: (
      <>
        Stealth healthcare startup ·{' '}
        <a href="https://x.com/nabeelqu" className="text-accent hover:underline">
          Ex-Palantir
        </a>{' '}
        · NYC
      </>
    ),
    whatIDid: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Read his blogs. Watched his podcast. Played Factorio. Then cold emailed with a personalised video — mission-aligned, not credential-matching</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Deep research: his writing, podcast appearances, publicly shared frameworks</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Ask was deliberate: start with a tiny problem, earn the rest</li>
      </ul>
    ),
    whatHappened: (
      <>
        <blockquote className="border-l-[3px] border-accent pl-3 py-1 my-2 text-[12px] italic text-stone-500 dark:text-stone-400">
          "I thought you did a good job." — Nabeel Qureshi
        </blockquote>
        <ul className="list-disc pl-5 space-y-1.5 mt-2">
          <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Nabeel replied, watched the video, engaged genuinely</li>
          <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Stalled on visa. Not merit.</li>
        </ul>
      </>
    ),
    links: [
      { label: 'Nabeel Qureshi →', href: 'https://x.com/nabeelqu' },
      { label: 'Watch the video →', href: 'https://youtu.be/2D92ys4X8aQ' },
    ],
  },
  {
    num: '05',
    name: 'Nikhil Kamath',
    tagLine1: 'WTFund / Zerodha · BLR',
    tagLine2: 'Did the work, didn\'t send',
    meta: (
      <>
        <a href="https://x.com/nikhilkamathcio" className="text-accent hover:underline">
          WTFund
        </a>{' '}
        / Zerodha · Bengaluru
      </>
    ),
    whatIDid: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Went deep into NK's world — podcasts, investment thesis, WTFund cohort — before building anything</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">
          Mapped why energy transition is his highest-conviction bet, bottom-up:
          <ul className="list-[circle] pl-4 mt-1 space-y-1">
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">GHGs → renewable shift → CO2 halved</li>
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">UEI as the energy trading layer</li>
            <li className="text-[12px] text-stone-500 dark:text-stone-400 leading-relaxed">CPO incentive alignment as the real unlock</li>
          </ul>
        </li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Built a Figma mindmap validating the whole thesis. Researched his portfolio: Ossus, SolarSquare, Matel. Ranked 10 key insights. Did the full work.</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Then didn't send it.</li>
      </ul>
    ),
    whatHappened: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Caught myself mid-way: the drive was "get a 10x career jump" — ego, not mission. Chose not to reach out from that place.</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">The self-awareness that stopped me is the thing he'd respect most.</li>
      </ul>
    ),
    links: [
      { label: 'See the mindmap →', href: 'https://www.figma.com/board/ok5flRCSOLh4GjxVimn8rz/Portfolio-%7C-Yash-Vijaykar?node-id=409-343' },
    ],
  },
  {
    num: '06',
    name: 'Sahil Lavingia',
    tagLine1: 'Gumroad / Antiwork · NYC',
    tagLine2: 'Moved on clean',
    meta: (
      <>
        <a href="https://x.com/shl" className="text-accent hover:underline">
          Gumroad
        </a>{' '}
        / Antiwork · NYC
      </>
    ),
    whatIDid: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Studied the business cold: balance sheet, Antiwork's north star ($10M EBITDA), product philosophy, open-source strategy, PM stance</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Sahil posted a $1K story bounty — wrote the sci-fi story with AI, then declined the money. Cold email: "I don't want the $1,000. I want to work with you."</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Built a personalised video: why his "Reflecting" post was the moment I knew I had to reach out, how I could create leverage starting tomorrow</li>
      </ul>
    ),
    whatHappened: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Got ghosted — then noticed he'd blocked me on X and deleted my comment on his thread</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Reached back out: "Felt weird and unlike you — curious if something went wrong on my end." No reply.</li>
        <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Chose not to force it. Moved on clean.</li>
      </ul>
    ),
    links: [
      { label: 'See the work →', href: 'https://www.figma.com/board/ok5flRCSOLh4GjxVimn8rz/Portfolio-%7C-Yash-Vijaykar?node-id=409-1491' },
      { label: 'Stories →', href: 'https://docs.google.com/document/d/1--xQf2BOUDsTFCQAajb0KMUEagWqOPHFRa2qD8BUWKQ/edit' },
    ],
  },
];

export function PortfolioContent() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-stone-900">
        <div className="w-full px-9 py-8">

          {/* Hero */}
          <p className="text-[22px] font-medium text-stone-900 dark:text-stone-100 leading-snug mb-2">
            I show up before I'm hired
          </p>
          <p className="text-[13px] text-stone-500 dark:text-stone-400 mb-1">
            I think like a founder. I build the case before anyone asks.
          </p>
          <p className="text-[13px] text-stone-500 dark:text-stone-400 mb-4">
            Not chasing a job. Betting on the right thing.
          </p>

          {/* Divider */}
          <hr className="border-stone-200 dark:border-stone-700 mb-5" />

          {/* Section label */}
          <p className="text-[10px] uppercase tracking-[0.1em] font-medium text-stone-400 dark:text-stone-500 mb-3.5">
            Unsolicited work
          </p>

          {/* Approach blurb */}
          <p className="text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed mb-3.5">
            No brief. No job post. I did the work because the problem was interesting and the founder seemed worth betting on.
            <br />
            The thesis: understand their north star, map the top bottlenecks, present options.
          </p>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              '3 offers / advanced discussions',
              '1 offer declined (~$120k)',
              '50+ founders evaluated globally',
            ].map((chip) => (
              <span
                key={chip}
                className="text-[12px] text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md px-2.5 py-1"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Toggle rows */}
          {COMPANIES.map((co, i) => {
            const isOpen = open.has(i);
            return (
              <div key={co.num}>
                {/* Header row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-2.5 py-[11px] border-b border-stone-200 dark:border-stone-700 cursor-pointer text-left"
                >
                  <span className="text-[11px] text-stone-400 dark:text-stone-500 w-3.5 flex-shrink-0 transition-transform duration-150"
                    style={{ display: 'inline-block', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  >
                    ▶
                  </span>
                  <span className="text-[11px] font-medium text-accent w-[22px] flex-shrink-0">
                    {co.num}
                  </span>
                  <span className="text-[16px] font-medium text-stone-900 dark:text-stone-100 flex-1 text-left">
                    {co.name}
                  </span>
                  <span className="text-[11px] text-stone-400 dark:text-stone-500 text-right leading-snug flex-shrink-0">
                    {co.tagLine1}
                    <br />
                    {co.tagLine2}
                  </span>
                </button>

                {/* Expandable body */}
                {isOpen && (
                  <div className="pl-9 pt-3.5 pb-1">
                    {/* Meta */}
                    <p className="text-[12px] text-stone-400 dark:text-stone-500 mb-3 leading-relaxed">
                      {co.meta}
                    </p>

                    {/* What I did */}
                    <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-400 dark:text-stone-500 mb-1.5 mt-3">
                      What I did
                    </p>
                    {co.whatIDid}

                    {/* What happened */}
                    <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-stone-400 dark:text-stone-500 mb-1.5 mt-3">
                      What happened
                    </p>
                    {co.whatHappened}

                    {/* Links */}
                    {co.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-2.5 pt-2 border-t border-stone-200 dark:border-stone-700">
                        {co.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] text-accent hover:underline"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Past work divider */}
          <hr className="border-stone-200 dark:border-stone-700 my-5" />
          <p className="text-[10px] uppercase tracking-[0.1em] font-medium text-stone-400 dark:text-stone-500 mb-3.5">
            Past work
          </p>

          {/* Nintee */}
          <p className="text-[16px] font-medium text-stone-900 dark:text-stone-100 mt-2 mb-0.5">Nintee</p>
          <p className="text-[12px] text-stone-400 dark:text-stone-500 mb-2">
            Product ·{' '}
            <a href="https://x.com/paraschopra" className="text-accent hover:underline">Paras Chopra</a>
            {' '}· Sequoia-backed · Bengaluru · Jun 2022 – Apr 2024
          </p>
          <p className="text-[13px] text-stone-500 dark:text-stone-400 mb-2 leading-relaxed">
            1st hire and founding PM. Worked directly with Paras Chopra ($200M SaaS exit). Shipped 12+ products 0→1 in two years — across healthcare, GenAI, and mobile gaming. No playbook, no senior PM, full ownership every sprint.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-2.5">
            {[
              'WordRally (mobile word game) — 3 MVPs + 25 alpha builds in one month; D1 retention 25%; avg session 1.5 min → 8 min',
              'Nintee Habit Coach (LLM, React Native) — conversational AI from design to prod; FTUE, image captioning, chat memory, intent classification',
              'Weight loss coaching app — $800 MRR, 90+ active users globally; Sanjeev Bikhchandani and Vijay Shekhar Sharma were users',
              'Calorie tracking + NLP chatbot — D7 retention 20% → 40%; Tanmay Bhat (6M followers) was an active user',
              'Community — Discord + Telegram from 0 → 2,500 members; solved cold-start from scratch',
            ].map((item) => (
              <li key={item} className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">{item}</li>
            ))}
          </ul>
          <p className="text-[12px] text-stone-400 dark:text-stone-500 mb-2">
            Backers: Sequoia ·{' '}
            <a href="https://x.com/kunalb11" className="text-accent hover:underline">Kunal Shah</a>
            {' '}·{' '}
            <a href="https://x.com/balajis" className="text-accent hover:underline">Balaji Srinivasan</a>
          </p>
          <div className="flex flex-wrap gap-3 mb-4">
            <a href="https://www.figma.com/board/ok5flRCSOLh4GjxVimn8rz/Portfolio-%7C-Yash-Vijaykar?node-id=302-176" target="_blank" rel="noopener noreferrer" className="text-[12px] text-accent hover:underline">See the work →</a>
            <a href="https://nintee.com/" target="_blank" rel="noopener noreferrer" className="text-[12px] text-accent hover:underline">Why Nintee wrapped →</a>
          </div>

          <hr className="border-stone-200 dark:border-stone-700 my-4" />

          {/* Level Supermind */}
          <p className="text-[16px] font-medium text-stone-900 dark:text-stone-100 mt-2 mb-0.5">Level Supermind</p>
          <p className="text-[12px] text-stone-400 dark:text-stone-500 mb-2">
            Project Manager · 7th employee ·{' '}
            <a href="https://x.com/BeerBicepsGuy" className="text-accent hover:underline">BeerBiceps / Ranveer Allahbadia</a>
            {' '}· Mumbai · May 2021 – Feb 2022
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-4">
            <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Led trainer onboarding — closed target by 157%, managed 7 global trainers across 5+ countries</li>
            <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Delivered 60+ audio experiences</li>
            <li className="text-[13px] text-stone-800 dark:text-stone-200 leading-relaxed">Owned video production: team of 21, budget INR 20L (~$27k)</li>
          </ul>

          <hr className="border-stone-200 dark:border-stone-700 my-4" />

          {/* PijonCo */}
          <p className="text-[16px] font-medium text-stone-900 dark:text-stone-100 mt-2 mb-0.5">PijonCo</p>
          <p className="text-[12px] text-stone-400 dark:text-stone-500 mb-2">
            Co-Founder · Mumbai · Sep 2020 – Sep 2021
          </p>
          <p className="text-[13px] text-stone-500 dark:text-stone-400 mb-4 leading-relaxed">
            D2C merch brand built from zero — design, ops, meme marketing. 100+ orders PAN India. Shut down at breakeven when the learning curve flattened. Intentional.
          </p>

          {/* Education footer */}
          <div className="border-t border-stone-200 dark:border-stone-700 pt-3.5 mt-5">
            <p className="text-[11px] text-stone-400 dark:text-stone-500 leading-7">
              B.Tech, Food Engineering & Technology · Institute of Chemical Technology, Mumbai · 2017–2021
              <br />
              Chose not to sit for campus placements — joined BeerBiceps' startup instead.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
