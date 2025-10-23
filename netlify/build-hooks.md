# Build Hooks para Deploy Automático

## Configuração de Build Hooks

### 1. CMS Integration
Se usar um CMS (Strapi, Contentful, etc.), configure webhook para:
```
POST https://api.netlify.com/build_hooks/[BUILD_HOOK_ID]
```

### 2. GitHub Actions
```yaml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Trigger Netlify Deploy
        run: |
          curl -X POST -d {} https://api.netlify.com/build_hooks/[BUILD_HOOK_ID]
```

### 3. Webhook para Rebuild
```bash
# Rebuild manual
curl -X POST -d {} https://api.netlify.com/build_hooks/[BUILD_HOOK_ID]
```

## Como Obter Build Hook ID

1. Vá para Netlify Dashboard
2. Site Settings → Build & Deploy → Build hooks
3. Add build hook
4. Copie a URL do webhook
