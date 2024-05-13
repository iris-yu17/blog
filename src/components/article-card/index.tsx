import Image from 'next/image';
import { Button } from 'flowbite-react';

export default function ArticleCard({ data }) {
  const { name, updated, description, id, tags } = data;
  return (
    <Link>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <div className="text-sm text-tertiary">Last Updated: {updated}</div>
          <div className="text-xl font-semibold text-primary">{name}</div>
          <div className="w-100 mb-3 line-clamp-2 text-secondary">
            {description}
          </div>
          <Button color="gray" className="mt-auto w-max">
            Purple to Blue
          </Button>
        </div>
      </div>
    </Link>
  );
}
