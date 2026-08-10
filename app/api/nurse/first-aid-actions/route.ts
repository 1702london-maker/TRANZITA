import { logPortalAction, textValue } from '@/app/api/portal-action-utils'

export async function POST(request: Request) {
  return logPortalAction({
    request,
    allowedRoles: ['nurse', 'admin'],
    eventType: 'nurse_first_aid_action_logged',
    entityType: 'nurse_first_aid_action',
    subjectPrefix: 'First aid action',
    buildPayload: (body) => {
      const action = textValue(body, 'action', 'Kit check')
      const status = textValue(body, 'status', 'completed')
      const note = textValue(body, 'note', 'First aid readiness action logged.')
      return {
        subject: `${action} ${status}`,
        body: note,
        recipientScope: 'medical_operations',
        metadata: { action, status },
      }
    },
  })
}
