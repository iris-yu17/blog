import Link from 'next/link';

import Image from 'next/image';
import { Badge } from 'flowbite-react';
import { Article } from '@/types/article';
import { CategoryText } from '@/types/enum/category';
import { getDictionary } from '@/utils/dictionaries';
import { cookies } from 'next/headers';

export default async function ArticleCard({
  data,
  href,
}: {
  data: Article;
  href: string;
}) {
  const { name, updated, description, id, tags } = data;
  const tag = tags[0];
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string, 'article');
  const commonDict = await getDictionary(lang as string, 'common');

  return (
    <Link
      href={href}
      key={id}
      className="group/link py-2 font-rbtm hover:bg-black-100"
      // scroll={false}
    >
      <div className="flex flex-col gap-1 md:gap-2">
        <div className="flex gap-2">
          <div className="border-b border-dashed  border-gray-300 text-sm text-gray-300">
            {dict['last-updated']}: {updated}
          </div>
          <div className="text-sm text-code-100">
            [#{(CategoryText as any)[tag] || commonDict['sub-category'][tag]}]
          </div>
        </div>
        <div className="text-lg text-secondary md:text-xl">{name}</div>
        <div className="line-clamp-2 text-wrap text-gray-200">
          {description}
        </div>
      </div>
    </Link>
  );
}
