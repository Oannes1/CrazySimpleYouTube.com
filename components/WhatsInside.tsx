'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

const parts = [
  {
    number: '01',
    title: 'Foundation',
    chapters: 'Chapters 1–5',
    description:
      'Your channel identity, equipment setup, branding, and the mindset shift from consumer to creator.',
    highlights: [
      'Why business owners have an unfair advantage on YouTube',
      'The minimum viable setup — you already own everything you need',
      'Channel branding that attracts clients, not just viewers',
    ],
  },
  {
    number: '02',
    title: 'Content Strategy',
    chapters: 'Chapters 6–10',
    description:
      'Keyword research, content planning, and the SEO system that gets your videos found by buyers.',
    highlights: [
      'The 3-bucket content system for consistent publishing',
      'How to never run out of video ideas again',
    ],
    spotlight: {
      chapter: 'Chapter 8: Keyword Research & SEO',
      desc: 'The exact research system that surfaces high-intent keywords your competitors ignore. Stop guessing — start ranking.',
    },
  },
  {
    number: '03',
    title: 'Production',
    chapters: 'Chapters 11–14',
    description:
      'Filming, editing, thumbnails, and titles — the production system that makes quality repeatable.',
    highlights: [
      'The 80/20 editing framework — done is better than perfect',
      'Thumbnail formulas that drive clicks without clickbait',
      'Batch production: how to film a month of content in one day',
    ],
  },
  {
    number: '04',
    title: 'Growth & Leads',
    chapters: 'Chapters 15–19',
    description:
      'The lead generation and conversion system that turns viewers into paying clients.',
    highlights: [
      'YouTube ads for business owners — not what you think',
    ],
    spotlight: {
      chapter: 'Chapters 17 & 18: Lead Gen + Conversion',
      desc: 'The complete system for turning YouTube viewers into booked appointments and closed deals. This is where the ROI lives.',
    },
  },
  {
    number: '05',
    title: 'Scale & Systems',
    chapters: 'Chapters 20–24',
    description:
      'Automation, team building, and the long-term strategy that turns your channel into a business asset.',
    highlights: [
      'Building a content team — even on a small budget',
      'Repurposing: one video becomes 12 pieces of content',
      'The compounding effect — why YouTube is a 10-year asset',
    ],
  },
]

export default function WhatsInside() {
  const [openPart, setOpenPart] = useState<number>(1)

  return (
    <section
      id="inside"
      className="relative bg-brand-charcoal py-24 lg:py-32 overflow-hidden noise-overlay"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        <motion.div
          className="text-center mb-14 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
            24 Chapters &middot; 5 Parts
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-cream text-balance">
            What&apos;s Inside the Book
          </h2>
          <p className="mt-4 text-brand-cream/40 font-body max-w-2xl mx-auto text-base sm:text-lg">
            A complete system — not random tactics. Each part builds on the
            last, taking you from zero to a lead-generating YouTube machine.
          </p>
        </motion.div>

        <div className="space-y-2.5">
          {parts.map((part, i) => (
            <motion.div
              key={part.number}
              className="border border-white/[0.05] rounded-xl overflow-hidden bg-white/[0.01]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <button
                onClick={() => setOpenPart(openPart === i ? -1 : i)}
                className="w-full px-5 sm:px-7 py-5 flex items-center justify-between hover:bg-white/[0.015] transition-colors group"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-display text-xl sm:text-2xl font-black text-brand-red/30 group-hover:text-brand-red/50 transition-colors">
                    {part.number}
                  </span>
                  <div className="text-left">
                    <div className="font-display text-lg sm:text-xl font-bold text-brand-cream">
                      {part.title}
                    </div>
                    <div className="font-body text-xs sm:text-sm text-brand-cream/30 mt-0.5">
                      {part.chapters}
                    </div>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-brand-cream/25 transition-transform duration-300 ${
                    openPart === i ? 'rotate-180 text-brand-red/50' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {openPart === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-7 pb-6 sm:pb-7 sm:pl-[4.5rem]">
                      <p className="text-brand-cream/50 font-body text-sm sm:text-base leading-relaxed mb-4">
                        {part.description}
                      </p>
                      <ul className="space-y-2.5">
                        {part.highlights.map((h, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-brand-cream/65 font-body text-sm"
                          >
                            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-red/60 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {part.spotlight && (
                        <div className="mt-5 p-5 rounded-lg bg-brand-red/[0.05] border border-brand-red/15">
                          <div className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-brand-red mb-2 font-semibold">
                            Highest-Value Chapter
                          </div>
                          <div className="font-display text-base sm:text-lg font-bold text-brand-cream">
                            {part.spotlight.chapter}
                          </div>
                          <p className="mt-1.5 text-brand-cream/50 font-body text-sm leading-relaxed">
                            {part.spotlight.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]"
          >
            Get Your Copy on Amazon
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
