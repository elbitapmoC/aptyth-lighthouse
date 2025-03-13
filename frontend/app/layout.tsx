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

import { cn } from "@/lib/utils";
import { I18nProvider } from "../components/i18n-provider";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import { ThemeProvider } from "../components/theme-provider";
import { QueryProvider } from "../contexts/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body
        className={cn(
          GeistMono.className,
          "flex min-h-screen flex-col bg-background text-foreground antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <QueryProvider>
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </QueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
