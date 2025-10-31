interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  imageUrl: string;
  url: string;
  section: string;
  keywords: string[];
}

export default function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
  url,
  section,
  keywords,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: imageUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://bizbyme-app.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Naloxone Finder',
      url: 'https://bizbyme-app.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bizbyme-app.vercel.app/findmynaloxone-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bizbyme-app.vercel.app${url}`,
    },
    articleSection: section,
    keywords: keywords.join(', '),
    about: {
      '@type': 'MedicalWebPage',
      name: headline,
      medicalAudience: {
        '@type': 'MedicalAudience',
        audienceType: 'Patient',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
