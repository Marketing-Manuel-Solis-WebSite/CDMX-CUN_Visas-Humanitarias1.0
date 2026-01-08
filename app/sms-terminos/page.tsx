'use client'

import LandingHeader from '@/components/LandingHeader'
import LandingFooter from '@/components/LandingFooter'
import { motion } from 'framer-motion'
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import { MessageSquare, Shield, Mail, Phone, Clock, XOctagon, CheckCircle2 } from 'lucide-react'

const font = Outfit({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] })

const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-6 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block" />
    <h2 className="text-xl md:text-2xl font-light text-white whitespace-nowrap">{title}</h2>
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block" />
  </div>
)

export default function SmsTerminosPage() {
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
      <section className="relative pt-40 pb-12 z-10 px-4 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
              className="lg:col-span-5 relative flex items-center justify-center h-[250px] lg:h-[350px]">
              <div className="absolute inset-0 bg-[#B2904D]/10 blur-[80px] rounded-full z-0" />
              <Image src="/LogoInformacion.png" alt="Law Offices of Manuel Solis" width={500} height={500} className="object-contain drop-shadow-[0_0_30px_rgba(178,144,77,0.3)] relative z-10" priority />
            </motion.div>

            <div className="lg:col-span-7 space-y-6 pl-0 lg:pl-10 relative z-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-thin text-white tracking-tight leading-none">
                <span className="block text-white/90 font-extralight mb-2">TÉRMINOS DE</span>
                <span className="block font-medium text-[#B2904D]">SERVICIO SMS</span>
              </h1>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative pl-6 border-l-2 border-[#B2904D]/50">
                <p className="text-lg md:text-xl text-white/80 font-light">Programa: Solís Law Notifications</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="text-sm text-blue-100/70 font-light leading-relaxed bg-white/5 p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 text-white text-base font-semibold mb-3">
                  <MessageSquare size={20} className="text-[#B2904D]" /> Law Office of Manuel Solis – SMS Terms
                </div>
                <p>Programa de mensajería que proporciona actualizaciones de casos, recordatorios de citas y notificaciones importantes.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="container mx-auto px-4 py-12 relative z-10 max-w-5xl space-y-10">
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="1. Instrucciones para Cancelar" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#001026] rounded-xl border border-red-500/30">
              <h3 className="text-base font-medium text-white flex items-center gap-2 mb-3"><XOctagon size={20} className="text-red-500" /> Cancelación</h3>
              <p className="text-sm text-blue-100/80">Envíe el mensaje <strong className="text-white">"STOP"</strong> al número desde el que recibió los mensajes.</p>
            </div>
            <div className="p-5 bg-[#001026] rounded-xl border border-green-500/30">
              <h3 className="text-base font-medium text-white flex items-center gap-2 mb-3"><CheckCircle2 size={20} className="text-green-500" /> Reunirse</h3>
              <p className="text-sm text-blue-100/80">Envíe <strong className="text-white">"START"</strong> o <strong className="text-white">"UNSTOP"</strong> para volver a unirse.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="2. Ayuda y Soporte" />
          <div className="p-6 bg-[#000814]/60 rounded-2xl border border-white/10">
            <p className="text-sm text-blue-100/80 mb-4">Responda con <strong className="text-white">HELP</strong> para obtener ayuda. También puede contactarnos:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-[#B2904D] bg-white/5 p-4 rounded-lg">
                <Phone size={18} className="text-sky-400" /><span className="font-medium">713-844-2700</span>
              </div>
              <div className="flex items-center gap-3 text-[#B2904D] bg-white/5 p-4 rounded-lg">
                <Mail size={18} className="text-sky-400" /><span className="font-medium">support@manuelsolis.com</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="3. Descargo del Operador" />
          <div className="p-5 bg-[#1a0000]/60 rounded-2xl border border-red-500/30">
            <p className="text-sm text-red-100/80">Los operadores de telefonía inalámbrica no son responsables por mensajes retrasados, fallidos o no entregados.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="4. Frecuencia y Tarifas" />
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 p-5 bg-[#000814]/60 rounded-xl border border-white/10">
              <p className="text-sm text-blue-100/80 mb-4">Pueden aplicarse tarifas de mensajes y datos. La frecuencia varía según su caso:</p>
              <ul className="text-sm space-y-2 text-white/80">
                <li>• Actualizaciones de casos</li><li>• Recordatorios de citas</li><li>• Alertas importantes</li>
              </ul>
            </div>
            <div className="p-5 bg-[#001026] rounded-xl border border-[#B2904D]/20">
              <h3 className="text-base font-bold text-[#B2904D] mb-3 flex items-center gap-2"><Clock size={18} /> Nota</h3>
              <p className="text-xs text-white/80">Contacte a su proveedor de telefonía para preguntas sobre su plan.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="5. Política de Privacidad" />
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-blue-100/80">Para información sobre cómo protegemos sus datos, revise nuestra Política de Privacidad.</p>
            <a href="/privacidad" className="flex items-center gap-2 px-5 py-2.5 bg-[#B2904D] text-[#001540] font-bold rounded-lg hover:bg-[#a08445] transition-colors whitespace-nowrap">
              <Shield size={18} /> Ver Política
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionTitle title="6. Elegibilidad" />
          <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-sm text-blue-100/80 mb-4">Al optar por Solís Law Notifications, usted declara:</p>
            <ul className="text-sm space-y-2 text-white/80">
              <li>• Es el propietario/usuario autorizado del número de teléfono</li>
              <li>• Tiene al menos 18 años o capacidad legal</li>
              <li>• Comprende que puede cancelar en cualquier momento</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <LandingFooter />
    </main>
  )
}