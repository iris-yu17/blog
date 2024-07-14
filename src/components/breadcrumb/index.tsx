import Link from 'next/link';
import { VscChevronRight } from 'react-icons/vsc';
import { BreadcrumbKey, BreadcrumbText } from '@/types/enum/breadcrumb';
import PageUrls from '@/types/enum/page-url';
import { getDictionary } from '@/utils/dictionaries';
import { cookies } from 'next/headers';

type BreadCrumbItem = {
  key?: BreadcrumbKey;
  text?: string;
  href?: string;
};

export default async function BreadCrumb({
  items,
}: {
  items: BreadCrumbItem[];
}) {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string, 'common');

  return (
    <div className="sticky left-0 top-12 -ms-4 mb-4 flex w-[calc(100%+2rem)] flex-wrap items-center gap-1 bg-black-200 px-2 py-1 text-sm text-gray-100 shadow-lg shadow-[#dddddd] md:top-10 md:-ms-6 md:w-[calc(100%+3rem)] dark:font-light dark:shadow-[#131313]">
      <div>
        <span className="text-primary">IRIS</span> Studio
      </div>
      <VscChevronRight />
      {items.map((item, index) => {
        const { key = BreadcrumbKey.Home, text, href } = item;

        const breadcrumbText = dict.breadcrumbs[key.toLowerCase()];

        return (
          <div key={index} className="flex items-center gap-1">
            <Link
              href={href || PageUrls[key]}
              className="hover:text-white-default hover:font-medium dark:hover:font-normal"
              // scroll={false}
            >
              {text || breadcrumbText}
            </Link>
            {index < items.length - 1 && <VscChevronRight />}
          </div>
        );
      })}
    </div>
  );
}
