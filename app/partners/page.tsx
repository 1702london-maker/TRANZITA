import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import ApplicationForm from '@/components/partners/ApplicationForm'
import ClosingSection from '@/components/partners/ClosingSection'
import HowItWorks from '@/components/partners/HowItWorks'
import PartnerPortal from '@/components/partners/PartnerPortal'
import PartnerSafeguards from '@/components/partners/PartnerSafeguards'
import PartnersHero from '@/components/partners/Hero'
import PartnershipTiers from '@/components/partners/PartnershipTiers'
import TheOpportunity from '@/components/partners/TheOpportunity'
import VehicleVetting from '@/components/partners/VehicleVetting'

export default function PartnersPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <PartnersHero />
        <TheOpportunity />
        <PartnershipTiers />
        <VehicleVetting />
        <PartnerPortal />
        <HowItWorks />
        <PartnerSafeguards />
        <ApplicationForm />
        <ClosingSection />
      </main>
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
