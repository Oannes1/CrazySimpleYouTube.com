'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function EmailCapture() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const formData = new FormData(form)
    const firstName = formData.get('firstName') as string
    const email = formData.get('email') as string

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      })

      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      form.reset()
      // Redirect to primary site after successful capture
      setTimeout(() => {
        window.location.href = 'https://aaroncuha.com/services/youtube-services'
      }, 2500)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Red gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red-dark via-brand-red to-brand-red-light" />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '256px',
        }}
      />

      {/* Diagonal pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-white/50 font-medium">
            Free Bonus
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white text-balance">
            Get the Chapter
            <br />
            Companion Kit
          </h2>
          <p className="mt-4 text-white/70 font-body text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Checklists, AI prompt libraries, and video tutorials for every
            chapter — delivered straight to your inbox.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-left">
            {[
              '24 chapter checklists',
              'AI prompt library',
              'Video tutorials',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <svg
                  className="w-5 h-5 text-white flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="font-body text-sm text-white/80 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {status === 'success' ? (
            <div className="mt-9 p-6 rounded-xl bg-white/10 backdrop-blur max-w-lg mx-auto">
              <p className="font-body font-bold text-white text-lg">You&apos;re in! 🎉</p>
              <p className="font-body text-white/70 text-sm mt-1">
                Check your inbox — the Chapter Companion Kit is on its way.
              </p>
              <p className="font-body text-white/40 text-xs mt-3">
                Redirecting you to explore coaching &amp; services...
              </p>
              <a
                href="https://aaroncuha.com/services/youtube-services"
                className="inline-block mt-3 px-6 py-2.5 bg-white text-brand-charcoal font-body font-bold text-sm rounded-lg hover:bg-white/90 transition-colors"
              >
                Go Now →
              </a>
            </div>
          ) : (
            <form
              className="mt-9 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="sm:w-36 px-5 py-4 rounded-xl bg-white/95 backdrop-blur border-0 font-body text-brand-charcoal placeholder:text-brand-charcoal/35 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg"
                required
                disabled={status === 'loading'}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="flex-1 px-5 py-4 rounded-xl bg-white/95 backdrop-blur border-0 font-body text-brand-charcoal placeholder:text-brand-charcoal/35 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-lg"
                required
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-brand-charcoal text-brand-cream font-body font-bold rounded-xl hover:bg-brand-charcoal/90 transition-colors whitespace-nowrap shadow-lg disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending...' : 'Get Free Access'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-white/70 font-body text-sm">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="mt-4 text-white/30 font-body text-xs">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
