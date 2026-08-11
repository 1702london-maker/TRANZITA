'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowDownToLine,
  Banknote,
  BusFront,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
  UploadCloud,
  WalletCards,
} from 'lucide-react'
import { CommunicationCentre, PortalDataCentre, QRScanCentre } from '@/components/dashboard/DataWidgets'

type PartnerView = 'overview' | 'vehicles' | 'tracking' | 'earnings' | 'inspections' | 'documents' | 'profile'

const colors = {
  text: '#183024',
  muted: '#65785F',
  orange: '#D96B1F',
  softOrange: '#F28A3D',
  blush: '#FFF0E4',
  ivory: '#FFF9F2',
  sage: '#F1F6EA',
  border: '#DDE9D2',
  gold: '#F8C84E',
}

const vehicles = [
  {
    id: 'TRZ-P011',
    registration: 'TRZ EV-011',
    model: 'Nigerian EV School Bus 2026',
    tier: 'Made-in-Nigeria approved fleet',
    status: 'On morning route',
    route: 'Greenfield Route A',
    driver: 'Tranzita assigned crew',
    speed: '38 km/h',
    inspection: 'Clear until 14 Dec 2026',
    documents: 'Complete',
    earnings: 'NGN 168,000',
  },
  {
    id: 'TRZ-P018',
    registration: 'TRZ EV-018',
    model: 'Nigerian EV Minibus 2026',
    tier: 'Nigerian-assembled school fleet',
    status: 'Afternoon standby',
    route: 'Corona Route B',
    driver: 'Tranzita assigned crew',
    speed: 'Parked',
    inspection: 'Booked 12 Aug 2026',
    documents: 'Insurance renewal due',
    earnings: 'NGN 194,500',
  },
  {
    id: 'TRZ-P023',
    registration: 'TRZ EV-023',
    model: 'Nigerian EV Backup Bus 2026',
    tier: 'Approved EV backup fleet',
    status: 'Available backup',
    route: 'Ikoyi executive pool',
    driver: 'Tranzita assigned crew',
    speed: 'Parked',
    inspection: 'Clear until 22 Jan 2027',
    documents: 'Complete',
    earnings: 'NGN 122,500',
  },
]

const earnings = [
  ['August 2026', '38', '1,126 km', 'NGN 485,000', 'Running total'],
  ['July 2026', '91', '2,860 km', 'NGN 1,180,000', 'Paid 1 Aug 2026'],
  ['June 2026', '84', '2,612 km', 'NGN 1,064,000', 'Paid 1 Jul 2026'],
  ['May 2026', '79', '2,408 km', 'NGN 998,000', 'Paid 1 Jun 2026'],
]

const inspections = [
  ['TRZ-P018', '12 Aug 2026', 'Booked', 'Attend inspection bay, Lekki'],
  ['TRZ-P011', '14 Dec 2026', 'Passed', 'No action needed'],
  ['TRZ-P023', '22 Jan 2027', 'Passed', 'No action needed'],
  ['TRZ-P018', '2 Aug 2026', 'Conditional', 'Replace rear reflector before appointment'],
]

const documents = [
  ['Insurance certificate', 'TRZ-P018', '30 Aug 2026', 'Renewal needed'],
  ['Roadworthiness certificate', 'TRZ-P011', '14 Dec 2026', 'Verified'],
  ['Vehicle registration', 'TRZ-P023', '22 Jan 2027', 'Verified'],
  ['Inspection certificate', 'TRZ-P018', '12 Aug 2026', 'Booked'],
]

const activity = [
  ['TRZ-P011 completed Greenfield morning route', 'Today 07:58', 'Earning recorded'],
  ['TRZ-P018 inspection reminder issued', 'Today 09:20', 'Action needed'],
  ['July partner statement generated', '1 Aug 2026', 'Downloaded'],
  ['TRZ-P023 added to backup pool', '29 Jul 2026', 'Available'],
]

