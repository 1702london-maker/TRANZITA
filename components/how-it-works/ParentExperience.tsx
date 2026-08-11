'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle } from 'lucide-react'

const points = [
  'No app required during pilot onboarding',
  'See live route status from authorised access',
  'Up to four verified guardians can all receive alerts',
  'Operations confirms updates while automation is finalised',
  'Reply through support and speak to a real person',
  'Report anything left on the bus directly',
]

const messages = [
  'Route TRZ-004 is open for afternoon movement. Operations is monitoring departure.',
  'Amara has boarded. Crew and route record confirmed in the portal.',
  'Traffic note logged on Lekki Expressway. Revised ETA visible to operations.',
  'Approaching home zone. Guardian handover check is now active.',
  'Amara dropped off safely at 3:57 PM. Guardian handover recorded.',
  'Journey summary stored: boarded 3:18 PM, dropped off 3:57 PM.',
]

export default function ParentExperience() {
  return (
    <section className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>The Parent Experience</motion.p>
          <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-5" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Peace of mind built around the parent.</motion.h2>
          <p className="leading-relaxed mb-8" style={{ color: '#65785F' }}>Parents should not chase school transport updates. Tranzita keeps the route record visible and keeps a real operations team close while automated WhatsApp delivery is prepared for launch.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {points.map((point, i) => (
              <motion.div key={point} className="flex gap-3 rounded-xl bg-white p-4 border border-[#DDE9D2]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <CheckCircle2 size={19} color="#1F6B46" className="shrink-0 mt-0.5" />
                <span className="text-sm font-semibold" style={{ color: '#183024' }}>{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div className="float-phone mx-auto w-full max-w-sm rounded-[2rem] p-4 border" style={{ background: '#FFF0E4', borderColor: '#DDE9D2', boxShadow: '0 24px 60px rgba(24,48,36,0.12)' }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="rounded-[1.4rem] overflow-hidden bg-[#F1F6EA] min-h-[620px]">
            <div className="px-4 py-4 flex items-center gap-3 text-white" style={{ background: '#1F6B46' }}>
              <MessageCircle size={22} />
              <div>
                <div className="font-black">ZITA Updates</div>
                <div className="text-xs text-white/75">Tranzita Operations</div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div key={msg} className="rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-relaxed border border-[#DDE9D2]" style={{ color: '#183024' }} initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.35 }}>
                  {msg}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
