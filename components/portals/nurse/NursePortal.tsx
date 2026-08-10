'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import {
  Activity,
  AlertCircle,
  BadgeCheck,
  ClipboardCheck,
  HeartPulse,
  Hospital,
  NotebookPen,
  Pill,
  ShieldCheck,
  Siren,
  Stethoscope,
  UserRoundCheck,
} from 'lucide-react'
import { CommunicationCentre, PortalDataCentre, QRScanCentre, TemperatureRegister } from '@/components/dashboard/DataWidgets'

type NurseView = 'today' | 'children' | 'welfare' | 'firstaid' | 'profile'

const palette = {
  ink: '#183024',
  muted: '#65785F',
  orange: '#D96B1F',
  softOrange: '#F28A3D',
  blush: '#FFF0E4',
  ivory: '#FFF9F2',
  sage: '#F1F6EA',
  border: '#DDE9D2',
  gold: '#F8C84E',
}

const children = [
  {
    name: 'Zara Bello',
    className: 'Year 4',
    status: 'On board',
    seat: 'Front left',
    condition: 'Asthma watch',
    allergies: 'Dust sensitivity',
    medication: 'Blue inhaler in nurse pouch',
    contact: 'Emergency guardian: Hauwa Bello',
    summary: 'Can become breathless during long traffic stops. Keep windows calm, avoid dust exposure, observe breathing after boarding.',
    flag: 'Review before route leaves school',
  },
  {
    name: 'David Musa',
    className: 'Year 3',
    status: 'Boarded',
    seat: 'Middle aisle',
    condition: 'Motion sickness',
    allergies: 'No recorded allergy',
    medication: 'Water and mint lozenge approved',
    contact: 'Emergency guardian: Grace Musa',
    summary: 'Seat forward-facing. Check once after route starts and again before third stop.',
    flag: 'Routine comfort check',
  },
  {
    name: 'Tomi Adewale',
    className: 'Year 2',
    status: 'Pending pickup',
    seat: 'Assigned after boarding',
    condition: 'Recent fever note',
    allergies: 'Penicillin allergy',
    medication: 'No medicine to administer on board',
    contact: 'Emergency guardian: School safeguarding desk',
    summary: 'Parent noted fever yesterday. Confirm child looks settled before departure and record any concern.',
    flag: 'Temperature concern watch',
  },
  {
    name: 'Amara Okorie',
    className: 'Year 5',
    status: 'At school',
    seat: 'Rear right',
    condition: 'No known condition',
    allergies: 'No recorded allergy',
    medication: 'None',
    contact: 'Emergency guardian: Ada Okorie',
    summary: 'No routine intervention required. Standard welfare observation only.',
    flag: 'Clear',
  },
]

const welfareNotes = [
  ['Zara Bello', 'Observation', 'Breathing calm after boarding. Inhaler confirmed present.', 'School note only'],
  ['Tomi Adewale', 'Concern', 'Looked tired at pickup gate. Monitor before vehicle moves.', 'Parent notify if repeated'],
  ['David Musa', 'Observation', 'Asked to sit forward because of motion sickness history.', 'Logged'],
]

const firstAidItems = [
  ['Sterile dressings', 'Sealed', 'Ready'],
  ['Gloves and sanitiser', 'Stocked', 'Ready'],
  ['Emergency child medication list', 'Route B loaded', 'Review before departure'],
  ['Digital thermometer', 'Battery checked', 'Ready'],
  ['AED location', 'School reception and partner clinic', 'Confirmed'],
]

type NurseActionButtonProps = {
  endpoint: string
  payload: Record<string, unknown>
  label: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

function NurseActionButton({ endpoint, payload, label, className, style, children }: NurseActionButtonProps) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  async function handleClick() {
    setState('saving')
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setState(response.ok ? 'saved' : 'error')
  }

  const suffix = state === 'saving' ? '...' : state === 'saved' ? ' Saved' : state === 'error' ? ' Retry' : ''

  return (
    <button type="button" onClick={handleClick} className={className} style={style}>
      {children || label}{suffix}
    </button>
  )
}

