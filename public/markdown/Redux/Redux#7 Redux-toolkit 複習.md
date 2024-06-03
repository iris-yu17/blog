Demo: https://codesandbox.io/p/sandbox/redux-6-redux-toolkit-yyy4r2

## 前言

在[前一章節](https://hackmd.io/@iris-yu17/redux_6)，我們介紹了`redux-toolkit` 的使用步驟，並創建了 cake feature。在這章節，我們再加上 iceCream feature。

## - step1. create iceCreamSlice

1. 在 `/features/iceCream` 下創建 `iceCreamSlice.js`
2. 引入 `createSlice`

```javascript
const createSlice = require("@reduxjs/toolkit").createSlice;
```

## - step2. 使用 `createSlice`

1. 設定 `slice` 名稱為 `iceCream`
2. 設置初始狀態

```javascript
const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState: {
    numOfIceCream: 10,
  },
});`
```

## - step3. 定義 reducer

```javascript
const iceCreamSlice = createSlice({
  name: "iceCream",
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

## - step4. export reducer 和 action

```javascript
module.exports = iceCreamSlice.reducer;
module.exports.iceActions = iceCreamSlice.actions;
```

## - step5. 在 `store.js` 裡設置 reducer

```javascript
// 1. 引入 reducer
const iceCreamReducer = require("../features/iceCream/iceCreamSlice");

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    // 2. 設置
    iceCream: iceCreamReducer,
  },
});
```

## - step6. 在 `index.js` 裡使用

```javascript
// 1. 引入 actions
const iceCreamActions = require("./features/iceCream/iceCreamSlice").iceCreamActions;

// 2. 發送 actions
store.dispatch(
  iceCreamActions.order({
    quantity: 10,
  }),
);

store.dispatch(
  iceCreamActions.restock({
    quantity: 2,
  }),
);
```

結果

```
Updated State: { cake: { numOfCakes: 17 }, iceCream: { numOfIceCream: 10 } }
Updated State: { cake: { numOfCakes: 17 }, iceCream: { numOfIceCream: 0 } }
```

## 備註

在純 `redux` 裡，會用 `combineReducers` 來合併多個 reducer，如下：

```javascript
const reducers = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});
```

在 `redux-toolkit` 裡，`configureStore` 會直接幫我們做這件事。

--- 
參考資料：
- https://www.youtube.com/watch?v=Q-KZCLu5cbI&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&index=21
