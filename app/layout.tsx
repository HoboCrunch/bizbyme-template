import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://bizbyme-app.vercel.app'),
  title: "Naloxone Finder - Find Free Naloxone Near You",
  description: "Locate pharmacies, community resources, and free naloxone distribution points in your area",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/bizbyme-logo.png",
    apple: "/bizbyme-logo.png",
  },
  openGraph: {
    title: "Naloxone Finder - Find Free Naloxone Near You",
    description: "Locate pharmacies, community resources, and free naloxone distribution points in your area",
    images: ["/bizbyme-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
