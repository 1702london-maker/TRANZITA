import { redirect } from 'next/navigation'

export default function SchoolPortalPage() {
  redirect('/auth/signin?role=school&next=/dashboard/school')
}
