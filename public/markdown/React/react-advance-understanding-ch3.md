## 前言

這系列文章是一邊閱讀 《React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者》，一邊做的筆記摘要。\
由於主要是寫給自己看的筆記，所以會比較精簡，也會省略一些細節說明。從 Chapter 2 ～ Chapter 5，總共會有五篇文章。

- [《React 思維進化》Chapter 2 筆記](./react-advance-understanding-ch2)
- [《React 思維進化》Chapter 3 筆記](./react-advance-understanding-ch3)
- [《React 思維進化》Chapter 4 筆記](./react-advance-understanding-ch4)
- [《React 思維進化》Chapter 5 筆記（上）](./react-advance-understanding-ch5-I)
- [《React 思維進化》Chapter 5 筆記（下）](./react-advance-understanding-ch5-II)

## 3-2 深入理解 batch update 與 updater function

### Batch Update

當我們使用 setState 來更新 state 時，會觸發 re-render 使畫面更新。\
然而 re-render 的觸發並不是立即的。當我們在一個事件裡，連續多次呼叫 setState 方法，其實最後 re-render 只發生一次。\
React 會將 setState 動作依序紀錄到佇列，等**正在執行的事件內的所有程式都執行完**後，才開始進行 re-render。

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

> 「一個事件中多次呼叫 setState 方法時，會自動依序合併試算 state 的更新結果，最後只執行一次 re-render 來統一更新畫面」，這就是 **batch update**。

### 如果不想要 batch update：使用 flushSync()

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
    // 會得到 0，因為此次事件是基於 count 為 0 的那次 render 所建立的
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
`0` => `(0) => 0 + 1` => `(1) => 1 + 1` => `(2) => 2 + 1`\
最後得到 `3`。

## 3-3 維持 React 資料流可靠性的重要關鍵：immutable state

首先看個例子：\
我們用以下的方式，直接去改變 position x 的值。當點擊按鈕時會發生什麼事呢？

```javascript
export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = () => {
    // 錯誤方式：直接 mutate state
    position.x = 10;
  };

  return (
    <>
      <div>
        Position: {position.x}, {position.y}
      </div>
      <button onClick={handleMove}>Move</button>
    </>
  );
}
```

答案是：什麼事都沒發生。\
這很正常，因為前面提到，想改變 state，要使用 setState 方法來觸發 component re-render。

不過，即使我們改成使用 `setPosition`，仍不會有效果，為什麼呢？

```javascript
export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = () => {
    // 錯誤方式：直接 mutate state
    position.x = 10;

    // 即使使用了 setState 仍不會觸發 re-render
    setPosition(position);
  };

  return (
    <>
      <div>
        Position: {position.x}, {position.y}
      </div>
      <button onClick={handleMove}>Move</button>
    </>
  );
}
```

因為[前面](./react-advance-understanding-ch2.md)有說過，React 會執行 `Object.is()` 來檢查新舊的 state 值，若是不同，才會 re-render。\
我們知道，在 JavaScript 中，物件跟陣列是可變的（mutable），並且是傳參考。我們用 `position.x` 來改變（mutate）物件，但它的參考並沒有變。當 React 以 `Object.is()` 來檢查 state 是否有改變時，由於新值和舊值的物件是同一個參考，所以會被判定為相同。

換句話說，**當 React 要判定物件或陣列是否有改變時，它看的是資料的參考**，並不會去檢查內部細節是否有改變。\
因此我們呼叫 setPosition 時，應該傳入一個全新的物件，這樣它們的參考才不會一樣，才能順利觸發 re-render。

```javascript
export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = () => {
    const newPosition = { x: 10, y: 0 };

    // 傳入新物件
    setPosition(newPosition);
  };

  return (
    <>
      <div>
        Position: {position.x}, {position.y}
      </div>
      <button onClick={handleMove}>Move</button>
    </>
  );
}
```

## Immutable Update

這個章節主要會說明如何用 immutable 的方式，從現有資料產生出新資料。

### 物件

- 使用 spread 語法來複製物件，並加上或更新屬性

單層物件

