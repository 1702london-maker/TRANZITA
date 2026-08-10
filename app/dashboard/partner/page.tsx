import DashboardShell from '@/components/dashboard/DashboardShell'
import PartnerPortal from '@/components/portals/partner/PartnerPortal'
import { dashboardLinks } from '@/lib/dashboard-links'

export default function PartnerDashboardPage() {
  return (
    <DashboardShell role="Partner" title="Partner Vehicle Dashboard" links={dashboardLinks.partner}>
      <PartnerPortal view="overview" />
    </DashboardShell>
  )
}
