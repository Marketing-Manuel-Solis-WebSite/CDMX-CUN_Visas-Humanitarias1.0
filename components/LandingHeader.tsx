'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

// Nota: He removido next/font y next/image por compatibilidad con el entorno de vista previa
export default function LandingHeader() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  // Cambia el estado del scroll para efectos visuales de transparencia
  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 20))

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{ fontFamily: 'sans-serif' }}
      animate={{
        backgroundColor: isScrolled ? 'rgba(0, 21, 64, 0.95)' : 'rgba(0,0,0,0)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="w-full transition-all duration-300" 
        style={{ 
          paddingTop: isScrolled ? '0.5rem' : '1rem', 
          paddingBottom: isScrolled ? '0.5rem' : '1rem' 
        }}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-center">
          {/* Logo - Centrado al quitar los botones */}
          <a 
            href="https://manuelsolis.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="relative z-50"
          >
            <motion.div 
              className={`relative transition-all duration-300 ${
                isScrolled ? 'w-[120px] md:w-[140px]' : 'w-[140px] md:w-[180px]'
              }`} 
              whileHover={{ scale: 1.02 }}
            >
              {/* Usamos etiqueta img estándar para asegurar compatibilidad */}
              <img 
                src="/logo-manuel-solis.png" 
                alt="Logo Manuel Solis" 
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </motion.div>
          </a>
        </div>
      </div>

      {/* Línea decorativa inferior */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px" 
        animate={{ opacity: isScrolled ? 1 : 0 }}
      >
        <div className="h-full bg-gradient-to-r from-transparent via-[#B2904D]/30 to-transparent" />
      </motion.div>
    </motion.header>
  )
}