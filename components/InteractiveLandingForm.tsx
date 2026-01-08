'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Phone, Mail, CheckCircle2, ShieldCheck, Zap, XCircle,
  MapPin, FileText, Car, Scale, Users, Heart, ArrowRight, Sparkles, Check
} from 'lucide-react'

const API_URL = '/api/landing-contact'

type Step = 'form' | 'location' | 'caseType' | 'submitting' | 'success' | 'error' | 'disqualified'

interface FormData {
  first_name: string
  last_name: string
  phone: string
  email: string
  inUSA: boolean | null
  caseType: string
  acceptedTerms: boolean
  marketingConsent: boolean
}

const caseOptions = [
  { id: 'immigration', icon: FileText, title: 'Arreglar estatus migratorio', subtitle: 'Residencia / Visa / Green Card', gradient: 'from-blue-600 to-cyan-500' },
  { id: 'accident', icon: Car, title: 'Accidente de auto o trabajo', subtitle: 'Compensación por lesiones', gradient: 'from-orange-500 to-amber-400' },
  { id: 'criminal', icon: Scale, title: 'Caso criminal o corte', subtitle: 'Defensa legal profesional', gradient: 'from-red-500 to-rose-400' },
  { id: 'family', icon: Users, title: 'Peticiones familiares', subtitle: 'Reunificación familiar', gradient: 'from-emerald-500 to-green-400' },
  { id: 'vawa', icon: Heart, title: 'Visa U / VAWA', subtitle: 'Violencia doméstica / Protección', gradient: 'from-purple-500 to-violet-400' }
]

