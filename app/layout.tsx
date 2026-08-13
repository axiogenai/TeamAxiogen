import type { Metadata, Viewport } from "next";
import "./globals.css";

const keywords = [
  "Axiogen",
  "Axiogen AI",
  "Team Axiogen",
  "Axiogen Studio",
  "Axiogen ClinicOS",
  "Axiogen Digitize",
  "CodeMind AI",
  "Creative Engineering Studio",
  "Digital Experience Agency",
  "Immersive Digital Experiences",
  "High-Performance Web Development",
  "Cinematic Web Design",
  "Web Engineering Solutions",
  "Interactive Web Development",
  "Creative Technology Studio",
  "Bespoke Web Design",
  "Cutting-Edge Web Solutions",
  "Digital Product Engineering",
  "Custom AI Software Development",
  "Clinic Management Software India",
  "School ERP System Development",
  "WhatsApp Automation Platform",
  "Technical SEO Agency Mumbai"
];

export const viewport: Viewport = {
  themeColor: "#07070c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://team.axiogen.in"),
  title: {
    default: "Axiogen | Creative Engineering Studio & High-Performance Web Development",
    template: "%s | Axiogen Creative Technology Studio",
  },
  description: "Axiogen is a premier Creative Technology Studio & Digital Experience Agency crafting Immersive Digital Experiences, Cinematic Web Design, Bespoke Web Apps, ClinicOS Medical Software, AI Solutions, and High-Performance Web Engineering.",
  keywords: keywords.join(", "),
  authors: [{ name: "Axiogen", url: "https://team.axiogen.in" }],
  creator: "Axiogen Creative Technology Studio",
  publisher: "Axiogen",
  alternates: {
    canonical: "https://team.axiogen.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Axiogen | Creative Engineering Studio & Digital Product Agency",
    description: "Digital Experience Agency crafting Immersive Digital Experiences, Cinematic Web Design, High-Performance Web Development, and Enterprise AI Solutions.",
    url: "https://team.axiogen.in",
    siteName: "Axiogen",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://team.axiogen.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Axiogen — Creative Engineering Studio & Digital Experience Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axiogen | Creative Engineering Studio",
    description: "Bespoke Web Design & Digital Product Engineering at the intersection of cinematic design and high-performance web development.",
    images: ["https://team.axiogen.in/logo.png"],
    creator: "@axiogenai",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://team.axiogen.in/#organization",
        "name": "Axiogen",
        "alternateName": "Team Axiogen",
        "url": "https://team.axiogen.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://team.axiogen.in/logo.png",
          "caption": "Axiogen Creative Technology Studio"
        },
        "sameAs": [
          "https://github.com/axiogenai",
          "https://team.axiogen.in"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi"],
          "url": "https://team.axiogen.in/#contact"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://team.axiogen.in/#service",
        "name": "Axiogen Creative Engineering Studio",
        "url": "https://team.axiogen.in",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.0760",
          "longitude": "72.8777"
        },
        "description": "Creative Technology Studio & Digital Experience Agency crafting Immersive Digital Experiences, Cinematic Web Design, High-Performance Web Development, Bespoke Web Design, and Enterprise AI Solutions.",
        "knowsAbout": keywords,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Axiogen Core Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "High-Performance Web Development",
                "description": "Custom Next.js 15, React, and WebGL web applications engineered for ultra-fast performance, SEO rank, and high conversion."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Axiogen ClinicOS & Medical Software",
                "description": "Healthcare EHR, clinic queue management, digital prescription engine, and patient care SaaS."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "School ERP & Educational SaaS",
                "description": "Comprehensive academic institution portal managing student records, fees, report cards, and parent portals."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Technical SEO & Growth Engineering",
                "description": "Full technical SEO audit, Google Business Profile local search ranking, and organic lead generation systems."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "WhatsApp Automation & Cloud API Integration",
                "description": "Subscriptionless automated WhatsApp lead dispatch, instant AI auto-responders, and business messaging."
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://team.axiogen.in/#website",
        "url": "https://team.axiogen.in",
        "name": "Axiogen Platform",
        "publisher": {
          "@id": "https://team.axiogen.in/#organization"
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        <meta name="msvalidate.01" content="621B3825D10663EF47942F6661B27080" />
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
