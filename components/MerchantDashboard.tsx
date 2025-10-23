"use client";
import { useState, useEffect } from "react";

// Sistema de tradução para painel do comerciante
const merchantTranslations = {
  "pt-PT": {
    "Merchant Dashboard": "Painel do Comerciante",
    "Orders": "Pedidos",
    "Products": "Produtos",
    "Analytics": "Analytics",
    "Settings": "Configurações",
    "New Order": "Novo Pedido",
    "In Preparation": "Em Preparação",
    "Ready": "Pronto",
    "Completed": "Concluído",
    "Add Product": "Adicionar Produto",
    "Product Name": "Nome do Produto",
    "Price": "Preço",
    "Unit": "Unidade",
    "Category": "Categoria",
    "Stock": "Stock",
    "Save": "Guardar",
    "Today's Sales": "Vendas de Hoje",
    "Total Orders": "Total de Pedidos",
    "Average Rating": "Avaliação Média",
    "Top Products": "Produtos Mais Vendidos",
    "Order History": "Histórico de Pedidos",
    "Customer": "Cliente",
    "Items": "Itens",
    "Total": "Total",
    "Status": "Estado",
    "Accept": "Aceitar",
    "Decline": "Recusar",
    "Mark as Ready": "Marcar como Pronto",
    "View Details": "Ver Detalhes"
  },
  "en-US": {
    "Merchant Dashboard": "Merchant Dashboard",
    "Orders": "Orders",
    "Products": "Products",
    "Analytics": "Analytics",
    "Settings": "Settings",
    "New Order": "New Order",
    "In Preparation": "In Preparation",
    "Ready": "Ready",
    "Completed": "Completed",
    "Add Product": "Add Product",
    "Product Name": "Product Name",
    "Price": "Price",
    "Unit": "Unit",
    "Category": "Category",
    "Stock": "Stock",
    "Save": "Save",
    "Today's Sales": "Today's Sales",
    "Total Orders": "Total Orders",
    "Average Rating": "Average Rating",
    "Top Products": "Top Products",
    "Order History": "Order History",
    "Customer": "Customer",
    "Items": "Items",
    "Total": "Total",
    "Status": "Status",
    "Accept": "Accept",
    "Decline": "Decline",
    "Mark as Ready": "Mark as Ready",
    "View Details": "View Details"
  }
};

const t = (key: string, lang: string = "pt-PT"): string => {
  const langTranslations = merchantTranslations[lang as keyof typeof merchantTranslations];
  if (!langTranslations) return key;
  return (langTranslations as any)[key] || key;
};

// Dados mock
const mockOrders = [
  {
    id: 1,
    customer: "Maria Silva",
    items: [
      { name: "Pão de Centeio", quantity: 2, price: "€1.20" },
      { name: "Croissant", quantity: 1, price: "€0.80" }
    ],
    total: "€3.20",
    status: "new",
    time: "10:30",
    type: "delivery"
  },
  {
    id: 2,
    customer: "João Santos",
    items: [
      { name: "Bolo de Chocolate", quantity: 1, price: "€3.50" }
    ],
    total: "€3.50",
    status: "preparation",
    time: "10:15",
    type: "pickup"
  },
  {
    id: 3,
    customer: "Ana Costa",
    items: [
      { name: "Pão de Centeio", quantity: 1, price: "€1.20" },
      { name: "Croissant", quantity: 3, price: "€0.80" }
    ],
    total: "€3.60",
    status: "ready",
    time: "09:45",
    type: "delivery"
  }
];

const mockProducts = [
  { id: 1, name: "Pão de Centeio", price: "€1.20", unit: "unidade", stock: 15, category: "Pães" },
  { id: 2, name: "Croissant", price: "€0.80", unit: "unidade", stock: 8, category: "Pães" },
  { id: 3, name: "Bolo de Chocolate", price: "€3.50", unit: "fatia", stock: 5, category: "Doces" }
];

const mockAnalytics = {
  todaySales: "€45.30",
  totalOrders: 12,
  averageRating: 4.8,
  topProducts: [
    { name: "Pão de Centeio", sales: 8 },
    { name: "Croissant", sales: 6 },
    { name: "Bolo de Chocolate", sales: 3 }
  ]
};

