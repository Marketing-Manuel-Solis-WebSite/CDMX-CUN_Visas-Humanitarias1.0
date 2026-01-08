'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Outfit } from 'next/font/google'

const font = Outfit({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export default function LandingHeader() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 20))

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 w-full ${font.className}`}
      animate={{
        backgroundColor: isScrolled ? 'rgba(0, 21, 64, 0.95)' : 'rgba(0,0,0,0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full transition-all duration-300" style={{ paddingTop: isScrolled ? '0.5rem' : '1rem', paddingBottom: isScrolled ? '0.5rem' : '1rem' }}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="https://manuelsolis.com" target="_blank" rel="noopener noreferrer" className="relative z-50">
            <motion.div className={`relative transition-all duration-300 ${isScrolled ? 'w-[120px] md:w-[140px]' : 'w-[140px] md:w-[180px]'}`} whileHover={{ scale: 1.02 }}>
              <Image src="/logo-manuel-solis.png" alt="Logo Manuel Solis" width={200} height={65} className="w-full h-auto object-contain" priority />
            </motion.div>
          </a>

          {/* Derecha */}
          <div className="flex items-center gap-3 md:gap-6">
            <a href="tel:8007865641" className="hidden md:flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-full bg-[#B2904D]/20 border border-[#B2904D]/30 flex items-center justify-center group-hover:bg-[#B2904D]/30 transition-colors">
                <Phone size={14} className="text-[#B2904D]" />
              </div>
              <span className="text-sm font-medium tracking-wide">(800) 786-5641</span>
            </a>

            <div className="hidden md:block h-6 w-px bg-white/20" />

            <a href="https://solislawfirm.com" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors">
              Acceso Clientes
            </a>

            <motion.a href="#form-section" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.1em] bg-[#B2904D] text-[#001026] px-4 md:px-5 py-2 md:py-2.5 rounded-lg transition-all duration-200 hover:bg-[#cbb06d] shadow-lg shadow-[#B2904D]/20">
              Regístrate
            </motion.a>
          </div>
        </div>
      </div>

      <motion.div className="absolute bottom-0 left-0 right-0 h-px" animate={{ opacity: isScrolled ? 1 : 0 }}>
        <div className="h-full bg-gradient-to-r from-transparent via-[#B2904D]/30 to-transparent" />
      </motion.div>
    </motion.header>
  )
}