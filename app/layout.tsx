import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centerhup — seu centro simples para organizar e lançar ideias",
  description: "O Centerhup ajuda você a centralizar projetos e lançar páginas em minutos.",
  metadataBase: new URL("https://centerhup.com"),
  openGraph: {
    title: "Centerhup",
    description: "Centralize projetos e lance páginas em minutos.",
    url: "https://centerhup.com",
    siteName: "Centerhup",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Centerhup" }
    ],
    locale: "pt_BR",
    type: "website"
  },
  twitter: { card: "summary_large_image", site: "@centerhup" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}