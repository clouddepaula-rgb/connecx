'use client'
import { updateSiteConfig, deletePortfolioProject } from '../../actions'

export default function PortfolioSection({ config, projects, saving, setSaving }: any) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-7">
        <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Portfólio</h1>
        <p className="text-[#666] text-[0.9rem] -mt-1">Projetos exibidos na landing page</p>
      </div>
      
      <div className="flex flex-col gap-8 max-w-[800px]">
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8">
          <h3 className="font-syne font-bold text-[1rem] mb-6 text-white border-b border-[#1e1e1e] pb-3">Títulos da Seção</h3>
          <form action={async (formData) => {
            setSaving(true)
            await updateSiteConfig(Object.fromEntries(formData))
            setSaving(false)
            alert('✅ Títulos do Portfólio salvos!')
          }} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag da Seção</label>
                <input name="section_portfolio_tag" defaultValue={config.section_portfolio_tag} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título da Seção</label>
                <input name="section_portfolio_title" defaultValue={config.section_portfolio_title} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
            </div>
            <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 hover:bg-[#ff8c55] transition-colors">Salvar Títulos</button>
          </form>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="font-syne font-bold text-[1rem] text-white">Gerenciar Projetos</h3>
            <button className="bg-[#ff6b2b] text-white text-[0.8rem] font-bold px-4 py-1.5 rounded-[6px] hover:bg-[#ff8c55]">Adicionar Projeto</button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {projects.map((project: any) => (
              <div key={project.id} className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-6 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[40px] bg-[#1a1a1a] rounded-[4px] border border-[#1e1e1e] flex items-center justify-center text-[1.2rem]">🖼️</div>
                  <div>
                    <strong className="block text-white text-[0.9rem]">{project.title}</strong>
                    <span className="text-[#666] text-[0.75rem]">{project.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-transparent border border-[#1e1e1e] text-[#666] hover:text-white rounded-[4px] px-3 py-1.5 transition-all text-[0.75rem]">Editar</button>
                  <button 
                    onClick={async () => {
                      if(confirm('Excluir este projeto?')) {
                        setSaving(true)
                        await deletePortfolioProject(project.id)
                        setSaving(false)
                        alert('✅ Projeto removido!')
                        window.location.reload()
                      }
                    }}
                    className="bg-transparent border border-[#1e1e1e] text-[#666] hover:text-[#e53e3e] rounded-[4px] px-3 py-1.5 transition-all text-[0.75rem]"
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
