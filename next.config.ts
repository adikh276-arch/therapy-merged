import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // required for single Docker image
  typescript: {
    ignoreBuildErrors: true, // We have 80 apps, some might have minor type issues
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.mantracare.com" },
    ],
  },
};

export default nextConfig;
