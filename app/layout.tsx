import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { SEQUENCE_FRAMES } from "@/lib/sequence-frames";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = "https://genolink.lt";
const SITE_NAME = "Genolink";
const SITE_TITLE = "Genolink — Pharmacogenomics as a Clinical Standard";
const SITE_DESCRIPTION =
  "Clinical decision support powered by pharmacogenomics and AI. One test creates a lifelong PGx passport for safer prescribing, dosing, and fewer adverse drug reactions.";
const FAVICON_VERSION = "2";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  manifest: `/site.webmanifest?v=${FAVICON_VERSION}`,
  appleWebApp: {
    title: SITE_NAME,
  },
  icons: {
    icon: [
      {
        url: `/favicon-96x96.png?v=${FAVICON_VERSION}`,
        sizes: "96x96",
        type: "image/png",
      },
      { url: `/favicon.svg?v=${FAVICON_VERSION}`, type: "image/svg+xml" },
    ],
    shortcut: `/favicon.ico?v=${FAVICON_VERSION}`,
    apple: `/apple-touch-icon.png?v=${FAVICON_VERSION}`,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: "/genolink-white.webp", width: 2400, height: 609, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/genolink-white.webp"],
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
      className={cn(
        "h-full bg-black antialiased",
        inter.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href={`/favicon-96x96.png?v=${FAVICON_VERSION}`}
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`/favicon.svg?v=${FAVICON_VERSION}`}
        />
        <link rel="shortcut icon" href={`/favicon.ico?v=${FAVICON_VERSION}`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/apple-touch-icon.png?v=${FAVICON_VERSION}`}
        />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <link rel="manifest" href={`/site.webmanifest?v=${FAVICON_VERSION}`} />
        {/*
          Preload the entire scroll sequence at the document level so it starts
          fetching before hydration. Frame 0 is highest priority (it's the
          placeholder); the rest stream in behind it as low priority.
        */}
        {SEQUENCE_FRAMES.map((src, index) => (
          <link
            key={src}
            rel="preload"
            as="image"
            href={src}
            fetchPriority={index === 0 ? "high" : "low"}
          />
        ))}
      </head>
      <body className={cn(inter.className, "min-h-full bg-black text-foreground")}>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
