import ArticleCard from '@/components/article-card';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Prose from '@/components/Prose';
import GoBackButton from '@/components/go-back-button';
import articles from '@/data/article';
import { Article as ArticleType } from '@/types/article';
import { Badge } from 'flowbite-react';

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const pathname = params;
  const { slug } = pathname;

  const article: ArticleType =
    articles.find((item) => item.id === slug) || articles[0];

  const { id, name, tags, updated } = article;

  const encodedFileName = encodeURIComponent(name);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/markdown/${encodedFileName}.md`,
  );

  const data = await res.text();

  return (
    <>
      <GoBackButton />
      <div className="my-6 border-b border-solid border-border">
        <h1 className="text-4xl font-semibold leading-normal">{name}</h1>
        <div className="flex items-center gap-2">
          <div className="py-4 text-xs text-tertiary">{updated}</div>
          <>
            {tags.map((item) => {
              return (
                <Badge color="indigo" key={item}>
                  {item}
                </Badge>
              );
            })}
          </>
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <Prose>
          <MDXRemote source={data} />
        </Prose>
      </div>
    </>
  );
}
