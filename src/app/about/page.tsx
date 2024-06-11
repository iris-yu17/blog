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
          <span className="mx-1">AboutMe</span>
          {`/>`}
        </h1>
        <div className="flex mb-10 gap-4">
          <div className="block h-40 w-40 overflow-hidden rounded-full">
            <Image alt="avatar" src="/avatar.png" width={200} height={200} />
          </div>
          <div>我是 Iris，一個前端工程師，大學非本科系</div>
        </div>
        <h1 className={className.h1}>
          {`<`}
          <span className="mx-1">AboutThisBlog</span>
          {`/>`}
        </h1>
      </div>
    </>
  );
}
