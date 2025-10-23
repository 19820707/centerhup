'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { ConsentBanner } from './consent';

// Lazy load PostHog para evitar problemas de SSR
let posthog: any = null;

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [consented, setConsented] = useState<boolean | null>(null);

  useEffect(() => {
    // Verificar consentimento
    const consent = localStorage.getItem('centerhub-consent');
    const hasConsent = consent === 'yes';
    setConsented(hasConsent);

    // Inicializar PostHog se consentido
    if (hasConsent && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      import('posthog-js').then((ph) => {
        posthog = ph.default;
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
          loaded: (ph: any) => {
            // Opt-out se não tiver consentimento
            if (!hasConsent) {
              ph.opt_out_capturing();
            }
          },
        });
      }).catch(console.error);
    }
  }, []);

  const handleConsentAccept = () => {
    setConsented(true);
    
    // Inicializar PostHog após consentimento
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      import('posthog-js').then((ph) => {
        posthog = ph.default;
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        });
      }).catch(console.error);
    }
  };

  return (
    <>
      {/* Google Analytics - só carrega com consentimento */}
      {consented && process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script 
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} 
            strategy="afterInteractive" 
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
            `}
          </Script>
        </>
      )}

      {/* Banner de consentimento - só mostra se não decidiu ainda */}
      {consented === false && (
        <ConsentBanner onAccept={handleConsentAccept} />
      )}

      {children}
    </>
  );
}
