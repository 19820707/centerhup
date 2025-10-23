export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container-max h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <img src="/logo.svg" alt="Centerhup" className="h-6 w-6" />
          Centerhup
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-brand-700">Recursos</a>
          <a href="#precos" className="hover:text-brand-700">Preços</a>
          <a href="#faq" className="hover:text-brand-700">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#cta" className="btn-ghost text-sm">Entrar</a>
          <a href="#cta" className="btn-primary text-sm">Começar grátis</a>
        </div>
      </div>
    </header>
  );
}
