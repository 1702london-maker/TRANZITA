'use client'

import { motion, useInView, useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Camera,
  Car,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Fingerprint,
  HeartPulse,
  Home,
  Lock,
  MapPinned,
  QrCode,
  RadioTower,
  ShieldCheck,
  Smartphone,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const orbitItems = [
  ['Police Clearance', 0],
  ['Biometric Login', 72],
  ['Nurse Onboard', 144],
  ['GPS Verified', 216],
  ['Guardian Handover', 288],
]

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 1600, bounce: 0 })
  const [display, setDisplay] = useState(value.toLocaleString())

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  useMotionValueEvent(spring, 'change', (latest) => {
    setDisplay(Math.round(latest).toLocaleString())
  })

  return <span ref={ref}>{display}{suffix}</span>
}

const trustPills = ['6-Stage Crew Vetting', 'Nigerian Police Clearance Mandatory', 'Zero Incidents Recorded']

const stats = [
  [5081, '', 'road deaths reported in Nigeria in 2023', 'FRSC 2023'],
  [5289, '', 'road deaths reported in Nigeria in 2025', 'FRSC 2025'],
  [15, '/day', 'approximate daily average from the 2025 figure', 'Calculated from FRSC 2025'],
  [365, ' days', 'a year that school transport risk continues', 'Tranzita safety review'],
] as const

const requirements = [
  ['Nigerian Police Clearance Certificate', 'Mandatory for every driver, co-driver, and nurse before their application can proceed.'],
  ['Biometric Identity Verification', 'Fingerprint and facial recognition are cross-checked against records and used on every login.'],
  ['Home Address Verification', 'A Tranzita field officer visits the home address in person before clearance is granted.'],
  ['Guarantor Declaration', 'A registered property owner who is not a family member signs a sworn declaration for every applicant.'],
  ['FRSC Defensive Driving Certificate', 'Mandatory for drivers, with FRSC records checked for violations and licence suspensions.'],
  ['Child Protection Training', 'All crew complete the Tranzita Child Safeguarding Programme before their first assignment.'],
  ['Medical Fitness Examination', 'Vision, hearing, physical fitness and mental health are assessed by a certified physician.'],
  ['Drug and Alcohol Screening', 'Comprehensive screening before employment and random checks during employment.'],
  ['Vehicle Safety Inspection', 'Every bus is inspected every 30 days and removed from service after any failed inspection.'],
  ['GPS Verified Before Departure', 'Every bus must transmit a confirmed GPS lock before the route is unlocked.'],
  ['Powertrain Readiness Confirmed', 'Every vehicle must clear fuel, charging, range or route-readiness checks before departure.'],
  ['Speed Monitoring Active', 'A bus with a fault in its speed monitoring system does not operate.'],
]

const stages = [
  ['Criminal Records Bureau Clearance', 'Every applicant obtains Nigerian Police Clearance and is cross-referenced by the vetting team. Any criminal record leads to permanent disqualification.'],
  ['Biometric Identity Verification', 'Fingerprint, facial recognition, National ID, licence and passport records are checked, then reused for route login confirmation.'],
  ['Home Address and Guarantor Visit', 'A field officer verifies the home address in person, logs GPS coordinates and confirms a non-family guarantor.'],
  ['FRSC Records and Driving Assessment', 'Drivers clear FRSC checks and complete an independent supervised urban driving assessment with school-zone conditions.'],
  ['Child Protection and Safeguarding', 'Driver, co-driver and nurse complete safeguarding training, pass assessment and renew certification every 18 months.'],
  ['Medical Fitness and Drug Screening', 'Every applicant completes medical, vision, hearing, mental fitness, drug and alcohol screening before clearance.'],
]

const busFeatures: Array<[string, LucideIcon, string]> = [
  ['Three Crew Members on Every Bus', UserCheck, 'A driver focuses on the road, a co-driver focuses on the children, and a registered nurse focuses on health and wellbeing. No child is alone with one adult.'],
  ['Child Tap-On and Tap-Off', BadgeCheck, 'Every wristband tap is logged with child name, timestamp, GPS coordinates, bus ID and crew names. Missing taps trigger alerts within 60 seconds.'],
  ['Verified Guardian Handover', Home, 'The bus door does not open for drop-off until a verified guardian is present. If no guardian is present, the child stays with the crew.'],
  ['Onboard Nurse Every Route', HeartPulse, 'The nurse carries first aid equipment, child medical summaries and authority to instruct a hospital diversion when needed.'],
]

