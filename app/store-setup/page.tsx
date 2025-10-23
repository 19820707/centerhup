"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Schema de validação com Zod
const storeSetupSchema = z.object({
  name: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-Z0-9\s\-&]+$/, "Nome contém caracteres inválidos"),
  slug: z.string()
    .min(2, "Slug deve ter pelo menos 2 caracteres")
    .max(30, "Slug deve ter no máximo 30 caracteres")
    .regex(/^[a-z0-9\-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  slogan: z.string().max(100, "Slogan deve ter no máximo 100 caracteres").optional(),
  description: z.string().max(500, "Descrição deve ter no máximo 500 caracteres").optional(),
  theme: z.enum(["light", "dark", "system"]),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor deve ser um hex válido"),
  logo: z.instanceof(File).optional(),
  favicon: z.instanceof(File).optional()
});

type StoreSetupForm = z.infer<typeof storeSetupSchema>;

// Sistema de tradução
const translations = {
  "pt-PT": {
    "Store Setup": "Configuração da Loja",
    "Store Information": "Informações da Loja",
    "Store Name": "Nome da Loja",
    "Store Slug": "Slug da Loja",
    "Slogan": "Slogan",
    "Description": "Descrição",
    "Branding": "Identidade Visual",
    "Logo": "Logo",
    "Favicon": "Favicon",
    "Theme": "Tema",
    "Primary Color": "Cor Primária",
    "Light": "Claro",
    "Dark": "Escuro",
    "System": "Sistema",
    "Upload Logo": "Carregar Logo",
    "Upload Favicon": "Carregar Favicon",
    "Preview": "Pré-visualização",
    "Create Store": "Criar Loja",
    "Creating...": "A criar...",
    "Slug Available": "Slug disponível",
    "Slug Unavailable": "Slug indisponível",
    "Checking...": "A verificar...",
    "Store URL": "URL da Loja",
    "Your store will be available at": "A sua loja estará disponível em",
    "Required": "Obrigatório",
    "Optional": "Opcional",
    "Choose File": "Escolher Ficheiro",
    "No file chosen": "Nenhum ficheiro escolhido"
  },
  "en-US": {
    "Store Setup": "Store Setup",
    "Store Information": "Store Information",
    "Store Name": "Store Name",
    "Store Slug": "Store Slug",
    "Slogan": "Slogan",
    "Description": "Description",
    "Branding": "Branding",
    "Logo": "Logo",
    "Favicon": "Favicon",
    "Theme": "Theme",
    "Primary Color": "Primary Color",
    "Light": "Light",
    "Dark": "Dark",
    "System": "System",
    "Upload Logo": "Upload Logo",
    "Upload Favicon": "Upload Favicon",
    "Preview": "Preview",
    "Create Store": "Create Store",
    "Creating...": "Creating...",
    "Slug Available": "Slug Available",
    "Slug Unavailable": "Slug Unavailable",
    "Checking...": "Checking...",
    "Store URL": "Store URL",
    "Your store will be available at": "Your store will be available at",
    "Required": "Required",
    "Optional": "Optional",
    "Choose File": "Choose File",
    "No file chosen": "No file chosen"
  }
};

const t = (key: string, lang: string = "pt-PT"): string => {
  const langTranslations = translations[lang as keyof typeof translations];
  if (!langTranslations) return key;
  return (langTranslations as any)[key] || key;
};

// Cores predefinidas
const predefinedColors = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316", // Orange
  "#6366F1", // Indigo
  "#14B8A6", // Teal
  "#DC2626"  // Rose
];

