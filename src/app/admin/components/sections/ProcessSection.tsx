'use client'
import { useState } from 'react'
import { updateSiteConfig, upsertProcessStep, deleteProcessStep } from '../../actions'

export default function ProcessSection({ config, steps, saving, setSaving }: any) {
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isAdding, setIsAdding] = useState(false)

  async function handleUpsert(formData: FormData) {
    setSaving(true)
    const data = Object.fromEntries(formData)
    const result = await upsertProcessStep({ 
      ...(editingItem?.id ? { id: editingItem.id } : {}),
      ...data 
    })
    
    setSaving(false)
    if (result.error) alert('❌ ' + result.error)
    else {
      alert('✅ Etapa salva!')
      setEditingItem(null)
      setIsAdding(false)
    }
  }

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
            alert('✅ Títulos salvos!')
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
          <div className="flex justify-between items-center">
            <h3 className="font-syne font-bold text-[1rem] text-white">Gerenciar Etapas</h3>
            {!isAdding && !editingItem && (
              <button onClick={() => setIsAdding(true)} className="bg-[#ff6b2b] text-white text-[0.8rem] font-bold px-4 py-1.5 rounded-[6px] hover:bg-[#ff8c55]">Adicionar Etapa</button>
            )}
          </div>

          {(isAdding || editingItem) && (
            <div className="bg-[#181818] border border-[#ff6b2b40] rounded-[10px] p-8 mb-4 animate-in zoom-in-95 duration-200">
              <h4 className="text-white font-bold mb-6">{isAdding ? 'Nova Etapa' : 'Editar Etapa'}</h4>
              <form action={handleUpsert} className="flex flex-col gap-5">
                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] text-[#666] uppercase">Passo #</label>
                    <input name="position" type="number" defaultValue={editingItem?.position || steps.length + 1} required className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] text-[#666] uppercase">Título</label>
                    <input name="title" defaultValue={editingItem?.title} required className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.7rem] text-[#666] uppercase">Descrição</label>
                  <textarea name="description" defaultValue={editingItem?.description} required className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white p-2.5 outline-none focus:border-[#ff6b2b] min-h-[80px]" />
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={saving} className="bg-[#ff6b2b] text-white font-bold rounded-[6px] px-6 py-2.5 hover:bg-[#ff8c55] transition-all flex-1">
                    {saving ? 'Salvando...' : 'Salvar Etapa'}
                  </button>
                  <button type="button" onClick={() => { setIsAdding(false); setEditingItem(null); }} className="bg-[#1a1a1a] border border-[#1e1e1e] text-white rounded-[6px] px-6 py-2.5 hover:bg-[#222]">Cancelar</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {steps.map((step: any) => (
              <div key={step.id} className="bg-[#141414] border border-[#1e1e1e] rounded-[10px] p-6 flex items-center justify-between gap-6 hover:border-[#2a2a2a] transition-all">
                <div className="flex items-center gap-5">
                  <div className="font-syne font-black text-[#ff6b2b] text-[1.5rem] opacity-30 w-[40px] italic">0{step.position}</div>
                  <div>
                    <strong className="block text-white text-[0.9rem]">{step.title}</strong>
                    <p className="text-[#666] text-[0.8rem] line-clamp-1">{step.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingItem(step)} className="bg-[#1a1a1a] border border-[#1e1e1e] text-[#666] hover:text-white rounded-[4px] px-3 py-1.5 text-[0.7rem] font-bold">Editar</button>
                  <button onClick={async () => {
                    if(confirm(`Excluir etapa?`)) {
                      setSaving(true)
                      await deleteProcessStep(step.id)
                      setSaving(false)
                      alert('✅ Removido!')
                    }
                  }} className="bg-[#1a1a1a] border border-[#1e1e1e] text-[#666] hover:text-[#e53e3e] rounded-[4px] px-3 py-1.5 text-[0.7rem] font-bold">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
