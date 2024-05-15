'use client';

import { useRouter } from 'next/navigation';
import { MdArrowBackIos } from 'react-icons/md';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-1"
      onClick={() => {
        router.back();
      }}
    >
      <MdArrowBackIos />
      <span>Back to list</span>
    </button>
  );
}
