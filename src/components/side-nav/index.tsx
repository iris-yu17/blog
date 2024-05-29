'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  VscHome,
  VscSearch,
  VscVerified,
  VscAccount,
  VscLayers
} from 'react-icons/vsc';
import PageUrls from '@/types/enum/page-url';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Tooltip } from 'flowbite-react';
import { Theme } from '@/types/enum/theme';
import { twMerge } from 'tailwind-merge';

export const NAV = [
  {
    icon: VscHome,
    text: 'Home',
    link: PageUrls.Home,
    activePath: PageUrls.Article,
  },
  {
    icon: VscVerified,
    text: 'About',
    link: PageUrls.About,
    activePath: PageUrls.About,
  },
  {
    icon: VscSearch,
    text: 'Search',
    link: PageUrls.Search,
    activePath: PageUrls.Search,
  },
  {
    icon: VscLayers,
    text: 'Category',
    link: PageUrls.Category,
    activePath: PageUrls.Category,
  },
];

const customTheme: CustomFlowbiteTheme = {
  sidebar: {
    item: {
      base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-secondary hover:bg-black-100 hover:cursor-pointer',
      active: 'text-primary bg-black-100 dark:bg-black-200',
    },
  },
};

function SideNav() {
  const router = useRouter();
  const path = usePathname();

  const { theme, setTheme } = useTheme();

  return (
    <div className="sticky left-0 top-10 flex h-[calc(100vh-2.5rem)] flex-col justify-between border-r border-border bg-black-300 md:top-0 md:h-screen z-50">
      <nav>
        {NAV.map((item) => {
          const { icon, link, text, activePath } = item;
          const active = path === link || path.includes(activePath);

          return (
            <Tooltip
              content={text}
              placement="right"
              key={text}
              theme={{
                arrow: {
                  style: {
                    dark: 'border border-border z-0 border-r-0 border-t-0',
                  },
                },
                style: {
                  dark: 'border border-border bg-black-200 text-gray-100 z-20 py-1 px-2 rounded-md',
                },
              }}
            >
              <Link
                href={link}
                className={twMerge(`block border-l-2 border-black-300 px-2 py-2.5 text-gray md:p-3
                ${active && 'border-primary text-white'}
                `)}
                scroll={false}
              >
                {icon({ size: 28 })}
              </Link>
            </Tooltip>
          );
        })}
      </nav>
    </div>
  );
}

export default SideNav;
