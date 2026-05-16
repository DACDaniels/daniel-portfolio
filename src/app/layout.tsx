import type { Metadata, Viewport } from "next";
import {
  Geist,
  DM_Sans,
  JetBrains_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import ExtensionErrorSuppressor from "@/components/ExtensionErrorSuppressor";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://dev.danielchadambuka.com";

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "Daniel Chadambuka — Software Engineer",
    template: "%s — Daniel Chadambuka",
  },
  description:
    "Software Engineer building real-world systems. Full-stack, computer vision, embedded, and AI. Based in Harare, Zimbabwe.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Daniel Chadambuka", url: SITE_URL }],
  creator: "Daniel Chadambuka",
  publisher: "Daniel Chadambuka",
  category: "technology",
  keywords: [
    "Daniel Chadambuka",
    "Software Engineer",
    "Full-stack Developer",
    "Computer Vision Engineer",
    "Edge Systems Engineer",
    "Next.js Developer",
    "Python Developer",
    "Raspberry Pi",
    "Hailo NPU",
    "YOLO",
    "Zimbabwe Developer",
    "Harare Software Engineer",
    "African Tech",
    "NUST Zimbabwe",
  ],
  openGraph: {
    title: "Daniel Chadambuka — Software Engineer",
    description:
      "Software Engineer building real-world systems. Full-stack, computer vision, embedded, and AI.",
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Daniel Chadambuka",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Chadambuka — Software Engineer",
    description:
      "Software Engineer building real-world systems. Full-stack, computer vision, embedded, and AI.",
    creator: "@DACDaniels",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: "Daniel Chadambuka",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Daniel Chadambuka",
  givenName: "Daniel",
  familyName: "Chadambuka",
  jobTitle:
    "Software Engineer, Edge Systems Engineer & Computer Vision Developer",
  description:
    "Final-year Computer Science student at NUST with over two years of shipping software. Full-stack web, computer vision, edge devices, and enterprise IT infrastructure.",
  url: SITE_URL,
  image: `${SITE_URL}/images/daniel-hero.jpg`,
  email: "mailto:chadambukadaniel@gmail.com",
  nationality: {
    "@type": "Country",
    name: "Zimbabwe",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Harare",
    addressCountry: "Zimbabwe",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "National University of Science and Technology, Zimbabwe",
    sameAs: "https://www.nust.ac.zw/",
  },
  knowsAbout: [
    "Full-Stack Web Development",
    "Computer Vision",
    "Edge Computing",
    "Embedded Systems",
    "Raspberry Pi",
    "Hailo NPU",
    "YOLO",
    "Next.js",
    "TypeScript",
    "Python",
    "AI Engineering",
    "IoT",
    "Enterprise Infrastructure",
  ],
  sameAs: [
    "https://github.com/DACDaniels",
    "https://www.linkedin.com/in/daniel-chadambuka-792b74277/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Daniel Chadambuka",
  description:
    "Portfolio of Daniel Chadambuka, Software Engineer based in Harare, Zimbabwe.",
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ExtensionErrorSuppressor />
        <a href="#home" className="skip-link">
          Skip to main content
        </a>
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
