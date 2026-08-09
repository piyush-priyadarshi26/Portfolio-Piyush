import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Cloud Run — produces a self-contained server bundle
  output: "standalone",

  // Expose the backend API URL to client-side components
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  },

  // Allow images from external domains if needed
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
