import ArticleCard from '@/components/article-card';
import { Locales } from '@/types/enum/locales';
import articles from '@/data/article';
import PageUrls from '@/types/enum/page-url';

const article = articles[0];

export default function Home({
  params: { lang },
}: {
  params: { lang: Locales };
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-4 text-4xl font-light">Welcome to</div>
      <div className="relative overflow-hidden font-press text-5xl">
        <h1 className="block flex-nowrap lg:flex">
          <span className="mb-3 block text-primary lg:mb-0">IRIS&nbsp;</span>
          <span>Studio</span>
        </h1>
        <div className="fill-mode-forwards absolute -top-1 left-0 h-1/2 w-full animate-mobile_typing bg-black-200 transition-none lg:hidden lg:h-full">
          <div className="h-full w-1 animate-flicker bg-primary"></div>
        </div>
        <div className="fill-mode-forwards absolute -top-1 left-0 hidden h-1/2 w-full animate-typing bg-black-200 transition-none lg:block lg:h-full">
          <div className="h-full w-1 animate-flicker bg-primary"></div>
        </div>
      </div>
      <div className="mt-3 h-0.5 w-full bg-border"></div>

      <div className="mt-4 text-tertiary">
        {['前端開發', 'React', 'JavaSript', 'Next.js', '無障礙網頁開發'].map(
          (item) => {
            return <div key={item}>#{item}</div>;
          },
        )}
      </div>
      <div className="fixed bottom-12 right-4 w-full max-w-[calc(100%-5rem)] rounded-lg border border-dashed border-quaternary px-3 py-2 md:w-1/2 lg:w-1/3">
        <div className="border-b border-dashed border-quaternary pb-2">
          最新文章
        </div>
        <ArticleCard
          data={article}
          href={`${PageUrls.Article}/${article.id}`}
          lang={lang}
        />
      </div>
    </div>
  );
}
