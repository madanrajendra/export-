import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Global Export Solutions",
    default: "Global Export Solutions | Premium International Business",
  },
  description: "Your trusted partner for international export and industrial services. High-quality products and professional management.",
  keywords: ["export", "international business", "industrial services", "global trade"],
  authors: [{ name: "Global Export Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://globalexsolutions.com",
    siteName: "Global Export Solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-full">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
