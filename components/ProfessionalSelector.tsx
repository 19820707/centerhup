"use client";
import { useState, useEffect } from "react";

// Sistema de tradução
const translations = {
  "pt-PT": {
    "Change language": "Alterar idioma",
    "You are shopping on": "Está a comprar em",
    "Search...": "Pesquisar...",
    "Recent": "Recentes",
    "Language": "Idioma",
    "Currency": "Moeda",
    "Country/Region": "País/Região",
    "Done": "Concluído",
    "No languages found for": "Nenhum idioma encontrado para",
    "No currencies found for": "Nenhuma moeda encontrada para",
    "No countries found for": "Nenhum país encontrado para"
  },
  "en-US": {
    "Change language": "Change language",
    "You are shopping on": "You are shopping on",
    "Search...": "Search...",
    "Recent": "Recent",
    "Language": "Language",
    "Currency": "Currency",
    "Country/Region": "Country/Region",
    "Done": "Done",
    "No languages found for": "No languages found for",
    "No currencies found for": "No currencies found for",
    "No countries found for": "No countries found for"
  },
  "es-ES": {
    "Change language": "Cambiar idioma",
    "You are shopping on": "Estás comprando en",
    "Search...": "Buscar...",
    "Recent": "Recientes",
    "Language": "Idioma",
    "Currency": "Moneda",
    "Country/Region": "País/Región",
    "Done": "Hecho",
    "No languages found for": "No se encontraron idiomas para",
    "No currencies found for": "No se encontraron monedas para",
    "No countries found for": "No se encontraron países para"
  },
  "fr-FR": {
    "Change language": "Changer de langue",
    "You are shopping on": "Vous achetez sur",
    "Search...": "Rechercher...",
    "Recent": "Récent",
    "Language": "Langue",
    "Currency": "Devise",
    "Country/Region": "Pays/Région",
    "Done": "Terminé",
    "No languages found for": "Aucune langue trouvée pour",
    "No currencies found for": "Aucune devise trouvée pour",
    "No countries found for": "Aucun pays trouvé pour"
  },
  "de-DE": {
    "Change language": "Sprache ändern",
    "You are shopping on": "Sie kaufen auf",
    "Search...": "Suchen...",
    "Recent": "Kürzlich",
    "Language": "Sprache",
    "Currency": "Währung",
    "Country/Region": "Land/Region",
    "Done": "Fertig",
    "No languages found for": "Keine Sprachen gefunden für",
    "No currencies found for": "Keine Währungen gefunden für",
    "No countries found for": "Keine Länder gefunden für"
  }
};

