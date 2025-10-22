/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for S3/CloudFront deployment
  output: 'export',
  
  reactStrictMode: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Add trailing slashes for better S3 compatibility
  trailingSlash: true,
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checks during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  webpack: (config) => {
    // Handle canvas issues for server-side rendering
    config.externals = [...config.externals, { canvas: 'canvas' }];

    // Disable server-side rendering for specific modules
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    
    // These packages should only run on client-side
    config.resolve.fallback.fs = false;
    config.resolve.fallback.net = false;
    config.resolve.fallback.tls = false;
    
    return config;
  },
  
  // These packages should only be used on the client side
  serverExternalPackages: ['three', 'vanta'],
};

module.exports = nextConfig;



















