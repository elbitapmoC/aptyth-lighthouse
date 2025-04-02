import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  }, // Add the i18n config here
};

export default withSerwist(nextConfig);