const tech: Array<[string, LucideIcon, string]> = [
  ['Real-Time GPS Every 30 Seconds', RadioTower, 'Location is sent to operations, school dashboard and parent tracking at the same time, with unregistered stops flagged automatically.'],
  ['Biometric Login Locks the Route', Fingerprint, 'Driver, co-driver and nurse must confirm independently before a route begins. Failed driver scans lock the bus.'],
  ['Speed Monitoring Per Road Zone', Car, 'Limits change by school zone, residential road and expressway. Breaches trigger cab audio and operations alerts.'],
  ['Phone Lock During Routes', Smartphone, 'Driver phone functions are locked to navigation, manifest and operations communication while the route is active.'],
  ['Route Deviation Alert', MapPinned, 'Any unplanned turn alerts operations within 45 seconds and repeated unexplained deviations trigger suspension review.'],
  ['In-Bus Camera System', Camera, 'Passenger and cab footage is encrypted and reviewed only when an incident flag or parent concern requires it.'],
]

const incidents = [
  ['A child does not board the bus.', 'The system flags the absence within 60 seconds. School is notified, operations calls the parent, and the bus does not depart without a confirmed reason.'],
  ['No guardian is present at drop-off.', 'The child stays on the bus. Operations calls all emergency contacts and the child returns to school or a pre-approved address if needed.'],
  ['A child becomes unwell.', 'The nurse assesses immediately. Serious cases divert to the nearest hospital while operations contacts the parent and school.'],
  ['The bus breaks down mid-route.', 'A replacement bus is dispatched while all three crew members remain with the children. Operations contacts affected parents through the agreed pilot communication process.'],
  ['A parent raises a crew concern.', 'Operations reviews journey data, GPS records, speed logs and camera footage within 2 hours. Validated concerns suspend the crew member.'],
  ['A road traffic accident occurs.', 'The nurse starts emergency response, the driver contacts emergency services, operations calls every parent and a formal report follows within 24 hours.'],
]

const dataCards = [
  ['What Is Recorded', ['GPS every 30 seconds', 'Speed at every recorded point', 'Tap-on and tap-off events', 'Guardian handover names', 'Route deviations and welfare notes']],
  ['How Long Records Stay', ['Journey records: 3 years minimum', 'Camera footage: 30 days minimum', 'Crew vetting: 5 years after employment', 'Incident reports: permanent', 'Encrypted at rest and in transit']],
  ['Who Can Access Records', ['School safeguarding leads', 'Parents for their child journeys', 'Tranzita operations reviewers', 'Regulators through legal process', 'No commercial third parties']],
] as const

const verification: Array<[string, LucideIcon, string]> = [
  ['Verify Any Crew Member', QrCode, 'Every crew ID includes a QR code showing clearance status, certification dates and assigned route for the day.'],
  ['Request a Full Safety Audit', ClipboardCheck, 'Schools can request the full audit pack covering vetting, technology, incident response, data storage and insurance.'],
  ['Visit Operations', ShieldCheck, 'School leaders can book Lagos operations visits to inspect vehicles and dispatch procedures. Abuja and Port Harcourt visits open when those cities launch.'],
  ['Speak To Operations', Bell, 'Parents and schools can reach a real operations team member through WhatsApp for route logs, incident reviews and safety questions.'],
]

