import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// 👇 Ép kiểu rõ ràng cho remotePatterns (Next.js 15+ yêu cầu)
const remotePatterns: RemotePattern[] = [
  {
    protocol: "http",
    hostname: "192.168.1.73",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "res.cloudinary.com",
    pathname: "/**",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://retrieve-ibbn.onrender.com/api/:path*",
      },
    ];
  },

  images: {
    remotePatterns,
  },
};

export default withAnalyzer(nextConfig);
