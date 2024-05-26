import { categoryList } from '@/data/category';
import { Badge } from 'flowbite-react';
import PageUrls from '@/types/enum/page-url';
import { CategoryText } from '@/types/enum/category';

export default function CategoryBlock() {
  return (
    <div className="mb-5 pb-5 flex flex-wrap gap-2">
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
