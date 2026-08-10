import { Resend } from 'resend'
import { applicationReceivedCopy, roleLabels, type ApplicationStatus, type OnboardingRole } from '@/lib/onboarding'

const resendApiKey = process.env.RESEND_API_KEY
const resendFrom = process.env.RESEND_FROM_EMAIL || 'Tranzita <onboarding@tranzita.africa>'

export const isResendConfigured = Boolean(resendApiKey)

export function getApplicationReceivedEmail(input: {
  role: OnboardingRole
  fullName: string
  applicationId: string
}) {
  const copy = applicationReceivedCopy[input.role]
  const roleLabel = roleLabels[input.role]
  const html = `
    <div style="font-family:Arial,sans-serif;background:#FFF9F2;padding:32px;color:#183024">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #DDE9D2;border-radius:24px;padding:28px">
        <p style="margin:0 0 12px;color:#D96B1F;font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase">Tranzita ${roleLabel} Onboarding</p>
        <h1 style="margin:0 0 16px;font-size:28px;line-height:1.15">${copy.headline}</h1>
        <p style="font-size:15px;line-height:1.7;color:#65785F">Hello ${escapeHtml(input.fullName)},</p>
        <p style="font-size:15px;line-height:1.7;color:#65785F">${copy.body}</p>
        <div style="background:#F1F6EA;border-radius:18px;padding:18px;margin:22px 0">
          <p style="margin:0 0 10px;font-weight:800">What happens next</p>
          <ul style="margin:0;padding-left:20px;color:#65785F;line-height:1.7">
            ${copy.next.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
        <p style="font-size:13px;line-height:1.6;color:#65785F">Application reference: <strong>${input.applicationId}</strong></p>
        <p style="font-size:13px;line-height:1.6;color:#65785F">For support, email <a href="mailto:booking@tranzita.africa" style="color:#D96B1F;font-weight:700">booking@tranzita.africa</a>.</p>
      </div>
    </div>
  `

  return {
    from: resendFrom,
    subject: copy.subject,
    html,
  }
}

export async function sendApplicationReceivedEmail(input: {
  to: string
  role: OnboardingRole
  fullName: string
  applicationId: string
}) {
  if (!resendApiKey) {
    return { status: 'skipped', error: 'RESEND_API_KEY is not configured' }
  }

  const resend = new Resend(resendApiKey)
  const email = getApplicationReceivedEmail(input)
  const result = await resend.emails.send({
    from: email.from,
    to: [input.to],
    subject: email.subject,
    html: email.html,
  })

  if (result.error) {
    return { status: 'failed', error: result.error.message }
  }

  return { status: 'sent', id: result.data?.id }
}

export function getApplicationStatusEmail(input: {
  role: OnboardingRole
  fullName: string
  status: ApplicationStatus
  note?: string | null
  setupUrl?: string | null
}) {
  const roleLabel = roleLabels[input.role]
  const copy = statusCopy(input.status, roleLabel)
  const html = `
    <div style="font-family:Arial,sans-serif;background:#FFF9F2;padding:32px;color:#183024">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #DDE9D2;border-radius:24px;padding:28px">
        <p style="margin:0 0 12px;color:#D96B1F;font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase">Tranzita ${roleLabel} Onboarding</p>
        <h1 style="margin:0 0 16px;font-size:28px;line-height:1.15">${copy.headline}</h1>
        <p style="font-size:15px;line-height:1.7;color:#65785F">Hello ${escapeHtml(input.fullName)},</p>
        <p style="font-size:15px;line-height:1.7;color:#65785F">${copy.body}</p>
        ${input.note ? `<div style="background:#F1F6EA;border-radius:18px;padding:18px;margin:22px 0;color:#183024"><strong>Team note:</strong><br/>${escapeHtml(input.note)}</div>` : ''}
        ${input.setupUrl ? `<div style="margin:24px 0"><a href="${escapeHtml(input.setupUrl)}" style="display:inline-block;background:#D96B1F;color:#ffffff;text-decoration:none;border-radius:999px;padding:14px 22px;font-weight:800">Set up portal access</a></div><p style="font-size:13px;line-height:1.6;color:#65785F">This secure setup link is for your Tranzita account only. If your device is lost or stolen, contact Tranzita support so access can be suspended.</p>` : ''}
        <p style="font-size:13px;line-height:1.6;color:#65785F">For support, email <a href="mailto:booking@tranzita.africa" style="color:#D96B1F;font-weight:700">booking@tranzita.africa</a>.</p>
      </div>
    </div>
  `

  return {
    from: resendFrom,
    subject: copy.subject,
    html,
  }
}

export async function sendApplicationStatusEmail(input: {
  to: string
  role: OnboardingRole
  fullName: string
  status: ApplicationStatus
  note?: string | null
  setupUrl?: string | null
}) {
  if (!resendApiKey) {
    return { status: 'skipped', error: 'RESEND_API_KEY is not configured' }
  }

  const resend = new Resend(resendApiKey)
  const email = getApplicationStatusEmail(input)
  const result = await resend.emails.send({
    from: email.from,
    to: [input.to],
    subject: email.subject,
    html: email.html,
  })

  if (result.error) {
    return { status: 'failed', error: result.error.message }
  }

  return { status: 'sent', id: result.data?.id }
}

function statusCopy(status: ApplicationStatus, roleLabel: string) {
  const byStatus: Record<ApplicationStatus, { subject: string; headline: string; body: string }> = {
    submitted: {
      subject: `Your Tranzita ${roleLabel.toLowerCase()} application was received`,
      headline: 'Your application has been received.',
      body: 'Your application is safely in the Tranzita onboarding queue.',
    },
    under_review: {
      subject: `Your Tranzita ${roleLabel.toLowerCase()} application is under review`,
      headline: 'Your application is under review.',
      body: 'Our team is reviewing your details and will contact you if we need extra information.',
    },
    documents_requested: {
      subject: `Documents requested for your Tranzita ${roleLabel.toLowerCase()} application`,
      headline: 'We need a few more documents.',
      body: 'Please follow the instructions from the Tranzita team so we can continue your onboarding review.',
    },
    payment_required: {
      subject: `Payment required for your Tranzita ${roleLabel.toLowerCase()} onboarding`,
      headline: 'Your application is ready for payment confirmation.',
      body: 'Your onboarding can continue once the required setup or service payment has been confirmed.',
    },
    payment_confirmed: {
      subject: `Payment confirmed for your Tranzita ${roleLabel.toLowerCase()} onboarding`,
      headline: 'Payment has been confirmed.',
      body: 'Thank you. Our team will complete the final review and activate portal access when everything is ready.',
    },
    approved: {
      subject: `Your Tranzita ${roleLabel.toLowerCase()} application was approved`,
      headline: 'Your application has been approved.',
      body: 'Your application has passed review. Tranzita will now prepare your portal access and onboarding instructions.',
    },
    activated: {
      subject: `Welcome to Tranzita`,
      headline: 'Welcome to Tranzita.',
      body: 'Your portal access has been activated. Use the instructions from the Tranzita team to sign in, review your dashboard, and contact support if you need help.',
    },
    rejected: {
      subject: `Update on your Tranzita ${roleLabel.toLowerCase()} application`,
      headline: 'We cannot proceed with this application right now.',
      body: 'Thank you for applying. After review, Tranzita is unable to proceed with this application at this stage.',
    },
    suspended: {
      subject: `Your Tranzita portal access has been paused`,
      headline: 'Your access has been paused.',
      body: 'Your Tranzita access has been temporarily suspended. Please contact support if you believe this is an error.',
    },
  }

  return byStatus[status]
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
