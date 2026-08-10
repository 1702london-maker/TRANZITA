'use client'

import { motion } from 'framer-motion'

const scenarios = [
  ['What if my child is not on the bus?', 'The absence is flagged within 60 seconds. The co-driver checks the manifest, school is notified, operations calls the parent within 2 minutes, and the bus does not depart without a confirmed reason.'],
  ['What if no one is home at drop-off?', 'The child does not leave the bus. Operations calls emergency contacts. If no contact is reached, the child returns to school or a pre-approved alternative address.'],
  ['What if my child is sick on the bus?', 'The nurse assesses immediately. Minor issues are monitored with parent notice. Serious concerns trigger a hospital diversion and operations calls the parent before arrival.'],
  ['What if the bus breaks down?', 'Breakdown protocol starts immediately. A replacement bus is dispatched from the nearest depot while children remain onboard with all three crew members. Parents are updated within 5 minutes.'],
  ['What if I have a concern about the driver?', 'Send it through WhatsApp. Journey data, GPS records and camera footage are reviewed within 2 hours. A validated concern suspends the driver immediately.'],
  ['What if there is an accident?', 'The nurse starts emergency response, the driver calls emergency services, operations receives automatic GPS alerts and every parent is contacted personally with a formal report within 24 hours.'],
]

export default function ScenarioCards() {
  return (
    <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>When Things Go Wrong</motion.p>
          <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>We plan for every scenario so you never have to.</motion.h2>
          <p className="max-w-2xl mx-auto" style={{ color: '#65785F' }}>Here is exactly what Tranzita does in the situations parents worry about most.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map(([front, back], i) => (
            <motion.div key={front} className="flip-card" initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="flip-card-inner">
                <div className="flip-card-face gradient-frame rounded-2xl p-6 flex items-center" style={{ background: '#FFFFFF' }}>
                  <h3 className="font-extrabold text-2xl" style={{ color: '#183024' }}>{front}</h3>
                </div>
                <div className="flip-card-face flip-card-back rounded-2xl p-6 flex items-center" style={{ background: '#D96B1F' }}>
                  <p className="font-bold leading-relaxed text-white">{back}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
