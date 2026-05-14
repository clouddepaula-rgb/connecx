import Image from 'next/image'
import Link from 'next/link'

export default function Footer({ config }: { config: any }) {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-1140 mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={28} 
            height={28} 
            className="filter invert brightness-100"
          />
          <div className="font-syne font-bold text-[1.2rem] text-white tracking-tight">
            {config.logo_text || 'Connecx'}
            <span className="text-accent">{config.logo_span || 'x'}</span>
          </div>
        </Link>
        
        <span className="text-text-muted/60 text-sm">
          {config.footer_copy || `© ${new Date().getFullYear()} Connecx. Todos os direitos reservados.`}
        </span>
      </div>
    </footer>
  )
}
