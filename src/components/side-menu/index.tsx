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
  const [menuWidth, setMenuWidth] = useState(300);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (!dragging.current) {
        return;
      }
      setMenuWidth((previousWidth) => previousWidth + e.movementX / 2);
    });

    window.addEventListener('mouseup', () => {
      dragging.current = false;
    });
  }, []);

  return (
    <div
      className="sticky left-0 top-0 h-screen pb-7 pl-1 text-gray-100"
      style={{ width: menuWidth, minWidth: menuWidth }}
    >
      <div className="flex h-full w-full">
        <div className="w-full">
          <div className="text-md p-4 font-press">
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
          className="h-full cursor-ew-resize border-l border-transparent hover:border-l-2 hover:border-secondary"
          onMouseDown={() => {
            dragging.current = true;
          }}
        ></div>
      </div>
    </div>
  );
}
