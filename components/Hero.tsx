'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-charcoal noise-overlay">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,transparent_0%,#0a0a0a_75%)]" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/[0.07] rounded-full blur-[160px]" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-28 lg:pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 xl:gap-24 items-center w-full">
        {/* Left — Copy */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-red/20 bg-brand-red/[0.06] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="font-body text-xs sm:text-sm tracking-wide text-brand-red font-medium">
              The 2026 YouTube Playbook
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-[2.5rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-normal uppercase text-brand-cream leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            The 47-Minute Video That{' '}
            <span className="text-brand-red">Replaced My Entire Marketing Funnel</span>
          </motion.h1>

          {/* Handwritten annotation */}
          <motion.p
            className="mt-3 font-accent text-xl sm:text-2xl text-brand-cream/50 italic"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
            ...and how 200,000+ business owners are copying the system
          </motion.p>

          {/* Subhead — NLP presupposition */}
          <motion.p
            className="mt-7 sm:mt-8 text-base sm:text-lg lg:text-xl text-brand-cream/70 font-body max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            When you install this system, every video becomes a{' '}
            <strong className="text-brand-cream font-semibold">lead magnet that compounds for years</strong>{' '}
            — whether you&apos;re a coach, consultant, agent, or attorney.
          </motion.p>

          {/* Yes-set — 3 identification questions */}
          <motion.div
            className="mt-7 flex flex-col gap-2.5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            {[
              'Already creating content but getting no leads?',
              'Already have expertise people would pay for?',
              'Already tired of algorithms that reset every 48 hours?',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-brand-red flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-body text-sm sm:text-base text-brand-cream/60">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs — Yes/Yes frame */}
          <motion.div
            className="mt-9 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 bg-brand-red text-white font-body font-bold text-base sm:text-lg rounded-xl overflow-hidden transition-all hover:shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Get The Book — $19.99</span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-brand-red-light scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a
              href="/bonus"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-4 border border-brand-cream/15 text-brand-cream/80 font-body font-medium text-base sm:text-lg rounded-xl transition-all hover:border-brand-red/40 hover:text-brand-red hover:bg-brand-red/[0.04]"
            >
              I Want the Free Stuff First
            </a>
          </motion.div>
        </div>

        {/* Right — Book Display */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-brand-red/[0.06] rounded-full blur-[120px]" />

          <div className="relative">
            <Image
              src="/book-display.jpg"
              alt="Crazy Simple YouTube — A Success Guide by Aaron Cuha. Turn Views Into Clients. Vol. 01."
              width={600}
              height={450}
              priority
              className="w-[320px] sm:w-[380px] lg:w-[420px] xl:w-[460px] h-auto rounded-xl drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-[1.03] transition-transform duration-500"
            />
            {/* Handwritten annotation */}
            <div className="absolute -bottom-8 -left-4 sm:-left-8 font-accent text-lg sm:text-xl text-brand-cream/40 rotate-[-3deg] whitespace-nowrap">
              ← 24 chapters. Zero fluff.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/50 to-transparent" />
    </section>
  )
}
