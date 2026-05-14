/* ========================================================
   PORTFOLIO — Gabriel de Paula
   Script: i18n, filter, scroll reveal, nav scroll
   ======================================================== */

// ─── TRANSLATIONS ────────────────────────────────────────
const i18n = {
  pt: {
    nav_tag: "Portfólio Privado",
    nav_cta: "Falar comigo",
    hero_badge: "⚡ Desenvolvedor Full Stack · Vibe Coder",
    hero_h1_line1: "Construo o digital",
    hero_h1_line2: "que outros apenas prometem.",
    hero_sub: "Gabriel de Paula. Desenvolvedor que une IA, velocidade e código real\npara entregar landing pages, apps e sistemas do zero — sem enrolação.",
    hero_cta1: "Ver projetos →",
    hero_cta2: "Falar no WhatsApp",
    stat1_num: "20+",
    stat1_label: "Projetos entregues",
    stat2_num: "5",
    stat2_label: "IAs no processo",
    stat3_num: "3x",
    stat3_label: "Velocidade tradicional",
    footer_copy: "© 2026 Gabriel de Paula · Connecx",
    code_status: "Rodando em produção",
    skills_label: "Stack & Habilidades",
    skills_h2: "Tecnologia como vantagem competitiva.",
    skills_p: "Cada ferramenta aqui tem um propósito. Usadas juntas, entregam resultado acima do padrão.",
    sk1_title: "Vibe Coding & IA",
    sk1_desc: "Desenvolvimento em fluxo com IAs: Lovable, Claude Code, Google Antigravity. Velocidade 3x acima do padrão tradicional.",
    sk2_title: "Landing Pages & Sites",
    sk2_desc: "Landing pages de alta conversão, sites institucionais e portfólios para diferentes nichos — do zero ao ar.",
    sk3_title: "Aplicações Full Stack",
    sk3_desc: "Apps completos com banco de dados, autenticação, real-time e processos de segurança implementados com IA.",
    sk4_title: "Vídeos UGC",
    sk4_desc: "Criação de criativos em UGC — vídeos autênticos que vendem e geram conexão real com a audiência.",
    ai_bar_label: "IAs no processo:",
    proj_label: "Projetos",
    proj_h2: "O que já foi construído.",
    proj_sub: "Clique em um projeto para ver ao vivo.",
    visit_live: "Visitar ao vivo ↗",
    tab4_sub: "Aplicação · Segurança",
    tab5_name: "Criativos UGC",
    tab5_sub: "Vídeo · Conversão",
    ugc_preview_text: "Vídeo UGC · Criativo Autêntico",
    proj_p: "Trabalho real. Entregue de verdade. Sem mock, sem template genérico.",
    filter_all: "Todos",
    filter_landing: "Landing Pages",
    filter_app: "Aplicações",
    filter_dash: "Dashboards",
    filter_ugc: "UGC",
    p1_desc: "Dashboard de monitoramento de arbitragem USDT/BRL em tempo real. Integração com múltiplas exchanges, alertas automáticos e histórico de spreads.",
    p2_desc: "Landing page completa para restaurante japonês. Cardápio digital, reservas online e SEO local otimizado para Google Maps.",
    p3_desc: "Site institucional completo com tradução PT/EN/ES, animações premium, seções de serviços e CTA de alta conversão.",
    p4_desc: "Aplicação web completa com banco de dados, autenticação JWT, Row Level Security, 2FA e logs de auditoria implementados com IA.",
    p5_title: "Criativos UGC — Produto Digital",
    p5_desc: "Vídeos UGC autênticos para anúncios e redes sociais. Roteiro, gravação e edição focados em conversão e conexão real com a audiência.",
    delivered: "Entregue · 2026",
    placeholder: "Novo projeto em breve",
    process_label: "Processo",
    process_h2: "Da ideia ao ar — sem burocracia.",
    step1_title: "Briefing",
    step1_desc: "Você apresenta a ideia. Direto ao ponto, sem formulário de 10 páginas.",
    step2_title: "Estrutura",
    step2_desc: "Decisão técnica e estratégica rápida. Stack certa para o seu caso.",
    step3_title: "Construção",
    step3_desc: "Desenvolvimento com IA em fluxo. Velocidade e qualidade no mesmo pacote.",
    step4_title: "Entrega",
    step4_desc: "Projeto no ar, testado e pronto para gerar resultado.",
    cta_label: "Contato",
    cta_h2: "Gostou do que viu?\nVamos construir juntos.",
    cta_p: "Me conta sua ideia. Orçamento rápido, resposta no mesmo dia.",
    cta_btn: "Falar no WhatsApp →",
    cta_note: "Resposta rápida. Orçamento sem enrolação.",
    view_project: "Ver projeto →",
  },
  en: {
    nav_tag: "Private Portfolio",
    nav_cta: "Talk to me",
    hero_badge: "⚡ Full Stack Developer · Vibe Coder",
    hero_h1_line1: "I build the digital",
    hero_h1_line2: "others only promise.",
    hero_sub: "Gabriel de Paula. Developer combining AI, speed and real code\nto deliver landing pages, apps and systems from scratch — no nonsense.",
    hero_cta1: "See projects →",
    hero_cta2: "Chat on WhatsApp",
    stat1: "Projects delivered",
    stat2: "AIs in the process",
    stat3: "Traditional speed",
    code_status: "Running in production",
    skills_label: "Stack & Skills",
    skills_h2: "Technology as a competitive advantage.",
    skills_p: "Every tool here has a purpose. Used together, they deliver above-standard results.",
    sk1_title: "Vibe Coding & AI",
    sk1_desc: "Flow development with AIs: Lovable, Claude Code, Google Antigravity. 3x faster than traditional development.",
    sk2_title: "Landing Pages & Sites",
    sk2_desc: "High-conversion landing pages, institutional sites and portfolios for different niches — from scratch to live.",
    sk3_title: "Full Stack Applications",
    sk3_desc: "Complete apps with databases, authentication, real-time and security processes implemented with AI.",
    sk4_title: "UGC Videos",
    sk4_desc: "Creating UGC creatives — authentic videos that sell and generate real connection with the audience.",
    ai_bar_label: "AIs in the process:",
    proj_label: "Projects",
    proj_h2: "What has already been built.",
    proj_sub: "Click a project to see it live.",
    visit_live: "Visit live ↗",
    tab4_sub: "Application · Security",
    tab5_name: "UGC Creatives",
    tab5_sub: "Video · Conversion",
    ugc_preview_text: "UGC Video · Authentic Creative",
    proj_p: "Real work. Actually delivered. No mock, no generic template.",
    filter_all: "All",
    filter_landing: "Landing Pages",
    filter_app: "Applications",
    filter_dash: "Dashboards",
    filter_ugc: "UGC",
    p1_desc: "Real-time USDT/BRL arbitrage monitoring dashboard. Multi-exchange integration, automatic alerts and spread history.",
    p2_desc: "Complete landing page for a Japanese restaurant. Digital menu, online reservations and local SEO optimized for Google Maps.",
    p3_desc: "Complete institutional site with PT/EN/ES translation, premium animations, service sections and high-conversion CTA.",
    p4_desc: "Complete web application with database, JWT authentication, Row Level Security, 2FA and audit logs implemented with AI.",
    p5_title: "UGC Creatives — Digital Product",
    p5_desc: "Authentic UGC videos for ads and social media. Scripting, recording and editing focused on conversion and real audience connection.",
    delivered: "Delivered · 2026",
    placeholder: "New project coming soon",
    process_label: "Process",
    process_h2: "From idea to live — no bureaucracy.",
    step1_title: "Briefing",
    step1_desc: "You present the idea. Straight to the point, no 10-page form.",
    step2_title: "Structure",
    step2_desc: "Fast technical and strategic decision. Right stack for your case.",
    step3_title: "Build",
    step3_desc: "Flow development with AI. Speed and quality in the same package.",
    step4_title: "Delivery",
    step4_desc: "Project live, tested and ready to generate results.",
    cta_label: "Contact",
    cta_h2: "Liked what you saw?\nLet's build together.",
    cta_p: "Tell me your idea. Quick quote, same-day response.",
    cta_btn: "Chat on WhatsApp →",
    cta_note: "Fast response. No-nonsense quote.",
    view_project: "View project →",
  },
  es: {
    nav_tag: "Portafolio Privado",
    nav_cta: "Hablar conmigo",
    hero_badge: "⚡ Desarrollador Full Stack · Vibe Coder",
    hero_h1_line1: "Construyo lo digital",
    hero_h1_line2: "que otros solo prometen.",
    hero_sub: "Gabriel de Paula. Desarrollador que une IA, velocidad y código real\npara entregar landing pages, apps y sistemas desde cero — sin rodeos.",
    hero_cta1: "Ver proyectos →",
    hero_cta2: "Chatear en WhatsApp",
    stat1: "Proyectos entregados",
    stat2: "IAs en el proceso",
    stat3: "Velocidad tradicional",
    code_status: "Corriendo en producción",
    skills_label: "Stack y Habilidades",
    skills_h2: "Tecnología como ventaja competitiva.",
    skills_p: "Cada herramienta aquí tiene un propósito. Usadas juntas, entregan resultados por encima del estándar.",
    sk1_title: "Vibe Coding & IA",
    sk1_desc: "Desarrollo en flujo con IAs: Lovable, Claude Code, Google Antigravity. 3x más rápido que el desarrollo tradicional.",
    sk2_title: "Landing Pages & Sitios",
    sk2_desc: "Landing pages de alta conversión, sitios institucionales y portafolios para diferentes nichos — desde cero hasta en vivo.",
    sk3_title: "Aplicaciones Full Stack",
    sk3_desc: "Apps completas con base de datos, autenticación, tiempo real y procesos de seguridad implementados con IA.",
    sk4_title: "Videos UGC",
    sk4_desc: "Creación de creativos UGC — videos auténticos que venden y generan conexión real con la audiencia.",
    ai_bar_label: "IAs en el proceso:",
    proj_label: "Proyectos",
    proj_h2: "Lo que ya fue construido.",
    proj_sub: "Haz clic en un proyecto para verlo en vivo.",
    visit_live: "Visitar en vivo ↗",
    tab4_sub: "Aplicación · Seguridad",
    tab5_name: "Creativos UGC",
    tab5_sub: "Video · Conversión",
    ugc_preview_text: "Video UGC · Creativo Auténtico",
    proj_p: "Trabajo real. Entregado de verdad. Sin mock, sin plantilla genérica.",
    filter_all: "Todos",
    filter_landing: "Landing Pages",
    filter_app: "Aplicaciones",
    filter_dash: "Dashboards",
    filter_ugc: "UGC",
    p1_desc: "Dashboard de monitoreo de arbitraje USDT/BRL en tiempo real. Integración con múltiples exchanges, alertas automáticas e historial de spreads.",
    p2_desc: "Landing page completa para restaurante japonés. Menú digital, reservas en línea y SEO local optimizado para Google Maps.",
    p3_desc: "Sitio institucional completo con traducción PT/EN/ES, animaciones premium, secciones de servicios y CTA de alta conversión.",
    p4_desc: "Aplicación web completa con base de datos, autenticación JWT, Row Level Security, 2FA y logs de auditoría implementados con IA.",
    p5_title: "Creativos UGC — Producto Digital",
    p5_desc: "Videos UGC auténticos para anuncios y redes sociales. Guión, grabación y edición enfocados en conversión y conexión real con la audiencia.",
    delivered: "Entregado · 2026",
    placeholder: "Nuevo proyecto próximamente",
    process_label: "Proceso",
    process_h2: "De la idea al aire — sin burocracia.",
    step1_title: "Briefing",
    step1_desc: "Presentas la idea. Directo al grano, sin formulario de 10 páginas.",
    step2_title: "Estructura",
    step2_desc: "Decisión técnica y estratégica rápida. Stack correcta para tu caso.",
    step3_title: "Construcción",
    step3_desc: "Desarrollo con IA en flujo. Velocidad y calidad en el mismo paquete.",
    step4_title: "Entrega",
    step4_desc: "Proyecto en vivo, probado y listo para generar resultados.",
    cta_label: "Contacto",
    cta_h2: "¿Te gustó lo que viste?\nConstruyamos juntos.",
    cta_p: "Cuéntame tu idea. Presupuesto rápido, respuesta el mismo día.",
    cta_btn: "Chatear en WhatsApp →",
    cta_note: "Respuesta rápida. Presupuesto sin rodeos.",
    view_project: "Ver proyecto →",
  }
};

