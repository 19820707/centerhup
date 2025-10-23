export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-max py-20 sm:py-28">
        <span className="badge">Beta aberto</span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight">
          Seu centro simples para <span className="text-brand-600">organizar</span> e <span className="text-brand-600">lançar</span> ideias.
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl">
          O Centerhup ajuda você a centralizar projetos, páginas e entregas em um só lugar — sem complicação. Crie, publique e compartilhe em minutos.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#cta" className="btn-primary text-base">Começar grátis</a>
          <a href="#features" className="btn-ghost text-base">Ver como funciona</a>
        </div>
        <p className="mt-3 text-sm text-gray-500">Sem cartão de crédito. Cancele quando quiser.</p>
      </div>
    </section>
  );
}
