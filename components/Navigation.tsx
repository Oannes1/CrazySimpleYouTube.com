'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AMAZON_LINK = process.env.NEXT_PUBLIC_AMAZON_LINK || 'https://www.amazon.com/dp/B0GWYK8TX6'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brand-charcoal/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a
            href="/"
            className="font-display text-lg sm:text-xl font-normal uppercase text-brand-cream tracking-wide"
          >
            Crazy Simple{' '}
            <span className="text-brand-red">YouTube</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#inside"
              className="text-brand-cream/50 hover:text-brand-cream transition-colors font-body text-[0.85rem]"
            >
              What&apos;s Inside
            </a>
            <a
              href="#testimonials"
              className="text-brand-cream/50 hover:text-brand-cream transition-colors font-body text-[0.85rem]"
            >
              Testimonials
            </a>
            <a
              href="/work-with-me"
              className="text-brand-cream/50 hover:text-brand-cream transition-colors font-body text-[0.85rem]"
            >
              Work With Aaron
            </a>
            <a
              href="#author"
              className="text-brand-cream/50 hover:text-brand-cream transition-colors font-body text-[0.85rem]"
            >
              About
            </a>
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-brand-red text-white font-body font-semibold text-sm rounded-lg hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20"
            >
              Get The Book — $19.99
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-brand-cream p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-brand-charcoal/95 backdrop-blur-2xl border-t border-white/[0.04] overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-5">
                {[
                  { label: "What's Inside", href: '#inside' },
                  { label: 'Testimonials', href: '#testimonials' },
                  { label: 'Work With Aaron', href: '/work-with-me' },
                  { label: 'About', href: '#author' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-brand-cream/60 hover:text-brand-cream font-body text-lg"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={AMAZON_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-6 py-3.5 bg-brand-red text-white font-body font-semibold text-center rounded-lg"
                >
                  Get The Book — $19.99
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sticky mobile CTA — appears after scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-brand-charcoal/95 backdrop-blur-xl border-t border-white/[0.06] px-4 py-3 safe-bottom"
          >
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 bg-brand-red text-white font-body font-semibold text-center rounded-lg shadow-lg shadow-brand-red/25"
            >
              Get The Book — $19.99 →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
