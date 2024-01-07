'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Button } from 'flowbite-react';
import { Sidebar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { HiUser, HiHome, HiMail, HiViewBoards, HiSearch } from 'react-icons/hi';
import { MdArticle } from 'react-icons/md';
import { PiInstagramLogoBold } from 'react-icons/pi';
import PageUrls from '@/core/enum/page-url';
import classNames from 'classnames';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';

const nav = [
  {
    icon: HiHome,
    text: 'Home',
    link: PageUrls.Home,
  },
  {
    icon: HiUser,
    text: 'About',
    link: PageUrls.About,
  },
  {
    icon: MdArticle,
    text: 'Article',
    link: PageUrls.Article,
  },
  {
    icon: HiSearch,
    text: 'Search',
    link: PageUrls.Search,
  },
  {
    icon: HiViewBoards,
    text: 'Stream',
    link: PageUrls.Stream,
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

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="sticky left-0 top-0 hidden h-screen sm:block">
      <Sidebar
        theme={customTheme.sidebar}
        aria-label="Default sidebar example"
        className="w-auto lg:w-64 [&>div]:flex [&>div]:flex-col [&>div]:bg-black"
      >
        <div className="mb-4 flex justify-center">
          <div className="h-12 w-12 lg:h-32 lg:w-32">
            <Image
              src="/sana.jpeg"
              width={150}
              height={150}
              alt="user"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="text-primary text-center">IRIS YU</div>
          <div className="text-secondary text-center text-sm">
            Front-end engineer
          </div>
        </div>
        <div
          className={
            'border-border order-1 mt-auto flex flex-col items-center justify-center gap-2 border-t py-4 lg:order-none lg:mt-0 lg:flex-row lg:border-none'
          }
        >
          <Link
            href={'#'}
            className="hover:bg-black-100 dark:hover:bg-black-200 rounded-lg p-2 text-2xl text-gray-500"
          >
            <PiInstagramLogoBold />
          </Link>
          <Link
            href={'#'}
            className="hover:bg-black-100 dark:hover:bg-black-200 rounded-lg p-2 text-2xl text-gray-500"
          >
            <HiMail />
          </Link>
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {nav.map((item, index) => {
              const { text, icon, link } = item;
              return (
                <Sidebar.Item
                  icon={icon}
                  active={path === link}
                  key={index}
                  onClick={() => {
                    router.push(link);
                  }}
                  className="[&>span]:hidden lg:[&>span]:block"
                >
                  {text}
                </Sidebar.Item>
              );
            })}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
        <Button
          className="hover:bg-black-100 order-2 mx-auto w-max transition  duration-75 hover:text-gray-900 lg:mt-auto dark:text-gray-400 dark:hover:text-white [&>span]:p-2"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <MdOutlineLightMode className="h-6 w-6 text-gray-500" />
          ) : (
            <MdOutlineDarkMode className="h-6 w-6 text-gray-500" />
          )}
        </Button>
      </Sidebar>
    </div>
  );
}

export default SideNav;
