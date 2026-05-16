'use client'
import { updateSiteConfig, upsertProcessStep } from '../../actions'

export default function ProcessSection({ config, steps, saving, setSaving }: any) {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-7">
        <h1 className="font-syne text-[1.6rem] font-extrabold tracking-[-0.03em] text-white">Processo</h1>
        <p className="text-[#666] text-[0.9rem] -mt-1">Etapas do "Como funciona"</p>
      </div>
      <div className="flex flex-col gap-8 max-w-[800px]">
        <div className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-8">
          <h3 className="font-syne font-bold text-[1rem] mb-6 text-white border-b border-[#1e1e1e] pb-3">Títulos da Seção</h3>
          <form action={async (formData) => {
            setSaving(true)
            await updateSiteConfig(Object.fromEntries(formData))
            setSaving(false)
            alert('✅ Títulos do Processo salvos!')
          }} className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Tag da Seção</label>
                <input name="section_processo_tag" defaultValue={config.section_processo_tag} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Título da Seção</label>
                <input name="section_processo_title" defaultValue={config.section_processo_title} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
              </div>
            </div>
            <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-semibold rounded-[6px] py-3 hover:bg-[#ff8c55] transition-colors">Salvar Títulos</button>
          </form>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-syne font-bold text-[1rem] text-white">Etapas</h3>
          {steps.map((step: any) => (
            <div key={step.id} className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-6">
              <form action={async (formData) => {
                setSaving(true)
                await upsertProcessStep({ id: step.id, ...Object.fromEntries(formData) })
                setSaving(false)
                alert(`✅ Etapa ${step.position} atualizada!`)
              }} className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] text-[#666] uppercase tracking-[0.04em]">Passo</label>
                    <input name="position" defaultValue={step.position} type="number" className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] text-[#666] uppercase tracking-[0.04em]">Título</label>
                    <input name="title" defaultValue={step.title} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2 outline-none focus:border-[#ff6b2b]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.7rem] text-[#666] uppercase tracking-[0.04em]">Descrição</label>
                  <textarea name="description" defaultValue={step.description} className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2 outline-none focus:border-[#ff6b2b] min-h-[60px]" />
                </div>
                <button type="submit" disabled={saving} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] py-2 text-[0.8rem] hover:border-[#ff6b2b] transition-all">Salvar Etapa</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