export default function NursePortal({ view }: { view: NurseView }) {
  const content = getViewCopy(view)

  return (
    <div className="space-y-5">
      <NurseHero view={view} eyebrow={content.eyebrow} title={content.title} body={content.body} />
      {view === 'today' ? <TodayView /> : null}
      {view === 'children' ? <ChildrenView /> : null}
      {view === 'welfare' ? <WelfareView /> : null}
      {view === 'firstaid' ? <FirstAidView /> : null}
      {view === 'profile' ? <ProfileView /> : null}
    </div>
  )
}

function NurseHero({ view, eyebrow, title, body }: { view: NurseView; eyebrow: string; title: string; body: string }) {
  return (
    <motion.section
      className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-sm sm:p-8"
      style={{ border: `1px solid ${palette.border}` }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full sm:block" style={{ background: palette.blush }} />
      <div className="relative z-10 grid gap-6 xl:grid-cols-[1fr_360px] xl:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.orange }}>{eyebrow}</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl" style={{ color: palette.ink }}>{title}</h2>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed" style={{ color: palette.muted }}>{body}</p>
        </div>
        <div className="rounded-[24px] p-5" style={{ background: `linear-gradient(135deg, ${palette.blush}, ${palette.ivory})`, border: `1px solid ${palette.border}` }}>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white" style={{ color: palette.orange }}>
              <HeartPulse size={24} />
            </span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.muted }}>Route health assignment</p>
              <p className="text-lg font-extrabold" style={{ color: palette.ink }}>Route B12 Afternoon</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-bold" style={{ color: palette.ink }}>
            <Badge label="Vehicle" value="TRZ-B012" />
            <Badge label="Manifest" value="18 children" />
            <Badge label="Driver" value="Emeka" />
            <Badge label="Co-driver" value="Tosin" />
          </div>
          {view === 'today' ? <AnimatedPulse /> : null}
        </div>
      </div>
    </motion.section>
  )
}

function TodayView() {
  return (
    <>
      <MetricGrid
        items={[
          ['Children on route', '18', '4 medical notes', Stethoscope],
          ['Known allergies', '2', 'Visible to nurse only', AlertCircle],
          ['Emergency meds', '1', 'Confirmed on board', Pill],
          ['Welfare flags', '1', 'Observation level', NotebookPen],
        ]}
      />
      <PortalDataCentre
        title="Nurse Care Data Centre"
        subtitle="Route health view with welfare observations, checks completed, first aid readiness and temperature watch"
        pies={[['Cleared', 76, palette.orange], ['Watch', 18, palette.gold], ['Needs note', 6, '#7EA06D']]}
        bars={[['AM temp', 82], ['Noon temp', 74], ['Med cards', 94], ['Kit', 100], ['Notes', 44], ['Calls', 20]]}
      />
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <Panel title="Priority Health Watch" subtitle="Visible medical information for today's assigned route only">
          <div className="mt-5 space-y-3">
            {children.filter((child) => child.condition !== 'No known condition').map((child, index) => (
              <ChildAlert key={child.name} child={child} index={index} />
            ))}
          </div>
        </Panel>
        <Panel title="Route Protocol" subtitle="Health checks before the bus leaves the school gate">
          <Checklist
            rows={[
              ['Medical cards reviewed', 'Done'],
              ['Emergency medication confirmed', 'Done'],
              ['Kit seal inspected', 'Done'],
              ['Nearest hospital checked', '8 mins'],
              ['Operations escalation line ready', 'Ready'],
            ]}
          />
        </Panel>
      </div>
      <TemperatureRegister
        rows={[
          ['Zara Bello', '36.7 C', '36.9 C', 'Normal', 'Monitor asthma watch'],
          ['David Musa', '36.5 C', '36.6 C', 'Normal', 'Comfort check'],
          ['Tomi Adewale', '37.6 C', '37.4 C', 'Watch', 'Recheck before departure'],
          ['Amara Okorie', '36.4 C', '36.5 C', 'Normal', 'No action'],
        ]}
      />
      <QRScanCentre
        role="Nurse"
        rows={[
          ['Child medical QR', 'Today, 7:08 AM', 'Medical card opened', 'Record reading'],
          ['First aid kit QR', 'Today, 6:51 AM', 'Kit seal confirmed', 'Open checklist'],
          ['Bus QR', 'Today, 6:55 AM', 'Route B12 matched', 'View health manifest'],
        ]}
      />
      <CommunicationCentre role="Nurse" email={false} />
    </>
  )
}

