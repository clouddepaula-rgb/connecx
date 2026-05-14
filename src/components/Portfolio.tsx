'use client'

import { useState, useRef, useEffect } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useScrollReveal } from '@/hooks/useScrollReveal'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function Portfolio({ projects, config }: { projects: any[], config: any }) {
  const [activeProject, setActiveProject] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { ref, isRevealed } = useScrollReveal()

  const currentProject = projects[activeProject] || { title: 'Carregando...', url_display: '' }

  useEffect(() => {
    setIsLoading(true)
  }, [activeProject])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleResize = () => {
      clearTimeout(timeoutId)
      // Debounce to prevent layout thrashing
      timeoutId = setTimeout(() => {
        if (!wrapperRef.current || !iframeRef.current) return
        const wrapperWidth = wrapperRef.current.clientWidth
        const wrapperHeight = wrapperRef.current.clientHeight

        if (wrapperWidth < 600) {
          // Mobile view: Render a 375px mobile viewport and scale it to fit
          const baseMobileWidth = 375
          const scale = wrapperWidth / baseMobileWidth
          iframeRef.current.style.width = `${baseMobileWidth}px`
          iframeRef.current.style.transform = `scale(${scale})`
          if (scale > 0) {
            iframeRef.current.style.height = `${wrapperHeight / scale}px`
          }
        } else {
          // Desktop view: Render a 1280px desktop viewport and scale it to fit
          const baseWidth = 1280
          const scale = wrapperWidth / baseWidth
          iframeRef.current.style.width = `${baseWidth}px`
          iframeRef.current.style.transform = `scale(${scale})`
          if (scale > 0) {
            iframeRef.current.style.height = `${wrapperHeight / scale}px`
          }
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [activeProject])

  return (
    <section className="py-30 bg-bg-primary relative" id="portfolio" ref={ref}>
      <div className="max-w-1140 mx-auto px-6">
        <span 
          className={clsx(
            "reveal inline-block text-[0.8rem] font-medium uppercase tracking-[0.1em] text-accent mb-4",
            isRevealed && "revealed"
          )}
        >
          {config.section_portfolio_tag || 'Projetos reais'}
        </span>
        <h2 
          className={clsx(
            "reveal delay-100 font-syne text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold mb-4",
            isRevealed && "revealed"
          )}
        >
          {config.section_portfolio_title || 'Veja o que já foi construído'}
        </h2>
        <p className="text-text-muted text-[1.05rem] mb-12">Clique em um projeto para ver ao vivo dentro desta página.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
          <div className="flex flex-col gap-2">
            {projects.map((proj, i) => (
              <button
                key={proj.id || i}
                onClick={() => setActiveProject(i)}
                className={cn(
                  "flex items-center gap-4 p-4.5 bg-bg-card border border-white/5 rounded-radius-sm cursor-pointer transition-all text-left",
                  activeProject === i ? "border-accent bg-accent/5 text-white" : "text-text-muted hover:border-white/10 hover:text-white"
                )}
              >
                <span className={cn(
                  "font-syne font-bold text-[1.1rem] text-accent",
                  activeProject === i ? "opacity-100" : "opacity-50"
                )}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-0.5">
                  <strong className="text-[0.95rem] font-semibold">{proj.title}</strong>
                  <small className="text-[0.75rem] opacity-60">{proj.category}</small>
                </div>
              </button>
            ))}
          </div>

          <div 
            className={clsx(
              "reveal delay-200 rounded-radius overflow-hidden border border-white/5 bg-[#1e1e2e] shadow-[0_20px_80px_rgba(0,0,0,0.4)] animate-float",
              isRevealed && "revealed"
            )}
          >
            <div className="flex items-center gap-4 p-3 bg-[#16161f] border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-white/5 px-3.5 py-1.5 rounded-md text-[0.8rem] text-text-muted truncate">
                {currentProject.url_display || '...'}
              </div>
            </div>
            
            {/* Aspect ratio changed for mobile to allow better visibility */}
            <div className="relative w-full aspect-[4/5] md:aspect-video bg-[#0f0f13] overflow-hidden" ref={wrapperRef}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e2e] z-10 transition-opacity duration-300">
                  <div className="w-7.5 h-7.5 border-3 border-accent/20 border-t-accent rounded-full animate-spin-slow" />
                </div>
              )}
              
              <iframe 
                ref={iframeRef}
                title={`Preview do projeto ${currentProject.title}`}
                src={currentProject.url_display ? (currentProject.url_display.startsWith('http') ? currentProject.url_display : `https://${currentProject.url_display}`) : 'about:blank'}
                onLoad={() => setIsLoading(false)}
                className="origin-top-left transition-opacity duration-400 border-none bg-white"
                style={{ opacity: isLoading ? 0 : 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

