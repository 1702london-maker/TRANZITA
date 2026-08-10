import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import AlertsWalkthrough from '@/components/for-parents/AlertsWalkthrough'
import BeforeAfter from '@/components/for-parents/BeforeAfter'
import ChildSafety from '@/components/for-parents/ChildSafety'
import GettingStarted from '@/components/for-parents/GettingStarted'
import ParentHero from '@/components/for-parents/Hero'
import LiveTracking from '@/components/for-parents/LiveTracking'
import StayingConnected from '@/components/for-parents/StayingConnected'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ForParentsRoute() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <ParentHero />
        <BeforeAfter />
        <AlertsWalkthrough />
        <LiveTracking />
        <ChildSafety />
        <StayingConnected />
        <GettingStarted />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
