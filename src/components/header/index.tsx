'use client';

import { useState } from 'react';
import Image from 'next/image';

import { VscListSelection, VscClose } from 'react-icons/vsc';
import SideMenu from '../side-menu';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-border bg-black-200 px-2.5 md:hidden">
      <div className="h-10 w-20 flex items-center">
        <Image src="/site-logo.svg" alt="1" width={71} height={40} />
      </div>
      <button
        className="text-3xl text-gray-100"
        onClick={() => {
          setShowMenu((oldVal) => !oldVal);
        }}
      >
        {showMenu ? <VscClose /> : <VscListSelection />}
      </button>

      {showMenu && (
        <div className="fixed left-0 top-12 h-full w-screen bg-gray-500/50 dark:bg-gray-700/50">
          <div
            className="h-full w-full"
            onClick={() => {
              setShowMenu((oldVal) => !oldVal);
            }}
          ></div>
        </div>
      )}

      <SideMenu setShowMenu={setShowMenu} showMenu={showMenu} />
    </div>
  );
}
