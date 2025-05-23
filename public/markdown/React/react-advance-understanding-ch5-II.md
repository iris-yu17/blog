## 前言

這系列文章是一邊閱讀《React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者》，一邊做的筆記摘要。\
由於主要是寫給自己看的筆記，所以會比較精簡，也會省略一些細節說明。從 Chapter 2 ～ Chapter 5，總共會有五篇文章。

- [《React 思維進化》Chapter 2 筆記](./react-advance-understanding-ch2)
- [《React 思維進化》Chapter 3 筆記](./react-advance-understanding-ch3)
- [《React 思維進化》Chapter 4 筆記](./react-advance-understanding-ch4)
- [《React 思維進化》Chapter 5 筆記（上）](./react-advance-understanding-ch5-I)
- [《React 思維進化》Chapter 5 筆記（下）](./react-advance-understanding-ch5-II)

## 5-5 副作用處理常見的情境設計技巧

理想的副作用處理是：「**其造成的影響是可逆的，且無論執行多少次都不會壞掉**」

### 常見的副作用設計問題

1. 疊加性質而非覆蓋性質的操作
2. Race condition（競態條件）
3. Memory Leak

### Fetch 請求伺服器端 API

以下程式碼中，fetchUserData 是非同步的，它會進行一次後端 API 的網路請求，並回傳一個 promise。\
因此當這個 effect 短時間內被連續執行時，可能會有 Race condition（競態條件）問題。\
白話來說就是說假設短時間內打同一支 API 兩次，先打的那次不一定會比後打的那次早得到結果，因為 API 回傳的時間是由當時的網路狀態或伺服器端的處理速度決定的。

```javascript
export default function UserProfile(props) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function startFetching() {
      const data = await fetchUserData(props.userId);
      setUserData(data);
    }

    startFetching();
  }, [props.userId]);

  // ...
}
```

解決方法：\
建立一個簡單的 flag，讓每次 render 的 effect 函式本身都記得自己「是否該忽略 fetch 結果」的 flag。\
這個 flag 變數 `ignoreResult` 預設會是 `false`，當 re-render 時，由於會執行前一次 render 版本的 cleanup 函式，所以會把前一次 effect 函式中的 `ignoreResult` 改為 true。

```javascript
export default function UserProfile(props) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let ignoreResult = false;

    async function startFetching() {
      const data = await fetchUserData(props.userId);

      if (!ignoreResult) {
        setUserData(data);
      }
    }

    startFetching();

    return () => {
      ignoreResult = true;
    };
  }, [props.userId]);

  // ...
}
```

### 控制外部套件

一般來說，若想要串接第三方套件，通常需要先間其功能初始化：\
使用以下方法來確保初始化只執行一次

```javascript
export default function App() {
  const thirdPartyPackageRef = useRef(null);

  useEffect(() => {
    // 自己寫的條件式邏輯，來確保初始化動作不會重複執行
    // 即使這個 effect 函式 重複多次，這個效果也不會壞掉
    if (!thirdPartyPackageRef.current) {
      thirdPartyPackageRef.current = initPackage();
    }
    // 這裡是因為真的沒有依賴才填[]，不是因為想讓它只執行一次
  }, []);
}
```

## 5-6 useCallback 與 useMemo 的正確使用時機

### useCallback 深入解析

