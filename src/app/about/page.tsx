import BreadCrumb from '@/components/breadcrumb';
import { BreadcrumbKey } from '@/types/enum/breadcrumb';
import Image from 'next/image';

const className = {
  h1: 'mb-3 text-2xl font-semibold leading-normal text-quaternary md:mb-5 md:text-3xl',
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
        <div className="mb-10 flex flex-col gap-4">
          <div className="block h-40 w-40 overflow-hidden rounded-full">
            <Image alt="avatar" src="/avatar.png" width={200} height={200} />
          </div>
          <div>
            我是 Iris，一個前端工程師，開發上主要使用 React.js 及 Next.js。
            <br />
            <br />
            研究說教導他人是最高效的學習手段，但現實中沒有人好教，因此有了這個部落格的誕生，希望可以透過寫作紀錄的方式，幫助自己學習，若也能幫到需要的人那就太好了！
            <br />
            會在這裡分享技術筆記、記錄我的學習歷程，如有錯誤歡迎指教。
            <br />
            除了前端外，也會分享一些雜談、我有興趣的事。
            <br />
          </div>
          <div className="text-wrap">
            <div>我的 Email:</div>
            <a
              href="mailto:iris.yu0716@gmail.com"
              className="ml-2 text-tertiary"
            >
              iris.yu0716@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
