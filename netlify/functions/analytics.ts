// Netlify Function para receber analytics
export const handler = async (event: any, context: any) => {
  // Só aceita POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    
    // Log das métricas (em produção, enviaria para serviço de analytics)
    console.log('Analytics data:', {
      type: data.type || 'web-vital',
      name: data.name,
      value: data.value,
      url: data.url,
      timestamp: data.timestamp,
      userAgent: data.userAgent
    });

    // Aqui você pode integrar com:
    // - Google Analytics 4
    // - Mixpanel
    // - Amplitude
    // - Sentry
    // - Seu próprio sistema de analytics

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Analytics error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
