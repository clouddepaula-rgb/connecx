'use client'
import { updateSiteConfig } from '../../actions'

export default function CtaSection({ config, saving, setSaving }: any) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-7">
        <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">CTA Final</h1>
        <p className="text-[#666] text-[0.9rem] -mt-1">Chamada para ação no final da página</p>
      </div>
      <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8 max-w-[800px]">
        <form action={async (formData) => {
          setSaving(true)
          const result = await updateSiteConfig(Object.fromEntries(formData))
          setSaving(false)
          if (result.error) alert('❌ ' + result.error)
          else alert('✅ CTA Final salvo!')
        }} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título</label>
            <input name="cta_final_title" defaultValue={config.cta_final_title} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Subtítulo</label>
            <textarea name="cta_final_sub" defaultValue={config.cta_final_sub} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b] min-h-[100px]" />
          </div>
          <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 hover:bg-[#ff8c55] transition-colors disabled:opacity-50">
            {saving ? 'Salvando...' : 'Salvar CTA'}
          </button>
        </form>
      </div>
    </section>
  )
}
