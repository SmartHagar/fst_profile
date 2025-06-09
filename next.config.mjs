/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/out",
  assetPrefix: "/out",
  images: {
    unoptimized: true,
  },
  env: {
    CUSTOM_BASE_PATH: "/out",
  },
  // Skip build-time optimizations untuk static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
