import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.114", "10.60.252.155"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
