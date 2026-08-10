'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Ban, CheckCircle2, CreditCard, FileWarning, LockKeyhole, Mail, RefreshCcw, Send, ShieldCheck } from 'lucide-react'
import DashboardShell from '@/components/dashboard/DashboardShell'
import { dashboardLinks } from '@/lib/dashboard-links'
import { roleLabels, type ApplicationStatus, type OnboardingRole } from '@/lib/onboarding'

type ApplicationRow = {
  id: string
  role: OnboardingRole
  status: ApplicationStatus
  full_name: string
  email: string
  phone?: string | null
  whatsapp?: string | null
  organisation_name?: string | null
  city?: string | null
  applicant_notes?: string | null
  vehicle_plate_numbers?: string[] | null
  created_at: string
  reviewed_at?: string | null
}

const orderedStatuses: ApplicationStatus[] = ['submitted', 'approved', 'payment_confirmed', 'activated']

export default function AdminOnboardingDesk() {
  const [applications, setApplications] = useState<ApplicationRow[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  async function loadApplications() {
    setLoading(true)
    setMessage('')
    const response = await fetch('/api/applications')
    const data = await response.json().catch(() => ({}))
    setLoading(false)
    if (!response.ok) {
      setMessage(data.error || 'Could not load applications.')
      return
    }
    setApplications(data.applications || [])
  }

  useEffect(() => {
    loadApplications()
  }, [])

  const counts = useMemo(() => {
    return orderedStatuses.map((status) => [statusLabel(status), applications.filter((item) => item.status === status).length] as [string, number])
  }, [applications])

  async function updateStatus(application: ApplicationRow, status: ApplicationStatus) {
    setBusyId(application.id)
    setMessage('')
    const response = await fetch(`/api/applications/${application.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        note: statusNote(status, application.role),
      }),
    })
    const data = await response.json().catch(() => ({}))
    setBusyId(null)
    if (!response.ok) {
      setMessage(data.error || 'Status could not be updated.')
      return
    }
    setMessage(`${application.email} moved to ${statusLabel(status)}. Email status: ${data.emailStatus}.`)
    await loadApplications()
  }

  async function resendEmail(application: ApplicationRow) {
    setBusyId(application.id)
    setMessage('')
    const response = await fetch(`/api/applications/${application.id}/resend-email`, { method: 'POST' })
    const data = await response.json().catch(() => ({}))
    setBusyId(null)
    if (!response.ok) {
      setMessage(data.error || 'Email could not be resent.')
      return
    }
    setMessage(`${application.email} status email resent. Email status: ${data.emailStatus}.`)
  }

  return (
    <DashboardShell role="Admin" title="Tranzita Operations Centre" links={dashboardLinks.admin}>
      <div className="space-y-5">
        <section className="rounded-[28px] bg-white p-6 shadow-sm" style={{ border: '1px solid #DDE9D2' }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#D96B1F' }}>Approval First</p>
              <h2 className="mt-2 text-3xl font-extrabold" style={{ color: '#183024' }}>Onboarding Review Desk</h2>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-relaxed" style={{ color: '#65785F' }}>
                Every party starts here. Approve the application first, then confirm payment where required, then activate portal access.
              </p>
            </div>
            <button onClick={loadApplications} className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold" style={{ background: '#FFF0E4', color: '#183024', border: '1px solid #F2C49B' }}>
              <RefreshCcw size={16} /> Refresh
            </button>
          </div>
        </section>

        <div className="grid gap-3 md:grid-cols-4">
          {counts.map(([label, count], index) => (
            <motion.div key={label} className="rounded-[24px] bg-white p-5 shadow-sm" style={{ border: '1px solid #DDE9D2' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
              <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: '#65785F' }}>{label}</p>
              <p className="mt-2 text-3xl font-extrabold" style={{ color: '#183024' }}>{count}</p>
            </motion.div>
          ))}
        </div>

        {message && <div className="rounded-2xl p-4 text-sm font-extrabold" style={{ background: '#FFF0E4', color: '#183024', border: '1px solid #F2C49B' }}>{message}</div>}

        <section className="rounded-[28px] bg-white p-5 shadow-sm" style={{ border: '1px solid #DDE9D2' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] text-left text-sm">
              <thead style={{ color: '#65785F' }}>
                <tr>
                  {['Applicant', 'Role', 'Status', 'Details', 'Approval Flow', 'Action'].map((header) => <th key={header} className="px-4 py-3 font-extrabold">{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td className="px-4 py-6 font-bold" colSpan={6} style={{ color: '#65785F' }}>Loading applications...</td></tr>
                ) : applications.length === 0 ? (
                  <tr><td className="px-4 py-6 font-bold" colSpan={6} style={{ color: '#65785F' }}>No applications yet.</td></tr>
                ) : applications.map((application) => (
                  <tr key={application.id} className="border-t align-top" style={{ borderColor: '#DDE9D2' }}>
                    <td className="px-4 py-4">
                      <p className="font-extrabold" style={{ color: '#183024' }}>{application.full_name}</p>
                      <p className="mt-1 text-xs font-bold" style={{ color: '#D96B1F' }}>{application.email}</p>
                    </td>
                    <td className="px-4 py-4 font-extrabold" style={{ color: '#183024' }}>{roleLabels[application.role]}</td>
                    <td className="px-4 py-4"><StatusPill status={application.status} /></td>
                    <td className="px-4 py-4">
                      <p className="font-bold" style={{ color: '#183024' }}>{application.organisation_name || application.city || 'Individual applicant'}</p>
                      <p className="mt-1 max-w-xs text-xs leading-relaxed" style={{ color: '#65785F' }}>{application.applicant_notes || 'No notes supplied.'}</p>
                      {application.role === 'partner' && application.vehicle_plate_numbers?.length ? <p className="mt-1 text-xs font-bold" style={{ color: '#D96B1F' }}>Plates: {application.vehicle_plate_numbers.join(', ')}</p> : null}
                    </td>
                    <td className="px-4 py-4">
                      <Flow status={application.status} />
                    </td>
                    <td className="px-4 py-4">
                      <ActionButtons application={application} busy={busyId === application.id} onUpdate={updateStatus} onResend={resendEmail} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}

function ActionButtons({
  application,
  busy,
  onUpdate,
  onResend,
}: {
  application: ApplicationRow
  busy: boolean
  onUpdate: (application: ApplicationRow, status: ApplicationStatus) => void
  onResend: (application: ApplicationRow) => void
}) {
  const approved = ['approved', 'payment_confirmed', 'activated'].includes(application.status)
  const paymentConfirmed = ['payment_confirmed', 'activated'].includes(application.status)
  const closed = ['rejected', 'suspended'].includes(application.status)

  return (
    <div className="flex flex-col gap-2">
      <button disabled={busy || approved || closed} onClick={() => onUpdate(application, 'documents_requested')} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold disabled:opacity-40" style={{ background: '#FFF0E4', color: '#183024', border: '1px solid #F2C49B' }}>
        <FileWarning size={14} /> Request Docs
      </button>
      <button disabled={busy || approved || closed} onClick={() => onUpdate(application, 'approved')} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold disabled:opacity-40" style={{ background: '#D96B1F', color: 'white' }}>
        <ShieldCheck size={14} /> Approve First
      </button>
      <button disabled={busy || !approved || paymentConfirmed || closed} onClick={() => onUpdate(application, 'payment_confirmed')} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold disabled:opacity-40" style={{ background: '#F1F6EA', color: '#183024', border: '1px solid #DDE9D2' }}>
        <CreditCard size={14} /> Confirm Payment
      </button>
      <button disabled={busy || !paymentConfirmed || application.status === 'activated' || closed} onClick={() => onUpdate(application, 'activated')} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold disabled:opacity-40" style={{ background: '#183024', color: 'white' }}>
        <LockKeyhole size={14} /> Activate Access
      </button>
      <button disabled={busy || closed || application.status === 'activated'} onClick={() => onUpdate(application, 'rejected')} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold disabled:opacity-40" style={{ background: '#FFF9F2', color: '#D96B1F', border: '1px solid #F2C49B' }}>
        <Ban size={14} /> Reject
      </button>
      <button disabled={busy || application.status !== 'activated'} onClick={() => onUpdate(application, 'suspended')} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold disabled:opacity-40" style={{ background: '#FFF9F2', color: '#183024', border: '1px solid #DDE9D2' }}>
        <Ban size={14} /> Suspend
      </button>
      <button disabled={busy} onClick={() => onResend(application)} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-xs font-extrabold disabled:opacity-40" style={{ background: '#F1F6EA', color: '#183024', border: '1px solid #DDE9D2' }}>
        <Send size={14} /> Resend Email
      </button>
    </div>
  )
}

function Flow({ status }: { status: ApplicationStatus }) {
  return (
    <div className="flex flex-wrap gap-2">
      {orderedStatuses.map((item) => {
        const reached = orderedStatuses.indexOf(status) >= orderedStatuses.indexOf(item)
        return (
          <span key={item} className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold" style={{ background: reached ? '#F1F6EA' : '#FFF9F2', color: reached ? '#183024' : '#65785F', border: '1px solid #DDE9D2' }}>
            {reached ? <CheckCircle2 size={12} color="#D96B1F" /> : <Mail size={12} />} {statusLabel(item)}
          </span>
        )
      })}
    </div>
  )
}

function StatusPill({ status }: { status: ApplicationStatus }) {
  return (
    <span className="rounded-full px-3 py-1.5 text-xs font-extrabold" style={{ background: status === 'submitted' ? '#FFF0E4' : '#F1F6EA', color: '#183024' }}>
      {statusLabel(status)}
    </span>
  )
}

function statusLabel(status: ApplicationStatus) {
  return status.replaceAll('_', ' ')
}

function statusNote(status: ApplicationStatus, role: OnboardingRole) {
  if (status === 'approved') return `Your ${roleLabels[role].toLowerCase()} application has been approved. Payment confirmation and activation are the next steps.`
  if (status === 'payment_confirmed') return 'Payment has been confirmed. Tranzita will now prepare portal access.'
  if (status === 'activated') return 'Portal access has been activated. Follow the welcome instructions to enter the correct dashboard.'
  if (status === 'documents_requested') return 'We need additional documents before this application can continue.'
  if (status === 'rejected') return 'After review, Tranzita cannot proceed with this application at this stage.'
  if (status === 'suspended') return 'Portal access has been paused by the Tranzita team.'
  return null
}
