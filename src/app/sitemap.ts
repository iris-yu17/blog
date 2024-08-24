import { MetadataRoute } from 'next';
import articles from "@/data/article";

export default function sitemap(): MetadataRoute.Sitemap {
  const articlePages = articles.map(({ id, updated, priority }) => ({
    url: `${process.env.NEXT_PUBLIC_HOST}/article/${id}`,
    lastModified: new Date(updated).toISOString(),
    priority: priority || 0.5
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_HOST}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_HOST}/category`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...articlePages
  ];
}
