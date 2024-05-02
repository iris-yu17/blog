import ArticleCard from '@/components/article-card';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Prose from '@/components/Prose';
import { MdArrowBackIos } from 'react-icons/md';

export default function Article() {
  return (
    <>
      <button className="flex items-center gap-1">
        <MdArrowBackIos />
        <span>Back to list</span>
      </button>
      <div className="my-6 border-b border-solid border-border">
        <h1 className="text-4xl font-semibold leading-normal">
          [教學] 用 Github Actions 在 Google Cloud Run 上部署 Next.js
        </h1>
        <div className="py-4 text-xs text-tertiary">2023/12/30</div>
      </div>
      <div className="flex flex-col gap-16">
        <Prose>
          <MDXRemote
            source={`

## 前言
### Cloud Run 是什麼？
是Google Cloud 的 Serverless 服務之一。

讓使用者僅需透過簡單的指令或 Console 介面即可直接在 Google Cloud 上開發及快速部署具備高擴充性的容器化應用程式及管理服務。

必須將程式包裝成 Container image ，才能夠部署至 Cloud Run。
`}
          />
        </Prose>
      </div>
    </>
  );
}
