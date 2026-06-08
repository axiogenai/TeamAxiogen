import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SmoothScroll } from "../components/SmoothScroll";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

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
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className="font-outfit antialiased bg-black text-white selection:bg-white selection:text-black">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
