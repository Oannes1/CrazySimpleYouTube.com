import type { Metadata } from 'next'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Press Kit | Crazy Simple YouTube — Aaron Cuha',
  description:
    'Press kit for Crazy Simple YouTube by Aaron Cuha. Author bio, book details, interview angles, headshots, and book covers. Press inquiries: ac@aaroncuha.com.',
  openGraph: {
    title: 'Crazy Simple YouTube Press Kit',
    description: 'Author bio, headshots, book covers, interview angles, and contact for media inquiries.',
    images: ['/book-cover.jpg'],
  },
}

const AMAZON_LINK =
  process.env.NEXT_PUBLIC_AMAZON_LINK ||
  'https://www.amazon.com/dp/B0GWYK8TX6'

const interviewQuestions = [
  {
    q: 'Why do most YouTube creators struggle to generate real business leads?',
    a: 'Because they follow influencer advice in a creator economy that rewards vanity metrics. Business owners need a different system: searchable content, lead magnets in every description, and a follow-up engine. Vanity views do not pay bills. Conversion does.',
  },
  {
    q: 'What is the single biggest YouTube mistake real estate agents make?',
    a: 'They copy other agents instead of studying what actually converts. Most agents in their market are not growing either. The 4 Content Pillars framework in the book solves this by giving them a research method that surfaces high-intent keywords competitors ignore.',
  },
  {
    q: 'How did you build a multi-million dollar coaching business from YouTube without being an influencer?',
    a: 'Two channels (@VanLife at 138K and @aaroncuha at 101K) treated as testing labs. Every strategy in the book was validated on my own channels first before any client paid for it. The book is not theory. It is what worked on me, then on clients.',
  },
  {
    q: 'What is the YouTube Hourly Rate and why does it matter?',
    a: 'It is the dollar value of every hour you spend on YouTube content for your specific business. Once a business owner does the math (Chapter 1), the "I do not have time" excuse evaporates. When you know each video is worth $5,000 or $50,000 over its lifetime, two hours a week stops feeling like a sacrifice and starts feeling like the smartest investment you will make all month.',
  },
  {
    q: 'How is AI changing the YouTube playbook for business owners in 2026?',
    a: 'AI is the difference between spending 15 hours per video and spending 5. The book includes 24 specific AI prompts (one per chapter) for ChatGPT, Claude, and Gemini. The bottleneck is no longer creation. It is strategy, hooks, and consistency. AI handles the rest.',
  },
]

const storyAngles = [
  {
    audience: 'Real Estate Trade Press',
    headline: 'Why the smartest brokerages are investing in YouTube for their agents',
    pitch:
      'Aaron has guided agents from 200 subscribers to 15,000+ while generating six figures in YouTube-attributed revenue. The brokerage angle: YouTube as the new open house. One walk-through video keeps generating leads while the agent sleeps.',
  },
  {
    audience: 'Entrepreneurship & Creator Economy',
    headline: 'From zero to 239K+ subscribers across two channels without being an influencer',
    pitch:
      'Aaron built @VanLife (138K+) and @aaroncuha (101K+) specifically as testing grounds, not vanity projects. Every strategy was validated with real data before being put in front of a paying client. The "anti-influencer YouTube playbook" angle.',
  },
  {
    audience: 'Real Estate Agent & Coach Podcasts',
    headline: 'The system behind 20,000+ hours of one-on-one coaching, distilled into 24 chapters',
    pitch:
      'Aaron is a Tom Ferry Mastery Coach, a licensed broker in twelve states, and a speaker within the Tom Ferry ecosystem. The book is the playbook he wished existed when his coaching clients kept asking the same questions.',
  },
]

const pullQuotes = [
  {
    quote: 'You don\'t need more content. You need one video built the right way.',
    source: 'Crazy Simple YouTube, Chapter 1',
  },
  {
    quote: 'Subscribers are a vanity metric. A channel with 500 subs and 50% watch-through will generate more leads than one with 50,000 subs and 15% watch-through.',
    source: 'Crazy Simple YouTube, Chapter 2',
  },
  {
    quote: 'Audio quality matters more than video quality. A $50 microphone upgrade will do more for your channel than a $2,000 camera upgrade.',
    source: 'Crazy Simple YouTube, Chapter 5',
  },
  {
    quote: 'The next 90 days pass whether you build your channel or not. The creators who win aren\'t smarter or more talented. They decided to start and refused to stop.',
    source: 'Crazy Simple YouTube, Chapter 24',
  },
]

