import { logPortalAction, textValue } from '@/lib/portal-action-utils'

export async function POST(request: Request) {
  return logPortalAction({
    request,
    allowedRoles: ['nurse', 'admin'],
    eventType: 'nurse_welfare_note_logged',
    entityType: 'nurse_welfare_note',
    subjectPrefix: 'Welfare note',
    buildPayload: (body) => {
      const child = textValue(body, 'child', 'Selected child')
      const severity = textValue(body, 'severity', 'Observation')
      const observation = textValue(body, 'observation', 'Welfare observation logged.')
      const notifySchool = Boolean(body.notifySchool)
      const notifyParent = Boolean(body.notifyParent)
      return {
        subject: `${severity} for ${child}`,
        body: observation,
        recipientScope: notifyParent ? 'operations_parent_notify' : notifySchool ? 'school_safeguarding' : 'nurse_record',
        metadata: { child, severity, notifySchool, notifyParent },
      }
    },
  })
}
