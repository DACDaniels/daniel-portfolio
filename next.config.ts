import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
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
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // Conservative CSP. 'unsafe-inline' on script-src is required for
  // Next.js' inline runtime bootstrap; 'unsafe-eval' is required by
  // Next/React dev tooling and some Motion code paths. 'unsafe-inline'
  // on style-src is required by styled-jsx (used in Contact form) and
  // motion's runtime style injection. img-src https: covers next/og
  // and any future remote images; data: covers SVG noise textures.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 414, 640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // Client design previews are static files in public/previews/<client>/.
  // Next.js does not serve a folder's index.html for the bare folder URL,
  // so each preview needs a rewrite. The trailing-slash URL needs no rule:
  // Next.js 308-redirects it to the bare URL before rewrites run.
  async rewrites() {
    return [
      {
        source: "/previews/endoscopy-suite",
        destination: "/previews/endoscopy-suite/index.html",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      // Previews stay out of search results. They load Google Fonts
      // directly, so this CSP (which overrides the site-wide one for
      // /previews only) also allows fonts.googleapis.com for styles and
      // fonts.gstatic.com for font files, and Google Maps frames for the
      // embedded map. The Permissions-Policy override allows geolocation
      // on previews only, for "Add my location" on the Endoscopy Suite
      // Emergencies page.
      {
        source: "/previews/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
          {
            key: "Permissions-Policy",
            value: [
              "accelerometer=()",
              "autoplay=()",
              "camera=()",
              "fullscreen=(self)",
              "geolocation=(self)",
              "gyroscope=()",
              "magnetometer=()",
              "microphone=()",
              "payment=()",
              "usb=()",
            ].join(", "),
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "frame-src https://www.google.com https://maps.google.com",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
