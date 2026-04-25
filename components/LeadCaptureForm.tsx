'use client'

import { useState } from 'react'

interface LeadCaptureFormProps {
  /** Brevo tags to apply on submit, e.g. ["src_book2", "dl_book2_chapter1"] */
  tags: string[]
  /** Optional additional Brevo list IDs to add the contact to */
  listIds?: number[]
  /** Optional URL to redirect to on success */
  redirectUrl?: string
  /** Delay before redirect (ms) */
  redirectDelay?: number
  /** Button label */
  ctaLabel?: string
  /** Loading label */
  loadingLabel?: string
  /** Success heading */
  successHeading?: string
  /** Success subtext */
  successText?: string
  /** Show last name field */
  showLastName?: boolean
  /** Theme: 'light' (cream bg pages) or 'dark' (charcoal bg pages) */
  theme?: 'light' | 'dark'
  /** Additional className for the form container */
  className?: string
}

export default function LeadCaptureForm({
  tags,
  listIds,
  redirectUrl,
  redirectDelay = 2500,
  ctaLabel = 'Get Free Access',
  loadingLabel = 'Sending...',
  successHeading = "You're in!",
  successText = 'Check your inbox in the next few minutes.',
  showLastName = false,
  theme = 'dark',
  className = '',
}: LeadCaptureFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const fd = new FormData(form)
    const firstName = fd.get('firstName') as string
    const lastName = fd.get('lastName') as string | null
    const email = fd.get('email') as string

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          lastName: lastName || undefined,
          tags,
          listIds,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      form.reset()

      if (redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl
        }, redirectDelay)
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  const isDark = theme === 'dark'
  const inputCls = isDark
    ? 'w-full px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/25 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30'
    : 'w-full px-5 py-3.5 rounded-xl bg-white border border-brand-charcoal/15 font-body text-brand-charcoal placeholder:text-brand-charcoal/35 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30'

  if (status === 'success') {
    return (
      <div
        className={`p-6 rounded-xl text-center ${
          isDark
            ? 'bg-white/[0.04] border border-white/[0.08]'
            : 'bg-brand-cream-light border border-brand-charcoal/10'
        } ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-brand-red/10 mx-auto flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-brand-red"
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
        </div>
        <p
          className={`font-body font-bold text-lg ${
            isDark ? 'text-brand-cream' : 'text-brand-charcoal'
          }`}
        >
          {successHeading}
        </p>
        <p
          className={`font-body text-sm mt-2 ${
            isDark ? 'text-brand-cream/50' : 'text-brand-charcoal/60'
          }`}
        >
          {successText}
        </p>
      </div>
    )
  }

  return (
    <form
      className={`flex flex-col gap-3 ${className}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        className={inputCls}
        required
        disabled={status === 'loading'}
      />
      {showLastName && (
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          className={inputCls}
          disabled={status === 'loading'}
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email address"
        className={inputCls}
        required
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? loadingLabel : ctaLabel}
      </button>
      {status === 'error' && (
        <p className="text-brand-red-light font-body text-sm text-center">
          {errorMsg}
        </p>
      )}
    </form>
  )
}
