import DashboardShell from '@/components/dashboard/DashboardShell'
import DashboardSectionRuntime from '@/components/dashboard/DashboardSectionRuntime'
import { type DashboardRole } from '@/lib/dashboard-data'
import { dashboardLinks } from '@/lib/dashboard-links'

const linkKey: Record<DashboardRole, keyof typeof dashboardLinks> = {
  Admin: 'admin',
  School: 'school',
  Parent: 'parent',
  Driver: 'driver',
  Copilot: 'codriver',
  Nurse: 'nurse',
  Partner: 'partner',
}

export default function DashboardSectionPage({ role, title, section }: { role: DashboardRole; title: string; section: string }) {
  return (
    <DashboardShell role={role} title={title} links={dashboardLinks[linkKey[role]]}>
      <div className="space-y-5">
        <div className="rounded-[28px] bg-white p-6 shadow-sm" style={{ border: '1px solid #DDE9D2' }}>
          <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>{section}</p>
          <h2 className="mt-2 text-3xl font-extrabold" style={{ color: '#183024' }}>{section} Data Centre</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: '#65785F' }}>
            Live-ready figures, exception queues, register tables, and route intelligence for this area of the Tranzita operation.
          </p>
        </div>
        <DashboardSectionRuntime role={role} section={section} />
      </div>
    </DashboardShell>
  )
}
