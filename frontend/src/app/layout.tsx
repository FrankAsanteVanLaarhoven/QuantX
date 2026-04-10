import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
      <body className="min-h-full flex flex-col font-montserrat select-none" style={{ WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}>
        {children}
        <Script 
          id="anti-cloning" 
          strategy="afterInteractive"
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

              // SOTA Anti-Cloning & IP Protection Hooks
              document.addEventListener('contextmenu', e => e.preventDefault());
              document.addEventListener('copy', e => {
                e.clipboardData.setData('text/plain', 'QuantX Intellectual Property. Unauthorized extraction is strictly prohibited and logged.');
                e.preventDefault();
              });
              document.addEventListener('cut', e => e.preventDefault());
              document.addEventListener('selectstart', e => e.preventDefault());
              document.addEventListener('dragstart', e => e.preventDefault());
              
              document.addEventListener('keydown', e => {
                  // Prevent Ctrl/Cmd + C, S, P, U (View Source)
                  if ((e.ctrlKey || e.metaKey) && ['c', 'C', 's', 'S', 'p', 'P', 'u', 'U'].includes(e.key)) {
                      e.preventDefault();
                  }
                  // Prevent F12 and DevTools shortcuts
                  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key))) {
                      e.preventDefault();
                  }
              });
            `
          }}
        />
      </body>
    </html>
  );
}
