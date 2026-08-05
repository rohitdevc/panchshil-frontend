import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.panchshil.com",
      },
      {
        protocol: "https",
        hostname: "www.panchshilprivilege.com",
      },
      {
        protocol: "https",
        hostname: "www.ventivehospitality.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/press",
        destination: "/media",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
