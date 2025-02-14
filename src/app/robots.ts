import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/ads.txt'],
    },
    sitemap: [
      `${process.env.NEXT_PUBLIC_HOST}/sitemap.xml`,
      `${process.env.NEXT_PUBLIC_HOST}/article/sitemap.xml`,
    ],
  };
}
