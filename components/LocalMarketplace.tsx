"use client";
import { useState, useEffect } from "react";

// Sistema de tradução para marketplace local
const marketplaceTranslations = {
  "pt-PT": {
    "Local Marketplace": "Mercado Local",
    "Near You": "Perto de Si",
    "Today's Delivery": "Entrega Hoje",
    "Pickup Available": "Retirada Disponível",
    "Multi-Store Cart": "Carrinho Multi-Loja",
    "Local Stores": "Lojas Locais",
    "Categories": "Categorias",
    "Search Products": "Pesquisar Produtos",
    "Add to Cart": "Adicionar ao Carrinho",
    "View Cart": "Ver Carrinho",
    "Checkout": "Finalizar Compra",
    "Store": "Loja",
    "Distance": "Distância",
    "Rating": "Avaliação",
    "Open Now": "Aberto Agora",
    "Closed": "Fechado",
    "Free Delivery": "Entrega Grátis",
    "Pickup Only": "Só Retirada",
    "Sustainable": "Sustentável",
    "Local Producer": "Produtor Local",
    "Zero Waste": "Zero Desperdício",
    "Community": "Comunidade"
  },
  "en-US": {
    "Local Marketplace": "Local Marketplace",
    "Near You": "Near You",
    "Today's Delivery": "Today's Delivery",
    "Pickup Available": "Pickup Available",
    "Multi-Store Cart": "Multi-Store Cart",
    "Local Stores": "Local Stores",
    "Categories": "Categories",
    "Search Products": "Search Products",
    "Add to Cart": "Add to Cart",
    "View Cart": "View Cart",
    "Checkout": "Checkout",
    "Store": "Store",
    "Distance": "Distance",
    "Rating": "Rating",
    "Open Now": "Open Now",
    "Closed": "Closed",
    "Free Delivery": "Free Delivery",
    "Pickup Only": "Pickup Only",
    "Sustainable": "Sustainable",
    "Local Producer": "Local Producer",
    "Zero Waste": "Zero Waste",
    "Community": "Community"
  },
  "es-ES": {
    "Local Marketplace": "Mercado Local",
    "Near You": "Cerca de Ti",
    "Today's Delivery": "Entrega Hoy",
    "Pickup Available": "Recogida Disponible",
    "Multi-Store Cart": "Carrito Multi-Tienda",
    "Local Stores": "Tiendas Locales",
    "Categories": "Categorías",
    "Search Products": "Buscar Productos",
    "Add to Cart": "Añadir al Carrito",
    "View Cart": "Ver Carrito",
    "Checkout": "Finalizar Compra",
    "Store": "Tienda",
    "Distance": "Distancia",
    "Rating": "Valoración",
    "Open Now": "Abierto Ahora",
    "Closed": "Cerrado",
    "Free Delivery": "Envío Gratis",
    "Pickup Only": "Solo Recogida",
    "Sustainable": "Sostenible",
    "Local Producer": "Productor Local",
    "Zero Waste": "Cero Desperdicio",
    "Community": "Comunidad"
  }
};

const t = (key: string, lang: string = "pt-PT"): string => {
  const langTranslations = marketplaceTranslations[lang as keyof typeof marketplaceTranslations];
  if (!langTranslations) return key;
  return (langTranslations as any)[key] || key;
};

// Dados mock do marketplace local
const localStores = [
  {
    id: 1,
    name: "Padaria do João",
    category: "Padaria",
    distance: "0.3 km",
    rating: 4.8,
    isOpen: true,
    deliveryTime: "15-30 min",
    hasDelivery: true,
    hasPickup: true,
    badges: ["Local Producer", "Zero Waste"],
    products: [
      { id: 1, name: "Pão de Centeio", price: "€1.20", unit: "unidade", image: "🥖" },
      { id: 2, name: "Croissant", price: "€0.80", unit: "unidade", image: "🥐" },
      { id: 3, name: "Bolo de Chocolate", price: "€3.50", unit: "fatia", image: "🍰" }
    ]
  },
  {
    id: 2,
    name: "Hortifruti Maria",
    category: "Frutas & Legumes",
    distance: "0.5 km",
    rating: 4.6,
    isOpen: true,
    deliveryTime: "20-40 min",
    hasDelivery: true,
    hasPickup: true,
    badges: ["Sustainable", "Local Producer"],
    products: [
      { id: 4, name: "Bananas", price: "€1.50", unit: "kg", image: "🍌" },
      { id: 5, name: "Maçãs", price: "€2.20", unit: "kg", image: "🍎" },
      { id: 6, name: "Tomates", price: "€1.80", unit: "kg", image: "🍅" }
    ]
  },
  {
    id: 3,
    name: "Mercearia Central",
    category: "Mercearia",
    distance: "0.7 km",
    rating: 4.4,
    isOpen: true,
    deliveryTime: "25-45 min",
    hasDelivery: true,
    hasPickup: true,
    badges: ["Community"],
    products: [
      { id: 7, name: "Leite", price: "€0.85", unit: "litro", image: "🥛" },
      { id: 8, name: "Ovos", price: "€2.50", unit: "dúzia", image: "🥚" },
      { id: 9, name: "Arroz", price: "€1.20", unit: "kg", image: "🍚" }
    ]
  },
  {
    id: 4,
    name: "Farmácia do Bairro",
    category: "Farmácia",
    distance: "0.4 km",
    rating: 4.9,
    isOpen: true,
    deliveryTime: "10-20 min",
    hasDelivery: true,
    hasPickup: true,
    badges: ["Community"],
    products: [
      { id: 10, name: "Paracetamol", price: "€3.20", unit: "caixa", image: "💊" },
      { id: 11, name: "Vitamina C", price: "€8.50", unit: "frasco", image: "💊" }
    ]
  }
];

