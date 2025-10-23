import Image from "next/image";
import { ProfessionalSelector } from "./ProfessionalSelector";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container-max h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <Image 
            src="/logo.svg" 
            alt="CenterHub" 
            width={24} 
            height={24} 
            className="h-6 w-6"
            priority
          />
          CenterHub
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-brand-700">Início</a>
          <a href="#categorias" className="hover:text-brand-700">Categorias</a>
          <a href="#lojas" className="hover:text-brand-700">Lojas</a>
          <a href="#features" className="hover:text-brand-700">Como funciona</a>
        </nav>
            <div className="flex items-center gap-3">
              <ProfessionalSelector />
              <a href="#cta" className="btn-ghost text-sm">Entrar</a>
              <a href="/store-setup" className="btn-primary text-sm">Criar Loja</a>
            </div>
      </div>
    </header>
  );
}