const channels = [
  { label: 'YouTube · @aaroncuha', href: 'https://youtube.com/@aaroncuha', followers: '101K subscribers' },
  { label: 'YouTube · @VanLife', href: 'https://youtube.com/@vanlife', followers: '138K subscribers' },
  { label: 'Instagram · @aaroncuha', href: 'https://instagram.com/aaroncuha', followers: '' },
  { label: 'LinkedIn · /in/aaroncuha', href: 'https://linkedin.com/in/aaroncuha', followers: '' },
  { label: 'X · @AaronCuha', href: 'https://x.com/AaronCuha', followers: '' },
  { label: 'TikTok · @aaroncuha', href: 'https://tiktok.com/@aaroncuha', followers: '' },
  { label: 'Facebook · @aaroncuha', href: 'https://facebook.com/aaroncuha', followers: '' },
]

const factSheet = [
  { label: 'Title', value: 'Crazy Simple YouTube' },
  { label: 'Subtitle', value: 'A Success Guide: Turn Views Into Clients' },
  { label: 'Author', value: 'Aaron Cuha' },
  { label: 'Publisher', value: 'Haymaker Publishing' },
  { label: 'Launch Date', value: 'April 13, 2026' },
  { label: 'Formats', value: 'Paperback · Hardback · Kindle' },
  { label: 'Length', value: '24 chapters · 5 parts' },
  { label: 'Price', value: '$19.99 paperback · $9.99 Kindle' },
  { label: 'ASIN', value: 'B0GWYK8TX6' },
  { label: 'Genre', value: 'Business · Marketing · Real Estate' },
  { label: 'Status', value: '#1 Amazon New Release in Web Marketing (4 weeks running)' },
]

