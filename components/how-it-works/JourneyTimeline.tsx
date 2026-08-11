'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, Clock } from 'lucide-react'
import { useRef } from 'react'

const steps = [
  ['2:45 PM', 'Pre-Departure System Check', 'The Tranzita platform locks the route until every check passes. Driver, co-driver and nurse each confirm on separate devices. Vehicle GPS pings green and battery level clears the route minimum before dispatch.'],
  ['3:00 PM', 'School Closes and Route Unlocks', 'The optimised route appears on the driver app using live traffic data from the last few minutes. The pickup sequence follows home address clusters built by the system. Any deviation triggers an operations alert.'],
  ['3:04 PM', 'Parent Update Queue Opens', 'The route record prepares the bus ID, estimated pickup time, crew names and tracking link for operations. During pilot mode, the team confirms parent updates manually while the automated WhatsApp pipeline is being finalised.'],
  ['3:12 PM', 'Bus Arrives at School Gate', 'The co-driver steps to the door with the digital manifest while the driver stays in the cab. The nurse checks every child before they sit down. Boarding only happens after manifest and wellness clearance.'],
  ['3:14 PM', 'Every Child Tapped On', 'Each child taps their Tranzita wristband on the reader. The system logs name, time, GPS, bus ID and crew on duty. If a child is missing, school and operations are notified before departure.'],
  ['3:16 PM', 'Child Is Confirmed On Board', 'The child record moves from expected to onboard, with bus, crew and ETA visible to operations and the authorised parent portal. The same event becomes the trigger for WhatsApp once the live provider is connected.'],
  ['3:20 PM', 'Route Begins: Speed Monitored', 'GPS transmits every 30 seconds to operations, school dashboard and parent tracking. Speed is checked against road-zone rules every 10 seconds, with alerts sent immediately after a breach.'],
  ['3:35 PM', 'Live Traffic Rerouting', 'Traffic is checked every 90 seconds against the active route. If a road is blocked or congested, operations sees the revised ETA and can update the school and affected parents immediately.'],
  ['3:48 PM', 'Approaching Drop-Off Zone', 'The platform detects the bus crossing the home geofence and tells the parent the bus is near. The nurse prepares the child while the co-driver confirms guardian readiness.'],
  ['3:52 PM', 'Handover at the Door', 'The child taps off, the co-driver walks them to the verified guardian and the handover is recorded. If no guardian is present, the child stays on the bus and operations takes over.'],
  ['3:53 PM', 'Safe Arrival Confirmed', 'The exact drop-off time, guardian name and journey log are stored against that child. During pilot mode, operations confirms the parent message; after automation, this same event sends instantly.'],
  ['4:00 PM', 'Route Closed and Debriefed', 'The driver submits completion, operations reviews every flag and the school receives a route summary. The vehicle charges overnight and tomorrow routes are planned before midnight.'],
]

export default function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="journey" className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>The Journey</motion.p>
          <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>57 minutes. Every second accounted for.</motion.h2>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#65785F' }}>This is exactly what happens from the moment school closes to the moment your child is home safe.</p>
        </div>
        <div ref={ref} className="relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-1 rounded-full bg-[#F3D8C6]" />
          <motion.div className="absolute left-4 lg:left-1/2 top-0 w-1 origin-top rounded-full bg-[#D96B1F]" style={{ bottom: 0, scaleY }} />
          <div className="space-y-8">
            {steps.map(([time, title, text], i) => (
              <motion.div key={title} className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${i % 2 ? 'lg:text-left' : 'lg:text-right'}`} initial={{ opacity: 0, x: i % 2 ? 80 : -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-120px' }} transition={{ type: 'spring', stiffness: 80, damping: 18 }}>
                <div className={`${i % 2 ? 'lg:col-start-2' : ''} ml-12 lg:ml-0 gradient-frame rounded-2xl p-6`} style={{ background: '#fff' }}>
                  <div className={`flex items-center gap-3 mb-3 ${i % 2 ? '' : 'lg:justify-end'}`}>
                    <Clock size={20} color="#D96B1F" />
                    <span className="font-black" style={{ color: '#D96B1F' }}>{time}</span>
                  </div>
                  <h3 className="font-extrabold text-xl mb-3" style={{ color: '#183024' }}>{title}</h3>
                  <p className="leading-relaxed" style={{ color: '#65785F' }}>{text}</p>
                </div>
                <span className="absolute left-[9px] lg:left-1/2 lg:-translate-x-[10px] top-7 w-5 h-5 rounded-full bg-white border-4 border-[#D96B1F] flex items-center justify-center">
                  <CheckCircle2 size={10} color="#1F6B46" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
