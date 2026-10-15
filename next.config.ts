import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.114", "10.60.252.155", "10.60.252.157",
    ...(process.env.AUTH_DEV_ORIGIN ? [new URL(process.env.AUTH_DEV_ORIGIN).hostname] : []),
  ],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
