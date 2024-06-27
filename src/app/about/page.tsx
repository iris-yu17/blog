import type { Metadata } from 'next';
import BreadCrumb from '@/components/breadcrumb';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import Image from 'next/image';

const className = {
  h1: 'mb-3 text-2xl font-semibold leading-normal text-quaternary md:mb-5 md:text-3xl',
};

const aboutMe = {
  email: 'iris.yu0716@gmail.com',
  skills: ['Bootstrap', 'RWD', 'JavaScript', 'React', 'Next.js'],
  familiarWith: ['PixiJS', 'Vue', '無障礙網站開發', 'HTML 電子報開發'],
  intro: '',
};

export const metadata: Metadata = {
  title: '關於我 - IRIS Studio',
};

export default function About() {
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
          <span className="mx-1">關於</span>
          {`/>`}
        </h1>
        <div className="mb-8 flex flex-col items-center gap-5 md:flex-row">
          <div className="block h-40 w-40 min-w-40 overflow-hidden rounded-full">
            <Image alt="avatar" src="/avatar.png" width={200} height={200} />
          </div>
          <div>
            我是 Iris，一個前端工程師，開發上主要使用 React 及 Next.js。
            <br />
            教導他人是最高效的學習手段，但現實中沒有人好教，因此有了這個部落格的誕生，希望可以透過寫作紀錄的方式，幫助自己學習，若也能幫到需要的人那就太好了！
            <br />
            會在這裡分享技術筆記、記錄我的學習歷程，如有錯誤歡迎指教。
            <br />
            除了前端知識外，也會分享一些雜談、我有興趣的事。
            <br />
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
            <span className="mr-2 text-quaternary">familiarWith:</span>
            <span className="text-yellow-400 dark:text-pink-400">{`[`}</span>
            {aboutMe.familiarWith.map((item, index) => {
              return (
                <span
                  key={item}
                  className="ml-4 block text-code-100 md:ml-0 md:inline-block dark:text-orange-300"
                >
                  &#39;{item}&#39;
                  {index < aboutMe.familiarWith.length - 1 && (
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