function PartnerActionButton({ endpoint, payload, label }: { endpoint: string; payload: Record<string, unknown>; label: string }) {
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
    <button type="button" onClick={handleClick} className="rounded-full px-4 py-2 text-xs font-extrabold text-white" style={{ background: `linear-gradient(90deg, ${colors.orange}, ${colors.softOrange})` }}>
      {label}{suffix}
    </button>
  )
}

export default function PartnerPortal({ view }: { view: PartnerView }) {
  return (
    <div className="space-y-5">
      <Hero view={view} />
      {view === 'overview' ? <Overview /> : null}
      {view === 'vehicles' ? <Vehicles /> : null}
      {view === 'tracking' ? <Tracking /> : null}
      {view === 'earnings' ? <Earnings /> : null}
      {view === 'inspections' ? <Inspections /> : null}
      {view === 'documents' ? <Documents /> : null}
      {view === 'profile' ? <Profile /> : null}
    </div>
  )
}

function Hero({ view }: { view: PartnerView }) {
  const copy: Record<PartnerView, [string, string, string]> = {
    overview: ['Partner Command Centre', 'A private operating view for approved Tranzita vehicles, fuel or charging readiness, inspections, and payment readiness.', 'Fleet partner workspace'],
    vehicles: ['Approved Vehicles', 'Vehicle registry, certification status, route allocation, fuel or charging readiness, and earnings performance for approved Tranzita fleet only.', 'Fleet portfolio'],
    tracking: ['Live Tracking', 'A bus-only view of approved vehicle movement, route state, speed, and the number of children onboard.', 'Vehicle movement'],
    earnings: ['Earnings', 'Monthly statements, payout timing, bank summary, and per-vehicle earning performance.', 'Partner finance'],
    inspections: ['Inspections', 'Upcoming appointments, certification readiness, conditional items, and completed inspection records.', 'Fleet readiness'],
    documents: ['Documents', 'Upload, expiry tracking, and verification status for vehicle documents connected to your account.', 'Document vault'],
    profile: ['Partner Profile', 'Company details, payout destination, partnership manager, and account status.', 'Account summary'],
  }
  const [title, body, badge] = copy[view]

  return (
    <motion.section
      className="overflow-hidden rounded-[28px] bg-white p-6 shadow-sm lg:p-8"
      style={{ border: `1px solid ${colors.border}` }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: colors.orange }}>{badge}</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: colors.text }}>{title}</h2>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-7" style={{ color: colors.muted }}>{body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['EV performance', 'Fleet documents', 'Charging readiness', 'Logout enabled'].map((item) => (
              <span key={item} className="rounded-full px-3 py-2 text-xs font-extrabold" style={{ background: colors.blush, color: colors.text }}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[24px] p-5" style={{ background: `linear-gradient(135deg, ${colors.blush}, ${colors.ivory})`, border: `1px solid ${colors.border}` }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: colors.muted }}>Partner payout</span>
            <WalletCards size={24} color={colors.orange} />
          </div>
          <p className="mt-5 text-4xl font-extrabold" style={{ color: colors.text }}>NGN 485k</p>
          <p className="mt-2 text-sm font-bold" style={{ color: colors.muted }}>Running August 2026 total across 3 approved Tranzita EV vehicles.</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full" style={{ background: '#ffffff' }}>
            <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${colors.orange}, ${colors.gold})` }} initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 0.8 }} />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function Overview() {
  return (
    <>
      <Kpis />
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Fleet Status Summary" subtitle="Only vehicles connected to this partner account">
          <VehicleCards />
        </Panel>
        <Panel title="Monthly Earnings" subtitle="Last four completed statement periods">
          <BarGraph />
        </Panel>
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel title="Recent Partner Activity" subtitle="Route completions, document events, and payout updates">
          <Activity />
        </Panel>
        <Panel title="Partner Action Queue" subtitle="Items that affect your vehicles or payments">
          <ActionRows rows={[
            ['Renew TRZ-P018 insurance', '30 Aug 2026', 'High'],
            ['Attend booked inspection', '12 Aug 2026', 'Medium'],
            ['Download July statement', 'Available now', 'Low'],
          ]} />
        </Panel>
      </div>
      <PortalDataCentre
        title="Partner Fleet Data Centre"
        subtitle="Vehicle readiness, document status, route utilisation and payout performance for the partner account"
        pies={[['Route active', 62, colors.orange], ['Standby', 24, colors.gold], ['Action due', 14, '#7EA06D']]}
        bars={[['Trips', 78], ['Km', 84], ['Docs', 66], ['Inspect', 72], ['Payout', 88], ['Ready', 70]]}
      />
      <QRScanCentre
        role="Partner"
        rows={[
          ['Vehicle QR', 'Today, 6:45 AM', 'Vehicle profile opened', 'View vehicle'],
          ['Inspection QR', '7 Aug 2026', 'Inspection certificate checked', 'Open inspection'],
          ['Document QR', '6 Aug 2026', 'Insurance file verified', 'Open document vault'],
        ]}
      />
      <CommunicationCentre role="Partner" />
    </>
  )
}

function Vehicles() {
  return (
    <>
      <Kpis labels={['Approved vehicles', 'Active today', 'Document-ready', 'Inspection watch']} values={['3', '2', '2 / 3', '1']} />
      <Panel title="Partner Vehicle Register" subtitle="Registration, model, route status, certification, and monthly earning">
        <Table headers={['Vehicle', 'Registration', 'Model', 'Route state', 'Inspection', 'Documents', 'Month earning']} rows={vehicles.map((vehicle) => [vehicle.id, vehicle.registration, vehicle.model, vehicle.status, vehicle.inspection, vehicle.documents, vehicle.earnings])} />
      </Panel>
      <Panel title="Vehicle Profile Preview" subtitle="Operational details available without exposing families or schools">
        <div className="grid gap-4 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <InfoCard key={vehicle.id} icon={<BusFront size={22} />} title={vehicle.id} value={vehicle.model} note={`${vehicle.tier} - ${vehicle.driver}`} />
          ))}
        </div>
      </Panel>
    </>
  )
}

function Tracking() {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
      <Panel title="Partner Vehicle Map" subtitle="Vehicle position, route status, and speed only">
        <div className="relative mt-5 h-[420px] overflow-hidden rounded-[24px]" style={{ background: `linear-gradient(135deg, ${colors.sage}, ${colors.ivory})`, border: `1px solid ${colors.border}` }}>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 700 420" role="img" aria-label="Partner vehicle route map">
            <path d="M55 314 C150 98 250 355 360 170 C475 -8 560 292 655 90" fill="none" stroke={colors.orange} strokeWidth="7" strokeLinecap="round" strokeDasharray="12 14" />
            <path d="M70 85 L640 356" stroke="#ffffff" strokeWidth="2" strokeDasharray="10 18" />
            {[110, 300, 455, 610].map((x, index) => <circle key={x} cx={x} cy={[246, 240, 172, 125][index]} r="12" fill={index === 2 ? colors.gold : colors.orange} />)}
          </svg>
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              className="absolute rounded-2xl bg-white px-3 py-2 shadow-sm"
              style={{ left: `${18 + index * 24}%`, top: `${52 - index * 11}%`, border: `1px solid ${colors.border}` }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2 + index * 0.4, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <BusFront size={18} color={colors.orange} />
                <span className="text-xs font-extrabold" style={{ color: colors.text }}>{vehicle.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Panel>
      <Panel title="Tracking Status" subtitle="Bus movement and onboard counts only">
        <ActionRows rows={vehicles.map((vehicle, index) => [vehicle.id, `${vehicle.speed} - ${[42, 31, 0][index]} children onboard`, vehicle.status === 'On morning route' ? 'Live' : 'Ready'])} />
        <div className="mt-5 rounded-2xl p-4" style={{ background: colors.blush }}>
          <p className="text-sm font-extrabold" style={{ color: colors.text }}>Privacy boundary</p>
          <p className="mt-2 text-sm font-semibold leading-6" style={{ color: colors.muted }}>Partners can follow approved buses and see the number of children onboard per bus. They cannot see child names, parent information, guardian details, school family records, or private crew records.</p>
        </div>
      </Panel>
    </div>
  )
}

function Earnings() {
  return (
    <>
      <Kpis labels={['This month', 'Last payout', 'Next payment', 'All-time total']} values={['NGN 485k', 'NGN 1.18m', '1 Sep 2026', 'NGN 8.74m']} />
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel title="Earnings Statement" subtitle="Monthly route count, distance, and payout status">
          <Table headers={['Month', 'Routes', 'Distance', 'Amount', 'Status']} rows={earnings} />
        </Panel>
        <Panel title="Per-Vehicle Earnings" subtitle="Current month contribution by vehicle">
          <BarGraph labels={['P011', 'P018', 'P023']} values={[168, 194, 122]} />
        </Panel>
      </div>
      <Panel title="Bank and Payment Summary" subtitle="Payout destination visible to partner account owner">
        <div className="grid gap-4 lg:grid-cols-3">
          <InfoCard icon={<Banknote size={22} />} title="Bank" value="GTBank" note="Verified payout bank" />
          <InfoCard icon={<WalletCards size={22} />} title="Account" value="Tranzita Partner Fleet Ltd" note="Ending 4207" />
          <InfoCard icon={<CalendarCheck2 size={22} />} title="Payment day" value="1 Sep 2026" note="August statement payout" />
        </div>
      </Panel>
    </>
  )
}

function Inspections() {
  return (
    <>
      <Kpis labels={['Passed vehicles', 'Booked', 'Due in 30 days', 'Open failed items']} values={['2', '1', '1', '1']} />
      <Panel title="Inspection Schedule" subtitle="Appointments and certification readiness for partner vehicles">
        <Table headers={['Vehicle', 'Date', 'Result', 'Next action']} rows={inspections} />
      </Panel>
      <Panel title="Inspection Workbench" subtitle="Keep vehicles eligible for school routes">
        <ActionRows rows={[
            ['TRZ-P018 fuel and readiness check', 'Before 12 Aug 2026', 'High'],
          ['Confirm inspection attendance', '12 Aug 2026', 'Medium'],
          ['Download TRZ-P011 certificate', 'Available', 'Low'],
        ]} />
        <div className="mt-4 flex flex-wrap gap-2">
          <PartnerActionButton endpoint="/api/partner/inspection-actions" label="Confirm Attendance" payload={{ vehicleId: 'TRZ-P018', inspectionId: '12 Aug 2026 inspection', action: 'attendance confirmed', note: 'Partner confirmed inspection attendance for vehicle only.' }} />
          <PartnerActionButton endpoint="/api/partner/inspection-actions" label="Log Readiness Check" payload={{ vehicleId: 'TRZ-P018', inspectionId: 'Conditional inspection item', action: 'fuel and readiness check logged', note: 'Fuel and readiness check logged for route readiness.' }} />
        </div>
      </Panel>
    </>
  )
}

function Documents() {
  return (
    <>
      <Kpis labels={['Verified files', 'Expiring soon', 'Uploads needed', 'Rejected files']} values={['9', '1', '1', '0']} />
      <Panel title="Fleet Document Vault" subtitle="Vehicle registration, insurance, roadworthiness, fuel or charging readiness, and inspection files">
        <Table headers={['Document', 'Vehicle', 'Expiry / date', 'Status']} rows={documents} />
      </Panel>
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel title="Upload Centre" subtitle="Prepared for secure document submission once live accounts are enabled">
          <div className="rounded-[24px] p-6 text-center" style={{ background: colors.ivory, border: `1px dashed ${colors.orange}` }}>
            <UploadCloud className="mx-auto" size={34} color={colors.orange} />
            <p className="mt-3 text-lg font-extrabold" style={{ color: colors.text }}>Upload renewed vehicle document</p>
            <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6" style={{ color: colors.muted }}>Choose document type, vehicle, expiry date, and file. Files remain scoped to the partner vehicle record.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <PartnerActionButton endpoint="/api/partner/documents" label="Submit Insurance" payload={{ vehicleId: 'TRZ-P018', documentType: 'Insurance certificate', expiryDate: '30 Aug 2026', action: 'submitted for review' }} />
              <PartnerActionButton endpoint="/api/partner/documents" label="Submit Roadworthiness" payload={{ vehicleId: 'TRZ-P011', documentType: 'Roadworthiness certificate', expiryDate: '14 Dec 2026', action: 'submitted for review' }} />
            </div>
          </div>
        </Panel>
        <Panel title="Expiry Alerts" subtitle="Documents that affect route eligibility">
          <ActionRows rows={[
            ['TRZ-P018 insurance renewal', '30 Aug 2026', 'High'],
            ['TRZ-P018 inspection certificate', 'After appointment', 'Medium'],
            ['Roadworthiness archive', 'No action', 'Low'],
          ]} />
        </Panel>
      </div>
    </>
  )
}

function Profile() {
  return (
    <>
      <Kpis labels={['Partner status', 'Fleet tier', 'EV vehicles', 'Manager review']} values={['Active', 'EV Fleet', '3', '9 Aug 2026']} />
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Partner Profile" subtitle="Business contact and partnership status">
          <Table headers={['Field', 'Current value', 'Status']} rows={[
            ['Partner name', 'Tranzita EV Fleet Partner Ltd', 'Verified'],
            ['Primary contact', 'Partner operations lead', 'Active'],
            ['Service city', 'Lagos', 'Active'],
            ['Partnership tier', 'Made-in-Nigeria fleet partner', 'Active'],
          ]} />
        </Panel>
        <Panel title="Payment Profile" subtitle="Bank and statement delivery setup">
          <Table headers={['Item', 'Value', 'Control']} rows={[
            ['Payout bank', 'GTBank', 'Verified'],
            ['Account ending', '4207', 'Protected'],
            ['Statement email', 'finance@evpartner.example', 'Active'],
            ['Next statement', '1 Sep 2026', 'Scheduled'],
          ]} />
        </Panel>
      </div>
      <Panel title="Partner Manager" subtitle="Commercial and fleet support">
        <div className="grid gap-4 lg:grid-cols-3">
          <InfoCard icon={<ShieldCheck size={22} />} title="Account owner" value="Tranzita Partnerships" note="Commercial relationship" />
          <InfoCard icon={<CalendarCheck2 size={22} />} title="Next review" value="9 Sep 2026" note="Monthly fleet review" />
          <InfoCard icon={<ArrowDownToLine size={22} />} title="Statements" value="PDF ready" note="Download from Earnings" />
        </div>
      </Panel>
    </>
  )
}

function Kpis({ labels, values }: { labels?: string[]; values?: string[] }) {
  const kpis = (labels && values)
    ? labels.map((label, index) => [label, values[index], ['Partner scoped', 'Live-ready', 'Vehicle-only', 'Private'][index] || 'Ready'])
    : [
        ['Vehicles active now', '3', 'Partner fleet only'],
        ['This month earnings', 'NGN 485k', '+12% vs July pace'],
        ['Next payment date', '1 Sep 2026', 'Scheduled'],
        ['Compliance status', '2 / 3 clear', '1 action needed'],
      ]
  const icons = [BusFront, Banknote, Clock3, FileCheck2]

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map(([label, value, note], index) => {
        const Icon = icons[index] || CheckCircle2
        return (
          <motion.div key={label} className="rounded-[24px] bg-white p-5 shadow-sm" style={{ border: `1px solid ${colors.border}` }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: colors.blush, color: colors.orange }}>
              <Icon size={22} />
            </span>
            <p className="mt-5 text-sm font-bold" style={{ color: colors.muted }}>{label}</p>
            <p className="mt-1 text-3xl font-extrabold" style={{ color: colors.text }}>{value}</p>
            <p className="mt-1 text-xs font-bold" style={{ color: colors.orange }}>{note}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

function VehicleCards() {
  return (
    <div className="mt-5 grid gap-3">
      {vehicles.map((vehicle, index) => (
        <motion.div key={vehicle.id} className="grid gap-3 rounded-2xl p-4 md:grid-cols-[1fr_auto]" style={{ background: colors.ivory, border: `1px solid ${colors.border}` }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
          <div>
            <p className="font-extrabold" style={{ color: colors.text }}>{vehicle.id} - {vehicle.model}</p>
            <p className="mt-1 text-sm font-semibold" style={{ color: colors.muted }}>{vehicle.route} - {vehicle.status}</p>
          </div>
          <span className="rounded-full px-3 py-2 text-xs font-extrabold" style={{ background: vehicle.documents === 'Complete' ? colors.sage : colors.blush, color: colors.text }}>{vehicle.documents}</span>
        </motion.div>
      ))}
    </div>
  )
}

function BarGraph({ labels = ['May', 'Jun', 'Jul', 'Aug'], values = [74, 82, 91, 68] }: { labels?: string[]; values?: number[] }) {
  const max = Math.max(...values)
  return (
    <div className="mt-6 flex h-64 items-end gap-3">
      {values.map((value, index) => (
        <div key={`${labels[index]}-${value}`} className="flex flex-1 flex-col items-center gap-2">
          <motion.div className="w-full rounded-t-2xl" style={{ background: `linear-gradient(180deg, ${colors.softOrange}, ${colors.orange})` }} initial={{ height: 0 }} whileInView={{ height: `${Math.max(18, (value / max) * 100)}%` }} viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.55 }} />
          <span className="text-[10px] font-extrabold" style={{ color: colors.muted }}>{labels[index]}</span>
        </div>
      ))}
    </div>
  )
}

function Activity() {
  return (
    <div className="mt-5 space-y-3">
      {activity.map(([title, time, status], index) => (
        <motion.div key={title} className="rounded-2xl p-4" style={{ background: colors.ivory, border: `1px solid ${colors.border}` }} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
          <div className="flex items-start justify-between gap-3">
            <p className="font-extrabold" style={{ color: colors.text }}>{title}</p>
            <span className="text-xs font-bold" style={{ color: colors.muted }}>{time}</span>
          </div>
          <p className="mt-1 text-xs font-extrabold" style={{ color: colors.orange }}>{status}</p>
        </motion.div>
      ))}
    </div>
  )
}

function ActionRows({ rows }: { rows: string[][] }) {
  return (
    <div className="mt-5 space-y-3">
      {rows.map(([task, due, priority], index) => (
        <motion.div key={task} className="grid gap-3 rounded-2xl p-4 sm:grid-cols-[1fr_auto_auto]" style={{ background: colors.ivory, border: `1px solid ${colors.border}` }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
          <p className="font-extrabold" style={{ color: colors.text }}>{task}</p>
          <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: colors.blush, color: colors.orange }}>{due}</span>
          <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: priority === 'High' ? colors.orange : colors.sage, color: priority === 'High' ? 'white' : colors.text }}>{priority}</span>
        </motion.div>
      ))}
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead style={{ color: colors.muted }}>
          <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-extrabold">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('-')} className="border-t" style={{ borderColor: colors.border }}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`} className="px-4 py-4 font-bold" style={{ color: index === row.length - 1 ? colors.orange : colors.text }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function InfoCard({ icon, title, value, note }: { icon: ReactNode; title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: colors.ivory, border: `1px solid ${colors.border}` }}>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: colors.blush, color: colors.orange }}>{icon}</span>
      <p className="mt-4 text-xs font-extrabold uppercase tracking-widest" style={{ color: colors.muted }}>{title}</p>
      <p className="mt-1 text-lg font-extrabold" style={{ color: colors.text }}>{value}</p>
      <p className="mt-1 text-sm font-semibold leading-6" style={{ color: colors.muted }}>{note}</p>
    </div>
  )
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <motion.section className="rounded-[28px] bg-white p-5 shadow-sm" style={{ border: `1px solid ${colors.border}` }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold" style={{ color: colors.text }}>{title}</h3>
          <p className="mt-1 text-sm font-semibold leading-6" style={{ color: colors.muted }}>{subtitle}</p>
        </div>
        <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ background: colors.blush, color: colors.orange }}>PARTNER</span>
      </div>
      {children}
    </motion.section>
  )
}