const NeonInput = ({ icon: Icon, name, type = "text", placeholder, value, onChange, required = false }: {
  icon: React.ElementType; name: string; type?: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-colors duration-200 ${isFocused ? 'text-[#B2904D]' : 'text-slate-500'}`}>
        <Icon size={18} />
      </div>
      <input
        type={type} name={name} value={value} onChange={onChange}
        onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
        required={required} placeholder={placeholder}
        className={`w-full bg-[#000510]/70 border rounded-xl py-3.5 pl-12 pr-4 text-white font-medium placeholder-slate-500 focus:outline-none transition-all duration-200
          ${isFocused ? 'border-[#B2904D]/60 bg-[#000510] shadow-[0_0_20px_rgba(178,144,77,0.15)]' : 'border-white/10 hover:border-white/20'}`}
      />
      <motion.div 
        className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0, opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

const trackConversionEvents = () => {
  if (typeof window !== 'undefined') {
    try {
      if ((window as any).fbq) (window as any).fbq('track', 'Lead')
      if ((window as any).ttq) (window as any).ttq.track('CompleteRegistration')
      if ((window as any).gtag) (window as any).gtag('event', 'generate_lead', { 'event_category': 'Contact', 'event_label': 'Landing_Form_Submission' })
    } catch (e) { console.error("Tracking Error", e) }
  }
}

function InteractiveLandingFormContent() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>('form')
  const [formData, setFormData] = useState<FormData>({
    first_name: '', last_name: '', phone: '', email: '',
    inUSA: null, caseType: '', acceptedTerms: false, marketingConsent: false
  })
  const [selectedCase, setSelectedCase] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const validateStep1 = () => formData.first_name && formData.last_name && formData.phone && formData.email && formData.acceptedTerms

  const handleNextStep = () => { if (validateStep1()) setStep('location') }

  const handleLocationResponse = (inUSA: boolean) => {
    setFormData(prev => ({ ...prev, inUSA }))
    setStep(inUSA ? 'caseType' : 'disqualified')
  }

  const handleCaseSelect = (caseId: string) => {
    setSelectedCase(caseId)
    setFormData(prev => ({ ...prev, caseType: caseId }))
  }

  const handleSubmit = async () => {
    if (!selectedCase) return
    setStep('submitting')

    const utmData = {
      utm_source: searchParams.get('utm_source') || 'SITIO WEB',
      utm_medium: searchParams.get('utm_medium') || 'Organico',
      utm_campaign: searchParams.get('utm_campaign') || 'Directo',
      utm_content: searchParams.get('utm_content') || '',
      utm_term: searchParams.get('utm_term') || ''
    }

    let uriToSend = typeof window !== 'undefined' 
      ? (searchParams.toString().length > 0 ? window.location.href : `${window.location.origin}${window.location.pathname}?utm_source=SITIO WEB&utm_medium=Organico&utm_campaign=Directo`)
      : ''

    try {
      const payload = { ...formData, ...utmData, uri: uriToSend, caseType: caseOptions.find(c => c.id === selectedCase)?.title || selectedCase }
      const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (response.ok) { trackConversionEvents(); setStep('success') } else { setStep('error') }
    } catch (error) { console.error('Submit error:', error); setStep('error') }
  }

  // ========== PASO 1: FORMULARIO ==========
  const FormStep = () => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-5">
      <div className="text-center mb-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/20 mb-3">
          <Sparkles size={14} className="text-[#B2904D]" />
          <span className="text-[#B2904D] text-xs font-medium">Consulta Gratuita</span>
        </motion.div>
        <h2 className="text-xl md:text-2xl font-light text-white mb-1">Comience su <span className="font-semibold text-[#B2904D]">Evaluación</span></h2>
        <p className="text-blue-100/60 text-xs">Complete sus datos para continuar</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <NeonInput icon={User} name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} required />
        <NeonInput icon={User} name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <NeonInput icon={Phone} name="phone" type="tel" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
        <NeonInput icon={Mail} name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2 pt-2">
        <label className="flex items-start gap-3 p-3 rounded-xl bg-[#000814]/50 border border-white/10 cursor-pointer hover:border-white/20 transition-colors">
          <div className="relative flex-shrink-0 mt-0.5">
            <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} className="peer sr-only" />
            <div className="w-5 h-5 rounded border-2 border-slate-500 peer-checked:border-[#B2904D] peer-checked:bg-[#B2904D] transition-all flex items-center justify-center">
              {formData.acceptedTerms && <Check size={12} className="text-[#001026]" strokeWidth={3} />}
            </div>
          </div>
          <span className="text-[11px] text-blue-100/80 leading-relaxed">
            Acepto los <a href="/sms-terminos" className="text-[#B2904D] hover:underline">Términos de Servicio</a> y la <a href="/privacidad" className="text-[#B2904D] hover:underline">Política de Privacidad</a>.
          </span>
        </label>

        <label className="flex items-start gap-3 p-2.5 rounded-lg bg-[#000814]/30 border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
          <div className="relative flex-shrink-0 mt-0.5">
            <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} className="peer sr-only" />
            <div className="w-4 h-4 rounded border border-slate-600 peer-checked:border-[#B2904D] peer-checked:bg-[#B2904D] transition-all flex items-center justify-center">
              {formData.marketingConsent && <Check size={10} className="text-[#001026]" strokeWidth={3} />}
            </div>
          </div>
          <span className="text-[10px] text-blue-200/50 leading-relaxed">Deseo recibir actualizaciones del Law Office of Manuel Solís.</span>
        </label>
      </div>

      <motion.button onClick={handleNextStep} disabled={!validateStep1()} whileHover={validateStep1() ? { scale: 1.02 } : {}} whileTap={validateStep1() ? { scale: 0.98 } : {}}
        className={`group relative w-full h-12 rounded-xl font-bold tracking-wider uppercase text-sm transition-all duration-200 overflow-hidden
          ${!validateStep1() ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed' : 'bg-[#B2904D] text-[#001026] cursor-pointer shadow-lg shadow-[#B2904D]/25'}`}>
        <span className="relative z-10 flex items-center justify-center gap-2">Siguiente <ArrowRight size={16} /></span>
        {validateStep1() && <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />}
      </motion.button>
    </motion.div>
  )

  // ========== PASO 2: UBICACIÓN ==========
  const LocationStep = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
        <MapPin size={40} className="text-blue-400" />
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-2xl md:text-4xl font-light text-white mb-4">
        ¿Se encuentra actualmente en <span className="font-semibold text-[#B2904D]">Estados Unidos</span>?
      </motion.h2>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-blue-100/50 mb-10 text-sm">
        Esta información nos ayuda a determinar cómo asistirle
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <motion.button onClick={() => handleLocationResponse(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex-1 py-5 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold text-xl shadow-lg shadow-green-500/30">SÍ</motion.button>
        <motion.button onClick={() => handleLocationResponse(false)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex-1 py-5 px-8 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold text-xl shadow-lg shadow-red-500/30">NO</motion.button>
      </motion.div>
    </motion.div>
  )

  // ========== PASO 3: TIPO DE CASO ==========
  const CaseTypeStep = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center px-4 py-8">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-light text-white mb-2 text-center">
        ¿Cuál describe mejor su <span className="font-semibold text-[#B2904D]">caso</span>?
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-blue-100/50 mb-8 text-sm text-center">Seleccione una opción</motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
        {caseOptions.map((option, index) => {
          const isSelected = selectedCase === option.id
          const IconComponent = option.icon
          return (
            <motion.button key={option.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.03, y: -5 }} whileTap={{ scale: 0.97 }} onClick={() => handleCaseSelect(option.id)}
              className={`group relative p-5 rounded-2xl text-left transition-all duration-300 overflow-hidden bg-[#000814]/80 backdrop-blur-sm border
                ${isSelected ? 'ring-2 ring-[#B2904D]/50 border-[#B2904D]/50 shadow-xl shadow-[#B2904D]/20' : 'border-white/10 hover:border-white/20'}`}>
              
              <div className="relative z-10 flex items-start gap-4">
                <motion.div animate={isSelected ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-lg`}>
                  <IconComponent size={24} className="text-white" />
                </motion.div>

                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="text-white font-semibold text-base leading-tight mb-1">{option.title}</h3>
                  <p className="text-blue-100/50 text-xs">{option.subtitle}</p>
                </div>

                <motion.div animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected ? 'bg-[#B2904D] border-[#B2904D]' : 'border-white/20'}`}>
                  {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Check size={14} className="text-[#001026]" strokeWidth={3} />
                  </motion.div>}
                </motion.div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedCase && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSubmit}
            className="group relative px-12 py-4 rounded-xl bg-gradient-to-r from-[#B2904D] to-[#D4AF61] text-[#001026] font-bold tracking-wider uppercase text-sm shadow-lg shadow-[#B2904D]/30 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-3"><ShieldCheck size={20} /> Enviar Solicitud</span>
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )

  // ========== OTROS PASOS ==========
  const DisqualifiedStep = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center mb-8">
        <MapPin size={40} className="text-amber-400" />
      </motion.div>
      <h2 className="text-2xl md:text-3xl font-light text-white mb-4">Gracias por su <span className="font-semibold text-[#B2904D]">Interés</span></h2>
      <p className="text-blue-100/60 max-w-md text-sm leading-relaxed">Por el momento nuestros servicios están limitados a residentes en Estados Unidos.</p>
    </motion.div>
  )

  const SubmittingStep = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <motion.div className="w-20 h-20 rounded-full border-4 border-[#B2904D]/30 border-t-[#B2904D] mb-8" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <h3 className="text-xl font-light text-white">Procesando solicitud...</h3>
    </motion.div>
  )

  const SuccessStep = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
        <CheckCircle2 size={48} className="text-green-400" />
      </motion.div>
      <h2 className="text-3xl md:text-4xl font-light text-white mb-4">¡Enviado con <span className="font-semibold text-[#B2904D]">Éxito</span>!</h2>
      <p className="text-blue-100/60 max-w-md text-sm leading-relaxed">Nuestro equipo revisará su caso. Un especialista le contactará en las próximas 24 horas.</p>
    </motion.div>
  )

  const ErrorStep = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-400/30 flex items-center justify-center mb-8">
        <XCircle size={48} className="text-red-400" />
      </motion.div>
      <h2 className="text-2xl font-light text-white mb-4">Error de <span className="font-semibold text-red-400">Envío</span></h2>
      <p className="text-blue-100/60 max-w-md text-sm mb-8">Hubo un problema. Por favor intente de nuevo.</p>
      <motion.button onClick={() => setStep('form')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="px-8 py-3 rounded-xl border border-white/20 text-white font-medium hover:border-white/40 hover:bg-white/5 transition-all">Intentar de Nuevo</motion.button>
    </motion.div>
  )

  // ========== RENDER PRINCIPAL ==========
  const isFullScreen = step !== 'form'

  return (
    <section id="form-section" className="relative py-16 md:py-24 overflow-hidden bg-[#001540] min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#B2904D] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Título solo en paso 1 */}
        <AnimatePresence>
          {step === 'form' && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-tight">Solicite su <span className="font-semibold text-[#B2904D]">Consulta</span></h1>
              <p className="text-lg text-blue-100/70 max-w-xl mx-auto font-light">Evaluación gratuita y confidencial de su caso</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenedor */}
        <div className={`relative mx-auto ${isFullScreen ? 'max-w-4xl' : 'max-w-xl'}`}>
          <motion.div layout className={`relative overflow-hidden rounded-3xl ${isFullScreen ? 'bg-[#001540]' : 'bg-[#001026]/95 backdrop-blur-xl border border-white/10 shadow-2xl'}`}>
            {!isFullScreen && <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />}
            <div className={`relative z-10 ${isFullScreen ? '' : 'p-6 md:p-8'}`}>
              <AnimatePresence mode="wait">
                {step === 'form' && <FormStep key="form" />}
                {step === 'location' && <LocationStep key="location" />}
                {step === 'caseType' && <CaseTypeStep key="caseType" />}
                {step === 'disqualified' && <DisqualifiedStep key="disqualified" />}
                {step === 'submitting' && <SubmittingStep key="submitting" />}
                {step === 'success' && <SuccessStep key="success" />}
                {step === 'error' && <ErrorStep key="error" />}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function InteractiveLandingForm() {
  return (
    <Suspense fallback={<div className="py-24 w-full bg-[#001540] flex justify-center items-center"><Zap className="animate-spin text-[#B2904D]" size={32} /></div>}>
      <InteractiveLandingFormContent />
    </Suspense>
  )
}