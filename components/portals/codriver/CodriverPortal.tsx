'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  BadgeCheck,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  HeartPulse,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
  UserCheck,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { CommunicationCentre, PortalDataCentre, QRScanCentre } from '@/components/dashboard/DataWidgets'
import { dashboardLinks } from '@/lib/dashboard-links'

type CodriverPage = 'today' | 'manifest' | 'children' | 'alerts' | 'profile'

const colors = {
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

const assignment = {
  route: 'Greenfield Route B',
  vehicle: 'TRZ-B012',
  driver: 'Emeka Okafor',
  nurse: 'Nurse Adaeze',
  school: 'Greenfield School',
  status: 'Afternoon loading',
  window: '15:05 - 16:42',
  nextStop: 'Lekki Phase 1 cluster',
}

const manifest = [
  {
    name: 'Amara Okorie',
    className: 'Year 3',
    address: 'Admiralty Way',
    photo: 'AO',
    status: 'Tapped on',
    guardian: 'Mrs Okorie',
    guardianState: 'Verified mother',
    flag: 'Clear',
    note: 'Seated row 2. Parent notified.',
    tone: 'ready',
  },
  {
    name: 'Tomi Adewale',
    className: 'Year 2',
    address: 'Freedom Way',
    photo: 'TA',
    status: 'Pending tap',
    guardian: 'Backup guardian listed',
    guardianState: 'Confirm at gate',
    flag: 'Welfare watch',
    note: 'Recent fever note from nurse. Confirm energy level before drop-off.',
    tone: 'watch',
  },
  {
    name: 'Zara Bello',
    className: 'Year 5',
    address: 'Oniru Estate',
    photo: 'ZB',
    status: 'Tapped on',
    guardian: 'Mr Bello',
    guardianState: 'Verified father',
    flag: 'Medical note',
    note: 'Asthma inhaler listed. Nurse aware for handoff.',
    tone: 'medical',
  },
  {
    name: 'David Musa',
    className: 'Year 1',
    address: 'Victoria Island',
    photo: 'DM',
    status: 'Absent logged',
    guardian: 'School office',
    guardianState: 'Absence confirmed',
    flag: 'Absent',
    note: 'School marked not travelling today. No parent ETA sent.',
    tone: 'absent',
  },
]

const alerts = [
  ['No guardian protocol ready', 'Use only if verified guardian is not present at the door.', 'High', 'Drop-off'],
  ['Operations message', 'Route B should hold all unconfirmed drop-offs on board and call control.', 'Medium', 'Now'],
  ['Manifest audit', 'Two tap records need guardian name before journey close.', 'Medium', 'Before close'],
  ['Medical handoff', 'Zara Bello has an asthma note. Nurse handoff required before release.', 'High', 'Next stop'],
]

const profileFacts = [
  ['Tranzita ID', 'TRZ-CD-019'],
  ['Vetting status', 'Cleared'],
  ['Safeguarding certificate', 'Valid until 18 March 2027'],
  ['Journeys supported', '186'],
  ['Guardian confirmations', '1,842'],
  ['Rating', '4.9 / 5'],
]

type ActionState = 'idle' | 'saving' | 'saved' | 'error'
type MovementAction = 'tap_on' | 'tap_off' | 'absent'

export function CodriverPortal({ page }: { page: CodriverPage }) {
  return (
    <DashboardShell role="Copilot" title={titles[page]} links={dashboardLinks.codriver}>
      <div className="mx-auto max-w-7xl space-y-5">
        <CopilotHero page={page} />
        {page === 'today' && <TodayView />}
        {page === 'manifest' && <ManifestView />}
        {page === 'children' && <ChildrenView />}
        {page === 'alerts' && <AlertsView />}
        {page === 'profile' && <ProfileView />}
      </div>
    </DashboardShell>
  )
}

const titles: Record<CodriverPage, string> = {
  today: 'Copilot Today',
  manifest: 'Tap & Guardian Manifest',
  children: 'Children Handoff Register',
  alerts: 'Copilot Alerts',
  profile: 'Copilot Profile',
}

function CopilotHero({ page }: { page: CodriverPage }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[28px] border bg-white p-5 shadow-sm sm:p-7"
      style={{ borderColor: colors.border }}
    >
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: colors.orange }}>
            Child movement control
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl" style={{ color: colors.ink }}>
            Every tap, guardian check, and handoff accounted for.
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 sm:text-base" style={{ color: colors.muted }}>
            Co-drivers see only what they need for today&apos;s route: child identity, tap on/off state, authorised guardian checks, absence protocol, and medical or welfare flags for safe release.
          </p>
        </div>
        <div className="rounded-[24px] p-4" style={{ background: `linear-gradient(135deg, ${colors.blush}, ${colors.sage})` }}>
          <div className="grid grid-cols-2 gap-3">
            <Metric label="Manifest" value="18" detail="children today" />
            <Metric label="Tapped on" value="16" detail="2 to confirm" />
            <Metric label="Guardian flags" value="0" detail="no active block" />
            <Metric label="Current page" value={pageLabel[page]} detail={assignment.status} />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const pageLabel: Record<CodriverPage, string> = {
  today: 'Today',
  manifest: 'Manifest',
  children: 'Children',
  alerts: 'Alerts',
  profile: 'Profile',
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border bg-white/85 p-4" style={{ borderColor: colors.border }}>
      <p className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: colors.muted }}>{label}</p>
      <p className="mt-2 text-2xl font-extrabold" style={{ color: colors.ink }}>{value}</p>
      <p className="mt-1 text-xs font-bold" style={{ color: colors.orange }}>{detail}</p>
    </div>
  )
}

