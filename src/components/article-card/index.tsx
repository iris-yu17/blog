'use client';

import Image from 'next/image';
import { Button } from 'flowbite-react';

export default function ArticleCard() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        <div className="text-tertiary text-sm">Date</div>
        <div className="text-primary text-xl font-semibold">Title</div>
        <div className="text-secondary w-100 mb-3 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nemo
          deserunt asperiores, unde corporis perspiciatis cum placeat accusamus
          commodi nulla maxime iste. Itaque fuga assumenda qui. Maiores ab
          accusantium porro.
        </div>
        <Button color="gray" className="mt-auto w-max">
          Purple to Blue
        </Button>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-xl md:w-60 md:h-40">
        <Image src="/sana.jpeg" alt="article" objectFit="cover" fill />
      </div>
    </div>
  );
}
