'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// Eliminamos import Image from 'next/image' para evitar conflictos en este entorno
import { 
  User, Phone, Mail, ShieldCheck,
  MapPin, Heart, ArrowRight, Sparkles, Check,
  PhoneIncoming, ExternalLink, Star, Gavel, Lock, Baby, CheckCircle2,
  XCircle
} from 'lucide-react'

// --- CONSTANTES Y CONFIGURACIÓN ---
const API_URL = '/api/landing-contact'

// Definimos los pasos del flujo
type Step = 'form' | 'location' | 'questionnaire' | 'submitting' | 'success' | 'error' | 'disqualified'

// CAMBIO: Todo a snake_case en la interfaz
interface FormData {
  first_name: string
  last_name: string
  phone: string
  email: string
  in_usa: boolean | null        // Antes: inUSA
  specific_situation: string    // Antes: specificSituation
  accepted_terms: boolean       // Antes: acceptedTerms
  marketing_consent: boolean    // Antes: marketingConsent
}

// NUEVAS OPCIONES EXACTAS
const situationOptions = [
  { id: 'crime_victim', icon: ShieldCheck, text: 'Fui víctima de un delito en Estados Unidos' },
  { id: 'forced_labor', icon: Lock, text: 'Fui obligado(a) a trabajar o hacer algo contra mi voluntad' },
  { id: 'domestic_abuse', icon: Heart, text: 'Sufrí abuso por parte de mi esposo(a), padre/madre o hijo(a) CIUDADANO O RESIDENTE en EE.UU.' },
  { id: 'minor_abuse', icon: Baby, text: 'Soy menor de 21 años y no puedo vivir con uno o ambos padres por abandono/abuso/negligencia' },
  { id: 'legal_options', icon: Gavel, text: 'Me gustaría conocer mis opciones legales' }
]

// --- COMPONENTES UI (DEFINIDOS AFUERA PARA EVITAR PARPADEO) ---