function TodayView() {
  return (
    <>
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Today&apos;s assignment" icon={<ClipboardCheck size={20} />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['Route', assignment.route],
              ['Vehicle', assignment.vehicle],
              ['Driver', assignment.driver],
              ['Nurse', assignment.nurse],
              ['School', assignment.school],
              ['Route window', assignment.window],
            ].map(([label, value]) => <InfoPill key={label} label={label} value={value} />)}
          </div>
        </Panel>
        <Panel title="Safe release workflow" icon={<ShieldCheck size={20} />}>
          <StepFlow />
        </Panel>
        <Panel title="Handoff priorities" icon={<HeartPulse size={20} />}>
          <ActionList rows={[
            ['Confirm two pending taps before vehicle leaves school gate.', 'Before departure'],
            ['Open Tomi Adewale welfare note and confirm visible wellness.', 'Boarding'],
            ['Ask nurse for Zara Bello asthma handoff before drop-off.', 'Next stop'],
          ]} />
        </Panel>
        <Panel title="Route movement strip" icon={<MapPin size={20} />}>
          <RouteStrip />
        </Panel>
      </div>
      <PortalDataCentre
        title="Copilot Handover Data Centre"
        subtitle="Boarding taps, guardian release, welfare flags and route handoff readiness"
        pies={[['Released safe', 74, colors.orange], ['On route', 18, colors.gold], ['Needs check', 8, '#7EA06D']]}
        bars={[['Tap on', 76], ['Tap off', 68], ['Guardian', 86], ['Notes', 34], ['Calls', 22], ['ETA', 80]]}
      />
      <QRScanCentre
        role="Copilot"
        rows={[
          ['Child QR', 'Today, 3:36 PM', 'Child matched to manifest', 'Tap on'],
          ['Guardian QR', 'Today, 4:19 PM', 'Guardian verified', 'Release child'],
          ['Bus QR', 'Today, 3:20 PM', 'Assigned bus confirmed', 'Open manifest'],
        ]}
      />
      <CommunicationCentre role="Copilot" email={false} />
    </>
  )
}

function ManifestView() {
  return (
    <div className="space-y-5">
      <ProtocolBanner />
      <div className="grid gap-4 lg:grid-cols-2">
        {manifest.map((child, index) => <ChildManifestCard key={child.name} child={child} index={index} />)}
      </div>
    </div>
  )
}

