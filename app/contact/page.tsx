import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import ContactFAQ from '@/components/contact/ContactFAQ'
import ContactHero from '@/components/contact/Hero'
import ContactMethods from '@/components/contact/ContactMethods'
import DemoForm from '@/components/contact/DemoForm'
import EnquiryTypes from '@/components/contact/EnquiryTypes'
import Locations from '@/components/contact/Locations'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function ContactRoute() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <ContactHero />
        <ContactMethods />
        <DemoForm />
        <Locations />
        <EnquiryTypes />
        <ContactFAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
