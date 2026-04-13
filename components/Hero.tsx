'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-charcoal noise-overlay">
      {/* ── Background layers ── */}
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,transparent_0%,#0a0a0a_75%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Red glow orb behind book area */}
      <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/[0.07] rounded-full blur-[160px] animate-glow-pulse" />

      {/* Secondary warm glow */}
      <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] bg-brand-red/[0.03] rounded-full blur-[120px]" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-0 lg:pb-0 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 xl:gap-24 items-center w-full">
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
              Vol. 01 — Now Available
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-[2.75rem] sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-black text-brand-cream leading-[0.92] tracking-tight text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            The YouTube Growth System Built for{' '}
            <span className="text-brand-red">Business Owners.</span>
            <br />
            <span className="text-brand-cream/30 italic font-light">
              Not Influencers.
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            className="mt-7 sm:mt-8 text-base sm:text-lg lg:text-xl text-brand-cream/55 font-body max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            24 chapters. Zero fluff. The exact system behind{' '}
            <span className="text-brand-cream/80 font-medium">200,000+ subscribers</span>{' '}
            and hundreds of real estate leads.
          </motion.p>

          {/* CTAs */}
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
              <span className="relative z-10">Get Your Copy on Amazon</span>
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
              Join the Free Community
            </a>
          </motion.div>

          {/* Micro proof */}
          <motion.p
            className="mt-6 text-brand-cream/25 font-body text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A Success Guide by Aaron Cuha &middot; $19.99
          </motion.p>
        </div>

        {/* Right — Book Display */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
        >
          {/* Glow behind book */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-brand-red/[0.06] rounded-full blur-[120px] animate-glow-pulse" />

          {/* 3D Book mockup render */}
          <div className="animate-float relative">
            <Image
              src="/book-display.jpg"
              alt="Crazy Simple YouTube — A Success Guide by Aaron Cuha. Turn Views Into Clients. Vol. 01."
              width={600}
              height={450}
              priority
              className="w-[320px] sm:w-[380px] lg:w-[420px] xl:w-[460px] h-auto rounded-xl drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/50 to-transparent" />
    </section>
  )
}
