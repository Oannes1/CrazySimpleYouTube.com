import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import PromptCard from '@/components/PromptCard'
import { prompts } from '@/lib/prompts-data'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return prompts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const prompt = prompts.find((p) => p.slug === params.slug)
  if (!prompt) return { title: 'Prompt not found' }

  return {
    title: `${prompt.title} | AI Prompt | Crazy Simple YouTube`,
    description: `${prompt.setup.slice(0, 155)}`,
    openGraph: {
      title: `${prompt.title} | AI Prompt for YouTube Growth`,
      description: prompt.setup.slice(0, 155),
      type: 'article',
    },
  }
}

export default function PromptPage({ params }: PageProps) {
  const prompt = prompts.find((p) => p.slug === params.slug)
  if (!prompt) notFound()

  const idx = prompts.findIndex((p) => p.slug === params.slug)
  const prev = idx > 0 ? prompts[idx - 1] : null
  const next = idx < prompts.length - 1 ? prompts[idx + 1] : null

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 font-body text-xs text-brand-cream/40">
            <Link href="/" className="hover:text-brand-cream/70">
              Home
            </Link>
            {' / '}
            <Link href="/prompts" className="hover:text-brand-cream/70">
              Prompts
            </Link>
            {' / '}
            <span className="text-brand-cream/60">{prompt.title}</span>
          </nav>

          {/* Card */}
          <PromptCard prompt={prompt} />

          {/* Prev / next */}
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {prev ? (
              <Link
                href={`/prompts/${prev.slug}`}
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
                href={`/prompts/${next.slug}`}
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

          {/* Back to library */}
          <div className="mt-12 text-center">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 text-brand-cream/70 hover:border-brand-red/30 hover:text-brand-cream font-body font-semibold rounded-xl transition-colors"
            >
              ← Back to Full Library
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
