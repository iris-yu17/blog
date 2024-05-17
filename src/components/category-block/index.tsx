import { categoryList } from '@/data/category';
import { Badge } from 'flowbite-react';
import PageUrls from '@/types/enum/page-url';
import { CategoryText } from '@/types/enum/category';

export default function CategoryBlock() {
  return (
    <div className="mb-12 flex flex-wrap gap-2">
      {categoryList.map((item) => {
        const { tag, path } = item;
        return (
          <Badge
            color="success"
            size="md"
            href={`${PageUrls.Category}/${path}`}
            key={tag}
          >
            #{CategoryText[tag]}
          </Badge>
        );
      })}
    </div>
  );
}
