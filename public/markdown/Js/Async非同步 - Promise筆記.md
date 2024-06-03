## (1) 為什麼要使用Pormise?

如果想要讓函式依我們想要的順序執行，可以使用callback的方式。
然而callback function有個缺點，就是回呼地獄(callback hell)，簡單來說就是巢狀的callback。

如下所示：
`taskA`裡呼叫`taskB`, `taskB`裡再呼叫`taskC`，`taskC`裡再呼叫`taskD`...
一層層嵌套下去，讓程式變得更複雜，不好理解。

```javascript
taskA(function (a) {
  taskB(a, function (b) {
    taskC(b, function (c) {
      taskD(c, function (d) {
        taskE(d, function (e) {
          // ...
        });
      });
    });
  });
});
```

## (2) 什麼是Promise?

- Promise是用來優化非同步的語法。
- 它是個建構函式，我們會用 `new Promise()` 來創造一個Promise物件。
- 依字面來說，Promise就是承諾的意思，它的結果有兩個：(1)履行承諾 或者 (2)不履行承諾
- 例如我們要從資料庫取得一筆資料，可以用Promise的寫法，當承諾的工作(發送請求)完成時，可能的結果有兩個：(1)請求成功 或者 (2)請求失敗

## (3) Promise怎麼寫?

### - step1. 創建實例

```javascript
const myPromise = new Promise()
```

### - step2. 函式參數

`Promise()` 需傳入一個函式作為參數，而這個函式會有兩個參數：resolve和reject，這2個東西也都是函式。
(resolve, reject是形式參數，習慣上用這兩個名稱，要用別的名稱也可)

```javascript
const myPromise = new Promise((resolve, reject) => {

})
```

### - step3. resolve和reject

> promise會有以下三種狀態
>
> 1. pending - 初始狀態 (進行中)
> 2. fulfilled - 事件已完成
> 3. rejected - 事件已失敗

若成功就呼叫`resolve()`，promise變成fulfilled狀態
失敗則呼叫`reject()`，promise變成rejected狀態

```javascript
const myPromise = new Promise((resolve, reject) => {
  if (success) {
    resolve();
  } else {
    reject();
  }
})
```

`resolve()` `reject()` 中也可傳入參數

```javascript
const myPromise = new Promise((resolve, reject) => {
  if (success) {
    resolve('yeeee!!!');
  } else {
    reject(new Error('Something went wrong!'));
  }
})
```

### - step4. 使用promise物件

在Promise完成任務後，要怎麼處理Promise回傳的資料呢？
現在範例裡的`myPromise` 是用 `new Promise()` 創造出來的promise物件，它可以使用promise物件裡的方法 `then` 和 `catch`。

#### `then()`

可以用來綁定當 fulfilled 或 rejected 狀態時，分別要執行的函數。

> `then()`接受兩個函式作為參數：
>
> 1. 第一個函式是當 Promise 狀態變為fulfilled(成功)時會被調用
> 2. 第二個函式是當 Promise 狀態變為rejected(失敗)時會被調用，這個參數是選擇性的不一定需要

```javascript
myPromise.then(
  function (value) {
    // 當狀態是 fulfilled時，執行這個函式
    // value 是透過 resolve() 傳進來的參數

  },
  function (error) {
    // 當狀態是 rejected時，執行這個函式
    // error 是透過 reject() 傳進來的參數
  }
);
```

#### `catch()`

可以用 `catch()` 來綁定當 rejected 狀態時，要執行的函數。

```javascript
myPromise.catch(
  function (error) {
    // 當狀態是 rejected時，執行這個函式
    // error 是透過 reject() 傳進來的參數
  }
);
```

### 補充

- 在大部分情況下，開發者習慣僅使用`then()`來綁定成功的結果，失敗的部分則寫在`catch()`
- 可串連多個 `then()`，它會依照同步流程的原則，一步一步往下執行。

```javascript
const example = new Promise((resolve, reject) => {
  // 會隨機產生數字0或1或2 (0代表失敗, 1,2代表成功)
  const success = Math.floor(Math.random() * 3);

  if (success) {
    resolve(success);
  } else {
    reject(new Error('Something went wrong!'));
  }
});

// 非同步動作：把值乘以2，會回傳一個promise
function doubleValue(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value * 2)
    }, 1000);
  })
}

example
  .then(
    function (value) {
      // 當狀態是 fulfilled 時執行

      // return doubleValue的promise到下一個then
      return doubleValue(value)
    })
  .then(
    function (result) {
      console.log(result)
    })
  .catch(
    function (error) {
      // 當狀態是 rejected 時執行
    }
  );
```

---

參考資料
- https://www.casper.tw/development/2020/02/16/all-new-promise/
- https://www.fooish.com/javascript/ES6/Promise.html
