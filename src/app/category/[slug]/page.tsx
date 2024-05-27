import { categoryList } from '@/data/category';
import { CategoryText } from '@/types/enum/category';
import ArticleCard from '@/components/article-card';
import CategoryBlock from '@/components/category-block';
import articles from '@/data/article';
import PageUrls from '@/types/enum/page-url';

export default function Category({ params }: { params: { slug: string } }) {
  const category = categoryList.find((item) => item.path === params.slug) || {
    tag: 'Gcp',
    paht: '',
  };
  const { tag } = category;

  const filteredArticles = articles.filter((item) => {
    return item.tags.find((_tag) => {
      return _tag === tag;
    });
  });

  return (
    <>
      <h1 className="mb-2 text-3xl font-semibold leading-normal text-quaternary">
        {`{ 文章分類 }`}
      </h1>
      <p className="mb-5 text-lg font-light text-gray-200">
        目前顯示分類為：
        <span className="font-medium">
          {CategoryText[tag]}
        </span>
      </p>
      <CategoryBlock />
      <div className="flex flex-col gap-2 lg:gap-4">
        {filteredArticles.map((item) => {
          const { id } = item;
          const href = `${PageUrls.Article}/${id}`;
          return <ArticleCard key={id} data={item} href={href} />;
        })}
      </div>
    </>
  );
}
