### 題目

紅燈三秒亮一次，綠燈兩秒亮一次，黃燈一秒亮一次；如何讓三個燈不斷交替重複亮燈？

如下面這樣：\
過三秒 `紅` 過兩秒 `綠` 過一秒 `黃` 過三秒 `紅` 過兩秒 `綠` .....

三個亮燈函數已經存在：

```javascript
function red() {
  console.log('red    - ', new Date());
}

function green() {
  console.log('green  - ', new Date());
}

function yellow() {
  console.log('yellow - ', new Date());
}
```

### - Callback 寫法

```javascript
function callbackLoop() {
  setTimeout(() => {
    red();
    setTimeout(() => {
      green();
      setTimeout(() => {
        yellow();
        callbackLoop();
      }, 1000);
    }, 2000);
  }, 3000);
}

callbackLoop();
```

### - Promise 寫法

```javascript
const ticker = (second, func) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      func();
      resolve();
    }, second * 1000);
  });
};

function promiseLoop() {
  const redPromise = ticker(3, red);
  redPromise
    .then(() => {
      const greenPromise = ticker(2, green);
      return greenPromise;
    })
    .then(() => {
      const yellowPromise = ticker(1, yellow);
      return yellowPromise;
    })
    .then(() => {
      promiseLoop();
    });
}

promiseLoop();
```

### - Async/await 寫法

```javascript
async function awaitLoop() {
  await ticker(3, red);
  await ticker(2, green);
  await ticker(1, yellow);
  awaitLoop();
}

awaitLoop();
```
