'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const NOTIFS = [
  { text: 'Bus 3 departed school gate', time: '3:10 PM', color: '#22c55e' },
  { text: 'Child absence flagged: Temi F.', time: '3:08 PM', color: '#E8601C' },
  { text: 'All morning routes complete', time: '9:12 AM', color: '#22c55e' },
]

const FLEET = [
  { id: 'BUS-01', route: 'Lagos Island S.', status: 'En Route', children: 12, charge: 87 },
  { id: 'BUS-02', route: 'Victoria Island', status: 'En Route', children: 9, charge: 74 },
  { id: 'BUS-03', route: 'Surulere', status: 'At Stop', children: 11, charge: 62 },
  { id: 'BUS-04', route: 'Ikeja North', status: 'Returning', children: 0, charge: 45 },
]

export default function SchoolDashboardMockup() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeNotif, setActiveNotif] = useState(0)
  const [mapDot, setMapDot] = useState({ x: 30, y: 60 })

  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => {
      setActiveNotif(n => (n + 1) % NOTIFS.length)
      setMapDot(d => ({
        x: Math.max(10, Math.min(80, d.x + (Math.random() > 0.5 ? 3 : -3))),
        y: Math.max(10, Math.min(80, d.y + (Math.random() > 0.5 ? 3 : -3))),
      }))
    }, 2500)
    return () => clearInterval(t)
  }, [inView])

  return (
    <section ref={ref} className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>For Schools</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            The school dashboard. <span style={{ color: '#E8601C' }}>Live. Always.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
            Your school admin sees every bus, every child, every route — in real time. No calls to the driver. No guessing. Full visibility.
          </p>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: '#0F1B0F', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3" style={{ background: '#080E08', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            <p className="text-xs ml-4 font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>Tranzita School Dashboard — Lagos Prep School</p>
          </div>

          <div className="grid lg:grid-cols-3 divide-x" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {/* Left: Live map */}
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Live Fleet Map</p>
              <div className="relative rounded-xl overflow-hidden" style={{ background: '#162616', height: 200 }}>
                {/* Grid lines */}
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-20">
                  {[0, 40, 80, 120, 160].map(v => (
                    <g key={v}>
                      <line x1={v} y1="0" x2={v} y2="200" stroke="#8FA88F" strokeWidth="0.5" />
                      <line x1="0" y1={v} x2="200" y2={v} stroke="#8FA88F" strokeWidth="0.5" />
                    </g>
                  ))}
                </svg>
                {/* Moving bus dots */}
                {[
                  { x: mapDot.x, y: mapDot.y, color: '#E8601C' },
                  { x: 65, y: 40, color: '#22c55e' },
                  { x: 72, y: 70, color: '#22c55e' },
                  { x: 25, y: 75, color: '#eab308' },
                ].map((dot, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ left: `${dot.x}%`, top: `${dot.y}%`, background: dot.color, transform: 'translate(-50%,-50%)' }}
                    animate={i === 0 ? { left: `${dot.x}%`, top: `${dot.y}%` } : {}}
                    transition={{ duration: 1.5 }}
                  >
                    <motion.div className="w-full h-full rounded-full" style={{ background: dot.color, opacity: 0.4 }}
                      animate={{ scale: [1, 2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
                  </motion.div>
                ))}
                <div className="absolute bottom-2 left-2 flex gap-3">
                  {[{ color: '#E8601C', label: 'En Route' }, { color: '#22c55e', label: 'At Stop' }, { color: '#eab308', label: 'Returning' }].map((l, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9 }}>{l.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle: Fleet status */}
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Fleet Status</p>
              <div className="space-y-3">
                {FLEET.map((bus, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="rounded-xl p-3"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold text-white">{bus.id}</p>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{bus.route}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: bus.status === 'En Route' ? 'rgba(34,197,94,0.15)' : bus.status === 'At Stop' ? 'rgba(232,96,28,0.15)' : 'rgba(255,255,255,0.08)',
                          color: bus.status === 'En Route' ? '#22c55e' : bus.status === 'At Stop' ? '#E8601C' : 'rgba(255,255,255,0.4)',
                          fontSize: 9,
                        }}>
                        {bus.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>{bus.children} children</span>
                      <span style={{ color: bus.charge > 50 ? '#22c55e' : '#eab308' }}>{bus.charge}% charge</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Notifications */}
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Live Alerts</p>
              <div className="space-y-3 mb-6">
                {NOTIFS.map((n, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: activeNotif === i ? 1 : 0.4 }}
                    className="flex gap-3 items-start rounded-xl p-3"
                    style={{ background: activeNotif === i ? 'rgba(255,255,255,0.06)' : 'transparent', border: `1px solid ${activeNotif === i ? n.color + '30' : 'transparent'}` }}
                  >
                    <div className="w-2 h-2 rounded-full mt-0.5 shrink-0" style={{ background: n.color }} />
                    <div>
                      <p className="text-xs text-white">{n.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>{n.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Children En Route', val: '32' },
                  { label: 'Routes Active', val: '4' },
                  { label: 'Incidents Today', val: '0' },
                  { label: 'On-Time Rate', val: '100%' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <p className="font-extrabold text-base" style={{ color: '#E8601C' }}>{s.val}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
