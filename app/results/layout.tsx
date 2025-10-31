import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Naloxone Providers Near You | Naloxone Finder',
  description: 'Find free and low-cost naloxone providers, pharmacies, and distribution centers near you. Access life-saving overdose reversal medication in your area.',
  alternates: {
    canonical: '/results',
  },
  keywords: ['naloxone near me', 'free naloxone', 'narcan near me', 'naloxone providers', 'naloxone locations', 'overdose prevention'],
  openGraph: {
    title: 'Naloxone Providers Near You | Naloxone Finder',
    description: 'Find free and low-cost naloxone providers, pharmacies, and distribution centers near you.',
    url: '/results',
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
