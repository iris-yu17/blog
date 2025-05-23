## 什麼是 this

- 當函式被調用時，會產生一個新的執行上下文（Execution Context），並且這個執行上下文決定了函式在運行時能夠訪問的變數、物件以及 this 的值。
- `this` 的值取決於函式是如何被調用的
- 在大多數的情況下， `this` 代表的就是呼叫函式的物件
- 當沒有特定指明 `this` 的情況下，`this` 預設為全域物件（也就是 window）

白話點來說， `this` 代表的是函式執行時所屬的物件，並且它的值並不是固定的，而是取決於函式被呼叫的方式及環境。

---

以下是一些常見的情況和對應的 `this` 值

## 1. 全域環境

在全域環境中，`this` 指向全域物件。\
在瀏覽器中，這個全域物件就是是 window，在 `Node.js` 中則是 global。

```javascript
console.log(this); // 會印出 window 物件
```

## 2. 函式調用

在普通函式調用中，`this` 在非嚴格模式會是 window ，在嚴格模式會是 undefined。

```javascript
function foo() {
  'use strict';
  console.log(this);
}
foo(); // undefined

function bar() {
  console.log(this);
}
bar(); // window
```

## 3. 使用物件來調用

當函式作為物件的方法來調用時，`this` 指向調用該方法的物件。\
在下面範例中，`printName` 是物件 `obj` 底下的方法，因此 `this` 會指向 `obj`。

```javascript
const obj = {
  name: 'Iris',
  printName: function () {
    console.log(this.name);
  },
};

obj.printName(); // Iris
```

再一個範例：\
以下程式碼會印出什麼呢？

```javascript
var myName = 'Global name';

function print() {
  console.log(this.myName);
}

const obj = {
  printName: print,
};

obj.printName();
```

答案是：`undefined`\
前面有說了，`this` 代表的是函式執行時所屬的物件，`printName` 執行時所屬的物件是 `obj`，而 `obj` 並沒有 `myName` 屬性。

## 4. 箭頭函式

箭頭函式沒有自己的 `this`，它的 `this` 會等於被宣告當下所在環境的 `this`。

我們把前一個範例稍微改寫一下，將 print 改成箭頭函式寫法，結果會如何呢？

```javascript
var myName = 'Global name';

const print = () => {
  console.log(this.myName);
};

const obj = {
  printName: print,
};

obj.printName();
```

答案：`Global name`\
因為箭頭函式的 `this` 會指向它宣告當下所在環境，因此會印出 `Global name`

## 5. 建構函式

當使用 new 呼叫建構函式時，`this` 會指向新創建的物件。

它的步驟如下：

1. 創建一個新的空物件
2. 將這個新物件的 `[[prototype]]` 屬性設置為建構函式的 prototype 屬性。
3. 建構函式內部的 this 綁定到這個新物件上
4. 執行函式內的代碼
5. 回傳新的物件

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log(this);
}

const greta = new Person('Greta', 30);
```

`console.log(this)` 結果會如下：

```javascript
Person {
  name: "Greta",
  age: 30
}
```

## 練習

接下來是幾個判斷 this 值的練習題：

### 題目一

```javascript
const foo = function () {
  this.count++;
};

foo.count = 0;

for (let i = 0; i < 5; i++) {
  foo();
}

console.log(foo.count);
```

答案：0\
在 `foo()` 執行時，`this` 都是指向 window 物件，因此 `foo` 裡面的 `this.count` 其實是 `window.count`；而 `foo.count` 從頭到尾都沒有變動。

### 題目二

```javascript
function bar() {
  console.log(this.a);
}

function foo() {
  const a = 123;
  this.bar();
}

foo();
```

答案：`undefined`\
`foo` 的 `this` 是指向 window，因此 `this.bar` 實際上是 `window.bar`，而 window 並沒有 a 數性，因此會印出 `undefined`。

補充：\
在 Javascript 中，當我們在全域範圍內定義一個 var 或 function，它會自動成為全域物件（也就是 window）的屬性，所以可以用 `window.bar` 來做調用。\
如果把上面範例的 function bar 改成用 `const` 或 `let` 來定義，就無法使用 `window.bar` 了。\
在前面 [3.使用物件來調用](#3.-使用物件來調用) 跟 [4.箭頭函式](#4.-箭頭函式) 兩個例子中，是使用 `var` 來宣告變數，也是同樣的原因。

### 題目三

```javascript
const obj = {
  func1: function () {
    console.log(this === obj);

    const func2 = function () {
      console.log(this === obj);
    };

    func2();
  },
};

obj.func1();
```

答案：

```
true
false
```

`func1` 會印出 `true`，應該很好理解，因為 `func1` 是作為 `obj` 的方法來呼叫，因此 `this` 指向 `obj` 物件。\
那為何 `func2` 是 `false` 呢？\
因為即使把 `func2` 寫在 `obj` 裡，但它並不是作為 `obj` 的方法來呼叫的。因此 `func2` 裡面的 `this` 並不會自動指向 `obj`，而是預設的 window 物件。

### 題目四

```javascript
const obj1 = {
  count: 10,
  doSomethingLater() {
    setTimeout(function () {
      this.count++;
      console.log(this.count);
    }, 300);
  },
};
obj1.doSomethingLater();

const obj2 = {
  count: 10,
  doSomethingLater() {
    setTimeout(() => {
      this.count++;
      console.log(this.count);
    }, 300);
  },
};
obj2.doSomethingLater();
```

答案：

```
NaN
11
```

- `obj1` 的 `setTimeout` 裡面的函式是一般函式，因此 `this` 指向 window，而在 windonw 中沒有 count，所以答案是 `NaN`
- `obj2` 的 `setTimeout` 裡面的是箭頭函式，它的 this 值是被宣告當下作用域的 `this`，因此會是最接近的父層一般函式的 this 值，也就是 `obj2`，原本 `count` 為 10，`10++` 後變成 11

### 題目五

```javascript
const obj = {
  name: 'Alice',
  sayHello() {
    console.log(this.name);
  },
};

setTimeout(obj.sayHello, 1000);
```

答案：

```
undefined
```

因為 `setTimeout(obj.sayHello, 1000)` 其實等同於：

```javascript
const fn = obj.sayHello;
setTimeout(fn, 1000); // `fn()` 被當作一般函式執行
```

---

參考資料

- [shubo.io/javascript-this/](https://www.shubo.io/javascript-this/#什麼是-this)
- [What's THIS in JavaScript ? [上]](https://kuro.tw/posts/2017/10/12/What-is-THIS-in-JavaScript-上/)

