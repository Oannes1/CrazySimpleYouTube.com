import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LeadCaptureForm from '@/components/LeadCaptureForm'

export const metadata: Metadata = {
  title: 'The Crazy Simple YouTube Community | Aaron Cuha',
  description:
    'Get feedback on your channel, ask questions, connect with creators. The Systems Over Hustle community where the strategies in Crazy Simple YouTube turn into real results. $99 a month.',
}

const COMMUNITY_URL = 'https://www.aaroncuha.com/community'

const benefits = [
  {
    title: 'Monthly live Q&A',
    desc: 'Thursdays at 10am Mountain. Bring your channel, your titles, your hooks. Aaron answers your specific questions.',
  },
  {
    title: 'Plug-and-play templates',
    desc: 'Content calendars, workflows, frameworks, and SOPs Aaron uses on his own channels.',
  },
  {
    title: 'Peer accountability pods',
    desc: 'Smaller cohorts within the community. Weekly check-ins. Real progress, not vibes.',
  },
  {
    title: 'Advanced workshops',
    desc: 'Behind-the-scenes content, deep dives, and walk-throughs reserved for members only.',
  },
  {
    title: '12 organized channels',
    desc: 'Topic-specific feeds: titles, thumbnails, lead gen, scripting, retention. Find what you need fast.',
  },
  {
    title: 'Early book chapter access',
    desc: 'Read new chapters from upcoming books before they hit Amazon.',
  },
  {
    title: 'Audio editions',
    desc: 'Every new release available as audio for the car, the gym, and the commute.',
  },
  {
    title: 'First access to everything',
    desc: 'Courses, tools, and any new offering goes to community members first, often at founding pricing.',
  },
]

const isFor = [
  'You bought the book and you\'re actually doing the work.',
  'You want feedback on your titles, thumbnails, and hooks before you publish.',
  'You want to see what\'s working for other creators in your niche right now.',
  'You want monthly live calls with Aaron answering your specific questions.',
]

const isNotFor = [
  'You\'re looking for a hangout. We track wins, not vibes.',
  'You haven\'t started yet and you\'re hoping the community will motivate you. Start filming first.',
  'You expect Aaron to build your channel for you. That\'s the YouTube management service.',
]

const faqs = [
  {
    q: 'How is this different from just watching YouTube videos?',
    a: 'Aaron\'s free YouTube content teaches the strategy. The community is where you implement it with help. Feedback, accountability, and live answers to your specific questions.',
  },
  {
    q: 'Do I have to be a beginner?',
    a: 'No. The community has people from 0 subscribers to 100,000+. Members are matched into peer cohorts at similar levels.',
  },
  {
    q: 'What if I don\'t have time?',
    a: 'Asynchronous by design. Live calls are recorded. Office hours are written Q&A. Show up when you can.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes, anytime. No contracts. No phone call required. One-click cancel.',
  },
  {
    q: 'Is this just for real estate agents?',
    a: 'No. The book is written for any business owner. The community has agents, mortgage brokers, coaches, consultants, attorneys, financial advisors, and creators across niches.',
  },
  {
    q: 'When does it launch?',
    a: 'It is open now, in beta, and we are letting people in a group at a time so the coaching calls stay small. Waitlist goes first, in order. Founding members lock in $99/mo for as long as they stay. The waitlist is just a sign up, no payment.',
  },
]

