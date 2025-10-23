/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons']
  },
  
  // Compressão
  compress: true,
  
  // Headers de segurança (removido para export estático)
  // Headers são configurados no netlify.toml

  // ⚠️ Opcional: não quebre o build por erros de ESLint em produção
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;
