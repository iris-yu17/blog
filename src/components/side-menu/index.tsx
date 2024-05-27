import Accordion from '../accordion';
import articles from '@/data/article';
import { categoryList } from '@/data/category';
import { CategoryText } from '@/types/enum/category';
import PageUrls from '@/types/enum/page-url';
import Link from 'next/link';

export default function SideMenu() {
  return (
    <div className="sticky left-0 top-0 h-screen w-60 min-w-60 overflow-auto px-1 text-gray-100 border-border border-r pb-7">
      <div className="text-md font-press p-4">
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
                      className="block text-nowrap py-0.5 hover:bg-black-100 min-w-full w-max"
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
  );
}
