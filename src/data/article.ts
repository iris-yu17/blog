import { CategoryKey } from '@/types/enum/category';
import { Article } from '@/types/article';

const articles: Article[] = [
  {
    id: 'js-prototype',
    name: '一次搞懂 JavaScript 原型、原型鏈與原型繼承',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-06-25',
  },
  {
    id: 'js-this-methods',
    name: 'Js - Call, Apply, Bind',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-06-21',
  },
  {
    id: 'js-what-is-this',
    name: 'Js This 是什麼',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-06-18',
  },
  {
    id: 'js-closure',
    name: 'Js Closure 閉包',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-06-17',
  },
  {
    id: 'js-hoisting',
    name: 'Js Hoisting 提升',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-06-13',
  },
  {
    id: 'js-var-let-const-diff',
    name: 'var, let, const 差別',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-06-12',
  },
  {
    id: 'redux-11',
    name: 'Redux#11 React-redux 教學',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-06-11',
  },
  {
    id: 'redux-10',
    name: 'Redux#10 Redux-toolkit 處理非同步',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-06-07',
  },
  {
    id: 'redux-9',
    name: 'Redux#9 Redux-toolkit 和 Extra reducers',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-06-06',
  },
  {
    id: 'redux-8',
    name: 'Redux#8 Redux-toolkit 和 Middleware',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-06-05',
  },
  {
    id: 'css-scroll-driven-animation',
    name: 'animation-timeline - 用純 CSS 實現滾動動畫',
    description: '',
    tags: [CategoryKey.Css],
    updated: '2024-06-04',
  },
  {
    id: 'nextjs-sc-get-current-url',
    name: '在 Next.js Server Components 中取得當前 URL',
    description: '',
    tags: [CategoryKey.Next],
    updated: '2024-05-30',
  },
  {
    id: 'access-localhost-from-mobile',
    name: '用手機連 mac 開發環境的 localhost',
    description: '',
    tags: [CategoryKey.Dev],
    updated: '2024-05-31',
  },
  {
    id: 'accessibile-web-development',
    name: '無障礙網頁開發筆記',
    description: '',
    tags: [CategoryKey.WA],
    updated: '2024-05-10',
  },
  {
    id: 'js-callback',
    name: 'Async非同步 - Callback筆記',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-promise',
    name: 'Async非同步 - Promise筆記',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-async-await',
    name: 'Async非同步 - async-await筆記',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-async-sum',
    name: 'Async非同步 - callback, promise, async-await練習',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'js-event-loop',
    name: 'Js Event Loop 筆記',
    description: '',
    tags: [CategoryKey.Js],
    updated: '2024-05-10',
  },
  {
    id: 'redux-1',
    name: 'Redux#1 介紹',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-2',
    name: 'Redux#2 Store, Action, Reudcer 基本寫法',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-3',
    name: 'Redux#3 多個 Reducer',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-4',
    name: 'Redux#4 Middleware',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-5',
    name: 'Redux#5 用 Redux-thunk Middleware 處理非同步動作',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-6',
    name: 'Redux#6 Redux-toolkit 使用步驟',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'redux-7',
    name: 'Redux#7 Redux-toolkit 使用步驟複習',
    description: '',
    tags: [CategoryKey.Redux],
    updated: '2024-05-10',
  },
  {
    id: 'gcp-deploy-with-github-actions',
    name: '用 Github Actions 在 Google Cloud Run 上部署 Next.js',
    description: '',
    tags: [CategoryKey.Gcp],
    updated: '2024-05-10'
  },
  {
    id: 'next-notes',
    name: 'Next.js 開發筆記',
    description: '',
    tags: [CategoryKey.Next],
    updated: '2024-05-10'
  },
  {
    id: 'freego-notes',
    name: '無障礙 Freego 檢測錯誤排查筆記',
    description: '',
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
  },
  {
    id: 'gcp-get-bucket-obj',
    name: '使用用戶端程式庫來取得 GCS Bucket 內的物件',
    description: '',
    tags: [CategoryKey.Gcp],
    updated: '2024-05-06',
  },
  {
    id: 'pixi-notes',
    name: 'PIXI.js v7 基礎筆記',
    description: '',
    tags: [CategoryKey.Pixi],
    updated: '2024-05-06',
  },
];

export default articles;