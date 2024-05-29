import { categoryList } from '@/data/category';
import { Badge } from 'flowbite-react';
import PageUrls from '@/types/enum/page-url';
import { CategoryText } from '@/types/enum/category';

export default function CategoryBlock() {
  return (
    <div className="flex flex-wrap gap-2 pb-5 md:mb-5">
      {categoryList.map((item) => {
        const { tag, path } = item;
        return (
          <Badge
            color="green"
            size="sm"
            href={`${PageUrls.Category}/${path}`}
            key={tag}
            className="font-rbtm"
          >
            #{CategoryText[tag]}
          </Badge>
        );
      })}
    </div>
  );
}
