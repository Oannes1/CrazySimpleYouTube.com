import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Crazy Simple YouTube',
  description:
    'Terms of service for crazysimpleyoutube.com.',
}

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16">
        <article className="max-w-3xl mx-auto px-5 sm:px-8">
          <header className="mb-12">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Legal
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-normal uppercase text-brand-cream">
              Terms of Service
            </h1>
            <p className="mt-4 font-body text-brand-cream/40 text-sm">
              Last updated: April 2026
            </p>
          </header>

          <div className="space-y-8 font-body text-brand-cream/70 leading-relaxed text-[0.95rem]">
            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Agreement
              </h2>
              <p>
                By using crazysimpleyoutube.com (the &ldquo;Site&rdquo;), you
                agree to these terms. If you don&apos;t agree, don&apos;t use
                the Site. Simple as that.
              </p>
              <p className="mt-3">
                The Site is operated by Haymaker LLC.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                What You Get
              </h2>
              <p>
                The Site provides free resources (worksheets, prompts, gear
                recommendations), email-gated downloads, paid community access,
                paid coaching services, and information about books authored by
                Aaron Cuha.
              </p>
              <p className="mt-3">
                Free resources are provided as is, with no warranty. Paid
                services have their own terms attached at point of purchase.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Intellectual Property
              </h2>
              <p>
                All content on this Site (including the book content,
                worksheets, prompts, equipment recommendations, written copy,
                logos, and design) is owned by Haymaker LLC or licensed to us.
                You may use the worksheets, prompts, and other downloads for
                your own personal or business use. You may not redistribute,
                resell, repackage, or republish them without written
                permission.
              </p>
              <p className="mt-3">
                The book <em>Crazy Simple YouTube</em> is copyrighted &copy;
                2026 Aaron Cuha. All rights reserved.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Affiliate Links
              </h2>
              <p>
                Some links on this Site (especially on the /gear page) are
                affiliate links. If you click through and make a purchase, we
                may earn a commission. This costs you nothing extra. We only
                recommend products we&apos;ve personally tested or that clients
                have used successfully.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Results Disclaimer
              </h2>
              <p>
                The case studies, testimonials, and revenue numbers shown on
                this Site are real results from real people, but they are not
                typical and not guaranteed. Your results depend on your skill,
                your effort, your market, and a hundred other factors we
                don&apos;t control. We are not promising you will achieve the
                same results.
              </p>
              <p className="mt-3">
                Nothing on this Site is financial, legal, or tax advice. Talk
                to a qualified professional for those.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Refunds
              </h2>
              <p>
                Refund policy depends on what you purchased:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-brand-cream">Community membership:</strong>{' '}
                  Cancel anytime, no refund on the current month. The next
                  billing cycle stops automatically.
                </li>
                <li>
                  <strong className="text-brand-cream">Coaching tiers:</strong>{' '}
                  See the specific service agreement signed at purchase.
                  Generally: cancel future months anytime, no refund on the
                  current month.
                </li>
                <li>
                  <strong className="text-brand-cream">Books:</strong> Returns
                  go through the retailer (Amazon, etc.) per their policies.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Haymaker LLC and Aaron
                Cuha are not liable for any indirect, incidental, special, or
                consequential damages arising from your use of this Site or any
                services provided through it. Our total liability is capped at
                the amount you have paid us in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Acceptable Use
              </h2>
              <p>
                Don&apos;t do illegal stuff. Don&apos;t harass other community
                members. Don&apos;t scrape the Site. Don&apos;t try to break
                into our systems. Don&apos;t reuse our content commercially
                without permission. Violation of these terms may result in
                immediate cancellation of access without refund.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Changes
              </h2>
              <p>
                We may update these terms. Material changes will be
                communicated by email to active subscribers and members. The
                &ldquo;Last updated&rdquo; date at the top reflects the most
                recent change.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Governing Law
              </h2>
              <p>
                These terms are governed by the laws of the State of Utah,
                United States, without regard to conflict of law principles.
                Any disputes will be resolved in the state or federal courts
                located in Utah.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Contact
              </h2>
              <p>
                Questions about these terms? Email{' '}
                <a
                  href="mailto:privacy@aaroncuha.com"
                  className="text-brand-red hover:text-brand-red-light underline"
                >
                  privacy@aaroncuha.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
