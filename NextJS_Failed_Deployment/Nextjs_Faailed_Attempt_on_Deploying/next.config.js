/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    esmExternals: false,
  },
  // Ensure proper build output
  output: 'standalone',
  // Handle static file serving
  trailingSlash: false,
  // Optimize for Vercel deployment
  poweredByHeader: false,
};

module.exports = nextConfig;