```javascript
const oldObj = { a: 1, b: 2, c: 3 };

const newObj = { ...oldObj, c: 100, d: 500 };

console.log(oldObj); // { a: 1, b: 2, c: 3 }

console.log(newObj); // { a: 1, b: 2, c: 100, d: 500 };
```

巢狀物件

```javascript
const oldObj = {
  a: 1,
  b: 2,
  innerObj: {
    c: 3,
  },
};

const newObj = {
  ...oldObj,
  innerObj: { ...oldObj.innerObj, c: 300 },
};

console.log(oldObj); // { a: 1, b: 2, innerObj: { c: 3 } }
console.log(newObj); // { a: 1, b: 2, innerObj: { c: 300 } }
```

- 使用解構賦值與 rest 語法來剔除物件屬性

```javascript
const oldObj = { a: 1, b: 2, c: 3 };

const { a, ...newObj } = oldObj;

console.log(oldObj); //  { a: 1, b: 2, c: 3 }
console.log(newObj); // { b: 2, c: 3 }
```

### 陣列

- 在陣列的開頭/結尾插入：使用 spread 語法

```javascript
const oldArr = [1, 2, 3];
const newArr = [0, ...oldArr, 4];

console.log(oldArr); // [1, 2, 3]
console.log(newArr); // [0, 1, 2, 3, 4]
```

- 在陣列的中間插入：使用 slice

```javascript
const oldArr = [1, 2, 3, 4];

const insertTargetIndex = 2;
const newArr = [
  // 使用 slice 方法，slice 會回傳切分後的新陣列，不會 mutate 舊有陣列
  ...oldArr.slice(0, insertTargetIndex),
  'ABC',
  ...oldArr.slice(insertTargetIndex),
];

console.log(oldArr); // [1, 2, 3, 4]
console.log(newArr); // [1, 2, 'ABC', 3, 4]
```

- 剔除陣列項目：使用 filter

```javascript
const oldArr = [1, 2, 3, 4];

const insertTargetIndex = 2;
const newArr = oldArr.filter((item) => item !== 2);

console.log(oldArr); // [1, 2, 3, 4]
console.log(newArr); // [1, 3, 4]
```

- 更新或取代項目：使用 map

```javascript
const oldArr = [1, 2, 3, 4];

const insertTargetIndex = 2;
const newArr = oldArr.map((item) => {
  return item === 2 ? 'ABC' : item;
});

console.log(oldArr); // [1, 2, 3, 4]
console.log(newArr); // [1, 'ABC', 3, 4]
```

- 排序陣列項目

`sort` 及 `reverse` 方法會 mutate 既有陣列

```javascript
// 錯誤方法
const oldArr = [16, 1, 7, 1000];

const newArr = oldArr.sort((a, b) => a - b);

console.log(oldArr); // [1, 7, 16, 1000]
console.log(newArr); // [1, 7, 16, 1000]
```

要先複製出一個新陣列，再對新陣列使用 sort

```javascript
// 正確方法
const oldArr = [16, 1, 7, 1000];

const newArr = [...oldArr];
newArr.sort((a, b) => a - b);

console.log(oldArr); // [1, 7, 16, 1000]
console.log(newArr); // [1, 7, 16, 1000]
```

### Immutable update 不需要且不應該使用 deep clone

可能有人會想，既然 React 判定物件或陣列是否有改變時，看的是資料的參考，那麼直接 deep clone 一個物件或陣列就好了，不過這種方法是不推薦、甚至是有害的。

- deep clone 需遍歷整個物件或陣列的每一層，當結構很深時可能耗效能。且許多情況下，我們的需求只是要更新物件的某個部分，其他部分大都不需要變化，使用 deep clone 會造成記憶體與效能的浪費。
- React 中有許多效能優化機制會判斷物件與陣列資料的參考。使用 deep clone 會讓物件、陣列內層沒發生更新的地方也都產生新的參考，這可能讓 React 誤以為這部分的資料也有發生更新，進而導致優化機制失效。

> 總之，最好的方法是逐層在需要更新的地方進行 shallow clone，這樣可以只更新那些真正需要修改的部分。
