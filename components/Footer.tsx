export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-max py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Centerhup" className="h-5 w-5" />
          <span>© {new Date().getFullYear()} Centerhup</span>
        </div>
        <nav className="flex items-center gap-5">
          <a href="#" className="hover:text-brand-700">Termos</a>
          <a href="#" className="hover:text-brand-700">Privacidade</a>
          <a href="#" className="hover:text-brand-700">Contato</a>
        </nav>
      </div>
    </footer>
  );
}
