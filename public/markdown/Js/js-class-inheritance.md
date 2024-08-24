## 前言

這篇主要會有三個部分：

1. 介紹 `class` 的基本語法
2. 建構函式繼承
3. `class` 繼承
4. `class` 繼承與建構函式繼承比較

## class 基本語法

`class` 是 ES6 後出現的語法糖，它提供了一個更直觀和簡潔的語法來創建物件和處理繼承。

接下來我們來一步步使用、介紹 `class`：

### class 和 constructor

- 使用 `class` 關鍵字來建立一個類別
- 使用 `constructor` 來定義此類別的屬性

```javascript
class Family {
  constructor(familyname, origin) {
    this.familyname = familyname;
    this.origin = origin;
  }
}
```

### 原型方法（Prototype method）

將共享的方法直接寫在 `class` 裡

```javascript
class Family {
  constructor(familyname, origin) {
    this.familyname = familyname;
    this.origin = origin;
  }

  // 共享的方法
  printFamilyName() {
    console.log(`Family name: ${this.familyname}`);
  }
}
```

使用方法：

```javascript
// 創建實例 apple
const smith = new Family('Smith', 'England');

// 使用共享方法
smith.printFamilyName(); // 會印出 Family name: Smith
```

### 靜態方法（Static method）

- 使用 `static` 關鍵字來建立方法
- 靜態方法只能被 `class` 使用，實例無法使用
- 靜態方法裡面的 `this` 是指向所屬的 `class`

```javascript
class Family {
  constructor(familyname, origin) {
    this.familyname = familyname;
    this.origin = origin;
  }

  printFamilyName() {
    console.log(`Family name: ${this.familyname}`);
  }

  // 靜態方法
  static changeOrigin(origin) {
    // this 指向 Family 這個 class，而不是實例物件
    this.origin = origin;
  }
}
```

我們來看看靜態方法怎麼使用：

```javascript
// 創建實例 smith
const smith = new Family('Smith', 'England');

/**
 * 會得到 smith.changeOrigin is not a function
 * 因為靜態方法只能被 class 使用
 */
smith.changeOrigin();

/**
 * 因為靜態方法裡的 this 會指向 class，
 * 所以使用 call 將 this 的指向改為 smith，
 * 並傳入 `Scotland` 來改變 smith 的 origin
 */
Family.changeOrigin.call(smith, 'Scotland');

// 會得到 Scotland
console.log(smith.origin);
```

### Setter 和 Getter

使用 `getter` 關鍵字來取得物件屬性，不用傳入參數\
使用 `setter` 關鍵字來修改物件屬性，要傳入一個參數

```javascript
class Family {
  constructor(familyname, origin) {
    this.familyname = familyname;
    this.origin = origin;
  }

  printFamilyName() {
    console.log(`Family name: ${this.familyname}`);
  }

  static changeOrigin(origin) {
    this.origin = origin;
  }

  // setter
  set totalFamily(number) {
    this.number = number;
  }

  // getter
  get totalFamily() {
    return this.number;
  }
}
```

setter, getter 使用範例：

```javascript
// 創建實例
const smith = new Family('smith', 'England');

// 使用 setter
smith.totalFamily = 20;

// 使用 getter
console.log(smith.totalFamily);
```

## 建構函式繼承

在進入 `class` 繼承前，我們先示範要如何實現建構函式的繼承：

1. 首先定義父建構函式及它的共用方法
2. 定義子建構函式
3. 繼承屬性：
   使用 `call` 在子建構函式內呼叫父建構函式來繼承父層的屬性
4. 繼承方法：
   子建構函式的 `[[prototype]]` 本來是 `object.prototype`，把它改為父建構函式的 `prototype`。
5. 將 constructor 指回子建構函式：
   因執行上步驟後，子函式的 constructor 會指向父函式的 constructor，所以要把它指定回來。

