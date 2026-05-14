import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ConnecxDB } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TargetCards from '@/components/TargetCards'
import Process from '@/components/Process'
import Differentials from '@/components/Differentials'
import Footer from '@/components/Footer'
import Schema from '@/components/Schema'

// Dynamic imports for heavy components
const Portfolio = dynamic(() => import('@/components/Portfolio'), {
  loading: () => <div className="h-[600px] bg-bg-primary animate-pulse rounded-radius mx-6" />,
})

const CtaFinal = dynamic(() => import('@/components/CtaFinal'))

export async function generateMetadata(): Promise<Metadata> {
  const config = await ConnecxDB.getSiteConfig()
  
  return {
    title: config?.meta_title || "Connecx — Sites Premium para Seu Negócio",
    description: config?.meta_description || "Sites sob medida para restaurantes, micro e grandes empresas.",
    metadataBase: new URL('https://connecx.com.br'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: config?.meta_title || "Connecx — Sites Premium para Seu Negócio",
      description: config?.meta_description || "Sites sob medida para restaurantes, micro e grandes empresas.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        }
      ],
      type: 'website',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: config?.meta_title,
      description: config?.meta_description,
      images: ['/og-image.png'],
    }
  }
}

export const revalidate = 3600

export default async function Home() {
  const [config, targetCards, processSteps, differentials, projects] = await Promise.all([
    ConnecxDB.getSiteConfig(),
    ConnecxDB.getTargetCards(),
    ConnecxDB.getProcessSteps(),
    ConnecxDB.getDifferentials(),
    ConnecxDB.getPortfolioProjects(),
  ])

  const siteConfig = config || {}

  return (
    <>
      <Schema />
      <main className="min-h-screen">
        <Navbar config={siteConfig} />
        <Hero config={siteConfig} />
        <TargetCards cards={targetCards} config={siteConfig} />
        <Portfolio projects={projects} config={siteConfig} />
        <Process steps={processSteps} config={siteConfig} />
        <Differentials diffs={differentials} config={siteConfig} />
        <CtaFinal config={siteConfig} />
        <Footer config={siteConfig} />
      </main>
    </>
  )
}