const NeonInput = ({ 
  icon: Icon, name, type = "text", placeholder, value, onChange, required = false 
}: {
  icon: React.ElementType; name: string; type?: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <div className="relative group w-full">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-colors duration-200 ${isFocused ? 'text-[#B2904D]' : 'text-slate-500'}`}>
        <Icon size={18} />
      </div>
      <input
        type={type} name={name} value={value} onChange={onChange}
        onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
        required={required} placeholder={placeholder}
        className={`w-full bg-[#000510]/60 border rounded-xl py-4 pl-12 pr-4 text-white font-medium placeholder-slate-500 focus:outline-none transition-all duration-200
          ${isFocused ? 'border-[#B2904D]/60 bg-[#000510] shadow-[0_0_15px_rgba(178,144,77,0.1)]' : 'border-white/10 hover:border-white/20'}`}
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

// --- PASOS DEL FORMULARIO (DEFINIDOS AFUERA) ---

const FormStep = ({ formData, handleChange, handleNextStep, validateStep1 }: any) => (
  <motion.div 
    key="form-step"
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }} 
    transition={{ duration: 0.3 }}
    className="space-y-5 w-full max-w-lg mx-auto"
  >
    <div className="text-center mb-6">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/20 mb-3">
        <Sparkles size={14} className="text-[#B2904D]" />
        <span className="text-[#B2904D] text-xs font-bold tracking-wider uppercase">Evaluación Gratuita</span>
      </motion.div>
      <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
        Arregle sin salir
      </h2>
      <p className="text-blue-100/60 text-sm">Llena el formulario para mas información</p>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <NeonInput icon={User} name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} required />
      <NeonInput icon={User} name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleChange} required />
    </div>

    <div className="space-y-3">
      <NeonInput icon={Phone} name="phone" type="tel" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
      <NeonInput icon={Mail} name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
    </div>

    <div className="space-y-3 pt-2">
      <label className="flex items-start gap-3 p-3 rounded-xl bg-[#000814]/30 border border-white/5 cursor-pointer hover:bg-[#000814]/50 transition-colors group">
        <div className="relative flex-shrink-0 mt-0.5">
          {/* CAMBIO: name="accepted_terms" y checked={formData.accepted_terms} */}
          <input type="checkbox" name="accepted_terms" checked={formData.accepted_terms} onChange={handleChange} className="peer sr-only" />
          <div className="w-5 h-5 rounded border-2 border-slate-600 peer-checked:border-[#B2904D] peer-checked:bg-[#B2904D] transition-all flex items-center justify-center group-hover:border-slate-500">
            {formData.accepted_terms && <Check size={12} className="text-[#001026]" strokeWidth={3} />}
          </div>
        </div>
        <span className="text-xs md:text-sm text-blue-100/70 leading-relaxed group-hover:text-blue-100/90 transition-colors">
          Acepto los <a href="/sms-terminos" className="text-[#B2904D] hover:underline" onClick={(e) => e.stopPropagation()}>Términos de Servicio</a> y la <a href="/privacidad" className="text-[#B2904D] hover:underline" onClick={(e) => e.stopPropagation()}>Política de Privacidad</a>.
        </span>
      </label>

      <label className="flex items-start gap-3 p-2 px-3 rounded-lg cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
        <div className="relative flex-shrink-0 mt-0.5">
          {/* CAMBIO: name="marketing_consent" y checked={formData.marketing_consent} */}
          <input type="checkbox" name="marketing_consent" checked={formData.marketing_consent} onChange={handleChange} className="peer sr-only" />
          <div className="w-4 h-4 rounded border border-slate-700 peer-checked:border-[#B2904D] peer-checked:bg-[#B2904D] transition-all flex items-center justify-center">
            {formData.marketing_consent && <Check size={10} className="text-[#001026]" strokeWidth={3} />}
          </div>
        </div>
        <span className="text-xs md:text-sm text-blue-200/70 leading-relaxed">Deseo recibir actualizaciones del Law Office of Manuel Solís.</span>
      </label>
    </div>

    <motion.button onClick={handleNextStep} disabled={!validateStep1()} whileHover={validateStep1() ? { scale: 1.02 } : {}} whileTap={validateStep1() ? { scale: 0.98 } : {}}
      className={`group relative w-full h-14 rounded-xl font-bold tracking-wider uppercase text-sm transition-all duration-300 overflow-hidden shadow-lg
        ${!validateStep1() ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-white/5' : 'bg-[#B2904D] text-[#001026] cursor-pointer shadow-[#B2904D]/20 hover:shadow-[#B2904D]/40'}`}>
      <span className="relative z-10 flex items-center justify-center gap-2">Siguiente <ArrowRight size={18} /></span>
      {validateStep1() && <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />}
    </motion.button>
  </motion.div>
)

const LocationStep = ({ handleLocationResponse }: any) => (
  <motion.div 
    key="location-step"
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 1.05 }} 
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center py-4 px-4 w-full max-w-lg mx-auto"
  >
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
      <div className="relative w-20 h-20 rounded-full bg-[#000a20] border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
        <MapPin size={32} className="text-blue-400" />
      </div>
    </div>

    <h2 className="text-2xl md:text-3xl font-light text-white mb-3 text-center leading-tight">
      ¿Se encuentra actualmente en <br/><span className="font-semibold text-[#B2904D]">Estados Unidos</span>?
    </h2>

    <p className="text-blue-100/50 mb-8 text-sm text-center font-light tracking-wide">
      Necesitamos confirmar su ubicación para evaluar su caso
    </p>

    <div className="flex flex-col w-full gap-4">
      <motion.button onClick={() => handleLocationResponse(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 border border-emerald-500/30 text-white font-bold text-lg shadow-lg shadow-emerald-900/50 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">
        <CheckCircle2 size={20} /> SÍ
      </motion.button>
      <motion.button onClick={() => handleLocationResponse(false)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full py-4 px-6 rounded-xl bg-[#000814]/60 border border-white/10 text-white/80 font-medium text-lg hover:bg-white/5 transition-all">
        NO
      </motion.button>
    </div>
  </motion.div>
)

const QuestionnaireStep = ({ formData, handleSituationSelect, handleSubmit }: any) => (
  <motion.div 
    key="questionnaire-step"
    initial={{ opacity: 0, y: 30 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -30 }} 
    transition={{ duration: 0.4 }}
    className="flex flex-col w-full h-full max-w-xl mx-auto"
  >
    <div className="text-center mb-6">
      <h2 className="text-xl md:text-2xl font-light text-white mb-2">
        ¿Cuál describe mejor <span className="text-[#B2904D] font-medium">su situación</span>?
      </h2>
      <p className="text-blue-100/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Seleccione una opción para continuar</p>
    </div>

    <div className="flex-1 space-y-3 mb-6 overflow-y-auto max-h-[60vh] pr-1 custom-scrollbar">
      {situationOptions.map((option, idx) => {
        // CAMBIO: specific_situation
        const isSelected = formData.specific_situation === option.id
        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => handleSituationSelect(option.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 relative group flex items-start gap-4
              ${isSelected 
                ? 'bg-[#B2904D] border-[#B2904D] shadow-lg shadow-[#B2904D]/20 transform scale-[1.01]' 
                : 'bg-[#000814]/60 border-white/5 hover:border-[#B2904D]/30 hover:bg-[#000a1a]'
              }`}
          >
            <div className={`mt-0.5 p-2 rounded-lg shrink-0 transition-colors duration-300 ${isSelected ? 'bg-black/20 text-[#001026]' : 'bg-white/5 text-[#B2904D]'}`}>
              <option.icon size={22} />
            </div>
            
            <div className="flex-1">
              <p className={`text-base md:text-lg leading-snug transition-colors duration-300 ${isSelected ? 'text-[#001026] font-bold' : 'text-blue-100/90 font-medium'}`}>
                {option.text}
              </p>
            </div>

            <div className={`mt-0.5 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300
              ${isSelected ? 'border-[#001026] bg-[#001026]' : 'border-white/20'}`}>
              {isSelected && <Check size={14} className="text-[#B2904D]" strokeWidth={3} />}
            </div>
          </motion.button>
        )
      })}
    </div>

    <motion.button 
      onClick={handleSubmit} 
      // CAMBIO: specific_situation
      disabled={!formData.specific_situation}
      whileHover={formData.specific_situation ? { scale: 1.02 } : {}}
      whileTap={formData.specific_situation ? { scale: 0.98 } : {}}
      className={`w-full py-4 rounded-xl font-bold tracking-wider uppercase text-sm shadow-lg transition-all duration-300
        ${formData.specific_situation 
          ? 'bg-gradient-to-r from-[#B2904D] to-[#D4AF61] text-[#001026] shadow-[#B2904D]/20 cursor-pointer' 
          : 'bg-slate-800/30 text-slate-600 border border-white/5 cursor-not-allowed'}`}
    >
      Enviar Respuestas
    </motion.button>
  </motion.div>
)

// --- ANIMACIÓN DE ENTRADA (NUEVO) ---
const SuccessAnimation = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    // Espera a que termine la animación (aprox 2.5s) para mostrar el contenido
    const timer = setTimeout(onComplete, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Fondo verde que se contrae */}
      <motion.div
        initial={{ width: '150vw', height: '150vh', borderRadius: 0 }}
        animate={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          transition: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }}
        exit={{ scale: 0, opacity: 0 }}
        className="bg-emerald-500 flex items-center justify-center shadow-2xl relative"
      >
        {/* Checkmark que aparece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 1.2, duration: 0.4, type: "spring" } }}
        >
          <CheckCircle2 size={48} className="text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </div>
  )
}

// --- PASO DE ÉXITO (MODIFICADO) ---
const SuccessStep = () => {
  const [showContent, setShowContent] = useState(false)

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence>
        {!showContent && (
          <SuccessAnimation onComplete={() => setShowContent(true)} />
        )}
      </AnimatePresence>

      {showContent && (
        <motion.div 
          key="success-step-content"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center px-4 py-2 w-full max-w-2xl mx-auto h-full"
        >
          <div className="relative w-full mb-8 group mt-2">
            <div className="absolute inset-0 bg-[#B2904D]/10 blur-[60px] rounded-full pointer-events-none opacity-50" />
            
            <div className="relative bg-[#000510]/40 border border-[#B2904D]/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] animate-[shimmer_4s_infinite]" />

                <motion.div 
                    animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, -3, 3, -3, 0]
                    }}
                    transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                    className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#B2904D] to-[#F5D78E] flex items-center justify-center mb-6 shadow-xl shadow-[#B2904D]/30 relative z-10 border-4 border-[#001026]"
                >
                    <PhoneIncoming size={36} className="text-[#001026]" />
                </motion.div>

                <h2 className="text-xl md:text-3xl font-light text-white mb-2 relative z-10">
                    EN BREVE RECIBIRÁS UNA LLAMADA
                </h2>
                <p className="text-blue-100/60 text-xs md:text-sm mb-6 uppercase tracking-widest relative z-10 font-medium">Por favor contesta al número que empiece con:</p>
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="inline-block relative z-10"
                >
                    <span className="relative block text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#FFF] to-[#B2904D] drop-shadow-[0_0_25px_rgba(178,144,77,0.5)] tracking-tighter">
                        +1 713
                    </span>
                </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }}
            className="w-full flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-6 opacity-30 w-full max-w-sm">
                <div className="h-px flex-1 bg-white" />
                <Star size={10} className="text-[#B2904D]" />
                <div className="h-px flex-1 bg-white" />
            </div>

            <div className="relative group w-full max-w-lg">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B2904D]/30 to-[#F5D78E]/30 rounded-xl opacity-30 group-hover:opacity-80 transition duration-500 blur-sm"></div>
                <div className="relative bg-[#000814] rounded-xl p-6 flex flex-col items-center justify-center gap-4 border border-white/5 transition-colors">
                    
                    <h3 className="text-2xl md:text-4xl font-bold text-center text-white drop-shadow-[0_0_15px_rgba(178,144,77,0.6)] uppercase tracking-wide">
                      Experiencias Reales
                    </h3>
                    
                    <p className="text-blue-100/50 text-sm text-center max-w-xs">
                      Resultados comprobados que cambian vidas.
                    </p>

                    <a 
                        href="https://testimonios-woad.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full"
                    >
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-[#001026] font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all"
                        >
                            VER HISTORIAS <ExternalLink size={14} />
                        </motion.button>
                    </a>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

const DisqualifiedStep = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 max-w-lg mx-auto">
    <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
      <MapPin size={32} className="text-amber-500" />
    </div>
    <h2 className="text-2xl font-light text-white mb-4">Gracias por su <span className="font-semibold text-[#B2904D]">Interés</span></h2>
    <p className="text-blue-100/60 max-w-md text-sm leading-relaxed">Por el momento nuestros servicios están limitados a residentes en Estados Unidos.</p>
  </motion.div>
)

const SubmittingStep = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] text-center w-full">
    <div className="loader-container">
      <div className="loader-circle"></div>
      <div className="loader-line-mask">
        <div className="loader-line"></div>
      </div>
      <img 
        src="/LogoInformacion.png" 
        alt="Manuel Solis" 
        width={60} 
        height={60} 
        className="loader-logo object-contain"
      />
    </div>
    <h3 className="text-sm font-medium text-[#B2904D] tracking-[0.2em] uppercase animate-pulse mt-8">Procesando...</h3>
  </motion.div>
)

const ErrorStep = ({ setStep }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 max-w-lg mx-auto">
    <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
      <XCircle size={32} className="text-red-500" />
    </div>
    <h2 className="text-2xl font-light text-white mb-4">Error de <span className="font-semibold text-red-400">Envío</span></h2>
    <p className="text-blue-100/60 max-w-md text-sm mb-8">Hubo un problema. Por favor intente de nuevo.</p>
    <button onClick={() => setStep('form')} className="px-8 py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/5 transition-all">Intentar de Nuevo</button>
  </motion.div>
)

// --- COMPONENTE PRINCIPAL ---

function InteractiveLandingFormContent() {
  const [step, setStep] = useState<Step>('form')
  
  // CAMBIO: Estado inicial con claves en snake_case
  const [formData, setFormData] = useState<FormData>({
    first_name: '', 
    last_name: '', 
    phone: '', 
    email: '',
    in_usa: null,              // Antes: inUSA
    specific_situation: '',    // Antes: specificSituation
    accepted_terms: false,     // Antes: acceptedTerms
    marketing_consent: false   // Antes: marketingConsent
  })
  
  // URL Params manual
  const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlParams(new URLSearchParams(window.location.search))
    }
  }, [])

  // HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSituationSelect = (situationId: string) => {
    // CAMBIO: specific_situation
    setFormData(prev => ({ ...prev, specific_situation: situationId }))
  }

  // CAMBIO: Validación con claves snake_case
  const validateStep1 = () => 
    formData.first_name && 
    formData.last_name && 
    formData.phone && 
    formData.email && 
    formData.accepted_terms

  const handleNextStep = () => { 
    if (validateStep1()) {
      setStep('location')
    }
  }

  // CAMBIO: Clave in_usa
  const handleLocationResponse = (in_usa: boolean) => {
    setFormData(prev => ({ ...prev, in_usa }))
    if (in_usa) {
      setStep('questionnaire')
    } else {
      setStep('disqualified')
    }
  }

  const handleSubmit = async () => {
    // CAMBIO: specific_situation
    if (!formData.specific_situation) return
    setStep('submitting')

    // MOCK API SUCCESS ALWAYS (Simulación 2 segundos)
    setTimeout(() => {
        trackConversionEvents()
        setStep('success')
    }, 2000)

    // Intento real (silencioso)
    try {
      const getParam = (key: string) => urlParams?.get(key) || ''
      const utmData = {
        utm_source: getParam('utm_source') || 'SITIO WEB',
        utm_medium: getParam('utm_medium') || 'Organico',
        utm_campaign: getParam('utm_campaign') || 'Directo',
        utm_content: getParam('utm_content') || '',
        utm_term: getParam('utm_term') || ''
      }
      
      // CAMBIO: Buscar texto basado en specific_situation
      const situationLabel = situationOptions.find(s => s.id === formData.specific_situation)?.text || formData.specific_situation
      
      // El payload ahora tendrá todas las claves en snake_case automáticamente
      const payload = { ...formData, ...utmData, situation: situationLabel }
      
      fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .catch(err => console.log("Envío API background:", err))
        
    } catch (error) { console.error(error) }
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

  return (
    <section id="form-section" className="relative py-12 md:py-20 overflow-hidden bg-[#001540] min-h-[90vh] flex flex-col items-center justify-start pt-24 md:pt-32">
      {/* Background Animado */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#B2904D] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-20 w-full flex flex-col items-center">
        
        {/* Contenedor Principal (Sin fondo oscuro, limpio) */}
        <div className="w-full max-w-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]">
          <AnimatePresence mode="wait">
            {step === 'form' && (
              <FormStep 
                formData={formData} 
                handleChange={handleChange} 
                handleNextStep={handleNextStep} 
                validateStep1={validateStep1} 
              />
            )}
            {step === 'location' && (
              <LocationStep handleLocationResponse={handleLocationResponse} />
            )}
            {step === 'questionnaire' && (
              <QuestionnaireStep 
                formData={formData} 
                handleSituationSelect={handleSituationSelect} 
                handleSubmit={handleSubmit} 
              />
            )}
            {step === 'disqualified' && <DisqualifiedStep />}
            {step === 'submitting' && <SubmittingStep />}
            {step === 'success' && <SuccessStep />}
            {step === 'error' && <ErrorStep setStep={setStep} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default function InteractiveLandingForm() {
  return (
    <div className="w-full bg-[#001540]">
        <InteractiveLandingFormContent />
    </div>
  )
}