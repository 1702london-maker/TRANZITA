'use client'

import { motion } from 'framer-motion'
import {
  BellRing,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  School,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { CommunicationCentre, PortalDataCentre, QRScanCentre } from '@/components/dashboard/DataWidgets'
import { BRAND } from '@/lib/constants'
import { dashboardLinks } from '@/lib/dashboard-links'

type ParentView = 'children' | 'tracking' | 'history' | 'guardians' | 'profile' | 'messages'

const palette = {
  ivory: '#FFF9F2',
  blush: '#FFF0E4',
  orange: '#D96B1F',
  softOrange: '#F28A3D',
  gold: '#F8C84E',
  sage: '#F1F6EA',
  border: '#DDE9D2',
  muted: '#65785F',
  ink: '#183024',
}

const children = [
  {
    name: 'Amara Okorie',
    initials: 'AO',
    className: 'Year 4',
    school: 'Greenfield School',
    route: 'Afternoon Route B',
    status: 'On Bus',
    eta: '18 mins',
    next: 'Guardian arrival window opens in 14 mins',
  },
  {
    name: 'Tomi Okorie',
    initials: 'TO',
    className: 'Year 1',
    school: 'Greenfield School',
    route: 'Afternoon Route B',
    status: 'At School',
    eta: 'Boarding soon',
    next: 'Pickup marshal preparing class line',
  },
]

const journeyHistory = [
  ['Friday, 7 August 2026', 'Afternoon Route B', 'Boarded 3:42 PM', 'Home 4:21 PM', 'Safe'],
  ['Thursday, 6 August 2026', 'Morning Route B', 'Boarded 6:58 AM', 'School 7:33 AM', 'Safe'],
  ['Wednesday, 5 August 2026', 'Afternoon Route B', 'Boarded 3:39 PM', 'Home 4:18 PM', 'Safe'],
  ['Tuesday, 4 August 2026', 'Morning Route B', 'Boarded 7:01 AM', 'School 7:36 AM', 'Safe'],
]

const guardians = [
  ['Zita Okorie', 'Mother', 'Primary WhatsApp', 'Verified'],
  ['Chinedu Okorie', 'Father', 'Backup pickup', 'Verified'],
  ['Ngozi Eze', 'Aunt', 'Emergency contact', 'Verified'],
]

const messages = [
  ['Bus departed school', 'Amara boarded safely. ETA will update if traffic changes.', 'Today, 3:44 PM'],
  ['Guardian reminder', 'Please keep a verified guardian available from 4:16 PM.', 'Today, 3:58 PM'],
  ['Journey summary', 'Yesterday journey completed safely. No welfare flags raised.', 'Yesterday, 4:31 PM'],
]

const parentWhatsappHref = BRAND.whatsappNumber
  ? `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent('Hi Tranzita operations, I need support from my parent portal.')}`
  : '/contact'

export default function ParentPortal({ view }: { view: ParentView }) {
  const titles: Record<ParentView, string> = {
    children: 'My Children',
    tracking: 'Live Tracking',
    history: 'Journey History',
    guardians: 'Guardians',
    profile: 'Parent Profile',
    messages: 'Messages',
  }

  return (
    <DashboardShell role="Parent" title={titles[view]} links={dashboardLinks.parent}>
      <ParentExperience view={view} />
    </DashboardShell>
  )
}

function ParentExperience({ view }: { view: ParentView }) {
  return (
    <div className="space-y-5">
      <ParentHero view={view} />
      {view === 'children' ? <ChildrenView /> : null}
      {view === 'tracking' ? <TrackingView /> : null}
      {view === 'history' ? <HistoryView /> : null}
      {view === 'guardians' ? <GuardiansView /> : null}
      {view === 'profile' ? <ProfileView /> : null}
      {view === 'messages' ? <MessagesView /> : null}
    </div>
  )
}

function ParentHero({ view }: { view: ParentView }) {
  const copy: Record<ParentView, [string, string]> = {
    children: ['A calm view of today.', 'See each child, their current journey state, and the next useful update without operational noise.'],
    tracking: ['Follow the bus without guessing.', 'Live position, ETA, crew names, and safe handover prompts sit in one mobile-first view.'],
    history: ['Every journey documented.', 'Review tap-on, tap-off, guardian confirmation, and journey summaries for your children.'],
    guardians: ['Only verified adults.', 'Manage the people allowed to receive updates and meet your child at drop-off.'],
    profile: ['Your parent account.', 'Keep contact details, WhatsApp preference, home address, and support settings accurate.'],
    messages: ['Support in one place.', 'Journey updates, WhatsApp notices, and parent support messages are organised here.'],
  }

  return (
    <motion.section
      className="overflow-hidden rounded-[28px] bg-white p-5 shadow-sm sm:p-6"
      style={{ border: `1px solid ${palette.border}` }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.orange }}>Parent portal</p>
          <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: palette.ink }}>{copy[view][0]}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: palette.muted }}>{copy[view][1]}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Child updates only', 'Guardian safe handover', 'WhatsApp support'].map((label) => (
              <span key={label} className="rounded-full px-3 py-2 text-xs font-extrabold" style={{ background: palette.blush, color: palette.ink }}>
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.muted }}>Next drop-off</span>
            <Clock3 size={18} color={palette.orange} />
          </div>
          <p className="mt-3 text-4xl font-extrabold" style={{ color: palette.ink }}>18 mins</p>
          <p className="mt-2 text-sm font-bold" style={{ color: palette.muted }}>Amara is on Afternoon Route B.</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full" style={{ background: palette.sage }}>
            <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${palette.orange}, ${palette.gold})` }} initial={{ width: '12%' }} animate={{ width: '68%' }} transition={{ duration: 1.2 }} />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function ChildrenView() {
  return (
    <>
      <PortalDataCentre
        title="Family Journey Data Centre"
        subtitle="Parent-safe view of attendance, journey status, alerts and handover performance"
        pies={[['On time', 82, palette.orange], ['Traffic watch', 12, palette.gold], ['At school', 6, '#7EA06D']]}
        bars={[['Mon', 72], ['Tue', 86], ['Wed', 80], ['Thu', 90], ['Fri', 78], ['Sat', 0], ['Sun', 0]]}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {children.map((child, index) => (
          <motion.article
            key={child.name}
            className="rounded-[28px] bg-white p-5 shadow-sm"
            style={{ border: `1px solid ${palette.border}` }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] text-lg font-extrabold" style={{ background: palette.blush, color: palette.orange }}>
                {child.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-extrabold" style={{ color: palette.ink }}>{child.name}</h3>
                  <StatusPill label={child.status} />
                </div>
                <p className="mt-1 text-sm font-bold" style={{ color: palette.muted }}>{child.className} - {child.school}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <InfoTile icon={<Route size={17} />} label="Route" value={child.route} />
              <InfoTile icon={<Clock3 size={17} />} label="ETA" value={child.eta} />
              <InfoTile icon={<BellRing size={17} />} label="Next" value={child.next} />
            </div>
            <a href="/dashboard/parent/tracking" className="mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${palette.orange}, ${palette.softOrange})` }}>
              Track now
            </a>
          </motion.article>
        ))}
      </div>
      <ParentCarePanel />
      <QRScanCentre
        role="Parent"
        rows={[
          ['Child pickup card', 'Today, 3:41 PM', 'Amara matched to guardian list', 'View child status'],
          ['Bus QR', 'Today, 3:45 PM', 'TRZ-B012 confirmed', 'Open live route'],
          ['Guardian QR', 'Yesterday, 4:18 PM', 'Zita Okorie verified', 'Download handover receipt'],
        ]}
      />
    </>
  )
}

