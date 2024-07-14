import type { Metadata } from 'next';
import articles from '@/data/article';
import ArticleCard from '@/components/article-card';
import BreadCrumb from '@/components/breadcrumb';
import Pagination from '@/components/pagination';
import CategoryBlock from '@/components/category-block';
import PageUrls from '@/types/enum/page-url';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import { getDictionary } from '@/utils/dictionaries';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang, 'category');

  return {
    title: `${dict.h1}｜${dict.all} - IRIS Studio`,
  };
}

export default async function Category({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: string };
}) {
  const { page = 1 } = searchParams;
  const currentPage = Number(page);
  const { lang } = params;
  const dict = await getDictionary(lang as string, 'category');
  const commonDict = await getDictionary(lang as string, 'common');

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
        {`<`}
        {/* 文章分類 */}
        <span className="mx-1">{dict.h1}</span>
        {`/>`}
      </h1>
      <p className="text-md mb-5 font-light text-gray-200 md:text-lg">
        {/* 目前顯示分類為： */}
        {dict['current-category']}
        {/* 全部文章 */}
        <span className="font-medium">{dict.all}</span>
        <span>
          {/* 共 x 篇 */}
          &#160;({dict.total.replace('{count}', totalCount)}){' '}
        </span>
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
        dict={commonDict.pagination}
      />
    </>
  );
}
