'use client';

import { useState } from 'react';

import { VscListSelection, VscClose } from 'react-icons/vsc';
import SideMenu from '../side-menu';

export default function Header() {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div className="fixed left-0 top-0 z-10 flex w-full items-center justify-between border-b border-border bg-black-200 px-2.5 md:hidden">
      <div className="flex-grow py-2.5 font-press text-sm">
        <span className="text-primary">IRIS</span> Code
      </div>
      <button
        className="text-2xl text-gray-100"
        onClick={() => {
          setShowMenu((oldVal) => !oldVal);
        }}
      >
        {showMenu ? <VscClose /> : <VscListSelection />}
      </button>

      {showMenu && <SideMenu />}
    </div>
  );
}
