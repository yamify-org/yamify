import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000'
      ]
    }
  },
  images: {
    remotePatterns: [new URL('https://img.clerk.com/**')],
  },
};

export default nextConfig;
