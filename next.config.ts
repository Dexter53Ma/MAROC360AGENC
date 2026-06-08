import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com; frame-src 'self' https://www.youtube.com https://www.google.com; base-uri 'self'; form-action 'self'",
        },
      ],
    },
  ],
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
