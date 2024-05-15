import Link from 'next/link';

import ArticleCard from '@/components/article-card';
import Pagination from '@/components/pagination';
import articles from '@/data/article';
import PageUrls from '@/types/enum/page-url';

export default async function Article({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page = 1 } = searchParams;
  const currentPage = Number(page);

  const totalCount = articles.length;
  const ARTICLE_PER_PAGE = 10;
  const TOTAL_PAGES = Math.ceil(totalCount / ARTICLE_PER_PAGE);

  const slicedArticles = articles.slice(
    ARTICLE_PER_PAGE * (currentPage - 1),
    ARTICLE_PER_PAGE * currentPage,
  );

  return (
    <>
      <h1 className="text-4xl font-semibold leading-normal">Articles</h1>
      <p className="mb-12 text-lg text-secondary">
        Insights, thoughts and trends in design
      </p>
      <div className="flex flex-col gap-4 lg:gap-8">
        {slicedArticles.map((item) => {
          const { name, updated, description, id, tags } = item;
          return (
            <Link
              href={`/${PageUrls.Article}/${id}`}
              key={id}
              className="group/link"
            >
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
      <Pagination totalPages={TOTAL_PAGES} currentPage={currentPage} />
    </>
  );
}
