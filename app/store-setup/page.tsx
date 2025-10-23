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
    "Generate Slug": "Gerar Slug",
    "Optional": "Opcional"
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
    "Generate Slug": "Generate Slug",
    "Optional": "Optional"
  }
};

const t = (key: string, lang: string = "pt-PT"): string => {
  const langTranslations = translations[lang as keyof typeof translations];
  if (!langTranslations) return key;
  return (langTranslations as any)[key] || key;
};

export default function StoreSetup() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [slugCheckTimeout, setSlugCheckTimeout] = useState<NodeJS.Timeout | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [faviconPreview, setFaviconPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors }
  } = useForm<StoreSetupForm>({
    resolver: zodResolver(storeSetupSchema),
    defaultValues: {
      theme: "light",
      primaryColor: "#3B82F6"
    }
  });

  const watchedName = watch("name");
  const watchedSlug = watch("slug");
  const watchedSlogan = watch("slogan");
  const watchedTheme = watch("theme");
  const watchedPrimaryColor = watch("primaryColor");

  // Gerar slug automaticamente baseado no nome
  useEffect(() => {
    if (watchedName && !watchedSlug) {
      const generatedSlug = watchedName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s\-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      
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
      const result = e.target?.result as string;
      if (type === "logo") {
        setLogoPreview(result);
      } else {
        setFaviconPreview(result);
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
        return <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>;
      case "unavailable":
        return <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>;
      default:
        return null;
    }
  };

  const getSlugStatusText = () => {
    switch (slugStatus) {
      case "checking":
        return t("Checking...");
      case "available":
        return t("Slug Available");
      case "unavailable":
        return t("Slug Unavailable");
      default:
        return "";
    }
  };

  const getSlugStatusColor = () => {
    switch (slugStatus) {
      case "checking":
        return "text-blue-600";
      case "available":
        return "text-green-600";
      case "unavailable":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t("Store Setup")}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Informações da Loja */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                {t("Store Information")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome da Loja */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Store Name")} *
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Padaria do João"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Store Slug")} *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      {...register("slug")}
                      type="text"
                      id="slug"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="padaria-do-joao"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (watchedName) {
                          const generatedSlug = watchedName
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/[^a-z0-9\s\-]/g, "")
                            .replace(/\s+/g, "-")
                            .replace(/-+/g, "-")
                            .replace(/^-|-$/g, "");
                          setValue("slug", generatedSlug);
                        }
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {t("Generate Slug")}
                    </button>
                  </div>
                  {errors.slug && (
                    <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
                  )}
                  {watchedSlug && (
                    <div className="flex items-center space-x-2 mt-2">
                      {getSlugStatusIcon()}
                      <span className={`text-sm ${getSlugStatusColor()}`}>
                        {getSlugStatusText()}
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    URL: centerhub.com/{watchedSlug || "seu-slug"}
                  </p>
                </div>
              </div>

              {/* Slogan */}
              <div>
                <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Slogan")} ({t("Optional")})
                </label>
                <input
                  {...register("slogan")}
                  type="text"
                  id="slogan"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: O melhor pão da cidade"
                />
                {errors.slogan && (
                  <p className="text-red-600 text-sm mt-1">{errors.slogan.message}</p>
                )}
              </div>

              {/* Descrição */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Description")} ({t("Optional")})
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva sua loja, produtos e serviços..."
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Identidade Visual */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                {t("Branding")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo */}
                <div>
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Logo")} ({t("Optional")})
                  </label>
                  <input
                    {...register("logo")}
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFilePreview(file, "logo");
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {logoPreview && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">{t("Preview")}:</p>
                      <img src={logoPreview} alt="Logo preview" className="w-20 h-20 object-contain border rounded" />
                    </div>
                  )}
                </div>

                {/* Favicon */}
                <div>
                  <label htmlFor="favicon" className="block text-sm font-medium text-gray-700 mb-2">
                    {t("Favicon")} ({t("Optional")})
                  </label>
                  <input
                    {...register("favicon")}
                    type="file"
                    id="favicon"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFilePreview(file, "favicon");
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {faviconPreview && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">{t("Preview")}:</p>
                      <img src={faviconPreview} alt="Favicon preview" className="w-8 h-8 object-contain border rounded" />
                    </div>
                  )}
                </div>
              </div>

              {/* Tema */}
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Theme")}
                </label>
                <select
                  {...register("theme")}
                  id="theme"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">{t("Light")}</option>
                  <option value="dark">{t("Dark")}</option>
                  <option value="system">{t("System")}</option>
                </select>
              </div>

              {/* Cor Primária */}
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Primary Color")}
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    {...register("primaryColor")}
                    type="color"
                    id="primaryColor"
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    {...register("primaryColor")}
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {errors.primaryColor && (
                  <p className="text-red-600 text-sm mt-1">{errors.primaryColor.message}</p>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                {t("Preview")}
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="w-12 h-12 object-contain" />
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: watchedPrimaryColor }}
                      >
                        {watchedName ? watchedName.charAt(0).toUpperCase() : "L"}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {watchedName || "Nome da Loja"}
                      </h3>
                      {watchedSlug && (
                        <p className="text-sm text-gray-600">
                          centerhub.com/{watchedSlug}
                        </p>
                      )}
                    </div>
                  </div>

                  {watchedSlogan && (
                    <p className="text-gray-700 mb-3 italic">"{watchedSlogan}"</p>
                  )}

                  <div className="flex items-center space-x-2 mb-4">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: watchedPrimaryColor }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {watchedTheme === "light" ? t("Light") : 
                       watchedTheme === "dark" ? t("Dark") : t("System")} • {watchedPrimaryColor}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div 
                      className="h-2 rounded"
                      style={{ backgroundColor: watchedPrimaryColor, opacity: 0.3 }}
                    ></div>
                    <div 
                      className="h-1 rounded"
                      style={{ backgroundColor: watchedPrimaryColor, opacity: 0.2 }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !watchedName || !watchedSlug || slugStatus === "unavailable"}
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("Creating...") : t("Create Store")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}