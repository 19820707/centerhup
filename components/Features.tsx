const items = [
  {
    title: "Entrega Rápida",
    desc: "Receba os seus produtos em minutos. Entrega expressa ou recolha na loja.",
  },
  {
    title: "Sustentável",
    desc: "Reduz desperdício com marketplace de excedentes e pegada de carbono transparente.",
  },
  {
    title: "Comunidade Local",
    desc: "Apoie comerciantes do seu bairro e fortaleça a economia local.",
  },
  {
    title: "Preços Justos",
    desc: "Preços competitivos e transparentes. Sem taxas escondidas.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-gray-50 border-y border-gray-200">
      <div className="container-max py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Porquê CenterHub?</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          Mais que uma app de compras. Um ecossistema inteligente que liga clientes, comerciantes e comunidade.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.title} className="card">
              <h3 className="text-xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
