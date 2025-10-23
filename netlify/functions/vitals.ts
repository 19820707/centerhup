/**
 * Web Vitals Function - CenterHub
 * Recebe métricas de performance do cliente
 */

import type { Handler } from '@netlify/functions';

interface VitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
  timestamp: number;
  url: string;
  userAgent: string;
  connection: string;
}

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const metric: VitalMetric = JSON.parse(event.body || '{}');
    
    // Validar métrica
    if (!metric.name || typeof metric.value !== 'number') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid metric data' })
      };
    }

    // Log da métrica
    console.log('Web Vital received:', {
      name: metric.name,
      value: metric.value,
      url: metric.url,
      timestamp: new Date(metric.timestamp).toISOString()
    });

    // TODO: Enviar para analytics/logs
    // Exemplos:
    // - PostHog: posthog.capture('web_vital', metric)
    // - BigQuery: inserir na tabela de Web Vitals
    // - Sentry: Sentry.addBreadcrumb({ category: 'web-vital', data: metric })
    // - Custom analytics: enviar para seu sistema

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 10));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        metric: metric.name,
        value: metric.value 
      })
    };

  } catch (error) {
    console.error('Error processing Web Vital:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
