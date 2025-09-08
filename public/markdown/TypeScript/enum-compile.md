## 數值型 enum

數值型 enum 會被編譯成一個雙向映射的物件

```javascript
// 編譯前 (TypeScript)
enum Direction {
  Up,    // 預設值為 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}
```

```javascript
// 編譯後 (JavaScript, target=ES5 / commonjs 模式)
"use strict";
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
```

1. var 一個變數
2. IIFE（Immediately Invoked Function Expression）初始化這個物件：
3. Direction["Up"] = 0 並同時設定 Direction[0] = "Up"，以實現「名稱 → 數值」與「數值 → 名稱」的雙向映射。

## 字串型 enum

會做單向映射（名稱 → 字串），無法由值反查名稱

```javascript
// 編譯前 (TypeScript)
enum Status {
  Success = "SUCCESS",
  Failure = "FAILURE",
}
```

```javascript
// 編譯後 (JavaScript)
"use strict";
var Status;
(function (Status) {
    Status["Success"] = "SUCCESS";
    Status["Failure"] = "FAILURE";
})(Status || (Status = {}));
```

## const enum

TypeScript 編譯器在輸出時會完全移除這些 enum 定義
範例中，編譯器看到 Color.Green，直接用常數 2 取代，並不產生任何 enum 物件。

```javascript
// 編譯前 (TypeScript)
const enum Color {
  Red = 1,
  Green,
  Blue,
}
let c = Color.Green;
```

```javascript
// 編譯後 (JavaScript)
"use strict";
var c = 2;
```