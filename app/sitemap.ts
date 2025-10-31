import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bizbyme-app.vercel.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2025-10-31'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: new Date('2025-10-31'),
      changeFrequency: 'always',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/what-is-naloxone`,
      lastModified: new Date('2025-10-31'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-use-naloxone`,
      lastModified: new Date('2025-10-31'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/when-to-use-naloxone`,
      lastModified: new Date('2025-10-31'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
