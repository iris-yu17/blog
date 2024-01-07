import ArticleCard from '@/components/article-card';

export default function Article() {
  return (
    <>
      <h1 className="text-4xl font-semibold leading-normal">Articles</h1>
      <p className="mb-20 text-lg text-secondary">Insights, thoughts and trends in design</p>
      <div className="flex flex-col gap-16">
        {Array(10)
          .fill(0)
          .map((item, index) => {
            return <ArticleCard key={index} />;
          })}
      </div>
    </>
  );
}
