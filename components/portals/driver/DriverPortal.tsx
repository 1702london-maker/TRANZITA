'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  BadgeCheck,
  BatteryCharging,
  BusFront,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  MapPinned,
  Radio,
  Route,
  ShieldCheck,
  UserRoundCheck,
  type LucideIcon,
} from 'lucide-react'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { CommunicationCentre, PortalDataCentre, QRScanCentre } from '@/components/dashboard/DataWidgets'
import { dashboardLinks } from '@/lib/dashboard-links'

type DriverView = 'today' | 'route' | 'manifest' | 'alerts' | 'profile'

const colours = {
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

const routeStops = [
  ['School gate', '06:55', 'Crew check-in'],
  ['Admiralty Way', '07:14', '3 pickups'],
  ['Chevron Drive', '07:32', '2 pickups'],
  ['Ikate close', '07:48', '3 pickups'],
  ['Greenfield drop-off', '08:10', 'handover'],
]

const checklist = [
  ['Tyres visual check', 'Passed', 'Checked before unlock'],
  ['Lights and indicators', 'Passed', 'Front, rear, hazard'],
  ['GPS transmitting', 'Live', 'Last ping 28 seconds ago'],
  ['NFC reader active', 'Live', 'Reader ID NFC-B12'],
  ['Camera/audio-safe system', 'Ready', 'Child-safe audio only'],
  ['Battery level', '88%', 'Enough for route and reserve'],
]

const manifest = [
  ['AO', 'Amara O.', 'Primary 4', 'Tapped on', 'Guardian: Ada O.', 'No note'],
  ['TA', 'Tomi A.', 'Primary 2', 'Pending', 'Guardian: Kunle A.', 'Pickup window'],
  ['ZB', 'Zara B.', 'Primary 5', 'Tapped on', 'Guardian: Hauwa B.', 'Medical icon'],
  ['DM', 'David M.', 'Primary 3', 'Tapped on', 'Guardian: Grace M.', 'Seat forward'],
  ['EN', 'Efe N.', 'Primary 1', 'Not due yet', 'Guardian: Mrs N.', 'Next stop'],
]

const alerts = [
  ['Operations message', 'School marshal moved loading bay to Gate B.', 'Unread', 'High'],
  ['GPS health', 'Signal stable after last ping recovery.', 'Acknowledged', 'Low'],
  ['Speed compliance', 'No speed breach on assigned corridor.', 'Clear', 'Low'],
  ['Manifest reminder', 'Confirm Tomi A. before departing Chevron Drive.', 'Open', 'Medium'],
]

type ActionState = 'idle' | 'saving' | 'saved' | 'error'

export default function DriverPortal({ view }: { view: DriverView }) {
  const title = view === 'today' ? 'Driver Route Dashboard' : `Driver ${labelFor(view)}`

  return (
    <DashboardShell role="Driver" title={title} links={dashboardLinks.driver}>
      <div className="space-y-5">
        <Hero view={view} />
        {view === 'today' ? <TodayView /> : null}
        {view === 'route' ? <RouteView /> : null}
        {view === 'manifest' ? <ManifestView /> : null}
        {view === 'alerts' ? <AlertsView /> : null}
        {view === 'profile' ? <ProfileView /> : null}
      </div>
    </DashboardShell>
  )
}

function Hero({ view }: { view: DriverView }) {
  return (
    <motion.section
      className="overflow-hidden rounded-[30px] bg-white p-6 shadow-sm sm:p-8"
      style={{ border: `1px solid ${colours.border}` }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid gap-7 xl:grid-cols-[1fr_420px] xl:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: colours.orange }}>
            Driver-only operating view
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-5xl" style={{ color: colours.ink }}>
            Route B12 is unlocked, monitored, and ready for a calm school run.
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 sm:text-base" style={{ color: colours.muted }}>
            Assignment, vehicle readiness, road compliance, operations alerts, manifest essentials, and certification status
            are prepared for today&apos;s school run.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ['Assigned vehicle', 'TRZ-B012'],
              ['Route status', view === 'route' ? 'In progress' : 'Ready'],
              ['Speed limit', '40 km/h zone'],
              ['Checklist', 'Passed'],
            ].map(([label, value]) => (
              <Pill key={label} label={label} value={value} />
            ))}
          </div>
        </div>
        <DriverRouteVisual />
      </div>
    </motion.section>
  )
}

