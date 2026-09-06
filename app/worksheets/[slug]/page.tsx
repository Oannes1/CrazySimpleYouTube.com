import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import EmailGate from '@/components/EmailGate'
import MobileHandoff from '@/components/MobileHandoff'
import {
  worksheets,
  worksheetPdfUrl,
  type WorksheetPart,
} from '@/lib/worksheets-data'

/**
 * One page per worksheet.
 *
 * The 25 worksheets used to share a single list page, so 25 assets went to
 * search through one door while the 25 prompts and 61 kits each had their own.
 * Every worksheet answers a specific question a person actually types, and
 * none of them could rank for it.
 *
 * The chip row is the other half: time, chapter and what you need, stated
 * before anyone commits to the download. A worksheet that says "5 minutes"
 * gets started; one that says nothing gets bookmarked and forgotten.
 */

interface PageProps {
  params: { slug: string }
}

const partColors: Record<WorksheetPart, string> = {
  Foundation: 'bg-brand-red/[0.08] text-brand-red border-brand-red/20',
  'Content Creation': 'bg-blue-500/[0.08] text-blue-400 border-blue-500/20',
  'Business of YouTube': 'bg-orange-500/[0.08] text-orange-400 border-orange-500/20',
  'Scale and Sustainability': 'bg-emerald-500/[0.08] text-emerald-400 border-emerald-500/20',
}

export function generateStaticParams() {
  return worksheets.map((w) => ({ slug: w.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const w = worksheets.find((x) => x.slug === params.slug)
  if (!w) return { title: 'Worksheet not found' }

  const desc = `${w.shortDesc} A free printable worksheet from Crazy Simple YouTube, chapter ${w.chapter}. Takes about ${w.timeMinutes} minutes.`
  return {
    title: `${w.title} | Free Worksheet | Crazy Simple YouTube`,
    description: desc,
    alternates: { canonical: `https://crazysimpleyoutube.com/worksheets/${w.slug}` },
    openGraph: {
      title: `${w.title} | Free YouTube Worksheet`,
      description: desc,
      type: 'article',
    },
  }
}

export default function WorksheetPage({ params }: PageProps) {
  const w = worksheets.find((x) => x.slug === params.slug)
  if (!w) notFound()

  const idx = worksheets.findIndex((x) => x.slug === params.slug)
  const prev = idx > 0 ? worksheets[idx - 1] : null
  const next = idx < worksheets.length - 1 ? worksheets[idx + 1] : null

  const chips = [
    `${w.timeMinutes} minutes`,
    `Chapter ${w.chapter}`,
    'Printable PDF',
    'Pen and paper',
    w.caseStudyPerson ? `Case study: ${w.caseStudyPerson}` : null,
  ].filter(Boolean) as string[]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <nav className="mb-8 font-body text-xs text-brand-cream/40">
            <Link href="/" className="hover:text-brand-cream/70">Home</Link>
            {' / '}
            <Link href="/worksheets" className="hover:text-brand-cream/70">Worksheets</Link>
            {' / '}
            <span className="text-brand-cream/60">{w.title}</span>
          </nav>

          <div
            className={`inline-block px-3 py-1 rounded-full border font-body text-[0.65rem] tracking-[0.15em] uppercase font-semibold ${partColors[w.part]}`}
          >
            {w.part}
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-cream leading-[0.98]">
            {w.title}
          </h1>

          <p className="mt-4 font-body text-lg text-brand-cream/60 leading-relaxed">
            {w.shortDesc}
          </p>

          {/* What you are in for, before you commit to anything. */}
          <div className="mt-7 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] font-body text-xs text-brand-cream/55"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-9 rounded-2xl border border-brand-red/20 bg-brand-red/[0.04] p-6 sm:p-8">
            <h2 className="font-display text-xl font-normal uppercase text-brand-cream">
              Get the worksheet
            </h2>
            <p className="mt-2 font-body text-sm text-brand-cream/55 leading-relaxed">
              Free. It lands in your inbox as a PDF you can print or fill in on screen.
              You will also get the new tools as they go up, and you can leave whenever
              you want.
            </p>
            <div className="mt-5">
              <EmailGate
                pdfUrl={worksheetPdfUrl(w)}
                tags={['src_worksheets', `dl_worksheet_${w.slug}`]}
                listIds={[29]}
                assetName={`${w.title} (Chapter ${w.chapter} worksheet)`}
                assetType="worksheet"
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-red text-white hover:bg-brand-red-light font-body font-bold transition-colors"
                >
                  Send me the worksheet
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </EmailGate>
            </div>
          </div>

          <MobileHandoff assetLabel="worksheet" />

          <div className="mt-10 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="font-display text-lg font-normal uppercase text-brand-cream">
              Where this sits in the book
            </h2>
            <p className="mt-2 font-body text-sm text-brand-cream/55 leading-relaxed">
              This is the Crazy Simple Action from chapter {w.chapter}, in the{' '}
              {w.part} section. Each chapter ends with exactly one thing to do, and
              this is that one thing, on paper.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/worksheets"
                className="font-body text-sm font-semibold text-brand-red hover:text-brand-red-light"
              >
                All 24 worksheets →
              </Link>
              <Link
                href="/prompts"
                className="font-body text-sm font-semibold text-brand-cream/50 hover:text-brand-cream"
              >
                The AI prompt library →
              </Link>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                href={`/worksheets/${prev.slug}`}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors"
              >
                <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/40">
                  ← Previous
                </div>
                <div className="mt-1 font-body text-sm font-semibold text-brand-cream/80">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/worksheets/${next.slug}`}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors text-right"
              >
                <div className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/40">
                  Next →
                </div>
                <div className="mt-1 font-body text-sm font-semibold text-brand-cream/80">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