// ─── LANGUAGE SWITCHER ────────────────────────────────────
let currentLang = 'pt';

function applyLang(lang) {
  currentLang = lang;
  const t = i18n[lang];
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key].replace(/\n/g, '<br>');
      }
    }
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  localStorage.setItem('portfolio_lang', lang);
}

document.getElementById('langSwitcher').addEventListener('click', e => {
  const btn = e.target.closest('.lang-btn');
  if (btn) applyLang(btn.getAttribute('data-lang'));
});

// Init lang
const savedLang = localStorage.getItem('portfolio_lang') || 'pt';
applyLang(savedLang);

// ─── NAV: SCROLL (idêntico à home) ──────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── NAV: LOGO-TEXT dinâmico (via Supabase config) ──────
// O logo-text será preenchido após o loadDynamicPortfolio se tiver config
// Fallback estático:
const navLogoEl = document.getElementById('navLogoText');
if (navLogoEl && !navLogoEl.innerHTML) {
  navLogoEl.innerHTML = 'gabriel<span>depaula</span>';
}

// ─── NAV: MOBILE MENU (hamburguer, idêntico à home) ──────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans  = navToggle.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)'   : '';
    spans[1].style.opacity   = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
}

// ─── SCROLL REVEAL ────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// ─── INIT DINÂMICO ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadDynamicPortfolio();
});

