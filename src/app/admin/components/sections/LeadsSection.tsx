'use client'

export default function LeadsSection({ leads }: any) {
  return (
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
              <th className="p-4 font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#666]">Nenhum lead recebido ainda.</td>
              </tr>
            ) : (
              leads.map((lead: any) => (
                <tr key={lead.id} className="border-b border-[#1e1e1e] text-[#ccc] hover:bg-[#1a1a1a] transition-colors">
                  <td className="p-4 text-[#666]">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4 font-medium">{lead.name}</td>
                  <td className="p-4 font-mono">{lead.phone}</td>
                  <td className="p-4">
                    <a 
                      href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} 
                      target="_blank" 
                      className="text-[#25d366] border border-[#25d366] rounded-[4px] px-3 py-1 text-[0.7rem] hover:bg-[#25d36610] transition-all inline-block"
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
  )
}
