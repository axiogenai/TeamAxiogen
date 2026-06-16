import type { Metadata } from "next";
import { SmoothScroll } from "../components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axiogen | Creative Engineering Studio",
  description: "Immersive, high-performance digital spaces at the intersection of cinematic design and web engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.onerror = function(message, source, lineno, colno, error) {
            var div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.top = '0';
            div.style.left = '0';
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.backgroundColor = 'rgba(255, 0, 0, 0.98)';
            div.style.color = '#fff';
            div.style.zIndex = '999999999';
            div.style.padding = '30px';
            div.style.fontFamily = 'monospace';
            div.style.fontSize = '16px';
            div.style.whiteSpace = 'pre-wrap';
            div.style.overflow = 'auto';
            div.innerHTML = '<h1>🚨 Hydration/Client-Side Crash Detected</h1>' +
              '<p><strong>Message:</strong> ' + message + '</p>' +
              '<p><strong>Source:</strong> ' + source + ':' + lineno + ':' + colno + '</p>' +
              '<pre style=\"background: rgba(0,0,0,0.5); padding: 15px; border-radius: 5px; margin-top: 20px;\">' + 
              (error ? error.stack : 'No stack trace available') + '</pre>';
            document.body.appendChild(div);
          };
          window.onunhandledrejection = function(event) {
            var div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.top = '0';
            div.style.left = '0';
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.backgroundColor = 'rgba(255, 100, 0, 0.98)';
            div.style.color = '#fff';
            div.style.zIndex = '999999999';
            div.style.padding = '30px';
            div.style.fontFamily = 'monospace';
            div.style.fontSize = '16px';
            div.style.whiteSpace = 'pre-wrap';
            div.style.overflow = 'auto';
            div.innerHTML = '<h1>🚨 Promise Rejection Detected</h1>' +
              '<pre style=\"background: rgba(0,0,0,0.5); padding: 15px; border-radius: 5px; margin-top: 20px;\">' + 
              event.reason + '</pre>';
            document.body.appendChild(div);
          };
        ` }} />
      </head>
      <body className="font-outfit antialiased bg-black text-white selection:bg-white selection:text-black">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
