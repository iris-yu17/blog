import { CategoryKey } from '@/types/enum/category';
import { Article } from '@/types/article';

const articles: Article[] = [
  {
    id: 'gcp-get-bucket-obj',
    name: '[GCP] 使用用戶端程式庫來取得 Bucket 內的物件',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deserunt asperiores, unde corporis perspiciatis cum placeat accusamus commodi nulla maxime iste.Itaque fuga assumenda qui.Maiores abaccusantium porro',
    tags: [CategoryKey.Gcp],
    updated: '2024-05-06',
  },
  {
    id: 'pixi-notes',
    name: '[PIXI.js] v7 基礎筆記',
    description: '測試測試測試',
    tags: [CategoryKey.Pixi],
    updated: '2024-05-06',
  },
  {
    id: 'accessibile-web-development',
    name: '[無障礙] 網頁開發筆記',
    description: '網頁開發筆記',
    tags: [CategoryKey.WA],
    updated: '2024-05-10',
  },
  {
    id: 'js-callback',
    name: '[JS] Async非同步 - Callback筆記',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-promise',
    name: '[JS] Async非同步 - Promise筆記',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-async-await',
    name: '[JS] Async非同步 - async_await筆記',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-async-sum',
    name: '[JS] Async非同步 - callback, promise, async-await練習',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-event-loop',
    name: '[JS] Event Loop 筆記',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
];

export default articles;