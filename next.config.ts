import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  allowedDevOrigins: ["192.168.1.6"],
  async redirects() {
    // Retired routes from the hackathon-era site. Inbound links land on the
    // single-page overview instead of a 404.
    return [
      { source: "/how-to-vote", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
