'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { Button } from 'flowbite-react';
import {
  MdClose,
  MdMenu,
  MdOutlineLightMode,
  MdOutlineDarkMode,
} from 'react-icons/md';
import { Theme } from '@/types/enum/theme';
import { NAV } from '../side-nav';

const CLASSNAME = {
  button:
    'transition duration-75  hover:bg-black-200 lg:mt-auto [&>span]:p-2 [&>span]:text-2xl',
};

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [menuExpand, setMenuExpand] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-10 w-full bg-black-200">
      <div className="text-parimary flex items-center rounded-lg border-2 border-solid border-black bg-black-100 px-4 py-1 sm:hidden">
        <div>Iris&apos; Blog</div>
        <Button
          className={`ml-auto ${CLASSNAME.button}`}
          onClick={() =>
            setTheme(theme === Theme.dark ? Theme.light : Theme.dark)
          }
        >
          {theme === Theme.dark ? (
            <MdOutlineLightMode className="h-6 w-6 text-gray-500" />
          ) : (
            <MdOutlineDarkMode className="h-6 w-6 text-gray-500" />
          )}
        </Button>
        <Button
          color="primary"
          className={CLASSNAME.button}
          onClick={() => {
            setMenuExpand(!menuExpand);
          }}
        >
          {menuExpand ? <MdClose /> : <MdMenu />}
        </Button>
      </div>
      {menuExpand && (
        <div className="z-10 w-full bg-black-200 px-2 py-1">
          {NAV.map((item, index) => {
            const { text, icon, link } = item;
            return (
              <Link
                href={link}
                key={index}
                className="block bg-black-100 p-2 rounded-md m-1"
                onClick={() => {
                  setMenuExpand(false);
                }}
              >
                {text}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
