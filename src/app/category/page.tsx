import articles from '@/data/article';
import ArticleCard from '@/components/article-card';
import BreadCrumb from '@/components/breadcrumb';
import Pagination from '@/components/pagination';
import CategoryBlock from '@/components/category-block';
import PageUrls from '@/types/enum/page-url';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';

export default function Category({
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
      <BreadCrumb
        items={[
          {
            key: BreadcrumbKey.Category,
          },
        ]}
      />
      <h1 className="mb-3 text-2xl font-semibold leading-normal text-quaternary md:mb-5 md:text-3xl">
        {`{ 文章分類 }`}
      </h1>
      <p className="text-md mb-5 font-light text-gray-200 md:text-lg">
        目前顯示分類為：
        <span className="font-medium">全部文章</span>
      </p>
      <CategoryBlock />
      <div className="flex flex-col gap-2 md:gap-4">
        {slicedArticles.map((item) => {
          const { id } = item;
          const href = `${PageUrls.Article}/${id}`;
          return <ArticleCard key={id} data={item} href={href} />;
        })}
      </div>
      <Pagination
        totalPages={TOTAL_PAGES}
        currentPage={currentPage}
        mainPath={PageUrls.Category}
      />
    </>
  );
}
