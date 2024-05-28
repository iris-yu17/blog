import Link from 'next/link';
import { VscChevronRight } from 'react-icons/vsc';
import { BreadcrumbKey, BreadcrumbText } from '@/types/enum/breadcrumb';
import PageUrls from '@/types/enum/page-url';

type BreadCrumbItem = {
  key?: BreadcrumbKey;
  text?: string;
  href?: string;
};

export default function BreadCrumb({ items }: { items: BreadCrumbItem[] }) {
  return (
    <div className="sticky left-0 top-10 -ms-6 mb-4 flex w-[calc(100%+3rem)] gap-1 border-b border-border bg-black-200 px-2 py-1 text-sm font-light text-gray-100 shadow-lg shadow-[#131313]">
      {items.map((item, index) => {
        const { key = BreadcrumbKey.Home, text, href } = item;

        return (
          <div key={index} className="flex items-center gap-1">
            <Link
              href={href || PageUrls[key]}
              className="hover:font-normal hover:text-white"
            >
              {text || BreadcrumbText[key]}
            </Link>
            {index < items.length - 1 && <VscChevronRight />}
          </div>
        );
      })}
    </div>
  );
}
