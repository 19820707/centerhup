export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-max py-20 sm:py-28">
        <span className="badge">Local market</span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight">
          Perto de si. <span className="text-brand-600">Compre perto.</span><br />
          Fortaleça a sua <span className="text-brand-600">comunidade.</span>
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-2xl">
          Lojas locais, produtos frescos e serviços do bairro reunidos num só app. Apoie comerciantes do seu bairro e fortaleça a economia local.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#cta" className="btn-primary text-base">Sou Cliente</a>
          <a href="#features" className="btn-ghost text-base">Sou Comerciante</a>
          <a href="#features" className="btn-ghost text-base">Sou Entregador</a>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8 max-w-md">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-600">200+</div>
            <div className="text-sm text-gray-600">Lojas locais</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-600">50+</div>
            <div className="text-sm text-gray-600">Bairros</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-600">10k+</div>
            <div className="text-sm text-gray-600">Clientes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
