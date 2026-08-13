'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Section, whatsapp } from './Shared'

const faqs = [
  ['How quickly can my school be live on Tranzita?', 'From contract signing to first live route takes 10 working days. This includes student registration, route mapping, crew assignment, parent onboarding, and a full test run before the first live day.'],
  ['Do parents need to download an app?', 'No app store download is needed. Parents use the Tranzita PWA in their phone browser for live tracking, ETA, pickup and drop-off status. WhatsApp and ZITA are for support, complaints and escalation.'],
  ['Is Tranzita available in my city?', 'Tranzita is now operating in Lagos. Abuja and Port Harcourt are coming soon. Other cities can register interest and the team will contact you when route planning opens there.'],
  ['How much does Tranzita cost?', 'Tranzita bills per student per term. The exact rate depends on school location, student count and route complexity. Request a demo call for a personalised quote.'],
  ['Can we visit a depot before signing?', 'Yes. School administrators and principals can visit Lagos operations by appointment. Abuja and Port Harcourt visits will open when those cities launch. Contact the team via email or WhatsApp to arrange a visit.'],
  ['What happens if we want to cancel?', 'Tranzita contracts are structured per academic term. Your school can end the programme at the end of any term with notice before the next term starts.'],
  ['Is Tranzita insured?', 'Yes. Tranzita operates with comprehensive commercial vehicle insurance covering passengers on every route. Documentation is available in the due diligence pack.'],
  ['Can Tranzita handle over 500 students?', 'Yes. Larger schools receive dedicated fleet allocation, a named school relationship manager and volume pricing. Contact us to discuss your scale.'],
]

export default function ContactFAQ() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <Section background="#FFF9F2" label="FAQ" title="Quick answers before you get in touch.">
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map(([q, a], i) => (
            <div key={q} className="rounded-2xl bg-white border border-[#DDE9D2] overflow-hidden">
              <button className="w-full flex items-center justify-between gap-4 p-5 text-left" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="font-extrabold" style={{ color: '#183024' }}>{q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }}><ChevronDown size={20} color="#D96B1F" /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className="px-5 pb-5 leading-relaxed" style={{ color: '#65785F' }}>{a}</p></motion.div>}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>
      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        {[0, 1, 2].map((i) => <div key={i} className="absolute bus-silhouette opacity-10" style={{ top: 30 + i * 52, left: 0, ['--dur' as string]: `${18 + i * 5}s`, ['--delay' as string]: `${i * -4}s` }}><svg width="180" height="54" viewBox="0 0 180 54"><rect x="0" y="9" width="160" height="35" rx="8" fill="#183024" /><circle cx="34" cy="48" r="6" fill="#183024" /><circle cx="126" cy="48" r="6" fill="#183024" /></svg></div>)}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }}>Ready to talk?</h2>
          <p className="text-lg mb-8" style={{ color: '#65785F' }}>WhatsApp us, book a demo, or send us an email. A real person will respond. Fast.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={whatsapp} className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold" style={{ background: '#25D366' }}>Open WhatsApp <ArrowRight size={18} /></a>
            <a href="#demo-form" className="px-7 py-4 rounded-full border font-semibold" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Book A Demo</a>
          </div>
        </div>
      </section>
    </>
  )
}
