// Edge Function para i18n baseado em geolocalização
export default async (req: Request, ctx: any) => {
  const url = new URL(req.url);
  
  // Se já tem idioma na URL, não redireciona
  if (url.pathname.startsWith('/pt') || url.pathname.startsWith('/en')) {
    return;
  }
  
  // Detecta país baseado em geolocalização
  const country = ctx.geo?.country?.code || "US";
  const language = req.headers.get('accept-language') || '';
  
  // Países de língua portuguesa
  const portugueseCountries = ['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'];
  
  // Países de língua espanhola
  const spanishCountries = ['ES', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'];
  
  let redirectPath = '';
  
  if (portugueseCountries.includes(country)) {
    redirectPath = '/pt';
  } else if (spanishCountries.includes(country)) {
    redirectPath = '/es';
  } else if (language.includes('pt')) {
    redirectPath = '/pt';
  } else if (language.includes('es')) {
    redirectPath = '/es';
  } else {
    // Default para inglês
    redirectPath = '/en';
  }
  
  // Redireciona para a versão localizada
  if (redirectPath) {
    const newUrl = new URL(redirectPath + url.pathname, req.url);
    newUrl.search = url.search; // Preserva query parameters
    
    return Response.redirect(newUrl, 302);
  }
  
  // Se não precisa redirecionar, continua o fluxo normal
  return;
};
