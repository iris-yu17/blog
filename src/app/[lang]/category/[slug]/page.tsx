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
import { getDictionary } from '@/utils/dictionaries';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryList.find((item) => item.path === params.slug) || {
    tag: 'Gcp',
    paht: '',
  };
  const { tag } = category;
  const dict = await getDictionary(params.lang as string, 'category');
  const commonDict = await getDictionary(params.lang as string, 'common');

  return {
    title: `${dict.h1}｜${
      (CategoryText as any)[tag] || commonDict['sub-category'][tag]
    } - IRIS Studio`,
  };
}

export default async function Category({
  params,
}: {
  params: { slug: string; lang: string };
}) {
  const category = categoryList.find((item) => item.path === params.slug) || {
    tag: 'Gcp',
    paht: '',
  };
  const { tag } = category;
  const { lang } = params;
  const commonDict = await getDictionary(lang as string, 'common');
  const dict = await getDictionary(lang as string, 'category');

  const filteredArticles = articles.filter((item) => {
    return item.tags.find((_tag) => {
      return _tag === tag;
    });
  });

  return (
    <>
      <BreadCrumb
        items={[
          {
            key: BreadcrumbKey.Category,
          },
          {
            text: (CategoryText as any)[tag] || commonDict['sub-category'][tag],
            href: '#',
          },
        ]}
      />
      <h1 className="mb-2 text-3xl font-semibold leading-normal text-quaternary">
        {`<`}
        {/* 文章分類 */}
        <span className="mx-1">{dict.h1}</span>
        {`/>`}
      </h1>
      <p className="mb-5 text-lg font-light text-gray-200">
        {/* 目前顯示分類為： */}
        {dict['current-category']}
        <span className="font-medium">
          {/* 分類名稱 */}
          {(CategoryText as any)[tag] || commonDict['sub-category'][tag]}
        </span>
        <span>
          &#160;({dict.total.replace('{count}', filteredArticles.length)}){' '}
        </span>
      </p>
      <CategoryBlock />
      <div className="flex flex-col gap-2 md:gap-4">
        {filteredArticles.map((item) => {
          const { id } = item;
          const href = `${PageUrls.Article}/${id}`;
          return <ArticleCard key={id} data={item} href={href} />;
        })}
      </div>
    </>
  );
}
