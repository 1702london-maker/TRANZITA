'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STOPS = [
  { time: '2:55 PM', title: 'Pre-Route Check', icon: '✓', desc: 'Driver, co-driver and nurse check in on the Tranzita Driver App. Biometric confirmation required. Vehicle inspection logged.' },
  { time: '3:00 PM', title: 'School Gate Open', icon: '🏫', desc: 'Route goes live. School admin sees all crew confirmed on the school dashboard.' },
  { time: '3:05 PM', title: 'Manifest Loaded', icon: '📋', desc: 'Co-driver confirms the full child manifest on-screen. Every child present at school is marked for collection.' },
  { time: '3:10 PM', title: 'Bus Departs School', icon: '🚌', desc: 'Departure is timestamped. Parents on the route receive a push notification: "Bus has left school."' },
  { time: '3:12 PM', title: 'First Stop Approaching', icon: '📍', desc: 'Parents at Stop 1 receive a 3-minute arrival alert via WhatsApp and app notification.' },
  { time: '3:15 PM', title: 'Child Boards', icon: '👧', desc: 'Co-driver taps the child on the digital manifest. Parent receives: "Amara is on the bus."' },
  { time: '3:18 PM', title: 'Nurse Check', icon: '🩺', desc: 'Nurse conducts a wellbeing check for any child who flagged a health note in their profile that day.' },
  { time: '3:25 PM', title: 'Live Tracking Active', icon: '📡', desc: 'Parent app shows the exact bus location on a map in real time. ETA to each drop-off is recalculated every 60 seconds.' },
  { time: '3:40 PM', title: 'First Drop-Off', icon: '🏠', desc: 'Bus arrives at first home. Co-driver walks child to door. Parent or verified guardian must be present.' },
  { time: '3:42 PM', title: 'Safe Drop Confirmed', icon: '✅', desc: 'Co-driver marks drop-off complete. Parent receives: "Amara has been dropped safely at home." Timestamped and logged.' },
  { time: '4:20 PM', title: 'Last Drop-Off', icon: '🔑', desc: 'Final child dropped. Co-driver completes the manifest. All drop-offs accounted for.' },
  { time: '4:25 PM', title: 'Route Complete', icon: '🎯', desc: 'Route closed in the system. School receives a completed journey log. All parents get a journey summary notification.' },
]

export default function HorizontalJourneyTrack() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(STOPS.length - 1) * 320}px`])

  return (
    <div ref={sectionRef} style={{ height: `${STOPS.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col" style={{ background: '#FFF9F2' }}>
        {/* Header */}
        <div className="flex-shrink-0 pt-20 pb-8 px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>The Journey</p>
          <h2 className="font-extrabold text-3xl sm:text-5xl" style={{ color: '#1E2B1E' }}>
            Every stop. <span style={{ color: '#E8601C' }}>Every minute.</span>
          </h2>
          <p className="text-sm mt-2" style={{ color: '#6B7F6B' }}>Scroll to move through the route</p>
        </div>

        {/* Road track */}
        <div className="flex-1 relative overflow-hidden flex items-center">
          {/* Road line */}
          <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2" style={{ background: '#E2EDD8' }} />
          <div className="absolute left-0 right-0 h-0.5 top-1/2 -translate-y-1/2"
            style={{ background: 'repeating-linear-gradient(90deg, #E8601C 0px, #E8601C 40px, transparent 40px, transparent 80px)' }} />

          <motion.div
            ref={trackRef}
            style={{ x, display: 'flex', alignItems: 'center', gap: 0, paddingLeft: 80, paddingRight: 80, willChange: 'transform' }}
          >
            {STOPS.map((stop, i) => (
              <div key={i} style={{ width: 320, flexShrink: 0, position: 'relative' }}>
                {/* Alternating above/below */}
                <div style={{
                  position: 'absolute',
                  [i % 2 === 0 ? 'bottom' : 'top']: '50%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: i % 2 === 0 ? 32 : 0,
                  marginTop: i % 2 === 0 ? 0 : 32,
                  width: 240,
                }}>
                  <motion.div
                    initial={{ opacity: 0, y: i % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    className="rounded-2xl p-4 shadow-sm"
                    style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}
                  >
                    <p className="text-xs font-bold mb-1" style={{ color: '#E8601C' }}>{stop.time}</p>
                    <p className="font-bold text-sm mb-2" style={{ color: '#1E2B1E' }}>{stop.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7F6B' }}>{stop.desc}</p>
                  </motion.div>
                  {/* Connector line */}
                  <div style={{
                    position: 'absolute',
                    [i % 2 === 0 ? 'top' : 'bottom']: '100%',
                    left: '50%',
                    width: 1,
                    height: 40,
                    background: '#E2EDD8',
                  }} />
                </div>

                {/* Dot on road */}
                <div style={{
                  position: 'relative',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 * i }}
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: i === 0 || i === STOPS.length - 1 ? '#E8601C' : '#1E2B1E', color: '#FFF9F2', border: '3px solid #FFF9F2', boxShadow: '0 0 0 2px #E2EDD8' }}
                  >
                    {i + 1}
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
