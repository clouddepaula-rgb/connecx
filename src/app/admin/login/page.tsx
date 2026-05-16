'use client'

import { useState } from 'react'
import { login } from '../actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6 font-sans">
      <div className="bg-[#141414] border border-[#1e1e1e] rounded-[16px] p-10 w-full max-width-[420px] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
        <div className="font-syne text-[1.5rem] font-extrabold tracking-[-0.03em] mb-6 text-white">
          connecx<span className="text-[#ff6b2b]">admin</span>
        </div>
        
        <h2 className="font-syne text-[1.4rem] font-bold mb-1 text-white">Acesso Restrito</h2>
        <p className="text-[#666] text-[0.9rem] mb-6">Entre com sua conta para continuar</p>
        
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">E-mail</label>
            <input 
              name="email" 
              type="email" 
              placeholder="admin@connecx.dev" 
              required 
              className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white text-[0.9rem] p-2.5 outline-none focus:border-[#ff6b2b] transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.8rem] font-semibold text-[#666] uppercase tracking-[0.04em]">Senha</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-[6px] text-white text-[0.9rem] p-2.5 outline-none focus:border-[#ff6b2b] transition-colors"
            />
          </div>

          {error && <div className="text-[#e53e3e] text-[0.85rem] min-h-[1rem]">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="bg-[#ff6b2b] hover:bg-[#ff8c55] text-white rounded-[6px] font-semibold text-[0.9rem] p-2.5 transition-all transform hover:translate-y-[-1px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
