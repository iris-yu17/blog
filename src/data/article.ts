import { CategoryKey } from '@/types/enum/category';
import { Article } from '@/types/article';

const articles: Article[] = [
  {
    id: 'gcp-get-bucket-obj',
    name: '使用用戶端程式庫來取得 GCS Bucket 內的物件',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam deserunt asperiores, unde corporis perspiciatis cum placeat accusamus commodi nulla maxime iste.Itaque fuga assumenda qui.Maiores abaccusantium porro',
    tags: [CategoryKey.Gcp],
    updated: '2024-05-06',
  },
  {
    id: 'pixi-notes',
    name: 'PIXI.js v7 基礎筆記',
    description: '測試測試測試',
    tags: [CategoryKey.Pixi],
    updated: '2024-05-06',
  },
  {
    id: 'accessibile-web-development',
    name: '無障礙網頁開發筆記',
    description: '網頁開發筆記',
    tags: [CategoryKey.WA],
    updated: '2024-05-10',
  },
  {
    id: 'js-callback',
    name: 'Async非同步 - Callback筆記',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-promise',
    name: 'Async非同步 - Promise筆記',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-async-await',
    name: 'Async非同步 - async-await筆記',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-async-sum',
    name: 'Async非同步 - callback, promise, async-await練習',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-event-loop',
    name: 'Js Event Loop 筆記',
    description: '...',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'redux-1',
    name: 'Redux#1 介紹',
    description: '貫光且封開人口牛寺世京昌五？不雨現瓜回禾中，風起面反門說魚過消背得圓開。飯昔寸親早。至司抱言棵怪姊要貫頁聲蛋：象住耍道穴方菜室唱。',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-2',
    name: 'Redux#2 Store, Action, Reudcer 基本寫法',
    description: '貫光且封開人口牛寺世京昌五？不雨現瓜回禾中，風起面反門說魚過消背得圓開。飯昔寸親早。至司抱言棵怪姊要貫頁聲蛋：象住耍道穴方菜室唱。',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-3',
    name: 'Redux#3 多個 Reducer',
    description: '貫光且封開人口牛寺世京昌五？不雨現瓜回禾中，風起面反門說魚過消背得圓開。飯昔寸親早。至司抱言棵怪姊要貫頁聲蛋：象住耍道穴方菜室唱。',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-4',
    name: 'Redux#4 Middleware',
    description: '貫光且封開人口牛寺世京昌五？不雨現瓜回禾中，風起面反門說魚過消背得圓開。飯昔寸親早。至司抱言棵怪姊要貫頁聲蛋：象住耍道穴方菜室唱。',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-5',
    name: 'Redux#5 用 Redux-thunk Middleware 處理非同步動作',
    description: '貫光且封開人口牛寺世京昌五？不雨現瓜回禾中，風起面反門說魚過消背得圓開。飯昔寸親早。至司抱言棵怪姊要貫頁聲蛋：象住耍道穴方菜室唱。',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-6',
    name: 'Redux#6 Redux-toolkit 使用步驟',
    description: '貫光且封開人口牛寺世京昌五？不雨現瓜回禾中，風起面反門說魚過消背得圓開。飯昔寸親早。至司抱言棵怪姊要貫頁聲蛋：象住耍道穴方菜室唱。',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-7',
    name: 'Redux#7 Redux-toolkit 複習',
    description: '貫光且封開人口牛寺世京昌五？不雨現瓜回禾中，風起面反門說魚過消背得圓開。飯昔寸親早。至司抱言棵怪姊要貫頁聲蛋：象住耍道穴方菜室唱。',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'gcp-deploy-with-github-actions',
    name: '用 Github Actions 在 Google Cloud Run 上部署 Next.js',
    description: '用 Github Actions 在 Google Cloud Run 上部署 Next.js',
    tags: [CategoryKey.Gcp],
    updated: '2024-05-10'
  },
  {
    id: 'next-notes',
    name: 'Next.js 開發筆記',
    description: '開發筆記',
    tags: [CategoryKey.Next],
    updated: '2024-05-10'
  },
  {
    id: 'freego-notes',
    name: '無障礙 Freego 檢測錯誤排查筆記',
    description: 'Freego 檢測錯誤排查筆記',
    tags: [CategoryKey.WA],
    updated: '2024-05-10'
  },
  {
    id: 'react-usecallback',
    name: 'React useCallback 筆記',
    description: '',
    tags: [CategoryKey.React],
    updated: '2024-05-10'
  },
  {
    id: 'react-usecontext',
    name: 'React useContext 筆記',
    description: '',
    tags: [CategoryKey.React],
    updated: '2024-05-10'
  },
  {
    id: 'react-usememo',
    name: 'React useMemo 筆記',
    description: '',
    tags: [CategoryKey.React],
    updated: '2024-05-10'
  },
  {
    id: 'react-usereducer',
    name: 'React useReducer 筆記',
    description: '',
    tags: [CategoryKey.React],
    updated: '2024-05-10'
  },
  {
    id: 'react-memo',
    name: 'React.memo 筆記',
    description: '',
    tags: [CategoryKey.React],
    updated: '2024-05-10'
  },
  {
    id: 'mdxremote-add-anchor-to-title',
    name: 'MDXRemote 為標題加上錨點',
    description: '',
    tags: [CategoryKey.Next],
    updated: '2024-05-10'
  }
];

export default articles;