'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  VscHome,
  VscSearch,
  VscVerified,
  VscAccount,
  VscGear,
  VscLayers,
} from 'react-icons/vsc';
import PageUrls from '@/types/enum/page-url';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Tooltip } from 'flowbite-react';
import { Theme } from '@/types/enum/theme';
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

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

function SideNav() {
  const path = usePathname();
  const [showSetting, setShowSetting] = useState(false);

  const { theme, setTheme } = useTheme();

  return (
    <div className="sticky left-0 top-10 z-50 flex h-[calc(100vh-2.5rem)] flex-col justify-between border-r border-border bg-black-300 md:top-0 md:h-screen">
      <nav className="flex h-full flex-col pb-7">
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
                className={twMerge(`hover:text-white-default block border-l-2 border-black-300 px-2 py-2.5 text-gray md:p-3
                ${active && 'text-white-default border-primary'}
                `)}
                scroll={false}
              >
                {icon({ size: 28 })}
              </Link>
            </Tooltip>
          );
        })}
        <button
          className="hover:text-white-default mt-auto block border-l-2 border-black-300 px-2 py-2.5 text-gray md:p-3"
          onClick={() => {
            setShowSetting(!showSetting);
          }}
        >
          <VscGear size={28} />
        </button>
      </nav>

      {/* setting items */}
      {showSetting && (
        <div className="absolute bottom-10 left-14 ml-1 rounded border border-border bg-black-100 p-1">
          <button
            onClick={() => {
              setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
              setShowSetting(false);
            }}
            className="block text-nowrap rounded px-2 py-1 text-xs leading-3 hover:bg-primary"
          >
            切換亮/暗色模式
          </button>
        </div>
      )}
    </div>
  );
}

export default SideNav;
