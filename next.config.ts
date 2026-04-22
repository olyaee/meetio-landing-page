import type { NextConfig } from "next";
import { LEGACY_SITE_URL, SITE_URL } from "./src/lib/brand";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/ph/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ph/array/:path*",
        destination: "https://eu-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ph/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    const legacyHost = new URL(LEGACY_SITE_URL).host.replace(".", "\\.");

    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: legacyHost }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: `www\\.${legacyHost}` }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
