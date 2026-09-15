import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import GsapProvider from "@/components/motion/GsapProvider";
import { SITE } from "@/lib/constants";
import { buildLocalBusinessJsonLd, SITE_URL } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | Auckland Residential Builders`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Apex Carpentry Ltd is an Auckland based residential building company offering new builds, renovations, additions, decks and landscaping, since 2016.",
  keywords: [
    "Apex Carpentry",
    "Apex Carpentry Ltd",
    "Auckland builders",
    "carpentry Auckland",
    "new builds Auckland",
    "renovations Auckland",
    "additions Auckland",
    "decks Auckland",
    "landscaping Auckland",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} | Auckland Residential Builders`,
    description: "Design-led builds across Auckland. New builds, renovations, additions, decks and landscaping.",
    images: [{ url: "/images/new-builds/new-builds-twin-cabins-hero.jpg", width: 1200, height: 1600 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Auckland Residential Builders`,
    description: "Design-led builds across Auckland.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GsapProvider>{children}</GsapProvider>
      </body>
    </html>
  );
}
