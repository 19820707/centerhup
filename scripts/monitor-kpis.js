#!/usr/bin/env node

/**
 * Monitor de KPIs - CenterHub
 * Velocidade, Conversão, Relevância, Confiabilidade
 */

import { performance } from 'node:perf_hooks';
import fs from 'node:fs/promises';
import path from 'node:path';

// Configurações
const CONFIG = {
  // KPIs de Velocidade
  LCP_TARGET: 2000,      // < 2.0s
  INP_TARGET: 200,       // < 200ms
  TTFB_TARGET: 200,      // < 200ms
  
  // KPIs de Conversão
  CR_TARGET: 0.03,       // 3% baseline
  AOV_TARGET: 50,        // €50 baseline
  CHECKOUT_ABANDON_TARGET: 0.7, // < 70%
  
  // KPIs de Relevância
  CTR_TARGET: 0.15,      // 15% baseline
  ZERO_RESULTS_TARGET: 0.01, // < 1%
  
  // KPIs de Confiabilidade
  ERROR_5XX_TARGET: 0.001, // < 0.1%
  UPTIME_TARGET: 0.9995,   // ≥ 99.95%
  
  // URLs para monitorar
  TEST_URLS: [
    'https://centerhup.pt',
    'https://centerhup.pt/search',
    'https://centerhup.pt/checkout',
    'https://centerhup.pt/api/health'
  ]
};

