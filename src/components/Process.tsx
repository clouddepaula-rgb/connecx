'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { clsx } from 'clsx'

export default function Process({ steps, config }: { steps: any[], config: any }) {
  const { ref, isRevealed } = useScrollReveal()

  return (
    <section className="py-30 relative" id="processo" ref={ref}>
      <div className="max-w-1140 mx-auto px-6">
        <span 
          className={clsx(
            "reveal inline-block text-[0.8rem] font-medium uppercase tracking-[0.1em] text-accent mb-4",
            isRevealed && "revealed"
          )}
        >
          {config.section_processo_tag || 'Como funciona'}
        </span>
        <h2 
          className={clsx(
            "reveal delay-100 font-syne text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold mb-12",
            isRevealed && "revealed"
          )}
        >
          {config.section_processo_title || 'Da ideia ao site no ar'}
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-0 md:gap-0">
          {steps.map((step, i) => (
            <div key={step.id || i} className="flex flex-col md:flex-row items-start flex-1 w-full">
              <div 
                className={clsx(
                  "reveal flex flex-col gap-4 pr-8 mb-12 md:mb-0",
                  isRevealed && "revealed",
                  i === 0 ? "delay-100" : i === 1 ? "delay-200" : "delay-300"
                )}
              >
                <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center font-syne font-bold text-accent text-xl bg-accent/5">
                  {step.step_number || i + 1}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-text-muted text-[0.95rem] leading-relaxed">{step.description}</p>
              </div>
              
              {i < steps.length - 1 && (
                <div 
                  className={clsx(
                    "hidden md:block h-px flex-1 bg-white/10 mt-6 origin-left transition-transform duration-1000",
                    isRevealed ? "scale-x-100" : "scale-x-0",
                    i === 0 ? "delay-200" : i === 1 ? "delay-300" : "delay-400"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
