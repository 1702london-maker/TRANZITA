'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const EVENTS = [
  {
    time: '2:45 PM', type: 'system', label: 'Pre-Route System Check',
    body: `The Tranzita platform runs an automatic pre-departure check before any bus moves. Driver identity confirmed via biometric app login. Co-driver checked in separately via their own device. Onboard nurse confirmed present and registered. Vehicle GPS verified as active and transmitting. Battery charge confirmed above the minimum threshold for the full route. All three crew members must individually confirm ready status before the route unlocks in the system. The bus physically cannot be assigned a live route until all confirmations are received.`,
  },
  {
    time: '3:00 PM', type: 'driver', label: 'School Closes — Route Unlocks',
    body: `The driver receives today's optimised route on the Tranzita Driver App. The route is already calculated using live road data from the moment school closes. The pickup sequence is ordered by home address cluster, not by driver preference or guesswork. The driver cannot deviate from the assigned route without triggering a flag to the operations centre. Any unplanned stop longer than 90 seconds fires an automatic alert.`,
  },
  {
    time: '3:05 PM', type: 'parent', label: 'First Parent Alert Sent',
    body: `Every parent on today's route receives a WhatsApp message automatically. The message reads: Your child's Tranzita bus TRZ-004 is now departing. Estimated pickup: 3:20 PM. Track live here. This message requires no driver involvement. It is sent by the system the moment the route unlocks. Parents do not need to call the school, call the driver, or wonder. The information comes to them.`,
  },
  {
    time: '3:15 PM', type: 'system', label: 'Bus Arrives at School Gate',
    body: `The co-driver manages the entire boarding process from this point. Each child's name is called from the Tranzita manifest on the co-driver's device. The driver does not leave the cab during boarding under any circumstances. The nurse conducts a visible wellness check on each child as they step onto the bus. Any child who appears unwell is assessed before the journey proceeds.`,
  },
  {
    time: '3:18 PM', type: 'driver', label: 'Child Tap-On Confirmed',
    body: `Each child taps their Tranzita wristband or NFC ID card on the bus reader. The system logs the child's name, the exact time, GPS coordinates, the bus ID, and the crew on duty for that journey. If a child registered on the manifest does not tap on, the system flags the absence immediately. The school admin is notified within 60 seconds of any missing child on the manifest. The bus does not depart until every manifest entry is either confirmed boarded or confirmed absent with a reason.`,
  },
  {
    time: '3:19 PM', type: 'parent', label: 'Parent Alert — Child Has Boarded',
    body: `WhatsApp message sent instantly to the parent the moment the tap-on is confirmed. The message includes the child's name, the bus ID, the co-driver name, the nurse name, and the live ETA. The parent can tap the link and see the bus moving on a live map from this exact moment. Tracking remains active and visible until the child has been dropped off and confirmed home.`,
  },
  {
    time: '3:20 PM', type: 'system', label: 'Route Begins',
    body: `The bus moves on the optimised route. Speed is monitored continuously against zone-specific limits, not a blanket national figure. Any speed breach above the zone threshold triggers an immediate audio alert to the driver and a simultaneous notification to the operations centre. The route is recalculated every 90 seconds based on live traffic conditions. Parents receive silent ETA updates automatically without needing to open any app.`,
  },
  {
    time: '3:35 PM', type: 'parent', label: 'Live ETA Update Pushed',
    body: `All parents on the route receive an updated WhatsApp message with the revised arrival time. If traffic has added time, they are told. If the bus is running early, they are told. Parents never have to chase information. The information chases them.`,
  },
  {
    time: '3:48 PM', type: 'system', label: 'Bus Enters Drop-Off Zone',
    body: `The Tranzita platform detects the bus crossing the geofenced boundary around the child's home address. The parent receives a message: Bus arriving in approximately 4 minutes. Please ensure a verified guardian is at the door. The nurse prepares the child for alighting. The co-driver confirms on the device whether a guardian is visibly present before the bus stops.`,
  },
  {
    time: '3:52 PM', type: 'driver', label: 'Child Tap-Off and Guardian Handover',
    body: `The child taps off the bus reader. The system logs the time, the GPS coordinates, and the crew present. The co-driver physically walks the child to the door and hands them to the verified guardian. If no verified guardian is present at the address, the child does not leave the bus. This is not a guideline. It is a rule. The operations centre is alerted immediately and calls the parent and all emergency contacts. The bus waits with the child on board until a verified guardian arrives or an agreed alternative is authorised.`,
  },
  {
    time: '3:53 PM', type: 'parent', label: 'Drop-Off Confirmed',
    body: `WhatsApp sent to parent immediately after tap-off: Amara has been dropped off safely at home. Time: 3:53 PM. Received by: Mrs Okafor. Have a lovely evening. A full timestamped journey summary is included in the message. This message closes the loop. The parent knows. The journey is done.`,
  },
  {
    time: '4:00 PM', type: 'system', label: 'Route Completion and End of Day Log',
    body: `Once all children are dropped, the driver submits the route completion confirmation in the app. Any flags raised during the journey, speed alerts, unplanned stops, or manifest discrepancies, are reviewed by the operations team that evening. The school receives a full route summary including pickup times, drop-off times, any absences, any flags, and crew notes. Vehicle battery level is logged. The bus is parked at the certified depot and charging begins automatically.`,
  },
]