async function loadDynamicPortfolio() {
  const [config, skills, processSteps, projects] = await Promise.all([
    ConnecxDB.getPortfolioConfig(),
    ConnecxDB.getPortfolioSkills(),
    ConnecxDB.getPortfolioProcess(),
    ConnecxDB.getPortfolioPrivado()
  ]);

  if (config) {
    // Sobrescreve PT com dados do CMS
    Object.keys(config).forEach(key => {
      if (i18n.pt[key] !== undefined) {
        i18n.pt[key] = config[key];
      }
    });
    // Trata casos específicos de nomes diferentes entre DB e i18n
    if (config.footer_copy) i18n.pt.footer_copy = config.footer_copy;

    // Aplica links sociais no footer
    if (config.social_linkedin) {
      const el = document.getElementById('footerLinkedin');
      if (el) el.href = config.social_linkedin.startsWith('http') ? config.social_linkedin : 'https://' + config.social_linkedin;
    }
    if (config.social_instagram) {
      const el = document.getElementById('footerInstagram');
      if (el) el.href = config.social_instagram.startsWith('http') ? config.social_instagram : 'https://' + config.social_instagram;
    }
    if (config.social_email) {
      const el = document.getElementById('footerEmail');
      if (el) {
        let mail = config.social_email;
        if (!mail.startsWith('mailto:') && mail.includes('@')) mail = 'mailto:' + mail;
        el.href = mail;
      }
    }
  }
    
  if (skills && skills.length > 0) {
    skills.forEach((s, i) => {
      i18n.pt[`sk${i+1}_title`] = s.title;
      i18n.pt[`sk${i+1}_desc`] = s.description;
    });
    renderSkills(skills);
  }

  if (processSteps && processSteps.length > 0) {
    processSteps.forEach((s, i) => {
      i18n.pt[`step${i+1}_title`] = s.title;
      i18n.pt[`step${i+1}_desc`] = s.description;
    });
    renderProcess(processSteps);
  }

  if (projects && projects.length > 0) {
    renderProjects(projects);
  }

  // Aplica lang novamente no final para garantir que todas as chaves atualizadas (config, skills, process) entrem
  applyLang(currentLang);
}

