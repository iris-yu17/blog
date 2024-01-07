import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Intro */}
        <div className='text-green bg-green-background before:content[""] before:bg-green inline-flex w-max items-center justify-center rounded-full px-3 py-1 text-sm before:me-2 before:block before:h-1.5 before:w-1.5 before:rounded-full'>
          Available for work
        </div>
        <h1 className="text-4xl font-semibold leading-normal">
          <span>Hello! I’m Iris 👏</span>
          <br />
          <span
            className="text-secondary
          "
          >
            Real Things. Experienced Engineer.
          </span>
        </h1>
        <div className="text-accent flex items-center gap-2 text-lg">
          <IoLocationOutline />
          <span className="text-base">New Taipei, Taiwan</span>
        </div>
        <div className="text-secondary text-lg leading-8">
          Product designer and design system specialist with over 9 years of
          experience focusing on user experience and design systems to creating
          a user-centered design in SaaS products.
        </div>
      </div>
    </>
  );
}