function TodayView() {
  return (
    <>
      <MetricGrid
        metrics={[
          ['Route assignment', 'B12', 'Greenfield afternoon run', Route],
          ['Vehicle health', 'Ready', 'GPS, NFC, battery live', BatteryCharging],
          ['Manifest load', '8 children', 'Essentials only', UserRoundCheck],
          ['Compliance', 'Clear', '0 speed breaches today', Gauge],
        ]}
      />
      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <ChecklistPanel />
        <RouteCard />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <CompliancePanel />
        <AlertPanel compact />
      </div>
      <PortalDataCentre
        title="Driver Route Data Centre"
        subtitle="Driver-owned route performance, vehicle readiness, speed discipline and manifest progress"
        pies={[['Compliant', 88, colours.orange], ['Pending tap', 8, colours.gold], ['Ops notice', 4, '#7EA06D']]}
        bars={[['Stops', 78], ['Speed', 94], ['Battery', 88], ['GPS', 96], ['Taps', 70], ['ETA', 82]]}
      />
      <QRScanCentre
        role="Driver"
        rows={[
          ['Vehicle QR', 'Today, 6:42 AM', 'TRZ-B012 unlocked for assigned driver', 'Open vehicle checks'],
          ['Route QR', 'Today, 6:49 AM', 'Greenfield Route B loaded', 'Start route'],
          ['Child tap card', 'Today, 7:14 AM', 'Manifest status updated', 'View manifest'],
        ]}
      />
      <CommunicationCentre role="Driver" email={false} />
    </>
  )
}

function RouteView() {
  return (
    <>
      <MetricGrid
        metrics={[
          ['Next stop', 'Chevron Drive', 'ETA 7 minutes', MapPinned],
          ['Current speed', '34 km/h', 'Within active corridor', Gauge],
          ['Vehicle', 'TRZ-B012', 'Battery 88%', BusFront],
          ['Live feed', 'Online', 'Last GPS ping 28 sec', Radio],
        ]}
      />
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <RouteMapPanel />
        <RouteTimelinePanel />
      </div>
      <ChecklistPanel />
    </>
  )
}

