import DashboardShell from '@/components/dashboard/DashboardShell'
import { dashboardLinks } from '@/lib/dashboard-links'

export default function AdminPage() {
  return <DashboardShell role="Admin" title="Tranzita Operations Centre" links={dashboardLinks.admin} />
}
