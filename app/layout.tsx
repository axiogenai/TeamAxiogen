import type { Metadata } from "next";
import "./globals.css";

const keywords = [
  "Axiogen",
  "Creative Engineering Studio",
  "Immersive Digital Experiences",
  "High-Performance Web Development",
  "Cinematic Web Design",
  "Web Engineering Solutions",
  "Digital Experience Agency",
  "Interactive Web Development",
  "Creative Technology Studio",
  "Bespoke Web Design",
  "Cutting-Edge Web Solutions",
  "Digital Product Engineering"
];

export const metadata: Metadata = {
  title: "Axiogen | Creative Engineering Studio & High-Performance Web Development",
  description: "Axiogen is a Creative Technology Studio & Digital Experience Agency crafting Immersive Digital Experiences, Cinematic Web Design, Bespoke Web Design, Interactive Web Development, Cutting-Edge Web Solutions, and High-Performance Web Engineering Solutions.",
  keywords: keywords.join(", "),
  authors: [{ name: "Axiogen", url: "https://team.axiogen.in" }],
  creator: "Axiogen Creative Technology Studio",
  publisher: "Axiogen",
  metadataBase: new URL("https://team.axiogen.in"),
  alternates: {
    canonical: "https://team.axiogen.in",
  },
  openGraph: {
    title: "Axiogen | Creative Engineering Studio & Digital Product Engineering",
    description: "Digital Experience Agency specializing in Immersive Digital Experiences, Cinematic Web Design, High-Performance Web Development, and Cutting-Edge Web Engineering Solutions.",
    url: "https://team.axiogen.in",
    siteName: "Axiogen",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axiogen | Creative Engineering Studio",
    description: "Bespoke Web Design & Digital Product Engineering at the intersection of cinematic design and high-performance web development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Axiogen",
    "alternateName": "Axiogen Creative Engineering Studio",
    "url": "https://team.axiogen.in",
    "description": "Creative Technology Studio & Digital Experience Agency crafting Immersive Digital Experiences, Cinematic Web Design, High-Performance Web Development, Bespoke Web Design, Interactive Web Development, and Cutting-Edge Web Solutions.",
    "knowsAbout": keywords,
    "serviceType": [
      "Creative Engineering Studio",
      "Immersive Digital Experiences",
      "High-Performance Web Development",
      "Cinematic Web Design",
      "Web Engineering Solutions",
      "Digital Experience Agency",
      "Interactive Web Development",
      "Creative Technology Studio",
      "Bespoke Web Design",
      "Cutting-Edge Web Solutions",
      "Digital Product Engineering"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#07070c" />
        <meta name="keywords" content={keywords.join(", ")} />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-outfit antialiased text-[var(--portfolio-fg)] selection:bg-violet-500/30 selection:text-[var(--portfolio-fg)]">
        {children}
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
