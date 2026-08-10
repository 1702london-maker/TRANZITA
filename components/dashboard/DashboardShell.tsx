'use client'

import { useEffect, useState } from 'react'
import { Bell, Radio, UserCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import BottomPortalBar from '@/components/BottomPortalBar'
import StickyBar from '@/components/StickyBar'
import { ActionQueue, AlertsFeed, BarChartCard, ControlCentreStrip, DataTableCard, FleetTable, KpiGrid, MiniMap, PieChartCard } from '@/components/dashboard/DataWidgets'
import LogoutButton from '@/components/dashboard/LogoutButton'
import { dashboardProfiles, getSeedDashboardPayload, type DashboardPayload, type DashboardRole } from '@/lib/dashboard-data'

export type DashboardLink = { label: string; href: string }

export default function DashboardShell({
  role,
  title,
  links,
  children,
}: {
  role: DashboardRole
  title: string
  links: DashboardLink[]
  children?: React.ReactNode
}) {
  const fullDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
  const profile = dashboardProfiles[role]
  const notificationHref = links.find((link) => /alert|notification|message|comms/i.test(link.label))?.href || links[0]?.href || '/'

  return (
    <>
      <StickyBar />
      <main className="min-h-screen pt-[38px]" style={{ background: '#FFF9F2' }}>
      <div className="flex min-h-[calc(100vh-38px)]">
        <aside className="hidden w-72 shrink-0 border-r p-5 lg:block" style={{ background: 'white', borderColor: '#DDE9D2' }}>
          <a href="/" className="block">
            <img src="/logo-transparent.png" alt="Tranzita" className="h-14 w-auto object-contain" />
          </a>
          <p className="mt-8 text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>{role} Dashboard</p>
          <nav className="mt-5 space-y-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="block rounded-2xl px-4 py-3 text-sm font-bold transition-colors" style={{ color: '#183024' }}>
                {link.label}
              </a>
            ))}
          </nav>
        </aside>
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-[38px] z-30 flex items-center justify-between border-b px-4 py-4 sm:px-6" style={{ background: 'rgba(255,249,242,0.94)', borderColor: '#DDE9D2', backdropFilter: 'blur(14px)' }}>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>{profile.badge}</p>
              <h1 className="text-xl font-extrabold sm:text-2xl" style={{ color: '#183024' }}>{title}</h1>
              <p className="mt-1 text-xs font-bold sm:text-sm" style={{ color: '#65785F' }}>{fullDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1 rounded-full px-3 py-2 text-xs font-bold sm:flex" style={{ background: '#F1F6EA', color: '#65785F' }}><Radio size={14} color="#D96B1F" /> Realtime</span>
              <a href={notificationHref} className="rounded-full p-3" style={{ background: 'white', border: '1px solid #DDE9D2' }} aria-label="Notifications"><Bell size={18} /></a>
              <div className="hidden items-center gap-2 rounded-full px-3 py-2 sm:flex" style={{ background: 'white', border: '1px solid #DDE9D2' }}>
                <UserCircle size={18} color="#D96B1F" />
                <span className="text-xs font-extrabold" style={{ color: '#183024' }}>{profile.name}</span>
              </div>
              <LogoutButton />
            </div>
          </header>
          <div className="border-b px-4 py-3 lg:hidden" style={{ background: 'white', borderColor: '#DDE9D2' }}>
            <div className="flex gap-2 overflow-x-auto">
              {links.map((link) => <a key={link.href} href={link.href} className="whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold" style={{ background: '#FFF0E4', color: '#183024' }}>{link.label}</a>)}
            </div>
          </div>
          <div className="p-4 sm:p-6 lg:p-8">
            {children || <DashboardHome role={role} />}
          </div>
        </section>
      </div>
    </main>
    <BottomPortalBar />
    </>
  )
}

