'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const SCREENS = [
  {
    label: 'Biometric Check-In',
    color: '#1E2B1E',
    content: (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ background: 'rgba(232,96,28,0.15)', border: '2px solid #E8601C' }}>
          <span>👆</span>
        </div>
        <p className="text-white font-bold text-center text-sm">Biometric Fingerprint Required</p>
        <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>No third-party can start a route without confirmed ID</p>
        <div className="w-full rounded-lg p-3 mt-2" style={{ background: 'rgba(232,96,28,0.1)', border: '1px solid rgba(232,96,28,0.3)' }}>
          <p className="text-xs font-bold" style={{ color: '#E8601C' }}>Driver: Emmanuel Adeyemi</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Route: Lagos Island South — 12 children</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Departure: 3:10 PM</p>
        </div>
      </div>
    )
  },
  {
    label: 'Live Route View',
    color: '#0A1A0A',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex-1 relative" style={{ background: '#162616' }}>
          {/* Fake map */}
          <svg viewBox="0 0 200 260" className="w-full h-full opacity-60">
            <line x1="30" y1="200" x2="170" y2="200" stroke="#2A3D2A" strokeWidth="12" />
            <line x1="60" y1="200" x2="60" y2="60" stroke="#2A3D2A" strokeWidth="8" />
            <line x1="60" y1="120" x2="160" y2="120" stroke="#2A3D2A" strokeWidth="8" />
            <line x1="160" y1="120" x2="160" y2="200" stroke="#2A3D2A" strokeWidth="8" />
            <polyline points="60,200 60,120 160,120 160,200" fill="none" stroke="#E8601C" strokeWidth="3" strokeDasharray="6,3" />
            <circle cx="60" cy="200" r="8" fill="#E8601C" />
            <circle cx="60" cy="120" r="5" fill="white" opacity="0.7" />
            <circle cx="160" cy="120" r="5" fill="white" opacity="0.7" />
            <circle cx="160" cy="200" r="5" fill="white" opacity="0.7" />
          </svg>
          {/* Bus indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
              style={{ background: '#E8601C' }}
              animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🚌
            </motion.div>
          </div>
        </div>
        <div className="p-3" style={{ background: '#0A1A0A' }}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-white">Next Stop</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>14 Bode Thomas, Surulere</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold" style={{ color: '#E8601C' }}>4 min</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>ETA</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    label: 'Child Manifest',
    color: '#1A1A2E',
    content: (
      <div className="flex flex-col h-full p-4 gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-white">12 Children</p>
          <p className="text-xs font-bold" style={{ color: '#E8601C' }}>8 Boarded</p>
        </div>
        {[
          { name: 'Amara O.', status: 'boarded', color: '#22c55e' },
          { name: 'Kosi A.', status: 'boarded', color: '#22c55e' },
          { name: 'Temi F.', status: 'boarded', color: '#22c55e' },
          { name: 'David I.', status: 'next stop', color: '#E8601C' },
          { name: 'Ngozi C.', status: 'next stop', color: '#E8601C' },
        ].map((child, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: child.color, color: 'white', fontSize: 9 }}>
                {child.name[0]}
              </div>
              <p className="text-xs text-white">{child.name}</p>
            </div>
            <span className="text-xs font-bold" style={{ color: child.color }}>{child.status}</span>
          </div>
        ))}
        <p className="text-xs text-center mt-auto" style={{ color: 'rgba(255,255,255,0.3)' }}>+ 7 more</p>
      </div>
    )
  },
]

const RESTRICTIONS = [
  { front: 'Speed Limit', back: 'Driver App enforces a 60km/h maximum on all routes. Any breach triggers an instant alert to the operations centre and the school.' },
  { front: 'Phone Use', back: 'Mobile phone handling while driving triggers a sensor alert. The co-driver is responsible for all communication while the vehicle is in motion.' },
  { front: 'Unscheduled Stops', back: 'Any stop outside the approved route plan triggers a geo-fence alert. The driver must provide a reason via the app within 60 seconds.' },
  { front: 'Route Changes', back: 'No route can be changed without school admin approval from the school dashboard. The driver cannot manually override the route on the app.' },
  { front: 'Passenger Rules', back: 'No child not on the manifest may board the bus. No adult may board without pre-approved emergency guardian credentials.' },
  { front: 'Vehicle Condition', back: 'Air conditioning must be confirmed operational before departure. Any fault logged delays departure until resolved.' },
]

export default function DriverAppScreens() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [flipped, setFlipped] = useState<number[]>([])

  const toggleFlip = (i: number) => {
    setFlipped(f => f.includes(i) ? f.filter(x => x !== i) : [...f, i])
  }

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>The Driver App</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            What the driver sees. <span style={{ color: '#E8601C' }}>Every second.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
            The Tranzita Driver App is not just a GPS. It is the operational spine of the entire route. Everything the driver does is logged, verified, and visible to the school.
          </p>
        </div>

        {/* Phone screens */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {SCREENS.map((screen, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="mx-auto"
              style={{ width: 200 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ background: screen.color, height: 360, border: '3px solid rgba(255,255,255,0.1)' }}>
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-2" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <span className="text-white text-xs font-bold">3:10</span>
                  <div className="flex gap-1">
                    <span className="text-white text-xs">4G</span>
                    <span className="text-white text-xs">100%</span>
                  </div>
                </div>
                {screen.content}
              </div>
              <p className="text-center text-xs font-bold mt-3" style={{ color: '#1E2B1E' }}>{screen.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Restriction flip cards */}
        <div className="text-center mb-10">
          <h3 className="font-extrabold text-2xl sm:text-3xl mb-2" style={{ color: '#1E2B1E' }}>
            What drivers <span style={{ color: '#E8601C' }}>cannot do.</span>
          </h3>
          <p className="text-sm" style={{ color: '#6B7F6B' }}>Tap each card to see how we enforce it.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESTRICTIONS.map((r, i) => (
            <div
              key={i}
              onClick={() => toggleFlip(i)}
              className="cursor-pointer rounded-2xl"
              style={{ height: 120, perspective: 1000 }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: flipped.includes(i) ? 180 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl px-6"
                  style={{ background: '#1E2B1E', backfaceVisibility: 'hidden' }}>
                  <div className="text-center">
                    <p className="font-bold text-white text-base">{r.front}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Tap to see enforcement</p>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl px-5"
                  style={{ background: '#E8601C', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-xs text-white text-center leading-relaxed">{r.back}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
