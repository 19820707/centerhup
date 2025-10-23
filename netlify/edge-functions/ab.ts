// Edge Function para A/B Testing
export default async (req: Request) => {
  const url = new URL(req.url);
  const cookie = req.headers.get("cookie") || "";
  
  // Verifica se já tem variante atribuída
  const assigned = /abVariant=(A|B)/.exec(cookie)?.[1];
  
  let variant = assigned;
  
  // Se não tem variante, atribui uma baseada em hash do IP
  if (!variant) {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const hash = ip.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    variant = Math.abs(hash) % 2 === 0 ? "A" : "B";
  }
  
  // Redireciona para a versão da variante
  if (variant === "B") {
    // Variante B: landing page alternativa
    if (url.pathname === "/" || url.pathname === "/index.html") {
      url.pathname = "/landing-b/index.html";
    }
  }
  
  // Cria resposta com cookie da variante
  const response = Response.redirect(url, 302);
  response.headers.append(
    "Set-Cookie", 
    `abVariant=${variant}; Path=/; Max-Age=2592000; SameSite=Lax; Secure`
  );
  
  return response;
};
