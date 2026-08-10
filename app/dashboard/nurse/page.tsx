import DashboardShell from '@/components/dashboard/DashboardShell'
import NursePortal from '@/components/portals/nurse/NursePortal'
import { dashboardLinks } from '@/lib/dashboard-links'

export default function NurseDashboardPage() {
  return (
    <DashboardShell role="Nurse" title="Nurse Welfare Dashboard" links={dashboardLinks.nurse}>
      <NursePortal view="today" />
    </DashboardShell>
  )
}
