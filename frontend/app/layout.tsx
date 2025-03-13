import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

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
  other: {
    "mobile-web-app-capable": "yes",
  },
};

import { I18nProvider } from "../components/i18n-provider";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import ThemeToggle from "../components/ui/ThemeToggle";
import { QueryProvider } from "../contexts/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className={`${GeistMono.className} antialiased`}>
        <I18nProvider>
          <QueryProvider>
            <Header />
            <ThemeToggle />
            <main>{children}</main>
            <Footer />
          </QueryProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
