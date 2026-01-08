'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Outfit } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

const font = Outfit({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export default function NotFoundPage() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const xPercent = (clientX / innerWidth - 0.5) * 2
      const yPercent = (clientY / innerHeight - 0.5) * 2

      const layers = sceneRef.current.querySelectorAll('[data-depth]')
      layers.forEach((layer) => {
        const depth = parseFloat((layer as HTMLElement).dataset.depth || '0')
        const x = xPercent * depth * 30
        const y = yPercent * depth * 30
        ;(layer as HTMLElement).style.transform = `translate(${x}px, ${y}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className={`relative min-h-screen w-full bg-[#001540] overflow-hidden ${font.className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)' }} />

      {/* Escena parallax */}
      <div ref={sceneRef} className="absolute inset-0 flex items-center justify-center">
        
        {/* Círculos de fondo */}
        <div data-depth="1.2" className="absolute transition-transform duration-200 ease-out">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}
            className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
            style={{ background: 'rgba(0, 21, 64, 0.2)', boxShadow: 'inset 5px 20px 40px rgba(0, 10, 32, 0.25), 2px 2px 5px rgba(255, 255, 255, 0.1)' }} />
        </div>

        <div data-depth="0.9" className="absolute transition-transform duration-200 ease-out">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full"
            style={{ background: 'rgba(0, 21, 64, 0.3)', boxShadow: 'inset 5px 20px 40px rgba(0, 10, 32, 0.25)' }} />
        </div>

        {/* Piezas doradas */}
        <div data-depth="0.6" className="absolute transition-transform duration-200 ease-out">
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <motion.div animate={{ x: [0, 50, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-40 -left-20 w-32 h-10 rounded-full bg-gradient-to-r from-[#B2904D] to-[#D4AF61] opacity-60 blur-[1px]" />
            <motion.div animate={{ x: [0, -30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 -left-40 w-40 h-12 rounded-full bg-gradient-to-r from-[#B2904D] to-[#D4AF61] opacity-50 blur-[1px]" />
          </motion.div>
        </div>

        {/* Piezas azules */}
        <div data-depth="0.8" className="absolute transition-transform duration-200 ease-out">
          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
            <motion.div animate={{ x: [0, -40, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 left-40 w-28 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-50 blur-[1px]" />
            <motion.div animate={{ x: [0, 60, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-40 left-60 w-44 h-14 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-40 blur-[1px]" />
          </motion.div>
        </div>

        {/* Piezas rosas */}
        <div data-depth="0.4" className="absolute transition-transform duration-200 ease-out">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-20 w-24 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 opacity-50 blur-[1px]" />
          </motion.div>
        </div>

        {/* 404 blur */}
        <div data-depth="0.1" className="absolute transition-transform duration-200 ease-out">
          <motion.span initial={{ opacity: 0, scale: 10 }} animate={{ opacity: 0.3, scale: 1 }} transition={{ duration: 0.6, delay: 1 }}
            className="text-[120px] md:text-[200px] font-black text-[#001026] blur-[10px] select-none">404</motion.span>
        </div>

        {/* 404 principal */}
        <div data-depth="0.5" className="absolute transition-transform duration-200 ease-out">
          <motion.span initial={{ opacity: 0, scale: 10 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1.2 }}
            className="text-[120px] md:text-[200px] font-black text-white select-none drop-shadow-[0_0_60px_rgba(178,144,77,0.3)]">404</motion.span>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-end pb-20 md:pb-32 px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.8 }} className="text-center max-w-md">
          <p className="text-white text-lg md:text-xl mb-8 drop-shadow-lg">
            ¡Ups! Parece que te has perdido.<br />
            <span className="text-blue-200/70 text-base">Vuelve al inicio si te atreves.</span>
          </p>
          
          <Link href="/">
            <motion.button whileHover={{ y: -3, boxShadow: '0 15px 30px rgba(178, 144, 77, 0.4)' }} whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#B2904D] text-[#001026] font-bold uppercase tracking-widest rounded-full shadow-lg transition-all hover:bg-[#cbb06d]">
              ¡Me atrevo!
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Logo */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="fixed top-6 left-6 z-50">
        <Link href="/"><Image src="/logo-manuel-solis.png" alt="Manuel Solis" width={120} height={40} className="opacity-80 hover:opacity-100 transition-opacity" /></Link>
      </motion.div>

      {/* Nav */}
      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="fixed top-6 right-6 z-50 flex items-center gap-6">
        <Link href="https://manuelsolis.com" target="_blank" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Inicio</Link>
        <Link href="https://manuelsolis.com/es/oficinas" target="_blank" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">Oficinas</Link>
      </motion.nav>
    </main>
  )
}