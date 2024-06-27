## useReduer 是做什麼的

- 平時我們會用 `useState` 來操作 state。我們也可以用 `useReducer` 做到一樣的事， `useReducer` 適合較複雜的 state。
- 像 `useState` 的狀態改變會分散在不同的函式裡面；而透過 `useReducer`，我們可以將狀態的改變統一做管理。

## 範例：計數器

> Demo: https://codesandbox.io/s/usereducer-uw68c6?file=/src/App.js

### - step0. 基本計數器配置

```javascript
export default function App() {
  const increment = () => {};

  const decrement = () => {};

  return (
    <div className="App d-flex">
      <button onClick={decrement}>-</button>
      <div className="m-4">
        // 計數器的值
      </div>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### - step1. 創建 useReducer()

`useReducer()` 會接收2個參數：

1. reducer：我們會在這邊定義好要如何更新狀態。
2. 初始值：這個參數就像我們用 `useState()` 的初始值一樣，不過 `useReducer` 是用在較複雜的 state 處理，所以通常不會是單純數字、字串等，因此範例中用 `{count: 0}`。

```javascript
// reducer 函式
const reducer = () => {

};

export default function App() {
  // 創建 useReducer()
  const [] = useReducer(reducer, { count: 0 });

  const increment = () => {};

  const decrement = () => {};

  return (
    <div className="App d-flex">
      <button onClick={decrement}>-</button>
      <div className="m-4">
        // 計數器的值
      </div>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### - step2. 寫 reducer function

我們要在 `reducer` 裡面做運算，並 return 新的狀態。

`reducer()` 有兩個參數：

1. state：狀態，以目前例子來說，就是 `{count: 0}`
2. action：描述要做什麼動作，慣例上會是包含一個 `type` property 的物件。
   （詳見 step4）

```javascript
const reducer = (state, action) => {
  return { count: state.count + 1 };
};

export default function App() {
  const [] = useReducer(reducer, { count: 0 });

  const increment = () => {};

  const decrement = () => {};

  return (
    <div className="App d-flex">
      <button onClick={decrement}>-</button>
      <div className="m-4">{state.count}</div>
      <button onClick={increment}>+</button>
    </div>
  );
}

```

### - step3. useReducer() 的 return value

`useReducer()` 會回傳一個 array，array 裡有兩個項目：

1. state：狀態
2. dispatch：一個 function，它會幫我們呼叫 `reducer` function。dispatch 接收一個參數，這個參數會是 `reducer()` 的 action。

code 說明：

以下範例中，點擊 `+` 按鈕，會執行 `dispatch()`， 而 `dispatch` 會呼叫 `reducer`。
在 `reducer` 中，把當前 count 加ㄧ，並更新狀態。

```javascript
const reducer = (state, action) => {
  console.log(action) // 印出 { tpye: "plus" }
  return { count: state.count + 1 };
};

export default function App() {
  // 回傳值為 [狀態, dispatch 函式]
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const increment = () => {
    // 接收的參數會是 reducer 的 action
    dispatch({ type: "plus" });
  };

  const decrement = () => {};

  return (
    <div className="App d-flex">
      <button onClick={decrement}>-</button>
      <div className="m-4">
        {state.count}
      </div>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### - step4. reducer 的 action

在 step3，我們點擊 `+` 時會把 count 加一，那麼減要如何實作呢？

1. 在點擊 `+` 時，呼叫 `dispatch` 並傳入 action `{type: 'plus'}`
   同樣地，在點擊 `-` 時，也呼叫 `dispatch` ，並傳入另一個 action `{type: 'minus'}`
2. 在 `reducer` 裡，判斷 action type 為 `plus` 或 `minus`，來做相對應的動作。

```javascript
const reducer = (state, action) => {
  // 判斷 action type，執行相對應的動作
  switch (action.type) {
    case "plus":
      return { count: state.count + 1 };
    case "minus":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const increment = () => {
    // 傳入 `加` 的 action
    dispatch({ type: "plus" });
  };

  const decrement = () => {{
    // 傳入 `減` 的 action
    dispatch({ type: "minus" });
  };

  return (
    <div className="App d-flex">
      <button onClick={decrement}>-</button>
      <div className="m-4">{state.count}</div>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

## 補充

- 可以定義一個 ACTION 物件（用全大寫因為它是全域且不會改變的變數），裡面包含我們 reducer 的 action type。
- 用物件的寫法來代替原本的 `plus` `minus` 字串
- 這樣做相較於原本寫死的字串，可以 auto-complete，開發更方便，且不會打錯字。有什麼 action 一目瞭然，程式的可讀性更高。

```javascript
const ACTIONS = {
  PLUS: "plus",
  MINUS: "minus"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.PLUS:
      return { count: state.count + 1 };
    case ACTIONS.MINUS:
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const increment = () => {
    dispatch({ type: ACTIONS.PLUS});
  };

  const decrement = () => {
    dispatch({ type: ACTIONS.MINUS });
  };

  return (
    <div className="App d-flex">
      <button onClick={decrement}>-</button>
      <div className="m-4">{state.count}</div>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

---

參考資料
https://www.youtube.com/watch?v=kK_Wqx3RnHk&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=6
