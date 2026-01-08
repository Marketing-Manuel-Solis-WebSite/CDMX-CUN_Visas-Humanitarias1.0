import LandingHeader from '@/components/LandingHeader'
import InteractiveLandingForm from '@/components/InteractiveLandingForm'
import LandingFooter from '@/components/LandingFooter'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#001540]">
      <LandingHeader />
      <div className="h-20" /> {/* Espaciador para header fijo */}
      <InteractiveLandingForm />
      <LandingFooter />
    </main>
  )
}