/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimental features were removed to maintain compatibility with the
  // stable Next.js release used in CI. If you want to enable canary/experimental
  // features, upgrade Next.js to a matching canary version and re-introduce
  // the required options.

  // TypeScript configuration
  // Keep TypeScript defaults; enabling strict mode at the project level is
  // recommended via tsconfig.json instead of next.config.js for compatibility.

  // ESLint configuration
  eslint: {
    dirs: ['src', 'app', 'components', 'lib', 'hooks'],
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.azure.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.edutrack.pro',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Rewrites for API proxy and CDN
  async rewrites() {
    return [
      {
        source: '/fonts/:path*',
        destination: 'https://fonts.gstatic.com/:path*',
      },
      {
        source: '/api/azure/:path*',
        destination: 'https://edutrack.azurewebsites.net/api/:path*',
      },
      {
        source: '/cdn/:path*',
        destination: 'https://edutrackstorage.blob.core.windows.net/:path*',
      },
    ];
  },

  // PWA and Security headers
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https: wss:",
              "media-src 'self' blob:",
              "worker-src 'self' blob:",
            ].join('; ')
          }
        ],
      },
    ];
  },

  // Webpack configuration for advanced optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer
    if (!dev && !isServer) {
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      });
      config = withBundleAnalyzer(config);
    }

    // Custom loaders
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Performance optimizations
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Core libraries
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // UI libraries
          lib: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|framer-motion)[\\/]/,
            name: 'lib',
            priority: 30,
          },
          // Charts and visualization
          charts: {
            test: /[\\/]node_modules[\\/](recharts|d3|three)[\\/]/,
            name: 'charts',
            priority: 25,
          },
          // Common libraries
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
        },
      },
    };

    // Ignore source maps in production
    if (!dev) {
      config.devtool = false;
    }

    return config;
  },

  // Output configuration
  output: 'standalone',

  // Compression
  compress: true,

  // Power by header removal
  poweredByHeader: false,

  // Generate sitemap
  generateEtags: true,

  // Trailing slash configuration
  trailingSlash: false,

  // Asset prefix for CDN
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.edutrack.pro' : '',

  // Environment variables
  env: {
    CUSTOM_KEY: 'my-value',
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING,
    AZURE_APPLICATION_INSIGHTS_KEY: process.env.AZURE_APPLICATION_INSIGHTS_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
