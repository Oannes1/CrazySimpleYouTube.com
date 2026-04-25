import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Crazy Simple YouTube',
  description:
    'Privacy policy for crazysimpleyoutube.com. How we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-brand-charcoal pt-28 sm:pt-32 pb-16">
        <article className="max-w-3xl mx-auto px-5 sm:px-8 prose prose-invert">
          <header className="mb-12">
            <span className="font-body text-xs tracking-[0.25em] uppercase text-brand-red font-medium">
              Legal
            </span>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-normal uppercase text-brand-cream">
              Privacy Policy
            </h1>
            <p className="mt-4 font-body text-brand-cream/40 text-sm">
              Last updated: April 2026
            </p>
          </header>

          <div className="space-y-8 font-body text-brand-cream/70 leading-relaxed text-[0.95rem]">
            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Who We Are
              </h2>
              <p>
                This site (crazysimpleyoutube.com) is operated by Haymaker LLC,
                publisher of <em>Crazy Simple YouTube</em> by Aaron Cuha. When
                we say &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;
                we mean Haymaker LLC.
              </p>
              <p className="mt-3">
                If you have questions about your privacy, email{' '}
                <a
                  href="mailto:privacy@aaroncuha.com"
                  className="text-brand-red hover:text-brand-red-light underline"
                >
                  privacy@aaroncuha.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                What We Collect
              </h2>
              <p>We collect information in two ways:</p>
              <p className="mt-3">
                <strong className="text-brand-cream">
                  Information you give us directly.
                </strong>{' '}
                When you sign up for the Chapter Companion Kit, the worksheet
                bundle, the prompt library, the community waitlist, or any
                book launch list, we collect your first name and email address.
                When you book a discovery call or sign up for coaching, we may
                also collect your business name, business type, and revenue
                range. When you make a purchase, our payment processor (Stripe)
                collects your payment information. We never see or store your
                full credit card number.
              </p>
              <p className="mt-3">
                <strong className="text-brand-cream">
                  Information collected automatically.
                </strong>{' '}
                When you visit the site, we collect standard analytics data:
                pages viewed, time on page, referring source, device type,
                approximate location (city level). We use Google Analytics 4
                for this. We do not collect personally identifying information
                through analytics.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To deliver the worksheets, prompts, or other resources you requested.</li>
                <li>To send you the welcome sequence and ongoing emails about the book, community, and related resources.</li>
                <li>To process payments for the community, coaching, or other paid services.</li>
                <li>To improve the site, fix bugs, and understand which content readers value most.</li>
                <li>To prevent fraud and abuse.</li>
              </ul>
              <p className="mt-3">
                We do not sell your personal information. We do not rent your
                email list. We do not share your information with third parties
                for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Service Providers
              </h2>
              <p>
                We use the following third-party services to operate the site:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-brand-cream">Brevo</strong> for email
                  delivery and contact management.
                </li>
                <li>
                  <strong className="text-brand-cream">Stripe</strong> for payment processing.
                </li>
                <li>
                  <strong className="text-brand-cream">Vercel</strong> for hosting.
                </li>
                <li>
                  <strong className="text-brand-cream">Google Analytics</strong> for traffic analytics.
                </li>
                <li>
                  <strong className="text-brand-cream">Supabase</strong> for backend data and analytics.
                </li>
                <li>
                  <strong className="text-brand-cream">Bitly</strong> for link tracking on affiliate links.
                </li>
              </ul>
              <p className="mt-3">
                Each of these has its own privacy policy. We only share what is
                necessary for them to perform their service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Affiliate Disclosure
              </h2>
              <p>
                Our /gear page and some other pages include affiliate links to
                products on Amazon and other retailers. If you buy through one
                of these links, we earn a small commission at no extra cost to
                you. We only recommend products Aaron personally uses or has
                tested with clients. Affiliate revenue helps keep this site,
                the worksheets, and the prompt library free.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Cookies
              </h2>
              <p>
                We use cookies for two things: keeping you logged into the
                community when applicable, and remembering that you&apos;ve
                already opted in for downloads so you don&apos;t have to enter
                your email twice. We also use Google Analytics cookies for
                traffic analytics. You can disable cookies in your browser
                settings, but some features may not work correctly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Your Choices
              </h2>
              <p>You can:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Unsubscribe from any email by clicking the unsubscribe link
                  at the bottom of every email we send.
                </li>
                <li>
                  Request a copy of all data we have on you by emailing{' '}
                  <a
                    href="mailto:privacy@aaroncuha.com"
                    className="text-brand-red hover:text-brand-red-light underline"
                  >
                    privacy@aaroncuha.com
                  </a>
                  .
                </li>
                <li>
                  Request that we delete all of your data. We will, except for
                  records we&apos;re required to keep for tax or legal
                  compliance reasons.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Data Security
              </h2>
              <p>
                We use industry-standard security: HTTPS everywhere, encrypted
                databases, restricted access to systems, and reputable service
                providers. No system is completely secure. If a breach occurs
                that affects your data, we will notify you promptly.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Children
              </h2>
              <p>
                This site and its services are not directed at children under
                13. We do not knowingly collect data from children under 13. If
                you believe a child has submitted information to us, contact us
                and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Changes
              </h2>
              <p>
                We may update this policy from time to time. The &ldquo;Last
                updated&rdquo; date at the top reflects the most recent change.
                Material changes will be communicated via email to active
                subscribers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-normal uppercase text-brand-cream mb-3">
                Contact
              </h2>
              <p>
                Questions, requests, or complaints? Email{' '}
                <a
                  href="mailto:privacy@aaroncuha.com"
                  className="text-brand-red hover:text-brand-red-light underline"
                >
                  privacy@aaroncuha.com
                </a>
                . We respond within 5 business days.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
