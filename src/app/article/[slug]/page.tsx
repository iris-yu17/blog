import { MDXRemote } from 'next-mdx-remote/rsc';
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

import CodeTheme from '@/components/code-theme';

function addIdToH2() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2') {
        if (!node.properties.id) {
          const id = node.children
            .filter((child) => child.type === 'text')
            .map((child) => child.value)
            .join(' ')
            .toLowerCase()
            .replace(/\s+/g, '-');
          node.properties.id = id;
        }
      }
    });
  };
}

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
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
      ],
    ],
  },
};

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

  const file = tags[0];
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/markdown/${file}/${encodedFileName}.md`,
  );

  const data = await res.text();

  return (
    <>
      <CodeTheme />
      <BreadCrumb
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
                  #{CategoryText[item]}
                </Badge>
              );
            })}
          </>
        </div>
        <h1 className="text-3xl font-semibold leading-normal">{name}</h1>
      </div>
      <div className="flex flex-col gap-16">
        <Prose>
          <MDXRemote source={data} options={options} />
        </Prose>
      </div>
    </>
  );
}
