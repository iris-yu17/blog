'use client';

import { Pagination as FlowBitePagination } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageUrls from '@/types/enum/page-url';

export default function Pagination({
  totalPages,
  currentPage,
  mainPath = PageUrls.Home,
}) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`${mainPath}?page=${page}`);
  };

  return (
    <div className="mt-10 flex overflow-x-auto sm:justify-center">
      <FlowBitePagination
        theme={{
          pages: {
            base: 'xs:mt-0 mt-2 inline-flex items-center -space-x-px',
            showIcon: 'inline-flex',
            previous: {
              base: 'ml-0 rounded-l-lg border border-gray-100 px-3 py-2 leading-tight text-gray-100 enabled:hover:bg-gray-100 enabled:hover:text-gray-700',
              icon: 'h-5 w-5',
            },
            next: {
              base: 'rounded-r-lg border border-gray-100 px-3 py-2 leading-tight text-gray-100 enabled:hover:bg-gray-100 enabled:hover:text-gray-700',
            },
            selector: {
              base: 'w-12 border border-gray-100 py-2 leading-tight text-gray-100 hover:text-gray-100 enabled:hover:bg-primary',
              active:
                'bg-secondary text-gray-100 hover:secondary hover:text-gray-100',
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
