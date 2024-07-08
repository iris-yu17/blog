## 提升（Hoisting）

> 宣告變數時，JS 會先把變數的記憶體空間先準備好，這流程就稱為提升。

Javascript 建立執行環境時會分2個階段：

1. 創造環境\
   創造環境時會把程式碼的變數都先挑出來，在記憶體先準備好空間，但還沒賦予值給他
2. 執行\
   執行時才賦予值

## 釐清

提升這個詞，可能會讓人有誤解，以為是把變數宣告都移動到程式的區塊頂端。\
但其實只是在記憶體先準備好空間，程式碼位置並沒有變。\
不過在本篇文章裡，在說明的時候我們還是會移動程式碼位置，來幫助理解。要記得**程式碼位置其實並沒有變**喔！

## 小觀念補充

為了之後的內容，先稍微說明一下 `undefined` 跟 `XXX is not defined` 的差別。

- undefined：代表的是**未定義**\
  例如 `a is undefined`，是指這個變數 a 是存在的，只是 a 的值還未被定義。
- XXX is not defined：代表的是**不存在**\
  例如 `a is not defined`，指的是 a 這個變數並不存在。

---

接下來我們直接用幾個例子來說明「提升」：

## (1) 變數提升

```javascript
console.log(age);
var age = '18';
```

結果：

```
undefined
```

說明：\
宣告變數放在 `console.log` 後，結果為 `undefined`（變數 age 已存在，只是還沒有值） ，而不是 `age is not defined`（變數 age 並不存在），這種現象就叫做提升，變數的宣告被「提升」到最上面去了。

上面那段程式碼，在執行時會是這樣的：

```javascript
// 變數的宣告會被提到最上面
var age;

// 此時變數 age 已存在，只是還沒有值
console.log(age);

// 這邊才賦值
age = '18';
```

## (2) 函式陳述式

```javascript
callBen();
function callBen() {
  console.log('Hey Ben');
}
```

結果：

```
Hey Ben
```

說明：\
函式陳述式是藉由直接給定名字來直接宣告一個函式。\
前面有說到，JS 在變數宣告時就會準備好記憶體空間，而函式陳述式的內容會在這時候也直接先保留進記憶體空間。\
簡單來說，在創造階段時，就已把變數及函式記憶體都準備好了。

## (3) 函式表達式

```javascript
callEddie();
var callEddie = function () {
  console.log('Hey Eddie');
};
```

結果：\
會得到錯誤 `TypeError: callEddie is not a function`，表示 callEddie 並不是一個函式

說明：\
在執行時是這樣的

```javascript
// 變數宣告提升到上面
var callEddie;

// 此時 callEddie 是 undefined，並不是 function，因此會報出錯
callEddie();

// 賦值
callEddie = function () {
  console.log('Hey Eddie');
};
```

## (4) 函式優先

```javascript
var callName = function () {
  console.log('call Babara');
};

function callName() {
  console.log('call Jess');
}

callName();
```

結果：

```
call Babara
```

說明：\
在創造階段，函式的提升會優先於變數。

```javascript
// 函式優先
function callName() {
  console.log('call Jess');
}

// 再來才是變數
var callName;

// 執行
callName = function () {
  console.log('call Babara');
};

callName();
```

## (5) 練習

```javascript
callIris();
function callIris() {
  console.log(callHer);
}
var callHer = 'call Iris';
```

結果：

```
undefined
```

說明：

```javascript
// 函式優先
function callIris() {
  console.log(callHer);
}

// 再來是變數，此時 callHer 還是 undefined
var callHer;

// 呼叫函式時還未賦值，因此是 undefined
callIris();

callHer = 'call Iris';
```

## (6) 練習

```javascript
whosName();
function whosName() {
  if (myName) {
    myName = 'William';
  }
}
var myName = 'Bentley';
console.log(myName);
```

結果：

```
Bentley
```

說明：

```javascript
// 函式優先
function whosName() {
  if (myName) {
    myName = 'William';
  }
}

// 再來是變數
var myName;

// 執行函式，此時 myName 是 undefined，因此不會進入 if 區塊
whosName();

// 賦值
myName = 'Bentley';

console.log(myName); // Bentley
```

## 補充

let 跟 const 沒有提升，而是會進入暫時性死區(Temporal Dead Zone)，只要在變數宣告前使用這個變數就會報錯。
例如：

```javascript
console.log(name);
let name = 'Iris';
```

會出現錯誤：`ReferenceError: name is not defined`
