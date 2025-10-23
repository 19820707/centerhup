# Centerhup - Landing Page

Landing page moderna e responsiva construída com Next.js 14, TypeScript e Tailwind CSS.

## 🚀 Como executar

### Desenvolvimento local
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Abrir http://localhost:3000
```

### Build para produção
```bash
npm run build
npm start
```

## 📁 Estrutura do projeto

```
centerhup/
├─ app/
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ Navbar.tsx
│  ├─ Hero.tsx
│  ├─ Features.tsx
│  ├─ CTA.tsx
│  └─ Footer.tsx
├─ public/
│  └─ logo.svg
├─ next.config.js
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

## 🎨 Características

- **Design responsivo** com Tailwind CSS
- **Componentes modulares** em TypeScript
- **Formulário funcional** com estados de loading/erro
- **SEO otimizado** com metadados OpenGraph
- **Performance otimizada** com Next.js 14

## 🌐 Deploy

### Vercel (recomendado)
1. Conecte seu repositório no painel da Vercel
2. Adicione os domínios em Settings → Domains
3. Configure o DNS na Hostinger:
   - Apex: A → 76.76.21.21
   - www: CNAME → cname.vercel-dns.com

## 📝 Próximos passos

- [ ] Integrar formulário com serviço de email (Resend/Mailchimp)
- [ ] Adicionar seção de preços
- [ ] Criar blog para SEO
- [ ] Implementar páginas de Termos e Privacidade