// Função para traduzir texto
const t = (key: string, lang: string = "pt-PT"): string => {
  const langTranslations = translations[lang as keyof typeof translations];
  return (langTranslations as any)?.[key] || key;
};

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
  { code: "USD", symbol: "$", name: "US Dollar", country: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", country: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", country: "🇬🇧" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", country: "🇯🇵" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", country: "🇨🇳" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", country: "🇨🇭" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", country: "🇨🇦" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", country: "🇦🇺" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", country: "🇳🇿" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", country: "🇸🇪" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", country: "🇳🇴" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", country: "🇩🇰" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty", country: "🇵🇱" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna", country: "🇨🇿" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", country: "🇭🇺" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", country: "🇷🇺" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", country: "🇹🇷" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", country: "🇧🇷" },
  { code: "MXN", symbol: "$", name: "Mexican Peso", country: "🇲🇽" },
  { code: "ARS", symbol: "$", name: "Argentine Peso", country: "🇦🇷" },
  { code: "CLP", symbol: "$", name: "Chilean Peso", country: "🇨🇱" },
  { code: "COP", symbol: "$", name: "Colombian Peso", country: "🇨🇴" },
  { code: "PEN", symbol: "S/", name: "Peruvian Sol", country: "🇵🇪" },
  { code: "UYU", symbol: "$", name: "Uruguayan Peso", country: "🇺🇾" },
  { code: "KRW", symbol: "₩", name: "South Korean Won", country: "🇰🇷" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", country: "🇮🇳" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", country: "🇮🇩" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", country: "🇲🇾" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", country: "🇸🇬" },
  { code: "THB", symbol: "฿", name: "Thai Baht", country: "🇹🇭" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong", country: "🇻🇳" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso", country: "🇵🇭" },
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar", country: "🇹🇼" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", country: "🇭🇰" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", country: "🇸🇦" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", country: "🇦🇪" },
  { code: "QAR", symbol: "﷼", name: "Qatari Riyal", country: "🇶🇦" },
  { code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar", country: "🇰🇼" },
  { code: "BHD", symbol: "د.ب", name: "Bahraini Dinar", country: "🇧🇭" },
  { code: "OMR", symbol: "﷼", name: "Omani Rial", country: "🇴🇲" },
  { code: "JOD", symbol: "د.ا", name: "Jordanian Dinar", country: "🇯🇴" },
  { code: "LBP", symbol: "ل.ل", name: "Lebanese Pound", country: "🇱🇧" },
  { code: "EGP", symbol: "£", name: "Egyptian Pound", country: "🇪🇬" },
  { code: "MAD", symbol: "د.م.", name: "Moroccan Dirham", country: "🇲🇦" },
  { code: "TND", symbol: "د.ت", name: "Tunisian Dinar", country: "🇹🇳" },
  { code: "DZD", symbol: "د.ج", name: "Algerian Dinar", country: "🇩🇿" },
  { code: "ZAR", symbol: "R", name: "South African Rand", country: "🇿🇦" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", country: "🇳🇬" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", country: "🇰🇪" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi", country: "🇬🇭" },
  { code: "ETB", symbol: "Br", name: "Ethiopian Birr", country: "🇪🇹" },
  { code: "UGX", symbol: "USh", name: "Ugandan Shilling", country: "🇺🇬" },
  { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling", country: "🇹🇿" },
  { code: "MAD", symbol: "د.م.", name: "Moroccan Dirham", country: "🇲🇦" },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel", country: "🇮🇱" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", country: "🇵🇰" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", country: "🇧🇩" },
  { code: "LKR", symbol: "₨", name: "Sri Lankan Rupee", country: "🇱🇰" },
  { code: "NPR", symbol: "₨", name: "Nepalese Rupee", country: "🇳🇵" },
  { code: "AFN", symbol: "؋", name: "Afghan Afghani", country: "🇦🇫" },
  { code: "KZT", symbol: "₸", name: "Kazakhstani Tenge", country: "🇰🇿" },
  { code: "UZS", symbol: "лв", name: "Uzbekistani Som", country: "🇺🇿" },
  { code: "KGS", symbol: "лв", name: "Kyrgyzstani Som", country: "🇰🇬" },
  { code: "TJS", symbol: "SM", name: "Tajikistani Somoni", country: "🇹🇯" },
  { code: "TMT", symbol: "T", name: "Turkmenistani Manat", country: "🇹🇲" },
  { code: "AZN", symbol: "₼", name: "Azerbaijani Manat", country: "🇦🇿" },
  { code: "AMD", symbol: "֏", name: "Armenian Dram", country: "🇦🇲" },
  { code: "GEL", symbol: "₾", name: "Georgian Lari", country: "🇬🇪" },
  { code: "MDL", symbol: "L", name: "Moldovan Leu", country: "🇲🇩" },
  { code: "RON", symbol: "lei", name: "Romanian Leu", country: "🇷🇴" },
  { code: "BGN", symbol: "лв", name: "Bulgarian Lev", country: "🇧🇬" },
  { code: "HRK", symbol: "kn", name: "Croatian Kuna", country: "🇭🇷" },
  { code: "RSD", symbol: "дин", name: "Serbian Dinar", country: "🇷🇸" },
  { code: "MKD", symbol: "ден", name: "Macedonian Denar", country: "🇲🇰" },
  { code: "ALL", symbol: "L", name: "Albanian Lek", country: "🇦🇱" },
  { code: "BAM", symbol: "КМ", name: "Bosnia-Herzegovina Mark", country: "🇧🇦" },
  { code: "ISK", symbol: "kr", name: "Icelandic Krona", country: "🇮🇸" },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia", country: "🇺🇦" },
  { code: "BYN", symbol: "Br", name: "Belarusian Ruble", country: "🇧🇾" },
  { code: "LTL", symbol: "Lt", name: "Lithuanian Litas", country: "🇱🇹" },
  { code: "LVL", symbol: "Ls", name: "Latvian Lats", country: "🇱🇻" },
  { code: "EEK", symbol: "kr", name: "Estonian Kroon", country: "🇪🇪" }
];

const regions = [
  // Europa
  { code: "PT", name: "Portugal", flag: "🇵🇹", currency: "EUR" },
  { code: "ES", name: "España", flag: "🇪🇸", currency: "EUR" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR" },
  { code: "DE", name: "Deutschland", flag: "🇩🇪", currency: "EUR" },
  { code: "IT", name: "Italia", flag: "🇮🇹", currency: "EUR" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP" },
  { code: "IE", name: "Ireland", flag: "🇮🇪", currency: "EUR" },
  { code: "NL", name: "Nederland", flag: "🇳🇱", currency: "EUR" },
  { code: "BE", name: "Belgium", flag: "🇧🇪", currency: "EUR" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺", currency: "EUR" },
  { code: "AT", name: "Austria", flag: "🇦🇹", currency: "EUR" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", currency: "CHF" },
  { code: "SE", name: "Sverige", flag: "🇸🇪", currency: "SEK" },
  { code: "NO", name: "Norway", flag: "🇳🇴", currency: "NOK" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", currency: "DKK" },
  { code: "FI", name: "Finland", flag: "🇫🇮", currency: "EUR" },
  { code: "IS", name: "Iceland", flag: "🇮🇸", currency: "ISK" },
  { code: "PL", name: "Poland", flag: "🇵🇱", currency: "PLN" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿", currency: "CZK" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰", currency: "EUR" },
  { code: "HU", name: "Hungary", flag: "🇭🇺", currency: "HUF" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮", currency: "EUR" },
  { code: "HR", name: "Croatia", flag: "🇭🇷", currency: "HRK" },
  { code: "BA", name: "Bosnia and Herzegovina", flag: "🇧🇦", currency: "BAM" },
  { code: "RS", name: "Serbia", flag: "🇷🇸", currency: "RSD" },
  { code: "ME", name: "Montenegro", flag: "🇲🇪", currency: "EUR" },
  { code: "MK", name: "North Macedonia", flag: "🇲🇰", currency: "MKD" },
  { code: "AL", name: "Albania", flag: "🇦🇱", currency: "ALL" },
  { code: "GR", name: "Greece", flag: "🇬🇷", currency: "EUR" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬", currency: "BGN" },
  { code: "RO", name: "Romania", flag: "🇷🇴", currency: "RON" },
  { code: "MD", name: "Moldova", flag: "🇲🇩", currency: "MDL" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦", currency: "UAH" },
  { code: "BY", name: "Belarus", flag: "🇧🇾", currency: "BYN" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹", currency: "EUR" },
  { code: "LV", name: "Latvia", flag: "🇱🇻", currency: "EUR" },
  { code: "EE", name: "Estonia", flag: "🇪🇪", currency: "EUR" },
  { code: "RU", name: "Russia", flag: "🇷🇺", currency: "RUB" },
  { code: "TR", name: "Turkey", flag: "🇹🇷", currency: "TRY" },
  { code: "CY", name: "Cyprus", flag: "🇨🇾", currency: "EUR" },
  { code: "MT", name: "Malta", flag: "🇲🇹", currency: "EUR" },

  // América do Norte
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { code: "MX", name: "México", flag: "🇲🇽", currency: "MXN" },

  // América Central e Caribe
  { code: "GT", name: "Guatemala", flag: "🇬🇹", currency: "GTQ" },
  { code: "BZ", name: "Belize", flag: "🇧🇿", currency: "BZD" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻", currency: "USD" },
  { code: "HN", name: "Honduras", flag: "🇭🇳", currency: "HNL" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮", currency: "NIO" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷", currency: "CRC" },
  { code: "PA", name: "Panama", flag: "🇵🇦", currency: "PAB" },
  { code: "CU", name: "Cuba", flag: "🇨🇺", currency: "CUP" },
  { code: "JM", name: "Jamaica", flag: "🇯🇲", currency: "JMD" },
  { code: "HT", name: "Haiti", flag: "🇭🇹", currency: "HTG" },
  { code: "DO", name: "Dominican Republic", flag: "🇩🇴", currency: "DOP" },
  { code: "PR", name: "Puerto Rico", flag: "🇵🇷", currency: "USD" },

  // América do Sul
  { code: "BR", name: "Brasil", flag: "🇧🇷", currency: "BRL" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", currency: "ARS" },
  { code: "CL", name: "Chile", flag: "🇨🇱", currency: "CLP" },
  { code: "CO", name: "Colombia", flag: "🇨🇴", currency: "COP" },
  { code: "PE", name: "Peru", flag: "🇵🇪", currency: "PEN" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", currency: "VES" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", currency: "USD" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴", currency: "BOB" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾", currency: "PYG" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", currency: "UYU" },
  { code: "GY", name: "Guyana", flag: "🇬🇾", currency: "GYD" },
  { code: "SR", name: "Suriname", flag: "🇸🇷", currency: "SRD" },
  { code: "FK", name: "Falkland Islands", flag: "🇫🇰", currency: "FKP" },

  // Ásia
  { code: "CN", name: "China", flag: "🇨🇳", currency: "CNY" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", currency: "KRW" },
  { code: "KP", name: "North Korea", flag: "🇰🇵", currency: "KPW" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼", currency: "TWD" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰", currency: "HKD" },
  { code: "MO", name: "Macau", flag: "🇲🇴", currency: "MOP" },
  { code: "MN", name: "Mongolia", flag: "🇲🇳", currency: "MNT" },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", currency: "PKR" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", currency: "BDT" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", currency: "LKR" },
  { code: "MV", name: "Maldives", flag: "🇲🇻", currency: "MVR" },
  { code: "BT", name: "Bhutan", flag: "🇧🇹", currency: "BTN" },
  { code: "NP", name: "Nepal", flag: "🇳🇵", currency: "NPR" },
  { code: "AF", name: "Afghanistan", flag: "🇦🇫", currency: "AFN" },
  { code: "TH", name: "Thailand", flag: "🇹🇭", currency: "THB" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", currency: "MYR" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", currency: "SGD" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", currency: "IDR" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", currency: "PHP" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳", currency: "VND" },
  { code: "LA", name: "Laos", flag: "🇱🇦", currency: "LAK" },
  { code: "KH", name: "Cambodia", flag: "🇰🇭", currency: "KHR" },
  { code: "MM", name: "Myanmar", flag: "🇲🇲", currency: "MMK" },
  { code: "BN", name: "Brunei", flag: "🇧🇳", currency: "BND" },
  { code: "TL", name: "East Timor", flag: "🇹🇱", currency: "USD" },
  { code: "KZ", name: "Kazakhstan", flag: "🇰🇿", currency: "KZT" },
  { code: "UZ", name: "Uzbekistan", flag: "🇺🇿", currency: "UZS" },
  { code: "KG", name: "Kyrgyzstan", flag: "🇰🇬", currency: "KGS" },
  { code: "TJ", name: "Tajikistan", flag: "🇹🇯", currency: "TJS" },
  { code: "TM", name: "Turkmenistan", flag: "🇹🇲", currency: "TMT" },

  // Oriente Médio
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR" },
  { code: "AE", name: "UAE", flag: "🇦🇪", currency: "AED" },
  { code: "QA", name: "Qatar", flag: "🇶🇦", currency: "QAR" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼", currency: "KWD" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭", currency: "BHD" },
  { code: "OM", name: "Oman", flag: "🇴🇲", currency: "OMR" },
  { code: "YE", name: "Yemen", flag: "🇾🇪", currency: "YER" },
  { code: "IQ", name: "Iraq", flag: "🇮🇶", currency: "IQD" },
  { code: "IR", name: "Iran", flag: "🇮🇷", currency: "IRR" },
  { code: "IL", name: "Israel", flag: "🇮🇱", currency: "ILS" },
  { code: "PS", name: "Palestine", flag: "🇵🇸", currency: "ILS" },
  { code: "JO", name: "Jordan", flag: "🇯🇴", currency: "JOD" },
  { code: "LB", name: "Lebanon", flag: "🇱🇧", currency: "LBP" },
  { code: "SY", name: "Syria", flag: "🇸🇾", currency: "SYP" },

  // África
  { code: "EG", name: "Egypt", flag: "🇪🇬", currency: "EGP" },
  { code: "LY", name: "Libya", flag: "🇱🇾", currency: "LYD" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳", currency: "TND" },
  { code: "DZ", name: "Algeria", flag: "🇩🇿", currency: "DZD" },
  { code: "MA", name: "Morocco", flag: "🇲🇦", currency: "MAD" },
  { code: "SD", name: "Sudan", flag: "🇸🇩", currency: "SDG" },
  { code: "SS", name: "South Sudan", flag: "🇸🇸", currency: "SSP" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹", currency: "ETB" },
  { code: "ER", name: "Eritrea", flag: "🇪🇷", currency: "ERN" },
  { code: "DJ", name: "Djibouti", flag: "🇩🇯", currency: "DJF" },
  { code: "SO", name: "Somalia", flag: "🇸🇴", currency: "SOS" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES" },
  { code: "UG", name: "Uganda", flag: "🇺🇬", currency: "UGX" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", currency: "TZS" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", currency: "RWF" },
  { code: "BI", name: "Burundi", flag: "🇧🇮", currency: "BIF" },
  { code: "CD", name: "DR Congo", flag: "🇨🇩", currency: "CDF" },
  { code: "CG", name: "Congo", flag: "🇨🇬", currency: "XAF" },
  { code: "CF", name: "Central African Republic", flag: "🇨🇫", currency: "XAF" },
  { code: "TD", name: "Chad", flag: "🇹🇩", currency: "XAF" },
  { code: "CM", name: "Cameroon", flag: "🇨🇲", currency: "XAF" },
  { code: "GQ", name: "Equatorial Guinea", flag: "🇬🇶", currency: "XAF" },
  { code: "GA", name: "Gabon", flag: "🇬🇦", currency: "XAF" },
  { code: "ST", name: "São Tomé and Príncipe", flag: "🇸🇹", currency: "STN" },
  { code: "AO", name: "Angola", flag: "🇦🇴", currency: "AOA" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲", currency: "ZMW" },
  { code: "ZW", name: "Zimbabwe", flag: "🇿🇼", currency: "ZWL" },
  { code: "BW", name: "Botswana", flag: "🇧🇼", currency: "BWP" },
  { code: "NA", name: "Namibia", flag: "🇳🇦", currency: "NAD" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", currency: "ZAR" },
  { code: "LS", name: "Lesotho", flag: "🇱🇸", currency: "LSL" },
  { code: "SZ", name: "Eswatini", flag: "🇸🇿", currency: "SZL" },
  { code: "MG", name: "Madagascar", flag: "🇲🇬", currency: "MGA" },
  { code: "MU", name: "Mauritius", flag: "🇲🇺", currency: "MUR" },
  { code: "SC", name: "Seychelles", flag: "🇸🇨", currency: "SCR" },
  { code: "KM", name: "Comoros", flag: "🇰🇲", currency: "KMF" },
  { code: "YT", name: "Mayotte", flag: "🇾🇹", currency: "EUR" },
  { code: "RE", name: "Réunion", flag: "🇷🇪", currency: "EUR" },
  { code: "MZ", name: "Mozambique", flag: "🇲🇿", currency: "MZN" },
  { code: "MW", name: "Malawi", flag: "🇲🇼", currency: "MWK" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS" },
  { code: "TG", name: "Togo", flag: "🇹🇬", currency: "XOF" },
  { code: "BJ", name: "Benin", flag: "🇧🇯", currency: "XOF" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫", currency: "XOF" },
  { code: "NE", name: "Niger", flag: "🇳🇪", currency: "XOF" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", currency: "XOF" },
  { code: "LR", name: "Liberia", flag: "🇱🇷", currency: "LRD" },
  { code: "SL", name: "Sierra Leone", flag: "🇸🇱", currency: "SLE" },
  { code: "GN", name: "Guinea", flag: "🇬🇳", currency: "GNF" },
  { code: "GW", name: "Guinea-Bissau", flag: "🇬🇼", currency: "XOF" },
  { code: "GM", name: "Gambia", flag: "🇬🇲", currency: "GMD" },
  { code: "SN", name: "Senegal", flag: "🇸🇳", currency: "XOF" },
  { code: "ML", name: "Mali", flag: "🇲🇱", currency: "XOF" },
  { code: "MR", name: "Mauritania", flag: "🇲🇷", currency: "MRU" },
  { code: "CV", name: "Cape Verde", flag: "🇨🇻", currency: "CVE" },

  // Oceania
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", currency: "NZD" },
  { code: "FJ", name: "Fiji", flag: "🇫🇯", currency: "FJD" },
  { code: "PG", name: "Papua New Guinea", flag: "🇵🇬", currency: "PGK" },
  { code: "SB", name: "Solomon Islands", flag: "🇸🇧", currency: "SBD" },
  { code: "VU", name: "Vanuatu", flag: "🇻🇺", currency: "VUV" },
  { code: "NC", name: "New Caledonia", flag: "🇳🇨", currency: "XPF" },
  { code: "PF", name: "French Polynesia", flag: "🇵🇫", currency: "XPF" },
  { code: "WS", name: "Samoa", flag: "🇼🇸", currency: "WST" },
  { code: "TO", name: "Tonga", flag: "🇹🇴", currency: "TOP" },
  { code: "KI", name: "Kiribati", flag: "🇰🇮", currency: "AUD" },
  { code: "TV", name: "Tuvalu", flag: "🇹🇻", currency: "AUD" },
  { code: "NR", name: "Nauru", flag: "🇳🇷", currency: "AUD" },
  { code: "PW", name: "Palau", flag: "🇵🇼", currency: "USD" },
  { code: "FM", name: "Micronesia", flag: "🇫🇲", currency: "USD" },
  { code: "MH", name: "Marshall Islands", flag: "🇲🇭", currency: "USD" }
];

export function ProfessionalSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [activeTab, setActiveTab] = useState<"language" | "currency" | "region">("language");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recentSelections, setRecentSelections] = useState<Array<{
    type: 'language' | 'currency' | 'region';
    item: any;
    timestamp: number;
  }>>([]);

  // Carregar preferências salvas ao inicializar
  useEffect(() => {
    const savedRegion = localStorage.getItem('selectedRegion');
    const savedCurrency = localStorage.getItem('selectedCurrency');
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedRecentSelections = localStorage.getItem('recentSelections');

    if (savedRegion) {
      try {
        const region = JSON.parse(savedRegion);
        setSelectedRegion(region);
      } catch (e) {
        console.error('Erro ao carregar região salva:', e);
      }
    }

    if (savedCurrency) {
      try {
        const currency = JSON.parse(savedCurrency);
        setSelectedCurrency(currency);
      } catch (e) {
        console.error('Erro ao carregar moeda salva:', e);
      }
    }

    if (savedLanguage) {
      try {
        const language = JSON.parse(savedLanguage);
        setSelectedLanguage(language);
        document.documentElement.lang = language.code;
      } catch (e) {
        console.error('Erro ao carregar idioma salvo:', e);
      }
    }

    if (savedRecentSelections) {
      try {
        const recent = JSON.parse(savedRecentSelections);
        setRecentSelections(recent);
      } catch (e) {
        console.error('Erro ao carregar seleções recentes:', e);
      }
    }

    // Detectar localização do usuário
    detectUserLocation();
  }, []);

  // Detectar localização do usuário
  const detectUserLocation = () => {
    if (navigator.language) {
      const userLang = navigator.language;
      const matchingLanguage = languages.find(lang => 
        lang.code === userLang || lang.code.startsWith(userLang.split('-')[0])
      );
      
      if (matchingLanguage) {
        const matchingRegion = regions.find(r => r.code === matchingLanguage.code.split('-')[1]);
        if (matchingRegion) {
          setSelectedLanguage(matchingLanguage);
          setSelectedRegion(matchingRegion);
          const matchingCurrency = currencies.find(c => c.code === matchingRegion.currency);
          if (matchingCurrency) setSelectedCurrency(matchingCurrency);
        }
      }
    }
  };

  // Funções de filtro
  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    region.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Adicionar ao histórico
  const addToRecentSelections = (type: 'language' | 'currency' | 'region', item: any) => {
    const newSelection = { type, item, timestamp: Date.now() };
    const updated = [newSelection, ...recentSelections.filter(s => 
      !(s.type === type && s.item.code === item.code)
    )].slice(0, 5); // Manter apenas 5 seleções recentes
    
    setRecentSelections(updated);
    localStorage.setItem('recentSelections', JSON.stringify(updated));
  };

  const handleLanguageChange = async (language: typeof languages[0]) => {
    setIsLoading(true);
    
    setSelectedLanguage(language);
    const matchingRegion = regions.find(r => r.code === language.code.split('-')[1]);
    if (matchingRegion) setSelectedRegion(matchingRegion);
    
    // Implementar mudança de idioma real
    document.documentElement.lang = language.code;
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
    // Adicionar ao histórico
    addToRecentSelections('language', language);
    
    console.log("Idioma alterado para:", language.name, language.code);
    
    // Simular delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleCurrencyChange = async (currency: typeof currencies[0]) => {
    setIsLoading(true);
    
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', JSON.stringify(currency));
    
    // Adicionar ao histórico
    addToRecentSelections('currency', currency);
    
    console.log("Moeda alterada para:", currency.name, currency.symbol);
    
    // Simular delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleRegionChange = async (region: typeof regions[0]) => {
    setIsLoading(true);
    
    setSelectedRegion(region);
    const matchingCurrency = currencies.find(c => c.code === region.currency);
    if (matchingCurrency) setSelectedCurrency(matchingCurrency);
    
    // Salvar preferências
    localStorage.setItem('selectedRegion', JSON.stringify(region));
    localStorage.setItem('selectedCurrency', JSON.stringify(matchingCurrency));
    
    // Adicionar ao histórico
    addToRecentSelections('region', region);
    
    console.log("País/Região alterado para:", region.name, region.code);
    
    // Simular mudança de domínio como Amazon
    const domainMap: { [key: string]: string } = {
      'PT': 'centerhup.pt',
      'BR': 'centerhup.com.br', 
      'US': 'centerhup.com',
      'GB': 'centerhup.co.uk',
      'ES': 'centerhup.es',
      'FR': 'centerhup.fr',
      'DE': 'centerhup.de',
      'IT': 'centerhup.it',
      'NL': 'centerhup.nl',
      'BE': 'centerhup.be',
      'CA': 'centerhup.ca',
      'AU': 'centerhup.com.au',
      'JP': 'centerhup.co.jp',
      'CN': 'centerhup.cn',
      'IN': 'centerhup.in',
      'MX': 'centerhup.com.mx',
      'AR': 'centerhup.com.ar',
      'CL': 'centerhup.cl',
      'CO': 'centerhup.com.co',
      'PE': 'centerhup.com.pe',
      'SG': 'centerhup.com.sg',
      'MY': 'centerhup.com.my',
      'TH': 'centerhup.co.th',
      'ID': 'centerhup.co.id',
      'PH': 'centerhup.com.ph',
      'VN': 'centerhup.vn',
      'KR': 'centerhup.co.kr',
      'SA': 'centerhup.com.sa',
      'AE': 'centerhup.ae',
      'EG': 'centerhup.com.eg',
      'ZA': 'centerhup.co.za',
      'NG': 'centerhup.com.ng',
      'KE': 'centerhup.co.ke',
      'GH': 'centerhup.com.gh',
      'MA': 'centerhup.ma',
      'TN': 'centerhup.tn',
      'DZ': 'centerhup.dz',
      'TR': 'centerhup.com.tr',
      'RU': 'centerhup.ru',
      'PL': 'centerhup.pl',
      'CZ': 'centerhup.cz',
      'HU': 'centerhup.hu',
      'RO': 'centerhup.ro',
      'BG': 'centerhup.bg',
      'HR': 'centerhup.hr',
      'RS': 'centerhup.rs',
      'SI': 'centerhup.si',
      'SK': 'centerhup.sk',
      'LT': 'centerhup.lt',
      'LV': 'centerhup.lv',
      'EE': 'centerhup.ee',
      'FI': 'centerhup.fi',
      'SE': 'centerhup.se',
      'NO': 'centerhup.no',
      'DK': 'centerhup.dk',
      'IS': 'centerhup.is',
      'CH': 'centerhup.ch',
      'AT': 'centerhup.at',
      'IE': 'centerhup.ie',
      'LU': 'centerhup.lu',
      'MT': 'centerhup.mt',
      'CY': 'centerhup.com.cy',
      'NZ': 'centerhup.co.nz',
      'FJ': 'centerhup.com.fj',
      'PG': 'centerhup.com.pg',
      'SB': 'centerhup.com.sb',
      'VU': 'centerhup.vu',
      'WS': 'centerhup.ws',
      'TO': 'centerhup.to',
      'KI': 'centerhup.ki',
      'TV': 'centerhup.tv',
      'NR': 'centerhup.nr',
      'PW': 'centerhup.pw',
      'FM': 'centerhup.fm',
      'MH': 'centerhup.mh'
    };
    
    const newDomain = domainMap[region.code] || 'centerhup.com';
    
    // Simular delay de carregamento
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simular redirecionamento para o domínio correto
    console.log(`Redirecionando para: https://${newDomain}`);
    
    // Em um projeto real, você faria:
    // window.location.href = `https://${newDomain}`;
    
    // Para demonstração, vamos mostrar um alert
    alert(`Você será redirecionado para: https://${newDomain}\n\nPaís/Região: ${region.name} (${region.code})\nMoeda: ${matchingCurrency?.symbol} ${matchingCurrency?.code}`);
    
    setIsLoading(false);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchTerm("");
      }
      
      if (e.key === 'Enter' && searchTerm) {
        // Selecionar primeiro resultado da busca
        if (activeTab === 'language' && filteredLanguages.length > 0) {
          handleLanguageChange(filteredLanguages[0]);
        } else if (activeTab === 'currency' && filteredCurrencies.length > 0) {
          handleCurrencyChange(filteredCurrencies[0]);
        } else if (activeTab === 'region' && filteredRegions.length > 0) {
          handleRegionChange(filteredRegions[0]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchTerm, activeTab, filteredLanguages, filteredCurrencies, filteredRegions]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-700 transition-all duration-200 border border-gray-200 rounded-lg px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Selecionar idioma, moeda e país"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <span className="text-lg">{selectedLanguage.flag}</span>
        )}
        <span className="hidden sm:inline">{selectedLanguage.name}</span>
        <span className="text-gray-400">-</span>
        <span className="text-lg">{selectedCurrency.symbol}</span>
        <span className="hidden sm:inline">{selectedCurrency.code}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">{t("Change language", selectedLanguage.code)}</h3>
            <p className="text-sm text-gray-600">
              {t("You are shopping on", selectedLanguage.code)} {(() => {
                const domainMap: { [key: string]: string } = {
                  'PT': 'CenterHub.pt',
                  'BR': 'CenterHub.com.br', 
                  'US': 'CenterHub.com',
                  'GB': 'CenterHub.co.uk',
                  'ES': 'CenterHub.es',
                  'FR': 'CenterHub.fr',
                  'DE': 'CenterHub.de',
                  'IT': 'CenterHub.it',
                  'NL': 'CenterHub.nl',
                  'BE': 'CenterHub.be',
                  'CA': 'CenterHub.ca',
                  'AU': 'CenterHub.com.au',
                  'JP': 'CenterHub.co.jp',
                  'CN': 'CenterHub.cn',
                  'IN': 'CenterHub.in',
                  'MX': 'CenterHub.com.mx',
                  'AR': 'CenterHub.com.ar',
                  'CL': 'CenterHub.cl',
                  'CO': 'CenterHub.com.co',
                  'PE': 'CenterHub.com.pe',
                  'SG': 'CenterHub.com.sg',
                  'MY': 'CenterHub.com.my',
                  'TH': 'CenterHub.co.th',
                  'ID': 'CenterHub.co.id',
                  'PH': 'CenterHub.com.ph',
                  'VN': 'CenterHub.vn',
                  'KR': 'CenterHub.co.kr',
                  'SA': 'CenterHub.com.sa',
                  'AE': 'CenterHub.ae',
                  'EG': 'CenterHub.com.eg',
                  'ZA': 'CenterHub.co.za',
                  'NG': 'CenterHub.com.ng',
                  'KE': 'CenterHub.co.ke',
                  'GH': 'CenterHub.com.gh',
                  'MA': 'CenterHub.ma',
                  'TN': 'CenterHub.tn',
                  'DZ': 'CenterHub.dz',
                  'TR': 'CenterHub.com.tr',
                  'RU': 'CenterHub.ru',
                  'PL': 'CenterHub.pl',
                  'CZ': 'CenterHub.cz',
                  'HU': 'CenterHub.hu',
                  'RO': 'CenterHub.ro',
                  'BG': 'CenterHub.bg',
                  'HR': 'CenterHub.hr',
                  'RS': 'CenterHub.rs',
                  'SI': 'CenterHub.si',
                  'SK': 'CenterHub.sk',
                  'LT': 'CenterHub.lt',
                  'LV': 'CenterHub.lv',
                  'EE': 'CenterHub.ee',
                  'FI': 'CenterHub.fi',
                  'SE': 'CenterHub.se',
                  'NO': 'CenterHub.no',
                  'DK': 'CenterHub.dk',
                  'IS': 'CenterHub.is',
                  'CH': 'CenterHub.ch',
                  'AT': 'CenterHub.at',
                  'IE': 'CenterHub.ie',
                  'LU': 'CenterHub.lu',
                  'MT': 'CenterHub.mt',
                  'CY': 'CenterHub.com.cy',
                  'NZ': 'CenterHub.co.nz',
                  'FJ': 'CenterHub.com.fj',
                  'PG': 'CenterHub.com.pg',
                  'SB': 'CenterHub.com.sb',
                  'VU': 'CenterHub.vu',
                  'WS': 'CenterHub.ws',
                  'TO': 'CenterHub.to',
                  'KI': 'CenterHub.ki',
                  'TV': 'CenterHub.tv',
                  'NR': 'CenterHub.nr',
                  'PW': 'CenterHub.pw',
                  'FM': 'CenterHub.fm',
                  'MH': 'CenterHub.mh'
                };
                return domainMap[selectedRegion.code] || 'CenterHub.com';
              })()}
            </p>
          </div>

          {/* Campo de busca */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder={t("Search...", selectedLanguage.code)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 pl-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                autoFocus
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Seleções recentes */}
          {recentSelections.length > 0 && !searchTerm && (
            <div className="p-4 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">{t("Recent", selectedLanguage.code)}</h4>
              <div className="space-y-1">
                {recentSelections.slice(0, 3).map((selection, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (selection.type === 'language') handleLanguageChange(selection.item);
                      else if (selection.type === 'currency') handleCurrencyChange(selection.item);
                      else handleRegionChange(selection.item);
                    }}
                    className="flex items-center gap-2 w-full px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    <span className="text-lg">
                      {selection.type === 'language' ? selection.item.flag :
                       selection.type === 'currency' ? selection.item.country :
                       selection.item.flag}
                    </span>
                    <span>
                      {selection.type === 'language' ? selection.item.name :
                       selection.type === 'currency' ? `${selection.item.symbol} ${selection.item.code}` :
                       selection.item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("language")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "language"
                  ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("Language", selectedLanguage.code)}
            </button>
            <button
              onClick={() => setActiveTab("currency")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "currency"
                  ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("Currency", selectedLanguage.code)}
            </button>
            <button
              onClick={() => setActiveTab("region")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "region"
                  ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {t("Country/Region", selectedLanguage.code)}
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {activeTab === "language" && (
              <div className="p-2">
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-all duration-150 ${
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
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {t("No languages found for", selectedLanguage.code)} "{searchTerm}"
                  </div>
                )}
              </div>
            )}

            {activeTab === "currency" && (
              <div className="p-2">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencyChange(currency)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-all duration-150 ${
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
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {t("No currencies found for", selectedLanguage.code)} "{searchTerm}"
                  </div>
                )}
              </div>
            )}

            {activeTab === "region" && (
              <div className="p-2">
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((region) => (
                    <button
                      key={region.code}
                      onClick={() => handleRegionChange(region)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-all duration-150 ${
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
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {t("No countries found for", selectedLanguage.code)} "{searchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                setIsOpen(false);
                setSearchTerm("");
              }}
              className="w-full bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium"
            >
              {t("Done", selectedLanguage.code)}
            </button>
          </div>
        </div>
      )}

      {/* Overlay para fechar ao clicar fora */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsOpen(false);
            setSearchTerm("");
          }}
        />
      )}
    </div>
  );
}