import articles from "@/data/article";

export default async function sitemap() {
  return articles.map(({ id, updated, priority }) => ({
    url: `${process.env.NEXT_PUBLIC_HOST}/article/${id}`,
    lastModified: new Date(updated),
    priority: priority || 0.5
  }));
}