export default function CommunityPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16 noise-overlay">
        {/* Hero */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="text-center">
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              Systems Over Hustle Community
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-normal uppercase text-brand-cream leading-[0.95]">
              Don&apos;t Build <span className="text-brand-red">Alone</span>
            </h1>
            <p className="mt-6 text-brand-cream/60 font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Get feedback on your channel. Ask questions. Connect with creators
              who are building alongside you. The community is where the
              strategies in <em>Crazy Simple YouTube</em> turn into real results.
            </p>

            {/* Waitlist card */}
            <div className="mt-10 max-w-md mx-auto p-7 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
                The Waitlist
              </div>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream">
                Waitlist Open
                <br />
                <span className="text-brand-red">Onboarding In Waves</span>
              </h3>
              <p className="mt-4 font-body text-sm text-brand-cream/60 leading-relaxed">
                Sign up for the waitlist now. No payment. No card.{' '}
                <strong className="text-brand-cream font-semibold">
                  Founding members lock in $99/mo, frozen for as long as they
                  stay
                </strong>{' '}
                (or $999/yr, which is one month free).
              </p>

              {/* Inline waitlist form */}
              <div className="mt-6 text-left">
                <LeadCaptureForm
                  tags={['src_community', 'community_waitlist']}
                  listIds={[25]}
                  ctaLabel="Get on the Waitlist"
                  successHeading="On the list."
                  successText="You're on the list. You get an invite before the doors open publicly."
                />
              </div>

              <p className="mt-4 font-body text-xs text-brand-cream/40 text-center">
                Just a sign up. No payment until doors open.
              </p>
            </div>
          </div>
        </section>

        {/* Book promo */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="rounded-2xl bg-gradient-to-br from-brand-red/[0.08] to-brand-red/[0.02] border border-brand-red/15 p-7 sm:p-10">
            <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold">
              Bought the Book?
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-normal uppercase text-brand-cream">
              Get 3 Months Free <span className="text-brand-red">+ 3 Months Group Coaching</span>
            </h2>
            <p className="mt-4 font-body text-brand-cream/70 leading-relaxed">
              If you bought <em>Crazy Simple YouTube</em>, your first 3 months
              in the community are on us, plus 3 months of group coaching. Drop
              your email below and we&apos;ll send your invite the day the
              community opens.
            </p>

            <div className="mt-6 max-w-md">
              <LeadCaptureForm
                tags={['src_community', 'community_waitlist', 'book_owner_unverified']}
                listIds={[25]}
                ctaLabel="Claim My 3 Months Free"
                successHeading="On the list."
                successText="We'll email you the day the community opens with your invite link."
              />
            </div>
            <p className="mt-3 font-body text-xs text-brand-cream/30">
              Honor system for now. We may verify Amazon order ID closer to launch.
            </p>
          </div>
        </section>

        {/* Who this is for */}
        <section className="relative max-w-5xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-red font-bold mb-4">
                ✓ This Is For You If
              </div>
              <ul className="space-y-3">
                {isFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-brand-cream/70 text-sm leading-relaxed"
                  >
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-red/70 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="font-body text-xs tracking-[0.2em] uppercase text-brand-cream/40 font-bold mb-4">
                ✕ This Is Not For You If
              </div>
              <ul className="space-y-3">
                {isNotFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-brand-cream/50 text-sm leading-relaxed"
                  >
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand-cream/30 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="relative max-w-6xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <div className="text-center mb-10">
            <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-brand-red font-medium">
              The 8 Pillars
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream">
              What You Get
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-brand-red/15 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-red/10 flex items-center justify-center text-brand-red font-display text-base">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 font-body font-bold text-brand-cream text-base">
                  {b.title}
                </h3>
                <p className="mt-2 font-body text-sm text-brand-cream/50 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative max-w-3xl mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
          <h2 className="font-display text-3xl sm:text-4xl font-normal uppercase text-brand-cream mb-8">
            Common Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 sm:px-7 py-5 font-body font-semibold text-brand-cream/80 hover:text-brand-cream transition-colors flex items-center justify-between gap-4">
                  <span>{f.q}</span>
                  <svg
                    className="w-5 h-5 text-brand-cream/30 transition-transform group-open:rotate-180 flex-shrink-0"
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
                <div className="px-5 sm:px-7 pb-6 font-body text-sm text-brand-cream/55 leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA — waitlist focused */}
        <section className="relative max-w-2xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal uppercase text-brand-cream leading-[0.95]">
              Stop Building <span className="text-brand-red">Alone.</span>
            </h2>
            <p className="mt-4 font-body text-brand-cream/55">
              Open now and onboarding in waves. Sign up free, lock in founding pricing
              when the community opens.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-7 sm:p-9">
            <LeadCaptureForm
              tags={['src_community', 'community_waitlist']}
              listIds={[25]}
              ctaLabel="Get on the Waitlist"
              successHeading="On the list."
              successText="You're on the list. You get an invite before the doors open publicly."
            />
          </div>

          <p className="mt-5 font-body text-xs text-brand-cream/35 text-center">
            Just a sign up. No payment now. Read more at{' '}
            <a
              href={COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-cream/55 underline hover:text-brand-cream"
            >
              aaroncuha.com/community
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
