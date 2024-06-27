> Demo: https://codesandbox.io/s/redux-2-fr9cr5

## `Redux` 的運作說明

`Redux` 有三個核心： `store`, `action`, `reducer`

1. 我們會把狀態存在 `store` 裡
2. 想讓狀態改變，我們會發送 `action`
3. 當 `action` 發送時，就會觸發 `reducer` 函式，執行函式裡的內容，用這樣的方式來更新狀態

## Action

- `action` 是我們的 app 唯一能和 `store` 互動的方式
- `action` 是個物件，慣例上會包含一個 type 屬性，若有其他資訊會放在 payload 屬性。
- 在 `Redux` 裡，還有個東西叫做 `action creator`，它是一個產生 `action` 的函式。

```javascript
// action creator
const orderCake = () => {
  // return 一個 action
  return {
    type: 'ORDER',
    quantity: 1,
  };
};
```

## Reducer

- 在 `reudcer` 裡，我們會制定好依據發送的 `action` ， `state` 會如何改變。
- `reducer` 是一個函式，它接收舊的 `state` 和 `action` 作為參數，並回傳新的 `state`。

```javascript
// 初始的 State 狀態
const initialState = {
  cake: 200,
};

// 寫好 reducer
// 這邊使用預設參數，若沒有傳入 prevState，就使用 initialState
const reducer = (prevState = initialState, action) => {
  // ...做處理
  return newState;
};
```

## Store

- 我們的 `state` 會存放在 `store` 裡；整個應用程式只會有一個 `store`。

```javascript
// 使用 redux 的 createStore 來創建 store
// 它接收我們寫好的 reducer 作為參數
const store = createStore(reudcer);
```

- 透過 `getState()` 方法來得到 `state` 的值。

```javascript
console.log('Initial state:', store.getState());
```

- 透過 `dispatch(action)` 方法來更新 `state` 。
  它接收 `action` 作為參數

```javascript
// 發送 action 來更新 state
store.dispatch(orderCake());
```

- 透過 `subscribe(listiner)` 來註冊一個 listener，`subscribe()` 接收一個函式作為參數，它會在 `state` 改變時被呼叫。

```javascript
// 偵測狀態改變
store.subscribe(() => {
  console.log('Updated state:', store.getState());
});
```

- 透過 `subscribe(listener)` 回傳的 function 來撤銷 listener。

---

參考資料
- https://www.youtube.com/watch?v=WDJ2eidE-b0&t=339s
