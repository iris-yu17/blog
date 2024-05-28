'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';

type Props = {
  title: string;
  children: ReactNode;
  defaultExpand?: boolean;
};

export default function Accordion(props: Props) {
  const { title, children, defaultExpand = false } = props;
  const [expand, setExpand] = useState(defaultExpand);
  return (
    <div className="text-md">
      {/* title */}
      <button
        type="button"
        className="flex w-full items-center justify-start py-0.5 hover:bg-black-100 position-sticky"
        onClick={() => {
          setExpand(!expand);
        }}
      >
        {expand ? <VscChevronDown /> : <VscChevronRight />}
        <span className="ms-1">{title}</span>
      </button>

      {/* content */}
      {expand && <div className="w-100 overflow-auto pl-4 pr-1">{children}</div>}
    </div>
  );
}
