## 前言

在講解 `Redux-toolkit` 的 Extra reducers 之前，有個觀念必須先理解。\
在純 `Redux` 中，當我們發送 action (dispatch action) 時，reducer 會依照 action 做相關的處理，這我們已非常清楚。\
只是我們可能會漏掉一個觀念：其實所有的 reducer 都會接收到這個 action，但只有相關的 reducer 會做處理，其他的無關的 reducer 則會忽略這個 action。

而在 `Redux-toolkit` 中則不是這樣，reducer 只會接收到它的 `slice` 所產生的 action。

## 純 Redux 的範例

> Demo: https://codesandbox.io/p/sandbox/redux-9-redux-reducer-additional-g5g7rz

我們先來使用之前純 Redux 的範例做說明，以下是部份的程式碼：

- 我們定義了 cakeReducer 和 iceCreamReducer 兩個 reducer
- 當發送 action 時，他們都會收到 action，並透過 switch case 來決定要如何改變值，若沒有符合的 case，當然就不會做任何事。

```javascript
// cake reducer
const cakeReducer = (prevState = cakeState, action) => {
  switch (action.type) {
    case 'CAKE_ORDER':
      const cakeQuantity = action.payload.quantity;
      return {
        ...prevState,
        cakes: prevState.cakes - cakeQuantity,
      };
    default:
      return prevState;
  }
};

// ice cream reducer
const iceCreamReducer = (prevState = iceCreamState, action) => {
  switch (action.type) {
    case 'ICECREAM_ORDER':
      const iceCreamQuantity = action.payload.quantity;
      return {
        ...prevState,
        iceCream: prevState.iceCream - iceCreamQuantity,
      };
    default:
      return prevState;
  }
};
```

### 假設情況：一個 action 觸發兩個 reducer

以同樣蛋糕店的例子來做說明，假如現在有促銷活動，只要買蛋糕，就會送一個冰淇淋。要怎麼做呢？\
我們在 iceCreamReducer 裡再加上 `CAKE_ORDER`，這樣當下單蛋糕時 `action type` 符合，就會觸發將 iceCream 減一。

```javascript
// ice cream reducer
const iceCreamReducer = (prevState = iceCreamState, action) => {
  switch (action.type) {
    case 'ICECREAM_ORDER':
      const iceCreamQuantity = action.payload.quantity;
      return {
        ...prevState,
        iceCream: prevState.iceCream - iceCreamQuantity,
      };
    // 多加了 CAKE_ORDER
    case 'CAKE_ORDER':
      return {
        ...prevState,
        iceCream: prevState.iceCream - 1,
      };
    default:
      return prevState;
  }
};
```

### 查看結果

可以看到當發送 action，type 為 `CAKE_ORDER` 時，cake 跟 iceCream 數量都減一了！
![Imgur](https://i.imgur.com/EJ98cPp.png)

## 關於 Extra Reducers

- 在前言中已有說了，不同於純 `Redux` ， 在 `Redux-toolkit` 中 reducer 只會接收到它的 slice 所產生的 action。\
  如果我們想要讓 reducer 接收其他 `slice` 的 action，就需要用到 Extra Reducers。
- 就如同字面意義，Extra Reducers（額外的 Reducers），就是用原本的 `createSlice` 以外，額外產生的 reducer。

## Redux-toolkit 範例

> Demo: https://codesandbox.io/p/devbox/redux-9-redux-toolkit-extra-reducers-lhjytq

同樣的例子，我們要在蛋糕下單時，送一個冰淇淋。\
也就是說，在 `action type` 為 `cake/order` 時，冰淇淋數量要減一。\
要怎麼設定呢？

### 在 createSlice 中

在 createSlice 中加上 `extraReducers` 屬性，可以有兩種寫法。

```javascript
// features/iceCream/iceCreamSlice.js

const iceCreamSlice = createSlice({
  name: 'iceCream',
  initialState: {
    numOfIceCream: 10,
  },
  reducers: {
    order: (state, action) => {
      state.numOfIceCream -= action.payload.quantity;
    },
    restock: (state, action) => {
      state.numOfIceCream += action.payload.quantity;
    },
  },
  // 寫法一
  extraReducers: {
    ['cake/order']: (state, action) => {
      state.numOfIceCream--;
    },
  },
  // 寫法一
  extraReducers: (builder) => {
    builder.addCase(cakeActions.order, (state, action) => {
      state.numOfIceCream--;
    });
  },
});
```

#### 寫法一

`extraReducer` 的值會是一個物件

- 物件的 key 是要對應的 `action type`
- 物件的 value 是個函式，我們把要做的相應處理定義在這邊

#### 寫法二

使用 build function，這是比較建議的寫法，寫法如下\
`extraReducers` 的值會是一個函式\

- 此函式有一個 `builder` 參數
- 在函式裡面，我們可以用這個 `builder` 來新增一個情況，語法為 `builder.addCase()`
- 在 `addCase` 中傳入兩個參數，第一個是 `action type`，這邊的 `action type` 我們使用 `redux-toolkit` 自動幫我們產生好的 action，因此使用 `cakeActions.order`
- `addCase` 的第二個是函式，同寫法一的函式，我們把要做的相應處理定義在這邊

### 完成🎉

如果查看 terminal，同樣可以看到 iceCream 隨著 `cake/order` 減一

參考資料：

- https://www.youtube.com/watch?v=NBbvaF3GK9U
