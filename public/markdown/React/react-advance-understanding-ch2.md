## 前言

這系列文章是一邊閱讀 《React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者》，一邊做的筆記摘要。\
由於主要是寫給自己看的筆記，所以會比較精簡，也會省略一些細節說明。從 Chapter 2 ～ Chapter 5，總共會有五篇文章。

- [《React 思維進化》Chapter 2 筆記](./react-advance-understanding-ch2)
- [《React 思維進化》Chapter 3 筆記](./react-advance-understanding-ch3)
- [《React 思維進化》Chapter 4 筆記](./react-advance-understanding-ch4)
- [《React 思維進化》Chapter 5 筆記（上）](./react-advance-understanding-ch5-I)
- [《React 思維進化》Chapter 5 筆記（下）](./react-advance-understanding-ch5-II)

## 2-1 DOM 與 Virtual DOM

### 什麼是 DOM？為何操作 DOM 是效能成本昂貴的動作？

DOM 是一種是樹狀資料結構，用來表示瀏覽器畫面中的元素。\
操作 DOM 會連動瀏覽器的渲染引擎重繪畫面，因而效能成本昂貴。

### Virtual DOM 是什麼？

Virtual DOM 就是描述、模擬實際的 DOM，本身也是一種是樹狀資料結構。

一個常見的錯誤觀念是：Virtual DOM 是複製真實 DOM 的資料。實際上應是反過來，先用 Virtual DOM 定義好期望的畫面，再依據 Virtual DOM 操作真實 DOM。

### Virtual DOM 如何減少效能成本？

當畫面需要更新時，可以透過產生新的 Virtual DOM 結構，並比較新舊的差異，來執行最小範圍的 DOM 操作，已漸少效能成本。

## 2-2 React element

React element 是 React 中組成畫面的最小元素，它是一個物件，裡面包含了元素的標籤、id、屬性...等，用來描述真實 DOM 元素結構。意義上來說就是 Virtual Dom。

React 中有個 `createElement` 方法，就是用來產生 React element 的，而 React element 會再經由 React 處理轉換，變成實際的 DOM element。

React element 一旦建立後就無法被修改，因為它是在描述某個歷史時間點的畫面結構。\
若要產生新畫面，應是建立全新的 React element，而不是修改舊有的，這樣才有 Virtaul DOM 新舊版本的比較依據。

## 2-3 Render React element

首先要知道什麼是 `react-dom`，它是 React 官方開發並維護的套件，能夠把 React element 轉換並繪製成實際的 DOM element。

### React 的畫面處理流程

分成兩個階段

1.  Reconciler
    - 負責定義並產生 React element 來描述預期的 DOM 結構
    - 比較 React element 差異之處，並交給 renderer 做處理
2.  Renderer
    - 負責將畫面結構的描述繪製成實際畫面
    - 在瀏覽器環境中，renderer 就是 `react-dom`，將 React element 繪製成實際 DOM
    - 將 reconciler 比較出來的差異，同步到真實畫面中

### 這樣拆分階段的好處

由於分為「定義及管理畫面描述（Reconciler）」和「將畫面結構描述繪製成實際畫面成品（Renderer）」兩個階段，只要有支援其他環境的 Renderer 配合，React 也可以用於產生其他環境的畫面。\
因此能達到官方所說 "Learn once, write anywhere" 的效果。
例如：`react-dom` 是用於瀏覽器環境，能夠將 React element 轉為 DOM；`react-native` 則能產生原生 Android/iOS App 畫面。

## 2-4 JSX 根本不是在 JavaScript 中寫 HTML

在 React 中，會使用 createElement 方法來產生 React element，而 JSX 就是 createElement 的替代方法，讓開發者更直觀、簡單地創建 React element。\
**JSX 其實就是在呼叫 `React.createElement`。**

## 2-5 JSX 的語法規則脈絡與畫面渲染的實用技巧

### 為什麼 JSX 語法第一層只能有一個節點

例如以下這段 JSX 語法是不合法的，因為 JSX 其實就是呼叫 `React.createElement`，而它只會回傳一個元素。\
另外，若以樹狀結構的觀點去思考，就能發現這是因為「樹狀結構只能有一個根節點」。

```javascript
const element = (
    <button>foo<button>
    <div>bar<div>
)
```

## 2-6 單向資料流與一律重新渲染策略

### 單向資料流

在單向資料流的概念中，資料的傳遞是**單向**且**不可逆**的。\
在前端的情境，就是界定原始資料與畫面結果的因果關係：只有資料改變時，畫面才會有變動；並且畫面（也就是 Dom 元素）也不允許透過互動去逆向修改資料的源頭。\
以此可以確保「資料」是畫面變動的主要變因。而畫面不會逆向去改變資料，因此資料的改變只會來自於**開發者手動的觸發資料更新**

### 實現單向資料流的兩種 DOM 策略

- 策略一\
  當資料更新後，人工判斷並手動修改所有受牽連的 DOM\
  優點：只修改受牽連的 DOM，減少多餘的 DOM 操作所造成的效能浪費\
  缺點：依靠人為判斷，在大型且複雜專案中不可靠，且難除錯

