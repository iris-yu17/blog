## 狀態管理方式：Flux v.s. Atomic

### Flux

- 集中管理 state，像是一個中央儲藏室一樣，統一存放 state
- 需要預先定義好整體應用的 state 結構，以及更新這些 state 的方法...等。所有的狀態變化都必須透過明確定義好的流程處理
- 適用於較大的應用，需要清晰可追蹤的資料流

### Atomic

- 就像把狀態分割成一個一個原子，散落在應用程式中
- 每個 atom（原子）是獨立的 state，可以單獨建立、更新
- 按需建立（on-demand create）：不需要像 Flux 一開始就定義整個應用程式的 state
- 更像是函式式的思維，以 atom 為最小單位，自由組合與拆解


## 基本使用方式： `Atom()` 及 `useAtom()`

Jotai 中，我們會用 `atom()` 方法來創建 atom；並用 `useAtom()` 來使用 atom。
`useAtom()` 的用法類似 `useState()`，會回傳這個 atom 當前的值，與 updating function。
 
```javascript
import { atom, useAtom } from 'jotai';

// 創建 atom
const counter = atom(0);

export default function Page() {
  // 使用 atom
  const [count, setCounter] = useAtom(counter);
  // 用 updating function 更新 atom
  const onClick = () => setCounter(prev => prev + 1);

  return (
    // ...
  )
}
```

## Primitive Atom & Derived Atom

- atom 分為兩種類型：Primitive atom（原始 atom）和 Derived atom（衍生 atom）
- `atom()` 最多可傳入兩個參數，依據傳入的參數，來創建 Primitive 或是 Derived atom

### - Primitive atom（原始 atom）

當只傳入一個參數，且此參數非函式時，就是 Primitive atom。
是最基本、最單純的 atom，可以直接讀取、更新它的值。
它是其他 Derived atom 的「來源」。

```javascript
// 只傳入一個參數 0, 創建一個 Primitive atom
const counter = atom(0);

// 可以直接讀取, 更新 atom
const [count, setCounter] = useAtom(counter);
```

###  - Derived atom（衍生 atom）

可分為三種：`Read-only atom`, `Write-only atom` 以及 `Read-Write atom`

#### 1. Read-only atom

Read-only atom 的值是唯讀的，我們不能直接改變它的值，因為它的值是依賴其他 atom 而來的。

使用方式：
- 在 `atom()` 中傳入一個參數，且該參數為函式，我們稱它 `readFunction`
- 在這個 `readFunction` 裡定義讀取的邏輯，它有個 `get` 參數，我們可使用 `get` 來取得其他 atom 的值

語法：
```javascript
const readAtom = atom(
  (get) => {...} // readFunction
)
```

範例：

```javascript
import { atom, useAtom } from 'jotai';

// primitive atom
const friendsStatus = atom([ 
  { name: "John", online: true },
  { name: "David", online: false },
  { name: "Micheal", online: true } 
]);

// read-only atom，裡面讀取了 friendsStatus
const onlineFriends = atom((get) => get(friendsStatus).filter((item) => item.online));

export default function Page() {

  const [onlineList] = useAtom(onlineFriends);
  
  return (
    <ul>
      {onlineList.map(({name})=> <li key={name}>{name}</li>)}
    </ul>
  )
}
```

#### 2. Write-only atom

我們可以使用 Write-only atom 來修改 atom 的值

使用方式：
- 在 `atom()` 中傳入兩個參數，第一個參數為 `null`，第二個參數為函式，我們稱它 `writeFunction`
- 在`writeFunction` 裡定義寫入的邏輯，它有三個參數 `get` `set` `update`
    - `get`: 用來取得其他 atom 的值
    - `set`: 用來設定 atom 的值，它又接收兩個參數，第一個是要修改的 atom，第二個是新的值
    - `update`: 呼叫 Write-only 方法時，傳入的參數，類似 payload


語法：
```javascript
const readAtom = atom(
  null,
  (get, set, update) => {...} // writeFunction
)
```

範例：
```javascript
import { atom, useAtom } from "jotai";

const countAtom = atom(0)
const incrementAtom = atom(null, (get, set, update) => {
  // set 的參數:
  // set(要修改的 atom, 新的值)
  set(countAtom, get(countAtom) + update)
})

const App = () => {
  const [count] = useAtom(countAtom);
  const [, increment] = useAtom(incrementAtom);
  const onClick = () => {
    // 這邊傳入的 2 就是 atom() 中的 update
    increment(2)
  }
  return <>
    <div>{count}</div>
    <button onClick={onClick}>Add</button>
  </>
};

export default App;
```

可能會有人疑惑，為何不直接更新 atom 就好了，要用 Write-only atom 來更新。原因如下：
當元件透過 `useAtom(someAtom)` 使用某個 atom 時，它就會訂閱該 atom，導致當 atom 值更新時，元件重新渲染。
但 write-only atom 自身不儲存值、不可讀取，因此元件不會訂閱它，只是單純觸發 atom 更新，所以不會造成重繪。
簡單來說，可以避免不必要的重新渲染。

#### 3. Read-Write atom

可用來讀取、修改 atom 的值。

使用方式：
- 在 `atom()` 中傳入兩個參數，這兩個參數都是函式
- 第一個函式同 Read-only atom 的 `readFunction`
- 第二個函式同 Write-only atom 的 `writeFunction`

語法：
```javascript
const readAtom = atom(
  (get) => {...}, // readFunction
  (get, set, update) => {...} // writeFunction
)
```

範例：
```javascript
import { atom, useAtom } from "jotai";

// 創建 primitive atom
const countAtom = atom(100);

// 創建 Read-Write atom
const readWriteAtom = atom(
  (get) => get(countAtom) * 2,
  (get, set, update) => {
    set(countAtom, update + 1)
  }
)

const App = () => {
  const [number, setNumber] = useAtom(readWriteAtom);
  const onClick = () => {
    setNumber(2)
  }
  return <>
    <div>{number}</div>
    <button onClick={onClick}>update</button>
  </>
};

export default App;
```