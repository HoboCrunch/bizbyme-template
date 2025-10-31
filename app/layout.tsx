import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import OrganizationSchema from "@/components/structured-data/OrganizationSchema";
import WebsiteSchema from "@/components/structured-data/WebsiteSchema";

const heebo = Heebo({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
  variable: '--font-heebo',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bizbyme-app.vercel.app'),
  title: "Naloxone Finder - Find Free Naloxone Near You",
  description: "Locate pharmacies, community resources, and free naloxone distribution points in your area",
  alternates: {
    canonical: '/',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/findmynaloxone-logo.png",
    apple: "/findmynaloxone-logo.png",
  },
  openGraph: {
    title: "Naloxone Finder - Find Free Naloxone Near You",
    description: "Locate pharmacies, community resources, and free naloxone distribution points in your area",
    images: ["/findmynaloxone-logo.png"],
    url: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={heebo.variable}>
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body className={heebo.className}>{children}</body>
    </html>
  );
}
