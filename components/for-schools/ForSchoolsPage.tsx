'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpenCheck,
  Bus,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  Gauge,
  Headphones,
  Map,
  MessageSquare,
  Music,
  Route,
  ShieldCheck,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from 'lucide-react'

const pills = ['Live Fleet Dashboard', 'White-Label Option', 'Dedicated Onboarding Manager']

const problems = [
  ['No visibility after the gate', 'Once a child leaves your premises in an unregulated vehicle, the school cannot see where they are, who is driving, how fast the vehicle is moving, or whether they arrived safely. Tranzita gives that answer in real time.'],
  ['No vetting of drivers', 'Many afternoon drivers have no police clearance, defensive driving certificate, safeguarding training or medical screening. Tranzita replaces guesswork with a six-stage independent vetting process.'],
  ['No accountability after incidents', 'Unregulated school runs leave no record, footage, log or protocol. Tranzita records every journey and stores the evidence your safeguarding team needs.'],
] as const

const dashboardRows = [
  ['TRZ-001', '14 children', 'Route A', 'On time', '#1F6B46'],
  ['TRZ-002', '11 children', 'Route B', '4 min delay', '#F8C84E'],
  ['TRZ-003', '8 children', 'Route C', 'On time', '#1F6B46'],
] as const

const alerts = [
  '3:14 PM - All 14 children boarded on Route A',
  '3:16 PM - TRZ-002 slight delay, operations update queued',
  '3:19 PM - Amara Okafor dropped off, guardian confirmed',
  '3:21 PM - Speed alert on TRZ-003, operations notified',
]

const platformCards: Array<[string, LucideIcon, string]> = [
  ['Live Fleet View', Map, 'See every bus, child and route from one screen. Click a bus to view children onboard, speed, GPS position, route progress and crew on duty.'],
  ['Manifest and Absence Management', ClipboardList, 'Daily manifests are generated automatically. Parent absence notices adjust the route and school dashboard before buses depart.'],
  ['Attendance Integration', CalendarCheck, 'Tap-on events can sync to your school management information system, removing paper registers and end-of-day reconciliation.'],
  ['Safeguarding Records', ShieldCheck, 'Every journey stores GPS, speed logs, crew, tap events, guardian confirmations, nurse notes and operational flags.'],
  ['Parent Communication Hub', MessageSquare, 'Prepare route updates, closures and schedule notices for Tranzita parents, with operations confirming delivery during pilot mode.'],
  ['Transparent Billing', CreditCard, 'One consolidated term invoice can itemise students, routes and rates. No cash on buses and no driver payments.'],
]

const schoolRevenue: Array<[string, LucideIcon, string]> = [
  ['White-Label Parent Onboarding', BadgeCheck, 'Parents can join through your school-branded flow while Tranzita still controls the fleet, crew, safety checks and live operations.'],
  ['Setup Fee Revenue Line', CreditCard, 'Schools can offer branded transport onboarding with a setup fee, creating a new service line without buying buses or hiring transport staff.'],
  ['Custom App Negotiation', Headphones, 'Schools that want a branded transport app or portal integration can speak with Tranzita for a separate implementation and support package.'],
]

const controls: Array<[string, LucideIcon, string]> = [
  ['Set Speed Limits Per Zone', Gauge, 'Your school sets limits for school roads, residential streets and expressways, and Tranzita alerts you when any threshold is breached.'],
  ['Approve Every Crew Member', BookOpenCheck, 'Crew profiles and clearance documents can be shared with your safeguarding lead before assignment to your routes.'],
  ['Control the Audio Environment', Music, 'Approved audio content is loaded into the Driver App, so the driver cannot play anything outside your school policy.'],
  ['Set Guardian Verification Rules', ShieldCheck, 'Define guardian counts, ID requirements and photo verification rules, then Tranzita enforces them at handover.'],
  ['Configure Parent Updates', Bell, 'Choose which journey events need parent updates, add school notices, and include school branding once automated WhatsApp delivery is live.'],
  ['Access All Journey Records', FileText, 'Your safeguarding lead can access journey records, flags, routes and handover data from the school dashboard.'],
]

