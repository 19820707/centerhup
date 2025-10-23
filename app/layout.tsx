import type { Metadata } from "next";
import "./globals.css";
import { initWebVitals } from "./reportWebVitals";

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CenterHub",
    "description": "Marketplace local para apoiar o comércio do seu bairro",
    "url": "https://centerhub.netlify.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://centerhub.netlify.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CenterHub",
      "url": "https://centerhub.netlify.app"
    }
  };

  return (
    <html lang="pt-PT">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                import('./reportWebVitals').then(module => {
                  module.initWebVitals();
                });
              }
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}