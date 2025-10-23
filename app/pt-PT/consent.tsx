'use client';
import { useEffect, useState } from 'react';

export function ConsentBanner({ onAccept }: { onAccept: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Verificar se já deu consentimento
    const hasConsent = localStorage.getItem('centerhub-consent') === 'yes';
    setVisible(!hasConsent);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('centerhub-consent', 'yes');
    setVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('centerhub-consent', 'no');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      role="dialog" 
      aria-live="polite" 
      aria-labelledby="consent-title"
      className="fixed bottom-4 left-4 right-4 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-4 max-w-md mx-auto"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 id="consent-title" className="font-semibold text-gray-900 mb-2">
            🍪 Cookies e Analytics
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Usamos cookies para melhorar sua experiência e analisar o uso do site. 
            Aceita que coletemos dados de uso?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleAccept}
              className="btn-primary btn-sm"
              aria-label="Aceitar cookies e analytics"
            >
              Aceitar
            </button>
            <button
              onClick={handleDecline}
              className="btn-ghost btn-sm"
              aria-label="Recusar cookies e analytics"
            >
              Recusar
            </button>
          </div>
        </div>
        <button
          onClick={handleDecline}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Fechar banner de consentimento"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
