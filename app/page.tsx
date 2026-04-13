import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SocialProof from '@/components/SocialProof'
import Testimonials from '@/components/Testimonials'
import WhatsInside from '@/components/WhatsInside'
import ValueLadder from '@/components/ValueLadder'
import AboutAuthor from '@/components/AboutAuthor'
import EmailCapture from '@/components/EmailCapture'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <SocialProof />
      <Testimonials />
      <WhatsInside />
      <ValueLadder />
      <AboutAuthor />
      <EmailCapture />
      <Footer />
    </main>
  )
}
