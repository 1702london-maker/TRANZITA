import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import AboutHero from '@/components/about/Hero'
import FounderStory from '@/components/about/FounderStory'
import ParentThoughtJourney from '@/components/about/ParentThoughtJourney'
import BudruumPartnership from '@/components/about/BudruumPartnership'
import BritishNigerianConnection from '@/components/about/BritishNigerianConnection'
import WhatBudruumBuilt from '@/components/about/WhatBudruumBuilt'
import ThisIsForNigeria from '@/components/about/ThisIsForNigeria'
import TheNumbers from '@/components/about/TheNumbers'
import TheVision from '@/components/about/TheVision'
import GetInvolved from '@/components/about/GetInvolved'

export default function AboutPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <AboutHero />
        <FounderStory />
        <ParentThoughtJourney />
        <BudruumPartnership />
        <BritishNigerianConnection />
        <WhatBudruumBuilt />
        <ThisIsForNigeria />
        <TheNumbers />
        <TheVision />
        <GetInvolved />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
