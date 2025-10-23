"use client";
import { useState } from "react";

export function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // mock simples: apenas finge sucesso
      await new Promise((r) => setTimeout(r, 700));
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="cta">
      <div className="container-max py-16 sm:py-24">
        <div className="card">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Pronto para apoiar o comércio local?</h3>
            <p className="mt-2 text-gray-600">Junte-se à comunidade CenterHub e descubra as melhores lojas do seu bairro.</p>
          </div>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full sm:w-auto flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn-primary" type="submit">Quero começar</button>
          </form>
          {status === "ok" && (
            <p className="mt-3 text-sm text-green-700">Obrigado! Enviaremos novidades em breve.</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-red-700">Ops, algo deu errado. Tente novamente.</p>
          )}
        </div>
      </div>
    </section>
  );
}
