'use client'
import StickyBar from '@/components/StickyBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BottomPortalBar from '@/components/BottomPortalBar'
import PageHero from '@/components/how-it-works/PageHero'
import ProblemClock from '@/components/how-it-works/ProblemClock'
import HorizontalJourneyTrack from '@/components/how-it-works/HorizontalJourneyTrack'
import DriverAppScreens from '@/components/how-it-works/DriverAppScreens'
import CoDriverTimeline from '@/components/how-it-works/CoDriverTimeline'
import NurseSection from '@/components/how-it-works/NurseSection'
import EmergencyScenarios from '@/components/how-it-works/EmergencyScenarios'
import ParentPortalWalkthrough from '@/components/how-it-works/ParentPortalWalkthrough'
import SchoolDashboardMockup from '@/components/how-it-works/SchoolDashboardMockup'
import GettingStarted from '@/components/how-it-works/GettingStarted'

export default function HowItWorksPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main style={{ paddingBottom: 90 }}>
        <PageHero />
        <ProblemClock />
        <HorizontalJourneyTrack />
        <DriverAppScreens />
        <CoDriverTimeline />
        <NurseSection />
        <EmergencyScenarios />
        <ParentPortalWalkthrough />
        <SchoolDashboardMockup />
        <GettingStarted />
      </main>
      <Footer />
      <BottomPortalBar />
    </>
  )
}
