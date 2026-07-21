import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [65, 68, 70, 72, 74, 75],
    remotePatterns: [
      { protocol: "https", hostname: "parris.com" },
      { protocol: "https", hostname: "bencrump.com" },
      { protocol: "https", hostname: "friedmanlevy.com" },
      { protocol: "https", hostname: "www.kherkhergarcia.com" },
      { protocol: "https", hostname: "www.weitzlux.com" },
    ],
  },
};

export default nextConfig;
