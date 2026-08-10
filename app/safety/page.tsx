import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SafetyPage from '@/components/safety/SafetyPage'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function SafetyRoute() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <SafetyPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
