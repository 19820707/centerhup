// Web Vitals tracking para Analytics
export function reportWebVitals(metric: any) {
  // Envia métricas para endpoint de analytics
  if (typeof window !== 'undefined') {
    // Usa sendBeacon para garantir envio mesmo se a página estiver fechando
    navigator.sendBeacon('/_analytics', JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      navigationType: metric.navigationType,
      timestamp: Date.now(),
      url: window.location.href
    }));
  }
}

// Função para reportar erros do cliente
export function reportError(error: Error, errorInfo?: any) {
  if (typeof window !== 'undefined') {
    navigator.sendBeacon('/_analytics', JSON.stringify({
      type: 'error',
      message: error.message,
      stack: error.stack,
      errorInfo,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }));
  }
}
