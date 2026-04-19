import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Chadambuka — Software Engineer",
  description:
    "Software Engineer building real-world systems. Full-stack, computer vision, embedded, and AI. Based in Harare, Zimbabwe.",
  metadataBase: new URL("https://danielchadambuka.com"),
  authors: [{ name: "Daniel Chadambuka" }],
  keywords: [
    "Daniel Chadambuka",
    "Software Engineer",
    "Full-stack Developer",
    "Computer Vision",
    "Next.js",
    "Python",
    "Zimbabwe",
  ],
  openGraph: {
    title: "Daniel Chadambuka — Software Engineer",
    description:
      "Software Engineer building real-world systems. Full-stack, computer vision, embedded, and AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Chadambuka — Software Engineer",
    description:
      "Software Engineer building real-world systems. Full-stack, computer vision, embedded, and AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
