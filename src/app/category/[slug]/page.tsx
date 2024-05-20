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
  console.log(filteredArticles);

  return (
    <>
      <h1 className="text-4xl font-semibold leading-normal">文章分類</h1>
      <p className="mb-12 text-lg text-secondary">
        目前顯示分類為：{CategoryText[tag]}
      </p>
      <CategoryBlock />
      <div className="flex flex-col gap-4 lg:gap-8">
        {filteredArticles.map((item) => {
          const { id } = item;
          const href = `${PageUrls.Article}/${id}`;
          return <ArticleCard key={id} data={item} href={href} />;
        })}
      </div>
    </>
  );
}
