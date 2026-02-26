import type { Metadata } from "next";
import { Press_Start_2P, DotGothic16 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import Providers from "@/components/Providers";
import { WebsiteJsonLd } from "@/components/JsonLd";


const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const bodyFont = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Pini — Free Games for Kids & Students K-12",
    template: "%s | Pini",
  },
  description:
    "Play Smart. Play Free. 900+ free brain-training games for kids & students K-12. Puzzles, logic, strategy, math and more — organized by thinking skill. No signup needed!",
  keywords: [
    "free games",
    "kids games",
    "educational games",
    "puzzle games",
    "logic games",
    "K-12 games",
    "free games for kids",
    "math games",
    "coding games",
    "strategy games",
  ],
  metadataBase: new URL("https://pini.vercel.app"),
  openGraph: {
    title: "Pini — Play Smart. Play Free. | K-12 Brain Games",
    description: "900+ free brain-training games for kids & students. Puzzles, logic, strategy and more. No signup — just play!",
    type: "website",
    locale: "en_US",
    url: "https://pini.vercel.app",
    siteName: "Pini",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pini — Play Smart. Play Free. | K-12 Brain Games",
    description: "900+ free brain-training games for kids & students. No signup — just play!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <WebsiteJsonLd />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <meta name="google-adsense-account" content={process.env.NEXT_PUBLIC_ADSENSE_CLIENT} />
        )}
      </head>
      <body className={`${pixelFont.variable} ${bodyFont.variable}`}>
        <GoogleAnalytics />
        <GoogleAdSense />
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
