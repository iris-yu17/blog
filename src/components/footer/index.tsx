import { VscRemote, VscSourceControl } from 'react-icons/vsc';
import { TbBrandNextjs } from 'react-icons/tb';

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-7 w-full items-center gap-1 border-t border-border bg-black-300 text-sm">
      <div className="flex h-full items-center justify-center bg-primary px-2">
        <VscRemote />
      </div>
      <div className="flex items-center gap-1 px-2">
        <VscSourceControl />
        <span>main*</span>
      </div>
      <div className="flex-1 text-center font-light">
        © 2024 All Rights Reserved. IRIS Studio
      </div>
      <div className="hidden items-center gap-1 px-2 font-light md:flex">
        <TbBrandNextjs />
        <span>Powered by Next.js</span>
      </div>
    </div>
  );
}

