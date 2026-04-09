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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "QuantX",
  },
};

export const viewport = {
  themeColor: "#000000"
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
      <body className="min-h-full flex flex-col font-montserrat">
        {children}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(reg) { console.log('QuantX SW Active', reg.scope); },
                    function(err) { console.log('QuantX SW Error', err); }
                  );
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