const TYPE_STYLE: Record<string, { border: string; dot: string; badge: string; label: string }> = {
  system: { border: '#E8601C', dot: '#E8601C', badge: 'rgba(232,96,28,0.10)', label: 'System' },
  parent: { border: '#2D7A6A', dot: '#2D7A6A', badge: 'rgba(45,122,106,0.10)', label: 'Parent Alert' },
  driver: { border: '#3A3A4A', dot: '#3A3A4A', badge: 'rgba(58,58,74,0.10)', label: 'Crew Action' },
}

function TimelineCard({ event, index }: { event: typeof EVENTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const s = TYPE_STYLE[event.type]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.05, type: 'spring', damping: 22 }}
      className="relative ml-8 lg:ml-16 mb-10"
    >
      <div
        className="rounded-2xl p-6"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2EDD8',
          borderLeft: `4px solid ${s.border}`,
          boxShadow: '0 2px 16px rgba(44,58,44,0.05)',
        }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs font-black" style={{ color: s.border }}>{event.time}</span>
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: s.badge, color: s.border }}
          >
            {s.label}
          </span>
        </div>
        <h3 className="font-bold text-lg mb-2" style={{ color: '#1E2B1E' }}>{event.label}</h3>
        <p className="text-sm leading-relaxed" style={{ color: '#6B7F6B' }}>{event.body}</p>
      </div>
    </motion.div>
  )
}

export default function JourneyTimeline() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 80%', 'end 20%'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="py-24 px-4 relative" style={{ background: '#FFF9F2' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E8601C' }}>The Complete Journey</p>
          <h2 className="font-extrabold text-4xl sm:text-5xl mb-4" style={{ color: '#1E2B1E' }}>
            Every minute. <span style={{ color: '#E8601C' }}>Accounted for.</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#6B7F6B' }}>
            Here is exactly what happens from the moment school closes to the moment your child is safely home. Nothing left to chance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs font-semibold">
            {Object.entries(TYPE_STYLE).map(([k, v]) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: v.dot }} />
                <span style={{ color: '#6B7F6B' }}>{v.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Static line track */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: '#E2EDD8' }} />
          {/* Animated drawing line */}
          <motion.div
            className="absolute left-0 top-0 w-0.5 origin-top"
            style={{ background: '#E8601C', height: lineHeight }}
          />

          {/* Dot markers */}
          {EVENTS.map((e, i) => (
            <div
              key={i}
              className="absolute left-0 w-3 h-3 rounded-full -translate-x-[5px]"
              style={{
                top: `${(i / (EVENTS.length - 1)) * 100}%`,
                background: TYPE_STYLE[e.type].dot,
                border: '2px solid #FFF9F2',
              }}
            />
          ))}

          {EVENTS.map((e, i) => <TimelineCard key={i} event={e} index={i} />)}
        </div>
      </div>
    </section>
  )
}
