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
import { QueryProvider } from "../contexts/query-provider";
import { ThemeContextProvider } from "../contexts/theme-context";

export default function RootLayout({
  children,
  params: { locale }, // Destructure locale from params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }; // Add locale to params type
}>) {
  return (
    // Use the dynamic locale for the lang attribute
    <html
      lang={locale}
      className={GeistSans.className}
      suppressHydrationWarning
    >
      <body
        className={cn(
          GeistMono.className,
          "flex min-h-screen flex-col bg-background text-foreground antialiased"
        )}
      >
        <ThemeContextProvider
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
        </ThemeContextProvider>
      </body>
    </html>
  );
}
