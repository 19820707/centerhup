import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CenterHub — Mercado local perto de si",
  description: "Lojas, produtos frescos e serviços do bairro num só app. Compre perto e fortaleça a economia local.",
  metadataBase: new URL("https://centerhub.netlify.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}