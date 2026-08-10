'use client'

import { useState } from 'react'
import BottomPortalBar from '@/components/BottomPortalBar'
import ChatWidget from '@/components/ChatWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import AccordionFAQ from '@/components/faq/AccordionFAQ'
import ContactCards from '@/components/faq/ContactCards'
import FAQHero from '@/components/faq/Hero'
import FeaturedQuestions from '@/components/faq/FeaturedQuestions'
import type { FAQFilter } from '@/lib/faq-data'

export default function FAQPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<FAQFilter>('All Questions')

  return (
    <>
      <StickyBar />
      <Navbar />
      <main>
        <FAQHero
          search={search}
          setSearch={setSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <FeaturedQuestions search={search} activeCategory={activeCategory} />
        <AccordionFAQ search={search} activeCategory={activeCategory} />
        <ContactCards />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
      <BottomPortalBar />
    </>
  )
}
