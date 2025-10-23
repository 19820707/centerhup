"use client";
import { useState } from "react";

const languages = [
  { code: "pt-PT", name: "Português", flag: "🇵🇹", region: "Portugal" },
  { code: "pt-BR", name: "Português", flag: "🇧🇷", region: "Brasil" },
  { code: "en-US", name: "English", flag: "🇺🇸", region: "United States" },
  { code: "en-GB", name: "English", flag: "🇬🇧", region: "United Kingdom" },
  { code: "es-ES", name: "Español", flag: "🇪🇸", region: "España" },
  { code: "es-MX", name: "Español", flag: "🇲🇽", region: "México" },
  { code: "fr-FR", name: "Français", flag: "🇫🇷", region: "France" },
  { code: "de-DE", name: "Deutsch", flag: "🇩🇪", region: "Deutschland" },
  { code: "it-IT", name: "Italiano", flag: "🇮🇹", region: "Italia" },
  { code: "ru-RU", name: "Русский", flag: "🇷🇺", region: "Россия" },
  { code: "ja-JP", name: "日本語", flag: "🇯🇵", region: "日本" },
  { code: "ko-KR", name: "한국어", flag: "🇰🇷", region: "대한민국" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳", region: "中国" },
  { code: "zh-TW", name: "中文", flag: "🇹🇼", region: "台灣" },
  { code: "ar-SA", name: "العربية", flag: "🇸🇦", region: "السعودية" },
  { code: "hi-IN", name: "हिन्दी", flag: "🇮🇳", region: "भारत" },
  { code: "th-TH", name: "ไทย", flag: "🇹🇭", region: "ประเทศไทย" },
  { code: "vi-VN", name: "Tiếng Việt", flag: "🇻🇳", region: "Việt Nam" },
  { code: "nl-NL", name: "Nederlands", flag: "🇳🇱", region: "Nederland" },
  { code: "sv-SE", name: "Svenska", flag: "🇸🇪", region: "Sverige" }
];

const currencies = [
  { code: "EUR", symbol: "€", name: "Euro", country: "🇪🇺" },
  { code: "USD", symbol: "$", name: "US Dollar", country: "🇺🇸" },
  { code: "GBP", symbol: "£", name: "British Pound", country: "🇬🇧" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", country: "🇧🇷" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", country: "🇯🇵" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", country: "🇨🇳" },
  { code: "KRW", symbol: "₩", name: "South Korean Won", country: "🇰🇷" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", country: "🇮🇳" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", country: "🇷🇺" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", country: "🇨🇦" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", country: "🇦🇺" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", country: "🇨🇭" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", country: "🇸🇪" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", country: "🇳🇴" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", country: "🇩🇰" }
];

const regions = [
  { code: "PT", name: "Portugal", flag: "🇵🇹", currency: "EUR" },
  { code: "BR", name: "Brasil", flag: "🇧🇷", currency: "BRL" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { code: "ES", name: "España", flag: "🇪🇸", currency: "EUR" },
  { code: "MX", name: "México", flag: "🇲🇽", currency: "MXN" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR" },
  { code: "DE", name: "Deutschland", flag: "🇩🇪", currency: "EUR" },
  { code: "IT", name: "Italia", flag: "🇮🇹", currency: "EUR" },
  { code: "RU", name: "Россия", flag: "🇷🇺", currency: "RUB" },
  { code: "JP", name: "日本", flag: "🇯🇵", currency: "JPY" },
  { code: "KR", name: "대한민국", flag: "🇰🇷", currency: "KRW" },
  { code: "CN", name: "中国", flag: "🇨🇳", currency: "CNY" },
  { code: "TW", name: "台灣", flag: "🇹🇼", currency: "TWD" },
  { code: "SA", name: "السعودية", flag: "🇸🇦", currency: "SAR" },
  { code: "IN", name: "भारत", flag: "🇮🇳", currency: "INR" },
  { code: "TH", name: "ประเทศไทย", flag: "🇹🇭", currency: "THB" },
  { code: "VN", name: "Việt Nam", flag: "🇻🇳", currency: "VND" },
  { code: "NL", name: "Nederland", flag: "🇳🇱", currency: "EUR" },
  { code: "SE", name: "Sverige", flag: "🇸🇪", currency: "SEK" }
];

export function ProfessionalSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [activeTab, setActiveTab] = useState<"language" | "currency" | "region">("language");
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    // Auto-select corresponding region
    const matchingRegion = regions.find(r => r.code === language.code.split('-')[1]);
    if (matchingRegion) setSelectedRegion(matchingRegion);
  };

  const handleCurrencyChange = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency);
  };

  const handleRegionChange = (region: typeof regions[0]) => {
    setSelectedRegion(region);
    // Auto-select corresponding currency
    const matchingCurrency = currencies.find(c => c.code === region.currency);
    if (matchingCurrency) setSelectedCurrency(matchingCurrency);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-700 transition-colors border border-gray-200 rounded-lg px-3 py-2"
      >
        <span className="text-lg">{selectedLanguage.flag}</span>
        <span className="hidden sm:inline">{selectedLanguage.name}</span>
        <span className="text-gray-400">-</span>
        <span className="text-lg">{selectedCurrency.symbol}</span>
        <span className="hidden sm:inline">{selectedCurrency.code}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Change language</h3>
            <p className="text-sm text-gray-600">You are shopping on CenterHub.{selectedRegion.code.toLowerCase()}</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("language")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "language"
                  ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Language
            </button>
            <button
              onClick={() => setActiveTab("currency")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "currency"
                  ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Currency
            </button>
            <button
              onClick={() => setActiveTab("region")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "region"
                  ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Country/Region
            </button>
          </div>

          {/* Content */}
          <div className="max-h-80 overflow-y-auto">
            {activeTab === "language" && (
              <div className="p-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors ${
                      selectedLanguage.code === language.code ? "bg-brand-50 text-brand-700" : "text-gray-700"
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{language.name}</div>
                      <div className="text-xs text-gray-500">{language.region}</div>
                    </div>
                    {selectedLanguage.code === language.code && (
                      <svg className="w-4 h-4 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeTab === "currency" && (
              <div className="p-2">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors ${
                      selectedCurrency.code === currency.code ? "bg-brand-50 text-brand-700" : "text-gray-700"
                    }`}
                  >
                    <span className="text-lg">{currency.country}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{currency.symbol} {currency.code}</div>
                      <div className="text-xs text-gray-500">{currency.name}</div>
                    </div>
                    {selectedCurrency.code === currency.code && (
                      <svg className="w-4 h-4 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}

            {activeTab === "region" && (
              <div className="p-2">
                {regions.map((region) => (
                  <button
                    key={region.code}
                    onClick={() => handleRegionChange(region)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors ${
                      selectedRegion.code === region.code ? "bg-brand-50 text-brand-700" : "text-gray-700"
                    }`}
                  >
                    <span className="text-lg">{region.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{region.name}</div>
                      <div className="text-xs text-gray-500">{region.currency}</div>
                    </div>
                    {selectedRegion.code === region.code && (
                      <svg className="w-4 h-4 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
