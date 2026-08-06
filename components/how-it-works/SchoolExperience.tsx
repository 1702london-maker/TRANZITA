'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BLOCKS = [
  {
    icon: '🗺️',
    title: 'Live Fleet Dashboard',
    body: "Every bus on every route appears on a single live map in the school admin panel. Click any bus to see which children are currently on board, the current speed, the GPS position, the route status, and the crew on duty. No phone calls to drivers needed. No waiting for the driver to respond. Everything is visible in real time from the moment the bus leaves school to the moment the last child is dropped.",
  },
  {
    icon: '🧭',
    title: 'Smart Route Planning',
    body: "When a new student joins, their home address is added to the system and the route is automatically reclustered. Routes are optimised by where children live, not by manual arrangement or favouritism. Weekly journey time analysis is available so schools can identify routes that are consistently slow. Tranzita operations will review and adjust any route that regularly exceeds the agreed time window.",
  },
  {
    icon: '📋',
    title: 'Attendance Integration',
    body: "When a child taps on the bus at boarding, that event is sent directly to the school management information system. No double entry. No paper registers for transport. No end-of-day reconciliation. If a child is registered on a route but does not tap on, the school is notified within 60 seconds of the scheduled departure. This catches unexplained absences that might otherwise go undetected until hours later.",
  },
  {
    icon: '🛡️',
    title: 'Safeguarding and Incident Records',
    body: "All speed alerts, route deviations, unplanned stops, and driver behaviour flags are logged automatically and stored. The school receives a weekly safety digest confirming zero incidents or providing a full breakdown of any flags that occurred. If an incident takes place during a journey, the school receives a formal written report within 24 hours. All records are stored for a minimum of three years and made available on request for any safeguarding audit.",
  },
]

export default function SchoolExperience() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="for-schools-hiw" className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>For Schools</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            Your entire transport operation.<br />
            <span style={{ color: '#E8601C' }}>One live view.</span>
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: '#6B7F6B' }}>
            Schools get a real-time operations dashboard that replaces spreadsheets, phone calls to drivers, and end-of-day guesswork with a single view of every bus, every child, and every route.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {BLOCKS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(44,58,44,0.10)' }}
              className="rounded-2xl p-7 transition-all"
              style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: '#F1F6EA' }}>
                {b.icon}
              </div>
              <h3 className="font-bold text-lg mb-3" style={{ color: '#1E2B1E' }}>{b.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