- 策略二\
  當資料更新後，將 DOM element 全部清除，再全部重繪\
  優點：開發者只需專注在資料處理，要維持單線資料流非常直覺簡單\
  缺點：一律全部重繪，大量 DOM 操作造成不必要的效能浪費

### 前端框架的策略

- Vue：使用的是第一種，綁定並監聽資料改變，只更新那些受影響的 DOM。不需自己去尋找、操作特定 DOM element。
- React：使用的是第二種，創造虛擬 DOM，比較虛擬 DOM 的改變，然後只更新有改變的真實 DOM。

### React 的渲染策略 - 一律重繪

- 一律重繪的是 Virtual DOM，只要資料有改變就一律重繪
- re-render 指的就是 Virtual DOM 的重繪，而**不是實際 DOM**
- React 會以 component 作為一律重繪的切分單位，重繪該 state 所屬的 component 以及它底下的所有子孫 components。

## 2-7 Component 初探

### Component 的 render 順序

範例程式碼在[這邊](https://codesandbox.io/p/sandbox/react-advance-2-7-nfttzt)\
在這個範例中，我們定義了三層 component，並且他們渲染時都會印出該 component 的名字。

```javascript
function Component1() {
  console.log('render Component 1');
  return (
    <>
      <h1>Component 1</h1>
      <Component2 />
      <Component2 />
    </>
  );
}

function Component2() {
  console.log('render Component 2');
  return (
    <>
      <h2>Component 2</h2>
      <Component3 />
      <Component3 />
    </>
  );
}

function Component3() {
  console.log('render Component 3');
  return (
    <>
      <h3>Component 3</h3>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Component1 />
    </div>
  );
}
```

component 的 render 是由外至內的，React 會依據結構依次呼叫子 Component，並且等待子 component 執行完成後，再處理下一個子 component。\
因此最後 console 結果會如下：

```
render Component 1
render Component 2
render Component 3
render Component 3
render Component 2
render Component 3
render Component 3
```

## 2-8 React 畫面更新的發動機：state 初探

### 什麼是 state

前面講到，單向資料流是指資料的流動方向是單一的、不可逆的，它常跟「以資料驅動畫面」的概念綁在一起，他們兩個是相輔相成的。\
總之，當**資料**改變時，畫面才產生改變，而 React 中，state 就扮演這個**資料**的角色。

### state 和 component

React 採用一律重繪的策略來達到單向資料流，但前端程式可能很龐大，不可能因為一個資料改變就把整個應用程式重繪。\
因此，React 會以 component 當作 state 機制運作的載體以及一律重繪的界線。state 必須依附於 component 身上運作，當 state 改變觸發重繪時，只重繪此 component（以及子 component）的畫面區塊。

### 為何 useState 的回傳值是一個陣列

這個問題我從沒想過，在書上看到覺得恍然大悟，原來原因這麼簡單。\
以 API 開發者的角度，若讓回傳值為一個物件會怎麼樣？

```javascript
// 假設回傳值是一個物件
const { state, setState } = useState(0);
```

開發者會需要自訂變數名稱，因此要對解構賦值的變數重新取名，這樣語法撰寫不簡潔，所以才將 useState 設計成回傳陣列。

```javascript
const { state: count, setState: setCount } = useState(0);
const { state: name, setState: setName } = useState('Iris');
```

## 2-9 React 畫面更新的流程機制：reconciliation

### Render phase 和 Commit phase

React component 的管理機制分為兩個階段：

1. Render phase:

   - 代表 component 正在渲染，並且產生 React element 的階段。
   - 在這階段，Reconciler 會負責：調用 component function、產生 React element、計算新舊改變。

2. Commit phase:

   - 代表 component 正在將 React element 的畫面「提交」並處理到實際的 DOM 當中。
   - 在這階段 Renderer 會負責將虛擬 DOM 繪製成實際 DOM。

### Reconciliation

React 中，我們通常會把「畫面更新的流程」稱為 Reconciliation。\
我們知道：要使用 `setState` 來更新 `state`；且當 `state` 的值有變時，就會觸發 re-render，更新畫面。\
那具體到底發生什麼事呢？

用三個步驟來說明：

1. 呼叫 setState 方法\
   這時候 React 會執行 `Object.is()` 來比較新傳入的 state 值是否有變。\
   若沒有，就中斷流程；若有，就會發起 component 的 re-render。
2. 更新 state 並 re-render componet\
   React 會以新的值來設定 state，並且重跑一次 component function，產生一份新版的 React element。
3. 比較差異，並更新畫面\
   React 會比較新舊版的 React element，找出實際需要被更新的 DOM，並進行更新。

我們以計數器為例子，再說明一次：

```javascript
export function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={decrement}> - </button>
      <div>{count}</div>
      <button onClick={increment}> + </button>
    </>
  );
}
```

1. 呼叫 setCount 來更新 state，舊有的值為 0，給定的新值為 1，執行 `Object.is(0, 1)` 來判斷兩個值是否相同，得到 false，順利觸發 re-render
2. count 值更新為 1，並重新執行 Counter()，產生一份新版的 React element。
3. 比較差異，發現只有 `<div>` 內數字改變，因此只處理此對應的實際 DOM 更新，也就是將 `<div>0</div>` 更新為 `<div>1</div>`。
