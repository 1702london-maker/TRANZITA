import { redirect } from 'next/navigation'

export default function CopilotPortalPage() {
  redirect('/auth/signin?role=codriver&next=/dashboard/codriver')
}
