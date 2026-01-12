import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m941v1fek0.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
