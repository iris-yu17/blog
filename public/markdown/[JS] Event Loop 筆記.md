## 基本概念

首先要先知道幾個概念：

1. 棧 (Stack)：
   - 一種資料結構，特性為後進先出(LIFO)。
   - 當函式執行時，會被放到 stack 最上面，執行完成後移除，接著往下執行下個函式，直到 stack 清空。
2. 列隊 (Queue)：
   - 一種資料結構，特性為先進先出(FIFO)。
   - 待處理的任務會被放到 Queue 裡面，當 Stack 清空時，才會去執行 Queue 裡的任務。
   - Queue 裡會儲存待處理的非同步操作，例如：定時器、事件處理程序回調等。所以在事件循環中，也會稱它為 Callback Queue 或是 Task Queue。
3. 事件循環 (Event Loop)：
   不斷檢查 Stack 是否為空，若為空就把 Queue 裡的任務放到 Stack 中執行，如此循環往復。
4. Web API：Web API 是瀏覽器提供的方法，例如：`setTimeout`、`XMLHttpRequest` ...等，運作於瀏覽器端，並不是 JavaScript 引擎的一部分，所以他們可以同時執行。

```
 {Call Stack}                   {Web API}
 -------------           -----------------------
|             |         |  e.g. setTimeout()    |
|             |          -----------------------
|             |
| [functionA] |               {Task Queue}
| [functionB] |     -----------------------------------
| [functionC] |    | [task1] [task2] [task3]           |
 -------------      -----------------------------------
```

## 事件循環步驟

### - Step1. 執行 Call Stack

由上而下執行 Call Stack 裡的內容

### - Step2. 檢查 Call Stack

檢查 Stack 是否為空，如果它為空，表示目前沒有待處理的同步程式碼。
如果遇到異步任務，執行環境會調用相關的 API (例如在瀏覽器上會調用 Web API)，等待此異步任務的結果之後，再被放置到 Task Queue 中。

### - Step3. 讀取 Task Queue

事件循環接下來會讀取 Task Queue，並將任務隊列第一個，加到執行棧中運行。

### - 循環此流程

當 Call Stack 為空，就讀取 Task Queue，不斷重複這個步驟，直到所有任務完成。

## 宏任務 (Macro Task) 與微任務 (Micro Task)

- JavaScript 中的異步任務又分成宏任務和微任務。
- 宏任務一次只執行 "一個"
- 如果有微任務，就依序執行完 "所有" 微任務

### 常見的宏任務與微任務

- 宏任務：`Script` (整體程式碼)、 `setTimeout` 、`setInterval`、UI渲染、事件
- 微任務：`Promise` 的 `then` 方法、`MutationObserver`

## 練習

### 題目ㄧ

#### 下面這段程式碼的 console 結果為何？

```javascript=1
console.log(123);

setTimeout(() => {
  console.log("Hello");
}, 1000);

console.log("World");
```

#### 解答

```javascript=1
123
"World"
"Hello"
```

#### 說明

1. 依順序執行程式碼，先印出 `123`
2. 往下到 setTimeout，把 setTimeout 放到 Stack
3. 把 setTimeout 從 Stack 取出，交由 Web API 處理
4. 再往下執行，印出 `World`
5. 過了 1000 毫秒，把 setTimeout 裡面的 callback function 放到 Queue 裡。
6. 此時 Stack 裡已沒東西，讀取 Queue，印出 `Hello`

### 題目二

#### 下面這段程式碼的 `console` 結果為何？

```javascript=1
console.log("begins");

setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => {
    console.log("promise 1");
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("promise 2");
  setTimeout(function () {
    console.log("setTimeout 2");
    resolve("resolve 1");
  }, 0);
}).then((res) => {
  console.log("dot then 1");
  setTimeout(() => {
    console.log(res);
  }, 0);
});
```

#### 解答

```javascript=1
"begins"
"promise 2"
"setTimeout 1"
"promise 1"
"setTimeout 2"
"dot then 1"
"resolve 1"
```

#### 說明

1. 依順序執行程式碼，因此先印出 `begins`
2. 接著跑到 setTimeout，把它放到 Task Queue
3. 再往下走，執行 new Promise 裡的內容，會印出 `promise 2`
4. 又遇到 setTimeout，把它放到 Task Queue
5. 此時主線程 (Stack) 空了，去看 Task Queue 的任務，Task Queue 有兩個 setTimeout (兩個都是宏任務)
6. 先執行第一個 setTimeout，因此會印出 `setTimeout 1`，往下遇到 Promise.resolve，把它放到 Task Queue
7. 由於宏任務一次只執行一個，因此不會再執行第二個 setTimeout，而是去看有沒有微任務。
8. 發現 Task Queue 裡此時有第 6 步放進的 Promise.resolve，所以印出 `promise 1`
9. 再回來執行宏任務 setTimeout，印出 `setTimeout 2`
10. 呼叫 resolve 所以進入到 .then 於是印出 `dot then 1`
11. 又有一個 setTimeout，把它放到 Task Queue。此時 Stack 是空的，Task Queue 也沒有微任務了，因此執行 setTimeout，印出 `resolve 1`。

> 參考資料
> https://www.explainthis.io/zh-hant/swe/js-event-loop-questions
