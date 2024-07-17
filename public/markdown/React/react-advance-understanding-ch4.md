## 前言

這系列文章是一邊閱讀 《React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者》，一邊做的筆記摘要。\
從 Chapter 2 ～ Chapter 5，總共會有四篇文章。

## 4-1 Component 的生命週期

我們通常說的 component 生命週期，準確來說是「一個 component 實例的生命週期」\
主要分為三個階段：`Mount`, `Update`, `Unmount`。

### - Mount

就是「新畫面區塊的產生」\
當 component 以 React element 形式在畫面中首次出現時，就會發起 mount 流程。

流程如下：

1. 以 component function 建立一個 React element。當 React 內部沒有這個節點，代表這是新的畫面，就會啟動 mount 流程。
2. Render phase:
   - 執行 component function，以 props, state 等資料來產生初始畫面的 React element
   - 將產生好的 React element 交給 commit phase 處理
3. Commit phase：
   - 由於是第一次 render，瀏覽器中還沒有對應的 DOM element，因此會將此 React element 全部轉換為實際 DOM，並使用 `appendChild()` 放到畫面中。
   - Commit phase 執行完成後，代表畫面已經「掛載」到實際瀏覽器畫面了。此時才能從瀏覽器 DOM 結構中找到這個元件所對應的 DOM element。
4. 執行本次 render 所對應的副作用處理：
   - 也就是在 `useEffect` 裡定義的 effect 函式。

### - Update

是指 component 正存在於畫面中，且再次重新渲染的流程，也就是「re-render」或「reconciliation」。\
無論是元件本身 state 更新而觸發的 re-render、或是因父層元件的 state 更新而觸發子元件的 re-render，update 的流程細節都是相同的。

流程如下：

1. Render pahse：
   - 再次執行 component function，以新的 props 和 state 等資料，來重新產生新版本的 React element 畫面。
   - 將新版 React element 與舊版做比較，找出差異之處。
   - 將差異之處交給 commit phase 做處理
2. Commit phase：
   - 只去操作差異之處所對應的實際 DOM
3. 清除前一次 render 版本的副作用影響：
   - 也就是執行 useEffect 裡的 cleanup 函式
4. 執行本次 render 所對應的副作用處理：
   - 也就是在 `useEffect` 裡定義的 effect 函式。

### Unmount

當新一次的 render 畫面結構中，有個 compoment 與前一次相比不見了，React 就會認為該 component 該被 unmount。

1. 執行 component 最後一次副作用處理所對應的 cleanup 函式
2. 將 componet 所對應的實際 DOM element 從瀏覽器移除
3. 在 React 內部移除對應的 component 實例，也就是移除該 fiber node，同時 component 實例內的所有 state 等狀態資料都會被丟棄
