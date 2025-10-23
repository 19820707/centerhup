# CenterHub - Marketplace Local Inteligente

Marketplace local completo construído com Next.js 14, TypeScript e Tailwind CSS. Uma plataforma que reúne lojas locais, produtos frescos e serviços do bairro num só app, promovendo o comércio local e a sustentabilidade.

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
│  ├─ api/
│  │  └─ stores/
│  │     ├─ check-slug/
│  │     │  └─ route.ts
│  │     └─ route.ts
│  ├─ store-setup/
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ Navbar.tsx
│  ├─ Hero.tsx
│  ├─ Features.tsx
│  ├─ CTA.tsx
│  ├─ Footer.tsx
│  ├─ ProfessionalSelector.tsx
│  ├─ LocalMarketplace.tsx
│  └─ MerchantDashboard.tsx
├─ public/
│  └─ logo.svg
├─ next.config.js
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json
```

## 🎨 Características

### 🏪 Marketplace Local
- **Feed "Perto de Si"** com lojas locais organizadas por proximidade
- **Carrinho multi-loja** com separação automática por loja
- **Sistema de badges** (Sustentável, Produtor Local, Zero Desperdício)
- **Filtros inteligentes** (Entrega Hoje, Retirada, Entrega Grátis)
- **Categorias organizadas** (Padaria, Hortifruti, Mercearia, Farmácia)
- **Busca de produtos** em tempo real

### 🛒 Painel do Comerciante (KDS-lite)
- **Gestão de pedidos** (Aceitar, Recusar, Marcar como Pronto)
- **Cadastro de produtos** com stock e categorias
- **Analytics básicos** (Vendas, Pedidos, Avaliações)
- **Estados de pedido** (Novo → Em Preparação → Pronto → Concluído)
- **Interface otimizada** para restaurantes e padarias

### ⚙️ Setup de Loja
- **Formulário completo** com validação Zod + react-hook-form
- **Geração automática de slug** baseado no nome da loja
- **Verificação de disponibilidade** de slug em tempo real (debounced)
- **Upload de logo e favicon** com pré-visualização instantânea
- **Seletor de tema** (Claro/Escuro/Sistema)
- **Cor primária personalizada** com live preview
- **Preview em tempo real** da identidade visual

### 🌍 Internacionalização
- **Seletor profissional** com 20+ idiomas e bandeiras
- **Sistema de tradução real** funcionando (PT/EN/ES)
- **Domínios como Amazon** com redirecionamento por país
- **Moedas e regiões** de todo o mundo
- **Detecção automática** de localização do utilizador

### 🎨 Design & UX
- **Design responsivo** com Tailwind CSS
- **Componentes modulares** em TypeScript
- **Interface moderna** e acessível
- **Performance otimizada** com Next.js 14
- **SEO otimizado** com metadados OpenGraph

## 🌐 Deploy

### Vercel (recomendado)
1. Conecte seu repositório no painel da Vercel
2. Adicione os domínios em Settings → Domains
3. Configure o DNS na Hostinger:
   - Apex: A → 76.76.21.21
   - www: CNAME → cname.vercel-dns.com

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form** - Gestão de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones modernos

## 📊 APIs Implementadas

- **GET /api/stores/check-slug** - Verificação de disponibilidade de slug
- **POST /api/stores** - Criação de loja com FormData
- **Upload simulado** de ficheiros (logo, favicon)
- **Validação completa** de dados de entrada

## 🎯 Funcionalidades Principais

### Para Clientes
- Navegação por lojas locais
- Carrinho multi-loja
- Filtros por distância e disponibilidade
- Sistema de badges de sustentabilidade
- Busca de produtos em tempo real

### Para Comerciantes
- Setup completo de loja
- Painel de gestão de pedidos
- Cadastro de produtos
- Analytics básicos
- Interface KDS-lite

### Para a Plataforma
- Sistema de tradução multi-idioma
- Seletor de domínios por país
- Validação robusta de dados
- Interface responsiva e moderna

## 📝 Próximos Passos

### 🚀 Funcionalidades Avançadas
- [ ] **App Entregador** - Gestão de entregas e rotas
- [ ] **Sistema de Pagamentos** - Integração com Stripe/Adyen
- [ ] **Geolocalização Real** - Mapas e distâncias precisas
- [ ] **Notificações Push** - Tempo real para pedidos
- [ ] **Analytics Avançados** - Heatmaps e tendências
- [ ] **Gamificação** - Pontos, badges, desafios
- [ ] **Supply Chain Local** - Catálogo B2B partilhado

### 🔧 Melhorias Técnicas
- [ ] **Base de Dados** - PostgreSQL com PostGIS
- [ ] **Autenticação** - Sistema de utilizadores
- [ ] **Upload Real** - CDN/S3 para ficheiros
- [ ] **Cache Redis** - Performance otimizada
- [ ] **Testes** - Unitários e integração
- [ ] **CI/CD** - GitHub Actions

### 📱 Mobile & PWA
- [ ] **App Mobile** - React Native/Flutter
- [ ] **PWA** - Funcionalidade offline
- [ ] **Push Notifications** - Notificações nativas
- [ ] **Geolocalização** - GPS e mapas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎉 Agradecimentos

- Next.js team pela excelente framework
- Tailwind CSS pela simplicidade no styling
- Comunidade React pela inspiração e recursos