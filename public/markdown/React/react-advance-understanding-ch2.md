> 這系列文章是一邊閱讀 《React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者》，一邊做的筆記摘要。\
> 從 Chapter 2 ～ Chapter 5，總共會有四篇文章。

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

### React 的畫面繪製機制

分成兩個階段

1.  Reconciler
    - 負責定義並產生 React element 來描述預期的 DOM 結構
    - 比較 React element 差異之處，並交給 renderer 做處理
2.  Rerenderer
    - 負責將畫面結構的描述繪製成實際畫面
    - 在瀏覽器環境中，renderer 就是 `react-dom`，將 React element 會製成實際 DOM
    - 將 reconciler 比較出來的差異，同步到真實畫面中

### 這樣拆分階段的好處

由於分為「定義及管理畫面描述（Reconciler）」和「將畫面結構描述繪製成實際畫面成品（Rerenderer）」兩個階段，只要有支援其他環境的 Rerenderer 配合，React 也可以用於產生其他環境的畫面。

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

- 策略一
  當資料更新後，人工判斷並手動修改所有受牽連的 DOM
  優點：只修改受牽連的 DOM，減少多餘的 DOM 操作所造成的效能浪費
  缺點：依靠人為判斷，在大型且複雜專案中不可靠，且難除錯

- 策略二
  當資料更新後，將 DOM element 全部清除，再全部重繪
  優點：開發者只需專注在資料處理，要維持單線資料流非常直覺簡單
  缺點：一律全部重繪，大量 DOM 操作造成不必要的效能浪費

### 前端框架的策略

- Vue：使用的是第一種，綁定並監聽資料改變，只更新那些受影響的 DOM。不需自己去尋找、操作特定 DOM element。
- React：使用的是第二種，創造虛擬 DOM，比較虛擬 DOM 的改變，然後只更新有改變的真實 DOM。

## React 的渲染策略 - 一律重繪

- 一律重繪的是 Virtual DOM，只要資料有改變就一律重繪
- re-render 指的就是 Virtual DOM 的重繪
- React 會以 component 作為一律重繪的切分單位，重繪該 state 所屬的 component 以及它底下的所有子孫 components。
