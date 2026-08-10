import BottomPortalBar from '@/components/BottomPortalBar'
import ApplicationForm from '@/components/careers/ApplicationForm'
import CareersHero from '@/components/careers/Hero'
import CrewQuotes from '@/components/careers/CrewQuotes'
import OpenRoles from '@/components/careers/OpenRoles'
import VettingProcess from '@/components/careers/VettingProcess'
import WhyTranzita from '@/components/careers/WhyTranzita'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function CareersRoute() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <CareersHero />
        <WhyTranzita />
        <OpenRoles />
        <VettingProcess />
        <CrewQuotes />
        <ApplicationForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
