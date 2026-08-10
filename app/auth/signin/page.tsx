import AuthCard from '@/components/auth/AuthCard'
import BottomPortalBar from '@/components/BottomPortalBar'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import StickyBar from '@/components/StickyBar'

export default function SignInPage() {
  return (
    <>
      <StickyBar />
      <Navbar />
      <main className="min-h-screen px-4 pt-40 pb-20" style={{ background: 'linear-gradient(120deg, #FFF0E4 0%, #FFF9F2 48%, #F1F6EA 100%)' }}>
        <AuthCard mode="signin" />
      </main>
      <Footer />
      <BottomPortalBar />
    </>
  )
}
