'use client'

import { useEffect, useState } from 'react'
import { ActionQueue, AlertsFeed, BarChartCard, ControlCentreStrip, DataTableCard, FleetTable, KpiGrid, PieChartCard } from '@/components/dashboard/DataWidgets'
import { getSeedDashboardPayload, type DashboardPayload, type DashboardRole } from '@/lib/dashboard-data'

export default function DashboardSectionRuntime({ role, section }: { role: DashboardRole; section: string }) {
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

  const sectionKey = section.toLowerCase()

  if (sectionKey.includes('billing') || sectionKey.includes('earnings')) {
    return (
      <>
        <ControlCentreStrip items={[['Collected this month', 'NGN 8.4m'], ['Open balance', 'NGN 1.2m'], ['Next payout run', '1 Sep 2026']]} />
        <DataTableCard title="Finance Ledger" subtitle="Invoices, payouts, credits, and collection status" headers={['Line item', 'Amount', 'Movement', 'Status']} rows={payload.financeRows} />
        <BarChartCard data={payload.barData} />
      </>
    )
  }

  if (sectionKey.includes('onboarding')) {
    return (
      <>
        <ControlCentreStrip items={[['Schools in pipeline', '11'], ['Ready for test route', '3'], ['Parents invited', '1,248']]} />
        <DataTableCard title="School Onboarding Pipeline" subtitle="From application through first live route" headers={['School', 'Stage', 'Owner', 'Next action']} rows={[
          ['Meadow Hall', 'Routes mapped', 'Onboarding manager', 'Confirm stop sequence'],
          ['Abuja Prep', 'Crew assigned', 'Operations', 'Run test route'],
          ['Riverbank School', 'Parents onboarded', 'School admin', 'Send reminder'],
          ['Hillcrest Academy', 'Contract signed', 'Commercial', 'Upload students'],
        ]} />
        <ActionQueue rows={[
          ['Send parent invitation pack', 'School success', 'Today', 'High'],
          ['Book test route for Abuja Prep', 'Operations', 'Tomorrow', 'High'],
          ['Approve route clusters', 'Route planner', 'Friday', 'Medium'],
          ['Assign onboarding manager', 'Admin', 'This week', 'Medium'],
        ]} title="Onboarding Task Board" />
      </>
    )
  }

  if (sectionKey.includes('analytics') || sectionKey.includes('reports') || sectionKey.includes('history')) {
    return (
      <>
        <ControlCentreStrip items={[['Routes analysed', '1,482'], ['Safe arrivals', '99.2%'], ['Reports exported', '28']]} />
        <div className="grid gap-5 xl:grid-cols-2">
          <BarChartCard data={[54, 67, 71, 78, 84, 91, 96]} />
          <PieChartCard data={[['Completed', 76, '#D96B1F'], ['Reviewed', 16, '#F8C84E'], ['Escalated', 8, '#7EA06D']]} />
        </div>
        <DataTableCard title="Insights Register" subtitle="Operational patterns prepared for client reporting" headers={['Insight', 'Scope', 'Movement', 'Decision']} rows={[
          ['Afternoon routes stabilising', 'Lekki corridor', '+9%', 'Keep current crew'],
          ['Late pickups reduced', 'Victoria Island', '-14%', 'Monitor traffic window'],
          ['Guardian confirmations rising', 'All schools', '+22%', 'Extend template'],
          ['Vehicle utilisation balanced', 'Partner fleet', '87%', 'Add 2 backups'],
        ]} />
      </>
    )
  }

  if (sectionKey.includes('manifest') || sectionKey.includes('children') || sectionKey.includes('students') || sectionKey.includes('attendance')) {
    return (
      <>
        <ControlCentreStrip items={[['Children in scope', '318'], ['Verified guardians', '644'], ['Unresolved exceptions', '3']]} />
        <DataTableCard title="Child Movement Register" subtitle="Pickup, drop-off, guardian notification, and welfare state" headers={['Child', 'Status', 'Route', 'Update']} rows={payload.manifestRows} />
        <PieChartCard data={payload.pieData} />
      </>
    )
  }

  if (sectionKey.includes('guardians') || sectionKey.includes('parents')) {
    return (
      <>
        <ControlCentreStrip items={[['Verified guardians', '644'], ['Pending approvals', '12'], ['WhatsApp reach', '98%']]} />
        <DataTableCard title="Guardian Register" subtitle="Authorised contacts, pickup permissions, and notification readiness" headers={['Guardian', 'Child', 'Permission', 'Status']} rows={[
          ['Ada Okorie', 'Amara Okorie', 'Pickup + messages', 'Verified'],
          ['Kunle Adewale', 'Tomi Adewale', 'Messages only', 'Review'],
          ['Hauwa Bello', 'Zara Bello', 'Pickup + emergency', 'Verified'],
          ['Grace Musa', 'David Musa', 'Pickup backup', 'Pending'],
        ]} />
        <ActionQueue rows={[
          ['Approve backup guardian', 'School admin', 'Today', 'High'],
          ['Update phone record', 'Parent support', 'Tomorrow', 'Medium'],
          ['Send onboarding reminder', 'Comms', 'Friday', 'Low'],
        ]} title="Guardian Action Queue" />
      </>
    )
  }

  if (sectionKey.includes('welfare')) {
    return (
      <>
        <ControlCentreStrip items={[['Notes today', '6'], ['Parent notified', '2'], ['Urgent cases', '0']]} />
        <DataTableCard title="Welfare Notes Register" subtitle="Nurse observations and notification decisions for children on route" headers={['Child', 'Observation', 'Severity', 'Notification']} rows={[
          ['Zara Bello', 'Used inhaler before departure', 'Observation', 'School only'],
          ['Tomi Adewale', 'Looked tired at pickup', 'Concern', 'Parent notified'],
          ['David Musa', 'Motion sickness reported', 'Observation', 'Logged'],
          ['Amara Okorie', 'Settled and calm', 'Observation', 'No action'],
        ]} />
        <ActionQueue rows={[
          ['Write welfare note for Tomi', 'Nurse', 'Now', 'High'],
          ['Confirm parent callback', 'Operations', 'Today', 'Medium'],
          ['Review repeated motion sickness', 'Nurse lead', 'This week', 'Medium'],
        ]} title="Welfare Follow-Up Queue" />
      </>
    )
  }

  if (sectionKey.includes('vetting') || sectionKey.includes('safeguarding') || sectionKey.includes('inspection') || sectionKey.includes('documents') || sectionKey.includes('first aid')) {
    if (sectionKey.includes('first aid')) {
      return (
        <>
          <ControlCentreStrip items={[['Kit status', 'Ready'], ['Missing items', '0'], ['Nearest hospital', '8 mins']]} />
          <DataTableCard title="First Aid Checklist" subtitle="Route health readiness and emergency response reference" headers={['Item', 'Required state', 'Current state', 'Action']} rows={[
            ['First aid kit seal', 'Unbroken', 'Confirmed', 'Proceed'],
            ['Emergency medication list', 'Available', 'Loaded', 'Review before route'],
            ['AED location', 'Known', 'School reception', 'Confirmed'],
            ['Hospital reference', 'Current route area', 'Lagoon Hospital', 'Ready'],
          ]} />
          <ActionQueue rows={[
            ['Confirm kit before departure', 'Nurse', 'Before route', 'High'],
            ['Review medical cards', 'Nurse', 'Boarding', 'Medium'],
            ['Update hospital proximity', 'System', 'Live route', 'Low'],
          ]} title="First Aid Actions" />
        </>
      )
    }

    if (sectionKey.includes('documents')) {
      return (
        <>
          <ControlCentreStrip items={[['Documents active', '18'], ['Expiring soon', '3'], ['Rejected files', '0']]} />
          <DataTableCard title="Vehicle Document Vault" subtitle="Partner vehicle documents, expiry dates, and download readiness" headers={['Document', 'Vehicle', 'Expiry', 'Status']} rows={[
            ['Insurance certificate', 'TRZ-P018', '30 Aug 2026', 'Renewal needed'],
            ['Roadworthiness', 'TRZ-P011', '14 Dec 2026', 'Verified'],
            ['Registration certificate', 'TRZ-P023', '22 Jan 2027', 'Verified'],
            ['Inspection certificate', 'TRZ-P018', '12 Aug 2026', 'Booked'],
          ]} />
          <ActionQueue rows={[
            ['Upload renewed insurance', 'Partner', '30 Aug 2026', 'High'],
            ['Confirm document owner name', 'Fleet admin', 'Today', 'Medium'],
            ['Download inspection certificate', 'Partner', 'After inspection', 'Low'],
          ]} title="Document Actions" />
        </>
      )
    }

    if (sectionKey.includes('inspection')) {
      return (
        <>
          <ControlCentreStrip items={[['Inspections due', '4'], ['Passed this month', '38'], ['Failed items open', '1']]} />
          <DataTableCard title="Inspection Schedule" subtitle="Vehicle inspection planning, failed items, and certification records" headers={['Vehicle', 'Inspection date', 'Result', 'Next action']} rows={[
            ['TRZ-P018', '12 Aug 2026', 'Booked', 'Attend inspection'],
            ['TRZ-B027', '15 Aug 2026', 'Due', 'Assign technician'],
            ['TRZ-E004', '2 Aug 2026', 'Passed', 'Certificate issued'],
            ['TRZ-B012', '29 Jul 2026', 'Conditional', 'Replace rear tyre'],
          ]} />
          <ActionQueue rows={[
            ['Book TRZ-B027 inspection', 'Fleet admin', 'Today', 'High'],
            ['Upload TRZ-P018 certificate after visit', 'Partner', '12 Aug', 'Medium'],
            ['Close tyre replacement record', 'Maintenance', 'Tomorrow', 'Medium'],
          ]} title="Inspection Work Queue" />
        </>
      )
    }

    return (
      <>
        <ControlCentreStrip items={[['Compliance files', '104'], ['Due this week', '7'], ['Critical blockers', '0']]} />
        <DataTableCard title="Compliance Register" subtitle="Vetting, inspections, first aid, and safeguarding controls" headers={['Control', 'Coverage', 'Exception', 'Action']} rows={payload.complianceRows} />
        <ActionQueue rows={payload.workQueueRows} title="Compliance Work Queue" />
      </>
    )
  }

  if (sectionKey.includes('crew')) {
    return (
      <>
        <ControlCentreStrip items={[['Active crew', '84'], ['Training due', '9'], ['Clearance blockers', '2']]} />
        <DataTableCard title="Crew Register" subtitle="Drivers, copilots, nurses, training, and clearance readiness" headers={['Crew member', 'Role', 'Route', 'Readiness']} rows={[
          ['Emeka Okafor', 'Driver', 'Route B', 'Cleared'],
          ['Tosin Bankole', 'Copilot', 'Route A', 'Training due'],
          ['Nurse Halima', 'Nurse', 'Executive', 'Cleared'],
          ['Joseph Adebayo', 'Driver', 'Backup pool', 'Document review'],
        ]} />
        <ActionQueue rows={payload.workQueueRows} title="Crew Work Queue" />
      </>
    )
  }

  if (sectionKey.includes('schools')) {
    return (
      <>
        <ControlCentreStrip items={[['Schools onboarded', '18'], ['Launch pipeline', '11'], ['Routes requested', '46']]} />
        <DataTableCard title="School Account Register" subtitle="Client readiness, school contacts, and launch planning" headers={['School', 'Area', 'Launch stage', 'Next action']} rows={[
          ['Greenfield School', 'Lekki', 'Live', 'Monthly review'],
          ['Corona School', 'Ikoyi', 'Live', 'Add second bus'],
          ['Abuja Prep', 'Maitama', 'Pilot', 'Parent briefing'],
          ['Meadow Hall', 'Ajah', 'Discovery', 'Route survey'],
        ]} />
        <BarChartCard data={[22, 31, 44, 58, 63, 77, 88]} />
      </>
    )
  }

  if (sectionKey.includes('alerts') || sectionKey.includes('incidents') || sectionKey.includes('notifications') || sectionKey.includes('messages') || sectionKey.includes('comms')) {
    if (sectionKey.includes('notifications') || sectionKey.includes('messages') || sectionKey.includes('comms')) {
      return (
        <>
          <ControlCentreStrip items={[['Messages sent today', '1,284'], ['Delivery rate', '98%'], ['Failed retries', '9']]} />
          <DataTableCard title="Notification Command" subtitle="WhatsApp, SMS, and in-app journey communication history" headers={['Message type', 'Audience', 'Delivery state', 'Control']} rows={[
            ['Departure alert', 'Route B parents', 'Delivered', 'View template'],
            ['ETA update', 'Lekki corridor', 'Queued', 'Review'],
            ['No guardian protocol', 'Single family', 'Delivered', 'Escalated'],
            ['Weekly school digest', 'Greenfield admin', 'Scheduled', 'Edit'],
          ]} />
          <ActionQueue rows={[
            ['Retry failed WhatsApp messages', 'Comms system', 'Now', 'High'],
            ['Approve broadcast copy', 'School admin', 'Today', 'Medium'],
            ['Review no guardian escalation', 'Operations', 'Now', 'High'],
          ]} title="Messaging Action Queue" />
        </>
      )
    }

    if (sectionKey.includes('incidents')) {
      return (
        <>
          <ControlCentreStrip items={[['Open incidents', '7'], ['Formal reports', '3'], ['Parent notified', '100%']]} />
          <DataTableCard title="Incident Case Register" subtitle="Safeguarding incident records with notification and report status" headers={['Incident', 'School', 'Severity', 'Status']} rows={[
            ['No guardian at drop-off', 'Greenfield', 'High', 'Resolved'],
            ['Minor illness on route', 'Corona', 'Medium', 'Nurse note filed'],
            ['Route deviation review', 'Lekki British', 'Medium', 'Under review'],
            ['Late school handover', 'Abuja Prep', 'Low', 'Closed'],
          ]} />
          <ActionQueue rows={[
            ['Upload formal report PDF', 'Operations', 'Today', 'High'],
            ['Send safeguarding pack', 'Admin', 'Tomorrow', 'Medium'],
            ['Close resolved no guardian case', 'Support', 'Now', 'Medium'],
          ]} title="Incident Response Queue" />
        </>
      )
    }

    return (
      <>
        <ControlCentreStrip items={[['Messages sent today', '1,284'], ['Incidents open', '7'], ['Median response', '3m 12s']]} />
        <AlertsFeed rows={payload.alertRows} />
        <ActionQueue rows={payload.workQueueRows} title="Response Queue" />
      </>
    )
  }

  if (sectionKey.includes('profile') || sectionKey.includes('settings')) {
    return (
      <>
        <ControlCentreStrip items={[['Account status', 'Active'], ['Access role', role], ['Last review', '9 Aug 2026']]} />
        <DataTableCard title="Account Control Register" subtitle="Profile, permissions, notification preference, and operational access" headers={['Setting', 'Current value', 'Owner', 'Status']} rows={[
          ['Portal role', role, 'Admin', 'Active'],
          ['Notification channel', 'WhatsApp + email', 'User', 'Ready'],
          ['Emergency contact', 'Verified phone', 'Support', 'Confirmed'],
          ['Data access', 'Preview mode', 'Security', 'To gatekeep'],
        ]} />
        <ActionQueue rows={[
          ['Confirm production access policy', 'Security', 'Before launch', 'High'],
          ['Review notification preference', 'Support', 'This week', 'Medium'],
          ['Attach onboarding document', 'Operations', 'Next update', 'Low'],
        ]} title="Account Setup Queue" />
      </>
    )
  }

  if (sectionKey.includes('route') && !sectionKey.includes('route dashboard')) {
    return (
      <>
        <ControlCentreStrip items={[['Routes mapped', '58'], ['Optimisation queue', '6'], ['Review requests', '4']]} />
        <DataTableCard title="Route Planning Workspace" subtitle="Route design, stop sequencing, school requests, and optimisation status" headers={['Route', 'School / city', 'Assigned resources', 'Planning state']} rows={[
          ['Route B12', 'Greenfield / Lekki', 'TRZ-B012 + full crew', 'Live today'],
          ['Executive E4', 'Lekki British / Ikoyi', 'TRZ-E004 + nurse', 'ETA review'],
          ['Route C7', 'Abuja Prep / Maitama', 'Crew assigned', 'Test route'],
          ['Route A3', 'Corona / Ikoyi', 'TRZ-B018 + full crew', 'Optimised'],
        ]} />
        <ActionQueue rows={[
          ['Optimise Abuja stop order', 'Route planner', 'Today', 'High'],
          ['Approve school route review', 'Operations', 'Tomorrow', 'Medium'],
          ['Confirm max student load', 'School admin', 'Friday', 'Medium'],
        ]} title="Route Optimisation Queue" />
      </>
    )
  }

  if (sectionKey.includes('vehicles')) {
    return (
      <>
        <ControlCentreStrip items={[['Certified vehicles', '42'], ['GPS online', '41'], ['Inspection due', '4']]} />
        <DataTableCard title="Vehicle Registry" subtitle="Registration, GPS, owner type, inspection, and assignment state" headers={['Vehicle', 'Owner', 'GPS / NFC', 'Operational state']} rows={[
          ['TRZ-B012', 'Tranzita fleet', 'GPS live / NFC live', 'Assigned Route B12'],
          ['TRZ-E004', 'Partner executive', 'GPS live / NFC live', 'Assigned Executive E4'],
          ['TRZ-P018', 'Partner fleet', 'GPS live / NFC pending', 'Inspection due'],
          ['TRZ-B027', 'Tranzita fleet', 'GPS review / NFC live', 'Backup pool'],
        ]} />
        <ActionQueue rows={[
          ['Replace TRZ-P018 NFC reader', 'Fleet technician', 'Today', 'High'],
          ['Book inspection for TRZ-B027', 'Fleet admin', 'Tomorrow', 'Medium'],
          ['Confirm partner owner record', 'Operations', 'This week', 'Low'],
        ]} title="Vehicle Operations Queue" />
      </>
    )
  }

  if (sectionKey.includes('fleet') || sectionKey.includes('tracking')) {
    return (
      <>
        <ControlCentreStrip items={[['Routes live', '32'], ['Buses moving', '42'], ['Average ETA variance', '4 mins']]} />
        <FleetTable rows={payload.tableRows} />
        <div className="grid gap-5 xl:grid-cols-2">
          <BarChartCard data={payload.barData} />
          <PieChartCard data={payload.pieData} />
        </div>
      </>
    )
  }

  return (
    <>
      <KpiGrid kpis={payload.profile.kpis} />
      <div className="grid gap-5 xl:grid-cols-2">
        <BarChartCard data={payload.barData} />
        <PieChartCard data={payload.pieData} />
      </div>
      <FleetTable rows={payload.tableRows} />
      <AlertsFeed rows={payload.alertRows} />
    </>
  )
}
