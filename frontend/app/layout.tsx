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
};

import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import ThemeToggle from "../components/ui/ThemeToggle";
import { useStore } from "../lib/store";
import { QueryProvider } from "../hooks/use-api";
import "../i18n";

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
        <QueryProvider>
          <Header />
          <ThemeToggle />
          <main>{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}