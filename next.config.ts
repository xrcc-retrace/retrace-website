import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
};

module.exports = {
  allowedDevOrigins: ['192.168.1.6'],
}

export default nextConfig;
