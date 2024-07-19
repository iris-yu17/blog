import type { Metadata } from 'next';
import { categoryList } from '@/data/category';
import { CategoryText } from '@/types/enum/category';
import ArticleCard from '@/components/article-card';
import BreadCrumb from '@/components/breadcrumb';
import CategoryBlock from '@/components/category-block';
import articles from '@/data/article';
import PageUrls from '@/types/enum/page-url';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import { Props } from '@/types/props';
import initTranslations from '@/i18n';
import { Locales } from '@/types/enum/locales';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryList.find((item) => item.path === params.slug) || {
    tag: 'Gcp',
    paht: '',
  };
  const { tag } = category;
  const { t } = await initTranslations(params.lang as Locales, ['category']);
  const { t: tCommon } = await initTranslations(params.lang as Locales, [
    'common',
  ]);

  return {
    title: `${t('h1')}｜${
      (CategoryText as any)[tag] || tCommon(`sub-category.${tag}`)
    } - IRIS Studio`,
  };
}

export default async function Category({
  params,
}: {
  params: { slug: string; lang: Locales };
}) {
  const category = categoryList.find((item) => item.path === params.slug) || {
    tag: 'Gcp',
    paht: '',
  };
  const { tag } = category;
  const { lang } = params;
  const { t } = await initTranslations(lang, ['category']);
  const { t: tCommon } = await initTranslations(lang, ['common']);

  const filteredArticles = articles.filter((item) => {
    return item.tags.find((_tag) => {
      return _tag === tag;
    });
  });

  return (
    <>
      <BreadCrumb
        lang={lang}
        items={[
          {
            key: BreadcrumbKey.Category,
          },
          {
            text: (CategoryText as any)[tag] || tCommon(`sub-category.${tag}`),
            href: '#',
          },
        ]}
      />
      <h1 className="mb-2 text-3xl font-semibold leading-normal text-quaternary">
        {`<`}
        {/* 文章分類 */}
        <span className="mx-1">{t('h1')}</span>
        {`/>`}
      </h1>
      <p className="mb-5 text-lg font-light text-gray-200">
        {/* 目前顯示分類為： */}
        {t('current-category')}
        <span className="font-medium">
          {/* 分類名稱 */}
          {(CategoryText as any)[tag] || tCommon(`sub-category.${tag}`)}
        </span>
        <span>
          {/* 共 x 篇 */}
          &#160;({t('total', { count: filteredArticles.length })})
        </span>
      </p>
      <CategoryBlock lang={lang} />
      <div className="flex flex-col gap-2 md:gap-4">
        {filteredArticles.map((item) => {
          const { id } = item;
          const href = `${PageUrls.Article}/${id}`;
          return <ArticleCard key={id} data={item} href={href} lang={lang} />;
        })}
      </div>
    </>
  );
}
