import StickyBar from '@/components/StickyBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsStrip from '@/components/StatsStrip'
import HowItWorks from '@/components/HowItWorks'
import CasualtiesStats from '@/components/CasualtiesStats'
import TimeComparison from '@/components/TimeComparison'
import LiveTracking from '@/components/LiveTracking'
import DriverSafety from '@/components/DriverSafety'
import BusExperience from '@/components/BusExperience'
import NigeriaFleet from '@/components/NigeriaFleet'
import ForSchools from '@/components/ForSchools'
import ForParents from '@/components/ForParents'
import OpenSourceStack from '@/components/OpenSourceStack'
import AppExperience from '@/components/AppExperience'
import RequestDemo from '@/components/RequestDemo'
import RegisterCTA from '@/components/RegisterCTA'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ChatWidget from '@/components/ChatWidget'
import BottomPortalBar from '@/components/BottomPortalBar'

export default function Page() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingBottom: 90 }}>
        <Hero />
        <StatsStrip />
        <HowItWorks />
        <CasualtiesStats />
        <TimeComparison />
        <LiveTracking />
        <DriverSafety />
        <BusExperience />
        <NigeriaFleet />
        <ForSchools />
        <ForParents />
        <AppExperience />
        <OpenSourceStack />
        <RequestDemo />
        <RegisterCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