function TrackingView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
      <Panel title="Amara's Live Route" subtitle="Bus position, home, school, and route path">
        <div className="relative mt-5 h-[460px] overflow-hidden rounded-[26px]" style={{ background: `linear-gradient(135deg, ${palette.sage}, ${palette.ivory})`, border: `1px solid ${palette.border}` }}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 420" preserveAspectRatio="none">
            <path d="M70 320 C150 130 250 360 345 190 C455 15 545 250 655 92" fill="none" stroke={palette.orange} strokeWidth="7" strokeLinecap="round" strokeDasharray="14 14" />
            <circle cx="70" cy="320" r="13" fill={palette.gold} />
            <circle cx="655" cy="92" r="13" fill={palette.softOrange} />
          </svg>
          <MapLabel className="left-6 bottom-6" icon={<Home size={16} />} label="Home" />
          <MapLabel className="right-6 top-6" icon={<School size={16} />} label="School" />
          <motion.div
            className="absolute left-[12%] top-[62%] rounded-full bg-white p-3 shadow-lg"
            animate={{ x: [0, 140, 290, 430], y: [0, -96, -36, -190] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="relative flex">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40" style={{ background: palette.orange }} />
              <Route size={24} color={palette.orange} />
            </span>
          </motion.div>
          <div className="absolute left-4 right-4 top-4 rounded-2xl bg-white/95 p-4 shadow-sm" style={{ border: `1px solid ${palette.border}` }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-extrabold" style={{ color: palette.ink }}>ETA home: 18 mins</p>
              <StatusPill label="Live" />
            </div>
          </div>
        </div>
      </Panel>
      <Panel title="Journey Crew" subtitle="Visible safety contacts for parents">
        <div className="mt-5 space-y-3">
          {[
            ['Bus ID', 'TRZ-B012'],
            ['Driver', 'Emeka Okafor'],
            ['Co-driver', 'Aisha Bello'],
            ['Nurse', 'Nurse Zita'],
            ['Children on board', '8'],
            ['Current speed', '42 km/h'],
          ].map(([label, value]) => <InfoRow key={label} label={label} value={value} />)}
        </div>
        <a href={parentWhatsappHref} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${palette.orange}, ${palette.softOrange})` }}>
          <MessageCircle size={18} /> WhatsApp support
        </a>
      </Panel>
    </div>
  )
}

function HistoryView() {
  return (
    <Panel title="Journey Log" subtitle="Tap records, handover times, and safe journey status">
      <ResponsiveTable headers={['Date', 'Route', 'Boarded', 'Completed', 'Status']} rows={journeyHistory} />
    </Panel>
  )
}

function GuardiansView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <Panel title="Verified Guardians" subtitle="Adults allowed to receive updates and meet your child">
        <ResponsiveTable headers={['Name', 'Relationship', 'Role', 'Status']} rows={guardians} />
      </Panel>
      <Panel title="Guardian Rules" subtitle="Safe handover settings">
        <div className="mt-5 space-y-3">
          {['Only verified guardians can receive drop-off handover.', 'No-guardian events keep the child safe on the bus.', 'Emergency contacts are handled through the approved support escalation flow.'].map((rule) => (
            <div key={rule} className="flex gap-3 rounded-2xl p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
              <ShieldCheck className="shrink-0" size={19} color={palette.orange} />
              <p className="text-sm font-bold leading-6" style={{ color: palette.ink }}>{rule}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function ProfileView() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <Panel title="Parent Details" subtitle="Account and contact information">
        <div className="mt-5 space-y-3">
          <InfoRow label="Name" value="Zita Okorie" />
          <InfoRow label="WhatsApp" value="" />
          <InfoRow label="Email" value="zita@example.com" />
          <InfoRow label="Preferred alerts" value="WhatsApp + in-app" />
        </div>
      </Panel>
      <Panel title="Home Address" subtitle="Used for safe drop-off planning">
        <div className="mt-5 rounded-[22px] p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
          <MapPin size={22} color={palette.orange} />
          <p className="mt-3 text-sm font-bold leading-6" style={{ color: palette.ink }}>Lekki Phase 1, Lagos</p>
          <p className="mt-2 text-xs font-bold" style={{ color: palette.muted }}>Geofence active for arrival reminders.</p>
        </div>
      </Panel>
      <Panel title="Support Preference" subtitle="How Tranzita reaches you">
        <div className="mt-5 space-y-3">
          {['Journey departure', 'ETA change over 3 mins', 'Arrival warning', 'Journey summary'].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl p-3" style={{ background: palette.ivory }}>
              <span className="text-sm font-bold" style={{ color: palette.ink }}>{item}</span>
              <CheckCircle2 size={18} color={palette.orange} />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function MessagesView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <Panel title="Parent Messages" subtitle="Journey updates and support notes">
        <div className="mt-5 space-y-3">
          {messages.map(([title, body, time], index) => (
            <motion.div key={title} className="rounded-[22px] p-4" style={{ background: index === 0 ? palette.blush : palette.ivory, border: `1px solid ${palette.border}` }} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-extrabold" style={{ color: palette.ink }}>{title}</p>
                <span className="text-xs font-bold" style={{ color: palette.muted }}>{time}</span>
              </div>
              <p className="mt-2 text-sm leading-6" style={{ color: palette.muted }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </Panel>
      <Panel title="Contact Support" subtitle="For parent journey help">
        <div className="mt-5 space-y-3">
          <a href={parentWhatsappHref} className="flex items-center gap-3 rounded-2xl p-4 font-extrabold" style={{ background: palette.blush, color: palette.ink }}>
            <MessageCircle size={20} color={palette.orange} /> WhatsApp operations
          </a>
          <a href="mailto:booking@tranzita.africa?subject=Parent%20portal%20call%20request" className="flex items-center gap-3 rounded-2xl p-4 font-extrabold" style={{ background: palette.ivory, color: palette.ink, border: `1px solid ${palette.border}` }}>
            <Phone size={20} color={palette.orange} /> Call support desk
          </a>
        </div>
      </Panel>
      <CommunicationCentre role="Parent" />
    </div>
  )
}

function ParentCarePanel() {
  return (
    <Panel title="Today at a Glance" subtitle="Only parent-visible movement and care updates">
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <InfoTile icon={<UserRoundCheck size={17} />} label="Guardian readiness" value="Primary guardian confirmed" />
        <InfoTile icon={<BellRing size={17} />} label="Notifications" value="6 delivered today" />
        <InfoTile icon={<ShieldCheck size={17} />} label="Welfare" value="No concern raised" />
      </div>
    </Panel>
  )
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.section className="rounded-[28px] bg-white p-5 shadow-sm sm:p-6" style={{ border: `1px solid ${palette.border}` }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div>
        <h3 className="text-xl font-extrabold" style={{ color: palette.ink }}>{title}</h3>
        <p className="mt-1 text-sm leading-6" style={{ color: palette.muted }}>{subtitle}</p>
      </div>
      {children}
    </motion.section>
  )
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-[20px] p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.orange }}>{icon}{label}</div>
      <p className="mt-2 text-sm font-extrabold leading-6" style={{ color: palette.ink }}>{value}</p>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl p-3" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
      <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.muted }}>{label}</span>
      <span className="text-right text-sm font-extrabold" style={{ color: palette.ink }}>{value}</span>
    </div>
  )
}

function StatusPill({ label }: { label: string }) {
  return (
    <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: label === 'Live' || label === 'On Bus' ? palette.blush : palette.sage, color: palette.orange }}>
      {label}
    </span>
  )
}

function MapLabel({ className, icon, label }: { className: string; icon: React.ReactNode; label: string }) {
  return (
    <div className={`absolute flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-extrabold shadow-sm ${className}`} style={{ color: palette.ink, border: `1px solid ${palette.border}` }}>
      <span style={{ color: palette.orange }}>{icon}</span>{label}
    </div>
  )
}

function ResponsiveTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead style={{ color: palette.muted }}>
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-extrabold">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('-')} className="border-t" style={{ borderColor: palette.border }}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`} className="px-4 py-4 font-bold" style={{ color: index === row.length - 1 ? palette.orange : palette.ink }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