const categories = [
  { id: 1, name: "Padaria", icon: "🥖", count: 12 },
  { id: 2, name: "Frutas & Legumes", icon: "🥬", count: 25 },
  { id: 3, name: "Mercearia", icon: "🛒", count: 18 },
  { id: 4, name: "Farmácia", icon: "💊", count: 8 },
  { id: 5, name: "Restaurantes", icon: "🍽️", count: 15 },
  { id: 6, name: "Serviços", icon: "🔧", count: 6 }
];

export function LocalMarketplace() {
  const [selectedLanguage, setSelectedLanguage] = useState("pt-PT");
  const [activeTab, setActiveTab] = useState<"feed" | "categories" | "cart">("feed");
  const [cart, setCart] = useState<Array<{storeId: number, productId: number, quantity: number, storeName: string, productName: string, price: string}>>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Carregar idioma salvo
  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
      try {
        const lang = JSON.parse(savedLang);
        setSelectedLanguage(lang.code);
      } catch (e) {
        console.error('Erro ao carregar idioma:', e);
      }
    }
  }, []);

  const addToCart = (storeId: number, productId: number, storeName: string, productName: string, price: string) => {
    const existingItem = cart.find(item => item.storeId === storeId && item.productId === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.storeId === storeId && item.productId === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { storeId, productId, quantity: 1, storeName, productName, price }]);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartByStore = () => {
    const stores: { [key: number]: { storeName: string; items: any[] } } = {};
    cart.forEach(item => {
      if (!stores[item.storeId]) {
        stores[item.storeId] = {
          storeName: item.storeName,
          items: []
        };
      }
      stores[item.storeId].items.push(item);
    });
    return stores;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t("Local Marketplace", selectedLanguage)}
              </h1>
              <p className="text-sm text-gray-600">
                {t("Near You", selectedLanguage)} • 4 {t("Local Stores", selectedLanguage)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab("cart")}
                className="relative bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
              >
                {t("View Cart", selectedLanguage)}
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            <button
              onClick={() => setActiveTab("feed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "feed" 
                  ? "bg-brand-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("Near You", selectedLanguage)}
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "categories" 
                  ? "bg-brand-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("Categories", selectedLanguage)}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-max px-4 py-6">
        {activeTab === "feed" && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder={t("Search Products", selectedLanguage)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button className="flex-shrink-0 bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {t("Today's Delivery", selectedLanguage)}
              </button>
              <button className="flex-shrink-0 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50">
                {t("Pickup Available", selectedLanguage)}
              </button>
              <button className="flex-shrink-0 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50">
                {t("Free Delivery", selectedLanguage)}
              </button>
            </div>

            {/* Stores */}
            <div className="space-y-4">
              {localStores.map((store) => (
                <div key={store.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{store.name}</h3>
                        <p className="text-sm text-gray-600">{store.category}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">{store.distance}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-sm text-gray-600">{store.rating}</span>
                          </div>
                          <span className={`text-sm font-medium ${store.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                            {store.isOpen ? t("Open Now", selectedLanguage) : t("Closed", selectedLanguage)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{store.deliveryTime}</p>
                        <div className="flex gap-1 mt-1">
                          {store.badges.map((badge, index) => (
                            <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {t(badge, selectedLanguage)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {store.products.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{product.image}</span>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                              <p className="text-sm text-gray-600">{product.price}/{product.unit}</p>
                            </div>
                            <button
                              onClick={() => addToCart(store.id, product.id, store.name, product.name, product.price)}
                              className="bg-brand-600 text-white px-3 py-1 rounded text-sm hover:bg-brand-700 transition-colors"
                            >
                              {t("Add to Cart", selectedLanguage)}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
              >
                <span className="text-3xl mb-2 block">{category.icon}</span>
                <h3 className="font-medium text-gray-900 text-sm">{t(category.name, selectedLanguage)}</h3>
                <p className="text-xs text-gray-500 mt-1">{category.count} produtos</p>
              </button>
            ))}
          </div>
        )}

        {activeTab === "cart" && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {t("Multi-Store Cart", selectedLanguage)}
            </h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">🛒</span>
                <p className="text-gray-500">Carrinho vazio</p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(getCartByStore()).map(([storeId, storeData]) => (
                  <div key={storeId} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{storeData.storeName}</h3>
                    <div className="space-y-2">
                      {storeData.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{item.productName}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="bg-brand-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-brand-600">€{getCartTotal().toFixed(2)}</span>
                  </div>
                  <button className="w-full mt-4 bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors">
                    {t("Checkout", selectedLanguage)}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
