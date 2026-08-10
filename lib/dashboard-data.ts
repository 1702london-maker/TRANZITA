export type DashboardRole = 'Admin' | 'School' | 'Parent' | 'Driver' | 'Copilot' | 'Nurse' | 'Partner'

export const dashboardProfiles: Record<DashboardRole, { name: string; badge: string; kpis: Array<[string, string, string]> }> = {
  Admin: {
    name: 'Operations Control',
    badge: 'National command',
    kpis: [
      ['Active buses', '42', '+8 today'],
      ['Children on board', '318', 'Live count'],
      ['Open alerts', '7', '2 urgent'],
      ['On-time rate', '98%', '+3.2%'],
    ],
  },
  School: {
    name: 'Greenfield School',
    badge: 'School admin',
    kpis: [
      ['Buses active', '6', 'Afternoon'],
      ['Children onboard', '84', 'Live count'],
      ['Routes today', '12', '10 complete'],
      ['Open alerts', '1', 'Low'],
    ],
  },
  Parent: {
    name: 'Parent Account',
    badge: 'Verified guardian',
    kpis: [
      ['Children', '2', 'Registered'],
      ['Current status', 'On bus', 'ETA 18 mins'],
      ['Guardians', '3', 'Verified'],
      ['Trips this term', '44', 'All safe'],
    ],
  },
  Driver: {
    name: 'Emeka Okafor',
    badge: 'TRZ-0048',
    kpis: [
      ['Today route', 'B12', 'Active'],
      ['Children onboard', '8', 'Manifest'],
      ['Speed', '42 km/h', 'Compliant'],
      ['Checklist', 'Passed', '06:42'],
    ],
  },
  Copilot: {
    name: 'Co-driver Console',
    badge: 'Manifest control',
    kpis: [
      ['Manifest', '18', 'Children'],
      ['Tapped on', '16', '2 pending'],
      ['Drop-offs', '7', 'Next: Lekki'],
      ['Guardian flags', '0', 'Clear'],
    ],
  },
  Nurse: {
    name: 'Nurse Console',
    badge: 'Welfare watch',
    kpis: [
      ['Children checked', '18', 'Morning'],
      ['Medical notes', '4', 'Known'],
      ['First aid kit', 'Ready', 'Passed'],
      ['Welfare flags', '1', 'Observation'],
    ],
  },
  Partner: {
    name: 'Vehicle Partner',
    badge: 'Fleet earnings',
    kpis: [
      ['Vehicles active', '3', 'On route'],
      ['This month', 'NGN 485k', '+12%'],
      ['Next payment', '1 Sep', 'Scheduled'],
      ['Inspection status', 'Clear', 'All passed'],
    ],
  },
}

export const barData = [68, 82, 74, 93, 88, 97, 91]
export const pieData = [
  ['On time', 70, '#D96B1F'],
  ['Delayed', 18, '#F8C84E'],
  ['Flagged', 12, '#7EA06D'],
]

export const tableRows = [
  ['TRZ-B012', 'Greenfield', 'Route B', '8 children', '42 km/h', 'On time'],
  ['TRZ-B018', 'Corona School', 'Route A', '11 children', '36 km/h', 'On time'],
  ['TRZ-E004', 'Lekki British', 'Executive', '5 children', '39 km/h', 'Delayed'],
  ['TRZ-B027', 'Abuja Prep', 'Route C', '14 children', '31 km/h', 'Review'],
]

export const alertRows = [
  ['GPS ping recovered', 'TRZ-B012', 'Low', '2 min ago'],
  ['Late guardian confirmation', 'TRZ-E004', 'Medium', '6 min ago'],
  ['Route B completed safely', 'TRZ-B018', 'Info', '11 min ago'],
]

export const workQueueRows = [
  ['Route B morning review', 'Operations', 'Due 09:40', 'High'],
  ['Guardian approval check', 'Safeguarding', 'Due today', 'Medium'],
  ['Partner vehicle document', 'Fleet', 'Due Friday', 'Medium'],
  ['School onboarding call', 'Growth', 'Booked', 'Low'],
]

export const financeRows = [
  ['School subscriptions', 'NGN 8.4m', '+14%', 'Collected'],
  ['Partner payouts', 'NGN 2.1m', '1 Sep', 'Scheduled'],
  ['Incident credits', 'NGN 0', 'None', 'Clear'],
  ['Open invoices', 'NGN 1.2m', '4 schools', 'Follow up'],
]

