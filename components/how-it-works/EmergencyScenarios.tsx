'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SCENARIOS = [
  {
    title: 'Child becomes ill on the bus',
    tag: 'Medical',
    color: '#dc2626',
    protocol: [
      'Nurse assesses the child immediately',
      'Driver is informed; bus continues or diverts based on severity',
      'Operations centre notified within 30 seconds',
      'Parent called simultaneously',
      'If required: bus diverts to nearest verified hospital',
      'School is notified. Incident report filed within 2 hours.',
    ],
  },
  {
    title: 'No adult at drop-off location',
    tag: 'Safeguarding',
    color: '#d97706',
    protocol: [
      'Child does not leave the bus under any circumstances',
      'Co-driver attempts parent contact — 3 calls in 10 minutes',
      'Operations centre contacts all emergency contacts',
      'After 30 minutes with no response: child returned to school',
      'Or delivered to a pre-approved alternative address on file',
      'Incident logged. School informed same day.',
    ],
  },
  {
    title: 'Bus breaks down mid-route',
    tag: 'Vehicle',
    color: '#7c3aed',
    protocol: [
      'Driver activates breakdown protocol in the Driver App',
      'All children remain on the bus with co-driver and nurse',
      'Parents notified of delay and reason within 5 minutes',
      'Operations centre dispatches a reserve vehicle',
      'Reserve vehicle arrives within 60 minutes',
      'No child is left at the roadside at any point.',
    ],
  },
  {
    title: 'Unknown adult attempts to collect a child',
    tag: 'Security',
    color: '#1d4ed8',
    protocol: [
      'Co-driver checks the child\'s profile for approved guardians',
      'Unknown adults are refused without exception',
      'Parent is contacted immediately',
      'If parent cannot verify: child stays on bus and returns to school',
      'Incident logged with time, description, and location',
      'School safeguarding lead informed the same day.',
    ],
  },
  {
    title: 'Child does not board at school',
    tag: 'Manifest',
    color: '#065f46',
    protocol: [
      'Co-driver marks child as absent on the manifest',
      'Operations centre contacts the school admin immediately',
      'School checks attendance records and last seen location',
      'Parent is notified within 10 minutes of departure',
      'If child is unaccounted for: safeguarding escalation initiated',
      'No bus departs until the absence is confirmed and logged.',
    ],
  },
  {
    title: 'Severe traffic extends journey beyond 2 hours',
    tag: 'Delay',
    color: '#6b7280',
    protocol: [
      'Operations centre monitors all active routes in real time',
      'Parents receive an update every 30 minutes during delays',
      'Nurse assesses children for any distress or health needs',
      'Alternative routes are calculated and approved by school admin',
      'Water and basic snacks are available on every Tranzita bus',
      'School is informed and kept updated until all children are home.',
    ],
  },
]

export default function EmergencyScenarios() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [flipped, setFlipped] = useState<number[]>([])

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>Emergency Protocols</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            When things go wrong. <span style={{ color: '#E8601C' }}>This is what happens.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
            Every scenario below has a pre-defined protocol. No crew member has to make it up on the spot. Tap to see the exact response.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCENARIOS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={() => setFlipped(f => f.includes(i) ? f.filter(x => x !== i) : [...f, i])}
              className="cursor-pointer"
              style={{ height: 240, perspective: 1000 }}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: flipped.includes(i) ? 180 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
                  style={{ background: '#FFFFFF', border: `2px solid ${s.color}20`, backfaceVisibility: 'hidden' }}>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-3"
                      style={{ background: s.color + '15', color: s.color }}>
                      {s.tag}
                    </span>
                    <h3 className="font-bold text-base leading-snug" style={{ color: '#1E2B1E' }}>{s.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: s.color }}>?</div>
                    <p className="text-xs" style={{ color: '#8FA88F' }}>Tap to see the protocol</p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 rounded-2xl p-5 flex flex-col"
                  style={{ background: '#1E2B1E', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <p className="text-xs font-bold mb-3" style={{ color: s.color }}>PROTOCOL: {s.tag.toUpperCase()}</p>
                  <ol className="space-y-1.5 flex-1 overflow-auto">
                    {s.protocol.map((step, j) => (
                      <li key={j} className="flex gap-2 text-xs" style={{ color: 'rgba(255,249,242,0.75)' }}>
                        <span className="font-bold shrink-0" style={{ color: s.color }}>{j + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
