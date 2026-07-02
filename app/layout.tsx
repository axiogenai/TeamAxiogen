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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#07070c" />
        <meta property="og:title" content="Axiogen | Creative Engineering Studio" />
        <meta property="og:description" content="Immersive, high-performance digital spaces at the intersection of cinematic design and web engineering." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-outfit antialiased text-[var(--portfolio-fg)] selection:bg-violet-500/30 selection:text-[var(--portfolio-fg)]">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