function ChildrenView() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
      <Panel title="Child identification register" icon={<BadgeCheck size={20} />}>
        <div className="space-y-4">
          {manifest.map((child) => (
            <div key={child.name} className="rounded-3xl border p-4" style={{ borderColor: colors.border, background: child.tone === 'medical' ? colors.blush : 'white' }}>
              <div className="flex items-start gap-3">
                <Avatar initials={child.photo} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-extrabold" style={{ color: colors.ink }}>{child.name}</h3>
                    <StatusBadge tone={child.tone}>{child.flag}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm font-bold" style={{ color: colors.muted }}>{child.className} | {child.address}</p>
                  <p className="mt-3 text-sm font-semibold leading-6" style={{ color: colors.muted }}>{child.note}</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <InfoPill label="Guardian release" value={child.guardian} />
                    <InfoPill label="Confirmation state" value={child.guardianState} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="What co-driver may see" icon={<UserCheck size={20} />}>
        <ActionList rows={[
          ['Child name, class, photo initials, route stop and tap state.', 'Allowed'],
          ['Guardian identity needed for drop-off confirmation only.', 'Allowed'],
          ['Medical and welfare flags needed for safe handoff.', 'Allowed'],
          ['Parent private history, billing, earnings or admin notes.', 'Hidden'],
        ]} />
      </Panel>
    </div>
  )
}

function AlertsView() {
  const [states, setStates] = useState<Record<string, ActionState>>({})
  const [messages, setMessages] = useState<Record<string, string>>({})

  async function acknowledge(title: string) {
    const alertId = slugify(title)
    setStates((current) => ({ ...current, [alertId]: 'saving' }))
    setMessages((current) => ({ ...current, [alertId]: '' }))
    const response = await fetch(`/api/copilot/alerts/${alertId}/acknowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setStates((current) => ({ ...current, [alertId]: 'error' }))
      setMessages((current) => ({ ...current, [alertId]: data.error || 'Alert was not acknowledged.' }))
      return
    }
    setStates((current) => ({ ...current, [alertId]: 'saved' }))
    setMessages((current) => ({ ...current, [alertId]: 'Acknowledged and logged.' }))
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
      <Panel title="Escalation protocol" icon={<AlertTriangle size={20} />}>
        <div className="space-y-3">
          <InfoPill label="No guardian" value="Keep child on board. Alert operations. Call verified guardians." />
          <InfoPill label="Absent child" value="Select reason. Confirm with school. Do not send ETA." />
          <InfoPill label="Wrong guardian" value="Do not release. Ask operations to verify backup contact." />
        </div>
      </Panel>
      <Panel title="Today&apos;s copilot alerts" icon={<BellRing size={20} />}>
        <div className="space-y-3">
          {alerts.map(([title, detail, severity, time]) => {
            const alertId = slugify(title)
            const state = states[alertId] || 'idle'
            const message = messages[alertId]
            return (
            <div key={title} className="rounded-3xl border bg-white p-4" style={{ borderColor: colors.border }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-extrabold" style={{ color: colors.ink }}>{title}</h3>
                <StatusBadge tone={severity === 'High' ? 'medical' : 'watch'}>{severity}</StatusBadge>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6" style={{ color: colors.muted }}>{detail}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => acknowledge(title)}
                  disabled={state === 'saving' || state === 'saved'}
                  className="rounded-full px-4 py-2 text-xs font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  style={{ background: colors.orange }}
                >
                  {state === 'saving' ? 'Logging...' : state === 'saved' ? 'Acknowledged' : 'Acknowledge'}
                </button>
                <span className="rounded-full px-4 py-2 text-xs font-extrabold" style={{ background: colors.sage, color: colors.ink }}>{time}</span>
                {message ? <span className="text-xs font-bold" style={{ color: state === 'error' ? '#B42318' : colors.orange }}>{message}</span> : null}
              </div>
            </div>
            )
          })}
        </div>
      </Panel>
    </div>
  )
}

function ProfileView() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <Panel title="Co-driver profile" icon={<UserRoundCheck size={20} />}>
        <div className="flex items-center gap-4">
          <Avatar initials="CD" large />
          <div>
            <h3 className="text-2xl font-extrabold" style={{ color: colors.ink }}>Co-driver Console</h3>
            <p className="mt-1 text-sm font-bold" style={{ color: colors.muted }}>Manifest control and safe handoff role</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {profileFacts.map(([label, value]) => <InfoPill key={label} label={label} value={value} />)}
        </div>
      </Panel>
      <Panel title="Responsibility boundary" icon={<BadgeCheck size={20} />}>
        <ActionList rows={[
          ['Confirm the child who boards is the child on the manifest.', 'Identity'],
          ['Record tap on, tap off, absent, and no-guardian events promptly.', 'Movement'],
          ['Release only to verified guardians or operations-approved backup.', 'Guardian'],
          ['Escalate welfare or medical flags to the nurse before handoff.', 'Care'],
          ['Use Logout when leaving the device or finishing duty.', 'Security'],
        ]} />
      </Panel>
    </div>
  )
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      className="rounded-[28px] border bg-white p-5 shadow-sm sm:p-6"
      style={{ borderColor: colors.border }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: colors.blush, color: colors.orange }}>{icon}</span>
        <h2 className="text-xl font-extrabold" style={{ color: colors.ink }}>{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: colors.border, background: colors.ivory }}>
      <p className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: colors.orange }}>{label}</p>
      <p className="mt-1 text-sm font-extrabold leading-6" style={{ color: colors.ink }}>{value}</p>
    </div>
  )
}

function StepFlow() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {[
        ['Identify', 'Match child to manifest photo and class.', BadgeCheck],
        ['Tap on/off', 'Record every movement at the point it happens.', ClipboardCheck],
        ['Confirm', 'Verify guardian name before release.', UserCheck],
        ['Escalate', 'No guardian means child stays safe on bus.', AlertTriangle],
      ].map(([title, body, Icon]) => (
        <div key={title as string} className="rounded-3xl border p-4" style={{ borderColor: colors.border, background: colors.blush }}>
          <Icon size={22} color={colors.orange} />
          <h3 className="mt-3 font-extrabold" style={{ color: colors.ink }}>{title as string}</h3>
          <p className="mt-2 text-sm font-semibold leading-6" style={{ color: colors.muted }}>{body as string}</p>
        </div>
      ))}
    </div>
  )
}

function RouteStrip() {
  return (
    <div className="relative overflow-hidden rounded-3xl border p-5" style={{ borderColor: colors.border, background: colors.blush }}>
      <div className="absolute left-8 right-8 top-1/2 h-1 -translate-y-1/2 rounded-full" style={{ background: colors.border }} />
      <div className="relative grid grid-cols-4 gap-3">
        {['School gate', 'Pickup cluster', assignment.nextStop, 'Home release'].map((stop, index) => (
          <div key={stop} className="text-center">
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: index === 1 ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 1.7, repeat: index === 1 ? Infinity : 0 }}
              className="mx-auto grid h-11 w-11 place-items-center rounded-full border-4 border-white text-sm font-extrabold text-white"
              style={{ background: index <= 1 ? colors.orange : colors.gold }}
            >
              {index + 1}
            </motion.div>
            <p className="mt-3 text-xs font-extrabold" style={{ color: colors.ink }}>{stop}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProtocolBanner() {
  const [state, setState] = useState<ActionState>('idle')
  const [message, setMessage] = useState('')

  async function startProtocol() {
    setState('saving')
    setMessage('')
    const response = await fetch('/api/copilot/no-guardian', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childName: 'Unconfirmed manifest child',
        routeLabel: assignment.route,
        stopLabel: assignment.nextStop,
        note: 'Copilot started route-level no-guardian protocol from the manifest banner.',
      }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setState('error')
      setMessage(data.error || 'No-guardian protocol was not started.')
      return
    }
    setState('saved')
    setMessage('No-guardian protocol logged for operations.')
  }

  return (
    <div className="rounded-[28px] border p-5" style={{ borderColor: '#F4C7A8', background: `linear-gradient(135deg, ${colors.blush}, white)` }}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: colors.orange }}>Release rule</p>
          <h2 className="mt-2 text-2xl font-extrabold" style={{ color: colors.ink }}>No verified guardian, no drop-off.</h2>
          <p className="mt-2 text-sm font-semibold leading-6" style={{ color: colors.muted }}>The child remains on board while operations and verified guardians are contacted.</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <button
            type="button"
            onClick={startProtocol}
            disabled={state === 'saving'}
            className="rounded-full px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: colors.orange }}
          >
            {state === 'saving' ? 'Starting...' : 'Start no-guardian protocol'}
          </button>
          {message ? <p className="text-xs font-bold" style={{ color: state === 'error' ? '#B42318' : colors.orange }}>{message}</p> : null}
        </div>
      </div>
    </div>
  )
}

function ChildManifestCard({ child, index }: { child: (typeof manifest)[number]; index: number }) {
  const [states, setStates] = useState<Record<string, ActionState>>({})
  const [message, setMessage] = useState('')

  async function submitMovement(action: MovementAction) {
    setStates((current) => ({ ...current, [action]: 'saving' }))
    setMessage('')
    const response = await fetch('/api/copilot/child-movement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        childName: child.name,
        routeLabel: assignment.route,
        note: `${child.name} ${action.replace('_', ' ')} from copilot manifest card.`,
      }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setStates((current) => ({ ...current, [action]: 'error' }))
      setMessage(data.error || 'Movement was not logged.')
      return
    }
    setStates((current) => ({ ...current, [action]: 'saved' }))
    setMessage(`${action.replace('_', ' ')} logged for ${child.name}.`)
  }

  async function startNoGuardian() {
    setStates((current) => ({ ...current, no_guardian: 'saving' }))
    setMessage('')
    const response = await fetch('/api/copilot/no-guardian', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        childName: child.name,
        routeLabel: assignment.route,
        stopLabel: child.address,
        note: `No verified guardian present for ${child.name}. Keep child on board and alert operations.`,
      }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setStates((current) => ({ ...current, no_guardian: 'error' }))
      setMessage(data.error || 'No-guardian protocol was not logged.')
      return
    }
    setStates((current) => ({ ...current, no_guardian: 'saved' }))
    setMessage(`No-guardian protocol logged for ${child.name}.`)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-[28px] border bg-white p-5 shadow-sm"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-start gap-3">
        <Avatar initials={child.photo} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-extrabold" style={{ color: colors.ink }}>{child.name}</h3>
            <StatusBadge tone={child.tone}>{child.flag}</StatusBadge>
          </div>
          <p className="mt-1 text-sm font-bold" style={{ color: colors.muted }}>{child.className} | {child.address}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <InfoPill label="Tap status" value={child.status} />
        <InfoPill label="Guardian" value={child.guardianState} />
      </div>
      <p className="mt-4 text-sm font-semibold leading-6" style={{ color: colors.muted }}>{child.note}</p>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ActionButton icon={<CheckCircle2 size={16} />} label={buttonLabel('Tap on', states.tap_on)} onClick={() => submitMovement('tap_on')} disabled={states.tap_on === 'saving'} />
        <ActionButton icon={<Home size={16} />} label={buttonLabel('Tap off', states.tap_off)} onClick={() => submitMovement('tap_off')} disabled={states.tap_off === 'saving'} />
        <ActionButton icon={<UsersRound size={16} />} label={buttonLabel('Absent', states.absent)} onClick={() => submitMovement('absent')} disabled={states.absent === 'saving'} soft />
        <ActionButton icon={<MessageCircle size={16} />} label={buttonLabel('No guardian', states.no_guardian)} onClick={startNoGuardian} disabled={states.no_guardian === 'saving'} urgent />
      </div>
      {message ? <p className="mt-3 text-xs font-bold" style={{ color: Object.values(states).includes('error') ? '#B42318' : colors.orange }}>{message}</p> : null}
    </motion.article>
  )
}

function ActionButton({ icon, label, onClick, disabled, soft, urgent }: { icon: React.ReactNode; label: string; onClick: () => void; disabled?: boolean; soft?: boolean; urgent?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex min-h-12 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-xs font-extrabold disabled:cursor-not-allowed disabled:opacity-60"
      style={{
        background: urgent ? colors.orange : soft ? colors.sage : colors.blush,
        color: urgent ? 'white' : colors.ink,
        border: `1px solid ${urgent ? colors.orange : colors.border}`,
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function ActionList({ rows }: { rows: string[][] }) {
  return (
    <div className="space-y-3">
      {rows.map(([title, meta]) => (
        <div key={title} className="flex gap-3 rounded-3xl border p-4" style={{ borderColor: colors.border, background: colors.ivory }}>
          <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: meta === 'Hidden' ? colors.gold : colors.orange }} />
          <div>
            <p className="font-extrabold leading-6" style={{ color: colors.ink }}>{title}</p>
            <p className="mt-1 text-xs font-extrabold uppercase tracking-widest" style={{ color: colors.orange }}>{meta}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Avatar({ initials, large }: { initials: string; large?: boolean }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-2xl font-extrabold text-white ${large ? 'h-20 w-20 text-2xl' : 'h-14 w-14 text-sm'}`}
      style={{ background: `linear-gradient(135deg, ${colors.orange}, ${colors.softOrange})` }}
    >
      {initials}
    </div>
  )
}

function StatusBadge({ children, tone }: { children: React.ReactNode; tone: string }) {
  const bg = tone === 'medical' ? colors.blush : tone === 'watch' ? '#FFF7DA' : tone === 'absent' ? colors.sage : '#ECF8EC'
  return (
    <span className="rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest" style={{ background: bg, color: colors.ink }}>
      {children}
    </span>
  )
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'alert'
}

function buttonLabel(label: string, state?: ActionState) {
  if (state === 'saving') return 'Saving...'
  if (state === 'saved') return 'Saved'
  return label
}
