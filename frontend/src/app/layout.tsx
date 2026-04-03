import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuantX - SOTA Institutional Sandbox",
  description: "Omniscient Spatial Interface for Quantitative Analysis",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0a0a0a"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${jetbrainsMono.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col font-montserrat">{children}</body>
    </html>
  );
}