export default function PressPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        {/* ===== Hero ===== */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-16">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10 items-center">
            <div>
              <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
                Press Kit
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
                For the
                <br />
                <span className="text-brand-red">Media.</span>
              </h1>
              <p className="mt-6 font-body text-brand-cream/65 text-lg leading-relaxed">
                Everything you need to cover{' '}
                <strong className="text-brand-cream font-semibold">
                  Crazy Simple YouTube
                </strong>{' '}
                and Aaron Cuha: author bios, book details, headshots, pull
                quotes, interview angles, and direct contact.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:ac@aaroncuha.com?subject=Press%20Inquiry%20—%20Crazy%20Simple%20YouTube"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-red text-white font-body font-bold text-base rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/20"
                >
                  Email for an interview
                </a>
                <a
                  href={AMAZON_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-brand-cream/15 text-brand-cream/80 font-body font-semibold text-base rounded-xl hover:border-brand-red/40 hover:text-brand-red transition-colors"
                >
                  Buy on Amazon
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/book-display.jpg"
                alt="Crazy Simple YouTube — Vol. 01 — #1 Amazon New Release in Web Marketing. By Aaron Cuha."
                width={280}
                height={420}
                priority
                className="w-[220px] sm:w-[260px] lg:w-[280px] h-auto rounded-xl drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </section>

        {/* ===== Fact Sheet ===== */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-6">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Section 01
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Book Fact Sheet
            </h2>
          </div>
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            {factSheet.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr] gap-4 px-5 sm:px-7 py-3.5 ${
                  i % 2 === 0 ? 'bg-white/[0.015]' : ''
                }`}
              >
                <div className="font-body text-[0.65rem] sm:text-xs tracking-[0.2em] uppercase text-brand-cream/40 font-semibold pt-0.5">
                  {row.label}
                </div>
                <div className="font-body text-sm sm:text-base text-brand-cream/85">
                  {row.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Author Bio ===== */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-6">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Section 02
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Author Biography
            </h2>
          </div>

          <div className="space-y-5">
            {/* Short */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-7 sm:p-9">
              <div className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-brand-red font-bold mb-3">
                Short Bio (~100 words)
              </div>
              <p className="font-body text-brand-cream/80 leading-relaxed">
                Aaron Cuha is a Tom Ferry Mastery Coach
                with over 20,000 hours of one-on-one coaching experience and the
                author of Crazy Simple YouTube. He runs two YouTube channels
                that serve as personal testing grounds for every strategy he
                teaches: @VanLife (138,000+ subscribers) and @aaroncuha (101,000+
                subscribers). A licensed real estate broker in twelve states and
                a speaker within the Tom Ferry ecosystem, Aaron has guided
                hundreds of agents, coaches, and consultants to build YouTube
                channels that generate real client revenue. He lives in Park
                City, Utah.
              </p>
            </div>

            {/* Long */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-7 sm:p-9">
              <div className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-brand-red font-bold mb-3">
                Long Bio (~300 words)
              </div>
              <div className="space-y-4 font-body text-brand-cream/80 leading-relaxed">
                <p>
                  Aaron Cuha is a Tom Ferry Mastery Coach, the author of
                  Crazy Simple YouTube, and the founder of a YouTube coaching
                  and management practice that serves business owners across
                  real estate, mortgage, financial advising, law, and home
                  services.
                </p>
                <p>
                  Over 20,000 hours of one-on-one coaching have given him a
                  perspective most YouTube educators lack: he doesn&apos;t just
                  know what works in theory. He knows what works when a real
                  estate agent in Weston, Florida has three hours a week and
                  zero patience for complexity. He runs two YouTube channels
                  built on the exact strategies in the book: @VanLife
                  (138,000+ subscribers) and @aaroncuha (101,000+ subscribers).
                  Every framework Aaron teaches is validated with real data on
                  his own channels before any client pays for it.
                </p>
                <p>
                  Aaron is a licensed real estate broker in twelve states, a
                  speaker within the Tom Ferry ecosystem, and the founder of
                  DirectLender.com (280 offices, 3,000 employees). His clients
                  have grown channels from 200 subscribers to 15,000+ while
                  generating six figures in YouTube-attributed revenue. One
                  client, Scott, went from twelve years and 200 subscribers to
                  $87,000 in commissions in 90 days and $300K+ in year one
                  using the system in the book.
                </p>
                <p>
                  When he&apos;s not coaching, writing, or filming, Aaron lives
                  in Park City, Utah, where the mountains are tall and the
                  advice is short.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Credentials snapshot ===== */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { number: '239K+', label: 'YouTube Subscribers' },
              { number: '20K+', label: 'Coaching Hours' },
              { number: '12', label: 'Licensed Real Estate States' },
              { number: '$2M+', label: 'Client Revenue Generated' },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="font-display text-3xl sm:text-4xl font-normal uppercase text-brand-red">
                  {s.number}
                </div>
                <div className="mt-1 font-body text-[0.65rem] tracking-[0.2em] uppercase text-brand-cream/40">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Pull Quotes ===== */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-6">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Section 03
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Pull Quotes
            </h2>
            <p className="mt-2 font-body text-brand-cream/45 text-sm">
              Drop these straight into your article.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {pullQuotes.map((q) => (
              <div
                key={q.quote}
                className="p-6 rounded-2xl bg-white/[0.02] border-l-4 border-brand-red border-y border-r border-y-white/[0.06] border-r-white/[0.06]"
              >
                <p className="font-body text-brand-cream/85 italic leading-relaxed">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <p className="mt-3 font-body text-xs text-brand-cream/40">
                  — {q.source}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Interview Questions ===== */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-6">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Section 04
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Suggested Interview Questions
            </h2>
            <p className="mt-2 font-body text-brand-cream/45 text-sm">
              Five questions with brief answers ready to go.
            </p>
          </div>
          <div className="space-y-3">
            {interviewQuestions.map((qa, i) => (
              <details
                key={qa.q}
                className="group rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none px-5 sm:px-7 py-5 flex items-start justify-between gap-4 hover:bg-white/[0.015]">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-2xl font-normal text-brand-red leading-none mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-body font-semibold text-brand-cream/85">
                      {qa.q}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-brand-cream/30 transition-transform group-open:rotate-180 flex-shrink-0 mt-1"
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
                </summary>
                <div className="px-5 sm:px-7 pb-6 pl-[60px] sm:pl-[80px] font-body text-sm text-brand-cream/65 leading-relaxed">
                  {qa.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ===== Story Angles ===== */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-6">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Section 05
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Story Angles
            </h2>
            <p className="mt-2 font-body text-brand-cream/45 text-sm">
              Three pitches by audience type.
            </p>
          </div>
          <div className="space-y-4">
            {storyAngles.map((s) => (
              <div
                key={s.headline}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-7"
              >
                <div className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-brand-red font-bold mb-2">
                  For: {s.audience}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-normal uppercase text-brand-cream leading-tight">
                  &ldquo;{s.headline}&rdquo;
                </h3>
                <p className="mt-3 font-body text-sm text-brand-cream/60 leading-relaxed">
                  {s.pitch}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Assets ===== */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-6">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Section 06
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Downloadable Assets
            </h2>
            <p className="mt-2 font-body text-brand-cream/45 text-sm">
              Right-click to save, or click to view full size.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/book-cover.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/30 transition-colors"
            >
              <div className="flex items-center justify-center h-40 mb-3">
                <Image
                  src="/book-cover.jpg"
                  alt="Crazy Simple YouTube Vol. 1 cover"
                  width={140}
                  height={210}
                  className="h-full w-auto rounded shadow-lg"
                />
              </div>
              <div className="font-body font-semibold text-sm text-brand-cream group-hover:text-brand-red transition-colors">
                Vol. 1 Cover
              </div>
              <div className="font-body text-xs text-brand-cream/40 mt-0.5">
                Front, high-res JPG
              </div>
            </a>
            <a
              href="/book2-cover.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/30 transition-colors"
            >
              <div className="flex items-center justify-center h-40 mb-3">
                <Image
                  src="/book2-cover.jpg"
                  alt="Crazy Simple YouTube Vol. 2 cover"
                  width={140}
                  height={210}
                  className="h-full w-auto rounded shadow-lg"
                />
              </div>
              <div className="font-body font-semibold text-sm text-brand-cream group-hover:text-brand-red transition-colors">
                Vol. 2 Cover
              </div>
              <div className="font-body text-xs text-brand-cream/40 mt-0.5">
                From Clients Into Income
              </div>
            </a>
            <a
              href="/book-display.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/30 transition-colors"
            >
              <div className="flex items-center justify-center h-40 mb-3">
                <Image
                  src="/book-display.jpg"
                  alt="Crazy Simple YouTube lifestyle shot"
                  width={140}
                  height={210}
                  className="h-full w-auto rounded shadow-lg"
                />
              </div>
              <div className="font-body font-semibold text-sm text-brand-cream group-hover:text-brand-red transition-colors">
                Lifestyle Display
              </div>
              <div className="font-body text-xs text-brand-cream/40 mt-0.5">
                Marketing photo
              </div>
            </a>
          </div>

          {/* Headshot placeholder */}
          <div className="mt-4 p-5 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.12]">
            <div className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-brand-cream/40 font-bold mb-2">
              Headshots
            </div>
            <p className="font-body text-sm text-brand-cream/55 leading-relaxed">
              Multiple high-res headshots (light and dark backgrounds) available
              on request. Email{' '}
              <a
                href="mailto:ac@aaroncuha.com?subject=Press%20Kit%20—%20Headshot%20Request"
                className="text-brand-red hover:text-brand-red-light underline underline-offset-2"
              >
                ac@aaroncuha.com
              </a>{' '}
              and we&apos;ll send a Dropbox link the same day.
            </p>
          </div>
        </section>

        {/* ===== Channels ===== */}
        <section className="relative max-w-4xl mx-auto px-5 sm:px-8 mb-16">
          <div className="mb-6">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Section 07
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Channels & Profiles
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/30 transition-colors"
              >
                <div>
                  <div className="font-body font-semibold text-sm text-brand-cream group-hover:text-brand-red transition-colors">
                    {c.label}
                  </div>
                  {c.followers && (
                    <div className="font-body text-xs text-brand-cream/40 mt-0.5">
                      {c.followers}
                    </div>
                  )}
                </div>
                <svg
                  className="w-4 h-4 text-brand-cream/30 group-hover:text-brand-red transition-colors flex-shrink-0"
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
              </a>
            ))}
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-brand-red/[0.14] to-brand-red/[0.03] border border-brand-red/25 p-7 sm:p-10 text-center">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-bold">
              Press Contact
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              Get In Touch
            </h2>
            <p className="mt-4 font-body text-brand-cream/70 leading-relaxed">
              For interview requests, advance copies, or anything else, email{' '}
              <a
                href="mailto:ac@aaroncuha.com?subject=Press%20Inquiry%20—%20Crazy%20Simple%20YouTube"
                className="text-brand-red font-semibold underline underline-offset-2 hover:text-brand-red-light"
              >
                ac@aaroncuha.com
              </a>
              . Aaron and the team respond within 24 hours.
            </p>
            <a
              href="mailto:ac@aaroncuha.com?subject=Press%20Inquiry%20—%20Crazy%20Simple%20YouTube"
              className="mt-6 inline-flex items-center gap-2 px-7 py-4 bg-brand-red text-white font-body font-bold text-base rounded-xl hover:bg-brand-red-light transition-colors shadow-lg shadow-brand-red/25"
            >
              Email the Team
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
