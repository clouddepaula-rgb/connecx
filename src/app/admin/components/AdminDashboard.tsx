import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { updateSiteConfig, updatePortfolioConfig } from '../actions'

export default function AdminDashboard({ initialData }: { initialData: any }) {
  const [activeSection, setActiveSection] = useState('dashboard')

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

  // Helpers para formulários
  const [saving, setSaving] = useState(false)

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
                <form action={async (formData) => {
                  setSaving(true)
                  const data = Object.fromEntries(formData)
                  await updateSiteConfig(data)
                  setSaving(false)
                  alert('✅ Configurações salvas!')
                }} className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Logo (Texto)</label>
                      <input name="logo_text" defaultValue={initialData.config.logo_text} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">WhatsApp</label>
                      <input name="whatsapp_number" defaultValue={initialData.config.whatsapp_number} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Meta Title</label>
                    <input name="meta_title" defaultValue={initialData.config.meta_title} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Meta Description</label>
                    <textarea name="meta_description" defaultValue={initialData.config.meta_description} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b] min-h-[100px]" />
                  </div>

                  <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
                    {saving ? 'Salvando...' : 'Salvar Configurações'}
                  </button>
                </form>
              </div>
            </section>
          )}

          {activeSection === 'hero' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-7">
                <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Hero</h1>
                <p className="text-[#666] text-[0.9rem] -mt-1">Seção principal da landing page</p>
              </div>
              
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8 max-w-[800px]">
                <form action={async (formData) => {
                  setSaving(true)
                  const data = Object.fromEntries(formData)
                  await updateSiteConfig(data)
                  setSaving(false)
                  alert('✅ Hero salvo!')
                }} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Badge</label>
                    <input name="hero_badge" defaultValue={initialData.config.hero_badge} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título (Linha 1)</label>
                      <input name="hero_title" defaultValue={initialData.config.hero_title} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título (Destaque)</label>
                      <input name="hero_title_span" defaultValue={initialData.config.hero_title_span} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Subtítulo</label>
                    <textarea name="hero_sub" defaultValue={initialData.config.hero_sub} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b] min-h-[100px]" />
                  </div>

                  <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
                    {saving ? 'Salvando...' : 'Salvar Hero'}
                  </button>
                </form>
              </div>
            </section>
          )}

          {activeSection === 'portfolio-privado' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-7">
                <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Portfólio Privado</h1>
                <p className="text-[#666] text-[0.9rem] -mt-1">Gerencie sua página de portfólio pessoal</p>
              </div>
              
              <div className="flex flex-col gap-6 max-w-[800px]">
                <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8">
                  <h3 className="font-syne font-bold text-[1rem] mb-6 text-white border-b border-[#1e1e1e] pb-3">Navegação & Geral</h3>
                  <form action={async (formData) => {
                    setSaving(true)
                    const data = Object.fromEntries(formData)
                    await updatePortfolioConfig(data)
                    setSaving(false)
                    alert('✅ Geral do Portfólio salvo!')
                  }} className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag de Navegação</label>
                        <input name="nav_tag" defaultValue={initialData.portfolioConfig.nav_tag} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Texto Botão Nav</label>
                        <input name="nav_cta" defaultValue={initialData.portfolioConfig.nav_cta} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                      </div>
                    </div>
                    <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
                      {saving ? 'Salvando...' : 'Salvar Geral'}
                    </button>
                  </form>
                </div>

                <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8">
                  <h3 className="font-syne font-bold text-[1rem] mb-6 text-white border-b border-[#1e1e1e] pb-3">Hero do Portfólio</h3>
                  <form action={async (formData) => {
                    setSaving(true)
                    const data = Object.fromEntries(formData)
                    await updatePortfolioConfig(data)
                    setSaving(false)
                    alert('✅ Hero do Portfólio salvo!')
                  }} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Badge</label>
                      <input name="hero_badge" defaultValue={initialData.portfolioConfig.hero_badge} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">H1 Linha 1</label>
                        <input name="hero_h1_line1" defaultValue={initialData.portfolioConfig.hero_h1_line1} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">H1 Linha 2</label>
                        <input name="hero_h1_line2" defaultValue={initialData.portfolioConfig.hero_h1_line2} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Subtítulo</label>
                      <textarea name="hero_sub" defaultValue={initialData.portfolioConfig.hero_sub} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b] min-h-[100px]" />
                    </div>
                    <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
                      {saving ? 'Salvando...' : 'Salvar Hero'}
                    </button>
                  </form>
                </div>
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
                    {initialData.leads.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-[#666]">Nenhum lead recebido ainda.</td>
                      </tr>
                    ) : (
                      initialData.leads.map((lead: any) => (
                        <tr key={lead.id} className="border-b border-[#1e1e1e] text-[#ccc] hover:bg-[#1a1a1a] transition-colors">
                          <td className="p-4 text-[#666]">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</td>
                          <td className="p-4 font-medium">{lead.name}</td>
                          <td className="p-4">{lead.phone}</td>
                          <td className="p-4">
                            <a 
                              href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                              target="_blank" 
                              className="text-[#25d366] border border-[#25d366] rounded-[4px] px-2 py-1 text-[0.7rem] hover:bg-[#25d36610] transition-all"
                            >
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeSection === 'portfolio' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-7">
                <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Portfólio</h1>
                <p className="text-[#666] text-[0.9rem] -mt-1">Projetos exibidos na landing page</p>
              </div>
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8 max-w-[800px]">
                <form action={async (formData) => {
                  setSaving(true)
                  await updateSiteConfig(Object.fromEntries(formData))
                  setSaving(false)
                  alert('✅ Títulos do Portfólio salvos!')
                }} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag da Seção</label>
                    <input name="section_portfolio_tag" defaultValue={initialData.config.section_portfolio_tag} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título da Seção</label>
                    <input name="section_portfolio_title" defaultValue={initialData.config.section_portfolio_title} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
                    {saving ? 'Salvando...' : 'Salvar Títulos'}
                  </button>
                </form>
              </div>
            </section>
          )}

          {activeSection === 'processo' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-7">
                <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Processo</h1>
                <p className="text-[#666] text-[0.9rem] -mt-1">Etapas do "Como funciona"</p>
              </div>
              <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8 max-w-[800px]">
                <form action={async (formData) => {
                  setSaving(true)
                  await updateSiteConfig(Object.fromEntries(formData))
                  setSaving(false)
                  alert('✅ Títulos do Processo salvos!')
                }} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag da Seção</label>
                    <input name="section_processo_tag" defaultValue={initialData.config.section_processo_tag} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título da Seção</label>
                    <input name="section_processo_title" defaultValue={initialData.config.section_processo_title} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
                    {saving ? 'Salvando...' : 'Salvar Títulos'}
                  </button>
                </form>
              </div>
            </section>
          )}

          {['para-quem', 'diferenciais', 'cta'].includes(activeSection) && (
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
