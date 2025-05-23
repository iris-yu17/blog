import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Pluggable } from 'unified';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import Prose from '@/components/Prose';
import BreadCrumb from '@/components/breadcrumb';
import articles from '@/data/article';
import { Article as ArticleType } from '@/types/article';
import { Badge } from 'flowbite-react';
import { CategoryText } from '@/types/enum/category';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import { visit } from 'unist-util-visit';
import { Props } from '@/types/props';
import Link from 'next/link';
import { PiCheckBold } from 'react-icons/pi';

import CodeTheme from '@/components/code-theme';
import initTranslations from '@/i18n';
import { Locales } from '@/types/enum/locales';
import PageUrls from '@/types/enum/page-url';

function addIdToH2() {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2') {
        if (!node.properties.id) {
          const id = node.children
            .filter((child: any) => child.type === 'text')
            .map((child: any) => child.value)
            .join(' ')
            .toLowerCase()
            .replace(/\s+/g, '-');
          node.properties.id = id;
        }
      }
    });
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pathname = params;
  const { slug } = pathname;

  const article: ArticleType =
    articles.find((item) => item.id === slug) || articles[0];
  const { name, description } = article;

  return {
    title: `${name} - IRIS Studio`,
    description: description || name,
  };
}

export const generateStaticParams = async () => {
  return articles.map((item) => ({
    slug: item.id,
  }));
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight as Pluggable<any[]>,
      addIdToH2,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: {
            type: 'element',
            tagName: 'span',
            properties: { class: 'text-quaternary text-3xl mr-2' },
            children: [{ type: 'text', value: '#' }],
          },
        },
      ] as Pluggable<any[]>,
    ],
  },
};

export default async function Article({
  params,
}: {
  params: { slug: string; lang: Locales };
}) {
  const pathname = params;
  const { slug, lang } = pathname;
  const { t } = await initTranslations(lang, ['common']);

  const article: ArticleType | undefined = articles.find(
    (item) => item.id === slug,
  );

  if (!article) throw new Error("Can't find article.");

  const { id, name, tags, updated, revalidate } = article;
  const recommend = article.recommend || [articles[0].id];

  // const nextArticle = articles.find((item) => item.id === nextId);
  // console.log('nextIdA', nextArticle);

  // const encodedFileName = encodeURIComponent(name);
  let data;
  const file = tags[0];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/markdown/${file}/${id}.md`,
      revalidate ? { next: { revalidate: 60 } } : {},
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    data = await res.text();
  } catch (error) {
    console.log('Error:', error);
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <CodeTheme />
      <BreadCrumb
        lang={lang}
        items={[
          {
            key: BreadcrumbKey.Home,
          },
          {
            text: name,
            href: '#',
          },
        ]}
      />
      <div className="mb-6 border-b-2 border-dashed border-gray-100">
        <div className="flex items-center gap-2">
          <div className="py-2 text-sm text-code-100">{updated}</div>
          <>
            {tags.map((item) => {
              return (
                <Badge color="success" key={item}>
                  #{(CategoryText as any)[item] || t(`sub-category.${item}`)}
                </Badge>
              );
            })}
          </>
        </div>
        <h1 className="text-3xl font-semibold leading-normal">{name}</h1>
      </div>
      <div className="flex flex-col gap-16">
        <Prose>
          <MDXRemote
            source={data}
            options={options}
            components={{
              a: ({ href, children }: any) => {
                if (href.startsWith('./') || href.startsWith('#')) {
                  return (
                    <Link href={href}>
                      <span>{children}</span>
                    </Link>
                  );
                }
                return (
                  <a href={href} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                );
              },
            }}
          />
        </Prose>
      </div>
      <div className="mt-12 rounded border-dotted border-tertiary bg-black-300 px-4 py-4 md:px-6">
        <div className="my-1">閱讀推薦：</div>
        {recommend?.map((item) => {
          const article =
            articles.find((_article) => _article.id === item) || articles[0];
          return (
            <div key={item} className="my-2 flex items-center gap-2">
              <PiCheckBold className="min-w-4 text-base text-quaternary" />
              <Link
                href={`${PageUrls.Article}/${article.id}`}
                className="undeline block text-secondary hover:underline"
              >
                {article.name}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
