# 🚀 Instruções para Configuração do Netlify

## ⚠️ Configuração Atual Incorreta

O Netlify está configurado com:
- **Publish directory:** `.next` ❌
- **Node.js:** `22.x` ❌

## ✅ Configuração Correta Necessária

### 1. Build Settings
- **Build command:** `npm run build`
- **Publish directory:** `out` ✅
- **Functions directory:** `netlify/functions`

### 2. Environment Variables
- **NODE_VERSION:** `20`

### 3. Como Corrigir no Netlify:

**Opção A: Via Interface Web**
1. Vá para **Build & deploy** → **Build settings**
2. Altere **Publish directory** de `.next` para `out`
3. Altere **Node.js** de `22.x` para `20`
4. Salve as configurações

**Opção B: Via netlify.toml (Já Configurado)**
O arquivo `netlify.toml` já está configurado corretamente, mas o Netlify pode estar ignorando.

### 4. Deploy Manual (Recomendado)

Como o Netlify está com problemas de configuração, use deploy manual:

1. Vá para [netlify.com](https://netlify.com)
2. Procure por "Want to deploy a new project without connecting to Git?"
3. Arraste a pasta `out` para a área de drop
4. Deploy instantâneo!

### 5. Arquivos Prontos para Deploy

- ✅ **Build local:** Funcionando
- ✅ **Diretório `out`:** Com todos os arquivos estáticos
- ✅ **`centerhub-final.zip`:** Para upload manual
- ✅ **Configurações:** Corretas no `netlify.toml`

## 🎯 Resultado Esperado

Após corrigir a configuração ou fazer deploy manual:
- **URL:** `https://centerhub.netlify.app`
- **Status:** Funcionando perfeitamente
- **Funcionalidades:** Landing page, marketplace, seletor profissional
