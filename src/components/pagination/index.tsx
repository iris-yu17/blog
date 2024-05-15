'use client';

import { Pagination as FlowBitePagination } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Pagination({ totalPages, currentPage }) {
  const router = useRouter();

  const onPageChange = (page: number) => {
    router.push(`/article?page=${page}`)
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
