## 什麼是原型（Prototype）

我們透過一個簡單的範例來對原型有個初步了解：

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

印出結果如下圖：
可以看到有個 `[[prototype]]` 屬性，在 JavaScript 中，每個物件都有一個隱藏的 `[[Prototype]]` 屬性，**這個屬性對應到的就是該物件的原型（prototype）**。
![Imgur](https://i.imgur.com/vx90cFG.png)

## `[[prototype]]` 與 `__proto__` 屬性

要如何訪問 `[[prototype]]` 這個隱藏屬性呢？\
可以用 `__proto__` 屬性，不過這已是過時的方法，在某些瀏覽器
已不再使用。\
現在比較鼓勵使用 `Object.getPrototypeOf()`，我們可以用這個方法來查看物件的原型。

延續上面例子的程式碼：

```javascript
// 舊的做法
const oldWay = iris.__proto__;

// 推薦作法
const newWay = Object.getPrototypeOf(iris);

// 會得到 true ，表示它們是一樣的
console.log(oldWay === newWay);
```

## prototype 屬性

- 每個函式都有一個 prototype 屬性，它是個物件，一般函式跟建構函式都有，只是一般函式通常不會用到。
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

// 建構函式 User 的 prototype 就是 iris 這個實例的 [[Prototype]]
User.prototype === Object.getPrototypeOf(iris); // true
```

### 補充：Js 內建的原型物件

在 JavaScript 中，我們可以使用 `Array()`, `Object()`, `String()` 等內建的建構函式，來創建陣列、物件...等。

他們當然也有 prototype，例如 `Array.prototype`（陣列原型），像我們常用的 `push`, `pop`, `forEach` 這些列方法，就是陣列原型提供的。

## 原型鏈（prototype chain）

我們再用另一個範例來說明：
定義一個陣列，並看看 console 結果。

```javascript
const nameList = ['Iris', 'Vivi', 'Greta', 'Annie'];

console.log(nameList);
```

![Imgur](https://i.imgur.com/MtJkv45.png)

發現在陣列裡也有 `[[Prototype]]`，可以看到裡面還有 `filter`, `find`, `forEach` 這些我們熟悉的陣列操作方法，而最下面又有一個 `[[Prototype]]`。

### 說明

JavaScript 中所有的物件都有一個原型，而這個原型也可能有自己的原型，形成一條鏈，這就是原型練。\
原型物件會這樣鏈結著，直到撞見 `null` 為止，`null` 在定義裡沒有原型、也是原型鏈的最後一個鏈結。

在上面的例子，原型鏈是這樣的：
nameList 的原型是 `Array.prototype`（陣列原型）；\
而 `Array.prototype` 的原型是 `Object.prototype`（物件原型）;\
而 `Object.prototype` 的原型會是 `null`，也就是原型鏈的終點。

```
nameList --> Array.prototype --> Object.prototype --> null
```

證明：

```javascript
Object.getPrototypeOf(nameList) === Array.prototype; // true

Object.getPrototypeOf(Array.prototype) === Object.prototype; // true

Object.getPrototypeOf(Object.prototype); // null
```

## 原型繼承（Prototype Inheritance）

> 原型繼承是 JavaScript 的一種繼承機制。
> 基於原型鏈的概念，子層物件的原型會指向父層物件，當子層物件找不到某屬性或方法時，就會往上向父層查找，從而實現屬性和方法的共享和繼承。

首先我們定義了一個物件 user，接著使用 `hasOwnProperty`。\
`hasOwnProperty` 是 js 內建的物件方法，用來判斷物件是否有某屬性。\
結果會印出 true，因為 user 物件裡確實有 greet 這個屬性。

```javascript
// 定義一個物件
const user = {
  name: 'Iris',
  greet: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// 判斷 user 物件是否有 greet 屬性
console.log(user.hasOwnProperty('greet')); // 會印出 true
```

問題來了，我們定義的 user 並沒有 `hasOwnProperty` 這個方法，那為何可以使用這個內建方法呢？這是就是因為「**原型繼承**」。

在此範例中，原型鏈是這樣的：

```
user --> Object.prototype --> null
```

user 的原型是物件原型；而物件原型 的原型則是 `null`。
在 user 中沒有 `hasOwnProperty`，但是物件原型有，因此 user 可以使用 `hasOwnProperty` 方法。

---

參考資料：

- https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
- https://ithelp.ithome.com.tw/articles/10326931
- https://www.explainthis.io/zh-hant/swe/most-common-js-prototype-questions
- https://www.casper.tw/javascript/2017/12/17/javascript-prototype/
