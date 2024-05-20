## 前言

- 在 `Redux` 中，有許多重複性高的模板code (boilerplate code)。像我們每次都要創建一個 `action` 物件、`action creator`、在 `reducer` 裡使用 switch case 來改變 `state` ...等。在專案中重複這些動作是很不方便的事。
- 使用 `Redux-toolkit` 可以讓開發變得更加有效率。
- 在這個章節會使用 `Redux-toolkit` 來實作前面蛋糕店、冰淇淋店的例子。

範例：https://codesandbox.io/p/sandbox/redux-6-redux-toolkit-yyy4r2

**備註：此篇範例是在 `node.js` 的環境跑**

## - step0. 專案 set up
1. 開啟一個新專案，並安裝 redux-toolkit
```
npm i @reduxjs/toolkit
```

2. 資料夾結構
- `Redux-toolkit` 提供了一個建議的資料夾結構，以協助組織 `Redux` 相關的程式碼。
- 建議的資料夾結構通常是基於功能的(feature)，而不是基於檔案類型的。

```
/app
    - index.js
/feautures
    /cake
    /iceCream
```

## - step1. createSlice
說明：
- 在 `redux-toolkit` 中，建議把一個功能的 `reducer` 邏輯和 `action` 放在一起，且檔案名稱以 `slice` 作為後綴。
- 把應用程式分成一個個 `slice` 來管理狀態。
- 我們在 `cake` 資料夾底下，新增 `cakeSlice.js`

引入 createSlice
```javascript=1
// features/cakes/cakeSlice.js
// (因為是 node 環境，所以用 require)
const createSlice = require("@reduxjs/toolkit").createSlice;
```

createSlice 接收一個物件，此物件包含三個參數：
1. slice的名字
2. 初始狀態
3. reducers 

```javascript=1
// features/cakes/cakeSlice.js
const cakeSlice = createSlice({
  name: "cake", // slice的名字
  initialState: { // 初始狀態
    numOfCakes: 10,
  },
  reducers: {} // reducers
});
```
## - step2. reducers 內容
在前面不使用 `redux-toolkit` 時，我們用 `switch case` 來處理。
```javascript=1
// features/cakes/cakeSlice.js
const cakeReducer = (prevState = cakeState, action) => {
  switch (action.type) {
    case "CAKE_ORDER":
      const cakeQuantity = action.payload.quantity;
      return {
        ...prevState,
        cakes: prevState.cakes - cakeQuantity
      };
    default:
      return prevState;
  }
};
```

使用 `createSlice` 的 `reducer` 寫法：
1. 處理蛋糕下單，我們使用 order 做為 key，而 value 會是一個函式，此函式接收 `state` `action` 做為參數
2. 不同於之前的寫法，使用了 `createSlice`，我們可以直接改變 `state`，不用 return 新的狀態。
（`redux-toolkit` 使用了 [Immer](https://immerjs.github.io/immer/)，因此我們可以直接改變狀態）
```javascript=1
// features/cakes/cakeSlice.js
const cakeSlice = createSlice({
  name: "cake",
  initialState: {
    numOfCakes: 10,
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

### 那麼 action 呢？
我們寫了 `reducers`，它會自動幫我們產生 action creator，名稱就和 `reducers` 裡定義的 key 相同 (order 和 restock)。
因此我們就不用再自己創建 action type 常數、action creator...等了。

### export actions 和 reducers
```javascript=1
// features/cakes/cakeSlice.js
module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
```

## - step3. 創建 store
- 我們要在 `store.js` ，使用 configureStore 來創建 store
- configureStore 接收一個物件，裡面有個 `reducer` 屬性，我們把 slices 的 reducer 設置在這邊。
```javascript=1
// app/store.js
const configureStore = require("@reduxjs/toolkit").configureStore;
const cakeReducer = require("../features/cakes/cakeSlice");

const store = configureStore({
  reducer: {
    cake: cakeReducer,
  },
});

module.exports = store;
```

## - step4. 使用 store
- 如同單純 `redux` 一樣，使用 `getState()` 來得到狀態；使用 `subscribe()` 來註冊。(詳見[[Redux] #2 Store, Action, Reudcer 基本寫法](https://hackmd.io/3vNH6QuVRNO7RGbgFl1MCA?view#Store))
- 使用 `dispatch()` 來發送 `action`
- 直接使用 `redux-toolkit` 幫我們產生的 action creator

```javascript=1
// index.js
const store = require("./app/store");
const cakeActions = require("./features/cakes/cakeSlice").cakeActions;

// 取得狀態
console.log("Initial State:", store.getState());

// 偵測狀態改變
const unsubscribe = store.subscribe(() => {
  console.log("Updated State:", store.getState());
});

// 改變狀態(下單蛋糕，數量減3)
store.dispatch(
  cakeActions.order({
    quantity: 3,
  }),
);

// 改變狀態(蛋糕補貨，數量加10)
store.dispatch(
  cakeActions.restock({
    quantity: 10,
  }),
);

unsubscribe();
```

console 結果如下
```
Initial State: { cake: { numOfCakes: 10 } }
Updated State: { cake: { numOfCakes: 7 } }
Updated State: { cake: { numOfCakes: 17 } }
```
## 總結 `redux-toolkit` 的使用方法
- 使用 `createSlice`，它會產生 action  reducer
- 可以直接改變 `state`，不用擔心 mutable 物件問題
- 使用 `configureStore` 來創建 `store`
- `store.getState()` 取得狀態
- `store.subscribe()` 偵測狀態改變
- `store.dispatch()` 改變狀態

---
> 參考資料：https://www.youtube.com/watch?v=5EMyvYGzv0o&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&index=20