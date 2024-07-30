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
  VscGithubInverted,
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
import { useTranslation } from 'react-i18next';
import { fallbackLng } from '@/i18n/settings';

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
  lang: Locales;
};

function SideNav(props: Props) {
  const { lang } = props;
  const router = useRouter();
  const path = usePathname();
  const [showSetting, setShowSetting] = useState(false);

  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('common');

  return (
    <div className="sticky left-0 top-12 z-50 flex h-[calc(100dvh-3rem)] flex-col justify-between border-r border-border bg-black-300 md:top-0 md:h-dvh">
      <nav className="flex h-full flex-col pb-7">
        {NAV.map((item) => {
          const { icon, link, dictionaryKey, activePath } = item;
          // const active = path === link || path.includes(activePath);

          const isHome =
            link === PageUrls.Home &&
            (path === '/' || path === `/${Locales.enUS}`);

          const active = isHome || path.includes(activePath);

          return (
            <Tooltip
              content={t(`breadcrumbs.${dictionaryKey}`)}
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
                content: 'relative z-20 text-nowrap'
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
        <Link
          className="hover:text-white-default mt-auto block border-l-2 border-black-300 px-2 py-2.5 text-gray md:p-3"
          href={'https://github.com/iris-yu17'}
          target="_blank"
        >
          <VscGithubInverted size={28} />
        </Link>
        <button
          className="hover:text-white-default block border-l-2 border-black-300 px-2 py-2.5 text-gray md:p-3"
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
              const newLocale =
                lang === Locales.zhHant ? Locales.enUS : Locales.zhHant;

              // set cookie for next-i18n-router
              const days = 30;
              const date = new Date();
              date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
              const expires = date.toUTCString();
              document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

              if (lang === fallbackLng) {
                router.push('/' + newLocale + path);
              } else {
                router.push(path.replace(`/${lang}`, `/${newLocale}`));
              }

              router.refresh();
            }}
            className={styles.settingBtn}
          >
            {t('settings.lang')}
          </button>
          <button
            onClick={() => {
              setTheme(theme === Theme.dark ? Theme.light : Theme.dark);
              setShowSetting(false);
            }}
            className={styles.settingBtn}
          >
            {t('settings.theme')}
          </button>
        </div>
      )}
    </div>
  );
}

export default SideNav;
