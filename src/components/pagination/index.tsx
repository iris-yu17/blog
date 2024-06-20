'use client';

import { Pagination as FlowBitePagination } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageUrls from '@/types/enum/page-url';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  mainPath: PageUrls;
};

export default function Pagination({
  totalPages,
  currentPage,
  mainPath = PageUrls.Home,
}: PaginationProps) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`${mainPath}?page=${page}`);
  };

  return (
    <div className="mt-10 flex justify-center overflow-x-auto">
      <FlowBitePagination
        theme={{
          pages: {
            base: 'xs:mt-0 mt-2 inline-flex items-center -space-x-px text-sm md:text-md',
            showIcon: 'inline-flex',
            previous: {
              base: 'ml-0 rounded p-1.5 md:px-3 md:py-2 leading-tight text-gray-100 enabled:hover:bg-gray-100 enabled:hover:text-gray-700',
              icon: 'h-5 w-5',
            },
            next: {
              base: 'rounded p-1.5 md:px-3 md:py-2 leading-tight text-gray-100 enabled:hover:bg-gray-100 enabled:hover:text-gray-700',
            },
            selector: {
              base: 'w-5 h-5 md:h-8 md:w-8 rounded-full mx-2 leading-tight text-gray-100 hover:text-gray-100 enabled:hover:bg-primary',
              active:
                'dark:bg-secondary bg-secondary text-gray-100 hover:secondary hover:text-gray-100',
              disabled: 'cursor-not-allowed opacity-50',
            },
          },
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        previousLabel="上一頁"
        nextLabel="下一頁"
      />
    </div>
  );
}
