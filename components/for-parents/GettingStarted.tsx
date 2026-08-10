'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Section } from './Shared'

const steps = [
  ['Your School Registers', 'Tranzita works with schools, not individual families. Ask your principal or transport coordinator about Tranzita and share the school registration page.'],
  ['Register Your Child', 'Once your school is registered, you receive a WhatsApp registration link for your child, home address and verified guardian details.'],
  ['Verify Your Guardians', 'Each guardian is verified with photo ID and school countersignature. Verification usually takes 24 to 48 hours.'],
  ['Save The Tranzita Number', 'From the first morning your child travels, crew briefings, journey alerts and summaries come from the Tranzita operations number.'],
] as const

export default function GettingStarted() {
  return (
    <>
      <Section background="#F1F6EA" label="Getting Started" title="Your child could be on a Tranzita bus within one week." text="As a parent your role is simple. Here is exactly what you need to do.">
        <div className="grid md:grid-cols-4 gap-5">
          {steps.map(([title, body], i) => (
            <motion.div key={title} className="gradient-frame rounded-2xl p-6 text-center" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center text-white font-extrabold" style={{ background: '#D96B1F' }}>{i + 1}</div>
              <h3 className="font-extrabold text-xl mb-3" style={{ color: '#183024' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        {[0, 1, 2].map((i) => <div key={i} className="absolute bus-silhouette opacity-10" style={{ top: 30 + i * 52, left: 0, ['--dur' as string]: `${18 + i * 5}s`, ['--delay' as string]: `${i * -4}s` }}><svg width="180" height="54" viewBox="0 0 180 54"><rect x="0" y="9" width="160" height="35" rx="8" fill="#183024" /><circle cx="34" cy="48" r="6" fill="#183024" /><circle cx="126" cy="48" r="6" fill="#183024" /></svg></div>)}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }}>Give your child the safest journey home in Nigeria.</h2>
          <p className="text-lg mb-8" style={{ color: '#65785F' }}>Talk to your school about Tranzita today.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/#demo" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold" style={{ background: '#D96B1F' }}>Tell My School About Tranzita <ArrowRight size={18} /></a>
            <a href="/#demo" className="px-7 py-4 rounded-full border font-semibold" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Download The Parent Guide</a>
          </div>
        </div>
      </section>
    </>
  )
}
