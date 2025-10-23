"use client";
import { useState, useEffect } from 'react';

interface SearchMetrics {
  ctr: number;
  zeroResults: number;
  avgClickTime: number;
  searchVolume: number;
  topQueries: Array<{
    query: string;
    clicks: number;
    ctr: number;
    zeroResults: boolean;
  }>;
}

const SearchRelevance = () => {
  const [metrics, setMetrics] = useState<SearchMetrics>({
    ctr: 0.16,
    zeroResults: 0.008,
    avgClickTime: 2.3,
    searchVolume: 1250,
    topQueries: [
      { query: "smartphone", clicks: 45, ctr: 0.18, zeroResults: false },
      { query: "laptop", clicks: 38, ctr: 0.15, zeroResults: false },
      { query: "fone bluetooth", clicks: 32, ctr: 0.22, zeroResults: false },
      { query: "cadeira gamer", clicks: 28, ctr: 0.19, zeroResults: false },
      { query: "monitor 4k", clicks: 25, ctr: 0.16, zeroResults: false },
      { query: "teclado mecânico", clicks: 22, ctr: 0.14, zeroResults: false },
      { query: "mouse sem fio", clicks: 20, ctr: 0.17, zeroResults: false },
      { query: "tablet", clicks: 18, ctr: 0.13, zeroResults: false },
      { query: "smartwatch", clicks: 15, ctr: 0.21, zeroResults: false },
      { query: "camera digital", clicks: 12, ctr: 0.11, zeroResults: false }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simular atualização de métricas
  const refreshMetrics = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setMetrics(prev => ({
      ...prev,
      ctr: prev.ctr + (Math.random() - 0.5) * 0.02,
      zeroResults: prev.zeroResults + (Math.random() - 0.5) * 0.005,
      avgClickTime: prev.avgClickTime + (Math.random() - 0.5) * 0.5,
      searchVolume: prev.searchVolume + Math.floor((Math.random() - 0.5) * 100)
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
        <h1 className="text-3xl font-bold text-gray-900">Relevância de Busca</h1>
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

      {/* Métricas de Relevância */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Métricas de Relevância</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(metrics.ctr * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">CTR na Busca</div>
            <div className={`text-sm font-medium ${getStatusColor(metrics.ctr, 0.15)}`}>
              {getStatusIcon(metrics.ctr, 0.15)} Meta: ≥ 15%
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {(metrics.zeroResults * 100).toFixed(2)}%
            </div>
            <div className="text-sm text-gray-600">Zero Results</div>
            <div className={`text-sm font-medium ${getStatusColor(metrics.zeroResults, 0.01, true)}`}>
              {getStatusIcon(metrics.zeroResults, 0.01, true)} Meta: &lt; 1%
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {metrics.avgClickTime.toFixed(1)}s
            </div>
            <div className="text-sm text-gray-600">Tempo até 1º Clique</div>
            <div className={`text-sm font-medium ${getStatusColor(metrics.avgClickTime, 3, true)}`}>
              {getStatusIcon(metrics.avgClickTime, 3, true)} Meta: &lt; 3s
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {metrics.searchVolume.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Volume de Busca</div>
            <div className="text-sm text-gray-600">Últimas 24h</div>
          </div>
        </div>
      </div>

      {/* Busca "Camada 1" - Rápida */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Busca "Camada 1" (Rápida)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Facets por Categoria</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Categoria/Marca/Preço</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Filtros em tempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Contadores de resultados</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-sm">Filtros por atributos</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Correção de Typos</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Sinônimos por vertical</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Correção automática</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">"Você quis dizer..."</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-sm">Aprendizado de ML</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Boost Inteligente</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Boost por estoque</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Boost por margem</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Popularidade recente</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-sm">Personalização</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Re-rank Semântico */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🧠 Re-rank Semântico</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Top Queries (10-20 termos)</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-sm">Embeddings Aplicados</div>
                <div className="text-xs text-blue-700 mt-1">
                  Título + Descrição + Atributos
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Status: <span className="text-green-600">Ativo</span>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-sm">Rebaixar Sem Estoque</div>
                <div className="text-xs text-green-700 mt-1">
                  Produtos sem estoque vão para o final
                </div>
                <div className="text-xs text-green-600 mt-1">
                  Status: <span className="text-green-600">Ativo</span>
                </div>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-sm">Promover Novidades</div>
                <div className="text-xs text-purple-700 mt-1">
                  Produtos novos ganham boost temporário
                </div>
                <div className="text-xs text-yellow-600 mt-1">
                  Status: <span className="text-yellow-600">Em teste</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Zero-Results Killer</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Fallback para categoria próxima</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">"Você quis dizer..."</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✅</span>
                <span className="text-sm">Filtros sugeridos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⚠️</span>
                <span className="text-sm">Busca semântica expandida</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Queries */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 Top Queries de Busca</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Query</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Cliques</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">CTR</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Zero Results</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.topQueries.map((query, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{query.query}</div>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {query.clicks}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${query.ctr >= 0.15 ? 'text-green-600' : 'text-red-600'}`}>
                      {(query.ctr * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {query.zeroResults ? (
                      <span className="text-red-600">❌</span>
                    ) : (
                      <span className="text-green-600">✅</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      query.ctr >= 0.15 && !query.zeroResults 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {query.ctr >= 0.15 && !query.zeroResults ? 'Ótimo' : 'Melhorar'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Medição e Analytics */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Medição e Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">CTR por Posição</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Posição 1-3:</span>
                <span className="font-medium text-green-600">18.5%</span>
              </div>
              <div className="flex justify-between">
                <span>Posição 4-10:</span>
                <span className="font-medium text-yellow-600">12.3%</span>
              </div>
              <div className="flex justify-between">
                <span>Posição 11+:</span>
                <span className="font-medium text-red-600">5.2%</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Zero Results por Categoria</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Eletrônicos:</span>
                <span className="font-medium text-green-600">0.5%</span>
              </div>
              <div className="flex justify-between">
                <span>Casa & Jardim:</span>
                <span className="font-medium text-green-600">0.8%</span>
              </div>
              <div className="flex justify-between">
                <span>Moda:</span>
                <span className="font-medium text-yellow-600">1.2%</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Tempo até 1º Clique</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Média:</span>
                <span className="font-medium text-green-600">2.3s</span>
              </div>
              <div className="flex justify-between">
                <span>P95:</span>
                <span className="font-medium text-yellow-600">4.1s</span>
              </div>
              <div className="flex justify-between">
                <span>Meta:</span>
                <span className="font-medium text-gray-600">&lt; 3s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRelevance;
