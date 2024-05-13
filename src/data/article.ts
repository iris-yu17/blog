import { Category } from '@/types/enum/category';

const articles = [
  {
    id: 'gcp-get-bucket-obj',
    name: '[GCP] 使用用戶端程式庫來取得 Bucket 內的物件',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deserunt asperiores, unde corporis perspiciatis cum placeat accusamus commodi nulla maxime iste.Itaque fuga assumenda qui.Maiores abaccusantium porro',
    tags: [Category.Gcp],
    updated: '2024-05-06',
  },
  {
    id: 'pixi-notes',
    name: '[PIXI.js] v7 基礎筆記',
    description: '測試測試測試',
    tags: [Category.Pixi],
    updated: '2024-05-06',
  },
  {
    id: 'accessibile-web-development',
    name: '[無障礙] 網頁開發筆記',
    description: '網頁開發筆記',
    tags: [Category.Pixi],
    updated: '2024-05-10',
  }
];

export default articles;