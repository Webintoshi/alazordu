import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Coolify için standalone output (SSR)
  output: 'standalone',
  
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Tüm sayfalarda trailing slash
  trailingSlash: true,
  
  // Coolify health check için
  poweredByHeader: false,
  
  // Eğer alt dizinde çalışıyorsa (örn: domain.com/alaz/)
  // basePath: process.env.BASE_PATH || '',
};

export default nextConfig;
