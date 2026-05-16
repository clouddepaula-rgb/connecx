🚀 Guia: Deploy Automático (GitHub + Netlify)
Este processo permite que, toda vez que você der um git push, seu site seja atualizado automaticamente em segundos.

Passo 1: Preparação Local (Git)
Certifique-se de que o seu projeto está rastreado pelo Git. No terminal da pasta do projeto:

Inicializar o Git: git init
Criar o arquivo .gitignore: Garanta que pastas pesadas como node_modules ou arquivos sensíveis como .env não sejam enviados.
Adicionar arquivos: git add .
Fazer o primeiro commit: git commit -m "Initial commit"
Passo 2: Enviar para o GitHub
Vá ao seu GitHub e crie um Novo Repositório (New).
Dê um nome e clique em Create repository (não precisa marcar README ou License se já tiver no PC).
No seu computador, copie os comandos que o GitHub mostrar para "push an existing repository":
powershell
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git branch -M main
git push -u origin main
Passo 3: Conectar na Netlify (Configuração Única)
Faça login na Netlify.
Clique em Add new site > Import an existing project.
Escolha GitHub. Na primeira vez, você precisará autorizar a Netlify a acessar seus repositórios.
Selecione o projeto desejado.
Configurações de Build:
Framework: A Netlify detecta automaticamente (Next.js, Vite, React, etc.).
Build Command: Geralmente npm run build.
Publish Directory: .next, dist ou out (depende do framework).
Variáveis de Ambiente: Se o seu projeto usa Supabase ou APIs externas, clique em Environment variables e adicione as chaves (ex: NEXT_PUBLIC_SUPABASE_URL).
Clique em Deploy site.
Passo 4: O Fluxo de Atualização (Real-time)
A partir de agora, você esquece o painel da Netlify. Sempre que quiser atualizar o site "ao vivo":

Salve suas alterações no código.
Prepare para envio: git add .
Descreva o que mudou: git commit -m "descrição da melhoria"
Envie para as nuvens: git push
O que acontece por baixo dos panos? O GitHub recebe o código ➡️ A Netlify percebe a mudança ➡️ Ela reconstrói o site (Build) ➡️ O site é atualizado automaticamente na URL pública.

💡 Dicas de Ouro para seus Projetos:
Netlify.toml: Sempre que possível, adicione o arquivo netlify.toml na raiz (como fizemos neste projeto). Ele serve como um "manual de instruções" fixo para a Netlify, evitando erros de configuração manual no painel.
Branches de Teste: Se o projeto for grande, você pode criar uma "branch" para testar coisas novas (git checkout -b testes). A Netlify criará um link de "Preview" só para essa versão, sem mexer no site oficial.
Domínio Personalizado: No painel da Netlify, em Domain settings, você pode conectar um domínio .com ou .com.br facilmente e ela já gera o certificado SSL (cadeado de segurança) de graça.
Agora você tem o superpoder de atualizar qualquer site apenas com um comando no terminal! ⚡