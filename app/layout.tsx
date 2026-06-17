import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { SEQUENCE_FRAMES } from "@/lib/sequence-frames";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_NAME = "GenoLink";
const SITE_TITLE = "GenoLink — фармакогеномика как клинический стандарт";
const SITE_DESCRIPTION =
  "Платформа клинической поддержки решений на основе фармакогеномики и ИИ: один тест — пожизненный PGx-паспорт, безопасное назначение и дозирование лекарств, меньше нежелательных реакций.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pgx.bio"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://pgx.bio",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
