import Link from 'next/link';

import ArticleCard from '@/components/article-card';
import articles from '@/data/article';

export default async function Article() {
  return (
    <>
      <h1 className="text-4xl font-semibold leading-normal">Articles</h1>
      <p className="mb-12 text-lg text-secondary">
        Insights, thoughts and trends in design
      </p>
      <div className="flex flex-col gap-4 lg:gap-8">
        {articles.map((item) => {
          const { name, updated, description, id, tags } = item;
          return (
            <Link href={`/article/${id}`} key={id} className="group/link">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-tertiary">
                  Last Updated: {updated}
                </div>
                <div className="text-xl font-semibold text-primary group-hover/link:underline">
                  {name}
                </div>
                <div className="w-100 mb-3 line-clamp-2 text-secondary group-hover/link:underline">
                  {description}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
