import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import ETAEngine from '@/components/live-tracking/ETAEngine'
import GPSSystem from '@/components/live-tracking/GPSSystem'
import LiveTrackingHero from '@/components/live-tracking/Hero'
import LiveMapSection from '@/components/live-tracking/LiveMapSection'
import OpenSourceStack from '@/components/live-tracking/OpenSourceStack'
import SchoolDashboard from '@/components/live-tracking/SchoolDashboard'
import SignalChain from '@/components/live-tracking/SignalChain'
import WhatsAppJourney from '@/components/live-tracking/WhatsAppJourney'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function LiveTrackingRoute() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <LiveTrackingHero />
        <LiveMapSection />
        <SignalChain />
        <WhatsAppJourney />
        <GPSSystem />
        <ETAEngine />
        <SchoolDashboard />
        <OpenSourceStack />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
