'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const GROUPS = [
  {
    label: 'Tracking & Routing',
    items: [
      { name: 'OpenStreetMap', desc: 'Open mapping with no third party data dependency' },
      { name: 'OSRM & Valhalla', desc: 'Traffic-aware multi-stop route calculation engine' },
      { name: 'Traccar', desc: 'Open source real-time GPS fleet tracking' },
      { name: 'OpenRouteService', desc: 'Home address cluster and school run optimisation' },
    ],
  },
  {
    label: 'Security & Identity',
    items: [
      { name: 'Supabase Auth', desc: 'End-to-end encrypted authentication and session management' },
      { name: 'Keycloak', desc: 'Role-based access control for schools, parents, drivers, and nurses' },
      { name: 'OWASP ZAP', desc: 'Continuous automated security vulnerability scanning' },
      { name: 'OpenDLP', desc: 'Data loss prevention and child data privacy enforcement' },
    ],
  },
  {
    label: 'Communications',
    items: [
      { name: "Africa's Talking", desc: 'WhatsApp and SMS delivery built for Nigerian mobile networks' },
      { name: 'Chatwoot', desc: 'Open source parent to operations team direct messaging' },
      { name: 'Novu', desc: 'Pickup, boarding, and drop-off notification orchestration' },
    ],
  },
  {
    label: 'Data & Analytics',
    items: [
      { name: 'Metabase', desc: 'School operations dashboard and route performance analytics' },
      { name: 'PostgreSQL via Supabase', desc: 'Encrypted child and journey data storage' },
      { name: 'Grafana', desc: 'Real-time fleet and operations monitoring' },
    ],
  },
  {
    label: 'Mobile & Platform',
    items: [
      { name: 'React Native', desc: 'Parent app and driver app' },
      { name: 'Next.js 14', desc: 'Web platform and school admin dashboard' },
      { name: 'Vercel', desc: 'Edge deployment infrastructure' },
    ],
  },
  {
    label: 'EV Integration',
    items: [
      { name: 'Open Charge Map', desc: 'Nationwide charging point location data' },
      { name: 'Vehicle Telemetry API', desc: 'Live charge status and battery level monitoring per bus' },
    ],
  },
]

export default function OpenSourceGrid() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>Built on Open Infrastructure</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            Every tool we use <span style={{ color: '#E8601C' }}>is auditable.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
            We chose open source infrastructure deliberately. When children's safety is at stake, you should be able to see exactly what the platform is built on. No black boxes. No hidden systems.
          </p>
        </div>

        <div className="space-y-10">
          {GROUPS.map((g, gi) => (
            <div key={gi}>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: gi * 0.08 }}
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: '#8FA88F' }}
              >
                {g.label}
              </motion.p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {g.items.map((item, ii) => (
                  <motion.div
                    key={ii}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: gi * 0.06 + ii * 0.06, duration: 0.4 }}
                    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(44,58,44,0.08)' }}
                    className="rounded-xl p-4 transition-all"
                    style={{ background: '#FFFFFF', border: '1px solid #E2EDD8' }}
                  >
                    <p className="font-bold text-sm mb-1" style={{ color: '#1E2B1E' }}>{item.name}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#6B7F6B' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs mt-12"
          style={{ color: '#8FA88F' }}
        >
          Full source audit documentation is available on request for any school conducting due diligence before signing with Tranzita.
        </motion.p>
      </div>
    </section>
  )
}
