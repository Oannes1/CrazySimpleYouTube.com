'use client'

import { useState } from 'react'

const COOKIE_NAME = 'csy_unlocked'
const COOKIE_DAYS = 365

function writeCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

interface UnlockFormProps {
  next: string
  assetName: string
  assetType: string
}

export default function UnlockForm({ next, assetName, assetType }: UnlockFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const firstName = (fd.get('firstName') as string)?.trim()
    const email = (fd.get('email') as string)?.trim().toLowerCase()

    // Derive tags from the destination URL
    const tagSource = assetType === 'prompt'
      ? 'src_prompts'
      : assetType === 'worksheet'
        ? 'src_worksheets'
        : 'src_unlock'
    const slug = next.replace(/^\/pdfs\/(prompts|worksheets)\//, '').replace(/\.pdf$/, '')
    const assetTag = `dl_${assetType}_${slug}`
    const listIds = assetType === 'prompt' ? [30] : assetType === 'worksheet' ? [29] : []

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          tags: [tagSource, assetTag],
          listIds,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }
      writeCookie(COOKIE_NAME, 'true', COOKIE_DAYS)
      setStatus('success')
      // Hard redirect so the middleware sees the new cookie
      setTimeout(() => {
        window.location.href = next
      }, 700)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Try again')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-brand-red/15 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-display uppercase text-xl text-brand-cream tracking-tight">
          Opening your PDF
        </p>
        <p className="mt-2 font-body text-sm text-brand-cream/55">
          Redirecting you now...
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        required
        autoComplete="given-name"
        autoFocus
        disabled={status === 'loading'}
        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.06] transition-colors"
      />
      <input
        type="email"
        name="email"
        placeholder="you@example.com"
        required
        autoComplete="email"
        disabled={status === 'loading'}
        className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-red/50 focus:bg-white/[0.06] transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 rounded-xl bg-brand-red text-white font-body font-bold tracking-wide hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-60 group"
      >
        <span className="inline-flex items-center justify-center gap-2">
          {status === 'loading' ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send Me the {assetType === 'prompt' ? 'Prompt' : assetType === 'worksheet' ? 'Worksheet' : 'PDF'}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </span>
      </button>
      {status === 'error' && (
        <p className="text-brand-red-light font-body text-sm text-center">{errorMsg}</p>
      )}
    </form>
  )
}
