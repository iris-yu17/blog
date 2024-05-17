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
    <Link href={href} key={id} className="group/link">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-tertiary">Last Updated: {updated}</div>
        <div className="text-xl font-semibold text-primary group-hover/link:underline">
          {name}
        </div>
        <div className="w-100 mb-3 line-clamp-2 text-secondary group-hover/link:underline">
          {description}
        </div>
      </div>
    </Link>
  );
}
