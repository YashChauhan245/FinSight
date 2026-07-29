/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  // Fix CSS 404 infinite loop in dev mode (Next.js 15.0.5 known issue)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Force deterministic CSS chunk IDs to prevent stale hash mismatches
      // during HMR that cause the infinite layout.css 404 retry loop
      config.output.cssChunkFilename = "static/css/[name].css";
    }
    return config;
  },
};

export default nextConfig;