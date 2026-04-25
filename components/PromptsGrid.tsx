'use client'

import { useMemo, useState } from 'react'
import PromptCard from './PromptCard'
import type { Prompt } from '@/lib/prompts-data'

const categories = [
  'All',
  'Foundation',
  'Content Creation',
  'Business of YouTube',
  'Scale and Sustainability',
] as const

type Filter = (typeof categories)[number]

export default function PromptsGrid({ prompts }: { prompts: Prompt[] }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      if (filter !== 'All' && p.category !== filter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.chapterTitle.toLowerCase().includes(q) ||
          p.setup.toLowerCase().includes(q) ||
          p.prompt.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [prompts, filter, search])

  return (
    <div>
      {/* Filter + search */}
      <div className="sticky top-16 sm:top-20 z-20 bg-brand-charcoal/95 backdrop-blur-xl border-y border-white/[0.04] -mx-5 sm:-mx-8 px-5 sm:px-8 py-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-body font-semibold transition-colors ${
                  filter === cat
                    ? 'bg-brand-red text-white'
                    : 'bg-white/[0.04] text-brand-cream/60 hover:bg-white/[0.08] hover:text-brand-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-[200px]">
            <input
              type="search"
              placeholder="Search prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] font-body text-sm text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red/30"
            />
          </div>
        </div>
        {filter !== 'All' || search ? (
          <p className="mt-3 font-body text-xs text-brand-cream/40">
            Showing {filtered.length} of {prompts.length} prompts
            {search && ` matching "${search}"`}
          </p>
        ) : null}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-body text-brand-cream/40">
            No prompts match. Try a different search or filter.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5">
          {filtered.map((p) => (
            <PromptCard key={p.slug} prompt={p} />
          ))}
        </div>
      )}
    </div>
  )
}
