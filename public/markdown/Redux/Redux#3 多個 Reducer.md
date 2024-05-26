> Demo: https://codesandbox.io/s/redux-3-zhlzkj

## 只用一個 Reducer

延續前篇蛋糕店的例子，假設現在蛋糕店除了蛋糕以外，還賣冰淇淋，我們可以這樣寫：

### - 初始 `state`

新增 iceCream 狀態

```javascript
const intialState = {
  cakes: 200,
  iceCream: 100
}
```

### - `Action`

新增 `orderIceCream` action creator

```javascript
const orderCake = () => {
  return {
    type: "CAKE_ORDER",
    payload: {
      quantity: 1
    }
  };
};

const orderIceCream = () => {
  return {
    type: "ICECREAM_ORDER",
    payload: {
      quantity: 1
    }
  };
}
```

### - `Reducer`

`reducer` 中，對應 `ICECREAM_ORDER` 這個 `action` ，制定好相對應的狀態更新

```javascript
const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "CAKE_ORDER":
      const cakeQuantity = action.payload.quantity;
      return {
        ...prevState,
        cakes: prevState.cakes - cakeQuantity
      };
    case "ICECREAM_ORDER":
      const iceCreamQuantity = action.payload.quantity;
      return {
        ...prevState,
        iceCream: prevState.iceCream - iceCreamQuantity
      };
    default:
      return prevState;
  }
};
```

## 拆分 Reducer

### - 初始 `State`

```javascript
const initialCakeState = {
  cakes: 200
};

const initialIceCreamState = {
  iceCream: 100
};
```

### - `Reducer`

```javascript
// cake reducer
const cakeReducer = (prevState = initialCakeState, action) => {
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

// ice cream reducer
const iceCreamReducer = (prevState = initialIceCreamState, action) => {
  switch (action.type) {
    case "ICECREAM_ORDER":
      const iceCreamQuantity = action.payload.quantity;
      return {
        ...prevState,
        iceCream: prevState.iceCream - iceCreamQuantity
      };
    default:
      return prevState;
  }
};
```

### - `Store`

- 由於 `createStore` 只接收一個 `reducer` ，我們要把兩個 `reducer` 合併，可使用 `redux` 的 `combineReducers()`
- `combineReducers()` 接收一個物件，裡面一個 key-value pair 相對應於一個 `reducer`

```javascript
// 合併 reducers
const reducers = combineReducers({
  cakeState: cakeReducer,
  iceCreamState: iceCreamReducer
});

// 創建 store
const store = createStore(reducers);
```

## 拆分後的 `state`

- 拆分後，我們用 `store.getState()` 來看看 `state` 狀態，會發現包含了兩個物件
- 裡面的 `cakeState` 和 `iceCreamState` 相對應於我們 `combineReducers` 傳入物件的 `key`

```
{
  cakeState: {
    cakes: 200
  },
  iceCreamState: {
    iceCream: 100
  }
}
```

## 總結

當我們的應用程式越來越大時，可以拆分 `reducer`，讓他們各自獨立、處理他們自己的 `state`，例如 `profile reducer` `user reducer` ...等

---

> 參考資料
> https://www.youtube.com/watch?v=-1I-HpvUiBQ&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&index=12
