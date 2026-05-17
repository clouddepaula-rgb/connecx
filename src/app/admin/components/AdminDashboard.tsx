'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

// Seções modulares
import GeneralSection from './sections/GeneralSection'
import HeroSection from './sections/HeroSection'
import TargetSection from './sections/TargetSection'
import PortfolioSection from './sections/PortfolioSection'
import PrivatePortfolioSection from './sections/PrivatePortfolioSection'
import ProcessSection from './sections/ProcessSection'
import DiffSection from './sections/DiffSection'
import CtaSection from './sections/CtaSection'
import LeadsSection from './sections/LeadsSection'

export default function AdminDashboard({ initialData }: { initialData: any }) {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [saving, setSaving] = useState(false)

  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    geral: 'Configurações Gerais',
    hero: 'Hero',
    'para-quem': 'Para Quem',
    portfolio: 'Portfólio',
    'portfolio-privado': 'Portfólio Privado',
    processo: 'Processo',
    diferenciais: 'Diferenciais',
    cta: 'CTA Final',
    leads: 'Leads',
  }

  return (
    <div className="grid grid-cols-[260px_1fr] min-h-screen max-md:grid-cols-1 bg-[#080808]">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex flex-col min-h-screen overflow-hidden">
        <Topbar title={titles[activeSection] || activeSection} />
        
        <div className="p-8 max-md:p-5 flex-1 overflow-y-auto">
          {activeSection === 'dashboard' && (
            <section className="animate-in fade-in duration-500">
              <div className="mb-7">
                <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Dashboard</h1>
                <p className="text-[#666] text-[0.9rem] -mt-1">Visão geral do seu site</p>
              </div>
              
              <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-5 flex items-center gap-4">
                  <span className="text-[1.75rem]">📬</span>
                  <div>
                    <strong className="block font-syne text-[1.5rem] font-extrabold text-[#ff6b2b]">{initialData.leads.length}</strong>
                    <span className="text-[0.8rem] text-[#666]">Leads recebidos</span>
                  </div>
                </div>
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-5 flex items-center gap-4">
                  <span className="text-[1.75rem]">💼</span>
                  <div>
                    <strong className="block font-syne text-[1.5rem] font-extrabold text-[#ff6b2b]">{initialData.projects.length}</strong>
                    <span className="text-[0.8rem] text-[#666]">Projetos no portfólio</span>
                  </div>
                </div>
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-5 flex items-center gap-4">
                  <span className="text-[1.75rem]">🎯</span>
                  <div>
                    <strong className="block font-syne text-[1.5rem] font-extrabold text-[#ff6b2b]">{initialData.cards.length}</strong>
                    <span className="text-[0.8rem] text-[#666]">Cards ativos</span>
                  </div>
                </div>
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-5 flex items-center gap-4">
                  <span className="text-[1.75rem]">🌐</span>
                  <div>
                    <strong className="block font-syne text-[1.5rem] font-extrabold text-[#ff6b2b]">Ativo</strong>
                    <span className="text-[0.8rem] text-[#666]">Status do site</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-6 mt-8">
                <h3 className="font-syne font-bold text-[1rem] mb-4 text-white">Atalhos rápidos</h3>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={() => setActiveSection('hero')} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] text-[0.85rem] px-4 py-2 hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all">Editar Hero</button>
                  <button onClick={() => setActiveSection('geral')} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] text-[0.85rem] px-4 py-2 hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all">WhatsApp & Meta</button>
                  <button onClick={() => setActiveSection('portfolio')} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] text-[0.85rem] px-4 py-2 hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all">Gerenciar Portfólio</button>
                  <button onClick={() => setActiveSection('leads')} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] text-[0.85rem] px-4 py-2 hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all">Ver Leads</button>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'geral' && <GeneralSection config={initialData.config} saving={saving} setSaving={setSaving} />}
          {activeSection === 'hero' && <HeroSection config={initialData.config} saving={saving} setSaving={setSaving} />}
          {activeSection === 'para-quem' && <TargetSection config={initialData.config} cards={initialData.cards} saving={saving} setSaving={setSaving} />}
          {activeSection === 'portfolio' && <PortfolioSection config={initialData.config} projects={initialData.projects} saving={saving} setSaving={setSaving} />}
          {activeSection === 'portfolio-privado' && <PrivatePortfolioSection portfolioConfig={initialData.portfolioConfig} projects={initialData.projects} saving={saving} setSaving={setSaving} />}
          {activeSection === 'processo' && <ProcessSection config={initialData.config} steps={initialData.steps} saving={saving} setSaving={setSaving} />}
          {activeSection === 'diferenciais' && <DiffSection config={initialData.config} diffs={initialData.diffs} saving={saving} setSaving={setSaving} />}
          {activeSection === 'cta' && <CtaSection config={initialData.config} saving={saving} setSaving={setSaving} />}
          {activeSection === 'leads' && <LeadsSection leads={initialData.leads} />}
        </div>
      </main>
    </div>
  )
}
