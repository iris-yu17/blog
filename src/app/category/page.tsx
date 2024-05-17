import articles from '@/data/article';
import ArticleCard from '@/components/article-card';
import CategoryBlock from '@/components/category-block';

export default function Category() {
  return (
    <>
      <h1 className="text-4xl font-semibold leading-normal">文章分類</h1>
      <p className="mb-12 text-lg text-secondary">目前顯示分類為：全部文章</p>
      <CategoryBlock />
      <div className="flex flex-col gap-4 lg:gap-8">
        {articles.map((item) => {
          const { id } = item;
          const href = '#';
          return <ArticleCard key={id} data={item} href={href} />;
        })}
      </div>
    </>
  );
}
