import type { Metadata } from 'next';
import BreadCrumb from '@/components/breadcrumb';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import { getDictionary } from '@/utils/dictionaries';
import Image from 'next/image';
import { Props } from '@/types/props';

const className = {
  h1: 'mb-3 text-2xl font-semibold leading-normal text-quaternary md:mb-5 md:text-3xl',
};

const aboutMe = {
  email: 'iris.yu0716@gmail.com',
  skills: ['React', 'Next.js', 'Bootstrap', 'RWD', 'JavaScript'],
  others: ['PixiJS', 'Vue', 'WA', 'html-email'],
  intro: '',
};

export const metadata: Metadata = {
  title: '關於我 - IRIS Studio',
};

export default async function About({ params }: Props) {
  const { lang } = params;
  const dict = await getDictionary(lang as string, 'about');
  return (
    <>
      <BreadCrumb
        items={[
          {
            key: BreadcrumbKey.About,
          },
        ]}
      />
      <div>
        <h1 className={className.h1}>
          {`<`}
          <span className="mx-1">{dict.h1}</span>
          {`/>`}
        </h1>
        <div className="mb-8 flex flex-col items-center gap-5 md:flex-row">
          <div className="block h-40 w-40 min-w-40 overflow-hidden rounded-full">
            <Image alt="avatar" src="/avatar.png" width={200} height={200} />
          </div>
          <div>
            {dict.intro.map((item: string, index: number) => {
              return <div key={index}>{item}</div>;
            })}
          </div>
        </div>
        <div className="overflow-wrap-anywhere text-wrap">
          <div>
            <span className="mr-2 text-primary">const</span>
            <span className="mr-2 text-secondary">Iris</span>
            <span className="mr-2">=</span>
            <span className="mr-2 text-code-300  dark:text-yellow-300">{`{`}</span>
          </div>
          <div className="pl-4 md:pl-10">
            <span className="mr-2 text-quaternary">email:</span>
            <a
              href="mailto:iris.yu0716@gmail.com"
              className="text-code-100 dark:text-orange-300"
            >
              &#39;{aboutMe.email}&#39;
            </a>
            <span>,</span>
          </div>
          <div className="pl-4 md:pl-10">
            <span className="mr-2 text-quaternary">skills:</span>
            <span className="text-yellow-400 dark:text-pink-400">{`[`}</span>
            {aboutMe.skills.map((item, index) => {
              return (
                <span
                  key={item}
                  className="ml-4 block text-code-100 md:ml-0 md:inline-block dark:text-orange-300"
                >
                  &#39;{item}&#39;
                  {index < aboutMe.skills.length - 1 && (
                    <span className="mr-2 text-gray-100">,</span>
                  )}
                </span>
              );
            })}
            <span className="text-yellow-400 dark:text-pink-400">{`]`}</span>
            <span>,</span>
          </div>
          <div className="pl-4 md:pl-10">
            <span className="mr-2 text-quaternary">others:</span>
            <span className="text-yellow-400 dark:text-pink-400">{`[`}</span>
            {aboutMe.others.map((item, index) => {
              const translation = dict['skills-others'][item] || item;
              return (
                <span
                  key={item}
                  className="ml-4 block text-code-100 md:ml-0 md:inline-block dark:text-orange-300"
                >
                  &#39;{translation}&#39;
                  {index < aboutMe.others.length - 1 && (
                    <span className="mr-2 text-gray-100">,</span>
                  )}
                </span>
              );
            })}
            <span className="text-yellow-400 dark:text-pink-400">{`]`}</span>
            <span>,</span>
          </div>
          <div>
            <span className="mr-2 text-code-300  dark:text-yellow-300">{`}`}</span>
          </div>
        </div>
      </div>
    </>
  );
}
