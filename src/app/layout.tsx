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
    template: "%s | SARAAGO Exim",
    default: "SARAAGO Exim | Premium Lab-Grown Diamond Jewellery Export",
  },
  description: "SARAAGO Exim is a focused Indian export company helping international buyers source premium lab-grown diamond jewellery with clear specifications, professional coordination and export-ready documentation.",
  keywords: ["export", "lab-grown diamonds", "jewellery", "India export", "CVD diamonds", "HPHT diamonds", "SARAAGO"],
  authors: [{ name: "SARAAGO Exim" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.saraagoexim.com",
    siteName: "SARAAGO Exim",
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
