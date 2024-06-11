> Demo: https://codesandbox.io/p/sandbox/redux-11-react-redux-zmn3l6

Demo 說明：\
畫面上顯示蛋糕數量，和 'Order cake' 以及 'Restock cake' 兩個按鈕。\
點擊 'Order cake'，數量會減一。\
點擊 'Restock cake'，數量會加五。

## 前言

在這章節，終於要進入 `react-redux` 了。

- 在 `React` 中使用 `Redux`，我們會使用 `Redux-toolkit` 來幫忙建立 `slice`, `store`，方式就跟前面章節說明的一樣，差別只在於前面章節是在 node.js 環境跑，這次是在瀏覽器環境，因此可使用 `import`。
- 我們會從 0 開始，一步步重新建立 `slice` 和 `store`，並且示範在 `react-redux` 要如何取得 `state` 和發送 action 來更新 `state`。

## - step0. 建立專案、安裝相關套件

### 建立 React 專案
```
npx create-react-app my-app
```

### 安裝 `react-redux`

```
yarn add react-redux
或
npm install react-redux
```

### 安裝 `redux-toolkit`

```
yarn add @reduxjs/toolkit
或
npm install @reduxjs/toolkit
```

## - step1. 建立 slice 和 store

### 建立 slice

在 `src/features/cake/cakeSlice.js`

```javascript
// 引入 createSlice
import { createSlice } from '@reduxjs/toolkit';

// createSlice 接收一個物件，此物件包含三個參數
const cakeSlice = createSlice({
  name: 'cake',
  initialState: {
    numOfCakes: 10,
  },
  reducers: {
    order: (state, action) => {
      state.numOfCakes -= 1;
    },
    restock: (state, action) => {
      state.numOfCakes += action.payload.quantity;
    },
  },
});

export default cakeSlice.reducer;
export const { order, restock } = cakeSlice.actions;
```

### 建立 store

在 `src/app/store.js`

```javascript
import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../features/cake';

const store = configureStore({
  reducer: {
    cake: cakeReducer,
  },
});

export default store;
```

## - step2. 建立一個 Cake 元件

在 `src/components/Cake.jsx`

```javascript
export function Cake() {
  return (
    <>
      <h1>Cake</h1>
      <div>Cake 數量：</div>
      <button>Order Cake</button>
      <button>Restock Cake</button>
    </>
  );
}
```

在 `src/App.js` 裡引入 `<Cake/>` 元件

```javascript
import { Cake } from './components/Cake';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <Cake />
    </div>
  );
}
```

## - step3. 使用 Provider

下一步，要讓我們的 React 應用程式能夠讀取 `store`，這時候就需要用到 `react-redux` 的 `<Provider/>`。

1. 在 `src/index.js` 引入 `Provider` 並包住 `<App/>`
2. 把 `store` 作為 props 傳入 `Provider`

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    // 用 Provider 包住 App，並傳入 store
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
```

## - step4. 用 useSelector 讀取 state

在 `<Cake/>` 元件中，要如何得到存放在 `cakeSlice.js` 中的 state 呢？

- 我們可以使用 `react-redux` 的 `useSelector` hook。
- `useSelector` 接收一個函式作為參數，這個函稱式為 selector function
- selector function 會有一個 `state` 引數，並且要回傳一個值
- `useSelector` 會回傳 selector function 所回傳的值

```javascript
// 引入 useSelector
import { useSelector } from 'react-redux';

export function Cake() {
  const cakeCount = useSelector(
    // 裡面這個函式就是 selector function
    (state) => {
      // 回傳蛋糕數量
      return state.cake.numOfCakes;
    },
  );
  return (
    <>
      <h1>Cake</h1>
      <div>Cake 數量： {cakeCount}</div>
      <button>Order Cake</button>
      <button>Restock Cake</button>
    </>
  );
}
```

## - step5. 用 useDispatch 來發送 action

- 引入 `action creator`\
  記得嗎，`action creator` 會回傳一個 action，例如：

  ```javascript
  {
    type: 'cake/restock',
    payload: 1
  }
  ```

- 使用 `react-redux` 的 `useDispatch` hook，它會回傳 `redux store` 的 `dispatch` function\
   像在前面 `redux-toolkit`，若要發送 action，我們會這樣寫

  ```javascript
  store.dispatch(action 放這);
  ```

  在這裡用了 `useDispatch`，就可直接使用 `disaptch()`，前面不必再加上 `store.`

```javascript
// 引入 useDispatch
import { useSelector, useDispatch } from 'react-redux';

// 引入 action creator
import { order, restock } from '../features/cakes/cakeSlice';

export function Cake() {
  const cakeCount = useSelector((state) => {
    return state.cake.numOfCakes;
  });

  const disaptch = useDispatch();

  return (
    <>
      <h1>Cake</h1>
      <div>Cake 數量： {cakeCount}</div>
      <button
        onClick={() => {
          // order() 是 action creator, 它會回傳 action（一個包含 type 和 payload 的物件）
          disaptch(order());
        }}
      >
        Order Cake
      </button>
      <button
        onClick={() => {
          // restock() 是 action creator, 它會回傳 action（一個包含 type 和 payload 的物件）
          disaptch(restock({ quantity: 5 }));

          // 相當於
          // disaptch({
          //   type: 'cake/restock'
          //   payload: {
          //     quantity:5
          //   }
          // });
        }}
      >
        Restock Cake
      </button>
    </>
  );
}
```

## 完成🎉

---

參考資料：https://youtu.be/af4N8xJN3iU?si=SX1xwSiNUXFN_FYR
