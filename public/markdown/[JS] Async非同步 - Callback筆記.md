## (1) 同步與非同步

### - 同步(synchronous)

**簡單來說，就是一次只做一件事情。**
會一個任務接著一個任務執行：完成任務A後，再執行任務B，完成任務B後，再執行任務C...。
這會造成執行阻塞，假設任務B需要很長時間處理，那麼執行就會卡在這邊，後面的任務C、D、E必須等到任務B完成後才能執行，浪費許多時間。

### - 非同步(asynchronous)

**非同步則是一次執行好幾件事。** 不需要等到前一件事情做完才做下一件事情。
假如任務B需要許多時間處理，那麼可以先執行C、D、E。

---

## (2) 什麼是Callback function？

Callback function又稱為回調、回呼函式。

> **假設我們有幾件事要做**：
>
> 1. 任務A：下載圖片，下載完顯示到畫面上
> 2. 任務B
> 3. 任務C

> **執行順序會如下：**
>
> - 執行任務A，等待圖片下載的同時，先執行任務B、C。
> - 把"顯示圖片"這件事放到callback queue裡面，待會再來做。
> - 等下載完成了，就會執行放在callback queue裡的"顯示圖片"，這個舉動就是回調(callback)，而"顯示圖片"就是callback function。

不同於一般函式會被直接呼叫，我們會把callback function當作另一個函式的參數傳入，在另一個函式裡呼叫它。

```javascript=1
// 一般函式: 直接調用
showAlert();

// callback: 作為參數
setTimeout(showAlert, 3000);
```

---

## (3) Callback function 的使用

> **二項CallBack的必要條件：**
>
> 1. 讓函式成為另一個函式的參數
> 2. 讓函式控制參數函式的執行時機

範例：
有以下兩個函式，我們想要先印出 `this is task A` 再印出 `this is task B`

```javascript=1
function taskA() {
  setTimeout(function () {
    console.log("this is task A");
  }, 3000);
}

function taskB() {
  console.log("this is task B");
}
```

若直接呼叫`taskA`再呼叫`taskB`

```javascript=1
taskA();
taskB();
```

結果會變成：

```
// 先印出
this is task B

// 三秒後
this is task A
```

**Callback作法**

- taskA要接收一個參數(且此參數是一個函式)
- taskA執行完自己要做的事後，再呼叫這個函式參數
- 把taskB作為參數傳入taskA

```javascript=1
function taskA(callback) {
  setTimeout(function () {
    console.log("this is task A");

    // 控制參數函式的執行時機(印出this is task A後，才執行taskB)
    callback(); // 這邊的callback就是taskB
  }, 3000);
}

function taskB() {
  console.log("this is task B");
}

// taskB作為參數傳入
taskA(taskB)
```

---

> 參考資料

- https://www.youtube.com/watch?v=8aGhZQkoFbQ
- https://medium.com/itsems-frontend/javascript-sync-async-22e75e1ca1dc
- https://medium.com/appxtech/%E4%BB%80%E9%BA%BC%E6%98%AFcallback%E5%87%BD%E5%BC%8F-callback-function-3a0a972d5f82
