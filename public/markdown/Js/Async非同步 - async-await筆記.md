## (1) 什麼是 async/await

> async/await 是 promise 的語法糖，讓程式變得更好理解與閱讀。

如以下範例，都是獲取資料，把它轉為json格式，並印出來。
相較於 promise，async/await 的寫法直觀、好理解許多。

### promise寫法

```javascript
function getData() {
  sendRequest()
    .then((rawData) => {
      return rawData.json();
    })
    .then((data) => {
      console.log(data)
    })
}
```

### async/await寫法

```javascript
async function getData() {
  const rawData = await sendRequest();
  const data = await rawData.json();
  console.log(data);
}
```

## (2) 說明

- 用 async 關鍵字來定義這個函式是非同步的
- 只有在 async function 裡才可以使用 await 關鍵字。
- 在非同步函式前面加上 await，代表要等待這個非同步行為完成，才繼續往下執行。
- 如上面範例中的 `sendRequest()` 和 `rawData.json()` 這兩個都是非同步函式。所以我們要在前面加上 await，等 `sendRequest()` 完成，得到 rawData 後，再執行 `rawData.json()` 把 rawData 轉為 json 格式。

## (3) async/await怎麼寫

範例：先創建一個 `sendRequest` 函式，模擬向伺服器發送請求，取得user name。

```javascript
function sendRequest() {
  return new Promise((resolve, reject) => {
    // 會隨機產生數字0或1, 來決定是否請求成功
    const success = Math.floor(Math.random() * 2);
    setTimeout(() => {
      if (success) {
        resolve('Jon Snow');
      } else {
        reject(new Error('something went wrong'));
      }
    }, 1000);
  })
}
```

### - step1. 創建 async function

```javascript
// 使用 async 關鍵字
async function getUserData () {

}
```

### - step2. 使用await

```javascript
async function getUserData() {
  const userData = await sendRequest();
  // 會等到非同步事件 sendRequest() 完成後，才執行console.log
  console.log(userData)
}
```

### - step3. 錯誤處理

使用 `try...catch` 捕捉錯誤，語法如下：

```javascript
try {
 // 欲執行的程式碼
} catch(e) {
 // 當錯誤發生時，欲執行的程式碼
}
```

```javascript
async function getUserData() {
  try {
    const userData = await sendRequest();
    console.log(userData)
  } catch (err) {
    console.log(`ERROR: ${err}`)
  }
}
```

---

參考資料
- https://www.youtube.com/watch?v=zoZiQJ38bXk
