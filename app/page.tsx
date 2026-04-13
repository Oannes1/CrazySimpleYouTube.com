import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import ProblemAgitation from '@/components/ProblemAgitation'
import CompoundEffect from '@/components/CompoundEffect'
import Results from '@/components/Results'
import Testimonials from '@/components/Testimonials'
import MythBuster from '@/components/MythBuster'
import WhatsInside from '@/components/WhatsInside'
import AboutAuthor from '@/components/AboutAuthor'
import ValueLadder from '@/components/ValueLadder'
import Urgency from '@/components/Urgency'
import EmailCapture from '@/components/EmailCapture'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <SocialProof />
      <ProblemAgitation />
      <CompoundEffect />
      <Results />
      <Testimonials />
      <MythBuster />
      <WhatsInside />
      <AboutAuthor />
      <ValueLadder />
      <Urgency />
      <EmailCapture />
      <Footer />
    </main>
  )
}
