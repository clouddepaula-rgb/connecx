# 🛡️ Guia Padrão: Segurança Máxima (Next.js + Supabase)

Este documento define o "Padrão Ouro" para segurança em aplicações Next.js que utilizam Supabase, garantindo **zero exposição** de chaves no navegador e proteção robusta de rotas administrativas.

---

## 1. Gestão de Variáveis de Ambiente

**Nunca** use o prefixo `NEXT_PUBLIC_` para chaves sensíveis como a do Supabase, a menos que seja estritamente necessário para uso direto no browser (o que tentamos evitar).

### Arquivo `.env.local`
Sempre crie um arquivo local (ignorado pelo Git) e um `.env.example` para documentação:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-aqui
```

---

## 2. Configuração do Cliente Supabase (Server-Side)

Utilize a biblioteca `@supabase/ssr` para gerenciar cookies e sessões automaticamente no servidor.

### `src/lib/supabase/server.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('[Supabase] Variáveis de ambiente faltando.')
    return null as any
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {}
      },
    },
  })
}
```

---

## 3. Proteção de Rotas com Middleware

Utilize o `middleware.ts` na raiz do projeto para interceptar acessos e garantir que apenas usuários logados acessem o `/admin`.

### `src/middleware.ts`
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Lógica de Redirecionamento
  if (!user && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

---

## 4. Autenticação Segura via Server Actions

Evite fazer login no lado do cliente. Use *Server Actions* para que a senha e a resposta do banco fiquem protegidas no servidor.

### `src/app/admin/actions.ts`
```typescript
'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) return { error: 'Credenciais inválidas' }
  redirect('/admin')
}
```

---

## 5. Checklist de Deploy (Vercel/Netlify)

> [!IMPORTANT]
> O build do Next.js pode falhar se você não configurar as variáveis no painel da hospedagem **antes** de disparar o deploy.

1.  **Dashboard de Variáveis**: Adicione `SUPABASE_URL` e `SUPABASE_ANON_KEY`.
2.  **Remoção de Legado**: Certifique-se de que não existem pastas como `public/admin` com chaves hardcoded.
3.  **Redeploy**: Sempre peça um redeploy após alterar variáveis de ambiente para que o Next.js as capture.

---

## Benefícios deste Padrão
*   **Segurança**: Zero exposição de chaves no Console do navegador.
*   **SEO**: Páginas administrativas não são indexadas e não pesam no site principal.
*   **Escalabilidade**: Fácil de adicionar novas seções protegidas.
