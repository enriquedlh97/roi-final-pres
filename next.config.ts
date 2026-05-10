import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/roi-final-pres",
  images: { unoptimized: true },
};

export default nextConfig;
