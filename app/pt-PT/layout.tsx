import type { Metadata } from "next";
import "./globals.css";
import { initWebVitals } from "../reportWebVitals";
import ClientProviders from "./providers";

export const metadata: Metadata = {
  title: "CenterHub — Mercado local perto de si",
  description: "Lojas, produtos frescos e serviços do bairro num só app. Compre perto e fortaleça a economia local.",
  metadataBase: new URL("https://centerhub.netlify.app"),
  keywords: ["marketplace local", "comércio local", "lojas bairro", "produtos frescos", "economia local", "Portugal"],
  authors: [{ name: "CenterHub" }],
  creator: "CenterHub",
  publisher: "CenterHub",
  openGraph: {
    type: "website",
    url: "https://centerhub.netlify.app/pt-PT",
    title: "CenterHub — Mercado local perto de si",
    description: "Lojas, produtos frescos e serviços do bairro num só app. Compre perto e fortaleça a economia local.",
    siteName: "CenterHub",
    images: [
      { 
        url: "/og-cover.jpg", 
        width: 1200, 
        height: 630, 
        alt: "CenterHub - Marketplace Local" 
      }
    ],
    locale: "pt_PT",
    countryName: "Portugal"
  },
  twitter: {
    card: "summary_large_image",
    site: "@centerhub",
    creator: "@centerhub",
    title: "CenterHub — Mercado local perto de si",
    description: "Lojas, produtos frescos e serviços do bairro num só app.",
    images: ["/og-cover.jpg"]
  },
  alternates: {
    canonical: "https://centerhub.netlify.app/pt-PT"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // TODO: Adicionar código real
  }
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode; 
}>) {
  const locale = 'pt-PT';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CenterHub",
    "description": "Marketplace local para apoiar o comércio do seu bairro",
    "url": "https://centerhub.netlify.app/pt-PT",
    "inLanguage": locale,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://centerhub.netlify.app/pt-PT/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CenterHub",
      "url": "https://centerhub.netlify.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://centerhub.netlify.app/logo.png"
      },
      "sameAs": [
        "https://twitter.com/centerhub",
        "https://facebook.com/centerhub"
      ]
    },
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "CenterHub",
      "description": "Marketplace local que conecta clientes com comerciantes do bairro",
      "url": "https://centerhub.netlify.app/pt-PT",
      "telephone": "+351-XXX-XXX-XXX",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PT",
        "addressLocality": "Portugal"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "39.5",
        "longitude": "-8.0"
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "€€",
      "paymentAccepted": ["Cash", "Credit Card", "MB Way"],
      "currenciesAccepted": "EUR"
    }
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                import('../reportWebVitals').then(module => {
                  module.initWebVitals();
                }).catch(() => {
                  // Fallback se web-vitals não estiver disponível
                });
              }
            `
          }}
        />
        <link rel="preload" href="/fonts/Inter-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#111827" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CenterHub" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50">
          Saltar para o conteúdo principal
        </a>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
