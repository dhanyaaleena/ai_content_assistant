import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/content-generator",
  trailingSlash: true, // Ensures proper static asset handling
  output: "standalone", // Useful for standalone deployment
};

export default nextConfig;
