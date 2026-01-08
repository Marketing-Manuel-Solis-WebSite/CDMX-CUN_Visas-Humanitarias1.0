'use client'

import LandingHeader from '@/components/LandingHeader'
import LandingFooter from '@/components/LandingFooter'
import { motion } from 'framer-motion'
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import { MessageSquare, Mail, Phone, MapPin, FileText, UserCheck, Server, Globe } from 'lucide-react'

const font = Outfit({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] })

const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-6 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block" />
    <h2 className="text-xl md:text-2xl font-light text-white whitespace-nowrap">{title}</h2>
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block" />
  </div>
)

export default function PrivacidadPage() {
  return (
    <main className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
      <LandingHeader />

      {/* Fondo */}
      <div className="fixed inset-0 z-0 w-full h-full bg-[#001540]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        <motion.div animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Hero */}
      <section className="relative pt-40 pb-16 z-10 px-4 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
              className="lg:col-span-5 relative flex items-center justify-center h-[250px] lg:h-[350px]">
              <div className="absolute inset-0 bg-[#B2904D]/10 blur-[80px] rounded-full z-0" />
              <Image src="/LogoInformacion.png" alt="Law Offices of Manuel Solis" width={500} height={500} className="object-contain drop-shadow-[0_0_30px_rgba(178,144,77,0.3)] relative z-10" priority />
            </motion.div>

            <div className="lg:col-span-7 space-y-6 pl-0 lg:pl-10 relative z-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white tracking-tight leading-none">
                <span className="block text-white/90 font-extralight mb-2">POLÍTICA DE</span>
                <span className="block font-medium text-[#B2904D]">PRIVACIDAD</span>
              </h1>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative pl-6 border-l-2 border-[#B2904D]/50">
                <p className="text-lg md:text-xl text-white/80 font-light">Proteger su información privada es nuestra prioridad.</p>
                <p className="text-sm mt-2 text-white/50">Última actualización: 5 de diciembre de 2025</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="text-sm text-blue-100/70 font-light leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/10">
                La Oficina Legal de Manuel Solís se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información.
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="container mx-auto px-4 py-16 relative z-10 max-w-5xl space-y-12">
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="1. Información que Recopilamos" />
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#001026] rounded-xl border border-[#B2904D]/20">
              <h3 className="text-base font-bold text-[#B2904D] mb-3 flex items-center gap-2"><UserCheck size={18} /> Información Personal</h3>
              <ul className="text-xs space-y-1.5 text-white/70">
                <li>• Nombre</li><li>• Correo electrónico</li><li>• Número de teléfono</li><li>• Información del caso</li>
              </ul>
            </div>
            <div className="p-5 bg-[#001026] rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2"><Globe size={18} /> Información Automática</h3>
              <ul className="text-xs space-y-1.5 text-white/70">
                <li>• Dirección IP</li><li>• Tipo de navegador</li><li>• Páginas vistas</li><li>• Cookies</li>
              </ul>
            </div>
            <div className="p-5 bg-[#001026] rounded-xl border border-white/10">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2"><MessageSquare size={18} /> Información SMS</h3>
              <ul className="text-xs space-y-1.5 text-white/70">
                <li>• Número móvil</li><li>• Actividad de mensajería</li><li>• Registros de entrega</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="2. Cómo Usamos Su Información" />
          <div className="p-6 bg-[#000814]/60 rounded-2xl border border-white/10">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {['Comunicar actualizaciones de su caso', 'Enviar recordatorios de citas', 'Notificaciones de servicio', 'Responder a consultas', 'Mejorar nuestro sitio web', 'Cumplir obligaciones legales'].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-white/80 text-sm">
                  <FileText size={16} className="text-[#B2904D] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-orange-300/80 text-xs font-medium pt-4 border-t border-white/10">Su información nunca se vende a terceros.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="3. Programa SMS" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#001026] rounded-xl border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-2">Cancelar</h4>
              <p className="text-xs text-blue-100/70">Envíe <strong>STOP</strong> para cancelar. Envíe <strong>HELP</strong> para ayuda.</p>
            </div>
            <div className="p-4 bg-[#001026] rounded-xl border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-2">Tarifas</h4>
              <p className="text-xs text-blue-100/70">Pueden aplicarse tarifas de mensajes y datos según su plan.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="4. Contáctenos" />
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a href="tel:7138442700" className="flex items-center gap-3 text-white/90 hover:text-[#B2904D] transition-colors">
                <Phone size={18} className="text-sky-400" /><span>713-844-2700</span>
              </a>
              <a href="mailto:support@manuelsolis.com" className="flex items-center gap-3 text-white/90 hover:text-[#B2904D] transition-colors">
                <Mail size={18} className="text-sky-400" /><span>support@manuelsolis.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/90">
                <MapPin size={18} className="text-sky-400" /><span>6657 Navigation Blvd Houston, TX 77011</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <LandingFooter />
    </main>
  )
}