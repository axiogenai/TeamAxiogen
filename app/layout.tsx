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
        "legalName": "Team Axiogen",
        "alternateName": ["Team Axiogen", "Axiogen AI", "Axiogen Studio", "Axiogen India"],
        "url": "https://team.axiogen.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://team.axiogen.in/logo.png",
          "caption": "Axiogen AI Automation & Software Engineering Studio"
        },
        "description": "Axiogen is an Indian AI Automation & Software Engineering Studio founded by Aditya Patil and Aditya Minchekar. We engineer autonomous AI voice calling agents, ClinicOS medical EHR platforms, custom web applications, mobile apps, and business workflow automation.",
        "disambiguatingDescription": "Axiogen (Team Axiogen) is an Indian AI Automation and Software Engineering Studio specializing in AI agents, ClinicOS medical EHR, and custom digital infrastructure. Not affiliated with biotechnology or pharmaceutical entities.",
        "foundingDate": "2024",
        "founder": [
          {
            "@type": "Person",
            "@id": "https://team.axiogen.in/#founder-aditya-patil",
            "name": "Aditya Patil",
            "jobTitle": "Founder & Chief Software Architect",
            "url": "https://team.axiogen.in/founder",
            "sameAs": [
              "https://github.com/axiogenai"
            ]
          },
          {
            "@type": "Person",
            "@id": "https://team.axiogen.in/#founder-aditya-minchekar",
            "name": "Aditya Minchekar",
            "jobTitle": "Co-Founder & Chief Technology Lead",
            "url": "https://team.axiogen.in/founder",
            "sameAs": [
              "https://github.com/axiogenai"
            ]
          }
        ],
        "sameAs": [
          "https://github.com/axiogenai",
          "https://team.axiogen.in",
          "https://axiogen.in"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service & sales",
          "email": "contact@axiogen.in",
          "availableLanguage": ["English", "Hindi", "Marathi"],
          "url": "https://team.axiogen.in/#contact"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      {
        "@type": "Person",
        "@id": "https://team.axiogen.in/#founder-aditya-patil",
        "name": "Aditya Patil",
        "jobTitle": "Founder & Software Engineer",
        "worksFor": {
          "@id": "https://team.axiogen.in/#organization"
        },
        "url": "https://team.axiogen.in/founder",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kolhapur",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "description": "Aditya Patil is the founder of Team Axiogen based in Kolhapur, specializing in AI models, full-stack systems engineering, ClinicOS healthcare platform, web & mobile applications, and scalable production software.",
        "knowsAbout": [
          "Artificial Intelligence & LLMs",
          "Full-Stack Software Engineering",
          "Healthcare Clinic Operating Systems (ClinicOS)",
          "Next.js, React & Mobile Architecture",
          "High-Performance Web Applications",
          "Autonomous AI Agents"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://team.axiogen.in/#founder-aditya-minchekar",
        "name": "Aditya Minchekar",
        "jobTitle": "Co-Founder & Technology Lead",
        "worksFor": {
          "@id": "https://team.axiogen.in/#organization"
        },
        "url": "https://team.axiogen.in/founder",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Sangli",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "description": "Aditya Minchekar is the co-founder of Team Axiogen based in Sangli, specializing in distributed cloud infrastructure, high-throughput systems, database scalability, DevOps, and enterprise automation.",
        "knowsAbout": [
          "Cloud & Distributed Systems",
          "High-Throughput Database Scalability",
          "Microservice Architecture",
          "Enterprise Automation & DevOps",
          "PostgreSQL & Real-Time Queues"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://team.axiogen.in/#service",
        "name": "Axiogen AI Automation & Software Engineering Studio",
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
        "description": "Premier AI Automation & Software Engineering Studio crafting Autonomous AI Agents, Bespoke Web Applications, ClinicOS Healthcare Software, School ERP, and WhatsApp Cloud Automation.",
        "knowsAbout": keywords,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Axiogen Core Solutions",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Cold Calling & Conversational Agents",
                "description": "Real-time voice calling agents with neural TTS, speech-to-text, and automated CRM lead qualification."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "High-Performance Web Development",
                "description": "Custom Next.js, React, and WebGL web applications engineered for sub-second load times, SEO rank, and high conversion."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Axiogen ClinicOS Healthcare EHR",
                "description": "Complete clinic queue management, digital prescriptions, patient electronic health records, and WhatsApp appointment reminders."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "WhatsApp Cloud Automation",
                "description": "Subscriptionless automated WhatsApp lead capture, instant auto-reply engines, and CRM dispatch."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "School ERP & Academic Management",
                "description": "Educational institution software managing student records, fees, report cards, and parent portals."
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://team.axiogen.in/#website",
        "url": "https://team.axiogen.in",
        "name": "Axiogen",
        "alternateName": "Team Axiogen Studio",
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
