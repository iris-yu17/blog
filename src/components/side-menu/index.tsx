'use client';

import { useEffect, useRef, useState } from 'react';
import Accordion from '../accordion';
import articles from '@/data/article';
import { categoryList } from '@/data/category';
import { CategoryText } from '@/types/enum/category';
import PageUrls from '@/types/enum/page-url';
import Link from 'next/link';

export default function SideMenu() {
  const dragging = useRef(false);
  const [menuWidth, setMenuWidth] = useState<number>(250);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (!dragging.current) {
        return;
      }
      setMenuWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;
        return newWidth < 250 ? previousWidth : newWidth;
      });
    });

    window.addEventListener('mouseup', () => {
      dragging.current = false;
    });
  }, []);

  return (
    <div
      className="fixed right-0 top-[calc(2.5rem+1px)] z-10 h-screen overflow-hidden border-l border-border bg-black-200 pb-7 pl-1 text-gray-100 md:sticky md:left-0 md:right-auto  md:top-0 md:border-0"
      style={{ width: menuWidth, minWidth: menuWidth }}
    >
      <div className="flex h-full w-full overflow-auto">
        <div className="w-[calc(100%-4px)] pb-10 md:pb-0">
          <div className="text-md sticky left-0 top-0 hidden bg-black-200 p-4 font-press md:block">
            <span className="text-primary">IRIS</span> Code
          </div>
          <Accordion title={'所有文章'} defaultExpand={true}>
            {categoryList.map((category) => {
              const { tag } = category;
              return (
                <Accordion key={tag} title={CategoryText[tag]}>
                  {articles.map((item) => {
                    const { tags, name, id } = item;
                    const _tag = tags[0];
                    if (tag === _tag)
                      return (
                        <Link
                          href={`${PageUrls.Article}/${id}`}
                          key={id}
                          className="block overflow-hidden text-ellipsis whitespace-nowrap py-0.5 hover:bg-black-100"
                        >
                          {name}
                        </Link>
                      );
                  })}
                </Accordion>
              );
            })}
          </Accordion>
        </div>
        <div
          className="relative z-10 h-full cursor-ew-resize border-l border-transparent hover:border-l-4 hover:border-secondary"
          onMouseDown={() => {
            dragging.current = true;
          }}
        ></div>
      </div>
    </div>
  );
}
