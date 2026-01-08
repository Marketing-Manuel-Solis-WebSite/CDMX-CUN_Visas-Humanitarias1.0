'use client'

import Image from 'next/image'
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Outfit } from 'next/font/google'

const font = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/AbogadoManuelSolisOficial/', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com/AbogadoMSolis', icon: Twitter },
  { name: 'Instagram', href: 'https://www.instagram.com/abogadomanuelsolisoficial/', icon: Instagram },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCWD61mNBq6qJ0BMhj_-a4Vg', icon: Youtube },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/manuel-solis-law-firm/', icon: Linkedin },
]

const footerLinks = [
  { name: 'Inicio', href: 'https://manuelsolis.com' },
  { name: 'Testimonios', href: 'https://manuelsolis.com/es/Testimonios' },
  { name: 'Oficinas', href: 'https://manuelsolis.com/es/oficinas' },
  { name: 'Blog', href: 'https://manuelsolis.com/es/blog' },
]

export default function LandingFooter() {
  const currentYear = new Date().getFullYear()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className={`relative bg-[#001540] text-white overflow-hidden ${font.className}`}>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent opacity-50" />
      <motion.div animate={{ opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#B2904D]/15 blur-[60px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <a href="https://manuelsolis.com" target="_blank" rel="noopener noreferrer" className="inline-block mb-8 group relative">
            <div className="absolute -inset-4 bg-[#B2904D]/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image src="/logo-manuel-solis.png" alt="Logo Manuel Solis" width={260} height={80} className="h-20 w-auto relative z-10 drop-shadow-lg" />
          </a>

          <div className="flex gap-3 mb-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <motion.a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                  whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-[#B2904D] hover:border-[#B2904D] hover:text-[#001540]">
                  <IconComponent className="w-4 h-4" />
                </motion.a>
              )
            })}
          </div>
        </div>

        <nav className="mb-10 border-t border-white/10 border-b py-8">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="relative group text-sm font-medium tracking-wider text-blue-100/70 hover:text-white transition-colors duration-300">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#B2904D] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-3xl mx-auto text-center mb-10 opacity-60">
          <p className="text-[10px] md:text-xs leading-relaxed font-light tracking-wide text-blue-100">
            Acepto recibir mensajes de texto de marketing y otros mensajes del Law Office of Manuel Solis al número proporcionado. Pueden aplicarse tarifas de mensajes y datos. El consentimiento no es una condición para recibir servicios.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200/40">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/privacidad" className="hover:text-[#B2904D] transition-colors">Política de Privacidad</a>
            <span>|</span>
            <a href="/sms-terminos" className="hover:text-[#B2904D] transition-colors">Términos de Servicio</a>
          </div>
          <p>© {currentYear} Manuel Solis Law Firm. Todos los derechos reservados.</p>
        </div>
      </div>

      <motion.button onClick={scrollToTop} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 text-[#B2904D] hidden md:flex items-center justify-center hover:bg-[#B2904D] hover:text-[#001540] transition-all duration-300">
        <ArrowUp size={16} />
      </motion.button>
    </footer>
  )
}