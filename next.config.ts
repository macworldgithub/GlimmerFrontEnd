import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "glimmerbucket.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  webpack: (config) => {
    // Suppress Webpack errors by disabling error overlays
    config.infrastructureLogging = {
      level: "error", // Suppress warnings and info logs
    };

    config.stats = "errors-only"; // Only show errors in Webpack output

    return config;
  },
};

export default nextConfig;

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      // Wildcard path matching
      {
        source: "/blog/:slug",
        destination: "/news/:slug",
        permanent: true,
      },
    ];
  },
};
