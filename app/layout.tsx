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
      </head>
      <body className="font-outfit antialiased bg-black text-white selection:bg-white selection:text-black">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
