'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ConnecxDB } from '@/lib/supabase'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { clsx } from 'clsx'

export default function CtaFinal({ config }: { config: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const { ref, isRevealed } = useScrollReveal()

  const waUrl = `https://wa.me/${config.whatsapp_number}?text=${encodeURIComponent(config.whatsapp_message || 'Oi Gabriel, quero um site!')}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && phone) {
      await ConnecxDB.insertLead({
        name,
        phone,
        source: 'landing_page_cta'
      })
    }
    window.open(waUrl, '_blank')
    setIsModalOpen(false)
  }

  return (
    <>
      <section className="py-30 relative overflow-hidden" id="contato" ref={ref}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-1140 mx-auto px-6 relative z-2 text-center">
          <h2 
            className={clsx(
              "reveal font-syne text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] mb-6",
              isRevealed && "revealed"
            )}
          >
            {config.cta_title || 'Pronto pra sair do papel de vez?'}
          </h2>
          <p 
            className={clsx(
              "reveal delay-100 text-text-muted text-[1.2rem] mb-10 max-w-[600px] mx-auto",
              isRevealed && "revealed"
            )}
          >
            {config.cta_sub || 'Me conta o projeto. Respondo em até 2 horas.'}
          </p>
          
          <div 
            className={clsx(
              "reveal delay-200 flex flex-col items-center gap-4",
              isRevealed && "revealed"
            )}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-accent hover:bg-accent-hover text-white px-10 py-5 rounded-full text-xl font-bold no-underline transition-all hover:shadow-[0_8px_40px_rgba(255,107,53,0.4)] hover:-translate-y-1"
            >
              {config.cta_btn_text || 'Falar no WhatsApp →'}
            </button>
            <span className="text-text-muted/60 text-sm italic">{config.cta_note || 'Resposta rápida. Projeto direto ao ponto.'}</span>
          </div>
        </div>
      </section>

      {/* Lead Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-2000 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-bg-deep/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-[450px] bg-bg-surface border border-white/10 rounded-radius p-10 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="font-syne text-2xl font-bold mb-3">Vamos iniciar seu projeto</h3>
              <p className="text-text-muted mb-8">Preencha rapidamente para eu já salvar seu contato antes de irmos para o WhatsApp.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80">Seu Nome</label>
                  <input 
                    type="text" 
                    placeholder="Ex: João Silva" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-radius-sm p-4 text-white focus:border-accent outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80">Seu WhatsApp</label>
                  <input 
                    type="tel" 
                    placeholder="(11) 90000-0000" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-radius-sm p-4 text-white focus:border-accent outline-none transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-white py-4.5 rounded-radius-sm font-bold text-lg transition-all"
                >
                  Ir para o WhatsApp →
                </button>
              </form>
              
              <button 
                onClick={() => {
                  window.open(waUrl, '_blank')
                  setIsModalOpen(false)
                }}
                className="mt-6 w-full text-center text-text-muted/60 text-sm hover:text-white transition-colors"
              >
                Pular e ir direto pro WhatsApp
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
