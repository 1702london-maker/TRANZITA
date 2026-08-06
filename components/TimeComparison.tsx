'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BEFORE = [
  { time: '3:00 PM', event: 'School closes', icon: '🏫', note: 'The waiting begins' },
  { time: '3:15 PM', event: 'Parent texts driver — no reply', icon: '📵', note: 'Unregulated driver, no comms' },
  { time: '4:30 PM', event: 'Parent still has no idea', icon: '😰', note: 'Anxiety, panic setting in' },
  { time: '5:45 PM', event: 'Child finally arrives home', icon: '🏠', note: 'Via hawker stops, diversions' },
  { time: '6:00 PM', event: '3 hours of stress. Daily.', icon: '😤', note: 'No accountability. No tracking.' },
]

const AFTER = [
  { time: '3:00 PM', event: 'School closes', icon: '🏫', note: 'Driver already on route' },
  { time: '3:05 PM', event: 'Child tapped on — alert sent', icon: '✅', note: 'Parent knows instantly' },
  { time: '3:10 PM', event: 'Live map opens on parent app', icon: '📍', note: 'ETA countdown visible' },
  { time: '3:55 PM', event: 'WhatsApp: "Arriving in 5 min"', icon: '💬', note: 'Automatic GPS alert' },
  { time: '4:00 PM', event: 'Child home. Tap-off confirmed.', icon: '🏠', note: 'Safe. On time. Every day.' },
]

export default function TimeComparison() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#FAFAF8' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: '#E8601C' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            The School Run Reality
          </motion.p>
          <motion.h2
            className="font-extrabold text-4xl sm:text-5xl mb-4"
            style={{ color: '#1E2B1E' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            School finishes at 3 PM.{' '}
            <span style={{ color: '#E8601C' }}>When does your child get home?</span>
          </motion.h2>
          <motion.p
            className="max-w-xl mx-auto"
            style={{ color: '#6B7F6B' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            In Nigeria, most children don&apos;t arrive home until 5–6 PM. No tracking, no alerts, no certainty. Tranzita changes the story.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* BEFORE */}
          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{ border: '2px solid #FED7D7' }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="px-6 py-4" style={{ background: '#FFF5F5' }}>
              <p className="font-extrabold text-lg" style={{ color: '#C53030' }}>❌ Before Tranzita</p>
              <p className="text-xs" style={{ color: '#9B2C2C' }}>Unregulated · No tracking · Hours of uncertainty</p>
            </div>
            <div className="p-6 space-y-3" style={{ background: '#FFFFFF' }}>
              {BEFORE.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12 }}
                >
                  <div className="min-w-[62px]">
                    <div className="text-xs font-bold" style={{ color: '#C53030' }}>{item.time}</div>
                  </div>
                  <div className="flex gap-3 items-start flex-1">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1E2B1E' }}>{item.event}</p>
                      <p className="text-xs" style={{ color: '#9B2C2C' }}>{item.note}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #FED7D7' }}>
                <div className="flex justify-between text-xs mb-2" style={{ color: '#9B2C2C' }}>
                  <span>3 PM</span><span>Home: ~5:45 PM ❌</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: '#FED7D7' }}>
                  <motion.div className="h-full rounded-full" style={{ background: '#FC8181' }}
                    initial={{ width: 0 }} animate={inView ? { width: '90%' } : {}} transition={{ delay: 0.6, duration: 1 }} />
                </div>
                <p className="text-xs mt-2 font-bold" style={{ color: '#C53030' }}>~2h 45min of stress and uncertainty</p>
              </div>
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{ border: '2px solid #C6F6D5' }}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="px-6 py-4" style={{ background: '#F0FFF4' }}>
              <p className="font-extrabold text-lg" style={{ color: '#276749' }}>✅ With Tranzita</p>
              <p className="text-xs" style={{ color: '#2F855A' }}>GPS verified · Live alerts · Home by 4:00</p>
            </div>
            <div className="p-6 space-y-3" style={{ background: '#FFFFFF' }}>
              {AFTER.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12 }}
                >
                  <div className="min-w-[62px]">
                    <div className="text-xs font-bold" style={{ color: '#276749' }}>{item.time}</div>
                  </div>
                  <div className="flex gap-3 items-start flex-1">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#1E2B1E' }}>{item.event}</p>
                      <p className="text-xs" style={{ color: '#276749' }}>{item.note}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #C6F6D5' }}>
                <div className="flex justify-between text-xs mb-2" style={{ color: '#276749' }}>
                  <span>3 PM</span><span>Home: 4:00 PM ✅</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: '#C6F6D5' }}>
                  <motion.div className="h-full rounded-full" style={{ background: '#48BB78' }}
                    initial={{ width: 0 }} animate={inView ? { width: '33%' } : {}} transition={{ delay: 0.7, duration: 1 }} />
                </div>
                <p className="text-xs mt-2 font-bold" style={{ color: '#276749' }}>Home by 4 PM. Calm parents. Happy children.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="#demo"
            className="inline-block px-10 py-4 rounded-full font-bold text-white text-base"
            style={{ background: '#E8601C', boxShadow: '0 6px 24px rgba(232,96,28,0.25)' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Give My Child a Safe Journey →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
