'use client'

import { motion } from 'framer-motion'
import { SectionIntro } from './Shared'

export default function PartnerPortal() {
  return (
    <section className="px-4 py-24" style={{ background: '#FFF9F2' }}>
      <div className="mx-auto max-w-7xl">
        <SectionIntro label="The Partner Portal" title="Your dashboard for approved EV fleet work." text="Every Tranzita EV partner gets access to a dedicated portal with approved vehicle status, route history, earnings, charging readiness, and maintenance records." />
        <motion.div className="mx-auto mt-12 max-w-5xl rounded-[32px] bg-white p-6 shadow-sm" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="grid gap-4 lg:grid-cols-3">
            {['Vehicle: Nigerian EV School Bus - TRZ-E047', 'This Month: NGN 185,000', 'Next Payment: 1st September 2026'].map((item) => (
              <div key={item} className="rounded-2xl p-4" style={{ background: '#FFF0E4' }}>
                <p className="text-sm font-extrabold" style={{ color: '#183024' }}>{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl p-5" style={{ background: '#F1F6EA' }}>
              <p className="font-extrabold" style={{ color: '#183024' }}>Route History</p>
              {['Wednesday 6 Aug - Route B - Completed', 'Tuesday 5 Aug - Route A - Completed', 'Monday 4 Aug - Route B - Completed'].map((row, i) => (
                <motion.p key={row} className="mt-3 text-sm" style={{ color: '#65785F' }} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>{row}</motion.p>
              ))}
            </div>
            <div className="rounded-2xl p-5" style={{ background: '#F1F6EA' }}>
              <p className="font-extrabold" style={{ color: '#183024' }}>Maintenance</p>
              <p className="mt-3 text-sm" style={{ color: '#65785F' }}>Last EV inspection: Passed. Next battery and charging readiness review due: 15 August 2026. Outstanding items: None.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
