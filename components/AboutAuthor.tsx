'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutAuthor() {
  return (
    <section
      id="author"
      className="relative bg-brand-charcoal py-24 lg:py-32 overflow-hidden noise-overlay"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 xl:gap-24 items-center">
          {/* Photo placeholder */}
          <motion.div
            className="relative max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-brand-charcoal-light border border-white/[0.04]">
              <Image
                src="/author.jpg"
                alt="Aaron Cuha — author of Crazy Simple YouTube"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 400px, 350px"
              />
              {/* Red accent corner */}
              <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-brand-red/[0.06] to-transparent" />
            </div>

            {/* Offset frame */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-brand-red/[0.08] -z-10" />
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              About the Author
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-brand-cream">
              Aaron Cuha
            </h2>

            <div className="mt-6 space-y-4 text-brand-cream/50 font-body leading-relaxed text-[0.95rem]">
              <p>
                Aaron Cuha has spent over 15,000 hours coaching business owners
                on how to build systems that scale — and YouTube is the engine
                that drives it all.
              </p>
              <p>
                With 200,000+ subscribers across his channels (@aaroncuha
                and @vanlife) and a track record of helping clients build
                channels with over 1 million subscribers, Aaron wrote{' '}
                <span className="text-brand-cream/70 font-medium">
                  Crazy Simple YouTube
                </span>{' '}
                to give every business owner the exact system that works —
                without the fluff, hype, or influencer tactics that don&apos;t
                apply to real businesses.
              </p>
              <p>
                He&apos;s a Tom Ferry Mastery Coach &amp; Speaker, ICF
                credentialed coach, NLP Master Practitioner, and licensed broker
                in 12 states. He founded DirectLender.com (280 offices, 3,000
                employees) and now leads Dominion Partners — helping business
                owners build authority through content and systems.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                'ICF Coach',
                'NLP Master Practitioner',
                'Tom Ferry Speaker',
                '12-State Broker',
                'DISC Certified',
              ].map((cred) => (
                <span
                  key={cred}
                  className="px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] font-body text-xs text-brand-cream/40"
                >
                  {cred}
                </span>
              ))}
            </div>

            <a
              href="https://aaroncuha.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 font-body font-semibold text-brand-red hover:text-brand-red-light transition-colors"
            >
              Learn more about Aaron
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