function ChildrenView() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {children.map((child, index) => (
        <motion.article
          key={child.name}
          className="rounded-[28px] bg-white p-5 shadow-sm"
          style={{ border: `1px solid ${palette.border}` }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold" style={{ background: palette.blush, color: palette.orange }}>
                {child.name.split(' ').map((part) => part[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-extrabold" style={{ color: palette.ink }}>{child.name}</h3>
                <p className="text-sm font-bold" style={{ color: palette.muted }}>{child.className} - {child.status} - {child.seat}</p>
              </div>
            </div>
            <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: child.flag === 'Clear' ? palette.sage : palette.blush, color: child.flag === 'Clear' ? palette.muted : palette.orange }}>{child.flag}</span>
          </div>
          <div className="mt-5 rounded-[22px] p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
            <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.orange }}>Laminated medical card</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <Info label="Known condition" value={child.condition} />
              <Info label="Allergies" value={child.allergies} />
              <Info label="Emergency medication" value={child.medication} />
              <Info label="Emergency contact" value={child.contact} />
            </dl>
            <p className="mt-4 text-sm font-semibold leading-relaxed" style={{ color: palette.muted }}>{child.summary}</p>
          </div>
          <NurseActionButton endpoint="/api/nurse/welfare-notes" label={`Flag Welfare Concern: ${child.name}`} payload={{ child: child.name, severity: child.condition === 'No known condition' ? 'Observation' : 'Concern', observation: `${child.flag}. ${child.summary}`, notifySchool: true, notifyParent: child.flag !== 'Clear' }} className="mt-4 w-full rounded-2xl px-4 py-3 text-sm font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${palette.orange}, ${palette.softOrange})` }}>
            Flag Welfare Concern
          </NurseActionButton>
        </motion.article>
      ))}
    </div>
  )
}

function WelfareView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
      <Panel title="Write Welfare Note" subtitle="Route-scoped note for a child on today's manifest">
        <div className="mt-5 space-y-4">
          <FormField label="Child" value="Tomi Adewale" />
          <FormField label="Severity" value="Concern" />
          <label className="block">
            <span className="text-sm font-extrabold" style={{ color: palette.ink }}>Observation</span>
            <textarea className="mt-2 h-32 w-full resize-none rounded-2xl px-4 py-3 text-sm font-semibold outline-none" style={{ background: palette.ivory, border: `1px solid ${palette.border}`, color: palette.ink }} defaultValue="Child looked tired at pickup. Recheck before departure and notify parent only if concern continues." />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle label="Notify school" checked />
            <Toggle label="Notify parent now" />
          </div>
          <NurseActionButton endpoint="/api/nurse/welfare-notes" label="Submit Welfare Note" payload={{ child: 'Tomi Adewale', severity: 'Concern', observation: 'Child looked tired at pickup. Recheck before departure and notify parent only if concern continues.', notifySchool: true, notifyParent: false }} className="w-full rounded-2xl px-4 py-3 text-sm font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${palette.orange}, ${palette.softOrange})` }}>
            Submit Welfare Note
          </NurseActionButton>
        </div>
      </Panel>
      <Panel title="Previous Welfare Notes" subtitle="Medical/welfare observations only, no non-medical parent private details">
        <div className="mt-5 space-y-3">
          {welfareNotes.map(([child, severity, note, action], index) => (
            <motion.div key={`${child}-${note}`} className="rounded-2xl p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-extrabold" style={{ color: palette.ink }}>{child}</p>
                  <p className="mt-1 text-sm font-semibold" style={{ color: palette.muted }}>{note}</p>
                </div>
                <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: severity === 'Concern' ? palette.blush : palette.sage, color: severity === 'Concern' ? palette.orange : palette.muted }}>{severity}</span>
              </div>
              <p className="mt-3 text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.orange }}>{action}</p>
            </motion.div>
          ))}
        </div>
      </Panel>
    </div>
  )
}

