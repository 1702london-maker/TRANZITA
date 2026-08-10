import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import ForSchoolsPage from '@/components/for-schools/ForSchoolsPage'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ForSchoolsRoute() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <ForSchoolsPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
