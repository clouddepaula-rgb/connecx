'use client'

export default function Topbar({ title }: { title: string }) {
  return (
    <header className="h-[60px] bg-[#101010] border-b border-[#1e1e1e] flex items-center gap-4 px-6 sticky top-0 z-[100]">
      <button className="hidden max-md:flex bg-none border-none text-[#666] cursor-pointer text-[1.2rem] p-1">☰</button>
      <span className="font-syne font-bold text-[1rem] flex-1 text-white">{title}</span>
      <div className="flex items-center gap-2 text-[0.8rem] text-[#666]">
        <span className="w-[7px] h-[7px] rounded-full bg-[#38a169] shadow-[0_0_6px_#38a169]"></span>
        <span className="text-white">Supabase conectado</span>
      </div>
    </header>
  )
}
