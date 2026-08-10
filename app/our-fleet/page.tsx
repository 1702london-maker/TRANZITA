import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import FleetExpansion from '@/components/our-fleet/FleetExpansion'
import FleetHero from '@/components/our-fleet/Hero'
import FleetSafety from '@/components/our-fleet/FleetSafety'
import MadeInNigeria from '@/components/our-fleet/MadeInNigeria'
import PartnerWithUs from '@/components/our-fleet/PartnerWithUs'
import VehicleSpec from '@/components/our-fleet/VehicleSpec'
import WhyElectric from '@/components/our-fleet/WhyElectric'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function OurFleetRoute() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <FleetHero />
        <WhyElectric />
        <VehicleSpec />
        <MadeInNigeria />
        <FleetSafety />
        <FleetExpansion />
        <PartnerWithUs />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
