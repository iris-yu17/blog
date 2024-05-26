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
    <div className="flex overflow-x-auto sm:justify-center">
      <FlowBitePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
