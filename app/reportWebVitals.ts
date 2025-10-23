/**
 * Web Vitals Collection - CenterHub
 * Coleta métricas de performance no cliente
 */

export interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

export function reportWebVitals(metric: WebVitalMetric) {
  try {
    // Enviar para Netlify Function
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/.netlify/functions/vitals", 
        JSON.stringify({
          ...metric,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          connection: (navigator as any).connection?.effectiveType || 'unknown'
        })
      );
    }
    
    // Log para desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }
    
    // Alertas para métricas críticas
    if (metric.name === 'LCP' && metric.value > 2000) {
      console.warn('⚠️ LCP crítico:', metric.value + 'ms');
    }
    
    if (metric.name === 'INP' && metric.value > 200) {
      console.warn('⚠️ INP crítico:', metric.value + 'ms');
    }
    
    if (metric.name === 'CLS' && metric.value > 0.1) {
      console.warn('⚠️ CLS crítico:', metric.value);
    }
    
  } catch (error) {
    console.error('Erro ao reportar Web Vital:', error);
  }
}

// Coleta automática de Web Vitals
export function initWebVitals() {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB, getINP }) => {
      getCLS(reportWebVitals);
      getFID(reportWebVitals);
      getFCP(reportWebVitals);
      getLCP(reportWebVitals);
      getTTFB(reportWebVitals);
      getINP(reportWebVitals);
    });
  }
}
