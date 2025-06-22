import "@/app/globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import AnnouncementBar from "@/components/homepage/announcement-bar";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/homepage/theme-provider";
import { validateConfig } from "@/lib/config";
import { Suspense } from "react";

// Next.js 的 Head 组件用于添加全局 <head> 内容
import Head from "next/head";
import Script from "next/script";

// 初始化配置验证
validateConfig();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Headshots AI",
  description: "Generate awesome headshots in minutes using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        {/* Google Analytics 脚本 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LC40RWBC1Y"
        />
        <Script id="ga-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LC40RWBC1Y');
          `}
        </Script>
      </Head>

      <body className="min-h-screen flex flex-col bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnnouncementBar />
          <Suspense
            fallback={
              <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16" />
              </div>
            }
          >
            <Navbar />
          </Suspense>

          <main className="flex-1">{children}</main>

          <Footer />
          <Toaster />
          <VercelAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