function ManifestView() {
  return (
    <>
      <MetricGrid
        metrics={[
          ['Manifest', '8 children', 'Only assigned route children', UserRoundCheck],
          ['Tapped on', '6', '2 pending pickup window', ClipboardCheck],
          ['Medical flags', '1', 'Icon only, no private notes', ShieldCheck],
          ['Guardian protocol', 'Ready', 'Confirm at drop-off', BadgeCheck],
        ]}
      />
      <Panel title="Manifest Essentials" subtitle="Assigned route children, tap state, and drop-off confirmation labels.">
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead style={{ color: colours.muted }}>
              <tr>{['ID', 'Child', 'Class', 'Tap status', 'Drop-off contact label', 'Driver note'].map((header) => <th key={header} className="px-4 py-3 font-extrabold">{header}</th>)}</tr>
            </thead>
            <tbody>
              {manifest.map((row) => (
                <tr key={row[1]} className="border-t" style={{ borderColor: colours.border }}>
                  <td className="px-4 py-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-xs font-extrabold" style={{ background: colours.blush, color: colours.orange }}>{row[0]}</span>
                  </td>
                  {row.slice(1).map((cell, index) => (
                    <td key={`${row[1]}-${cell}`} className="px-4 py-4 font-bold" style={{ color: index === 2 ? colours.orange : colours.ink }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <div className="grid gap-5 xl:grid-cols-2">
        <ActionList title="Boarding Controls" rows={[
          ['Tap-on confirmation', 'Available to crew app, visible here for driver awareness'],
          ['Absent reason', 'Logged by co-driver when a child does not board'],
          ['Guardian not present', 'Triggers operations protocol; driver waits for instruction'],
        ]} />
        <ActionList title="Handover Protocol" rows={[
          ['Drop-off contact label', 'Use the verified label shown by operations'],
          ['No guardian present', 'Keep the child safe on board and await operations instruction'],
          ['Medical icon', 'Pause for nurse guidance before movement if an icon is raised'],
        ]} />
      </div>
    </>
  )
}

function AlertsView() {
  return (
    <>
      <MetricGrid
        metrics={[
          ['Open operations alerts', '2', 'Acknowledge before moving', AlertTriangle],
          ['Speed breaches', '0', 'This route window', Gauge],
          ['GPS status', 'Stable', 'No outage active', Radio],
          ['Route deviation', 'None', 'Assigned path followed', Route],
        ]}
      />
      <AlertPanel />
      <Panel title="Acknowledgement Log" subtitle="A clean record of driver-visible route alerts and operational instructions.">
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {alerts.map(([title, body, state, priority]) => (
            <div key={title} className="rounded-3xl p-4" style={{ background: colours.ivory, border: `1px solid ${colours.border}` }}>
              <div className="flex items-start justify-between gap-3">
                <p className="font-extrabold" style={{ color: colours.ink }}>{title}</p>
                <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: priority === 'High' ? colours.orange : colours.blush, color: priority === 'High' ? 'white' : colours.orange }}>{state}</span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6" style={{ color: colours.muted }}>{body}</p>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}

function ProfileView() {
  return (
    <>
      <MetricGrid
        metrics={[
          ['Driver ID', 'TRZ-0048', 'Emeka Okafor', BadgeCheck],
          ['Vetting status', 'Cleared', 'Stage 6 complete', ShieldCheck],
          ['FRSC certificate', 'Valid', 'Expires 18 Nov 2026', BadgeCheck],
          ['Term speed alerts', '1', 'Reviewed and closed', Gauge],
        ]}
      />
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Driver Profile" subtitle="Own account, route eligibility, and certification summary.">
          <div className="mt-5 flex items-center gap-4 rounded-[24px] p-4" style={{ background: colours.ivory, border: `1px solid ${colours.border}` }}>
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[28px]" style={{ background: `linear-gradient(135deg, ${colours.blush}, ${colours.sage})`, border: `1px solid ${colours.border}` }}>
              <span className="text-3xl font-extrabold" style={{ color: colours.orange }}>EO</span>
              <span className="absolute bottom-0 left-0 right-0 py-1 text-center text-[9px] font-black uppercase tracking-widest text-white" style={{ background: colours.orange }}>Photo</span>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: colours.orange }}>Profile picture</p>
              <h3 className="mt-1 text-2xl font-extrabold" style={{ color: colours.ink }}>Emeka Okafor</h3>
              <p className="mt-1 text-sm font-semibold" style={{ color: colours.muted }}>Driver photo is visible on profile and crew verification screens.</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ['Full name', 'Emeka Okafor'],
              ['Tranzita ID', 'TRZ-0048'],
              ['Assigned vehicle', 'TRZ-B012'],
              ['Current route', 'Greenfield Route B12'],
              ['Journey count', '184 completed'],
              ['On-time rate', '97% this term'],
            ].map(([label, value]) => (
              <ProfileRow key={label} label={label} value={value} />
            ))}
          </div>
        </Panel>
        <Panel title="Certification Summary" subtitle="Driver can see his own clearance dates and operational readiness only.">
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ['Police clearance', 'Valid until 12 Feb 2027'],
              ['FRSC certificate', 'Valid until 18 Nov 2026'],
              ['Safeguarding training', 'Refresher due 22 Sep 2026'],
              ['Medical clearance', 'Valid until 4 Jan 2027'],
              ['Drug screening', 'Cleared 2 Aug 2026'],
              ['Guarantor check', 'Verified'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl p-4" style={{ background: colours.ivory, border: `1px solid ${colours.border}` }}>
                <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: colours.orange }}>{label}</p>
                <p className="mt-2 text-sm font-bold" style={{ color: colours.ink }}>{value}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}

function MetricGrid({ metrics }: { metrics: Array<[string, string, string, LucideIcon]> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, note, Icon], index) => (
        <motion.div
          key={label}
          className="rounded-[26px] bg-white p-5 shadow-sm"
          style={{ border: `1px solid ${colours.border}` }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: colours.blush, color: colours.orange }}>
            <Icon size={22} />
          </span>
          <p className="mt-5 text-sm font-bold" style={{ color: colours.muted }}>{label}</p>
          <p className="mt-1 text-3xl font-extrabold" style={{ color: colours.ink }}>{value}</p>
          <p className="mt-1 text-xs font-bold" style={{ color: colours.orange }}>{note}</p>
        </motion.div>
      ))}
    </div>
  )
}

function ChecklistPanel() {
  const [state, setState] = useState<ActionState>('idle')
  const [message, setMessage] = useState('')

  async function submitChecklist() {
    setState('saving')
    setMessage('')
    const response = await fetch('/api/driver/checklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        routeLabel: 'Greenfield Route B12',
        vehicleLabel: 'TRZ-B012',
        items: checklist.map(([item, state, note]) => ({ item, state, note })),
      }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setState('error')
      setMessage(data.error || 'Checklist was not submitted.')
      return
    }
    setState('saved')
    setMessage('Checklist submitted to operations.')
  }

  return (
    <Panel title="Pre-Departure Checklist" subtitle="Route remains unlocked because every safety item has passed.">
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {checklist.map(([item, state, note]) => (
          <div key={item} className="rounded-3xl p-4" style={{ background: colours.ivory, border: `1px solid ${colours.border}` }}>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={20} color={colours.orange} />
              <div>
                <p className="font-extrabold" style={{ color: colours.ink }}>{item}</p>
                <p className="mt-1 text-xs font-bold" style={{ color: colours.orange }}>{state}</p>
                <p className="mt-1 text-sm font-semibold" style={{ color: colours.muted }}>{note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={submitChecklist}
          disabled={state === 'saving'}
          className="rounded-full px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: colours.orange }}
        >
          {state === 'saving' ? 'Submitting...' : 'Submit checklist'}
        </button>
        {message ? <p className="text-sm font-bold" style={{ color: state === 'error' ? '#B42318' : colours.orange }}>{message}</p> : null}
      </div>
    </Panel>
  )
}

function RouteCard() {
  return (
    <Panel title="Today Assignment" subtitle="Driver-controlled view for the assigned school route only.">
      <div className="mt-5 space-y-3">
        {[
          ['Route', 'B12 afternoon run'],
          ['School', 'Greenfield School'],
          ['Vehicle', 'TRZ-B012'],
          ['Crew visible to driver', 'Co-driver and nurse names only'],
          ['Next instruction', 'Proceed to Chevron Drive pickup window'],
        ].map(([label, value]) => <ProfileRow key={label} label={label} value={value} />)}
      </div>
    </Panel>
  )
}

function RouteMapPanel() {
  return (
    <Panel title="Assigned Route Map" subtitle="Visual route progress for the active school run.">
      <div className="relative mt-5 h-80 overflow-hidden rounded-[26px]" style={{ background: `linear-gradient(135deg, ${colours.sage}, ${colours.ivory})`, border: `1px solid ${colours.border}` }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 340">
          <path d="M50 260 C150 105 250 265 345 145 C455 12 525 220 650 76" fill="none" stroke={colours.orange} strokeWidth="7" strokeLinecap="round" strokeDasharray="14 12" />
          {routeStops.map((stop, index) => (
            <g key={stop[0]}>
              <circle cx={[62, 195, 340, 502, 642][index]} cy={[252, 180, 145, 152, 78][index]} r="12" fill={index === 2 ? colours.gold : colours.orange} />
              <text x={[62, 195, 340, 502, 642][index]} y={[284, 212, 177, 184, 110][index]} textAnchor="middle" fill={colours.ink} fontSize="13" fontWeight="800">{index + 1}</text>
            </g>
          ))}
        </svg>
        <motion.div className="absolute left-9 top-[238px] rounded-full bg-white p-3 shadow-lg" animate={{ x: [0, 136, 280, 454], y: [0, -72, -106, -178] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <BusFront size={25} color={colours.orange} />
        </motion.div>
      </div>
    </Panel>
  )
}

function RouteTimelinePanel() {
  return (
    <Panel title="Stop Sequence" subtitle="The route sequence the driver is allowed to operate today.">
      <div className="mt-5 space-y-3">
        {routeStops.map(([stop, time, note], index) => (
          <div key={stop} className="flex gap-4 rounded-3xl p-4" style={{ background: colours.ivory, border: `1px solid ${colours.border}` }}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold" style={{ background: colours.blush, color: colours.orange }}>{index + 1}</span>
            <div>
              <p className="font-extrabold" style={{ color: colours.ink }}>{stop}</p>
              <p className="mt-1 text-xs font-bold" style={{ color: colours.orange }}>{time}</p>
              <p className="mt-1 text-sm font-semibold" style={{ color: colours.muted }}>{note}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function CompliancePanel() {
  const [state, setState] = useState<ActionState>('idle')
  const [message, setMessage] = useState('')

  async function submitJourneyReport() {
    setState('saving')
    setMessage('')
    const response = await fetch('/api/driver/journey-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        routeLabel: 'Greenfield Route B12',
        vehicleLabel: 'TRZ-B012',
        summary: 'Driver confirms route compliance, no speed breach, no deviation, no unplanned stop, and journey report ready for operations review.',
        incidents: [],
      }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setState('error')
      setMessage(data.error || 'Journey report was not submitted.')
      return
    }
    setState('saved')
    setMessage('Journey report logged for operations.')
  }

  return (
    <Panel title="Speed and Compliance" subtitle="Driver-facing compliance summary for the active route window.">
      <div className="mt-5 space-y-4">
        {[
          ['Speed limit corridor', '40 km/h', 'Current speed 34 km/h'],
          ['Route deviation', 'None', 'Assigned path maintained'],
          ['Unplanned stop', 'None', 'All stops are route stops'],
          ['Journey report', 'Pending', 'Submit after final handover'],
        ].map(([label, value, note]) => (
          <div key={label}>
            <div className="flex items-center justify-between">
              <p className="font-extrabold" style={{ color: colours.ink }}>{label}</p>
              <p className="text-sm font-extrabold" style={{ color: colours.orange }}>{value}</p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: colours.sage }}>
              <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${colours.orange}, ${colours.softOrange})` }} initial={{ width: 0 }} whileInView={{ width: value === 'Pending' ? '42%' : '88%' }} viewport={{ once: true }} />
            </div>
            <p className="mt-1 text-xs font-bold" style={{ color: colours.muted }}>{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={submitJourneyReport}
          disabled={state === 'saving'}
          className="rounded-full px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
          style={{ background: colours.orange }}
        >
          {state === 'saving' ? 'Submitting...' : 'Submit journey report'}
        </button>
        {message ? <p className="text-sm font-bold" style={{ color: state === 'error' ? '#B42318' : colours.orange }}>{message}</p> : null}
      </div>
    </Panel>
  )
}

function AlertPanel({ compact = false }: { compact?: boolean }) {
  const [states, setStates] = useState<Record<string, ActionState>>({})
  const [messages, setMessages] = useState<Record<string, string>>({})
  const rows = compact ? alerts.slice(0, 3) : alerts

  async function acknowledge(title: string) {
    const alertId = slugify(title)
    setStates((current) => ({ ...current, [alertId]: 'saving' }))
    setMessages((current) => ({ ...current, [alertId]: '' }))
    const response = await fetch(`/api/driver/alerts/${alertId}/acknowledge`, {
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
    <Panel title="Operation Alerts" subtitle="Only driver-relevant safety, route, and operations messages.">
      <div className="mt-5 space-y-3">
        {rows.map(([title, body, state, priority], index) => {
          const alertId = slugify(title)
          const actionState = states[alertId] || 'idle'
          const actionMessage = messages[alertId]
          return (
          <motion.div key={title} className="rounded-3xl p-4" style={{ background: priority === 'High' ? colours.blush : colours.ivory, border: `1px solid ${colours.border}` }} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
            <div className="flex items-start justify-between gap-3">
              <p className="font-extrabold" style={{ color: colours.ink }}>{title}</p>
              <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: priority === 'High' ? colours.orange : colours.sage, color: priority === 'High' ? 'white' : colours.ink }}>{state}</span>
            </div>
            <p className="mt-2 text-sm font-semibold leading-6" style={{ color: colours.muted }}>{body}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => acknowledge(title)}
                disabled={actionState === 'saving' || actionState === 'saved'}
                className="rounded-full px-4 py-2 text-xs font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: colours.orange }}
              >
                {actionState === 'saving' ? 'Logging...' : actionState === 'saved' ? 'Acknowledged' : 'Acknowledge'}
              </button>
              {actionMessage ? <span className="text-xs font-bold" style={{ color: actionState === 'error' ? '#B42318' : colours.orange }}>{actionMessage}</span> : null}
            </div>
          </motion.div>
          )
        })}
      </div>
    </Panel>
  )
}

function ActionList({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <Panel title={title} subtitle="Driver portal operating rule">
      <div className="mt-5 space-y-3">
        {rows.map(([label, detail]) => (
          <div key={label} className="rounded-3xl p-4" style={{ background: colours.ivory, border: `1px solid ${colours.border}` }}>
            <p className="font-extrabold" style={{ color: colours.ink }}>{label}</p>
            <p className="mt-1 text-sm font-semibold leading-6" style={{ color: colours.muted }}>{detail}</p>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function DriverRouteVisual() {
  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-[28px]" style={{ background: `linear-gradient(135deg, ${colours.blush}, ${colours.ivory})`, border: `1px solid ${colours.border}` }}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 260">
        <path d="M24 190 C90 58 165 220 230 98 C300 -25 338 168 398 54" fill="none" stroke={colours.orange} strokeWidth="6" strokeLinecap="round" strokeDasharray="12 11" />
        {[46, 142, 228, 318, 386].map((x, index) => <circle key={x} cx={x} cy={[175, 154, 98, 122, 62][index]} r="9" fill={index === 2 ? colours.gold : colours.orange} />)}
      </svg>
      <motion.div className="absolute left-6 top-[160px] rounded-full bg-white p-3 shadow-xl" animate={{ x: [0, 104, 205, 328], y: [0, -28, -78, -118] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <BusFront size={25} color={colours.orange} />
      </motion.div>
      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
        {['No breach', 'GPS live', 'Route locked'].map((item) => (
          <span key={item} className="rounded-full bg-white px-3 py-2 text-center text-xs font-extrabold" style={{ color: colours.ink, border: `1px solid ${colours.border}` }}>{item}</span>
        ))}
      </div>
    </div>
  )
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <motion.section className="rounded-[28px] bg-white p-5 shadow-sm sm:p-6" style={{ border: `1px solid ${colours.border}` }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold" style={{ color: colours.ink }}>{title}</h3>
          <p className="mt-1 text-sm font-semibold leading-6" style={{ color: colours.muted }}>{subtitle}</p>
        </div>
        <span className="hidden rounded-full px-3 py-1 text-xs font-extrabold sm:inline-flex" style={{ background: colours.blush, color: colours.orange }}>DRIVER</span>
      </div>
      {children}
    </motion.section>
  )
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-full px-4 py-2 text-xs font-extrabold" style={{ background: colours.blush, color: colours.ink, border: `1px solid ${colours.border}` }}>
      <span style={{ color: colours.orange }}>{label}:</span> {value}
    </span>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl px-4 py-3" style={{ background: colours.ivory, border: `1px solid ${colours.border}` }}>
      <p className="text-sm font-bold" style={{ color: colours.muted }}>{label}</p>
      <p className="text-right text-sm font-extrabold" style={{ color: colours.ink }}>{value}</p>
    </div>
  )
}

function labelFor(view: DriverView) {
  return view.charAt(0).toUpperCase() + view.slice(1)
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'alert'
}
