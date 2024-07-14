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
import { Locales } from '@/types/enum/locales';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';

export const NAV = [
  {
    icon: VscHome,
    dictionaryKey: 'home',
    link: PageUrls.Home,
    activePath: PageUrls.Article,
  },
  {
    icon: VscVerified,
    dictionaryKey: 'about',
    link: PageUrls.About,
    activePath: PageUrls.About,
  },
  // {
  //   icon: VscSearch,
  //   dictionaryKey: 'search',
  //   link: PageUrls.Search,
  //   activePath: PageUrls.Search,
  // },
  {
    icon: VscLayers,
    dictionaryKey: 'category',
    link: PageUrls.Category,
    activePath: PageUrls.Category,
  },
];

const styles = {
  settingBtn:
    'block w-full whitespace-nowrap text-nowrap rounded px-2 py-1 text-xs leading-3 hover:bg-primary',
};

type Props = {
  dict: Record<string, Record<string, string>>;
};

function SideNav(props: Props) {
  const { dict } = props;
  const router = useRouter();
  const path = usePathname();
  const [showSetting, setShowSetting] = useState(false);

  const lang = path.split('/')[1];

  const { theme, setTheme } = useTheme();

  return (
    <div className="sticky left-0 top-12 z-50 flex h-[calc(100dvh-3rem)] flex-col justify-between border-r border-border bg-black-300 md:top-0 md:h-dvh">
      <nav className="flex h-full flex-col pb-7">
        {NAV.map((item) => {
          const { icon, link, dictionaryKey, activePath } = item;
          // const active = path === link || path.includes(activePath);

          const isHome =
            link === PageUrls.Home &&
            (path === `/${Locales.zhHant}` || path === `/${Locales.enUS}`);

          const active = isHome || path.includes(activePath);

          return (
            <Tooltip
              content={dict.breadcrumbs[dictionaryKey]}
              placement="right"
              key={dictionaryKey}
              theme={{
                arrow: {
                  style: {
                    dark: 'border border-border z-0 border-r-0 border-t-0',
                  },
                },
                style: {
                  dark: 'border border-border bg-black-200 text-gray-100 z-20 py-1 px-2 rounded-md text-nowrap',
                },
              }}
            >
              <Link
                href={link}
                className={twMerge(`hover:text-white-default block border-l-2 border-black-300 px-2 py-2.5 text-gray md:p-3
                ${active && 'text-white-default border-primary'}
                `)}
                // scroll={false}
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
        <div className="absolute bottom-10 left-12 ml-1 rounded border border-border bg-black-100 p-1 md:left-14">
          <button
            onClick={() => {
              let newPath;
              let newLocale;
              if (lang === Locales.zhHant) {
                newPath = path.replace(Locales.zhHant, Locales.enUS);
                newLocale = Locales.enUS;
              } else {
                newPath = path.replace(Locales.enUS, Locales.zhHant);
                newLocale = Locales.zhHant;
              }
              router.push(newPath);

              setCookie('locale', newLocale);
              setShowSetting(false);
            }}
            className={styles.settingBtn}
          >
            {dict.settings.lang}
          </button>
          <button
            onClick={() => {
              setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
              setShowSetting(false);
            }}
            className={styles.settingBtn}
          >
            {dict.settings.theme}
          </button>
        </div>
      )}
    </div>
  );
}

export default SideNav;
