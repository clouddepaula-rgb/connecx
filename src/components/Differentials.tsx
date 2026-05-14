'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { clsx } from 'clsx'

export default function Differentials({ diffs, config }: { diffs: any[], config: any }) {
  const { ref, isRevealed } = useScrollReveal()

  return (
    <section className="py-30 bg-bg-primary relative" id="diferencial" ref={ref}>
      <div className="max-w-1140 mx-auto px-6">
        <span 
          className={clsx(
            "reveal inline-block text-[0.8rem] font-medium uppercase tracking-[0.1em] text-accent mb-4",
            isRevealed && "revealed"
          )}
        >
          {config.section_diff_tag || 'O diferencial'}
        </span>
        <h2 
          className={clsx(
            "reveal delay-100 font-syne text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold mb-12",
            isRevealed && "revealed"
          )}
        >
          {config.section_diff_title || 'Por que trabalhar comigo'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {diffs.map((d, i) => (
            <div 
              key={d.id || i}
              className={clsx(
                "reveal bg-bg-card border border-white/5 p-8 rounded-radius-sm transition-all hover:border-white/10 hover:bg-white/[0.02]",
                isRevealed && "revealed",
                `delay-${(i % 4) * 100 + 100}`
              )}
            >
              <div className="text-3xl mb-4">{d.icon_emoji}</div>
              <h3 className="text-xl font-bold mb-3">{d.title}</h3>
              <p className="text-text-muted text-[0.95rem] leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
