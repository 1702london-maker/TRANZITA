import { redirect } from 'next/navigation'

export default function DriverPortalPage() {
  redirect('/auth/signin?role=driver&next=/dashboard/driver')
}
