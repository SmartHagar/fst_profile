/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC untuk mengurangi memory usage
  output: "export", // Export sebagai static files
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Disable features yang membutuhkan server
  experimental: {
    appDir: false,
  },
  // Optimasi untuk shared hosting
  compress: false,
  poweredByHeader: false,
  generateEtags: false,
};

export default nextConfig;
