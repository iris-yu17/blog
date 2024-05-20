---
tags: Redux
---

## 前言
### 1. 什麼是 Redux？
官方文件開宗明義第一句就說：

> Redux is a predictable state container for JavaScript apps.
> Redux 是個給 javascript 用的、可預測的狀態容器。

1. `Redux` 並不是 React 專用的，它可以用在 Angular, Vue, 甚至單純 javascript。
2. `Redux` 會儲存並管理狀態。
3. 怎麼說是可預測的呢？在 `Redux` 中，有一套特定的模式來管理狀態，讓我們可以更清楚地知道狀態為何、如何、在哪改變了，來確保狀態的改變是明確且可被追蹤的。

### 2. Redux, Redux-toolkit 和 React-redux
- `Redux`：是用來管理狀態的 javascript 函式庫
- `Redux-toolkit`：讓我們更有效率的撰寫 `Redux`。
  因為 `Redux` 的配置有些複雜，並且有許多重複性高的模板code (boilerplate code)，因此可以用 `Redux-toolkit` 來幫助我們。
- `React-redux`：React 和 `Redux` 是獨立分開運作的，`React-redux` 讓我們可以把兩者合再一起使用。

## Redux 的三個核心概念

### - 三個核心

| 概念      | 說明 |
| -------- | -------- |
| Store    | 狀態     |
| Action   | 形容發生了什麼事     |
| Reducer  | 依 Action 來執行相對應的行為，改變 State     |


### - 日常例子
假設你走進一家蛋糕店，想買三塊蛋糕。
流程是這樣的：
1. 用手機掃描 QrCode，選擇要的蛋糕並下單，你只要透過下單，讓店員知道你要買什麼蛋糕。
2. 而店員會根據你的訂單，執行標準流程：收錢、蛋糕的庫存減三。

### - 以 Redux 來解釋
| 概念      | 例子     |說明|
| -------- | -------- |-------- |
| Store    |蛋糕店       |蛋糕店就像 Store，儲存蛋糕、紀錄收支|
| Action   |下單蛋糕 |可能的 Action 有許多，也許有退貨、使用折價券、下單...等，在例子中顧客下單三塊蛋糕|
| Reducer  |店員         |店員收到訂單，並依據訂單內容（例如 類別：下單，數量：3），執行相對應的流程。|

## Redux 的三個原則
### - 1. 全域的 `state` 會以物件的形式，儲存在一個 `store` 裡面
以蛋糕店的例子，我們的 `state` 就會是
```javascript=1
{
    cakes: 200
}
```

### - 2. `state` 是唯獨的
- 若要更新狀態要發送 `action`，不可以直接去更改 `state` 物件。
- `action` 用來形容發生了什麼事，慣例上會是一個包含 `type` 屬性的物件，若有其他資訊會放在 `payload` 屬性。

以蛋糕店例子，`action` 會是
```javascript=1
{
    type: 'ORDER',
    payload: {
        quantity: 3
    }
}
```

### - 3. 用 `reudcer` 來更新 `state`
- `reducer` 會是一個 function，我們要在裡面定義如何更新 `state`
- `reducer` 基本上就是一個單純的 function，它接收兩個參數(1. 舊的 `state`, 2. `action` 物件)，經過處理後回傳新的 `state`
```javascript=1
// 接收兩個參數：
// 1. 舊的 state
// 2. action
const reudcer = (prevState, action) => {
    // ...
    // 回傳新 state
    return newState
}
```

以蛋糕店例子，`reducer` 可能會像這樣
```javascript=1
const reudcer = (prevState, action) => {
  switch (action.type) {
    case 'ORDER':
    const {quantity} = action.payload;
      return {
          ...prevState,
          cakes: prevState.cakes - quantity
      };
    default:
      return prevState;
  }
};
```
---
> 參考資料：
> https://www.youtube.com/playlist?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3