```javascript
// 1. 定義父函式
function Family(familyname, origin) {
  this.familyname = familyname;
  this.origin = origin;
}

// 1. 定義父函式的共用方法
Family.prototype.printFamilyName = function () {
  console.log(`Family name: ${this.familyname}`);
};

// 2. 定義子函式
function FamilyMember(firstName, familyname, origin) {
  // 3. 繼承屬性
  // 在這邊執行 Family 函式的內容，並把 this 指向 FamilyMember
  Family.call(this, familyname, origin);

  this.firstName = firstName;
}

// 4. 繼承方法
// `Object.create(xxx)`，表示以 `xxx` 為原型，創建一個新物件的意思。
// 用這樣的方式來將 FamilyMember 的原型改為 Family 的原型
FamilyMember.prototype = Object.create(Family.prototype);

// 5. 將 constructor 指回子函式
// 每個函式的 prototype 都有一個 constructor 屬性，指回函式本身
// 在上一步驟，FamilyMember.prototype 完全被替換了，這邊要再把 constructor 指回來
FamilyMember.prototype.constructor = FamilyMember;

// 子函式加上共用方法
FamilyMember.prototype.printFullName = function () {
  console.log(`Hi, I'm ${this.firstName} ${this.familyname}.`);
};

const will = new FamilyMember('Sam', 'Smith', 'England');

will.printFamilyName(); // 印出 Family name: Smith

will.printFullName(); // 印出 Hi, I'm Sam Smith.
```

補充：\
範例中，將 constructor 指回子函式、子函式加上共用方法這兩個動作，必須在寫第 4 步（繼承方法）之後，否則會被覆蓋。

## Class 繼承

將上面建構函式繼承，可以改成用 `class` 的寫法，做到一模一樣的事情。

`class` 繼承會用到兩個關鍵字：

1. extends：代表 extends from，繼承自...的意思，語法為 `class 子類別 extends 父類別 { ... }`
2. super：有兩個作用
   1. 用來調用父類別的建構函式（跟前面建構函式繼承的第 3 步是一樣的意思）
   2. 用來調用父類別的方法

```javascript
// 父類別
class Family {
  constructor(familyname, origin) {
    this.familyname = familyname;
    this.origin = origin;
  }

  printFamilyName() {
    console.log(`Family name: ${this.familyname}`);
  }
}

// 子類別
// 使用 extends 關鍵字來繼承 Family
class FamilyMember extends Family {
  constructor(firstName, familyname, origin) {
    // 使用 super 來調用父類別的建構函式
    super(familyname, origin);
    this.firstName = firstName;
  }

  printFullName() {
    console.log(`Hi, I'm ${this.firstName} ${this.familyname}.`);
  }

  // 這邊會覆蓋父類的 printFamilyName
  printFamilyName() {
    // 使用 super 來調用父類的 printFamilyName
    super.printFamilyName();

    console.log(`Family name from child: ${this.familyname}`);
  }
}

const will = new FamilyMember('Sam', 'Smith', 'England');

/**
 * 印出：
 * Family name: Smith
 * Family name from child: Smith
 */
will.printFamilyName();

will.printFullName(); // 印出 Hi, I'm Sam Smith.
```

## 建構函式和 class 繼承比較

### 建構函式

- 使用 `建構函式` 調用父類的建構函式
- 手動設置原型鏈 (`FamilyMember.prototype = Object.create(Family.prototype)`)
- 手動修正 constructor 屬性 (`FamilyMember.prototype.constructor = FamilyMember`)

### class

- 使用 `super` 調用父類的構造函數
- 使用 extends 關鍵字設置原型鏈
- 不需手動修正 constructor 屬性

---

參考資料：

- [Day14-ES6 Class 繼承
  ](https://ithelp.ithome.com.tw/articles/10290263)
- [[JS] JavaScript 類別（Class）](https://pjchender.dev/javascript/js-class/#setter-%E5%92%8C-getter)
