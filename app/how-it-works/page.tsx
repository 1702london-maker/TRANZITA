import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import CrewCards from '@/components/how-it-works/CrewCards'
import GetStarted from '@/components/how-it-works/GetStarted'
import HowItWorksHero from '@/components/how-it-works/Hero'
import JourneyTimeline from '@/components/how-it-works/JourneyTimeline'
import ParentExperience from '@/components/how-it-works/ParentExperience'
import ScenarioCards from '@/components/how-it-works/ScenarioCards'
import TechCards from '@/components/how-it-works/TechCards'
import VettingStages from '@/components/how-it-works/VettingStages'

export default function HowItWorksPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <HowItWorksHero />
        <JourneyTimeline />
        <CrewCards />
        <VettingStages />
        <TechCards />
        <ParentExperience />
        <ScenarioCards />
        <GetStarted />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
