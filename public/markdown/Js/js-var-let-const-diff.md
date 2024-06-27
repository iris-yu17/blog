> 最近在整理剛學 JS 時寫的筆記，雖然現在回頭看，很多內容都已經懂了，但還是決定把它寫成文章記錄起來，也許能幫到一些剛學 JS 的人。

## 表格比較

|            | let   | const | var      |
| ---------- | ----- | ----- | -------- |
| 作用域     | block | block | function |
| 可重複宣告 | 否    | 否    | 是       |
| 可改變值   | 是    | 否    | 是       |

## let

### 1. 不可重複宣告

例如以下程式碼，會得到錯誤：`Uncaught SyntaxError: Identifier 'drink' has already been declare`\
 表示這個語法有誤，因為 `drink` 已經被宣告過了

```javascript
let drink = 'tea';
let drink = 'milk';
```

### 2. 可以改變值

```javascript
let drink = 'tea';
drink = 'milk';
```

### 3. block（區塊）作用域

- 區塊指的就是 `{}`，像 function, if else, for loop 都會用大括號刮起來，這個大括號就是一個區塊
- 變數的作用範圍只在 block 裡

```javascript
let c = 3;
function decideC() {
  let c = 4;
  console.log('in', c);
}
decideC();
console.log('out', c);
```

結果：

```
in 4
out 3
```

因為是 block 作用域，所以可以在裡面再宣告一個 c，`let c = 4` 只存在在 `{}` 裡，並不影響外面的 c

## const

### 1. 不可重複宣告

像 let 一樣 ，會出現錯誤，表示已經被宣告過了

### 2. 不可以改變它的值

會出現錯誤 `Uncaught TypeError: Assignment to constant variable.`\
 const 本來就是用來宣告一個不變的常數，當然不允許改變它的值。

### 3. block 作用域

像 let 一樣，變數的作用範圍只在 block 裡

```javascript
function foo1() {
  if (true) {
    const user = 'Iris';
  }
  console.log(user);
}
foo1();
```

會得到 `Uncaught ReferenceError: user is not defined`。

## var

### 1. 可重複宣告

像這樣寫的語法是有效的

```javascript
var name = 'Bob';
var name = 'Bobby';
```

### 2. function 作用域

變數的作用範圍只在 function 裡\

var 是 function 作用域，不是 block 作用域，別搞混了～\
因現在 `var` 很少用了，有時會忘記這件事。

下面範例，在 `if` 裡面宣告 user 變數，還是能讀到 user 的值。\
但由於是 function 作用域的關係，變數的作用範圍只在 function 裡，在 function 外就無法取得 user 值。

```javascript
function foo2() {
  if (true) {
    var user = 'Taylor';
  }
  console.log(user); // Taylor
}
foo2();
console.log(user); // user is not defined
```
