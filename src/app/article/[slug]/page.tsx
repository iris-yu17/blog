import ArticleCard from '@/components/article-card';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Prose from '@/components/Prose';
import { MdArrowBackIos } from 'react-icons/md';
import articles from '@/data/article';

export default async function Article({ params }) {
  const pathname = params;
  const { slug } = pathname;

  const filename = articles.find((item) => item.id === slug).name;
  const encodedFileName = encodeURIComponent(filename);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/markdown/${encodedFileName}`,
  );

  const data = await res.text();

  return (
    <>
      <button className="flex items-center gap-1">
        <MdArrowBackIos />
        <span>Back to list</span>
      </button>
      <div className="my-6 border-b border-solid border-border">
        <h1 className="text-4xl font-semibold leading-normal">
          [教學] 用 Github Actions 在 Google Cloud Run 上部署 Next.js
        </h1>
        <div className="py-4 text-xs text-tertiary">2023/12/30</div>
      </div>
      <div className="flex flex-col gap-16">
        <Prose>
          <MDXRemote source={data} />
        </Prose>
      </div>
    </>
  );
}
