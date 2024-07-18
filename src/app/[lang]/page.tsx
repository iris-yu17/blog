import ArticleCard from '@/components/article-card';
import BreadCrumb from '@/components/breadcrumb';
import Pagination from '@/components/pagination';
import articles from '@/data/article';
import PageUrls from '@/types/enum/page-url';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import { useTranslation } from '@/i18n';
import { Locales } from '@/types/enum/locales';

export default async function Home({
  searchParams,
  params: { lang },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { [key: string]: string; lang: Locales };
}) {
  const { page = 1 } = searchParams;
  const currentPage = Number(page);

  const { t } = await useTranslation(lang, 'article');
  const { t: tCommon } = await useTranslation(lang, 'common');

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
            key: BreadcrumbKey.Home,
          },
        ]}
      />
      <h1 className="mb-3 text-2xl font-semibold leading-normal text-quaternary md:mb-5 md:text-3xl">
        {`<`}
        <span className="mx-1">{t('h1')}</span>
        {`/>`}
      </h1>
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
        mainPath={PageUrls.Home}
        dict={tCommon('pagination', { returnObjects: true })}
      />
    </>
  );
}
