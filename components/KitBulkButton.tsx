'use client'

import { useState } from 'react'

/**
 * Opens every Amazon link in the kit in a new tab.
 *
 * Browsers block multiple `window.open` calls in a single user gesture
 * unless they are spaced micro-tasks. We stagger by 80ms which most
 * popup blockers allow.
 */
export default function KitBulkButton({ items }: { items: string[] }) {
  const [opened, setOpened] = useState(false)

  function openAll() {
    items.forEach((url, i) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, i * 80)
    })
    setOpened(true)
    setTimeout(() => setOpened(false), 4000)
  }

  return (
    <button
      onClick={openAll}
      className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-brand-red text-white font-body font-bold text-base hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20 group"
    >
      {opened ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {items.length} tabs opened — happy hunting
        </>
      ) : (
        <>
          Open All {items.length} Items on Amazon
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </>
      )}
    </button>
  )
}
