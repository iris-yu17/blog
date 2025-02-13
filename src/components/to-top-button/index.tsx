'use client';

import React from 'react';
import { PiArrowLineUpBold } from 'react-icons/pi';

export default function ToTopButton() {
  return (
    <button
      className="fixed bottom-10 right-5 rounded-lg bg-black-100 p-2 text-2xl text-secondary shadow-md shadow-[#dddddd] dark:shadow-[#131313]"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <PiArrowLineUpBold />
    </button>
  );
}
