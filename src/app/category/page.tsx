import articles from '@/data/article';
import ArticleCard from '@/components/article-card';
import CategoryBlock from '@/components/category-block';
import PageUrls from '@/types/enum/page-url';

export default function Category() {
  return (
    <>
      <h1 className="text-3xl font-semibold leading-normal text-yellow-400">
        文章分類
      </h1>
      <p className="mb-5 text-lg text-gray-200 font-light">目前顯示分類為：全部文章</p>
      <CategoryBlock />
      <div className="flex flex-col gap-2 lg:gap-4">
        {articles.map((item) => {
          const { id } = item;
          const href = `${PageUrls.Article}/${id}`;
          return <ArticleCard key={id} data={item} href={href} />;
        })}
      </div>
    </>
  );
}
