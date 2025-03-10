import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lighthouse Bible Platform",
  description: "A platform for Bible study and exploration.",
  manifest: "/manifest.json",
  themeColor: "#1a73e8",
  appleWebApp: {
    capable: true,
    title: "Lighthouse Bible Platform",
    statusBarStyle: "default",
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/icons/icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/icons/icon-512x512.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/icons/apple-touch-icon.png",
    },
  ],
};

import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import ThemeToggle from "../components/ui/ThemeToggle";
import PWAInstallPrompt from "../components/ui/PWAInstallPrompt";
import useStore from "../lib/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useStore();

  return (
    <html lang="en" className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <ThemeToggle />
        <main>{children}</main>
        <PWAInstallPrompt />
        <Footer />
      </body>
    </html>
  );
}