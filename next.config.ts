import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/therapy",
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/letter-to-self",
        destination: "/a-letter-to-self",
      },
      {
        source: "/tools/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