function DashboardHome({ role }: { role: DashboardRole }) {
  const [payload, setPayload] = useState<DashboardPayload>(() => getSeedDashboardPayload(role))

  useEffect(() => {
    let active = true
    fetch(`/api/dashboard/${role.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
        if (active && data?.profile) setPayload(data)
      })
      .catch(() => undefined)
    return () => {
      active = false
    }
  }, [role])

  const profile = payload.profile
  const overview = overviewContent[role]
  return (
    <div className="space-y-5">
      <KpiGrid kpis={profile.kpis} />
      <div className="flex justify-end">
        <span className="rounded-full px-3 py-1.5 text-xs font-extrabold" style={{ background: payload.source === 'supabase' ? '#F1F6EA' : '#FFF0E4', color: '#183024' }}>
          Data source: {payload.source === 'supabase' ? 'Supabase live' : 'Pitch seed data'}
        </span>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <MiniMap />
        <PieChartCard data={payload.pieData} />
      </div>
      <ControlCentreStrip items={overview.strip} />
      <DataTableCard title={overview.tableTitle} subtitle={overview.tableSubtitle} headers={overview.headers} rows={overview.rows} />
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <BarChartCard data={payload.barData} />
        {overview.queue ? <ActionQueue rows={overview.queue} title={overview.queueTitle} /> : <AlertsFeed rows={payload.alertRows} />}
      </div>
      {role === 'Admin' || role === 'School' || role === 'Partner' ? <FleetTable rows={payload.tableRows} /> : null}
    </div>
  )
}

const overviewContent: Record<DashboardRole, {
  strip: Array<[string, string]>
  tableTitle: string
  tableSubtitle: string
  headers: string[]
  rows: string[][]
  queueTitle?: string
  queue?: string[][]
}> = {
  Admin: {
    strip: [['Routes completed', '54 / 58'], ['Critical alerts', '0'], ['Operators online', '7']],
    tableTitle: 'National Operations Watchlist',
    tableSubtitle: 'The buses, schools, and service areas operations must keep eyes on today',
    headers: ['Watch item', 'School / area', 'Current state', 'Next action'],
    rows: [
      ['Afternoon wave', 'Lekki + VI', 'Active', 'Monitor ETA drift'],
      ['Route B12', 'Greenfield', 'Delayed 4 mins', 'Parent update ready'],
      ['TRZ-E004', 'Executive fleet', 'Guardian confirmation pending', 'Call backup guardian'],
      ['Abuja pilot', 'Maitama', 'Crew assigned', 'Confirm test route'],
    ],
    queueTitle: 'Operations Response Queue',
    queue: [
      ['Resolve guardian confirmation', 'Parent support', 'Due now', 'High'],
      ['Approve school onboarding stage', 'Ops lead', 'Today', 'Medium'],
      ['Review partner inspection slot', 'Fleet', 'Tomorrow', 'Medium'],
    ],
  },
  School: {
    strip: [['Routes today', '12'], ['Students expected', '184'], ['Parent messages sent', '426']],
    tableTitle: "Today's Route Status",
    tableSubtitle: 'School-scoped live route visibility for administrators and safeguarding leads',
    headers: ['Route', 'Vehicle', 'Crew', 'Status'],
    rows: [
      ['Morning A', 'TRZ-B018', 'Driver + copilot + nurse', 'Completed'],
      ['Morning B', 'TRZ-B012', 'Driver + copilot + nurse', 'Completed'],
      ['Afternoon A', 'TRZ-B018', 'Crew checked in', 'Loading'],
      ['Afternoon B', 'TRZ-B012', 'Crew checked in', 'Active'],
    ],
    queueTitle: 'School Action Queue',
    queue: [
      ['Approve new guardian', 'Safeguarding lead', 'Today', 'High'],
      ['Download weekly digest', 'School admin', 'Friday', 'Low'],
      ['Review Route B timing', 'Principal', 'This week', 'Medium'],
    ],
  },
  Parent: {
    strip: [['ETA home', '18 mins'], ['Crew assigned', '3 verified'], ['Journey updates', '6 today']],
    tableTitle: 'My Children Today',
    tableSubtitle: 'Simple live journey status for each child attached to this parent account',
    headers: ['Child', 'School', 'Current status', 'Next update'],
    rows: [
      ['Amara Okorie', 'Greenfield School', 'On bus', 'Arriving in 18 mins'],
      ['Tomi Okorie', 'Greenfield School', 'At school', 'Afternoon route pending'],
    ],
    queueTitle: 'Parent Notices',
    queue: [
      ['Bus departed school', 'Tranzita operations', 'Sent 15:42', 'Low'],
      ['Guardian should be ready', 'Route B', 'In 14 mins', 'Medium'],
      ['Journey summary pending', 'Route B', 'After drop-off', 'Low'],
    ],
  },
  Driver: {
    strip: [['Route unlock', 'Checklist passed'], ['Manifest', '8 children'], ['Speed status', 'Compliant']],
    tableTitle: 'Driver Run Sheet',
    tableSubtitle: 'Vehicle operation, route assignment, and safety checks for today',
    headers: ['Step', 'Requirement', 'Status', 'Action'],
    rows: [
      ['Pre-departure', 'Tyres, lights, GPS, NFC, battery', 'Passed', 'Route unlocked'],
      ['Pickup window', 'Arrive at school gate', 'Active', 'Follow marshal'],
      ['Route progress', 'Stay on assigned path', 'Compliant', 'Continue'],
      ['End of run', 'Complete journey report', 'Pending', 'Submit after drop-off'],
    ],
    queueTitle: 'Driver Checklist',
    queue: [
      ['Confirm NFC reader active', 'Driver', 'Before departure', 'High'],
      ['Acknowledge operations message', 'Driver', 'Now', 'Medium'],
      ['Submit end-of-run note', 'Driver', 'After route', 'Low'],
    ],
  },
  Copilot: {
    strip: [['Manifest count', '18'], ['Tapped on', '16'], ['Guardian flags', '0']],
    tableTitle: 'Copilot Manifest Board',
    tableSubtitle: 'Child movement, tap events, guardian confirmation, and welfare awareness',
    headers: ['Child', 'Tap status', 'Guardian check', 'Flag'],
    rows: [
      ['Amara Okorie', 'Tapped on', 'Mother verified', 'Clear'],
      ['Tomi Adewale', 'Pending', 'Backup guardian listed', 'Watch'],
      ['Zara Bello', 'Tapped on', 'Father verified', 'Medical note'],
      ['David Musa', 'Tapped on', 'Aunt verified', 'Clear'],
    ],
    queueTitle: 'Manifest Actions',
    queue: [
      ['Tap pending children on board', 'Copilot', 'Before moving', 'High'],
      ['Confirm guardian for Tomi', 'Copilot', 'At drop-off', 'Medium'],
      ['Open medical note for Zara', 'Copilot', 'Before drop-off', 'Medium'],
    ],
  },
  Nurse: {
    strip: [['Medical notes', '4'], ['First aid kit', 'Ready'], ['Welfare flags', '1']],
    tableTitle: 'Welfare Watchlist',
    tableSubtitle: 'Children with known conditions, medication notes, and journey observations',
    headers: ['Child', 'Condition / note', 'Medication', 'Action'],
    rows: [
      ['Zara Bello', 'Asthma watch', 'Inhaler on board', 'Observe breathing'],
      ['David Musa', 'Motion sickness', 'Water nearby', 'Seat forward'],
      ['Amara Okorie', 'No known condition', 'None', 'Routine check'],
      ['Tomi Adewale', 'Recent fever note', 'Parent advised', 'Check on pickup'],
    ],
    queueTitle: 'Nurse Tasks',
    queue: [
      ['Confirm first aid kit seal', 'Nurse', 'Before departure', 'High'],
      ['Check Zara before moving', 'Nurse', 'Boarding', 'Medium'],
      ['Submit welfare note if needed', 'Nurse', 'During route', 'Low'],
    ],
  },
  Partner: {
    strip: [['Vehicles live', '3'], ['Month earnings', 'NGN 485k'], ['Next inspection', '12 Aug 2026']],
    tableTitle: 'Partner Fleet Summary',
    tableSubtitle: 'Vehicle earnings, route activity, inspections, and certification readiness',
    headers: ['Vehicle', 'Today route', 'Earnings state', 'Compliance'],
    rows: [
      ['TRZ-P011', 'Greenfield Route A', 'Earning today', 'Clear'],
      ['TRZ-P018', 'Corona Route B', 'Earning today', 'Inspection due soon'],
      ['TRZ-P023', 'Backup pool', 'Available', 'Clear'],
    ],
    queueTitle: 'Partner Action Queue',
    queue: [
      ['Upload renewed insurance', 'Partner', '30 Aug 2026', 'High'],
      ['Confirm inspection appointment', 'Fleet team', '12 Aug 2026', 'Medium'],
      ['Download July statement', 'Partner', 'Available now', 'Low'],
    ],
  },
}
