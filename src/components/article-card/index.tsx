import Link from 'next/link';

import Image from 'next/image';
import { Badge } from 'flowbite-react';
import { Article } from '@/types/article';
import { CategoryText } from '@/types/enum/category';
import initTranslations from '@/i18n';
import { Locales } from '@/types/enum/locales';

export default async function ArticleCard({
  data,
  href,
  lang,
}: {
  data: Article;
  href: string;
  lang: Locales;
}) {
  const { name, updated, description, id, tags } = data;
  const tag = tags[0];
  const { t } = await initTranslations(lang, ['article']);
  const { t: tCommon } = await initTranslations(lang, ['common']);

  return (
    <Link
      href={href}
      key={id}
      className="group/link d-flex block py-2 font-rbtm hover:bg-black-100"
      // scroll={false}
    >
      <div className="flex flex-col gap-1 md:gap-2">
        <div className="flex gap-2">
          <div className="border-b border-dashed  border-gray-300 text-sm text-gray-300">
            {t('last-updated')}: {updated}
          </div>
          <div className="text-sm text-code-100">
            [#{(CategoryText as any)[tag] || tCommon(`sub-category.${tag}`)}]
          </div>
        </div>
        <div className="text-lg text-secondary md:text-xl">{name}</div>
        <div className="line-clamp-2 text-wrap text-sm text-gray-300">
          {description}
        </div>
      </div>
    </Link>
  );
}
