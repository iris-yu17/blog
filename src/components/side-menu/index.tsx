'use client';

import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react';
import Accordion from '../accordion';
import articles from '@/data/article';
import { categoryList } from '@/data/category';
import { CategoryText } from '@/types/enum/category';
import PageUrls from '@/types/enum/page-url';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const DEFAULT_WIDTH = 256;

type Props = {
  showMenu?: boolean;
  setShowMenu?: Dispatch<SetStateAction<boolean>>;
};

export default function SideMenu(props: Props) {
  const { showMenu = true, setShowMenu } = props;
  const dragging = useRef(false);
  const [menuWidth, setMenuWidth] = useState<number>(DEFAULT_WIDTH);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (!dragging.current) {
        return;
      }
      setMenuWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;
        return newWidth < DEFAULT_WIDTH ? previousWidth : newWidth;
      });
    });

    window.addEventListener('mouseup', () => {
      dragging.current = false;
    });
  }, []);

  return (
    <div
      className={twMerge(
        `fixed right-0 top-[calc(3rem+1px)] z-10 h-[calc(100dvh-4.25rem-1px)] overflow-hidden border-l border-border bg-black-200 text-gray-100 transition-all md:sticky md:left-0 md:right-auto md:top-0 md:h-screen md:border-0 md:pb-7 ${
          !showMenu && '-right-64'
        }`,
      )}
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
              const count = articles.filter(
                (item) => item.tags[0] === tag,
              ).length;
              return (
                <Accordion key={tag} title={`${CategoryText[tag]} (${count})`}>
                  {articles.map((item) => {
                    const { tags, name, id } = item;
                    const _tag = tags[0];
                    if (tag === _tag)
                      return (
                        <Link
                          href={`${PageUrls.Article}/${id}`}
                          key={id}
                          className="block overflow-hidden text-ellipsis whitespace-nowrap py-0.5 hover:bg-black-100"
                          onClick={() => {
                            setShowMenu && setShowMenu(false);
                          }}
                          // scroll={false}
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
