'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function LiveTracking() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tracking" ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Live Tracking
          </motion.p>
          <motion.h2 className="font-extrabold text-4xl sm:text-5xl mb-5 headline-balance" style={{ color: '#183024' }} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            Know exactly where your child is.{' '}
            <span className="phrase-nowrap" style={{ color: '#D96B1F' }}>Always.</span>
          </motion.h2>
          <motion.p className="text-base mb-8 leading-relaxed" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }}>
            The parent PWA gives families a live map view, ETA countdown, pickup status and drop-off confirmation. WhatsApp and ZITA remain open for support, complaints and escalation.
          </motion.p>
          <div className="space-y-4">
            {[
              { icon: 'GPS', title: 'Real-time GPS map', desc: 'See the bus position updated every 30 seconds' },
              { icon: 'ETA', title: 'ETA countdown', desc: 'Know exactly when to expect your child home' },
              { icon: '24/7', title: 'Support channels', desc: 'Use WhatsApp or ZITA to raise a complaint or speak with support' },
            ].map((item, i) => (
              <motion.div key={i} className="gradient-frame flex gap-4 items-start p-4 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #DDE9D2' }} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.12 }}>
                <span className="text-xs font-black rounded-full px-2 py-1 mt-0.5" style={{ color: '#D96B1F', background: '#FFF0E4' }}>{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm mb-0.5" style={{ color: '#183024' }}>{item.title}</p>
                  <p className="text-xs" style={{ color: '#65785F' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="flex justify-center" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}>
          <div className="float-phone relative">
            <div className="rounded-[3rem] p-3 shadow-2xl" style={{ background: '#FFFFFF', width: 270, border: '2px solid #DDE9D2' }}>
              <div className="rounded-t-[2.5rem] overflow-hidden" style={{ background: '#F1F6EA', height: 480 }}>
                <svg viewBox="0 0 270 310" style={{ width: '100%', height: 310 }}>
                  <rect width="270" height="310" fill="#EEF4EE" />
                  <line x1="0" y1="155" x2="270" y2="155" stroke="#FFFFFF" strokeWidth="8" />
                  <line x1="135" y1="0" x2="135" y2="310" stroke="#FFFFFF" strokeWidth="8" />
                  <line x1="0" y1="96" x2="270" y2="96" stroke="#FFFFFF" strokeWidth="5" />
                  <line x1="76" y1="0" x2="76" y2="310" stroke="#FFFFFF" strokeWidth="5" />
                  <line x1="193" y1="0" x2="193" y2="310" stroke="#FFFFFF" strokeWidth="5" />
                  <rect x="18" y="18" width="44" height="68" fill="#E5EEDB" rx="3" />
                  <rect x="86" y="28" width="38" height="58" fill="#EDF5E5" rx="3" />
                  <rect x="148" y="18" width="34" height="68" fill="#E5EEDB" rx="3" />
                  <rect x="202" y="34" width="52" height="52" fill="#EDF5E5" rx="3" />
                  <polyline points="38,252 38,155 135,155 135,96 193,96" stroke="#D96B1F" strokeWidth="3" strokeDasharray="7 4" fill="none" strokeLinecap="round" />
                  <circle cx="38" cy="262" r="9" fill="#213A2B" />
                  <circle cx="193" cy="96" r="9" fill="#D96B1F" />
                  <motion.circle cx="135" cy="155" r="9" fill="#D96B1F" animate={{ cx: [135, 135, 193], cy: [252, 155, 96] }} transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
                </svg>
                <div className="px-4 py-3" style={{ background: '#FFF9F2', borderTop: '1px solid #DDE9D2' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold" style={{ color: '#183024' }}>Bus ETA</span>
                    <span className="text-xs font-black" style={{ color: '#D96B1F' }}>12 min</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#DDE9D2' }}>
                    <motion.div className="h-full rounded-full" style={{ background: '#D96B1F' }} animate={{ width: ['10%', '75%', '10%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
                  </div>
                </div>
                <motion.div className="mx-3 mt-2 p-3 rounded-xl" style={{ background: '#D96B1F', color: 'white' }} animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
                  <p className="text-xs font-bold">Tranzita PWA</p>
                  <p className="text-xs mt-0.5 opacity-90">Chidi picked up. ETA home: 4:28 PM</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
