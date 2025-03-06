export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Socially",
  description: "A modern social media application powered by nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="hidden lg:block lg:col-span-3">
                  <Sidebar />
                </div>
                <div className="lg:col-span-9">{children}</div>
              </div>
            </div>
            <Toaster
              position="top-center" // Moves toasts to bottom-right
              richColors
              closeButton
              duration={4000}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