const onboarding = [
  ['Day 1-2', 'Route Discovery', 'We import student addresses, identify clusters and map practical school-run corridors.'],
  ['Day 3-5', 'Parent and Student Setup', 'Parents are onboarded, guardians are verified, student wristbands are assigned and pilot update procedures are agreed.'],
  ['Day 6-8', 'Crew and Vehicle Assignment', 'Vetted crew and inspected EV buses are matched to your routes and school rules.'],
  ['Day 9-10', 'Dry Run and Go-Live', 'We run a no-child test route, train your admin team and prepare the first live day report.'],
] as const

const reporting = [
  ['Safeguarding Lead', 'Full journey history, incident flags, guardian handovers and crew records.'],
  ['Transport Coordinator', 'Live route progress, delays, absence status and parent communications.'],
  ['Finance Team', 'Term invoices, per-student billing, route charges and payment records.'],
] as const

export default function ForSchoolsPage() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4" style={{ paddingTop: 118, paddingBottom: 112, background: 'linear-gradient(120deg, rgba(255,240,228,0.96) 0%, rgba(255,249,242,0.94) 48%, rgba(241,246,234,0.95) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 18% 22%, rgba(248,200,78,0.22), transparent 24%), radial-gradient(circle at 82% 18%, rgba(31,107,70,0.12), transparent 28%)' }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 210" preserveAspectRatio="none" className="block w-full h-[190px]">
            <rect x="0" y="188" width="1440" height="22" fill="#E5EEDB" />
            {[90, 250, 430, 610, 800, 990, 1190, 1340].map((x, i) => (
              <g key={x}>
                <rect x={x - 38} y={88 + (i % 3) * 18} width="76" height={98 - (i % 3) * 7} rx="3" fill={i % 2 ? '#DDE9D2' : '#EDF5E5'} />
                <rect x={x - 24} y={72 + (i % 3) * 18} width="48" height="18" rx="2" fill="#F8C84E" />
                <text x={x} y={85 + (i % 3) * 18} textAnchor="middle" fontSize="7" fontWeight="900" fill="#183024" letterSpacing="1.4">SCHOOL</text>
              </g>
            ))}
          </svg>
          <div className="absolute bus-drive" style={{ bottom: 22, left: 0 }}>
            <svg width="136" height="46" viewBox="0 0 136 46">
              <rect x="4" y="5" width="120" height="32" rx="7" fill="#F28A3D" />
              <rect x="4" y="5" width="120" height="11" rx="7" fill="#D96B1F" />
              {[13, 38, 63, 88].map((x) => <rect key={x} x={x} y="10" width="17" height="13" rx="2" fill="rgba(255,255,255,0.36)" />)}
              <circle cx="28" cy="39" r="5" fill="#183024" /><circle cx="100" cy="39" r="5" fill="#183024" />
            </svg>
          </div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center pb-28">
          <motion.p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>For Schools</motion.p>
          <h1 className="font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2 headline-balance" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#183024' }}>
            {['Give Your School', 'A Transport Operation', 'Worth Trusting.'].map((line, i) => (
              <motion.span key={line} className="phrase-nowrap" initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 + i * 0.12, duration: 0.58 }}>{line}</motion.span>
            ))}
          </h1>
          <motion.p className="max-w-2xl mx-auto text-lg leading-relaxed mb-8" style={{ color: '#65785F' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>Tranzita gives Nigerian schools a managed transport programme with visible routes, accountable crews, parent-ready updates and a clear operations record for every school day.</motion.p>
          <motion.div className="flex flex-wrap justify-center gap-3 mb-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92 }}>
            <a href="/#demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white" style={{ background: '#D96B1F', boxShadow: '0 12px 28px rgba(217,107,31,0.24)' }}>Register Your School <ArrowRight size={16} /></a>
            <a href="/#demo" className="px-6 py-3 rounded-full text-sm font-semibold border" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Request a Demo</a>
            <a href="#school-pack" className="px-6 py-3 rounded-full text-sm font-semibold border" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Download the School Pack</a>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}>
            {pills.map((pill, i) => <motion.span key={pill} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white" style={{ color: '#213A2B', borderColor: '#DDE9D2' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.12 }}>{pill}</motion.span>)}
          </motion.div>
        </div>
      </section>

      <Section background="#FFF9F2" label="The Problem" title="School transport is your biggest safeguarding blind spot." text="When a child leaves your gate in an unregistered vehicle with an unvetted driver, your duty of care does not end. But your ability to act does.">
        <ThreeCards items={problems} />
      </Section>

      <Section background="#F1F6EA" label="The Platform" title="A complete transport command centre built for Nigerian schools." text="The Tranzita School Dashboard replaces phone calls to drivers, end-of-day guesswork, and manual transport registers with a single live view.">
        <DashboardMockup />
        <IconGrid cards={platformCards} />
      </Section>

      <Section background="#FFF9F2" label="White-Label Transport" title="Your school brand in front. Tranzita operations behind it." text="Schools can offer parents a branded onboarding experience while Tranzita keeps control of the approved partner buses, safety procedures and transport execution.">
        <IconGrid cards={schoolRevenue} columns="md:grid-cols-3" />
        <motion.div className="mt-8 rounded-2xl p-7 text-white font-bold text-center" style={{ background: 'linear-gradient(90deg, #1F6B46 0%, #D96B1F 100%)' }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          White-label access only applies to Tranzita-approved partner buses. Schools cannot use the system for vehicles outside the Tranzita fleet.
        </motion.div>
      </Section>

      <Section background="#F1F6EA" label="School Control" title="You decide how the programme runs." text="Tranzita is not a service you hand over to and hope for the best. It is a platform your school controls while Tranzita manages operations.">
        <IconGrid cards={controls} />
      </Section>

      <Section background="#FFF9F2" label="Onboarding" title="Your school can be ready in 10 working days." text="A dedicated onboarding manager takes the work off your admin team and keeps every step moving.">
        <div className="grid md:grid-cols-4 gap-5">
          {onboarding.map(([day, title, body], i) => (
            <motion.div key={title} className="rounded-2xl bg-white p-6 border border-[#DDE9D2]" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }}>
              <div className="text-sm font-extrabold mb-4" style={{ color: '#D96B1F' }}>{day}</div>
              <h3 className="font-extrabold text-xl mb-3" style={{ color: '#183024' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <section id="school-pack" className="py-24 px-4" style={{ background: '#F1F6EA' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <div>
            <Intro label="The School Pack" title="Give every decision-maker the same clear evidence." text="The school pack helps principals, safeguarding leads, finance teams and parents understand exactly how the transport programme works." />
            <a href="/#demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold" style={{ background: '#D96B1F' }}>Request the Pack <ArrowRight size={16} /></a>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {reporting.map(([title, body], i) => (
              <motion.div key={title} className="gradient-frame rounded-2xl p-6" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, rotateY: -18 }} whileInView={{ opacity: 1, rotateY: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <WalletCards size={30} color="#D96B1F" className="mb-4" />
                <h3 className="font-extrabold mb-3" style={{ color: '#183024' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 px-4 text-center" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }}>Ready to make school transport visible?</h2>
          <p className="text-lg mb-8" style={{ color: '#65785F' }}>Book a route review and see what Tranzita would look like for your school, your roads, and your parents.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/#demo" className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-bold" style={{ background: '#D96B1F' }}>Request a Demo <ArrowRight size={18} /></a>
            <a href="/safety" className="px-7 py-4 rounded-full border font-semibold" style={{ color: '#183024', borderColor: '#C9DDBE', background: 'rgba(255,255,255,0.72)' }}>Review Safety</a>
          </div>
        </div>
      </section>
    </>
  )
}

function Intro({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <>
      <motion.p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#D96B1F' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{label}</motion.p>
      <motion.h2 className="font-extrabold text-4xl sm:text-5xl headline-balance mb-4" style={{ color: '#183024' }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{title}</motion.h2>
      <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: '#65785F' }}>{text}</p>
    </>
  )
}

function Section({ background, label, title, text, children }: { background: string; label: string; title: string; text: string; children: React.ReactNode }) {
  return (
    <section className="py-24 px-4" style={{ background }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14"><Intro label={label} title={title} text={text} /></div>
        {children}
      </div>
    </section>
  )
}

function ThreeCards({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map(([title, body], i) => (
        <motion.div key={title} className="gradient-frame rounded-2xl p-7" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -5 }}>
          <h3 className="font-extrabold text-2xl mb-4" style={{ color: '#183024' }}>{title}</h3>
          <p className="leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
        </motion.div>
      ))}
    </div>
  )
}

function DashboardMockup() {
  return (
    <motion.div className="rounded-3xl bg-white p-4 sm:p-6 border border-[#DDE9D2] shadow-xl mb-10" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="flex items-center justify-between mb-5">
        <div><p className="font-extrabold" style={{ color: '#183024' }}>Tranzita School Dashboard</p><p className="text-xs" style={{ color: '#65785F' }}>Afternoon routes live now</p></div>
        <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#F1F6EA', color: '#1F6B46' }}>LIVE</span>
      </div>
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
        <div className="relative min-h-[300px] rounded-2xl overflow-hidden" style={{ background: '#F1F6EA' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 320">
            <path d="M40 250 C160 150, 250 260, 360 145 S520 95, 560 185" stroke="#C9DDBE" strokeWidth="14" fill="none" strokeLinecap="round" />
            <path d="M60 95 C180 70, 260 150, 350 105 S480 65, 545 120" stroke="#DDE9D2" strokeWidth="10" fill="none" strokeLinecap="round" />
          </svg>
          {[
            ['TRZ-001', '14 kids', '16%', '70%'],
            ['TRZ-002', '11 kids', '48%', '42%'],
            ['TRZ-003', '8 kids', '76%', '30%'],
          ].map(([bus, kids, left, top], i) => (
            <motion.div key={bus} className="absolute flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md" style={{ left, top }} animate={{ x: [0, 18, 0], y: [0, i % 2 ? -10 : 10, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#D96B1F' }} /><span className="text-xs font-bold" style={{ color: '#183024' }}>{bus} - {kids}</span>
            </motion.div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#DDE9D2] p-4">
            <p className="font-extrabold mb-3" style={{ color: '#183024' }}>Fleet Status</p>
            <div className="space-y-2">
              {dashboardRows.map(([bus, kids, route, status, color], i) => (
                <motion.div key={bus} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl p-3" style={{ background: '#FFF9F2' }} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.2 }}>
                  <div><p className="text-sm font-bold" style={{ color: '#183024' }}>{bus} - {route}</p><p className="text-xs" style={{ color: '#65785F' }}>{kids} on board</p></div>
                  <span className="flex items-center gap-2 text-xs font-bold" style={{ color }}><span className="w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />{status}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#DDE9D2] p-4">
            <p className="font-extrabold mb-3" style={{ color: '#183024' }}>Live Notifications</p>
            <div className="space-y-2">
              {alerts.map((alert, i) => (
                <motion.div key={alert} className="text-xs rounded-xl bg-[#F1F6EA] p-3" style={{ color: '#183024' }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.25 }}>{alert}</motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function IconGrid({ cards, columns = 'md:grid-cols-2 lg:grid-cols-3' }: { cards: Array<[string, LucideIcon, string]>; columns?: string }) {
  return (
    <div className={`grid ${columns} gap-6`}>
      {cards.map(([title, Icon, body], i) => (
        <motion.div key={title} className="gradient-frame rounded-2xl p-6" style={{ background: '#FFFFFF' }} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }}>
          <Icon size={34} color="#D96B1F" className="mb-5" />
          <h3 className="font-extrabold text-xl mb-3" style={{ color: '#183024' }}>{title}</h3>
          <p className="leading-relaxed" style={{ color: '#65785F' }}>{body}</p>
          {title.startsWith('The ') && <span className="inline-block mt-4 text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(217,107,31,0.12)', color: '#D96B1F' }}>6-Stage Vetted Independently</span>}
        </motion.div>
      ))}
    </div>
  )
}
