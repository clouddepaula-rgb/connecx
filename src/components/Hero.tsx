'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { clsx } from 'clsx'

export default function Hero({ config }: { config: any }) {
  const { ref, isRevealed } = useScrollReveal()

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center text-center pt-[120px] pb-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 animate-bg-move opacity-30" style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)'
      }} />
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-accent-3/10 rounded-full blur-[100px] animate-float [animation-direction:reverse]" />
        <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-accent-2/5 rounded-full blur-[100px] animate-float [animation-delay:3s]" />
      </div>

      <div className="max-w-1140 mx-auto px-6 relative z-2">
        <span 
          className={clsx(
            "reveal inline-block px-5 py-2 rounded-full text-[0.8rem] font-medium tracking-[0.08em] uppercase text-accent border border-accent/20 bg-accent/5 mb-7",
            isRevealed && "revealed"
          )}
        >
          {config.hero_badge || 'Tecnologia de Alto Nível · Entrega Real'}
        </span>

        <h1 
          className={clsx(
            "reveal delay-100 font-syne text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.1] tracking-tight mb-6",
            isRevealed && "revealed"
          )}
        >
          {config.hero_title || 'Seu negócio merece um site'}<br />
          <span className="text-gradient">{config.hero_title_span || 'que trabalha por você.'}</span>
        </h1>

        <p 
          className={clsx(
            "reveal delay-200 text-[1.15rem] text-text-muted max-w-[560px] mx-auto mb-10 leading-[1.7]",
            isRevealed && "revealed"
          )}
        >
          {config.hero_sub || 'Sites desenvolvidos sob medida para restaurantes, micro e grandes empresas. Design que converte. Entrega em dias, não meses.'}
        </p>

        <div 
          className={clsx(
            "reveal delay-300 flex flex-wrap gap-4 justify-center mb-[60px]",
            isRevealed && "revealed"
          )}
        >
          <Link href="#contato" className="bg-accent hover:bg-accent-hover text-white px-7 py-3.5 rounded-full text-[0.95rem] font-medium no-underline transition-all hover:shadow-[0_8px_32px_rgba(255,107,53,0.3)] hover:-translate-y-0.5">
            {config.hero_cta_primary || 'Quero meu site →'}
          </Link>
          <Link href="#portfolio" className="bg-transparent text-text-muted border border-white/10 px-7 py-3.5 rounded-full text-[0.95rem] font-medium no-underline transition-all hover:text-white hover:border-white/15 hover:bg-white/5">
            {config.hero_cta_ghost || 'Ver projetos ↓'}
          </Link>
        </div>

        <div 
          className={clsx(
            "reveal delay-400 flex flex-wrap items-center justify-center gap-8",
            isRevealed && "revealed"
          )}
        >
          <div className="flex flex-col items-center gap-1">
            <strong className="font-syne text-2xl font-bold">{config.proof_1_num || '15+'}</strong>
            <span className="text-[0.8rem] text-text-muted uppercase tracking-wider">{config.proof_1_label || 'projetos entregues'}</span>
          </div>
          <div className="w-px h-10 bg-white/5 hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <strong className="font-syne text-2xl font-bold">{config.proof_2_num || '7 dias'}</strong>
            <span className="text-[0.8rem] text-text-muted uppercase tracking-wider">{config.proof_2_label || 'prazo médio'}</span>
          </div>
          <div className="w-px h-10 bg-white/5 hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <strong className="font-syne text-2xl font-bold">{config.proof_3_num || '100%'}</strong>
            <span className="text-[0.8rem] text-text-muted uppercase tracking-wider">{config.proof_3_label || 'satisfação'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
