#!/usr/bin/env node

/**
 * Monitor de Web Vitals - CenterHub
 * LCP, INP, CLS, FID, TTFB
 */

import { performance } from 'node:perf_hooks';
import fs from 'node:fs/promises';
import path from 'node:path';

// Configurações dos Web Vitals
const WEB_VITALS_CONFIG = {
  LCP: {
    good: 2500,      // < 2.5s
    needsImprovement: 4000, // 2.5s - 4.0s
    poor: 4000       // > 4.0s
  },
  INP: {
    good: 200,       // < 200ms
    needsImprovement: 500,  // 200ms - 500ms
    poor: 500        // > 500ms
  },
  CLS: {
    good: 0.1,       // < 0.1
    needsImprovement: 0.25, // 0.1 - 0.25
    poor: 0.25       // > 0.25
  },
  FID: {
    good: 100,       // < 100ms
    needsImprovement: 300,  // 100ms - 300ms
    poor: 300        // > 300ms
  },
  TTFB: {
    good: 800,       // < 800ms
    needsImprovement: 1800, // 800ms - 1.8s
    poor: 1800       // > 1.8s
  }
};

class WebVitalsMonitor {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      vitals: {},
      summary: {}
    };
  }

  async measureTTFB(url) {
    const start = performance.now();
    
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        headers: { 'User-Agent': 'WebVitalsMonitor/1.0' }
      });
      
      const ttfb = performance.now() - start;
      
      return {
        value: ttfb,
        rating: this.getRating(ttfb, WEB_VITALS_CONFIG.TTFB),
        status: response.status
      };
    } catch (error) {
      return {
        value: null,
        rating: 'poor',
        error: error.message
      };
    }
  }

  async measureLCP(url) {
    // Simular medição de LCP (em produção, viria do browser)
    const mockLCP = 1800 + Math.random() * 1000;
    
    return {
      value: mockLCP,
      rating: this.getRating(mockLCP, WEB_VITALS_CONFIG.LCP),
      element: 'img.hero-image'
    };
  }

  async measureINP(url) {
    // Simular medição de INP (em produção, viria do browser)
    const mockINP = 150 + Math.random() * 200;
    
    return {
      value: mockINP,
      rating: this.getRating(mockINP, WEB_VITALS_CONFIG.INP),
      interactions: 25
    };
  }

  async measureCLS(url) {
    // Simular medição de CLS (em produção, viria do browser)
    const mockCLS = 0.05 + Math.random() * 0.15;
    
    return {
      value: mockCLS,
      rating: this.getRating(mockCLS, WEB_VITALS_CONFIG.CLS),
      shifts: 3
    };
  }

  async measureFID(url) {
    // Simular medição de FID (em produção, viria do browser)
    const mockFID = 80 + Math.random() * 150;
    
    return {
      value: mockFID,
      rating: this.getRating(mockFID, WEB_VITALS_CONFIG.FID),
      events: 12
    };
  }

  getRating(value, config) {
    if (value <= config.good) return 'good';
    if (value <= config.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  getRatingColor(rating) {
    switch (rating) {
      case 'good': return '🟢';
      case 'needs-improvement': return '🟡';
      case 'poor': return '🔴';
      default: return '⚪';
    }
  }

  async measureAllVitals(url) {
    console.log(`\n📊 Medindo Web Vitals para: ${url}`);
    
    const [ttfb, lcp, inp, cls, fid] = await Promise.all([
      this.measureTTFB(url),
      this.measureLCP(url),
      this.measureINP(url),
      this.measureCLS(url),
      this.measureFID(url)
    ]);

    const vitals = { ttfb, lcp, inp, cls, fid };
    
    // Log dos resultados
    console.log(`  TTFB: ${ttfb.value ? ttfb.value.toFixed(0) + 'ms' : 'ERROR'} ${this.getRatingColor(ttfb.rating)}`);
    console.log(`  LCP: ${lcp.value.toFixed(0)}ms ${this.getRatingColor(lcp.rating)}`);
    console.log(`  INP: ${inp.value.toFixed(0)}ms ${this.getRatingColor(inp.rating)}`);
    console.log(`  CLS: ${cls.value.toFixed(3)} ${this.getRatingColor(cls.rating)}`);
    console.log(`  FID: ${fid.value.toFixed(0)}ms ${this.getRatingColor(fid.rating)}`);
    
    return vitals;
  }

  calculateSummary(vitals) {
    const ratings = Object.values(vitals).map(v => v.rating);
    
    const good = ratings.filter(r => r === 'good').length;
    const needsImprovement = ratings.filter(r => r === 'needs-improvement').length;
    const poor = ratings.filter(r => r === 'poor').length;
    
    const total = ratings.length;
    const score = ((good * 3) + (needsImprovement * 2) + (poor * 1)) / (total * 3) * 100;
    
    return {
      good,
      needsImprovement,
      poor,
      total,
      score: Math.round(score),
      overall: score >= 80 ? 'good' : score >= 60 ? 'needs-improvement' : 'poor'
    };
  }

  async generateReport() {
    console.log('\n📈 Relatório de Web Vitals');
    console.log('='.repeat(50));
    
    const summary = this.calculateSummary(this.results.vitals);
    
    console.log(`\n🎯 Score Geral: ${summary.score}/100`);
    console.log(`📊 Distribuição:`);
    console.log(`  🟢 Bom: ${summary.good}/${summary.total}`);
    console.log(`  🟡 Precisa melhorar: ${summary.needsImprovement}/${summary.total}`);
    console.log(`  🔴 Ruim: ${summary.poor}/${summary.total}`);
    
    if (summary.overall === 'good') {
      console.log('\n🟢 EXCELENTE - Todos os Web Vitals estão otimizados!');
    } else if (summary.overall === 'needs-improvement') {
      console.log('\n🟡 BOM - Alguns Web Vitals precisam de atenção');
    } else {
      console.log('\n🔴 CRÍTICO - Muitos Web Vitals precisam de otimização');
    }
    
    // Recomendações
    this.generateRecommendations();
    
    this.results.summary = summary;
    await this.saveReport();
  }

  generateRecommendations() {
    console.log('\n💡 Recomendações:');
    
    const vitals = this.results.vitals;
    
    if (vitals.lcp.rating !== 'good') {
      console.log('  🖼️ LCP: Otimize imagens, use lazy loading, minimize CSS crítico');
    }
    
    if (vitals.inp.rating !== 'good') {
      console.log('  ⚡ INP: Reduza JavaScript, otimize event listeners, use Web Workers');
    }
    
    if (vitals.cls.rating !== 'good') {
      console.log('  📐 CLS: Defina dimensões de imagens, evite inserções dinâmicas');
    }
    
    if (vitals.fid.rating !== 'good') {
      console.log('  🖱️ FID: Reduza JavaScript bloqueante, otimize third-party scripts');
    }
    
    if (vitals.ttfb.rating !== 'good') {
      console.log('  🌐 TTFB: Use CDN, otimize servidor, implemente cache');
    }
  }

  async saveReport() {
    const reportPath = path.join(process.cwd(), 'web-vitals-report.json');
    await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Relatório salvo em: ${reportPath}`);
  }

  async run() {
    console.log('🚀 Iniciando monitoramento de Web Vitals...\n');
    
    const testUrls = [
      'https://centerhup.pt',
      'https://centerhup.pt/search',
      'https://centerhup.pt/checkout'
    ];
    
    for (const url of testUrls) {
      const vitals = await this.measureAllVitals(url);
      this.results.vitals[url] = vitals;
    }
    
    await this.generateReport();
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new WebVitalsMonitor();
  monitor.run().catch(console.error);
}

export default WebVitalsMonitor;