function renderSkills(skills) {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  grid.innerHTML = skills.map((s, i) => `
    <div class="skill-card reveal" style="--d:${(i * 0.05).toFixed(2)}s">
      <div class="skill-icon">${s.icon}</div>
      <h3 data-i18n="sk${i+1}_title">${s.title}</h3>
      <p data-i18n="sk${i+1}_desc">${s.description}</p>
      <div class="skill-tools">
        ${s.tools.split(',').map(t => `<span>${t.trim()}</span>`).join('')}
      </div>
    </div>
  `).join('');
  // Re-observa elementos novos
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderProcess(steps) {
  const container = document.getElementById('processSteps');
  if (!container) return;
  container.innerHTML = steps.map((s, i) => `
    <div class="process-step reveal" style="--d:${(i * 0.05).toFixed(2)}s">
      <div class="step-num">${s.step_num}</div>
      <h4 data-i18n="step${i+1}_title">${s.title}</h4>
      <p data-i18n="step${i+1}_desc">${s.description}</p>
    </div>
    ${i < steps.length - 1 ? '<div class="process-arrow">→</div>' : ''}
  `).join('');
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function renderProjects(projects) {
  const tabsContainer = document.getElementById('projectTabs');
  if (!tabsContainer) return;

  // Guarda os dados globalmente
  window.portfolioProjects = projects;

  // Renderiza as tabs
  tabsContainer.innerHTML = projects.map((p, i) => `
    <button class="project-tab ${i === 0 ? 'active' : ''}" data-project="${i}">
      <span class="tab-num">${(i + 1).toString().padStart(2, '0')}</span>
      <span class="tab-info">
        <strong>${p.title}</strong>
        <small>${p.subtitle || p.category || ''}</small>
      </span>
    </button>
  `).join('');

  // Inicializa tabs com iframe (igual à home)
  setupProjectTabs(projects);

  // Carrega o primeiro projeto automaticamente
  if (projects.length > 0) {
    loadProjectIframe(projects[0]);
  }
}

function loadProjectIframe(project) {
  const iframe  = document.getElementById('portfolioIframe');
  const loader  = document.getElementById('iframeLoader');
  const urlEl   = document.getElementById('browserUrl');
  const visitBtn = document.getElementById('browserVisitBtn');
  if (!iframe) return;

  const url = project.url_href || project.url_display || '';
  const displayUrl = project.url_display || url.replace(/^https?:\/\//, '');

  if (urlEl) urlEl.textContent = displayUrl;

  if (visitBtn) {
    if (url) {
      visitBtn.href = url.startsWith('http') ? url : 'https://' + url;
      visitBtn.style.display = '';
    } else {
      visitBtn.style.display = 'none';
    }
  }

  if (url && loader) {
    loader.style.display = 'flex';
    iframe.style.opacity = '0';
    iframe.src = url.startsWith('http') ? url : 'https://' + url;
  }
}

function setupProjectTabs(projects) {
  const tabs    = document.querySelectorAll('.project-tab');
  const iframe  = document.getElementById('portfolioIframe');
  const loader  = document.getElementById('iframeLoader');

  // Evento de load do iframe
  if (iframe && !iframe._listenerAdded) {
    iframe._listenerAdded = true;
    iframe.addEventListener('load', () => {
      if (loader) loader.style.display = 'none';
      iframe.style.opacity = '1';
      scalePortfolioIframe();
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-project'));
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const project = (projects || window.portfolioProjects)?.[idx];
      if (project) loadProjectIframe(project);
    });
  });
}

// Scale do iframe — idêntico ao da home
function scalePortfolioIframe() {
  const wrapper = document.querySelector('.iframe-wrapper');
  const iframe  = document.getElementById('portfolioIframe');
  if (!wrapper || !iframe) return;

  const wrapperWidth  = wrapper.clientWidth;
  const wrapperHeight = wrapper.clientHeight;

  if (wrapperWidth < 600) {
    iframe.style.width     = '100%';
    iframe.style.height    = '100%';
    iframe.style.transform = 'scale(1)';
  } else {
    const baseWidth = 1280;
    const scale = wrapperWidth / baseWidth;
    iframe.style.width     = '1280px';
    iframe.style.transform = `scale(${scale})`;
    if (scale > 0) iframe.style.height = `${wrapperHeight / scale}px`;
  }
}

window.addEventListener('load', scalePortfolioIframe);
window.addEventListener('resize', scalePortfolioIframe);


// ─── SMOOTH SCROLL ───────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
