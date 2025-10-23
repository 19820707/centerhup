import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CenterHub — Marketplace local para apoiar o comércio do seu bairro",
  description: "Lojas locais, produtos frescos e serviços do bairro reunidos num só app. Apoie comerciantes locais e fortaleça a economia da sua comunidade.",
  metadataBase: new URL("https://centerhup.com"),
  openGraph: {
    title: "CenterHub - Marketplace Local",
    description: "Perto de si. Compre perto. Fortaleça a sua comunidade.",
    url: "https://centerhup.com",
    siteName: "CenterHub",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "CenterHub" }
    ],
    locale: "pt_PT",
    type: "website"
  },
  twitter: { card: "summary_large_image", site: "@centerhub" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}