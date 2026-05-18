import type { Metadata } from 'next'
import VaultForm from '@/components/VaultForm'

export const metadata: Metadata = {
  title: 'The Viral Video Vault | Crazy Simple YouTube',
  description:
    'The Top 25 Viral Blueprints: deployable real estate video formats, tier-tagged, with hooks, AI prompts, thumbnail specs, and SEO packages. Free for the Listing Velocity cohort.',
  robots: { index: false, follow: false },
}

const AMAZON_LINK =
  process.env.NEXT_PUBLIC_AMAZON_LINK ||
  'https://www.amazon.com/dp/B0GWYK8TX6'

const whatsInside = [
  '25 deployable viral video blueprints, tier-tagged to your channel size',
  'A word-for-word sample hook for every single blueprint',
  'The 7-part video structure with exact timestamps',
  '5 copy-and-paste AI prompts per blueprint',
  'The 3-Element Thumbnail Law and a thumbnail spec per video',
  'A full SEO package: titles, descriptions, tags for each',
  'The ban list: the words that make viewers smell AI and bounce',
]

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-vault-dark text-white antialiased">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* gold glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-vault-gold/[0.10] rounded-full blur-[140px]" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-12 text-center">
          <span
            className="font-sans text-xs sm:text-sm font-bold tracking-[0.22em] uppercase"
            style={{ color: '#B8860B' }}
          >
            Exclusive | Listing Velocity Cohort
          </span>
          <h1 className="mt-5 font-sans font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            The Viral
            <br />
            <span style={{ color: '#C41230' }}>Video Vault</span>
          </h1>
          <p className="mt-6 font-sans text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
            The Top 25 Viral Blueprints. The exact real estate video formats
            that blow up on YouTube, tier-tagged to your channel size, each
            one ready to film with hooks, AI prompts, thumbnail specs, and a
            full SEO package.
          </p>
          <a
            href="#form"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl font-sans font-bold text-lg text-white transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: '#C41230' }}
          >
            Get the Vault
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ===== WHAT'S INSIDE ===== */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-center">
          What&apos;s Inside the Vault
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          {whatsInside.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]"
            >
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: '#B8860B' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-sans text-sm text-white/80 leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STACKED OFFER BANNER ===== */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-6">
        <div
          className="rounded-2xl p-7 sm:p-9"
          style={{
            background:
              'linear-gradient(135deg, rgba(184,134,11,0.18), rgba(196,18,48,0.12))',
            border: '2px solid rgba(184,134,11,0.45)',
          }}
        >
          <div
            className="font-sans text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: '#B8860B' }}
          >
            Bonus
          </div>
          <h3 className="mt-2 font-sans font-extrabold text-2xl sm:text-3xl leading-tight">
            For everyone who has the book.
          </h3>
          <p className="mt-4 font-sans text-base text-white/80 leading-relaxed">
            If you have purchased{' '}
            <strong className="text-white">Crazy Simple YouTube</strong>, you
            also get a <strong className="text-white">2-hour live Zoom call</strong>{' '}
            with me in late June 2026. Bring your channel. I review titles,
            thumbnails, and descriptions live. Just check the box in the form
            below.
          </p>
          <p className="mt-3 font-sans text-sm text-white/55">
            Have not bought it yet? Grab it on Amazon: $9.99 Kindle, $20
            paperback. Then check the box.
          </p>
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-sans font-bold text-vault-dark transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: '#B8860B' }}
          >
            Get the Book on Amazon
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section id="form" className="max-w-xl mx-auto px-5 sm:px-8 py-12 scroll-mt-8">
        <div className="rounded-2xl bg-white p-7 sm:p-9 shadow-2xl shadow-black/40">
          <div className="text-center mb-6">
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-vault-dark">
              Get the Vault. Get the Bonus.
            </h2>
            <p className="mt-2 font-sans text-sm text-vault-dark/55">
              One form. Both offers. Delivered to your inbox.
            </p>
          </div>
          <VaultForm />
        </div>
      </section>

      {/* ===== WHY THIS MATTERS ===== */}
      <section className="max-w-2xl mx-auto px-5 sm:px-8 py-12">
        <h2 className="font-sans font-extrabold text-2xl sm:text-3xl">
          Why I Made This Document
        </h2>
        <div className="mt-5 space-y-4 font-sans text-base text-white/70 leading-relaxed">
          <p>
            Most agents study what they think works. They copy other agents in
            their market. Problem: those agents are not growing either.
          </p>
          <p>
            This Vault is different. It is{' '}
            <strong className="text-white">25 proven blueprints</strong>, each
            one built from real estate videos that actually went viral. Pulled
            apart. Documented. Tier-tagged so you film the right one for your
            current channel size. Hook, structure, prompts, thumbnail, SEO. All
            of it.
          </p>
          <p>
            If you are running the 90-Day Sprint, this Vault is the difference
            between guessing and modeling.{' '}
            <strong className="text-white">
              Model the proven format. Win.
            </strong>
          </p>
        </div>
      </section>

      {/* ===== SOFT MANAGEMENT UPSELL ===== */}
      <section className="max-w-2xl mx-auto px-5 sm:px-8 pb-16">
        <div className="rounded-2xl p-7 sm:p-9 bg-white/[0.04] border border-white/[0.08]">
          <h2 className="font-sans font-extrabold text-xl sm:text-2xl">
            Want This Analysis Done on YOUR Channel?
          </h2>
          <p className="mt-3 font-sans text-base text-white/70 leading-relaxed">
            The Vault shows you the pattern. YouTube Management applies it to
            your market for you: filming guidance, editing, packaging, SEO,
            analytics. Done for you, every week, by the team that reverse
            engineered these videos in the first place.
          </p>
          <a
            href="https://crazysimpleyoutube.com/work-with-me"
            className="mt-5 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-sans font-bold text-white transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: '#457B9D' }}
          >
            Apply for YouTube Management
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8 text-center">
          <p className="font-sans text-xs text-white/35">
            &copy; 2026 Haymaker LLC | Crazy Simple YouTube | Aaron Cuha
          </p>
          <div className="mt-2 flex items-center justify-center gap-5 font-sans text-xs text-white/40">
            <a href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white/70 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
