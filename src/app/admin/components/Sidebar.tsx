'use client'

import Link from 'next/link'
import { logout } from '../actions'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'geral', label: 'Configurações Gerais', icon: '⚙️' },
  { id: 'hero', label: 'Hero', icon: '🚀' },
  { id: 'para-quem', label: 'Para Quem', icon: '🎯' },
  { id: 'portfolio', label: 'Portfólio', icon: '💼' },
  { id: 'processo', label: 'Processo', icon: '🔄' },
  { id: 'diferenciais', label: 'Diferenciais', icon: '💎' },
  { id: 'cta', label: 'CTA Final', icon: '📣' },
  { id: 'leads', label: 'Leads', icon: '📬' },
]

export default function Sidebar({ activeSection, onSectionChange }: { activeSection: string, onSectionChange: (id: string) => void }) {
  return (
    <aside className="bg-[#101010] border-r border-[#1e1e1e] flex flex-col sticky top-0 h-screen overflow-y-auto w-[260px] max-md:hidden">
      <div className="flex items-center justify-between p-5 border-b border-[#1e1e1e]">
        <Link href="/" className="font-syne text-[1.1rem] font-extrabold text-white tracking-[-0.03em]">
          connecx<span className="text-[#ff6b2b]">admin</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex items-center gap-3 bg-none border-none text-[0.9rem] font-medium p-2.5 rounded-[6px] cursor-pointer text-left transition-all w-full
              ${activeSection === item.id 
                ? 'bg-[rgba(255,107,43,0.12)] text-[#ff6b2b]' 
                : 'text-[#666] hover:bg-[#141414] hover:text-white'}`}
          >
            <span className="text-[1rem]">{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-[#1e1e1e] flex gap-2">
        <Link href="/" target="_blank" className="bg-transparent border border-[#1e1e1e] text-[#666] hover:border-[#2a2a2a] hover:text-white rounded-[6px] text-[0.8rem] font-medium p-2 transition-all flex items-center">
          ← Ver site
        </Link>
        <button 
          onClick={() => logout()}
          className="bg-transparent border border-[#1e1e1e] text-[#666] hover:border-[#e53e3e] hover:text-[#e53e3e] rounded-[6px] text-[0.8rem] font-medium p-2 transition-all"
        >
          Sair
        </button>
      </div>
    </aside>
  )
}
