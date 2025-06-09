/** @format */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC completely untuk shared hosting
  swcMinify: false,

  // Use Babel instead of SWC
  experimental: {
    forceSwcTransforms: false,
  },

  // Output configuration untuk shared hosting
  output: "standalone",

  // Disable memory-heavy features
  compress: false,
  poweredByHeader: false,
  generateEtags: false,

  // Image optimization
  images: {
    unoptimized: true, // Disable Next.js image optimization
    domains: [], // Add your domains if needed
  },

  // Webpack configuration untuk disable WebAssembly
  webpack: (config, { dev, isServer }) => {
    // Disable WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: false,
      syncWebAssembly: false,
    };

    // Reduce bundle size
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@swc/wasm": false,
      };
    }

    // Memory optimization
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: -10,
            chunks: "all",
            maxSize: 244000, // Limit chunk size
          },
        },
      },
    };

    return config;
  },

  // Environment variables untuk build time
  env: {
    DISABLE_SWC: "true",
  },

  // Disable some features untuk reduce memory usage
  experimental: {
    // Remove worker threads
    workerThreads: false,
    // Disable ISR memory cache
    isrMemoryCacheSize: 0,
    // Reduce concurrent features
    cpus: 1,
  },

  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: {
      exclude: ["error"],
    },
  },

  // Headers untuk caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
