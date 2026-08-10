'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Building2, Home, School, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['School Premises Charging', School, 'Schools with secure overnight parking can host a Tranzita charging point installed, maintained and operated by Tranzita.'],
  ['Estate Partnerships', Home, 'Residential estates with secure parking can host charging infrastructure and give residents priority access to Tranzita school transport.'],
  ['Commercial Property Partnerships', Building2, 'Commercial properties in operating cities can host unobtrusive overnight charging at no installation cost to the property owner.'],
]

export default function PartnerWithUs() {
  return (
    <>
      <Section background="#F1F6EA" label="Partner With Us" title="Does your school or estate have space for a Tranzita charging point?" text="We are seeking premises partnerships for overnight bus charging infrastructure across Nigeria.">
        <div id="partner"><IconCards cards={cards} /></div>
      </Section>
      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        {[0, 1, 2].map((i) => <div key={i} className="absolute bus-silhouette opacity-10" style={{ top: 30 + i * 52, left: 0, ['--dur' as string]: `${18 + i * 5}s`, ['--delay' as string]: `${i * -4}s` }}><svg width="180" height="54" viewBox="0 0 180 54"><rect x="0" y="9" width="160" height="35" rx="8" fill="#183024" /><circle cx="34" cy="48" r="6" fill="#183024" /><circle cx="126" cy="48" r="6" fill="#183024" /></svg></div>)}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }}>The safest fleet on Nigerian school roads.</h2>
          <p className="text-lg mb-8" style={{ color: '#65785F' }}>See the bus, meet the team, and watch the platform in a 30 minute live demo for your school.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/partners" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold" style={{ background: '#D96B1F' }}>Partner With Us <ArrowRight size={18} /></a>
            <a href="/for-schools" className="px-7 py-4 rounded-full border font-semibold" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Register Your School</a>
          </div>
        </div>
      </section>
    </>
  )
}
