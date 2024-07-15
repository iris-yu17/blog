## 前言

這系列文章是一邊閱讀 《React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者》，一邊做的筆記摘要。\
從 Chapter 2 ～ Chapter 5，總共會有四篇文章。

## 3-2 深入理解 batch update 語 updater function

### Batch Update

當我們使用 setState 來更新 state 時，會觸發 re-render 使畫面更新。\
然而 re-render 的觸發並不是立即的。當我們在一個事件裡，連續多次呼叫 setState 方法，其實最後 re-render 只發生一次。\
React 會將 setState 動作依序紀錄到佇列，在**正在執行的事件內的所有程式都執行完**後，才開始進行 re-render。

範例：

```javascript
export default function Counter() {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount(1);
    // 執行到這裡時，其實 re-render 的動作還不會開始
    // 會將「把舊值取代為1」的動作加到佇列

    setCount(2);
    // 執行到這裡時，其實 re-render 的動作還不會開始
    // 會將「把舊值取代為2」的動作加到佇列

    setCount(3);
    // 執行到這裡時，其實 re-render 的動作還不會開始
    // 會將「把舊值取代為3」的動作加到佇列

    ...

    // 執行到這裡，此事件已沒有其他程式需要執行了，才開始 re-render
  };
}
```

以上程式碼執行到事件最後沒有其他程式需要執行了，才統一進行一次 re-render。\
React 會依序試算 count state 的佇列執行結果：\
`原值` => `把舊值取代為1` => `把舊值取代為2` => `把舊值取代為3`\
因此最後會直接將 count 的值更新為 3。

> 「一個事件中多次呼叫 setState 方法時，會自動依序合併試算 state 的目標更新結果，最後只執行一次 re-render 來統一更新畫面」，這就是 **barch update**。

## 如果不想要 barch update：使用 flushSync()

使用方法：將 setState 放在 flushSync 的 callback 函式中，React 就會立即觸發 component re-render。

補充：值得注意的是，雖然立即觸發 re-render，但若嘗試印出 state，仍會得到舊的值。因為此次事件是基於 state 尚未被更新的那次 render 所建立的。而在一次 render 中，state 的值永遠不變。

```javascript
import { flushSync } from 'react-dom';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Foo');

  const handleButtonClick = () => {
    flushSync(() => {
      setCount(1);
      // 直接 re-render
    });

    // 執行到這裡時，state 已更新，實際 DOM 也已更新完畢

    flushSync(() => {
      setName('Bar');
      // 直接 re-render
    });

    // 執行到這裡時，state 已更新，實際 DOM 也已更新完畢

    console.log(count);
    // 會到 0，因為此次事件是基於 count 為 0 的那次 render 所建立的
  };
}
```

### Updater Function

首先來看個範例：\
以下程式碼的 count 更新結果是什麼呢？

```javascript
export default function Counter() {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };
}
```

答案是 `1`。

有個很重要的觀念：

> 每一次 render 都有它自己版本的 state 值，同一次 render 中的 state 值是永遠不變的。

記得前面說的嗎？事件最後沒有其他程式需要執行了，才統一進行一次 re-render。\
所以程式碼中三個 `setCount(count + 1)` 執行時並沒有 re-render，它們的 count 值其實都是 0。

而要解決這個需求很簡單，只要用 updater function 就可以了。

```javascript
export default function Counter() {
  const [count, setCount] = useState(0);

  const handleButtonClick = () => {
    setCount((val) => val + 1);
    // 執行到這裡時，其實 re-render 的動作還不會開始
    // 會把 (val) => val + 1 放到佇列

    setCount((val) => val + 1);
    // 執行到這裡時，其實 re-render 的動作還不會開始
    // 會把 (val) => val + 1 放到佇列

    setCount((val) => val + 1);
    // 執行到這裡時，其實 re-render 的動作還不會開始
    // 會把 (val) => val + 1 放到佇列
  };
}
```

最後計算佇列，執行內容會下：\
`舊值` => `(val) => val + 1` => `(val) => val + 1` => `(val) => val + 1`\
也就是\
`0` => `(0) => 0 + 1` => `(1) => 1 + 1` => `(2) => 2 + 1`
