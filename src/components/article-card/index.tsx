import Link from 'next/link';

import Image from 'next/image';
import { Badge } from 'flowbite-react';
import { Article } from '@/types/article';
import { CategoryText } from '@/types/enum/category';

export default function ArticleCard({
  data,
  href,
}: {
  data: Article;
  href: string;
}) {
  const { name, updated, description, id, tags } = data;
  const tag = tags[0];
  return (
    <Link
      href={href}
      key={id}
      className="group/link py-2 font-rbtm hover:bg-black-100"
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="text-sm text-gray-300">上次更新: {updated}</div>
          <Badge color="gray" key={id}>
            #{CategoryText[tag]}
          </Badge>
        </div>
        <div className="text-xl text-secondary group-hover/link:underline">
          {name}
        </div>
        <div className="line-clamp-2 text-wrap text-gray-200">
          {description}
        </div>
      </div>
    </Link>
  );
}
