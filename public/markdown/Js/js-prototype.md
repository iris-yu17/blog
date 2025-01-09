## 前言

原型一直是讓我有點害怕的主題，網路上文章很多，但每一篇的理解方式都不一樣，每次看完總感覺似懂非懂，很難完全了解它的全貌。\
我自己在學習的時候，感到最困難的是各種名詞間的關係跟定義，因此這篇文章會一步一步講解並串連各個名詞，希望能讓人在閱讀時有順暢的體驗，能夠順順地看完後就了解原型了。🎉

## 什麼是原型（Prototype）

我們透過一個簡單的範例來對原型有個初步認識：

首先定義一個建構函式 User，利用這個建構函式創建一個實例 iris，並在 console 印出來。

```javascript
// 建構函式
function User(name) {
  this.name = name;
  this.greet = function () {
    console.log(`Hello, my name is ${this.name}.`);
  };
}

// 創建 iris 實例
const iris = new User('Iris');

// 印出 iris
console.log(iris);
```

印出結果如下圖：\
可以看到有個 `[[Prototype]]` 屬性，在 JavaScript 中，每個物件都有一個隱藏的 `[[Prototype]]` 屬性，**這個屬性對應到的就是該物件的原型（Prototype）**。
![Imgur](https://i.imgur.com/vx90cFG.png)

## `[[Prototype]]` 與 `__proto__` 屬性

要如何訪問 `[[Prototype]]` 這個隱藏屬性呢？\
可以用 `__proto__` 屬性，不過這已是過時的方法，在某些瀏覽器已不再使用。\
現在比較鼓勵使用 `Object.getPrototypeOf()`，我們可以用這個方法來查看物件的原型。

延續上面例子的程式碼：

```javascript
// 印出 iris
console.log('iris:', iris);

// 印出 iris 的 [[Prototype]]
console.log('iris 的原型:', Object.getPrototypeOf(iris));
```

結果：\
可以看到 iris 的 `[[Prototype]]` 屬性跟 `Object.getPrototypeOf(iris)` 的結果是一樣的。
![Imgur](https://i.imgur.com/rtlG22n.png)

## prototype 屬性

- prototype 是**函式**的屬性，它是個物件。
- 每個函式都有一個 prototype 屬性，一般函式跟建構函式都有，只是一般函式通常不會用到。
- prototype 包含了由該建構函式創建的實例共享的屬性和方法。
- 當使用建構函式創建實例時，此實例的 `[[Prototype]]` 會指向這個建構函式的 prototype。

範例：

```javascript
// 建構函式
function User(name) {
  this.name = name;
  this.greet = function () {
    console.log(`Hello, my name is ${this.name}.`);
  };
}

// 創建 iris 實例
const iris = new User('Iris');

// 會得到 true，建構函式 User 的 prototype 就是 iris 這個實例的 [[Prototype]]
console.log(User.prototype === Object.getPrototypeOf(iris));
```

### 補充：Js 內建的原型物件

在銜接到下一個部分「原型鏈」之前，我們先做一點說明，以方便了解原型鏈。\
在 JavaScript 中，我們可以使用 `Array()`, `Object()`, `String()` 等內建的建構函式，來創建陣列、物件...等。

前面說了函式都會有 prototype 屬性，因此他們當然也有，例如 `Array.prototype`（陣列原型）、`Object.prototype`（物件原型）、`Function.prototype`（函式原型）...等。像我們常用的 `push`, `pop`, `forEach` 這些列方法，就是陣列原型提供的。\
如果我們創建一個陣列，這個陣列的 `[[Prototype]]` 就會指向 `Array.prototype`。

## 原型鏈（prototype chain）

我們再用另一個範例來說明：\
定義一個陣列，並看看 console 結果。

```javascript
const nameList = ['Iris', 'Vivi', 'Greta', 'Annie'];

console.log(nameList);
```

![Imgur](https://i.imgur.com/MtJkv45.png)

發現在陣列裡有 `[[Prototype]]`，可以看到裡面還有 `filter`, `find`, `forEach` 這些我們熟悉的陣列操作方法，而 `[[Prototype]]` 裡面又有一個 `[[Prototype]]`。

### 說明

JavaScript 中所有的物件都有一個原型，而這個原型也可能有自己的原型，形成一條鏈，這就是原型練。\
原型物件會這樣鏈結著，直到最後為 `null` 為止，`null` 在定義裡沒有原型、也是原型鏈的最後一個鏈結。

在上面的例子，原型鏈是這樣的：\
nameList 的原型是 `Array.prototype`（陣列原型）；\
而 `Array.prototype` 的原型是 `Object.prototype`（物件原型）;\
而 `Object.prototype` 的原型會是 `null`，也就是原型鏈的終點。

```
nameList --> Array.prototype --> Object.prototype --> null
```

證明：

```javascript
// nameList 的原型 === 陣列原型
Object.getPrototypeOf(nameList) === Array.prototype; // true

// '陣列原型'的原型 === 物件原型
Object.getPrototypeOf(Array.prototype) === Object.prototype; // true

// '物件原型'的原型 === null
Object.getPrototypeOf(Object.prototype); // null
```

## 原型繼承（Prototype Inheritance）

> 原型繼承是 JavaScript 的一種繼承機制。\
> 基於原型鏈的概念，子層物件的原型會指向父層物件，當子層物件找不到某屬性或方法時，就會往上向父層查找，從而實現屬性和方法的共享和繼承。

舉個很簡單的例子：\
定義一個 nameList 陣列，並且再 push 一個字串 'Angela' 進去。

```javascript
const nameList = ['Iris', 'Vivi', 'Greta', 'Annie'];

nameList.push('Angela');

console.log(nameList); // ['Iris', 'Vivi', 'Greta', 'Annie', 'Angela']
```

想想看，為什麼我們定義一個陣列，它可以使用 `push` 這些陣列方法呢？就是因為「**原型繼承**」。

在此範例中，原型鏈是這樣的：

```
nameList --> Array.prototype --> Object.prototype --> null
```

nameList 的原型是陣列原型\
在 nameList 中沒有 `push`，但 JavaScript 會順著原型鏈往父層找，發現**陣列原型有**，因此 nameList 可以使用 `push` 方法。

## 總結

- 原型（prototype）：在 JavaScript 中，每個物件都有一個原型。當物件被初始化時，它會從其原型物件繼承屬性和方法。
- `[[Prototype]]`：是物件中一個隱藏的屬性，它會對應到此物件的原型。
- `__proto__`：物件的一個屬性，用來讀取或設置原型，但現在已不推薦使用。
- prototype 屬性：是**函式**的屬性。當通過建構函數創建一個實例時，該實例的原型（即 `[[Prototype]]` 屬性）指向這個建構函數的 prototype 屬性。
- 原型鏈：JavaScript 中所有的物件都有一個原型，而這個原型也可能有自己的原型，形成一條鏈，這就是原型練。
- 原型繼承：是 JavaScript 的繼承機制，當子層物件找不到某屬性或方法時，就會往上向父層查找，讓子層物件能夠使用父層物件的屬性或方法。

---

參考資料：

- [繼承與原型鏈](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [Day 11 - 理解 JavaScript，為什麼要知道原型、原型鏈與原型繼承？](https://ithelp.ithome.com.tw/articles/10326931)
- [最常見的 JavaScript 原型 (prototype) 面試題 ：原型 (prototype)、原型鏈 (prototype chain) 、原型繼承 (prototypal inheritance)](https://www.explainthis.io/zh-hant/swe/most-common-js-prototype-questions)
- [鐵人賽：JavaScript 的原型繼承](https://www.casper.tw/javascript/2017/12/17/javascript-prototype/)
- [面試官最愛考的 JS 原型鏈](https://maxlee.me/posts/prototype)
