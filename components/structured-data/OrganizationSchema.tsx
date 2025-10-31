export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Naloxone Finder',
    url: 'https://bizbyme-app.vercel.app',
    logo: 'https://bizbyme-app.vercel.app/findmynaloxone-logo.png',
    description: 'Locate pharmacies, community resources, and free naloxone distribution points in your area',
    foundingDate: '2025',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://www.novedevice.com/contact-us',
    },
    sameAs: [
      'https://www.novedevice.com',
    ],
    publisher: {
      '@type': 'Organization',
      name: 'NOVE',
      url: 'https://www.novedevice.com',
      logo: 'https://bizbyme-app.vercel.app/nove logo black.png',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