export default function SafetyPage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4" style={{ paddingTop: 118, paddingBottom: 112, background: 'linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 48%, rgba(241,246,234,0.95) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 15% 20%, rgba(248,200,78,0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(31,107,70,0.12), transparent 28%)' }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 210" preserveAspectRatio="none" className="block w-full h-[190px]">
            <rect x="0" y="188" width="1440" height="22" fill="#E5EEDB" />
            {[90, 240, 390, 570, 760, 950, 1130, 1300].map((x, i) => (
              <g key={x}>
                <rect x={x - 34} y={90 + (i % 3) * 16} width="68" height={100 - (i % 3) * 8} rx="3" fill={i % 2 ? '#DDE9D2' : '#EDF5E5'} />
                <circle cx={x} cy={84 + (i % 3) * 16} r="13" fill="#FFF0E4" stroke="#D96B1F" strokeWidth="3" />
                <path d={`M${x - 5} ${84 + (i % 3) * 16}l4 4 8-9`} stroke="#1F6B46" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            ))}
          </svg>
          <div className="absolute bus-drive" style={{ bottom: 22, left: 0 }}>
            <svg width="136" height="46" viewBox="0 0 136 46">
              <rect x="4" y="5" width="120" height="32" rx="7" fill="#F28A3D" />
              <rect x="4" y="5" width="120" height="11" rx="7" fill="#D96B1F" />
              {[13, 38, 63, 88].map((x) => <rect key={x} x={x} y="10" width="17" height="13" rx="2" fill="rgba(255,255,255,0.36)" />)}
              <rect x="100" y="22" width="16" height="10" rx="2" fill="#fff" />
              <path d="M108 23v8M104 27h8" stroke="#D96B1F" strokeWidth="2" />
              <circle cx="28" cy="39" r="5" fill="#183024" /><circle cx="100" cy="39" r="5" fill="#183024" />
            </svg>
          </div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center pb-28">
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Safety Standards</motion.p>
          <h1 className="font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 headline-balance" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#183024' }}>
            {['Safety Is Not A Feature.', 'It Is The Entire Product.'].map((line, i) => (
              <motion.span key={line} className="phrase-nowrap" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 + i * 0.12, duration: 0.58 }}>
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p className="max-w-2xl mx-auto text-lg leading-relaxed mb-8" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>Every decision Tranzita makes starts with one question: what does it take to make a Nigerian child completely safe on the way home from school?</motion.p>
          <motion.div className="flex flex-wrap justify-center gap-3 mb-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <a href="#standards" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white" style={{ background: '#D96B1F', boxShadow: '0 12px 28px rgba(217,107,31,0.24)' }}>Our Safety Standards <ArrowRight size={16} /></a>
            <a href="/#demo" className="px-6 py-3 rounded-full text-sm font-semibold border" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Request a Demo</a>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}>
            {trustPills.map((pill, i) => <motion.span key={pill} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white" style={{ color: '#213A2B', borderColor: '#DDE9D2' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.12 }}>{pill}</motion.span>)}
          </motion.div>
          <SafetyOrbit />
        </div>
      </section>

      <section className="py-24 px-4" style={{ background: '#FFF9F2' }}>
        <div className="max-w-6xl mx-auto">
          <SectionIntro label="The Reality" title="Nigerian roads are risky. Your child travels them every day." text="Before we explain how Tranzita keeps children safe, we need to be honest about what we are keeping them safe from." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(([value, suffix, label, source], i) => (
              <motion.div key={label} className="gradient-frame rounded-2xl p-6 text-center" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-5xl font-extrabold mb-3" style={{ color: '#D96B1F' }}><Counter value={value} suffix={suffix} /></div>
                <p className="font-bold leading-snug mb-2" style={{ color: '#183024' }}>{label}</p>
                <p className="text-xs" style={{ color: '#7EA06D' }}>{source}</p>
              </motion.div>
            ))}
          </div>
          <motion.p className="mt-8 rounded-2xl p-7 text-lg leading-relaxed font-semibold" style={{ background: '#F1F6EA', color: '#183024', border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Many children travel in okadas, kekes, and unregistered minibuses with no tracking, no criminal checks, no nurse, no co-driver, and no parent notification. Tranzita was built because this is not acceptable.
          </motion.p>
        </div>
      </section>

      <section id="standards" className="py-24 px-4" style={{ background: '#F1F6EA' }}>
        <div className="max-w-6xl mx-auto">
          <SectionIntro label="The Standard" title="What Tranzita requires before a single child boards." text="These are not aspirations. They are non-negotiable requirements verified before any route begins." />
          <div className="grid lg:grid-cols-2 gap-4">
            {requirements.map(([title, text], i) => (
              <motion.div key={title} className="flex gap-4 rounded-2xl bg-white p-5 border border-[#DDE9D2]" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <CheckCircle2 size={24} color="#D96B1F" className="shrink-0 mt-1" />
                <div><h3 className="font-extrabold mb-1" style={{ color: '#183024' }}>{title}</h3><p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{text}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RailSection />
      <CardGrid label="On The Bus" title="What keeps your child safe from boarding to your front door." text="Vetting gets the right people on the bus. Technology and policy keep your child safe every minute." cards={busFeatures} background="#FFF9F2" />
      <CardGrid label="In The Technology" title="The systems that enforce safety when human attention is not enough." text="Tranzita does not rely on driver goodwill or parent vigilance. The platform enforces every safety rule automatically." cards={tech} background="#F1F6EA" />
      <IncidentCards />
      <DataSection />
      <CardGrid label="Independent Verification" title="Do not take our word for it." text="Every safety claim Tranzita makes is verifiable. Here is how schools and parents can check." cards={verification} background="#F1F6EA" />
      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }}>Ready to inspect the standard yourself?</h2>
          <p className="text-lg mb-8" style={{ color: '#65785F' }}>Book a route review and ask for the safety audit pack before your school makes a decision.</p>
          <a href="/#demo" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold" style={{ background: '#D96B1F' }}>Request a Demo <ArrowRight size={18} /></a>
        </div>
      </section>
    </>
  )
}

function SafetyOrbit() {
  return (
    <motion.div
      className="relative mx-auto mt-10 h-64 w-64 sm:h-72 sm:w-72"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.25, duration: 0.6 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: '#DDE9D2', background: 'rgba(255,255,255,0.36)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {orbitItems.map(([label, deg]) => (
          <div
            key={label}
            className="absolute left-1/2 top-1/2 h-8 w-8 -ml-4 -mt-4 rounded-full flex items-center justify-center shadow-md"
            style={{
              background: '#FFFFFF',
              border: '2px solid #D96B1F',
              transform: `rotate(${deg}deg) translateX(132px) rotate(-${deg}deg)`,
            }}
          >
            <CheckCircle2 size={16} color="#1F6B46" />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-10 rounded-full flex flex-col items-center justify-center text-center shadow-xl" style={{ background: '#FFFFFF', border: '1px solid #DDE9D2' }}>
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity }}>
          <ShieldCheck size={44} color="#D96B1F" />
        </motion.div>
        <p className="mt-3 text-sm font-extrabold" style={{ color: '#183024' }}>Safety System Active</p>
        <p className="text-xs" style={{ color: '#65785F' }}>Every route. Every child.</p>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[320px] max-w-[90vw] grid grid-cols-2 gap-2">
        {orbitItems.slice(0, 4).map(([label], i) => (
          <motion.span
            key={label}
            className="rounded-full bg-white px-3 py-1 text-[11px] font-bold shadow-sm border"
            style={{ color: '#183024', borderColor: '#DDE9D2' }}
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

function SectionIntro({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="text-center mb-14">
      <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{label}</motion.p>
      <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{title}</motion.h2>
      <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#65785F' }}>{text}</p>
    </div>
  )
}

function RailSection() {
  return (
    <section className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto">
        <SectionIntro label="The Six Stages" title="How we vet every single crew member." text="Every driver, co-driver, and nurse goes through the same six-stage process independently." />
        <div className="grid gap-5">
          {stages.map(([title, text], i) => (
            <motion.div key={title} className="group grid md:grid-cols-[120px_1fr] gap-5 items-start rounded-2xl p-6 bg-white border border-[#DDE9D2]" initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ x: 8, boxShadow: '0 18px 38px rgba(217,107,31,0.12)' }}>
              <div className="text-5xl font-extrabold" style={{ color: '#D96B1F' }}>0{i + 1}</div>
              <div><h3 className="font-extrabold text-xl mb-2" style={{ color: '#183024' }}>{title}</h3><p className="leading-relaxed" style={{ color: '#65785F' }}>{text}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardGrid({ label, title, text, cards, background }: { label: string; title: string; text: string; cards: Array<[string, LucideIcon, string]>; background: string }) {
  return (
    <section className="py-24 px-4" style={{ background }}>
      <div className="max-w-6xl mx-auto">
        <SectionIntro label={label} title={title} text={text} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(([cardTitle, Icon, body], i) => (
            <motion.div key={cardTitle} className="gradient-frame rounded-2xl p-6" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 34, rotate: -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }}>
              <Icon size={34} color="#D96B1F" className="mb-5" />
              <h3 className="font-extrabold text-xl mb-3" style={{ color: '#183024' }}>{cardTitle}</h3>
              <p className="leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IncidentCards() {
  return (
    <section className="py-24 px-4" style={{ background: '#FFF9F2' }}>
      <div className="max-w-6xl mx-auto">
        <SectionIntro label="Incident Response" title="What happens when something goes wrong." text="Safety planning is prevention and response. These protocols are designed before they are needed." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map(([front, back], i) => (
            <motion.div key={front} className="flip-card" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="flip-card-inner">
                <div className="flip-card-face gradient-frame rounded-2xl p-6 flex items-center" style={{ background: '#FFFFFF' }}><h3 className="font-extrabold text-2xl" style={{ color: '#183024' }}>{front}</h3></div>
                <div className="flip-card-face flip-card-back rounded-2xl p-6 flex items-center" style={{ background: '#D96B1F' }}><p className="font-bold leading-relaxed text-white">{back}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DataSection() {
  return (
    <section className="py-24 px-4" style={{ background: '#F1F6EA' }}>
      <div className="max-w-6xl mx-auto">
        <SectionIntro label="The Data" title="Every journey. Recorded. Stored. Available." text="Every Tranzita journey generates a secure data record available to schools, parents, and regulators through the right process." />
        <div className="grid lg:grid-cols-3 gap-6">
          {dataCards.map(([title, items], i) => (
            <motion.div key={title} className="rounded-2xl bg-white p-6 border border-[#DDE9D2]" initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -5 }}>
              <Database size={34} color="#D96B1F" className="mb-5" />
              <h3 className="font-extrabold text-xl mb-4" style={{ color: '#183024' }}>{title}</h3>
              <ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-2 text-sm" style={{ color: '#65785F' }}><Lock size={15} color="#1F6B46" className="shrink-0 mt-0.5" />{item}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
