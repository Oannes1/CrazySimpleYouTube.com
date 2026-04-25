'use client'

import { useState } from 'react'

export default function BonusForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const firstName = formData.get('firstName') as string
    const email = formData.get('email') as string

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          email,
          tags: ['src_bonus', 'dl_companion_kit'],
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      form.reset()
      // Redirect to primary site after successful capture
      setTimeout(() => {
        window.location.href = 'https://aaroncuha.com/services/youtube-services'
      }, 2500)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-8 max-w-sm mx-auto text-center p-6 rounded-xl bg-white/[0.04] border border-white/[0.08]">
        <div className="w-12 h-12 rounded-full bg-brand-red/10 mx-auto flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-body font-bold text-brand-cream text-lg">You&apos;re in!</p>
        <p className="font-body text-brand-cream/50 text-sm mt-2">
          Check your inbox — the Chapter Companion Kit is on its way.
        </p>
        <p className="font-body text-brand-cream/40 text-xs mt-3">
          Redirecting you to explore coaching &amp; services...
        </p>
        <a
          href="https://aaroncuha.com/services/youtube-services"
          className="inline-block mt-4 px-6 py-2.5 bg-brand-red text-white font-body font-bold text-sm rounded-lg hover:bg-brand-red-light transition-colors"
        >
          Go Now →
        </a>
      </div>
    )
  }

  return (
    <form
      className="mt-8 flex flex-col gap-3 max-w-sm mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/25 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30"
        required
        disabled={status === 'loading'}
      />
      <input
        type="email"
        name="email"
        placeholder="Email address"
        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] font-body text-brand-cream placeholder:text-brand-cream/25 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30"
        required
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand-red text-white font-body font-bold text-lg rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Me the Free Kit'}
      </button>
      {status === 'error' && (
        <p className="text-brand-red-light font-body text-sm text-center">{errorMsg}</p>
      )}
    </form>
  )
}
