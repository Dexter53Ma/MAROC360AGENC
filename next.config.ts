import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/en/solutions/management-system",
        destination: "/en/services/management-system",
        permanent: true,
      },
      {
        source: "/en/solutions/:path*",
        destination: "/en/services/:path*",
        permanent: true,
      },
      {
        source: "/en/resources/blog",
        destination: "/en/blog",
        permanent: true,
      },
      {
        source: "/en/resources/case-studies",
        destination: "/en/case-studies",
        permanent: true,
      },
      {
        source: "/en/resources/guides",
        destination: "/en/guides",
        permanent: true,
      },
      {
        source: "/en/resources/industries",
        destination: "/en/industries",
        permanent: true,
      },
      {
        source: "/en/resources",
        destination: "/en/blog",
        permanent: true,
      },
      {
        source: "/en/manifesto",
        destination: "/en/why-us",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
