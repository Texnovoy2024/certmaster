import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin images from any source (for template images and base64)
  images: {
    unoptimized: true,
  },
  // Ensure Prisma works correctly in Vercel serverless environment
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
