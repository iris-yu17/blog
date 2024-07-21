import type { Metadata } from 'next';
import articles from '@/data/article';
import ArticleCard from '@/components/article-card';
import BreadCrumb from '@/components/breadcrumb';
import Pagination from '@/components/pagination';
import CategoryBlock from '@/components/category-block';
import PageUrls from '@/types/enum/page-url';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import initTranslations from '@/i18n';
import { Locales } from '@/types/enum/locales';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locales };
}): Promise<Metadata> {
  const { t } = await initTranslations(params.lang, ['category']);

  return {
    title: `${t('h1')}｜${t('all')} - IRIS Studio`,
  };
}

export default async function Category({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { lang: Locales };
}) {
  const { page = 1 } = searchParams;
  const currentPage = Number(page);
  const { lang } = params;

  const { t } = await initTranslations(params.lang, ['category']);
  const { t: tCommon } = await initTranslations(lang, ['common']);

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
        lang={lang}
        items={[
          {
            key: BreadcrumbKey.Category,
          },
        ]}
      />
      <h1 className="mb-3 text-2xl font-semibold leading-normal text-quaternary md:mb-5 md:text-3xl">
        {`<`}
        {/* 文章分類 */}
        <span className="mx-1">{t('h1')}</span>
        {`/>`}
      </h1>
      <p className="text-md mb-5 font-light text-gray-200 md:text-lg">
        {/* 目前顯示分類為： */}
        {t('current-category')}
        {/* 全部文章 */}
        <span className="font-medium">{t('all')}</span>
        <span>
          {/* 共 x 篇 */}
          &#160;({t('total', { count: totalCount })})
        </span>
      </p>
      <CategoryBlock lang={lang}/>
      <div className="flex flex-col gap-2 md:gap-4">
        {slicedArticles.map((item) => {
          const { id } = item;
          const href = `${PageUrls.Article}/${id}`;
          return <ArticleCard key={id} data={item} href={href} lang={lang} />;
        })}
      </div>
      <Pagination
        totalPages={TOTAL_PAGES}
        currentPage={currentPage}
        mainPath={PageUrls.Category}
        dict={tCommon('pagination', { returnObjects: true })}
      />
    </>
  );
}