function FirstAidView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
      <Panel title="First Aid Kit Checklist" subtitle="Pre-departure health readiness for today's assigned bus">
        <Checklist rows={firstAidItems} />
        <NurseActionButton endpoint="/api/nurse/first-aid-actions" label="Confirm Kit Readiness" payload={{ action: 'Full first aid kit checklist', status: 'completed', note: 'Nurse confirmed all first aid readiness checks before route movement.' }} className="mt-4 w-full rounded-2xl px-4 py-3 text-sm font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${palette.orange}, ${palette.softOrange})` }} />
      </Panel>
      <Panel title="Emergency Protocol" subtitle="Clear nurse actions during route escalation">
        <div className="mt-5 space-y-3">
          {[
            ['1', 'Stabilise child and keep seated safely.'],
            ['2', 'Tell co-driver to pause movement protocol if required.'],
            ['3', 'Call operations medical escalation line.'],
            ['4', 'Notify school safeguarding lead through operations.'],
            ['5', 'Nearest hospital: Lagoon Hospital, 8 minutes from current route segment.'],
          ].map(([step, text]) => (
            <div key={step} className="flex gap-3 rounded-2xl p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: palette.orange }}>{step}</span>
              <p className="text-sm font-bold leading-relaxed" style={{ color: palette.ink }}>{text}</p>
            </div>
          ))}
          <div className="grid gap-3 sm:grid-cols-3">
            <EmergencyButton icon={Siren} label="Ambulance" />
            <EmergencyButton icon={ShieldCheck} label="Operations" />
            <EmergencyButton icon={Hospital} label="Hospital" />
          </div>
        </div>
      </Panel>
    </div>
  )
}

function ProfileView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <Panel title="Nurse Profile" subtitle="Professional record and Tranzita route readiness">
        <div className="mt-5 flex items-center gap-4 rounded-[24px] p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-extrabold" style={{ background: palette.blush, color: palette.orange }}>NH</div>
          <div>
            <h3 className="text-2xl font-extrabold" style={{ color: palette.ink }}>Nurse Halima</h3>
            <p className="font-bold" style={{ color: palette.muted }}>TRZ-NRS-021 - Onboard nurse</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoCard label="NMC registration" value="NMC-24-8130" />
          <InfoCard label="Safeguarding" value="Valid until 18 May 2027" />
          <InfoCard label="First aid certification" value="Valid until 9 Jan 2027" />
          <InfoCard label="Medical clearance" value="Cleared" />
        </div>
      </Panel>
      <Panel title="Performance and Care Record" subtitle="Only nurse-owned professional metrics are shown here">
        <MetricGrid
          compact
          items={[
            ['Journey count', '126', 'This academic year', ClipboardCheck],
            ['Welfare notes', '38', 'Submitted responsibly', NotebookPen],
            ['First aid checks', '100%', 'Completed before route', BadgeCheck],
            ['Care rating', '4.9/5', 'School feedback', UserRoundCheck],
          ]}
        />
      </Panel>
    </div>
  )
}

function MetricGrid({ items, compact = false }: { items: Array<[string, string, string, React.ElementType]>; compact?: boolean }) {
  return (
    <div className={`grid gap-4 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-4'}`}>
      {items.map(([label, value, note, Icon], index) => (
        <motion.div key={label} className="rounded-[24px] bg-white p-5 shadow-sm" style={{ border: `1px solid ${palette.border}` }} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: palette.blush, color: palette.orange }}>
            <Icon size={22} />
          </span>
          <p className="mt-4 text-sm font-bold" style={{ color: palette.muted }}>{label}</p>
          <p className="mt-1 text-3xl font-extrabold" style={{ color: palette.ink }}>{value}</p>
          <p className="mt-1 text-xs font-extrabold" style={{ color: palette.orange }}>{note}</p>
        </motion.div>
      ))}
    </div>
  )
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.section className="rounded-[28px] bg-white p-5 shadow-sm" style={{ border: `1px solid ${palette.border}` }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold" style={{ color: palette.ink }}>{title}</h3>
          <p className="mt-1 text-sm font-semibold" style={{ color: palette.muted }}>{subtitle}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: palette.blush, color: palette.orange }}>NURSE</span>
      </div>
      {children}
    </motion.section>
  )
}

function ChildAlert({ child, index }: { child: (typeof children)[number]; index: number }) {
  return (
    <motion.div className="rounded-2xl p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-extrabold" style={{ color: palette.ink }}>{child.name}</p>
          <p className="mt-1 text-sm font-semibold" style={{ color: palette.muted }}>{child.condition} - {child.allergies}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: palette.blush, color: palette.orange }}>{child.status}</span>
      </div>
      <p className="mt-3 text-sm font-bold" style={{ color: palette.ink }}>{child.medication}</p>
    </motion.div>
  )
}

