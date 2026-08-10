'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { ElementType } from 'react'
import {
  AlertTriangle,
  BellRing,
  BusFront,
  CalendarCheck,
  ClipboardCheck,
  Download,
  FileText,
  MapPinned,
  MessageCircle,
  Route,
  School,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { CommunicationCentre, PortalDataCentre, QRScanCentre } from '@/components/dashboard/DataWidgets'
import { dashboardLinks } from '@/lib/dashboard-links'

type SchoolSection =
  | 'overview'
  | 'fleet'
  | 'students'
  | 'routes'
  | 'crew'
  | 'safeguarding'
  | 'comms'
  | 'attendance'
  | 'billing'
  | 'reports'
  | 'whitelabel'
  | 'settings'

const sectionCopy: Record<SchoolSection, { eyebrow: string; title: string; text: string }> = {
  overview: {
    eyebrow: 'School transport command',
    title: 'Greenfield School transport desk',
    text: 'A scoped operating view for school administrators, principals, and safeguarding leads. It shows only this school routes, pupils, guardians, assigned crew, billing, reports, and today journey evidence.',
  },
  fleet: {
    eyebrow: 'Live fleet',
    title: 'Today buses serving this school',
    text: 'View-only vehicle movement for school routes, including ETA, current load, crew names, route state, and school-scoped alerts.',
  },
  students: {
    eyebrow: 'Student register',
    title: 'Pupils, guardians, route status',
    text: 'Manage transport records for registered pupils, guardian verification, class lists, route assignment, medical visibility for safeguarding, and removal from transport.',
  },
  routes: {
    eyebrow: 'Route workspace',
    title: 'School routes and manifests',
    text: 'Review stop order, assigned pupils, route capacity, and request route reviews from Tranzita operations without controlling national routing tools.',
  },
  crew: {
    eyebrow: 'Crew profiles',
    title: 'Assigned crew confidence view',
    text: 'See the driver, copilot, and nurse assigned to school routes, with Tranzita ID, clearance status, certification dates, and concern escalation.',
  },
  safeguarding: {
    eyebrow: 'Safeguarding evidence',
    title: 'Journey audits and safety packs',
    text: 'Search journey records, welfare notes, incidents, speed alerts, and export school-specific safeguarding packs for a date range.',
  },
  comms: {
    eyebrow: 'Parent comms',
    title: 'WhatsApp messages for school families',
    text: 'Compose, preview, schedule, and review school messages filtered by all parents or specific routes.',
  },
  attendance: {
    eyebrow: 'Attendance',
    title: 'Expected versus actual transport attendance',
    text: 'Track who tapped on, who missed pickup, and who completed drop-off for each route today and historically.',
  },
  billing: {
    eyebrow: 'Billing',
    title: 'Current term invoice and payment history',
    text: 'Review the school invoice, itemised pupil count, payment status, and billing team contact actions.',
  },
  reports: {
    eyebrow: 'Reports',
    title: 'Downloadable school transport reports',
    text: 'Weekly safety digest, monthly route performance, term summaries, incident packs, and attendance exports for this school only.',
  },
  whitelabel: {
    eyebrow: 'White label revenue',
    title: 'Let parents onboard through your school brand.',
    text: 'Schools can offer a white-labelled Tranzita onboarding experience with their school logo, a setup fee, and optional custom app negotiation. The service only works with Tranzita-approved partner buses and cannot be used for outside fleet vehicles.',
  },
  settings: {
    eyebrow: 'School settings',
    title: 'School profile, access, and preferences',
    text: 'Maintain school contacts, safeguarding lead, notification preferences, report schedule, and school user access.',
  },
}

const kpis: Record<SchoolSection, Array<[string, string, string]>> = {
  overview: [['Buses active now', '6', 'School routes only'], ['Children on board', '84', 'Live count'], ['On-time today', '96%', 'Afternoon wave'], ['Open alerts', '1', 'Low priority']],
  fleet: [['Vehicles today', '6', 'All GPS live'], ['Average ETA', '18 min', 'Home wave'], ['Children carried', '184', 'Across routes'], ['Open fleet alerts', '1', 'No critical']],
  students: [['Registered pupils', '184', 'Transport list'], ['Verified guardians', '372', 'Pickup approved'], ['Medical notes', '18', 'Restricted view'], ['Unassigned pupils', '4', 'Need route']],
  routes: [['Active routes', '12', '6 morning / 6 afternoon'], ['Route reviews', '2', 'With operations'], ['Capacity used', '88%', 'Healthy load'], ['Stops mapped', '146', 'School cluster']],
  crew: [['Assigned crew', '18', 'Drivers, copilots, nurses'], ['Clearance current', '100%', 'School-visible'], ['Training due', '2', 'This month'], ['Concerns open', '0', 'Clear']],
  safeguarding: [['Audit records', '1,248', 'This term'], ['Welfare notes', '14', 'School related'], ['Incidents open', '0', 'None active'], ['Exports ready', '5', 'PDF packs']],
  comms: [['Parents reachable', '98%', 'WhatsApp verified'], ['Messages today', '426', 'Delivered'], ['Scheduled', '3', 'This week'], ['Failed retries', '2', 'Auto retry']],
  attendance: [['Expected today', '184', 'Manifest'], ['Tapped on', '176', 'Morning'], ['Absent marked', '8', 'With reasons'], ['CSV exports', '7', 'This term']],
  billing: [['Current invoice', 'NGN 4.6m', 'Term 1'], ['Paid status', 'Pending', 'Due 30 Sep 2026'], ['Pupils billed', '184', 'Itemised'], ['Invoices', '6', 'History']],
  reports: [['Reports ready', '9', 'Downloadable'], ['Safety digests', '5', 'Weekly'], ['Route reports', '3', 'Monthly'], ['Incident packs', '1', 'Closed']],
  whitelabel: [['Setup fee', 'Available', 'Commercial onboarding'], ['School logo', 'Supported', 'Shown to parents'], ['Custom app', 'Negotiable', 'Contact Tranzita'], ['Fleet boundary', 'Tranzita only', 'Partner buses only']],
  settings: [['School status', 'Active', 'Live account'], ['Portal users', '5', 'School team'], ['Safeguarding lead', '1', 'Verified'], ['Preferences', 'Ready', 'Reviewed']],
}

const fleetRows = [
  ['TRZ-B012', 'Afternoon Route B', 'Emeka O. / Tosin B. / Nurse Halima', '42 children', 'ETA 18 min', 'On time'],
  ['TRZ-B018', 'Afternoon Route A', 'Ifeanyi A. / Dara K. / Nurse Sade', '31 children', 'ETA 14 min', 'On time'],
  ['TRZ-B021', 'Island Express', 'Musa T. / Ada N. / Nurse Kemi', '22 children', 'ETA 21 min', 'Loading'],
  ['TRZ-B027', 'Lekki Loop', 'Joseph A. / Fola M. / Nurse Lara', '29 children', 'ETA 26 min', 'Review'],
]

const studentRows = [
  ['Amara Okorie', 'Year 4', 'Route B', '2 guardians verified', 'On bus'],
  ['Tomi Adewale', 'Year 2', 'Route B', '1 guardian pending', 'Pickup pending'],
  ['Zara Bello', 'Year 5', 'Route A', '3 guardians verified', 'Medical note'],
  ['David Musa', 'Year 3', 'Island Express', '2 guardians verified', 'At school'],
]

const routeRows = [
  ['Morning A', 'TRZ-B018', '31 / 34 pupils', 'Stop order approved', 'Completed'],
  ['Morning B', 'TRZ-B012', '42 / 44 pupils', 'School gate handover logged', 'Completed'],
  ['Afternoon A', 'TRZ-B018', '31 / 34 pupils', 'Boarding at 15:10', 'Loading'],
  ['Afternoon B', 'TRZ-B012', '42 / 44 pupils', 'Traffic window watched', 'Active'],
]

const crewRows = [
  ['Emeka Okafor', 'Driver', 'TRZ-B012 / Route B', 'Police and FRSC current', 'QR ready'],
  ['Tosin Bankole', 'Copilot', 'TRZ-B012 / Route B', 'Safeguarding current', 'QR ready'],
  ['Nurse Halima', 'Nurse', 'TRZ-B012 / Route B', 'Medical clearance current', 'QR ready'],
  ['Ifeanyi Adebayo', 'Driver', 'TRZ-B018 / Route A', 'Training refresh due', 'View summary'],
]

const safeguardingRows = [
  ['Journey audit', 'Route B / 7 Aug 2026', 'Tap on and tap off complete', 'Download PDF'],
  ['Welfare note', 'Zara Bello', 'Asthma observation shared with school', 'Review'],
  ['Speed alert history', 'All school routes', 'No critical events this week', 'Export'],
  ['Incident report', 'No guardian protocol / closed', 'Parents and school notified', 'Download pack'],
]

const commsRows = [
  ['Departure reminder', 'Route B parents', 'Delivered 98%', 'View receipt'],
  ['Traffic delay notice', 'Afternoon A', 'Scheduled 15:45', 'Edit'],
  ['Guardian update request', 'Year 2 families', 'Draft', 'Preview WhatsApp'],
  ['Weekly digest note', 'All transport parents', 'Friday 09:00', 'Scheduled'],
]

const attendanceRows = [
  ['Morning Route A', '34 expected', '31 tapped on', '3 absent with reason', 'Export'],
  ['Morning Route B', '44 expected', '42 tapped on', '2 absent with reason', 'Export'],
  ['Afternoon Route A', '34 expected', '31 boarded', 'In progress', 'Live'],
  ['Afternoon Route B', '44 expected', '42 boarded', 'In progress', 'Live'],
]

const billingRows = [
  ['Term 1 transport invoice', '184 pupils', 'NGN 4.6m', 'Due 30 Sep 2026', 'Download'],
  ['July adjustment credit', '2 route credits', 'NGN 84k', 'Applied', 'View'],
  ['Payment history', '2025/2026 closeout', 'NGN 12.8m', 'Paid', 'Download'],
  ['Billing support', 'School success team', 'booking@tranzita.africa', 'Ready', 'Contact'],
]

const reportRows = [
  ['Weekly safety digest', 'Week ending 7 Aug 2026', 'PDF', 'Ready'],
  ['Monthly route performance', 'July 2026', 'PDF', 'Ready'],
  ['Term attendance summary', 'Term 1 draft', 'CSV + PDF', 'Preparing'],
  ['Safeguarding incident pack', 'Closed case archive', 'PDF', 'Ready'],
]

const settingRows = [
  ['Principal', 'Mrs Adeola James', 'School owner', 'Active'],
  ['Safeguarding lead', 'Mr Kunle Adebayo', 'Audit and export access', 'Verified'],
  ['Report schedule', 'Weekly Friday digest', 'School admin', 'Active'],
  ['Notification mode', 'WhatsApp plus email', 'All parents', 'Active'],
]

const whiteLabelRows = [
  ['School-branded parent onboarding', 'School logo, school name and parent welcome flow', 'Setup fee applies', 'Available'],
  ['Custom app implementation', 'Dedicated school-branded app experience', 'Negotiated project fee', 'Contact Tranzita'],
  ['Approved vehicle boundary', 'Only Tranzita partner buses can be onboarded', 'Outside fleet blocked', 'Required'],
  ['Parent comfort channel', 'Parents can onboard through the school if they prefer', 'Still powered by Tranzita safety rules', 'Available'],
]

const actionRows: Record<SchoolSection, Array<[string, string, string]>> = {
  overview: [['Approve backup guardian for Tomi', 'Safeguarding lead', 'Today'], ['Review Route B afternoon timing', 'Principal', 'This week'], ['Download weekly digest', 'School admin', 'Friday']],
  fleet: [['Open TRZ-B027 route detail', 'Transport admin', 'Now'], ['Review one low alert', 'Safeguarding lead', 'Today'], ['Request Route B timing review', 'School admin', 'This week']],
  students: [['Complete Tomi guardian verification', 'Safeguarding lead', 'Today'], ['Assign four pupils to routes', 'School admin', 'Tomorrow'], ['Export updated pupil list', 'School admin', 'Friday']],
  routes: [['Confirm Afternoon B stop order', 'School admin', 'Today'], ['Request review for Lekki Loop', 'Principal', 'This week'], ['Approve route manifest changes', 'Safeguarding lead', 'Tomorrow']],
  crew: [['Review training refresh note', 'Principal', 'This month'], ['Raise concern if needed', 'School admin', 'Anytime'], ['Download crew clearance summary', 'Safeguarding lead', 'Friday']],
  safeguarding: [['Export Friday pack', 'Safeguarding lead', 'Friday'], ['Review closed no guardian case', 'Principal', 'Today'], ['Search audit by pupil if required', 'Safeguarding lead', 'Anytime']],
  comms: [['Preview traffic delay copy', 'School admin', 'Today'], ['Schedule Friday digest', 'School admin', 'Thursday'], ['Send guardian update reminder', 'Safeguarding lead', 'Tomorrow']],
  attendance: [['Export morning attendance CSV', 'School admin', 'Today'], ['Review absent reasons', 'Principal', 'Today'], ['Send MIS export', 'School office', 'Friday']],
  billing: [['Download term invoice', 'Bursar', 'Today'], ['Confirm student count', 'School admin', 'This week'], ['Contact billing team', 'Bursar', 'If needed']],
  reports: [['Download weekly digest', 'Principal', 'Today'], ['Prepare term pack', 'School admin', 'End of term'], ['Export incident range', 'Safeguarding lead', 'When requested']],
  whitelabel: [['Request white-label setup quote', 'School owner', 'This week'], ['Upload school logo pack', 'School admin', 'Before setup'], ['Discuss custom app scope', 'Principal', 'By negotiation']],
  settings: [['Review portal users', 'School admin', 'This week'], ['Confirm safeguarding lead email', 'Principal', 'Today'], ['Check report schedule', 'School office', 'Friday']],
}

const rowMap: Record<SchoolSection, { title: string; subtitle: string; headers: string[]; rows: string[][] }> = {
  overview: { title: "Today's route status", subtitle: 'Every row is scoped to this school and this school day.', headers: ['Route', 'Vehicle', 'Crew', 'Route note', 'Status'], rows: routeRows },
  fleet: { title: 'School live fleet table', subtitle: 'Vehicle, crew summary, passenger count, ETA, and alert status.', headers: ['Bus', 'Route', 'Assigned crew', 'Load', 'ETA', 'Status'], rows: fleetRows },
  students: { title: 'Student transport register', subtitle: 'Class, route, guardian readiness, and live transport status.', headers: ['Pupil', 'Class', 'Route', 'Guardian state', 'Today'], rows: studentRows },
  routes: { title: 'Route manifests', subtitle: 'Capacity, stop sequence status, and school route state.', headers: ['Route', 'Vehicle', 'Manifest', 'Route note', 'Status'], rows: routeRows },
  crew: { title: 'Assigned crew profiles', subtitle: 'School-visible clearance summaries only. Private driver records stay hidden.', headers: ['Crew', 'Role', 'Assignment', 'Clearance summary', 'Action'], rows: crewRows },
  safeguarding: { title: 'Safeguarding evidence register', subtitle: 'Journey logs, welfare notes, incidents, and speed alert history for this school.', headers: ['Record', 'Scope', 'Evidence', 'Action'], rows: safeguardingRows },
  comms: { title: 'Parent communication log', subtitle: 'WhatsApp copy, delivery state, schedule, and receipts.', headers: ['Message', 'Audience', 'State', 'Action'], rows: commsRows },
  attendance: { title: 'Transport attendance board', subtitle: 'Expected versus actual boarding and absence reasons by route.', headers: ['Route', 'Expected', 'Tapped / boarded', 'Exception', 'Action'], rows: attendanceRows },
  billing: { title: 'School billing ledger', subtitle: 'Invoices and payment history for this school only.', headers: ['Item', 'Basis', 'Amount / contact', 'Status', 'Action'], rows: billingRows },
  reports: { title: 'Report library', subtitle: 'Downloadable school reports without national analytics or internal data.', headers: ['Report', 'Period', 'Format', 'Status'], rows: reportRows },
  whitelabel: { title: 'White-label onboarding options', subtitle: 'Commercial options for school-branded parent onboarding on Tranzita approved fleets only.', headers: ['Option', 'What parents see', 'Commercial model', 'Status'], rows: whiteLabelRows },
  settings: { title: 'School account controls', subtitle: 'School contacts, access level, report preferences, and notification channels.', headers: ['Setting', 'Current value', 'Access', 'Status'], rows: settingRows },
}

const icons: Record<SchoolSection, ElementType> = {
  overview: BusFront,
  fleet: BusFront,
  students: UsersRound,
  routes: Route,
  crew: ShieldCheck,
  safeguarding: ClipboardCheck,
  comms: MessageCircle,
  attendance: CalendarCheck,
  billing: FileText,
  reports: Download,
  whitelabel: School,
  settings: BellRing,
}

export default function SchoolPortalPage({ section }: { section: SchoolSection }) {
  const copy = sectionCopy[section]
  const table = rowMap[section]
  const Icon = icons[section]

  return (
    <DashboardShell role="School" title="School Transport Command Centre" links={dashboardLinks.school}>
      <div className="space-y-5">
        <motion.section
          className="relative overflow-hidden rounded-[30px] bg-white p-6 shadow-sm lg:p-8"
          style={{ border: '1px solid #DDE9D2' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute right-6 top-6 hidden h-28 w-28 rounded-full lg:block" style={{ background: '#FFF0E4' }} />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-widest" style={{ background: '#FFF0E4', color: '#D96B1F' }}>
                <Icon size={16} /> {copy.eyebrow}
              </span>
              <h2 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: '#183024' }}>{copy.title}</h2>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 sm:text-base" style={{ color: '#65785F' }}>{copy.text}</p>
            </div>
            <SchoolScopeCard />
          </div>
        </motion.section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis[section].map(([label, value, note], index) => (
            <motion.div
              key={label}
              className="rounded-[24px] bg-white p-5 shadow-sm"
              style={{ border: '1px solid #DDE9D2' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#65785F' }}>{label}</p>
              <p className="mt-3 text-3xl font-extrabold" style={{ color: '#183024' }}>{value}</p>
              <p className="mt-2 text-xs font-bold" style={{ color: '#D96B1F' }}>{note}</p>
            </motion.div>
          ))}
        </div>

        <PortalDataCentre
          title="School Transport Data Centre"
          subtitle="School-only view of attendance, routes, fleet readiness, parent communication and safeguarding signals"
          pies={[['On schedule', 79, '#D96B1F'], ['Late watch', 14, '#F8C84E'], ['Needs review', 7, '#7EA06D']]}
          bars={[['Fleet', 84], ['Students', 76], ['Routes', 88], ['Comms', 64], ['Billing', 71], ['Reports', 92]]}
        />

        <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <RouteMapPanel section={section} />
          <ActionPanel section={section} />
        </div>

        <SchoolTable title={table.title} subtitle={table.subtitle} headers={table.headers} rows={table.rows} />

        {section === 'comms' ? <CommunicationCentre role="School" /> : null}
        {section === 'whitelabel' ? <WhiteLabelCommercialPanel /> : null}
        {section === 'students' || section === 'attendance' ? (
          <QRScanCentre
            role="School"
            rows={[
              ['Student card', 'Today, 7:12 AM', 'Student matched to school route', 'Open student record'],
              ['Guardian QR', 'Today, 4:21 PM', 'Guardian handover confirmed', 'View handover receipt'],
              ['Bus QR', 'Today, 6:58 AM', 'Vehicle assigned to school route', 'Open fleet view'],
            ]}
          />
        ) : null}

        <div className="grid gap-5 xl:grid-cols-3">
          <SignalCard title="School view" value="Your campus" note="Routes, children, guardians, crew and reports for your assigned schools." />
          <SignalCard title="Permission model" value="Admin / principal / safeguarding" note="Sensitive medical and audit data belongs to safeguarding access." />
          <SignalCard title="Portal status" value="Ready for login" note="Built for the school team to review daily movement and parent communication." />
        </div>
      </div>
    </DashboardShell>
  )
}

function WhiteLabelCommercialPanel() {
  return (
    <motion.section className="rounded-[28px] bg-white p-5 shadow-sm sm:p-6" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px] xl:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Revenue option</p>
          <h3 className="mt-3 text-2xl font-extrabold" style={{ color: '#183024' }}>White-label onboarding can carry your school identity.</h3>
          <p className="mt-3 text-sm font-semibold leading-7" style={{ color: '#65785F' }}>
            Parents can see the school logo and complete onboarding through a school-branded Tranzita flow. A setup fee applies. Schools that want a custom app built and implemented into their own school portal can contact Tranzita for commercial negotiation.
          </p>
          <div className="mt-5 rounded-2xl p-4" style={{ background: '#FFF0E4', border: '1px solid #DDE9D2' }}>
            <p className="text-sm font-extrabold" style={{ color: '#183024' }}>Fleet rule</p>
            <p className="mt-1 text-sm font-semibold leading-6" style={{ color: '#65785F' }}>White-label onboarding only covers Tranzita-approved partner buses. Schools cannot use this portal to onboard private or outside buses in their wider fleet.</p>
          </div>
        </div>
        <div className="rounded-[24px] p-5" style={{ background: 'linear-gradient(135deg, #FFF0E4, #FFF9F2)', border: '1px solid #DDE9D2' }}>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#65785F' }}>Parent-facing label</p>
          <div className="mt-4 rounded-[22px] bg-white p-5 text-center" style={{ border: '1px solid #DDE9D2' }}>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-extrabold" style={{ background: '#FFF0E4', color: '#D96B1F' }}>GS</div>
            <p className="mt-4 text-xl font-extrabold" style={{ color: '#183024' }}>Greenfield School Transport</p>
            <p className="mt-2 text-sm font-semibold" style={{ color: '#65785F' }}>Powered by Tranzita approved buses</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function SchoolScopeCard() {
  return (
    <div className="rounded-[26px] p-5" style={{ background: '#FFF9F2', border: '1px solid #DDE9D2' }}>
      <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Visible in this portal</p>
      <div className="mt-4 space-y-3 text-sm font-bold" style={{ color: '#183024' }}>
        {['Own pupils and guardians', 'Own routes and school buses', 'Assigned crew summaries', 'School reports and billing'].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#D96B1F' }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RouteMapPanel({ section }: { section: SchoolSection }) {
  return (
    <motion.div className="rounded-[28px] bg-white p-5 shadow-sm" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold" style={{ color: '#183024' }}>{section === 'students' || section === 'attendance' ? 'Movement timeline' : 'School route map'}</h3>
          <p className="mt-1 text-sm" style={{ color: '#65785F' }}>Illustrative school-only route layer with ETA and handover points.</p>
        </div>
        <MapPinned color="#D96B1F" />
      </div>
      <div className="relative mt-5 h-72 overflow-hidden rounded-[24px]" style={{ background: 'linear-gradient(135deg, #FFF0E4, #F1F6EA)', border: '1px solid #DDE9D2' }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 300" aria-hidden="true">
          <path d="M35 220 C120 80 210 235 300 112 C405 -5 475 212 604 62" fill="none" stroke="#D96B1F" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 14" />
          <path d="M70 244 L570 244" stroke="#DDE9D2" strokeWidth="2" />
          {[82, 200, 310, 442, 560].map((x, index) => (
            <circle key={x} cx={x} cy={[178, 204, 112, 164, 76][index]} r="11" fill={index === 2 ? '#F8C84E' : '#D96B1F'} />
          ))}
        </svg>
        <motion.div className="absolute left-8 top-40 rounded-full bg-white p-3 shadow-lg" animate={{ x: [0, 125, 270, 430], y: [0, 24, -70, -105] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <BusFront size={24} color="#D96B1F" />
        </motion.div>
        <div className="absolute bottom-4 left-4 right-4 grid gap-2 sm:grid-cols-3">
          {['School gate', 'Route B active', 'ETA watched'].map((item) => (
            <span key={item} className="rounded-full bg-white px-3 py-2 text-center text-xs font-extrabold shadow-sm" style={{ color: '#183024' }}>{item}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ActionPanel({ section }: { section: SchoolSection }) {
  const [status, setStatus] = useState<string | null>(null)

  async function runSchoolAction(task: string) {
    setStatus('Logging school action...')
    const route = task.includes('Route') || task.includes('route') || task.includes('Lekki') ? '/api/school/route-review-requests' : task.includes('guardian') || task.includes('Guardian') ? '/api/school/guardian-approvals' : task.includes('digest') || task.includes('Export') || task.includes('Download') || task.includes('pack') ? '/api/school/exports' : '/api/school/comms'
    const response = await fetch(route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        child: 'Tomi Adewale',
        guardian: 'Backup guardian',
        decision: 'approved',
        route: task,
        reason: 'School portal action queue request.',
        requestedChange: task,
        audience: 'School transport parents',
        channel: 'whatsapp',
        message: task,
        exportType: task,
        format: task.includes('CSV') || task.includes('MIS') ? 'CSV' : 'PDF',
        dateRange: 'Current school period',
      }),
    })
    setStatus(response.ok ? 'School action logged for operations.' : 'Sign in with an active school account to use this action.')
  }

  return (
    <motion.div className="rounded-[28px] bg-white p-5 shadow-sm" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold" style={{ color: '#183024' }}>School action queue</h3>
          <p className="mt-1 text-sm" style={{ color: '#65785F' }}>Work the school can review or request.</p>
        </div>
        <AlertTriangle color="#D96B1F" />
      </div>
      <div className="mt-5 space-y-3">
        {actionRows[section].map(([task, owner, due], index) => (
          <motion.div key={task} className="rounded-2xl p-4" style={{ background: index === 0 ? '#FFF0E4' : '#FFF9F2', border: '1px solid #DDE9D2' }} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
            <p className="font-extrabold" style={{ color: '#183024' }}>{task}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-bold" style={{ color: '#65785F' }}>
              <span>{owner}</span>
              <span>{due}</span>
              <button type="button" onClick={() => runSchoolAction(task)} className="rounded-full px-3 py-1 font-extrabold text-white" style={{ background: '#D96B1F' }}>Log action</button>
            </div>
          </motion.div>
        ))}
      </div>
      {status ? <p className="mt-4 rounded-2xl px-4 py-3 text-sm font-extrabold" style={{ background: '#FFF0E4', color: '#183024' }}>{status}</p> : null}
    </motion.div>
  )
}

function SchoolTable({ title, subtitle, headers, rows }: { title: string; subtitle: string; headers: string[]; rows: string[][] }) {
  return (
    <motion.div className="rounded-[28px] bg-white p-5 shadow-sm" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div>
        <h3 className="text-xl font-extrabold" style={{ color: '#183024' }}>{title}</h3>
        <p className="mt-1 text-sm" style={{ color: '#65785F' }}>{subtitle}</p>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead style={{ color: '#65785F' }}>
            <tr>{headers.map((header) => <th key={header} className="px-4 py-3 font-extrabold">{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join('-')} className="border-t" style={{ borderColor: '#DDE9D2' }}>
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className="px-4 py-4 font-bold" style={{ color: index === row.length - 1 ? '#D96B1F' : '#183024' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

function SignalCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <motion.div className="rounded-[24px] bg-white p-5 shadow-sm" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#65785F' }}>{title}</p>
      <p className="mt-3 text-2xl font-extrabold" style={{ color: '#183024' }}>{value}</p>
      <p className="mt-2 text-sm leading-6" style={{ color: '#65785F' }}>{note}</p>
    </motion.div>
  )
}
