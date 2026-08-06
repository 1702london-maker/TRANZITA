'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TIMELINE = [
  { time: '6:30 AM', task: 'Arrives at the depot', detail: 'Signs in on the Tranzita app. Uniform check. Reviews the day\'s manifest and any health notes for assigned children.' },
  { time: '7:00 AM', task: 'Vehicle safety check', detail: 'Walks through the pre-departure vehicle checklist with the driver: doors, seatbelts, first aid kit, fire extinguisher, nurse kit.' },
  { time: '7:20 AM', task: 'Morning route begins', detail: 'Stands at the door for every pickup. Taps each child on the digital manifest. Verifies identity against the app photo.' },
  { time: '8:30 AM', task: 'Children delivered', detail: 'Marks the morning route complete. Logs any incidents or health observations in the app before returning to depot.' },
  { time: '2:30 PM', task: 'Pre-afternoon check', detail: 'Reviews the afternoon manifest. Confirms any same-day changes sent by the school through the dashboard.' },
  { time: '3:00 PM', task: 'School gate collection', detail: 'Manages the physical boarding process. Every child tapped. No child boards without manifest confirmation.' },
  { time: '3:10 PM', task: 'Route underway', detail: 'Handles all parent communications while the bus is moving. Driver focuses entirely on the road.' },
  { time: 'Each stop', task: 'Walks child to door', detail: 'Every child is walked to the door of their home. No child is released to the pavement. A verified adult must receive them.' },
  { time: 'Route end', task: 'Closes the manifest', detail: 'Every child accounted for. Logs the completed journey. Any unresolved item is immediately escalated to the operations team.' },
]

export default function CoDriverTimeline() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading and pull quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>The Co-Driver</p>
            <h2 className="font-extrabold text-4xl sm:text-5xl mb-6" style={{ color: '#1E2B1E' }}>
              The person your child <span style={{ color: '#E8601C' }}>knows by name.</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#6B7F6B' }}>
              The co-driver is not an assistant. They are the primary child-safety officer on every Tranzita bus. While the driver focuses on the road, the co-driver manages the children, the manifest, the communications, and every door interaction.
            </p>
            {/* Pull quote */}
            <blockquote className="rounded-2xl p-6" style={{ background: '#1E2B1E' }}>
              <p className="text-base font-medium leading-relaxed mb-4" style={{ color: '#FFF9F2' }}>
                "The co-driver knows every child's name, their seat, and their home. By the end of the first week, the children think of them as part of the school."
              </p>
              <p className="text-xs font-bold" style={{ color: '#E8601C' }}>Tranzita Operations Team</p>
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { num: '100%', label: 'Routes have a co-driver' },
                { num: '0', label: 'Children released unsupervised' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}>
                  <p className="font-extrabold text-2xl" style={{ color: '#E8601C' }}>{s.num}</p>
                  <p className="text-xs mt-1" style={{ color: '#6B7F6B' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: timeline */}
          <div className="relative pl-8">
            <div className="absolute left-2 top-0 bottom-0 w-px" style={{ background: '#E2EDD8' }} />
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-8 top-1 w-3 h-3 rounded-full border-2"
                    style={{ background: '#FFF9F2', borderColor: '#E8601C' }} />
                  <div className="rounded-xl p-4" style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}>
                    <p className="text-xs font-black mb-1" style={{ color: '#E8601C' }}>{item.time}</p>
                    <p className="font-bold text-sm mb-1" style={{ color: '#1E2B1E' }}>{item.task}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7F6B' }}>{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
