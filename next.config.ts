import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
      {
        source: "/events/bmw-xtrials-experience",
        destination: "/events/bmw-xtrials-experience.pdf",
        permanent: true,
      },
      {
        source: "/events/ppl-day-one",
        destination: "/events/ppl-day-one.pdf",
        permanent: true,
      },
      {
        source: "/events/ppl-day-two",
        destination: "/events/ppl-day-two.pdf",
        permanent: true,
      },
      {
        source: "/events/ppl-day-three",
        destination: "/events/ppl-day-three.pdf",
        permanent: true,
      },
      {
        source: "/events/ppl-day-three",
        destination: "/events/ipl-2025-screening",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
