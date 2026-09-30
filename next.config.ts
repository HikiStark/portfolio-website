import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages folded into the two-page site (home + portfolio).
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/cv", destination: "/", permanent: true },
      { source: "/mission", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/portfolio/:slug", destination: "/portfolio", permanent: false },
    ];
  },
};

export default nextConfig;
