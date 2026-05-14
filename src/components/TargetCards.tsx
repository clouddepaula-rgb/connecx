'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { clsx } from 'clsx'

export default function TargetCards({ cards, config }: { cards: any[], config: any }) {
  const { ref, isRevealed } = useScrollReveal()

  return (
    <section className="py-30 relative" id="para-quem" ref={ref}>
      <div className="max-w-1140 mx-auto px-6">
        <span 
          className={clsx(
            "reveal inline-block text-[0.8rem] font-medium uppercase tracking-[0.1em] text-accent mb-4",
            isRevealed && "revealed"
          )}
        >
          {config.section_para_quem_tag || 'Para quem eu construo'}
        </span>
        <h2 
          className={clsx(
            "reveal delay-100 font-syne text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.2] tracking-tight mb-4",
            isRevealed && "revealed"
          )}
        >
          {config.section_para_quem_title || 'Cada negócio tem uma necessidade. Eu entendo a sua.'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {cards.map((card, i) => (
            <div 
              key={card.id || i}
              className={clsx(
                "reveal group relative bg-white/3 backdrop-blur-lg border border-white/[0.08] rounded-radius p-[36px_28px] transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]",
                isRevealed && "revealed",
                i === 0 ? "delay-100" : i === 1 ? "delay-200" : "delay-300"
              )}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className={`w-[52px] h-[52px] grid place-items-center rounded-[14px] mb-5 border border-white/15 ${
                i === 1 ? 'bg-accent-2/10 text-accent-2 border-accent-2/15' : 
                i === 2 ? 'bg-accent-3/10 text-accent-3 border-accent-3/15' : 
                'bg-accent/10 text-accent border-accent/15'
              }`}>
                {card.icon_svg ? (
                  <div dangerouslySetInnerHTML={{ __html: card.icon_svg }} className="w-7 h-7" aria-hidden="true" />
                ) : (
                  <span className="text-[1.75rem]" aria-hidden="true">{card.icon_emoji || '🎯'}</span>
                )}
              </div>
              <h3 className="font-syne text-[1.25rem] font-bold mb-3 tracking-tight">{card.title}</h3>
              <p className="text-text-muted text-[0.95rem] leading-[1.65]">{card.description}</p>
              <span className="block mt-5 text-accent text-[1.2rem] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
