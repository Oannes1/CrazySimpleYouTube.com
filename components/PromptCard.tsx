'use client'

import { useState } from 'react'
import { type Prompt, promptPdfUrl } from '@/lib/prompts-data'
import EmailGate from './EmailGate'

const pillarColors: Record<Prompt['category'], string> = {
  Foundation: 'bg-brand-red/[0.08] text-brand-red border-brand-red/20',
  'Content Creation': 'bg-blue-500/[0.08] text-blue-400 border-blue-500/20',
  'Business of YouTube': 'bg-orange-500/[0.08] text-orange-400 border-orange-500/20',
  'Scale and Sustainability':
    'bg-purple-500/[0.08] text-purple-400 border-purple-500/20',
}

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  function openInChatGPT() {
    const encoded = encodeURIComponent(prompt.prompt)
    window.open(
      `https://chat.openai.com/?model=gpt-4&q=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  function openInClaude() {
    const encoded = encodeURIComponent(prompt.prompt)
    window.open(
      `https://claude.ai/new?q=${encoded}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-brand-red/15 transition-colors overflow-hidden">
      <div className="p-6 sm:p-7">
        {/* Category + chapter pills */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[0.6rem] font-body font-bold tracking-wider uppercase ${
              pillarColors[prompt.category]
            }`}
          >
            {prompt.category}
          </span>
          <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/40 font-medium">
            Chapter {prompt.chapter}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-2xl font-normal uppercase text-brand-cream leading-tight">
          {prompt.title}
        </h3>
        <p className="mt-1 font-body text-xs text-brand-cream/35 italic">
          From: {prompt.chapterTitle}
        </p>

        {/* Setup */}
        <p className="mt-4 font-body text-sm text-brand-cream/60 leading-relaxed">
          {prompt.setup}
        </p>

        {/* Prompt block */}
        <div className="mt-5">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left flex items-center justify-between px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-brand-red/30 transition-colors group"
          >
            <span className="font-body text-sm text-brand-cream/70 group-hover:text-brand-cream font-semibold">
              {expanded ? 'Hide prompt' : 'Show full prompt'}
            </span>
            <svg
              className={`w-4 h-4 text-brand-cream/40 transition-transform ${
                expanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {expanded && (
            <div className="mt-3">
              <pre className="p-4 rounded-lg bg-brand-charcoal/80 border border-white/[0.06] font-mono text-[0.78rem] text-brand-cream/75 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {prompt.prompt}
              </pre>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={copyPrompt}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-red text-white font-body font-semibold text-xs hover:bg-brand-red-light transition-colors"
                >
                  {copied ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5"
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
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Copy prompt
                    </>
                  )}
                </button>
                <button
                  onClick={openInChatGPT}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 text-brand-cream/70 hover:border-brand-red/30 hover:text-brand-cream font-body font-semibold text-xs transition-colors"
                >
                  Open in ChatGPT
                  <svg
                    className="w-3 h-3"
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
                </button>
                <button
                  onClick={openInClaude}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 text-brand-cream/70 hover:border-brand-red/30 hover:text-brand-cream font-body font-semibold text-xs transition-colors"
                >
                  Open in Claude
                  <svg
                    className="w-3 h-3"
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
                </button>
                <EmailGate
                  pdfUrl={promptPdfUrl(prompt)}
                  tags={['src_prompts', `dl_prompt_${prompt.slug}`]}
                  listIds={[30]}
                  assetName={prompt.title}
                  assetType="prompt"
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 text-brand-cream/70 hover:border-brand-red/30 hover:text-brand-cream font-body font-semibold text-xs transition-colors"
                  >
                    Download PDF
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </EmailGate>
              </div>
            </div>
          )}
        </div>

        {/* Closing note */}
        {prompt.closing && expanded && (
          <p className="mt-5 pt-4 border-t border-white/[0.05] font-body text-sm text-brand-cream/45 italic leading-relaxed">
            {prompt.closing}
          </p>
        )}
      </div>
    </div>
  )
}
