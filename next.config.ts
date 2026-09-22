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
        source: "/events/ipl-2025-screening",
        destination: "/events/ipl-2025-screening",
        permanent: true,
      },
      {
        source: "/luxury-residences/42-east-residences",
        destination: "/luxury-residences/page/1",
        permanent: true,
      },
      {
        source: "/luxury-residences/page/undefinedluxury-residences/page/:page",
        destination: "/luxury-residences/page/:page",
        permanent: true
      },
      {
        source: "/office-parks/page/undefinedoffice-parks/page/:page",
        destination: "/office-parks/page/:page",
        permanent: true
      },
      {
        source: "/hospitality/page/undefinedhospitality/page/:page",
        destination: "/hospitality/page/:page",
        permanent: true
      },
      {
        source: "/retail/page/undefinedretail/page/:page",
        destination: "/retail/page/:page",
        permanent: true
      },
      {
        source: "/nest-panchshil-admin-panel",
        destination: "/panchshil-admin-panel",
        permanent: true,
      },
      {
        source: "/luxury-residences/:id(\\d+)/:slug*",
        destination: "/luxury-residences/:slug*",
        permanent: true,
      },
      {
        source: "/office-parks/:id(\\d+)/:slug*",
        destination: "/office-parks/:slug*",
        permanent: true,
      },
      {
        source: "/hospitality/:id(\\d+)/:slug*",
        destination: "/hospitality/:slug*",
        permanent: true,
      },
      {
        source: "/retail/:id(\\d+)/:slug*",
        destination: "/retail/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
