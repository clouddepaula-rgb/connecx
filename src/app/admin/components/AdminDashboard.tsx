'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AdminDashboard({ initialData }: { initialData: any }) {
  const [activeSection, setActiveSection] = useState('dashboard')

  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    geral: 'Configurações Gerais',
    hero: 'Hero',
    'para-quem': 'Para Quem',
    portfolio: 'Portfólio',
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
                    <strong className="block font-syne text-[1.5rem] font-extrabold text-[#ff6b2b]">{initialData.leadsCount}</strong>
                    <span className="text-[0.8rem] text-[#666]">Leads recebidos</span>
                  </div>
                </div>
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-5 flex items-center gap-4">
                  <span className="text-[1.75rem]">💼</span>
                  <div>
                    <strong className="block font-syne text-[1.5rem] font-extrabold text-[#ff6b2b]">{initialData.projectsCount}</strong>
                    <span className="text-[0.8rem] text-[#666]">Projetos no portfólio</span>
                  </div>
                </div>
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-5 flex items-center gap-4">
                  <span className="text-[1.75rem]">🎯</span>
                  <div>
                    <strong className="block font-syne text-[1.5rem] font-extrabold text-[#ff6b2b]">{initialData.cardsCount}</strong>
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
                  <button onClick={() => setActiveSection('portfolio')} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] text-[0.85rem] px-4 py-2 hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all">Adicionar Projeto</button>
                  <button onClick={() => setActiveSection('leads')} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] text-[0.85rem] px-4 py-2 hover:border-[#ff6b2b] hover:text-[#ff6b2b] transition-all">Ver Leads</button>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'geral' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-7">
                <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Configurações Gerais</h1>
                <p className="text-[#666] text-[0.9rem] -mt-1">Logo, WhatsApp e Meta Tags SEO</p>
              </div>
              
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8 max-w-[800px]">
                <form className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Logo (Texto)</label>
                      <input className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" placeholder="connecx" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">WhatsApp</label>
                      <input className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" placeholder="5513..." />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Meta Title</label>
                    <input className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Meta Description</label>
                    <textarea className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b] min-h-[100px]" />
                  </div>

                  <button className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors">Salvar Configurações</button>
                </form>
              </div>
            </section>
          )}

          {activeSection === 'leads' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-7">
                <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Leads</h1>
                <p className="text-[#666] text-[0.9rem] -mt-1">Contatos recebidos via landing page</p>
              </div>
              
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] overflow-hidden">
                <table className="w-full border-collapse text-[0.85rem]">
                  <thead>
                    <tr className="bg-[#101010] text-[#666] text-left uppercase text-[0.75rem] tracking-wider border-b border-[#1e1e1e]">
                      <th className="p-4 font-semibold">Data</th>
                      <th className="p-4 font-semibold">Nome</th>
                      <th className="p-4 font-semibold">Telefone</th>
                      <th className="p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#1e1e1e] text-[#ccc] hover:bg-[#1a1a1a] transition-colors">
                      <td className="p-4 text-[#666]">Carregando...</td>
                      <td className="p-4">—</td>
                      <td className="p-4">—</td>
                      <td className="p-4">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {['hero', 'para-quem', 'portfolio', 'processo', 'diferenciais', 'cta'].includes(activeSection) && (
            <div className="text-[#666] p-10 text-center bg-[#141414] border border-[#1e1e1e] rounded-[10px]">
              Seção <strong>{titles[activeSection]}</strong> em migração... <br/>
              O núcleo de segurança já está ativo!
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
