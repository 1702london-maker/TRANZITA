'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MESSAGES = [
  { from: 'system', text: 'Chidi has boarded bus TRZ-03. Time: 8:12 AM.' },
  { from: 'parent', text: 'Where is the bus now?' },
  { from: 'system', text: 'Open the PWA live map. Current route: Lekki-Epe Expressway. ETA school: 8:35 AM.' },
  { from: 'system', text: 'Support is online if you need to raise a concern.' },
  { from: 'system', text: 'Chidi tapped off bus. Drop-off confirmed at 3:58 PM.' },
]

export default function ForParents() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="for-parents" ref={ref} className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#D96B1F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            For Parents
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4 headline-balance"
            style={{ color: '#183024' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Peace of mind inside the{' '}
            <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>parent PWA.</span>
          </motion.h2>
          <motion.p
            className="mb-8 leading-relaxed"
            style={{ color: '#65785F' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Parents log into the Tranzita PWA to see live location, ETA, pickup, drop-off and guardian handover status. WhatsApp and ZITA stay available for complaints, support and escalation at any time.
          </motion.p>
          <div className="space-y-3">
            {[
              { icon: 'PWA', text: 'PWA live map, no app store download needed' },
              { icon: 'GPS', text: 'Live route status updated every 30 seconds' },
              { icon: '24/7', text: 'WhatsApp and ZITA for support and complaints' },
              { icon: 'ID', text: 'Verified guardians managed from the parent portal' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-3 items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className="text-xs font-black rounded-full px-2 py-1" style={{ color: '#D96B1F', background: '#FFF0E4' }}>{item.icon}</span>
                <p className="text-sm font-medium" style={{ color: '#183024' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="float-phone">
            <div className="rounded-[3rem] shadow-2xl overflow-hidden" style={{ width: 270, background: '#FFF9F2', border: '2px solid #DDE9D2' }}>
              <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#D96B1F' }}>
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xs font-black text-white">TRZ</div>
                <div>
                  <p className="text-white text-sm font-bold">Tranzita PWA</p>
                  <p className="text-white/70 text-xs">Live route and support</p>
                </div>
              </div>
              <div className="p-3 space-y-2" style={{ background: '#F1F6EA', minHeight: 360 }}>
                {MESSAGES.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.from === 'parent' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 1.4 }}
                  >
                    <div
                      className="rounded-xl px-3 py-2 max-w-[85%] text-xs leading-relaxed shadow-sm"
                      style={{ background: msg.from === 'parent' ? '#FFF0E4' : '#FFFFFF', color: '#183024' }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
