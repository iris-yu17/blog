## 前言

關於 `this` 的基本概念，可以去看[這篇文章](./js-what-is-this)

在大多數的情況，`this` 會指向呼叫此函式的物件。但有些時候，我們可能會想要指定 `this` 的指向，這時就需要 `call`, `apply`, `bind` 這三個方法。

首先我們來看一段簡單的程式碼

```javascript
const person = {
  nickname: 'Benny',
  age: 5,
};

function intro() {
  console.log(`${this.nickname} is ${this.age} years old.`);
}

intro();
```

結果會是：`undefined is undefined years old.`\
因為 intro 中的 `this` 都指向 window，而 window 並沒有 nickname 和 age 這兩個變數。\
接下來我們會使用 `call`, `apply`, `bind` 三個方法，來把 `this` 的指向改為 `person`。

---

## call

### call 的用法

`function.call()`，括號中再放入要指向的物件。

```javascript
const person = {
  nickname: 'Benny',
  age: 5,
};

function intro() {
  console.log(`${this.nickname} is ${this.age} years old.`);
}

intro.call(person);
```

結果：`Benny is 5 years old.`\
如果在 intro 裡面 `console.log(this)` 會得到 person 物件。

### 傳入參數

我們也可以在 `call` 中傳入參數，寫法如下：\
`function.call(要指向的物件, 參數1, 參數2, 參數3, ...略)`

```javascript
const person = {
  nickname: 'Benny',
  age: 5,
};

function intro(pronouns, hobby) {
  console.log(`${this.nickname} is ${this.age} years old.`);
  console.log(`${pronouns} likes to ${hobby}`);
}

intro.call(person, 'He', 'sing');
```

結果：

```
Benny is 5 years old.
He likes to sing
```

## apply

### apply 的用法

跟 call 完全一樣，`function.apply()`，括號中再放入要指向的物件。

```javascript
const person = {
  nickname: 'Benny',
  age: 5,
};

function intro() {
  console.log(`${this.nickname} is ${this.age} years old.`);
}

intro.apply(person);
```

結果：一樣會得到 `Benny is 5 years old.`

### 傳入參數

`apply` 跟 `call` 的差別只在於傳入參數的方法\
`apply` 只接收兩個參數，第一個是要指向的物件，第二個是陣列，要傳入的參數要先放到陣列中\
`function.apply(要指向的物件, [參數1, 參數2, 參數3, ...略])`

```javascript
const person = {
  nickname: 'Benny',
  age: 5,
};

function intro(pronouns, hobby) {
  console.log(`${this.nickname} is ${this.age} years old.`);
  console.log(`${pronouns} likes to ${hobby}`);
}

intro.apply(person, ['He', 'sing']);
```

## bind

### `bind()` 會回傳一個綁定 `this` 後的函式。

```javascript
const person = {
  nickname: 'Benny',
  age: 5,
};

function intro(pronouns, hobby) {
  console.log(`${this.nickname} is ${this.age} years old.`);
  console.log(`${pronouns} likes to ${hobby}`);
}

const bindIntro = intro.bind(person, 'He', 'sing');
bindIntro();
```

結果：

```
Benny is 5 years old.
He likes to sing
```

### 綁定後，`this` 就無法再被修改。

下面程式碼中，我們定義了一個 person2 物件，並且試著用 `bind` 來把 bindIntro 的 `this` 指向改為 person2。

```javascript
const person = {
  nickname: 'Benny',
  age: 5,
};

const person2 = {
  nickname: 'Flynn',
  age: 28,
};

function intro(pronouns, hobby) {
  console.log(`${this.nickname} is ${this.age} years old.`);
  console.log(`${pronouns} likes to ${hobby}`);
}

const bindIntro = intro.bind(person, 'He', 'sing');
bindIntro();

// 重新綁定
bindIntro.bind(person2, 'He', 'drink');
bindIntro();
```

結果：重新綁定並沒有效果

```
Benny is 5 years old.
He likes to sing
Benny is 5 years old.
He likes to sing
```

## 總結

- `call` 和 `apply` 的用法基本上一樣，差別只在於 `apply` 帶入參數需要先放在陣列中
- `call` 和 `apply` 只在使用時改變指向，`bind` 則會永久改變

|              | call   | apply      | bind   |
| ------------ | ------ | ---------- | ------ |
| 回傳函式     | 否     | 否         | 是     |
| 帶入參數     | 直接傳 | 放在陣列中 | 直接傳 |
| 永久改變指向 | 否     | 否         | 是     |

---

參考資料：

- https://www.youtube.com/watch?v=9eUe1-gLeKs