export default function StoreSetupPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("pt-PT");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [slugCheckTimeout, setSlugCheckTimeout] = useState<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError
  } = useForm<StoreSetupForm>({
    resolver: zodResolver(storeSetupSchema),
    defaultValues: {
      theme: "system",
      primaryColor: "#3B82F6"
    }
  });

  const watchedName = watch("name");
  const watchedSlug = watch("slug");
  const watchedPrimaryColor = watch("primaryColor");
  const watchedTheme = watch("theme");

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

  // Gerar slug automaticamente baseado no nome
  useEffect(() => {
    if (watchedName && !watchedSlug) {
      const generatedSlug = watchedName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/[^a-z0-9\s\-]/g, "") // Remove caracteres especiais
        .replace(/\s+/g, "-") // Substitui espaços por hífens
        .replace(/-+/g, "-") // Remove hífens duplicados
        .replace(/^-|-$/g, ""); // Remove hífens do início e fim
      
      setValue("slug", generatedSlug);
    }
  }, [watchedName, watchedSlug, setValue]);

  // Verificar disponibilidade do slug (simulado)
  useEffect(() => {
    if (slugCheckTimeout) {
      clearTimeout(slugCheckTimeout);
    }

    if (watchedSlug && watchedSlug.length >= 2) {
      setSlugStatus("checking");
      
      const timeout = setTimeout(() => {
        // Simular verificação de disponibilidade (sem API)
        const usedSlugs = ['padaria-do-joao', 'mercearia-central', 'hortifruti-maria'];
        const isAvailable = !usedSlugs.includes(watchedSlug.toLowerCase());
        
        if (isAvailable) {
          setSlugStatus("available");
        } else {
          setSlugStatus("unavailable");
          setError("slug", { message: "Este slug já está em uso" });
        }
      }, 500);

      setSlugCheckTimeout(timeout);
    } else {
      setSlugStatus("idle");
    }

    return () => {
      if (slugCheckTimeout) {
        clearTimeout(slugCheckTimeout);
      }
    };
  }, [watchedSlug, setError]);

  // Preview de arquivos
  const handleFilePreview = (file: File, type: "logo" | "favicon") => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === "logo") {
        setLogoPreview(e.target?.result as string);
      } else {
        setFaviconPreview(e.target?.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: StoreSetupForm) => {
    setIsSubmitting(true);
    
    try {
      // Simular criação da loja (sem API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const storeId = `store_${Date.now()}`;
      console.log("Loja criada:", {
        id: storeId,
        name: data.name,
        slug: data.slug,
        theme: data.theme,
        primaryColor: data.primaryColor
      });
      
      // Simular redirecionamento
      alert(`Loja "${data.name}" criada com sucesso! ID: ${storeId}`);
      
    } catch (error) {
      console.error("Erro ao criar loja:", error);
      alert("Erro ao criar loja. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSlugStatusIcon = () => {
    switch (slugStatus) {
      case "checking":
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>;
      case "available":
        return <span className="text-green-600">✓</span>;
      case "unavailable":
        return <span className="text-red-600">✗</span>;
      default:
        return null;
    }
  };

  const getSlugStatusText = () => {
    switch (slugStatus) {
      case "checking":
        return t("Checking...", selectedLanguage);
      case "available":
        return t("Slug Available", selectedLanguage);
      case "unavailable":
        return t("Slug Unavailable", selectedLanguage);
      default:
        return "";
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
                {t("Store Setup", selectedLanguage)}
              </h1>
              <p className="text-sm text-gray-600">
                Configure a sua loja em poucos passos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Informações da Loja */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {t("Store Information", selectedLanguage)}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome da Loja */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Store Name", selectedLanguage)} <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Ex: Padaria do João"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Slug da Loja */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Store Slug", selectedLanguage)} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">centerhup.com/</span>
                    </div>
                    <input
                      {...register("slug")}
                      type="text"
                      className="w-full pl-32 pr-12 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="padaria-do-joao"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {getSlugStatusIcon()}
                    </div>
                  </div>
                  {errors.slug && (
                    <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                  )}
                  {slugStatus !== "idle" && (
                    <p className={`mt-1 text-sm ${slugStatus === "available" ? "text-green-600" : slugStatus === "unavailable" ? "text-red-600" : "text-blue-600"}`}>
                      {getSlugStatusText()}
                    </p>
                  )}
                  {watchedSlug && slugStatus === "available" && (
                    <p className="mt-1 text-sm text-gray-600">
                      {t("Your store will be available at", selectedLanguage)}: <span className="font-mono">centerhup.com/{watchedSlug}</span>
                    </p>
                  )}
                </div>

                {/* Slogan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Slogan", selectedLanguage)} <span className="text-gray-400">({t("Optional", selectedLanguage)})</span>
                  </label>
                  <input
                    {...register("slogan")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Ex: O melhor pão da cidade"
                  />
                  {errors.slogan && (
                    <p className="mt-1 text-sm text-red-600">{errors.slogan.message}</p>
                  )}
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Description", selectedLanguage)} <span className="text-gray-400">({t("Optional", selectedLanguage)})</span>
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Descreva a sua loja..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Identidade Visual */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {t("Branding", selectedLanguage)}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload de Logo e Favicon */}
                <div className="space-y-6">
                  {/* Logo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("Logo", selectedLanguage)} <span className="text-gray-400">({t("Optional", selectedLanguage)})</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          {...register("logo")}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue("logo", file);
                              handleFilePreview(file, "logo");
                            }
                          }}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          {t("Upload Logo", selectedLanguage)}
                        </label>
                      </div>
                      {logoPreview && (
                        <div className="w-16 h-16 border border-gray-200 rounded-lg overflow-hidden">
                          <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Favicon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("Favicon", selectedLanguage)} <span className="text-gray-400">({t("Optional", selectedLanguage)})</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <input
                          {...register("favicon")}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue("favicon", file);
                              handleFilePreview(file, "favicon");
                            }
                          }}
                          className="hidden"
                          id="favicon-upload"
                        />
                        <label
                          htmlFor="favicon-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          {t("Upload Favicon", selectedLanguage)}
                        </label>
                      </div>
                      {faviconPreview && (
                        <div className="w-8 h-8 border border-gray-200 rounded-lg overflow-hidden">
                          <img src={faviconPreview} alt="Favicon preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tema e Cor Primária */}
                <div className="space-y-6">
                  {/* Tema */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("Theme", selectedLanguage)}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["light", "dark", "system"].map((theme) => (
                        <button
                          key={theme}
                          type="button"
                          onClick={() => setValue("theme", theme as "light" | "dark" | "system")}
                          className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                            watchedTheme === theme
                              ? "border-brand-600 bg-brand-50 text-brand-700"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {t(theme.charAt(0).toUpperCase() + theme.slice(1), selectedLanguage)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cor Primária */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("Primary Color", selectedLanguage)}
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input
                          {...register("primaryColor")}
                          type="color"
                          className="w-12 h-12 border border-gray-200 rounded-lg cursor-pointer"
                        />
                        <input
                          {...register("primaryColor")}
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent font-mono text-sm"
                          placeholder="#3B82F6"
                        />
                      </div>
                      
                      {/* Cores predefinidas */}
                      <div className="grid grid-cols-6 gap-2">
                        {predefinedColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setValue("primaryColor", color)}
                            className={`w-8 h-8 rounded-lg border-2 transition-all ${
                              watchedPrimaryColor === color ? "border-gray-400 scale-110" : "border-gray-200 hover:scale-105"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {t("Preview", selectedLanguage)}
              </h2>
              
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-center gap-4 mb-4">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-12 h-12 object-cover rounded-lg" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xl">🏪</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{watchedName || "Nome da Loja"}</h3>
                    {watchedSlug && (
                      <p className="text-sm text-gray-600">centerhup.com/{watchedSlug}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: watchedPrimaryColor }}
                  >
                    Botão de Exemplo
                  </button>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: watchedPrimaryColor }}></div>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: watchedPrimaryColor, opacity: 0.7 }}></div>
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: watchedPrimaryColor, opacity: 0.4 }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || slugStatus === "unavailable" || slugStatus === "checking"}
                className="px-8 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t("Creating...", selectedLanguage)}
                  </>
                ) : (
                  t("Create Store", selectedLanguage)
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
