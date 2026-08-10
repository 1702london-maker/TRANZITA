import { redirect } from 'next/navigation'

export default function ParentPortalPage() {
  redirect('/auth/signin?role=parent&next=/dashboard/parent')
}
