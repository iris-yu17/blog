'use client';

import { IoLogoJavascript } from 'react-icons/io';
import { VscChromeClose } from 'react-icons/vsc';
import { usePathname, useRouter } from 'next/navigation';

export default function PageTab() {
  const path = usePathname();
  const router = useRouter();

  const pathSegments = path.split('/');
  const filename = pathSegments.pop() || 'home';

  return (
    <div className="sticky left-0 top-0 hidden w-full border-b border-border bg-black-300 text-sm md:block">
      <div className="flex w-max items-center gap-2 border-r border-t border-border border-t-secondary bg-black-200 px-3 py-2">
        <IoLogoJavascript className=" text-yellow-300" />
        <span className="font-light">{filename}.js</span>
        <button
          className="rounded p-1 hover:bg-black-100"
          onClick={() => {
            router.back();
          }}
        >
          <VscChromeClose className="" />
        </button>
      </div>
    </div>
  );
}
