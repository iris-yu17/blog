import Link from 'next/link';

import Image from 'next/image';
import { Button } from 'flowbite-react';
import { Article } from '@/types/article';

export default function ArticleCard({
  data,
  href,
}: {
  data: Article;
  href: string;
}) {
  const { name, updated, description, id, tags } = data;
  return (
    <Link href={href} key={id} className="group/link font-rbtm py-2 hover:bg-black-100">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-300">上次更新: {updated}</div>
        <div className="text-xl text-secondary group-hover/link:underline">
          {name}
        </div>
        <div className="line-clamp-2 text-gray-200 text-wrap">
          {description}
        </div>
      </div>
    </Link>
  );
}