其實 **useCallback 本身的效果並不是效能優化**，單就「使用了 useCallback」這件事來說，反而會使效能變得更慢。\
不過雖然 useCallback 的效果並不是效能優化，但它的行為卻能夠**協助 React 其他效能優化手段保持正常運作**。\
（這部分我們在[5-3](./react-advance-understanding-ch5-I#5-3-維護資料的流動：不要欺騙-hooks-的-dependencies)有提到 ，這邊會再說明一次）

#### - useCallback 的呼叫方式

它接收兩個參數：

1. fn：一個函式，我們會傳遞一個依賴 component 內資料（例如 props, state）的函式
2. dependencies：一個陣列，類似 useEffect 的 dependencies，不過在 useCallback 中這是必填的

```javascript
const cachedFn = useCallback(fn, dependencies);
```

#### - useCallback 的運作流程

1. 當 component 第一次 render 時：useCallback 會接收我們傳入的函式及 dependencies 並記憶起來，然後再將我們傳入的函式原封不動地傳回。
2. 當後續 re-render 時：useCallback 會將 dependencies 中的依賴項目與前一次 render 版本比較。
   - 若相同：忽略本次傳入的函式，直接回傳上次 render 時所記憶的舊版函式。
   - 若不同：將新傳入的函式及 dependencies 記憶起來覆蓋舊的版本，並將這次的新函式原封不動的回傳。

#### - 為什麼其實本身不能提供優化效果

我們可以發現，使用了 useCallback，其實每次 render 時，函式都還是會被重新建立，所以並不會因為使用了它而避免不必要的函式產生，而且 dependencies 的比較動作、記憶函式，這些也都造成效能與記憶體的額外消耗。

useCallback 會對函式進行快取（也就是會記住函式），而既然本身反而會使效能變慢，它真正的用途是什麼呢？

### useCallback 的實際使用情境

useCallback 的作用是：讓函式反應資料流的變化\
以下透過說明兩種最常見的實際情境來進行說明。

#### 1. 維持依賴鏈的連動反應

在下面的例子中，useEffect 的 dependencies 效能優化永遠都會失敗，因為每次 render 時都會產生一個新的 fetchData，所以在 dependencies 比較中就會判定依賴有發生更新，而使 effect 函式每次 render 後都會執行一次，即使 query 根本沒變。

甚至這樣的優化效果比沒提供 useEffect 的 dependencies 參數時還糟糕，畢竟比較 dependencies 還是的動作還是要花費效能成本。

```javascript
export default function SearchResults() {
  const [query, setQuery] = useState('react');

  async function fetchData() {
    const result = await fetch(`
    https://foo.com/api/search?query=${query}
    `);
    // ...
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ...
}
```

這個問題的本質是因為在這個 componet 資料流的 `資料` => `函式` => `副作用` 依賴鏈中，`函式` 這個節點無法正確反應資料更新與否（無論 `資料` 有沒有更新，`函式` 都會重新產生），而這連帶導致 `副作用` 無法判斷源頭 `資料` 是否有更新，因為副作用直接依賴的 `函式` 在每次 render 時都發生了改變。

癥結點為：「函式無法正確反應資料更新與否」，因此我們要使用 useCallback 來解決這個問題。

```javascript
export default function SearchResults() {
  const [query, setQuery] = useState('react');

  const fetchData = useCallback(async () => {
    const result = await fetch(`
    https://foo.com/api/search?query=${query}
    `);
    // ...
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ...
}
```

範例中，fetchData 函式依賴了 query 變數，因此我們將 query 填入 useCallback 的 dependencies，當 query 值與前一次 render 不同時，useCallback 才會回傳新版本的函式，fetchData 才會發生改變。

#### 2. 配合 memo：快取 component render 的畫面結果並重用

在 React 中，透過 useEffect 可以做到「當依賴的資料沒改變時就跳過處理」的優化，而 component render 畫面結果的動作也有類似的優化手段，也就是 React 內建的 `memo` 方法：

```javascript
function Child(props) {
  return (
    <>
      <p>Hello, {props.name}</p>
      <button onClick={props.showAlert}>Alert</button>
    </>
  );
}

const MemoizedChild = memo(Child);
```

#### 什麼是 memo

memo 是 React 提供的 higher order component。\
當一個 component 的 props 相同的時候預計都會 render 出一樣的畫面結果時，可以用 memo 來把 component 進行加工。\
如果 props 與前一次 render 時的 props 內容完全相同的話，React 就會跳過本次 render 流程，直接回傳上一次的 render 結果。

簡單來說， memo 會檢查 props 的資料，來幫助判斷 component 是否可以跳過畫面 render 的處理，以達到節省效能成本的目的。

#### 補充：什麼是 higher order component（HOC）

HOC 會接收一個 component 作為參數，然後回傳一個加工後的全新 component。就像一個 component 的加工廠，把一個 component 輸入進去，經過加工後輸出一個有額外功能或資料的 component。

#### memo 問題

然而，memo 也會遇到跟 useEffect 類似的問題：\
當 props 中包含函式型別的屬性，且該函式在每次 render 時都不同的話，memo 的優化效果就無法成功發揮。

如以下範例：\
使用了 memo 來加工 Child，如果 props 跟一次 render 完全一樣的話，就會跳果本次 render 流程。\
但在 Parent 中，showAlert 函式會在每次 render 時都重新產生，因此當它作為 props 傳入 MemoizedChild 時，會被 memo 機制判定是不同的值，導致優化失效。

```javascript
function Child(props) {
  return (
    <>
      <p>Hello, {props.name}</p>
      <button onClick={props.showAlert}>Alert</button>
    </>
  );
}

const MemoizedChild = memo(Child);

function Parent() {
  // 每此 render 時都會重新產生
  const showAlert = () => alert('Hi');

  return <MemoizedChild name="iris" showAlert={showAlert} />;
}
```

這時候 useCallback 又派上用場了：

```javascript
function Child(props) {
  return (
    <>
      <p>Hello, {props.name}</p>
      <button onClick={props.showAlert}>Alert</button>
    </>
  );
}

const MemoizedChild = memo(Child);

function Parent() {
  // 將函式用 useCallback 包起來，就不會每次 render 時都不同值
  const showAlert = useCallback(() => alert('Hi'), []);

  return <MemoizedChild name="iris" showAlert={showAlert} />;
}
```

> 總結 useCallback 的兩個常見使用時機：
>
> 1. 當 component 裡的函式有被 effect 函式呼叫
> 2. 函式會透過 props 傳給一個 memo 過的子元件

### useMemo 深入解析

基本上 useMemo 的用途與使用情境都跟 useCallback 差不多，差別在於：

1. useMemo 用來快取陣列或物件
2. useMemo 本身能真正用於節省計算的效能成本

#### 維持依賴鏈的連動反應

就如 useCallback 能夠將資料流的變動反應到函式一樣，useMemo 可以將資料流的變動反應到物件、陣列。

以下範例中，由於每次 render 時，都會重新產生 numbers 陣列，導致 useEffect 的 dependendies 效能優化失敗；而同樣的原因，也導致 MemoizedChild 的效能優化失敗。

```javascript
function Child(props) {
  return (
    <>
      <p>Hello, {props.name}</p>
      {props.numbers.map((num) => (
        <div>{num}</div>
      ))}
    </>
  );
}

const MemoizedChild = memo(Child);

function Parent() {
  const numbers = [1, 2, 3];

  useEffect(() => {
    console.log(numbers);

    // 副作用的 dependenies 程式，但效能優化失敗
  }, [numbers]);

  // MemoizedChild 的效能優化失敗
  return <MemoizedChild name="iris" numbers={numbers} />;
}
```

解決方法：使用 useMemo 處理

```javascript
function Child(props) {
  return (
    <>
      <p>Hello, {props.name}</p>
      {props.numbers.map((num) => (
        <div>{num}</div>
      ))}
    </>
  );
}

const MemoizedChild = memo(Child);

function Parent() {
  // 將陣列資料以 useMemo 進行快取，這樣 numbers 就不會每次 render 都不同值
  const numbers = useMemo(() => [1, 2, 3], []);

  useEffect(() => {
    console.log(numbers);
  }, [numbers]);

  return <MemoizedChild name="iris" numbers={numbers} />;
}
```

#### 節省計算複雜資料的效能

每當 useMemo 的 dependencies 中的依賴資料有更新時，我們傳給 useMemo 的**計算函式才會被執行**，否則就跳過計算直接回傳之前的快取結果，因此它本身可以用於節省計算複雜資料的效能成本。

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

> 總結 useMemo 的常見使用時機：
>
> 1. 當 component render 時才產生的物件或陣列資料有被 effect 函式所依賴
> 2. 物件或陣列資料會透過 props 傳給一個 memo 過的子元件
> 3. 記住耗時複雜的計算結果

## 5-7 Hooks 的運作思維與設計理念

### Fiber Node

- 相較於 React element 是「描述某個歷史時刻的畫面結構」，會隨著畫面的 re-render 而不斷產生好幾份；Fiber node 是負責「保存並維護 React 應用程式的最新狀態資料」，整個應用程式中只會存在一份。
- 由於 React element 是描述某個歷史時刻的畫面，因次建立後就不會再修改；而 fiber node 是保存**最新的狀態**，所以會隨著資料更新而不斷被修改。

### hooks 的運作是依賴於固定的呼叫順序

假設我們呼叫多次 useState

```javascript
export default function App() {
  const [name, setName] = useState('Iris');
  const [number, setNumber] = useState(100);
  const [flag, setFlag] = useState(false);

  // ...
}
```

我們可以發現：我們只提供了 state 的初始值，並沒有提供 React 這三個 state 分別的命名。

可能有人會疑惑：「不是有用 `name`, `number`, `flag` 來命名了嗎？」但 useState 的回傳值是一個陣列，所以 `name`, `number`, `flag` 這些名稱是 useState 回傳後，我們才以陣列解構的方式重新命名的。

既然沒有告知 React 每個 state 自定義名稱或 key 之類的資訊，那麼 React 內部是如何區分這些資料的存放的？

其實在 fiber node 內部，它存放這些 state 資料是以 linked list 的方式「一個 state 連著下一個 state」來存放的。

```
memoizedState:
  baseState: 'Iris'
  memoizedState: 'Iris'
  next:
    baseState: 100
    memoizedState: 100
    next:
      baseState: false
      memoizedState: false
```

它會依照呼叫順序，一層一層地存放，而這種結構意味著：如果在某次 render 跳過某個 hook 的呼叫，就可能導致後面的呼叫的所有 hook 與前一次 render 無法對應。

如這個[範例](https://codesandbox.io/p/sandbox/react-advance-ch5-7-1-qdnvlx)，點擊按鈕時會使一個 hook 呼叫被跳過。導致兩次 render 之間的 hooks 呼叫順序無法對應：

```
首次 render 時            re-render 時
  [ flag ]                 [ flag ]
  [ foo  ]  <--對應錯誤-->  [ bar  ]
  [ bar  ]  <--對應錯誤-->  [ fizz ]
  [ fizz ]
```

這時 React 會發現 hook 呼叫總量不一致的問題並報錯。

這就是為什麼 React 規定只能在 function component 的頂層作用域呼叫 hook，不能在條件式迴圈中使用它們。**所有 hook 都必須保證在每次 render 都會被呼叫到**，因為一旦有某個 hook 被跳過，後面所有 hook 順序都會跳號，導致 React 內部在存取狀態資料時會有錯置的問題。

### 那要怎麼安全地讓 hook 不再被執行到？

唯一個方法是：unmount 包含了這些 hook 的 component

```javascript
function Foo() {
  useEffect(() => {...});
  // ...
}

function App() {
  const [isFoo, setIsFoo] = useState(true);

  return isFoo ? <Foo/>: <Bar/>
}
```

### 為什麼要將 hook 設計成以順序性的方式來儲存資料呢？

若要儲存、區別資料，大多數人直覺想到的方法應該會是以一個唯一的 key 值。例如：

```javascript
// ❌ 這只是個假想的 API 設計，實際上並沒有這個寫法
const [name, setName] = useState('name', 'Iris');
const [number, setNumber] = useState('number', 100);
const [flag, setFlag] = useState('flag', false);
```

然而這種自定義 key 的設計會有個難以避免的問題 —— **命名衝突**

### 命名衝突

例如以下程式碼，我們自定義了一個 custom hook，裡面使用了 useState 並給了它 `name` 這個 key；而在 MyComponent 我們也使用了 useState 並同樣也給了它 `name` 這個 key。

這就導致兩者之間的命名衝突，因為它們在同一個 component 中使用了相同的 key。這種情況下，useName 和 MyComponent 內的狀態會互相干擾，導致預期之外的行為。

```javascript
// Custom hook
function useName() {
  const [name, setName] = useState('name', 'Alice');
  return [name, setName];
}

// Component 使用 custom hook
function MyComponent() {
  const [name, setName] = useName();
  const [anotherName, setAnotherName] = useState('name', 'Bob');

  // ...
}
```

### 鑽石問題

基於 key 來命名的 hooks 設計也會導致鑽石問題，又稱多重繼承問題，這是命名衝突的進階延伸版。

範例：\
假設我們想在遊戲資料定義「玩家」跟「怪物」兩種類型，而他們都有「位置座標」這個相同的資料概念，我們想要重用這部分：

```javascript
function usePosition() {
  // ❌ 這只是個假想的 API 設計
  const [x, setX] = useState('positionX', 0);
  const [y, setY] = useState('positionY', 0);

  return { x, setX, y, setY };
}

export function usePlayer() {
  const posotion = usePosition();
  // ...
  return { ....., posotion };
}

export function useMonster() {
  const posotion = usePosition();
  // ...
  return { ....., posotion };
}
```

在 `usePlayer` 和 `useMonster` 這兩個 custom hook 中都使用了 `usePosition` 這個 custom hook，而 `usePosition` 裡用 key 的方式來定義 state。

此時當我們的 `GameApp` component 中同時呼叫 `usePlayer` 和 `useMonster` 時，鑽石問題就產生了:

```javascript
import { usePlayer, useMonster } from './hooks';

export default function GameApp() {
  const player = usePlayer();
  const monster = useMonster();

  // ...
}
```

在一個 component 中呼叫 `usePosition` 兩次，它們會在 component 中都嘗試著註冊名為 `positionX` 和 `positionY` 的 hook，導致命名衝突，如下圖：
![Imgur](https://i.imgur.com/YXn1yGD.jpg)

如果是以順序性的方式，基於 hooks 在 component 裡的固定呼叫順序，如：`第一個呼叫的 hook` -> `第二個呼叫的 hook` -> `第三個呼叫的 hook` -> `第四個呼叫的 hook`，它們會自然地形成樹狀結構，不會有鑽石問題：
![Imgur](https://i.imgur.com/59kB5rc.jpg)
