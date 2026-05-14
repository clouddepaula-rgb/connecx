'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function Navbar({ config }: { config: any }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-1000 transition-all duration-300 py-4",
      isScrolled ? "bg-bg-deep/85 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-1140 mx-auto px-6 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={28} 
            height={28} 
            className="filter invert brightness-100"
            priority
          />
          <div className="font-syne font-bold text-[1.2rem] text-white tracking-tight">
            {config.logo_text || 'Connecx'}
            <span className="text-accent">{config.logo_span || 'x'}</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          <Link href="#para-quem" className="text-text-muted text-[0.9rem] no-underline hover:text-white transition-colors">Para Quem</Link>
          <Link href="#portfolio" className="text-text-muted text-[0.9rem] no-underline hover:text-white transition-colors">Projetos</Link>
          <Link href="#processo" className="text-text-muted text-[0.9rem] no-underline hover:text-white transition-colors">Processo</Link>
          <Link href="#diferencial" className="text-text-muted text-[0.9rem] no-underline hover:text-white transition-colors">Diferencial</Link>
        </div>

        <Link href="#contato" className="hidden md:inline-flex items-center bg-accent hover:bg-accent-hover text-white px-[22px] py-[10px] text-[0.85rem] font-medium rounded-full no-underline transition-all hover:-translate-y-px">
          {config.nav_cta_text || 'Quero meu site'}
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col gap-[5px] bg-none border-none cursor-pointer p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-bg-surface border-b border-white/5 overflow-hidden transition-all duration-300",
        isMobileMenuOpen ? "max-h-[300px] py-6" : "max-h-0 py-0"
      )}>
        <div className="flex flex-col items-center gap-6">
          <Link href="#para-quem" onClick={() => setIsMobileMenuOpen(false)} className="text-text-muted hover:text-white no-underline">Para Quem</Link>
          <Link href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-text-muted hover:text-white no-underline">Projetos</Link>
          <Link href="#processo" onClick={() => setIsMobileMenuOpen(false)} className="text-text-muted hover:text-white no-underline">Processo</Link>
          <Link href="#diferencial" onClick={() => setIsMobileMenuOpen(false)} className="text-text-muted hover:text-white no-underline">Diferencial</Link>
          <Link href="#contato" onClick={() => setIsMobileMenuOpen(false)} className="bg-accent text-white px-6 py-3 rounded-full no-underline">Quero meu site</Link>
        </div>
      </div>
    </nav>
  )
}
