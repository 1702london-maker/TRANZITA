'use client'

import { ArrowRight, BellRing, Database, Eye, Lock, MapPinned, ShieldCheck, type LucideIcon } from 'lucide-react'
import { IconCards, Section } from './Shared'

const cards: Array<[string, LucideIcon, string]> = [
  ['Private Tracking Links', Lock, 'Every parent tracking link is created for an active journey and is designed to show only the information needed for that child route.'],
  ['Verified Position Data', ShieldCheck, 'Bus location is checked against the planned route before it appears on the parent map or school dashboard.'],
  ['Operations Watching', Eye, 'The operations team sees alerts for unusual stops, route deviations, missed taps, and speed events as they happen.'],
  ['PWA Journey Checkpoints', BellRing, 'Parents see the important journey moments in the PWA, while support teams handle complaints and escalation through WhatsApp and ZITA.'],
  ['Journey Audit Trail', Database, 'Each journey creates a secure operational record for safeguarding review, school reporting, and parent enquiries.'],
  ['Route Deviation Protection', MapPinned, 'If a bus moves away from the approved route, operations is alerted and the situation is checked immediately.'],
]

export default function OpenSourceStack() {
  return (
    <>
      <Section background="#F1F6EA" label="Tracking Safety" title="What we show publicly is simple. What we protect behind it is serious." text="Parents need confidence, not a list of internal systems. Tranzita explains what the tracking does, while keeping the operational stack private and protected.">
        <IconCards cards={cards} />
      </Section>
      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        {[0, 1, 2].map((i) => <div key={i} className="absolute bus-silhouette opacity-10" style={{ top: 30 + i * 52, left: 0, ['--dur' as string]: `${18 + i * 5}s`, ['--delay' as string]: `${i * -4}s` }}><svg width="180" height="54" viewBox="0 0 180 54"><rect x="0" y="9" width="160" height="35" rx="8" fill="#183024" /><circle cx="34" cy="48" r="6" fill="#183024" /><circle cx="126" cy="48" r="6" fill="#183024" /></svg></div>)}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }}>Want to see live tracking for your school&apos;s actual routes?</h2>
          <p className="text-lg mb-8" style={{ color: '#65785F' }}>Book a 30 minute demo and we will show the parent PWA live map, school dashboard, and support flow in a working demo.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/#demo" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold" style={{ background: '#D96B1F' }}>Book a Demo <ArrowRight size={18} /></a>
            <a href="/for-parents" className="px-7 py-4 rounded-full border font-semibold" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>For Parents</a>
          </div>
        </div>
      </section>
    </>
  )
}
