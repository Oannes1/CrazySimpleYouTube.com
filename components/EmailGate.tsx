'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COOKIE_NAME = 'csy_unlocked'
const COOKIE_DAYS = 365

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

interface EmailGateProps {
  /** PDF URL the user gets after opting in */
  pdfUrl: string
  /** Brevo tags (cumulative). e.g. ['src_prompts', 'dl_prompt_youtube-business-case-builder'] */
  tags: string[]
  /** Brevo list IDs in addition to the master Companion Kit list (21) */
  listIds?: number[]
  /** Document title for context, e.g. "YouTube Business Case Builder" */
  assetName: string
  /** Asset type for headline copy */
  assetType?: 'prompt' | 'worksheet' | 'document'
  /** Trigger element (the button or link) */
  children: React.ReactNode
  /** Use compact form variant for inline placement inside cards */
  compact?: boolean
}

export default function EmailGate({
  pdfUrl,
  tags,
  listIds,
  assetName,
  assetType = 'document',
  children,
  compact = false,
}: EmailGateProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (readCookie(COOKIE_NAME) === 'true') setUnlocked(true)
  }, [])

  function handleTriggerClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (unlocked) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer')
      return
    }
    setOpen(true)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const firstName = (fd.get('firstName') as string)?.trim()
    const email = (fd.get('email') as string)?.trim().toLowerCase()

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, tags, listIds }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }
      writeCookie(COOKIE_NAME, 'true', COOKIE_DAYS)
      setStatus('success')
      // Open PDF in new tab so they don't lose context
      setTimeout(() => {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer')
      }, 800)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Try again')
    }
  }

  // Wrap children to capture click
  const trigger = (
    <span onClick={handleTriggerClick} className="contents">
      {children}
    </span>
  )

  return (
    <div className={compact ? 'block' : 'inline-block'}>
      {trigger}

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay (only on non-compact mode) */}
            {!compact && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-brand-charcoal/85 backdrop-blur-sm z-50"
              />
            )}

            {/* Form panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 4 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={
                compact
                  ? 'mt-3 w-full'
                  : 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md'
              }
            >
              <div className="rounded-2xl bg-brand-charcoal border border-brand-red/25 shadow-[0_24px_80px_rgba(196,18,48,0.18)] overflow-hidden">
                {/* Top brand strip */}
                <div className="h-1.5 bg-gradient-to-r from-brand-red via-brand-red-light to-brand-red" />

                <div className="px-6 sm:px-7 pt-6 pb-7">
                  {/* Close button (only when modal) */}
                  {!compact && (
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-brand-cream/60 hover:text-brand-cream transition-colors flex items-center justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}

                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-2"
                    >
                      <div className="mx-auto w-12 h-12 rounded-full bg-brand-red/15 flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-display uppercase text-2xl text-brand-cream tracking-tight">Opening your PDF</h3>
                      <p className="mt-2 font-body text-sm text-brand-cream/55 leading-relaxed">
                        Check your inbox in 5 minutes. From now on,{' '}
                        <strong className="text-brand-cream font-semibold">all downloads are unlocked</strong>{' '}
                        on this device.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <div className="font-accent text-xl text-brand-red/90 leading-none mb-1">
                        one quick thing
                      </div>
                      <h3 className="font-display uppercase text-2xl sm:text-3xl text-brand-cream tracking-tight leading-[0.95]">
                        Tell us where to <span className="text-brand-red">send it</span>
                      </h3>
                      <p className="mt-3 font-body text-sm text-brand-cream/60 leading-relaxed">
                        We&apos;ll email you{' '}
                        <strong className="text-brand-cream font-semibold">
                          {assetName}
                        </strong>{' '}
                        as a PDF. After that,{' '}
                        <strong className="text-brand-cream font-semibold">every {assetType} unlocks</strong>{' '}
                        — no more forms.
                      </p>

                      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          required
                          autoComplete="given-name"
                          disabled={status === 'loading'}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.06] transition-colors"
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          required
                          autoComplete="email"
                          disabled={status === 'loading'}
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.06] transition-colors"
                        />
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full py-3.5 rounded-xl bg-brand-red text-white font-body font-bold tracking-wide hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-60 group"
                        >
                          <span className="inline-flex items-center justify-center gap-2">
                            {status === 'loading' ? (
                              <>
                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                Sending
                              </>
                            ) : (
                              <>
                                Send Me the PDF
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                        {status === 'error' && (
                          <p className="text-brand-red-light text-sm font-body text-center">{errorMsg}</p>
                        )}
                      </form>

                      <p className="mt-4 text-[0.7rem] text-brand-cream/30 font-body text-center leading-relaxed">
                        We send useful stuff occasionally. Unsubscribe anytime.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
