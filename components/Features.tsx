const items = [
  {
    title: "Crie em minutos",
    desc: "Modelos prontos e fluxo enxuto para você sair do zero ao link compartilhável.",
  },
  {
    title: "Colabore sem atrito",
    desc: "Convide pessoas, controle acesso e acompanhe o progresso em tempo real.",
  },
  {
    title: "Tudo no mesmo lugar",
    desc: "Projetos, páginas e arquivos centralizados — encontre tudo rápido.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-gray-50 border-y border-gray-200">
      <div className="container-max py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Por que usar o Centerhup?</h2>
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
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