class KPIMonitor {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      velocity: {},
      conversion: {},
      relevance: {},
      reliability: {}
    };
  }

  async measureVelocity() {
    console.log('🚀 Medindo velocidade...');
    
    for (const url of CONFIG.TEST_URLS) {
      const start = performance.now();
      
      try {
        const response = await fetch(url, {
          method: 'HEAD',
          headers: { 'User-Agent': 'KPIMonitor/1.0' }
        });
        
        const ttfb = performance.now() - start;
        
        this.results.velocity[url] = {
          ttfb,
          status: response.status,
          passed: ttfb < CONFIG.TTFB_TARGET
        };
        
        console.log(`  ${url}: TTFB ${ttfb.toFixed(0)}ms ${ttfb < CONFIG.TTFB_TARGET ? '✅' : '❌'}`);
        
      } catch (error) {
        this.results.velocity[url] = {
          ttfb: null,
          status: 'ERROR',
          passed: false,
          error: error.message
        };
        console.log(`  ${url}: ERROR ❌`);
      }
    }
  }

  async measureReliability() {
    console.log('🛡️ Medindo confiabilidade...');
    
    let totalRequests = 0;
    let error5xx = 0;
    let successfulRequests = 0;
    
    for (const url of CONFIG.TEST_URLS) {
      try {
        const response = await fetch(url, {
          method: 'HEAD',
          headers: { 'User-Agent': 'KPIMonitor/1.0' }
        });
        
        totalRequests++;
        
        if (response.status >= 500) {
          error5xx++;
        } else if (response.status < 400) {
          successfulRequests++;
        }
        
      } catch (error) {
        totalRequests++;
        error5xx++;
      }
    }
    
    const errorRate = totalRequests > 0 ? error5xx / totalRequests : 0;
    const uptime = totalRequests > 0 ? successfulRequests / totalRequests : 0;
    
    this.results.reliability = {
      totalRequests,
      error5xx,
      errorRate,
      uptime,
      passed: errorRate < CONFIG.ERROR_5XX_TARGET && uptime >= CONFIG.UPTIME_TARGET
    };
    
    console.log(`  Erros 5xx: ${(errorRate * 100).toFixed(2)}% ${errorRate < CONFIG.ERROR_5XX_TARGET ? '✅' : '❌'}`);
    console.log(`  Uptime: ${(uptime * 100).toFixed(2)}% ${uptime >= CONFIG.UPTIME_TARGET ? '✅' : '❌'}`);
  }

  async measureRelevance() {
    console.log('🎯 Medindo relevância...');
    
    // Simular métricas de busca (em produção, viria do analytics)
    const mockSearchMetrics = {
      totalSearches: 1000,
      clicks: 150,
      zeroResults: 5,
      ctr: 0.15,
      zeroResultsRate: 0.005
    };
    
    this.results.relevance = {
      ...mockSearchMetrics,
      ctrPassed: mockSearchMetrics.ctr >= CONFIG.CTR_TARGET,
      zeroResultsPassed: mockSearchMetrics.zeroResultsRate < CONFIG.ZERO_RESULTS_TARGET,
      passed: mockSearchMetrics.ctr >= CONFIG.CTR_TARGET && mockSearchMetrics.zeroResultsRate < CONFIG.ZERO_RESULTS_TARGET
    };
    
    console.log(`  CTR: ${(mockSearchMetrics.ctr * 100).toFixed(1)}% ${mockSearchMetrics.ctr >= CONFIG.CTR_TARGET ? '✅' : '❌'}`);
    console.log(`  Zero Results: ${(mockSearchMetrics.zeroResultsRate * 100).toFixed(2)}% ${mockSearchMetrics.zeroResultsRate < CONFIG.ZERO_RESULTS_TARGET ? '✅' : '❌'}`);
  }

  async measureConversion() {
    console.log('💰 Medindo conversão...');
    
    // Simular métricas de conversão (em produção, viria do analytics)
    const mockConversionMetrics = {
      totalVisitors: 10000,
      conversions: 300,
      totalRevenue: 15000,
      checkoutStarted: 1000,
      checkoutCompleted: 300,
      cr: 0.03,
      aov: 50,
      checkoutAbandonRate: 0.7
    };
    
    this.results.conversion = {
      ...mockConversionMetrics,
      crPassed: mockConversionMetrics.cr >= CONFIG.CR_TARGET,
      aovPassed: mockConversionMetrics.aov >= CONFIG.AOV_TARGET,
      abandonPassed: mockConversionMetrics.checkoutAbandonRate < CONFIG.CHECKOUT_ABANDON_TARGET,
      passed: mockConversionMetrics.cr >= CONFIG.CR_TARGET && 
              mockConversionMetrics.aov >= CONFIG.AOV_TARGET && 
              mockConversionMetrics.checkoutAbandonRate < CONFIG.CHECKOUT_ABANDON_TARGET
    };
    
    console.log(`  CR: ${(mockConversionMetrics.cr * 100).toFixed(1)}% ${mockConversionMetrics.cr >= CONFIG.CR_TARGET ? '✅' : '❌'}`);
    console.log(`  AOV: €${mockConversionMetrics.aov} ${mockConversionMetrics.aov >= CONFIG.AOV_TARGET ? '✅' : '❌'}`);
    console.log(`  Abandono: ${(mockConversionMetrics.checkoutAbandonRate * 100).toFixed(1)}% ${mockConversionMetrics.checkoutAbandonRate < CONFIG.CHECKOUT_ABANDON_TARGET ? '✅' : '❌'}`);
  }

  async generateReport() {
    console.log('\n📊 Relatório de KPIs');
    console.log('='.repeat(50));
    
    const overallScore = this.calculateOverallScore();
    
    console.log(`\n🎯 Score Geral: ${overallScore.toFixed(1)}/10`);
    
    if (overallScore >= 8) {
      console.log('🟢 EXCELENTE - Todos os KPIs dentro das metas!');
    } else if (overallScore >= 6) {
      console.log('🟡 BOM - Alguns KPIs precisam de atenção');
    } else {
      console.log('🔴 CRÍTICO - Muitos KPIs fora das metas');
    }
    
    // Salvar relatório
    await this.saveReport();
  }

  calculateOverallScore() {
    let score = 0;
    let total = 0;
    
    // Velocidade (25%)
    const velocityScore = this.calculateVelocityScore();
    score += velocityScore * 0.25;
    total += 0.25;
    
    // Conversão (30%)
    const conversionScore = this.results.conversion.passed ? 10 : 5;
    score += conversionScore * 0.30;
    total += 0.30;
    
    // Relevância (20%)
    const relevanceScore = this.results.relevance.passed ? 10 : 5;
    score += relevanceScore * 0.20;
    total += 0.20;
    
    // Confiabilidade (25%)
    const reliabilityScore = this.results.reliability.passed ? 10 : 5;
    score += reliabilityScore * 0.25;
    total += 0.25;
    
    return (score / total) * 10;
  }

  calculateVelocityScore() {
    const urls = Object.values(this.results.velocity);
    const passed = urls.filter(url => url.passed).length;
    return (passed / urls.length) * 10;
  }

  async saveReport() {
    const reportPath = path.join(process.cwd(), 'kpi-report.json');
    await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Relatório salvo em: ${reportPath}`);
  }

  async run() {
    console.log('🎯 Iniciando monitoramento de KPIs...\n');
    
    await this.measureVelocity();
    await this.measureReliability();
    await this.measureRelevance();
    await this.measureConversion();
    await this.generateReport();
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new KPIMonitor();
  monitor.run().catch(console.error);
}

export default KPIMonitor;
