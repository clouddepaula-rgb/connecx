'use client'
import { useState } from 'react'
import { updatePortfolioConfig, deletePortfolioProject, upsertPortfolioProject } from '../../actions'

export default function PrivatePortfolioSection({ portfolioConfig, projects = [], saving, setSaving }: any) {
  const [editingProject, setEditingProject] = useState<any>(null)
  const [isAdding, setIsAdding] = useState(false)

  async function handleUpsert(formData: FormData) {
    setSaving(true)
    const data = Object.fromEntries(formData)
    
    const payload = {
      ...(editingProject?.id ? { id: editingProject.id } : {}),
      title: data.title,
      category: data.category,
      url_display: data.url_display,
      active: true,
      position: editingProject?.position || projects.length + 1
    }

    const result = await upsertPortfolioProject(payload)
    
    setSaving(false)
    if (result.error) {
      alert('❌ Erro: ' + result.error)
    } else {
      alert('✅ Projeto salvo com sucesso!')
      setEditingProject(null)
      setIsAdding(false)
    }
  }

  return (
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
            const result = await updatePortfolioConfig(Object.fromEntries(formData))
            setSaving(false)
            if (result.error) alert('❌ ' + result.error)
            else alert('✅ Geral do Portfólio salvo!')
          }} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag de Navegação</label>
                <input name="nav_tag" defaultValue={portfolioConfig.nav_tag} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Texto Botão Nav</label>
                <input name="nav_cta" defaultValue={portfolioConfig.nav_cta} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
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
            const result = await updatePortfolioConfig(Object.fromEntries(formData))
            setSaving(false)
            if (result.error) alert('❌ ' + result.error)
            else alert('✅ Hero do Portfólio salvo!')
          }} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Badge</label>
              <input name="hero_badge" defaultValue={portfolioConfig.hero_badge} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">H1 Linha 1</label>
                <input name="hero_h1_line1" defaultValue={portfolioConfig.hero_h1_line1} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">H1 Linha 2</label>
                <input name="hero_h1_line2" defaultValue={portfolioConfig.hero_h1_line2} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Subtítulo</label>
              <textarea name="hero_sub" defaultValue={portfolioConfig.hero_sub} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b] min-h-[100px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Botão 1 (Ver projetos)</label>
                <input name="hero_cta1" defaultValue={portfolioConfig.hero_cta1} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Botão 2 (WhatsApp)</label>
                <input name="hero_cta2" defaultValue={portfolioConfig.hero_cta2} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
            </div>
            <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : 'Salvar Hero'}
            </button>
          </form>
        </div>

        <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8">
          <h3 className="font-syne font-bold text-[1rem] mb-6 text-white border-b border-[#1e1e1e] pb-3">Estatísticas do Hero</h3>
          <form action={async (formData) => {
            setSaving(true)
            const result = await updatePortfolioConfig(Object.fromEntries(formData))
            setSaving(false)
            if (result.error) alert('❌ ' + result.error)
            else alert('✅ Estatísticas salvas!')
          }} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Stat 1 (Num/Texto)</label>
                <input name="stat1_num" defaultValue={portfolioConfig.stat1_num} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                <input name="stat1_label" defaultValue={portfolioConfig.stat1_label} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Stat 2 (Num/Texto)</label>
                <input name="stat2_num" defaultValue={portfolioConfig.stat2_num} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                <input name="stat2_label" defaultValue={portfolioConfig.stat2_label} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Stat 3 (Num/Texto)</label>
                <input name="stat3_num" defaultValue={portfolioConfig.stat3_num} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                <input name="stat3_label" defaultValue={portfolioConfig.stat3_label} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
            </div>
            <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : 'Salvar Estatísticas'}
            </button>
          </form>
        </div>

        <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8">
          <h3 className="font-syne font-bold text-[1rem] mb-6 text-white border-b border-[#1e1e1e] pb-3">Títulos das Seções</h3>
          <form action={async (formData) => {
            setSaving(true)
            const result = await updatePortfolioConfig(Object.fromEntries(formData))
            setSaving(false)
            if (result.error) alert('❌ ' + result.error)
            else alert('✅ Títulos salvos!')
          }} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-4 border-b border-[#1e1e1e] pb-4">
               <h4 className="text-white font-bold text-[0.9rem]">Stack & Habilidades</h4>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag</label>
                    <input name="skills_label" defaultValue={portfolioConfig.skills_label} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título (H2)</label>
                    <input name="skills_h2" defaultValue={portfolioConfig.skills_h2} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
               </div>
               <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Subtítulo (P)</label>
                  <textarea name="skills_p" defaultValue={portfolioConfig.skills_p} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
               </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-[#1e1e1e] pb-4">
               <h4 className="text-white font-bold text-[0.9rem]">Processo</h4>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag</label>
                    <input name="process_label" defaultValue={portfolioConfig.process_label} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título (H2)</label>
                    <input name="process_h2" defaultValue={portfolioConfig.process_h2} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4">
               <h4 className="text-white font-bold text-[0.9rem]">Contato</h4>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag</label>
                    <input name="cta_label" defaultValue={portfolioConfig.cta_label} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título (H2)</label>
                    <input name="cta_h2" defaultValue={portfolioConfig.cta_h2} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
               </div>
               <div className="flex flex-col gap-1.5">
                  <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Subtítulo (P)</label>
                  <input name="cta_p" defaultValue={portfolioConfig.cta_p} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Botão</label>
                    <input name="cta_btn" defaultValue={portfolioConfig.cta_btn} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Nota abaixo do botão</label>
                    <input name="cta_note" defaultValue={portfolioConfig.cta_note} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
               </div>
            </div>

            <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : 'Salvar Títulos'}
            </button>
          </form>
        </div>

        <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8">
          <h3 className="font-syne font-bold text-[1rem] mb-6 text-white border-b border-[#1e1e1e] pb-3">Footer & Redes Sociais</h3>
          <form action={async (formData) => {
            setSaving(true)
            const result = await updatePortfolioConfig(Object.fromEntries(formData))
            setSaving(false)
            if (result.error) alert('❌ ' + result.error)
            else alert('✅ Footer salvo!')
          }} className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">LinkedIn</label>
                <input name="social_linkedin" defaultValue={portfolioConfig.social_linkedin} placeholder="ex: linkedin.com/in/..." className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Instagram</label>
                <input name="social_instagram" defaultValue={portfolioConfig.social_instagram} placeholder="ex: instagram.com/..." className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">E-mail</label>
                <input name="social_email" defaultValue={portfolioConfig.social_email} placeholder="ex: contato@..." className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Copyright Text</label>
              <input name="footer_copy" defaultValue={portfolioConfig.footer_copy} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
            </div>
            <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : 'Salvar Footer'}
            </button>
          </form>
        </div>

        {/* Listagem e Formulário de Projeto */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="font-syne font-bold text-[1rem] text-white">Gerenciar Projetos</h3>
            {!isAdding && !editingProject && (
              <button onClick={() => setIsAdding(true)} className="bg-[#ff6b2b] text-white text-[0.8rem] font-bold px-4 py-1.5 rounded-[6px] hover:bg-[#ff8c55]">Adicionar Projeto</button>
            )}
          </div>

          {(isAdding || editingProject) && (
            <div className="bg-[#181818] border border-[#ff6b2b40] rounded-[10px] p-8 mb-4 animate-in zoom-in-95 duration-200">
              <h4 className="text-white font-bold mb-6">{isAdding ? 'Novo Projeto' : 'Editar Projeto'}</h4>
              <form action={handleUpsert} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] text-[#666] uppercase">Título</label>
                    <input name="title" defaultValue={editingProject?.title} required className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] text-[#666] uppercase">Categoria</label>
                    <input name="category" defaultValue={editingProject?.category} required className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.7rem] text-[#666] uppercase">URL do Site (Visualização)</label>
                  <input name="url_display" defaultValue={editingProject?.url_display} placeholder="ex: connecx.com.br" required className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-bold rounded-[6px] px-6 py-2.5 hover:bg-[#ff8c55] transition-all flex-1">
                    {saving ? 'Salvando...' : 'Salvar Projeto'}
                  </button>
                  <button type="button" onClick={() => { setIsAdding(false); setEditingProject(null); }} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] px-6 py-2.5 hover:bg-[#222]">Cancelar</button>
                </div>
              </form>
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-3">
            {projects.map((project: any) => (
              <div key={project.id} className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-5 flex items-center justify-between gap-6 hover:border-[#2a2a2a] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[35px] bg-[#1a1a1a] rounded-[4px] border border-[#1e1e1e] flex items-center justify-center text-[1rem]">🖼️</div>
                  <div>
                    <strong className="block text-white text-[0.85rem]">{project.title}</strong>
                    <span className="text-[#666] text-[0.7rem] uppercase tracking-wider font-semibold">{project.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingProject(project); setIsAdding(false); }} className="bg-[#1a1a1a] border border-[#1e1e1e] text-[#666] hover:text-white hover:border-[#ff6b2b] rounded-[4px] px-3 py-1.5 transition-all text-[0.7rem] font-bold">Editar</button>
                  <button 
                    onClick={async () => {
                      if(confirm(`Excluir "${project.title}"?`)) {
                        setSaving(true)
                        await deletePortfolioProject(project.id)
                        setSaving(false)
                        alert('✅ Removido!')
                      }
                    }}
                    className="bg-[#1a1a1a] border border-[#1e1e1e] text-[#666] hover:text-[#e53e3e] hover:border-[#e53e3e] rounded-[4px] px-3 py-1.5 transition-all text-[0.7rem] font-bold"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
