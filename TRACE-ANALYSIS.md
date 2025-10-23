# Análise de Trace do Next.js

Este documento explica como corrigir e analisar arquivos de trace do Next.js para otimização de performance.

## Problema Original

O arquivo `.next/trace` gerado pelo Next.js tem problemas de formato:

- ❌ JSON inválido (múltiplas arrays separadas)
- ❌ Texto solto fora do JSON
- ❌ Sem schema ou metadados
- ❌ Unidades de tempo confusas
- ❌ IDs não únicos
- ❌ Nomes de fases inconsistentes

## Solução Implementada

### 1. Script de Correção (`fix-trace.js`)

Converte o arquivo de trace inválido em formato JSON estruturado:

```bash
node fix-trace.js
```

**Resultado:**
- ✅ JSON válido com envelope estruturado
- ✅ Schema versionado (v1.0)
- ✅ Metadados da máquina e versão
- ✅ Unidades de tempo padronizadas
- ✅ IDs únicos e relacionamentos coerentes
- ✅ Nomes de fases normalizados (webpack.*, next.*)

### 2. Script de Análise (`analyze-trace.js`)

Analisa o arquivo corrigido e fornece insights de performance:

```bash
node analyze-trace.js
```

**Funcionalidades:**
- 📊 Estatísticas gerais
- 📈 Análise por fase (next, webpack)
- 🐌 Top 10 operações mais lentas
- ⚙️ Análise detalhada do webpack
- 🔄 Análise de invalidações
- 💡 Recomendações de otimização
- ⏱️ Timeline resumida

## Formato Corrigido

### Estrutura do Envelope

```json
{
  "schemaVersion": "1.0",
  "tool": "next-dev-profile",
  "appVersion": "14.2.5",
  "timeUnit": "microseconds",
  "generatedAt": "2025-10-23T11:08:19.611Z",
  "machine": {
    "platform": "win32",
    "cpus": 24,
    "memory": { ... }
  },
  "trace": {
    "traceId": "0b2c0bc86ffee097",
    "totalSpans": 114,
    "duration": 3263191
  },
  "spans": [ ... ]
}
```

### Estrutura de um Span

```json
{
  "name": "webpack.compilation",
  "duration": 12473,
  "timestamp": 408667318784,
  "id": 11,
  "parentId": 3,
  "traceId": "0b2c0bc86ffee097",
  "tags": {
    "name": "client"
  },
  "startTime": 1761209887908,
  "endTime": 1761209887921,
  "phase": "webpack",
  "status": "ok"
}
```

## Insights da Análise

### Problemas Identificados

1. **get-version-info muito lento (2.4s)**
   - Possível bloqueio de I/O pelo antivírus
   - Cache de pacotes pode estar corrompido

2. **Turbopack desabilitado**
   - Perda de performance significativa no hot reload
   - Recomendado: `next dev --turbo`

3. **Múltiplas invalidações manuais**
   - Indica recompilações desnecessárias
   - Pode ser otimizado com watch globs mais específicos

### Recomendações de Otimização

1. **Cache e I/O**
   ```bash
   npm config set cache ~/.npm
   # Verificar se antivírus não está bloqueando .next/
   ```

2. **Turbopack**
   ```bash
   next dev --turbo
   ```

3. **Webpack**
   - Persistent caching já ativo por padrão
   - Usar SSD para pasta de cache
   - Reduzir watch globs no next.config.js

4. **TypeScript**
   - Consolidar tsconfig.json
   - Usar project references para builds incrementais

## Fases Normalizadas

### Next.js (next.*)
- `next.start-dev-server` - Inicialização do servidor
- `next.setup-dev-bundler` - Configuração do bundler
- `next.get-version-info` - Obtenção de informações de versão
- `next.hot-reloader` - Hot reload
- `next.create-pages-mapping` - Mapeamento de páginas
- `next.create-entrypoints` - Criação de entry points

### Webpack (webpack.*)
- `webpack.compilation` - Compilação principal
- `webpack.make` - Construção do grafo de dependências
- `webpack.optimize` - Otimizações
- `webpack.emit` - Emissão de assets
- `webpack.invalidated-*` - Invalidações

## Uso Avançado

### Integração com Ferramentas

O formato corrigido é compatível com:

- **Chrome DevTools**: Importar como trace event
- **Perfetto**: Visualização avançada de traces
- **OpenTelemetry**: Export para Jaeger/Tempo/Grafana

### Análise Customizada

```javascript
const { analyzeTrace } = require('./analyze-trace.js');

// Análise programática
const traceData = JSON.parse(fs.readFileSync('.next/trace-fixed.json'));
const spans = traceData.spans;

// Filtrar spans por duração
const slowSpans = spans.filter(s => s.duration > 1000000); // > 1s

// Agrupar por fase
const byPhase = spans.reduce((acc, span) => {
  acc[span.phase] = acc[span.phase] || [];
  acc[span.phase].push(span);
  return acc;
}, {});
```

## Próximos Passos

1. **Monitoramento Contínuo**
   - Integrar análise em CI/CD
   - Alertas para degradação de performance

2. **Visualização**
   - Dashboard web para análise de traces
   - Comparação entre builds

3. **Automação**
   - Correção automática de problemas detectados
   - Sugestões de configuração otimizada

## Arquivos Gerados

- `.next/trace` - Arquivo original (inválido)
- `.next/trace-fixed.json` - Arquivo corrigido (válido)
- `fix-trace.js` - Script de correção
- `analyze-trace.js` - Script de análise
- `TRACE-ANALYSIS.md` - Esta documentação
