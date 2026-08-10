import { redirect } from 'next/navigation'

export default function NursePortalPage() {
  redirect('/auth/signin?role=nurse&next=/dashboard/nurse')
}
