"use client";
import { useState, useEffect } from 'react';

interface KPIData {
  velocity: {
    lcp: number;
    inp: number;
    ttfb: number;
  };
  conversion: {
    cr: number;
    aov: number;
    checkoutAbandon: number;
  };
  relevance: {
    ctr: number;
    zeroResults: number;
  };
  reliability: {
    error5xx: number;
    uptime: number;
  };
}

const KPIDashboard = () => {
  const [kpiData, setKpiData] = useState<KPIData>({
    velocity: { lcp: 1800, inp: 150, ttfb: 180 },
    conversion: { cr: 0.032, aov: 52, checkoutAbandon: 0.68 },
    relevance: { ctr: 0.16, zeroResults: 0.008 },
    reliability: { error5xx: 0.0008, uptime: 0.9996 }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simular atualização de dados
  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular variação nos dados
    setKpiData(prev => ({
      velocity: {
        lcp: prev.velocity.lcp + (Math.random() - 0.5) * 200,
        inp: prev.velocity.inp + (Math.random() - 0.5) * 50,
        ttfb: prev.velocity.ttfb + (Math.random() - 0.5) * 50
      },
      conversion: {
        cr: prev.conversion.cr + (Math.random() - 0.5) * 0.005,
        aov: prev.conversion.aov + (Math.random() - 0.5) * 5,
        checkoutAbandon: prev.conversion.checkoutAbandon + (Math.random() - 0.5) * 0.05
      },
      relevance: {
        ctr: prev.relevance.ctr + (Math.random() - 0.5) * 0.02,
        zeroResults: prev.relevance.zeroResults + (Math.random() - 0.5) * 0.005
      },
      reliability: {
        error5xx: prev.reliability.error5xx + (Math.random() - 0.5) * 0.0005,
        uptime: prev.reliability.uptime + (Math.random() - 0.5) * 0.0002
      }
    }));
    
    setIsLoading(false);
  };

  // Auto-refresh a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de KPIs</h1>
        <button
          onClick={refreshData}
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

      {/* Velocidade */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Velocidade</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {kpiData.velocity.lcp.toFixed(0)}ms
            </div>
            <div className="text-sm text-gray-600">LCP</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.velocity.lcp, 2000, true)}`}>
              {getStatusIcon(kpiData.velocity.lcp, 2000, true)} Meta: &lt; 2.0s
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {kpiData.velocity.inp.toFixed(0)}ms
            </div>
            <div className="text-sm text-gray-600">INP</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.velocity.inp, 200, true)}`}>
              {getStatusIcon(kpiData.velocity.inp, 200, true)} Meta: &lt; 200ms
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {kpiData.velocity.ttfb.toFixed(0)}ms
            </div>
            <div className="text-sm text-gray-600">TTFB</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.velocity.ttfb, 200, true)}`}>
              {getStatusIcon(kpiData.velocity.ttfb, 200, true)} Meta: &lt; 200ms
            </div>
          </div>
        </div>
      </div>

      {/* Conversão */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">💰 Conversão</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(kpiData.conversion.cr * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Taxa de Conversão</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.conversion.cr, 0.03)}`}>
              {getStatusIcon(kpiData.conversion.cr, 0.03)} Meta: ≥ 3%
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              €{kpiData.conversion.aov.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Valor Médio do Pedido</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.conversion.aov, 50)}`}>
              {getStatusIcon(kpiData.conversion.aov, 50)} Meta: ≥ €50
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(kpiData.conversion.checkoutAbandon * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Abandono de Checkout</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.conversion.checkoutAbandon, 0.7, true)}`}>
              {getStatusIcon(kpiData.conversion.checkoutAbandon, 0.7, true)} Meta: &lt; 70%
            </div>
          </div>
        </div>
      </div>

      {/* Relevância */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Relevância</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(kpiData.relevance.ctr * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">CTR na Busca</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.relevance.ctr, 0.15)}`}>
              {getStatusIcon(kpiData.relevance.ctr, 0.15)} Meta: ≥ 15%
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(kpiData.relevance.zeroResults * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600">Zero Results</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.relevance.zeroResults, 0.01, true)}`}>
              {getStatusIcon(kpiData.relevance.zeroResults, 0.01, true)} Meta: &lt; 1%
            </div>
          </div>
        </div>
      </div>

      {/* Confiabilidade */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🛡️ Confiabilidade</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(kpiData.reliability.error5xx * 100).toFixed(3)}%
            </div>
            <div className="text-sm text-gray-600">Erros 5xx</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.reliability.error5xx, 0.001, true)}`}>
              {getStatusIcon(kpiData.reliability.error5xx, 0.001, true)} Meta: &lt; 0.1%
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(kpiData.reliability.uptime * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600">Uptime</div>
            <div className={`text-sm font-medium ${getStatusColor(kpiData.reliability.uptime, 0.9995)}`}>
              {getStatusIcon(kpiData.reliability.uptime, 0.9995)} Meta: ≥ 99.95%
            </div>
          </div>
        </div>
      </div>

      {/* Resumo Geral */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Resumo Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">8.5</div>
            <div className="text-sm text-gray-600">Score Velocidade</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">9.2</div>
            <div className="text-sm text-gray-600">Score Conversão</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">8.8</div>
            <div className="text-sm text-gray-600">Score Relevância</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">9.5</div>
            <div className="text-sm text-gray-600">Score Confiabilidade</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-4xl font-bold text-green-600">9.0</div>
          <div className="text-lg text-gray-700">Score Geral</div>
          <div className="text-sm text-green-600 font-medium">🟢 EXCELENTE - Todos os KPIs dentro das metas!</div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
