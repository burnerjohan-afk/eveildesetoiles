/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuration ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configuration pour les uploads de fichiers
  experimental: {
    serverActions: {
      bodySizeLimit: '15mb',
    },
  },
  // Headers pour sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
