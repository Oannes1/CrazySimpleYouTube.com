import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import UnlockForm from '@/components/UnlockForm'

export const metadata: Metadata = {
  title: 'Unlock Your Download | Crazy Simple YouTube',
  description:
    'One quick form. We\'ll email you the document and unlock every other resource on the site for you.',
  robots: { index: false, follow: false },
}

export default function UnlockPage({
  searchParams,
}: {
  searchParams: { next?: string }
}) {
  // Sanitize: only allow same-origin /pdfs/* paths
  const raw = searchParams.next || ''
  const next = raw.startsWith('/pdfs/') ? raw : '/resources'

  // Try to derive a friendly asset name from the path
  const slug = next.replace(/^\/pdfs\/(prompts|worksheets)\//, '').replace(/\.pdf$/, '')
  const assetType = next.includes('/prompts/')
    ? 'prompt'
    : next.includes('/worksheets/')
      ? 'worksheet'
      : 'resource'
  const assetName = slug
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        <section className="relative max-w-xl mx-auto px-5 sm:px-8">
          {/* Decorative mark */}
          <div className="text-center mb-8">
            <span className="font-accent text-3xl text-brand-red/80">
              one quick thing
            </span>
          </div>

          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            {/* Top brand strip */}
            <div className="h-1.5 bg-gradient-to-r from-brand-red via-brand-red-light to-brand-red" />

            <div className="p-7 sm:p-9">
              <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
                {assetType}
              </span>
              <h1 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream leading-[0.95]">
                Tell us where to <span className="text-brand-red">send it</span>
              </h1>
              <p className="mt-4 font-body text-brand-cream/65 leading-relaxed">
                You&apos;re about to grab{' '}
                <strong className="text-brand-cream font-semibold">
                  {assetName || `the ${assetType}`}
                </strong>
                . Drop your name and email below.
              </p>
              <p className="mt-3 font-body text-brand-cream/50 text-sm leading-relaxed">
                After this,{' '}
                <strong className="text-brand-cream font-semibold">
                  every prompt and worksheet unlocks
                </strong>{' '}
                on this device. No more forms.
              </p>

              <UnlockForm assetName={assetName || assetType} assetType={assetType} next={next} />

              <p className="mt-5 font-body text-xs text-brand-cream/30 text-center">
                We send useful stuff occasionally. Unsubscribe with one click.
              </p>
            </div>
          </div>

          <p className="mt-6 text-center font-body text-xs text-brand-cream/40">
            Already have access? <a href={next} className="text-brand-red hover:text-brand-red-light underline">Try the link again</a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
