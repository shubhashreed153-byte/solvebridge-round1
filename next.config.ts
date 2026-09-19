import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/solvebridge-round1",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;