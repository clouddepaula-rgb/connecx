'use client'
import { updatePortfolioConfig } from '../../actions'

export default function PrivatePortfolioSection({ portfolioConfig, saving, setSaving }: any) {
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
            <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 mt-2 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : 'Salvar Hero'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
