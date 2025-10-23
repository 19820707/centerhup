"use client";
import { useState, useEffect } from 'react';

interface ConversionMetrics {
  cr: number;
  aov: number;
  checkoutAbandon: number;
  cartRecovery: number;
}

const ConversionOptimizer = () => {
  const [metrics, setMetrics] = useState<ConversionMetrics>({
    cr: 0.032,
    aov: 52,
    checkoutAbandon: 0.68,
    cartRecovery: 0.15
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simular atualização de métricas
  const refreshMetrics = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMetrics(prev => ({
      cr: prev.cr + (Math.random() - 0.5) * 0.005,
      aov: prev.aov + (Math.random() - 0.5) * 5,
      checkoutAbandon: prev.checkoutAbandon + (Math.random() - 0.5) * 0.05,
      cartRecovery: prev.cartRecovery + (Math.random() - 0.5) * 0.02
    }));
    
    setIsLoading(false);
  };

  // Auto-refresh a cada 60 segundos
  useEffect(() => {
    const interval = setInterval(refreshMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, target: number, isLowerBetter = false) => {
    const isGood = isLowerBetter ? value <= target : value >= target;
    return isGood ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (value: number, target: number, isLowerBetter = false) => {
    const isGood = isLowerBetter ? value <= target : value >= target;
    return isGood ? '✅' : '❌';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Otimizador de Conversão</h1>
        <button
          onClick={refreshMetrics}
          disabled={isLoading}
          className="btn btn-primary btn-sm"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            '🔄 Atualizar'
          )}
        </button>
      </div>

      {/* Métricas de Conversão */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">💰 Métricas de Conversão</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(metrics.cr * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Taxa de Conversão</div>
            <div className={`text-sm font-medium ${getStatusColor(metrics.cr, 0.03)}`}>
              {getStatusIcon(metrics.cr, 0.03)} Meta: ≥ 3%
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              €{metrics.aov.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Valor Médio do Pedido</div>
            <div className={`text-sm font-medium ${getStatusColor(metrics.aov, 50)}`}>
              {getStatusIcon(metrics.aov, 50)} Meta: ≥ €50
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(metrics.checkoutAbandon * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Abandono de Checkout</div>
            <div className={`text-sm font-medium ${getStatusColor(metrics.checkoutAbandon, 0.7, true)}`}>
              {getStatusIcon(metrics.checkoutAbandon, 0.7, true)} Meta: &lt; 70%
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(metrics.cartRecovery * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Recuperação de Carrinho</div>
            <div className={`text-sm font-medium ${getStatusColor(metrics.cartRecovery, 0.15)}`}>
              {getStatusIcon(metrics.cartRecovery, 0.15)} Meta: ≥ 15%
            </div>
          </div>
        </div>
      </div>

      {/* Otimizações de Checkout */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🛒 Otimizações de Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Fricção Mínima</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">One-tap (Apple/Google Pay)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Autocomplete de endereço</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Validação inline</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-sm">3DS adaptativo (só quando risco ↑)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Reduzir Abandono</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Resgate por email/WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Botão de pagamento acima da dobra</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Passos do checkout visíveis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-sm">Salvamento automático de progresso</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aumentar AOV */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Aumentar Valor Médio do Pedido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Compre Junto</h3>
            <p className="text-sm text-blue-700">
              Co-ocorrência simples baseada em carrinho/ordens anteriores
            </p>
            <div className="mt-2 text-xs text-blue-600">
              Status: <span className="text-green-600">Ativo</span>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Frete Grátis</h3>
            <p className="text-sm text-green-700">
              Barra de progresso no carrinho para frete grátis acima de €75
            </p>
            <div className="mt-2 text-xs text-green-600">
              Status: <span className="text-green-600">Ativo</span>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Upsell Inteligente</h3>
            <p className="text-sm text-purple-700">
              Sugestões baseadas em comportamento e categoria
            </p>
            <div className="mt-2 text-xs text-purple-600">
              Status: <span className="text-yellow-600">Em teste</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testes A/B */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🧪 Testes A/B de Alto Impacto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Testes Ativos (2 semanas)</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm">Título/CTA do Hero</div>
                <div className="text-xs text-gray-600 mt-1">
                  Variante A: "Descubra" vs Variante B: "Compre Agora"
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Conversão: +12% (Variante B)
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm">Densidade da Grade</div>
                <div className="text-xs text-gray-600 mt-1">
                  Variante A: 4 produtos vs Variante B: 6 produtos
                </div>
                <div className="text-xs text-blue-600 mt-1">
                  Em andamento...
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Próximos Testes</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📋</span>
                <span className="text-sm">Ordem de filtros</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📋</span>
                <span className="text-sm">Microcópias do checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📋</span>
                <span className="text-sm">Posição do botão "Adicionar ao Carrinho"</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📋</span>
                <span className="text-sm">Cores dos CTAs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Funil de Conversão */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Funil de Conversão</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <span className="font-medium">Visualização do Carrinho</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">1,000</div>
              <div className="text-sm text-gray-600">100%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <span className="font-medium">Início do Checkout</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">320</div>
              <div className="text-sm text-gray-600">32%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">3</span>
              </div>
              <span className="font-medium">Informações de Envio</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">280</div>
              <div className="text-sm text-gray-600">87.5%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">4</span>
              </div>
              <span className="font-medium">Pagamento</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">250</div>
              <div className="text-sm text-gray-600">89.3%</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">✓</span>
              </div>
              <span className="font-medium">Pedido Concluído</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">32</div>
              <div className="text-sm text-green-600">12.8%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionOptimizer;
