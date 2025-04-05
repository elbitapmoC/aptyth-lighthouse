// Correct package import for Serwist
import withSerwist from "@serwist/next";
import type { NextConfig } from "next";
// Use ESM import. Assuming next-i18next.config is a .js file,
// you might need the .js extension depending on your tsconfig/Node version.
// import { i18n } from "./next-i18next.config.js";

// Define your main Next.js configuration
const nextConfig: NextConfig = {
  // i18n,
  reactStrictMode: true, // Example Next.js config option
  // Add any other Next.js config options here
};

// Wrap the Next.js config with Serwist configuration using the imported function
export default withSerwist({
  // Serwist options:
  swSrc: "app/sw.ts",
  swDest: "public/sw.js", // This is the output destination in the public folder
  disable: process.env.NODE_ENV !== "production",
})(nextConfig); // Pass your main nextConfig here
