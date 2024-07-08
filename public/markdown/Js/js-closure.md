## 什麼是閉包（Closure）

我們先來看一個範例\
`fn` 明明是在最外層作用域執行的，但它卻可以得到在 `outer` 作用域裡的 x，這就是因為有閉包。

```javascript
function outer() {
  let x = 10;

  // 這邊形成了閉包
  function inner() {
    console.log(x);
  }

  return inner;
}

const fn = outer();
fn(); // 10
```

根據 [MND](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures#%E8%AA%9E%E6%B3%95%E4%BD%9C%E7%94%A8%E5%9F%9F%EF%BC%88lexical_scoping%EF%BC%89) 定義：
閉包（Closure）是函式以及該函式被宣告時所在的作用域環境（lexical environment）的組合。

在這個例子中，閉包就是函式 `inner` 以及它被宣告時所在的作用域（也就是 `outer` 內部）的組合。

簡單來說，閉包的函式可以訪問、記住它被創建時的外部作用域的變數，就算它不是在這個作用域中執行也可以。

## 閉包的應用

### 1. 模擬私有變數

我們可以利用閉包用來創建私有變數，把不想外露的變數限制在閉包內部使用，只有通過閉包函數內的方法才能讀取和修改它們。

如以下程式碼：

- 變數 count 定義在函式內，無法直接被外部讀取
- 需透過 `getCount` 方法才能得到 count 的值
- 只能透過 `increment` 和 `decrement` 來改變 count

```javascript
function createCounter() {
  // count 無法被外部讀取
  let count = 0;

  return {
    increment: function () {
      count++;
    },
    decrement: function () {
      count--;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();

console.log(counter.getCount()); // 0
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
counter.decrement();
console.log(counter.getCount()); // 1

console.log(count); // Uncaught ReferenceError: count is not defined
```

### 2. 緩存

我們也可以使用閉包來實現簡單的緩存機制，將計算結果存在閉包中，避免重複、耗時的運算。

```javascript
// 一個耗時的運算
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function createCache(func) {
  // 聲明一個 cache 物件，在物件裡放緩存的東西
  const cache = {};

  return function (num) {
    if (cache[num]) {
      // 若已有緩存，就直接使用緩存的結果
      return cache[num];
    } else {
      // 若沒有緩存，就算出結果並放入緩存
      const value = func(num);
      cache[num] = value;
      return value;
    }
  };
}

const compute = createCache(fibonacci);

console.log(compute(5)); // 印出 5
console.log(compute(40)); // 需等待一陣子才印出 102334155
console.log(compute(40)); // 不需等待，直接印出 102334155
```

### 3. 異步操作

閉包在異步操作情境下非常有用，因為閉包讓函式能夠記住、訪問它被宣告時的作用域環境變數。

如以下範例：
在 `seTimeout` 裡的回呼函式形成了一個閉包，記住了它外部作用域的 name 變數。\
即使 `delayedGreeting` 已經執行完畢了，回呼函式仍然可以訪問並使用 name 變數，因此一秒後能正確印出 `Hello, Iris!` 文字。

```javascript
function delayedGreeting(name) {
  setTimeout(() => {
    console.log('Hello, ' + name + '!');
  }, 1000);
}

delayedGreeting('Iris');
```

## 閉包缺點

### 內存洩漏 (memory leak)

閉包的特性同時也造成它的缺點，閉包會讓函式記得它作用域環境的變數，因次局部變數不會釋放，如果使用過多、沒有清除可能會造成內存洩漏，需要小心使用。

```javascript
function outer() {
  // longArray 並沒被使用到，但一直被記著，記憶體沒有釋放
  const longArray = [];

  return function inner(num) {
    longArray.push(num);
  };
}
const addNumbers = outer();

for (let i = 0; i < 100000000; i++) {
  addNumbers(i);
}
```

---

參考資料：

- [什麼是閉包 (Closure)？](https://www.explainthis.io/zh-hant/swe/what-is-closure)
- [Javascript｜閉包 Closure 的介紹及應用。閉包跟 FP 的關係是什麼？](https://molly1024.medium.com/javascript-閉包-closure-的介紹及應用-閉包跟-fp-的關係是什麼-d9f598c432b7)
