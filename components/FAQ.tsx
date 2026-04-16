'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: "I'm not in real estate — will this work for my industry?",
    a: "The system has been proven across real estate, coaching, consulting, financial planning, law, home services, and more. The strategies are built around attracting clients through expertise — not around any single industry. If you sell knowledge or services, this is your playbook.",
  },
  {
    q: "I hate being on camera. Can I still make this work?",
    a: "Chapter 11 covers exactly this — finding your on-camera voice without becoming a performer. Many of the most successful channels in the book were built by people who were terrified of filming. The batch production system means less time on camera, not more.",
  },
  {
    q: "I already have a YouTube channel but it's not generating leads.",
    a: "That's actually the most common starting point. Scott had 200 subscribers after 12 years on YouTube. After applying the system, he generated $87K in commissions in his first 90 days. The lead generation chapters (17 & 18) are specifically designed for channels that have content but no conversion system.",
  },
  {
    q: "How long until I see results?",
    a: "Chapter 24 includes a complete 90-day launch roadmap. Most business owners see their first YouTube-generated leads between month 3 and month 6. The compound effect means results accelerate — your 30th video generates dramatically more leads than your 10th.",
  },
  {
    q: "Do I need expensive equipment to start?",
    a: "No. One creator in the book built 200,000+ subscribers and seven figures using an iPhone 8 and free earbuds. Chapter 5 covers the minimum viable setup: your phone plus a window with natural light. Upgrade when the channel demands it — not before.",
  },
  {
    q: "I don't have time to create content every day.",
    a: "You don't have to. The batch filming system (Chapter 14) lets you film 4-8 videos in a single session. Tools like OpusClip turn each long-form video into 10-15 Shorts automatically. You publish daily across platforms without touching a camera more than once or twice a month.",
  },
  {
    q: "What makes this different from YouTube courses and gurus?",
    a: "Most YouTube educators teach you how to grow a YouTube channel. This book teaches you how to use YouTube to grow a business. Aaron runs two channels (170,000+ combined subscribers) and uses them to generate real client revenue — not to sell courses about YouTube.",
  },
  {
    q: "What's in the free Chapter Companion Kit?",
    a: "24 chapter-by-chapter checklists, an AI prompt library you can paste directly into ChatGPT, video tutorials, thumbnail templates, a 90-day launch calendar, and a keyword research starter pack. It's designed to go alongside the book so you can take action as you read.",
  },
  {
    q: "Is this only for beginners?",
    a: "No. Kevin already had a channel with 500 views per video. After applying the system, his views jumped to 2,100 and client inquiries went from 1-2 per month to 8-10. The analytics and optimization chapters (Part 4) are specifically built for people who already have content and want to convert it into leads.",
  },
  {
    q: "Can I just hire someone to do this for me?",
    a: "Yes — Aaron also runs a YouTube management company for business owners who want it done for them. But the book gives you the system first, so you understand what good looks like before you hire anyone. Most readers start with the book and decide their next step from there.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section className="relative bg-brand-charcoal py-24 lg:py-32 overflow-hidden noise-overlay">
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
            Common Questions
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-cream">
            Still On the Fence?
          </h2>
          <p className="mt-4 text-brand-cream/50 font-body text-base sm:text-lg max-w-xl leading-relaxed">
            Here are the questions we hear most — and the honest answers.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="border border-white/[0.05] rounded-xl overflow-hidden bg-white/[0.01]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-5 sm:px-7 py-5 flex items-start justify-between gap-4 hover:bg-white/[0.015] transition-colors text-left group"
              >
                <span className="font-body text-base sm:text-lg font-semibold text-brand-cream/80 group-hover:text-brand-cream transition-colors">
                  {faq.q}
                </span>
                <svg
                  className={`w-5 h-5 text-brand-cream/25 transition-transform duration-300 flex-shrink-0 mt-1 ${
                    openIndex === i ? 'rotate-180 text-brand-red/50' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-7 pb-6">
                      <p className="text-brand-cream/50 font-body text-sm sm:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