function Checklist({ rows }: { rows: string[][] }) {
  return (
    <div className="mt-5 space-y-3">
      {rows.map(([item, state, action], index) => (
        <motion.div key={item} className="grid gap-3 rounded-2xl p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
          <p className="font-extrabold" style={{ color: palette.ink }}>{item}</p>
          <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: palette.sage, color: palette.muted }}>{state}</span>
          {action ? <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: palette.blush, color: palette.orange }}>{action}</span> : null}
        </motion.div>
      ))}
    </div>
  )
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-3">
      <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: palette.muted }}>{label}</p>
      <p className="mt-1 text-sm font-extrabold" style={{ color: palette.ink }}>{value}</p>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.muted }}>{label}</dt>
      <dd className="mt-1 font-extrabold" style={{ color: palette.ink }}>{value}</dd>
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
      <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: palette.muted }}>{label}</p>
      <p className="mt-2 font-extrabold" style={{ color: palette.ink }}>{value}</p>
    </div>
  )
}

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-extrabold" style={{ color: palette.ink }}>{label}</span>
      <input className="mt-2 w-full rounded-2xl px-4 py-3 text-sm font-semibold outline-none" style={{ background: palette.ivory, border: `1px solid ${palette.border}`, color: palette.ink }} defaultValue={value} />
    </label>
  )
}

function Toggle({ label, checked = false }: { label: string; checked?: boolean }) {
  return (
    <label className="flex items-center justify-between rounded-2xl p-4" style={{ background: palette.ivory, border: `1px solid ${palette.border}` }}>
      <span className="text-sm font-extrabold" style={{ color: palette.ink }}>{label}</span>
      <input type="checkbox" defaultChecked={checked} className="h-5 w-5 accent-[#D96B1F]" />
    </label>
  )
}

function EmergencyButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <NurseActionButton endpoint="/api/nurse/emergency-events" label={label} payload={{ type: label.toLowerCase(), child: 'Route child', note: `${label} escalation started from the nurse portal.` }} className="rounded-2xl px-4 py-3 text-sm font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${palette.orange}, ${palette.softOrange})` }}>
      <span className="inline-flex items-center gap-2"><Icon size={16} />{label}</span>
    </NurseActionButton>
  )
}

function AnimatedPulse() {
  return (
    <div className="relative mt-5 h-2 overflow-hidden rounded-full" style={{ background: 'rgba(217,107,31,0.16)' }}>
      <motion.div className="absolute inset-y-0 left-0 w-1/3 rounded-full" style={{ background: `linear-gradient(90deg, ${palette.orange}, ${palette.gold})` }} animate={{ x: ['-100%', '320%'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
    </div>
  )
}

function getViewCopy(view: NurseView) {
  const copy = {
    today: {
      eyebrow: 'Today',
      title: 'Route welfare control for the nurse on board.',
      body: 'See the assigned route, crew, children with medical notes, first aid readiness, and the protocol that keeps care visible without exposing admin, billing, partner, or private parent details.',
    },
    children: {
      eyebrow: 'Children',
      title: "Medical cards for the children on today's route.",
      body: 'Each card focuses on known conditions, allergies, emergency medication, route seat awareness, and the fastest welfare action the nurse may need during the journey.',
    },
    welfare: {
      eyebrow: 'Welfare notes',
      title: 'Record clear observations and choose the right notification path.',
      body: 'The nurse can write observations, mark severity, and decide whether the school or parent should be notified through the operations workflow.',
    },
    firstaid: {
      eyebrow: 'First aid',
      title: 'Pre-departure kit checks and emergency response protocol.',
      body: 'A clean checklist for route health readiness, nearest hospital reference, and escalation buttons that keep the nurse focused during pressure.',
    },
    profile: {
      eyebrow: 'Profile',
      title: 'Nurse credentials, certification status, and care record.',
      body: "The profile shows only the nurse's own professional information, route readiness, and care metrics relevant to their Tranzita assignment.",
    },
  } satisfies Record<NurseView, { eyebrow: string; title: string; body: string }>

  return copy[view]
}
