> Demo: https://codesandbox.io/p/devbox/redux-8-redux-toolkit-with-middleware-d5c3xf

備註：本篇沿用前一篇文章的範例

## 前言

在上個章節，我們介紹了 `redux-toolkit` 的基本使用方法。\
[Redux#4 Middleware](./redux-4) 中，介紹了如何在單純 `redux` 使用 `middleware`。\
在這章節，我們要來學習如何在 `redux-toolkit` 使用 `middleware`。

## - step0. 安裝 redux-logger

```
npm i redux-logger
```

## - step1. 創建 logger

```javascript
// store.js

// 引入 redux-logger
const reduxLogger = require('redux-logger');

// 創建 logger
const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    // ...
  },
});

module.exports = store;
```

## - step2. 定義 middleware

- 要使用 `redux-logger` 這個 middleware，我們要在 `configureStore` 裡加上 middleware 屬性。
- `redux-toolkit` 有它預設的 middleware，因此要先要取得預設的 middleware，並和我們的 `logger` 合併。

```javascript
// store.js
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    // ...
  },
  // 取得預設的 middleware，和 logger 合併。
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
```

## 查看結果

在 terminal，可以看到 `logger` 成功印出狀態。🎉
以下為印出來的部分結果：

```javascript
 action iceCream/order @ 10:17:06.303
   prev state { cake: { numOfCakes: 17 }, iceCream: { numOfIceCream: 10 } }
   action     { type: 'iceCream/order', payload: { quantity: 10 } }
   next state { cake: { numOfCakes: 17 }, iceCream: { numOfIceCream: 0 } }
 action iceCream/restock @ 10:17:06.304
   prev state { cake: { numOfCakes: 17 }, iceCream: { numOfIceCream: 0 } }
   action     { type: 'iceCream/restock', payload: { quantity: 2 } }
   next state { cake: { numOfCakes: 17 }, iceCream: { numOfIceCream: 2 } }
```

## 補充

在上面的 log 結果，我們特別來看一下 `action` 的 `type`。

```javascript
action { type: 'iceCream/restock', payload: { quantity: 2 } }
```

例如 `iceCream/restock` 的 iceCream 跟 restock，這些文字是哪裡來的呢？\
在單純 `redux`，我們必須自己定義 `type`；而在 `redux-toolkit`，如[這篇](./redux-6)所提到，它會自己幫我們產生 `action creator` 跟 `action type`。\
以下是我們先前寫好的 `slice`， `redux-toolkit` 會拿 `name` 作為 `action type` 的第一部分； `reducers` 的屬性名稱作為第二部分，拼成 `iceCream/restock` 這個 `type`。

```javascript
const iceCreamSlice = createSlice({
  name: 'iceCream',
  initialState: {
    numOfIceCream: 10,
  },
  reducers: {
    order: (state, action) => {
      state.numOfCakes -= action.payload.quantity;
    },
    restock: (state, action) => {
      state.numOfCakes += action.payload.quantity;
    },
  },
});
```

---

參考資料：

- https://youtu.be/dUVXHMHJio0?si=Tuhn4MqQYFWZH2ov
