/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["example.com", "cdn.serwist.com"], // Added Serwist CDN domain
  },
  env: {
    SERWIST_API_URL: process.env.SERWIST_API_URL || "https://api.serwist.com",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://api.serwist.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;