export function MerchantDashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState("pt-PT");
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "analytics">("orders");
  const [orders, setOrders] = useState(mockOrders);
  const [products, setProducts] = useState(mockProducts);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "unidade",
    category: "Pães",
    stock: 0
  });

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

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        id: products.length + 1,
        ...newProduct,
        stock: parseInt(newProduct.stock.toString())
      };
      setProducts([...products, product]);
      setNewProduct({ name: "", price: "", unit: "unidade", category: "Pães", stock: 0 });
      setShowAddProduct(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "preparation": return "bg-yellow-100 text-yellow-800";
      case "ready": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return t("New Order", selectedLanguage);
      case "preparation": return t("In Preparation", selectedLanguage);
      case "ready": return t("Ready", selectedLanguage);
      case "completed": return t("Completed", selectedLanguage);
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container-max px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t("Merchant Dashboard", selectedLanguage)}
              </h1>
              <p className="text-sm text-gray-600">Padaria do João</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">{t("Today's Sales", selectedLanguage)}</p>
                <p className="text-xl font-bold text-brand-600">{mockAnalytics.todaySales}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "orders" 
                  ? "bg-brand-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("Orders", selectedLanguage)}
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "products" 
                  ? "bg-brand-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("Products", selectedLanguage)}
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "analytics" 
                  ? "bg-brand-600 text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t("Analytics", selectedLanguage)}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-max px-4 py-6">
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-600">{t("New Order", selectedLanguage)}</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === "new").length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-600">{t("In Preparation", selectedLanguage)}</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === "preparation").length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-sm font-medium text-gray-600">{t("Ready", selectedLanguage)}</h3>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === "ready").length}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">#{order.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <span className="text-sm text-gray-500">{order.time}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {order.type === "delivery" ? "Entrega" : "Retirada"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{t("Customer", selectedLanguage)}: {order.customer}</p>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                        <span className="font-semibold text-gray-900">{t("Total", selectedLanguage)}: {order.total}</span>
                        <div className="flex gap-2">
                          {order.status === "new" && (
                            <>
                              <button
                                onClick={() => updateOrderStatus(order.id, "preparation")}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                {t("Accept", selectedLanguage)}
                              </button>
                              <button
                                onClick={() => updateOrderStatus(order.id, "completed")}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                              >
                                {t("Decline", selectedLanguage)}
                              </button>
                            </>
                          )}
                          {order.status === "preparation" && (
                            <button
                              onClick={() => updateOrderStatus(order.id, "ready")}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              {t("Mark as Ready", selectedLanguage)}
                            </button>
                          )}
                          <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                            {t("View Details", selectedLanguage)}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">{t("Products", selectedLanguage)}</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
              >
                {t("Add Product", selectedLanguage)}
              </button>
            </div>

            {showAddProduct && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("Add Product", selectedLanguage)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("Product Name", selectedLanguage)}
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("Price", selectedLanguage)}
                    </label>
                    <input
                      type="text"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="€0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("Unit", selectedLanguage)}
                    </label>
                    <select
                      value={newProduct.unit}
                      onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="unidade">Unidade</option>
                      <option value="kg">Quilograma</option>
                      <option value="g">Grama</option>
                      <option value="litro">Litro</option>
                      <option value="fatia">Fatia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("Stock", selectedLanguage)}
                    </label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={addProduct}
                    className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                  >
                    {t("Save", selectedLanguage)}
                  </button>
                  <button
                    onClick={() => setShowAddProduct(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t("Price", selectedLanguage)}:</span>
                      <span className="font-medium">{product.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t("Unit", selectedLanguage)}:</span>
                      <span className="text-sm">{product.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t("Stock", selectedLanguage)}:</span>
                      <span className={`text-sm font-medium ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.stock}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{t("Today's Sales", selectedLanguage)}</h3>
                <p className="text-3xl font-bold text-brand-600">{mockAnalytics.todaySales}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{t("Total Orders", selectedLanguage)}</h3>
                <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalOrders}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{t("Average Rating", selectedLanguage)}</h3>
                <p className="text-3xl font-bold text-yellow-600">{mockAnalytics.averageRating} ⭐</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("Top Products", selectedLanguage)}</h3>
              <div className="space-y-3">
                {mockAnalytics.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{product.name}</span>
                    <span className="text-sm text-gray-600">{product.sales} vendas</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