export const manifestRows = [
  ['Amara Okorie', 'Tapped on', 'Route B', 'Guardian notified'],
  ['Tomi Adewale', 'Pending pickup', 'Route B', 'ETA 7 mins'],
  ['Zara Bello', 'Dropped off', 'Route A', 'Confirmed'],
  ['David Musa', 'On bus', 'Route C', 'Nurse aware'],
]

export const complianceRows = [
  ['Background / police clearance', '39 crew', '2 expiring', 'Review'],
  ['Vehicle inspections', '42 buses', '4 due soon', 'Schedule'],
  ['First aid readiness', '18 kits', '1 restock', 'Assign'],
  ['Audio-only safeguard', '100%', 'No breach', 'Clear'],
]

export type DashboardPayload = {
  profile: (typeof dashboardProfiles)[DashboardRole]
  barData: number[]
  pieData: Array<[string, number, string]>
  tableRows: string[][]
  alertRows: string[][]
  workQueueRows: string[][]
  financeRows: string[][]
  manifestRows: string[][]
  complianceRows: string[][]
  source: 'seed' | 'supabase'
}

export function getSeedDashboardPayload(role: DashboardRole): DashboardPayload {
  const scoped = scopedRows[role]
  return {
    profile: dashboardProfiles[role],
    barData: scoped?.barData || barData,
    pieData: (scoped?.pieData || pieData) as Array<[string, number, string]>,
    tableRows: scoped?.tableRows || tableRows,
    alertRows: scoped?.alertRows || alertRows,
    workQueueRows: scoped?.workQueueRows || workQueueRows,
    financeRows: scoped?.financeRows || financeRows,
    manifestRows: scoped?.manifestRows || manifestRows,
    complianceRows: scoped?.complianceRows || complianceRows,
    source: 'seed',
  }
}

const scopedRows: Partial<Record<DashboardRole, Partial<DashboardPayload>>> = {
  Parent: {
    tableRows: [
      ['Amara', 'Greenfield School', 'On bus', 'ETA 18 mins', 'Crew verified', 'Parent view'],
      ['Tomi', 'Greenfield School', 'At school', 'Afternoon route pending', 'Guardian ready', 'Parent view'],
    ],
    manifestRows: [
      ['Amara', 'On bus', 'Route B', 'Arrival alert due'],
      ['Tomi', 'At school', 'Route B', 'Pickup pending'],
    ],
    financeRows: [
      ['Current term plan', 'Active', 'School-linked', 'Clear'],
      ['Next payment', 'Pending confirmation', 'Support can assist', 'Review'],
    ],
  },
  Driver: {
    tableRows: [
      ['Pre-departure checklist', 'TRZ-B012', 'Passed', 'Route unlocked', '06:42', 'Driver only'],
      ['Route B12', 'Greenfield pickup', 'Active', 'Follow assigned stops', 'Live', 'Driver only'],
    ],
    manifestRows: [
      ['Stop 1', '2 children expected', 'Arrive 15:35', 'Copilot handles child identity'],
      ['Stop 2', '3 children expected', 'Arrive 15:48', 'Stay on route'],
    ],
  },
  Copilot: {
    tableRows: [
      ['Manifest verification', '18 children', '16 tapped on', '2 pending', 'Live', 'Copilot only'],
      ['Guardian handover', 'Route B', 'No flags', 'Continue', 'Live', 'Copilot only'],
    ],
  },
  Nurse: {
    tableRows: [
      ['Morning temperature round', '18 checks', '1 observation', 'Logged', 'Nurse only', 'Welfare'],
      ['Noon welfare round', 'Pending', 'Route B', 'Prepare', 'Nurse only', 'Welfare'],
    ],
  },
  Partner: {
    tableRows: [
      ['TRZ-P011', 'Approved Tranzita route', 'Children onboard count: 12', 'Certified', 'No child names', 'Active'],
      ['TRZ-P018', 'Approved Tranzita route', 'Children onboard count: 9', 'Inspection due', 'No parent data', 'Active'],
      ['TRZ-P023', 'Backup pool', 'Children onboard count: 0', 'Certified', 'No school private data', 'Available'],
    ],
    manifestRows: [
      ['TRZ-P011', '12 children onboard', 'Route visible', 'No names exposed'],
      ['TRZ-P018', '9 children onboard', 'Route visible', 'No parent contacts exposed'],
    ],
    financeRows: [
      ['TRZ-P011 earnings', 'NGN 185k', 'Current month', 'Scheduled'],
      ['TRZ-P018 earnings', 'NGN 162k', 'Current month', 'Inspection pending'],
      ['TRZ-P023 earnings', 'NGN 138k', 'Current month', 'Clear'],
    ],
  },
}
