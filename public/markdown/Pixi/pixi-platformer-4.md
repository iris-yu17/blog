> 這章節會教學如何創建角色，並使角色跳躍、左右移動。

## - step1. 創建角色元件

1. 在 `src/component` 下新增 `Character.ts` 的檔案，在裡面創建一個 Character class
2. 建立屬性：

- x: 角色的起始 x 座標
- y: 角色的起始 y 座標

3. 創建一個 `init` 方法，我們將在裡面載入背景素材、初始化元件

```javascript
class Character {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  async init() {
  }
}
```

## - step2. 角色閒置狀態動畫

我們需要的素材是在 `public/character` 裡的 `idle.json` 及 `idle.png`，這是角色停在原地時要播放的動畫。\
資料夾裡還有 run, jump 等素材，晚點才會用到。

如同前面載入道具素材一樣，先載入角色閒置狀態的的 JSON 檔，再將它轉為動畫。

```javascript
class Character {
  constructor() {
    // ...
  }

  async init() {
    // 載入 json
    await Assets.load(`/public/character/idle.json`);
    const textureArray = [];

    // 將圖片轉為 texture，並放入陣列
    for (let i = 1; i <= 11; i++) {
      textureArray.push(Texture.from(`idle_${i}.png`));
    }

    // 動畫參數設定
    this.avatar = new AnimatedSprite(textureArray);
    this.avatar.animationSpeed = 0.35;
    this.avatar.position.set(this.x, this.y);
    this.avatar.anchor.set(0.5, 0.5);
    this.avatar.loop = true;

    // 播放動畫
    this.avatar.play();

    // 加到舞台
    app.stage.addChild(this.avatar);
  }
}

export default Fruit;
```

## - step3. 使用角色

在 `src/index.ts`中，使用創建的 Character Class

```javascript
import Background from './components/Background';
import Fruit from './components/Fruit';
import Character from './components/Character';

const bg = new Background('Brown');
const apple = new Fruit('apple', 200, 150);

// 建立一個 Character 實例，使用 apple 素材，起始位置為 x: 300, y: 300
const character = new Character(300, 300);

const initGame = async () => {
  await bg.init();
  await apple.init();

  // 調用 Character 的 init 方法
  await character.init();
};

initGame();
```

結果如下
![GIF](https://i.imgur.com/KXAOTl6.gif)

## - step4. 監聽 keypress 事件

接下來要製作角色移動功能，角色可以：跳耀、往左移動、往右移動，並且角色會有往左上、右上方向跳耀的狀況，所以我們會需要記住目前是什麼按鍵被按著。

1. 定義 `KEY` 的 enum
2. 新增 pressedKeys 屬性來記錄按下了什麼按鍵，為了方便操作，這邊把他定為 Set，而不是單純 Array
3. 建立 onKeyDown 方法，當按下按鍵時，加入 pressedKeys
4. 建立 onKeyUp 方法，當放開按鍵時，從 pressedKeys 移除
5. 監聽 keypress 事件

備註：因為 onKeyDown, onKeyUp 會被當作 callback 傳入 addEventListener, 若使用一般函式，當它們被調用時，this 的指向會變成 window，而不是 `Character` 實例本身。需使用箭頭函式 this 的指向才會正確，因箭頭函示的 this 會是函式宣告當下作用域的 this。

```javascript
// 1. 定義 KEY enum
enum KEY {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
}

class Character {
  // 2. 新增 pressedKeys 屬性
  pressedKeys: Set<KEY> = new Set();

  constructor() {
    // ...
  }

  async init() {
    // ...
  }

  // 3. 建立 onKeyDown 方法
  onKeyDown = (e: KeyboardEvent) => {
    const { code } = e;

    if (
      code === KEY.ArrowRight ||
      code === KEY.ArrowLeft ||
      code === KEY.ArrowUp
    ) {
      this.pressedKeys.add(code as KEY);
    }
  };

  // 4. 建立 onKeyUp 方法
  onKeyUp = (e: KeyboardEvent) => {
    const { code } = e;

    this.pressedKeys.delete(code as KEY);
  };

  // 5. 監聽 key press 事件
  addListener()  {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);
  }
}

export default Character;
```

## - step5. 使角色左右移動

- 我們要建立一個 `run` 方法，在裡面判斷 pressedKeys 有哪些值，來感變角色的 x 座標。
- 建立一個 `tick` 方法，把所有需要用 `Ticker` 不斷執行的動作都放在這邊。
- 會使用 `Ticker` 不斷執行 `tick`，達到移動的效果。

### 定義 config

在 `src/constant` 下新增 `config.ts`，在裡面定義角色移動的速度

```javascript
const SPEED = {
  CHARACTER_RUN: 2,
  CHARACTER_JUMP: 2,
};

export { SPEED };
```

### 建立 `run` 方法，讓角色能左右移動

```javascript
class Character {
  // ...略

  run(deltaTime) {
    // 依據 pressedKeys 內容，更新 x 座標
    if (this.pressedKeys.has(KEY.ArrowRight)) {
      this.x += SPEED.CHARACTER_RUN * deltaTime;
    }
    if (this.pressedKeys.has(KEY.ArrowLeft)) {
      this.x -= SPEED.CHARACTER_RUN * deltaTime;
    }
  }
}
```

### 建立 `tick` 方法、啟用 `ticker`

`tick` 要用箭頭函式，因為它會被當作 callback 傳入 `Ticker`，若使用一般函式，this 會指向 PixiJS 本身的 `Ticker`，而不是 `Character` 實例。

```javascript
class Character {
  constructor() {
    // ...
  }

  async init() {
    // ...

    // 創建 ticker
    const ticker = new Ticker();
    // 註冊回調函數
    ticker.add(this.move);
    // 開始執行 ticker
    ticker.start();
  }

  // ...略

  tick = (ticker) => {
    const { deltaTime } = ticker;

    // 這邊傳入 deltaTime 參數給 run 方法使用
    this.run(deltaTime);

    // 重新設定角色的 x, y 座標
    this.avatar?.position?.set(this.x, this.y);
  };
}
```

試著使用左右鍵來移動角色，結果如下
![GIF](https://i.imgur.com/QeBiDeI.gif)

## - step6. 使角色跳躍

會需要幾個屬性：

| 參數         | 型別    | 說明                                                                          |
| ------------ | ------- | ----------------------------------------------------------------------------- |
| isJumping    | boolean | 角色是否正在跳躍中                                                            |
| jumpVelocity | number  | 跳躍速度，為了讓跳躍更真實，需要此參數來達到重力效果，而不是單純的在 y 軸移動 |
| jumpAt       | number  | 跳躍的起始點                                                                  |

### 新增屬性

```javascript
class Character {
  jumpVelocity: number = 0;
  isJumping: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    // 記錄初始的 y 做為 jumpAt 的起始點
    this.jumpAt = y;
  }
}
```

### 定義物理系數

在 `src/constant/config.ts` 中，定義重力、跳躍力度的物理系數：

```javascript
const PHYSICS = {
  GRAVITY: 0.8,
  POWER: 12,
};

export { SPEED, PHYSICS };
```

### 定義 jump 方法

跳躍實作細節說明：\
我們在起跳時設定 jumpVelocity（跳躍速度）為 `-PHYSICS.POWER` 也就是 `-12`。並且每幀都會將 jumpVelocity 加上 `PHYSICS.GRAVITY`，因此往上跳時，每幀的移動量會慢慢減少，到頂點往下墜時，每幀的移動量會慢慢增加，達到重力的效果。

如下表中可以看到：\
從第一幀開始，y 座標漸小（往上移動）；\
到了第 15 幀，jumpVelocity 變為 0，這時為頂點；\
第 16 幀，jumpVelocity 轉為正的，y 座標漸漸變大（往下移動）直到趨近 0

| 第幾幀 | jumpVelocity | y 座標 (假設起始值為 0) |
| ------ | ------------ | ----------------------- |
| 0      | -12          | 0                       |
| 1      | -11.2        | 0 - 12 = -12            |
| 2      | -10.4        | -12 - 11.2 = -23.2      |
| 3      | -9.6         | -23.2 - 10.4 = -33.6    |
| 4      | -8.8         | -33.6 - 8.8 = -42.4     |
| ...    | ...          | ...                     |
| 14     | -0.8         | -93.8 - 1.6 = -95.4     |
| 15     | 0            | -95.4 - 0.8 = -96.2     |
| 16     | 0.8          | -96.2 + 0 = -95.4       |
| 17     | 1.6          | -95.4 + 0.8 = -94.6     |
| ...    | ...          | ...                     |
| 30     | 12           | -22.8 + 11.2 = -11.6    |
| 31     | 12.8         | -11.6 + 12 = 0.4        |

```javascript
class Character {
  // ...略

  jump(deltaTime) {
    // 當 pressedKeys 記錄有 ArrowUp && 非跳躍中時
    if (this.pressedKeys.has(KEY.ArrowUp) && !this.isJumping) {
      this.isJumping = true; // 將狀態改為跳躍中
      this.jumpVelocity = -PHYSICS.POWER; // 設定角色起跳時的初速度
      this.jumpAt = this.y; // 更新起跳點
    }

    if (this.isJumping) {
      // 應用重力
      this.jumpVelocity += PHYSICS.GRAVITY;

      // 更新 Y 坐標
      this.y += this.jumpVelocity * deltaTime;

      // 若落地
      if (this.y >= this.jumpAt) {
        this.y = this.jumpAt;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    }
  }
}
```

操作畫面如下：
![GIF](https://i.imgur.com/oQuMEwK.gif)

---

閱讀下一章：[手把手教你用 PixiJS 做一個平台遊戲 #5 角色細節](./pixi-platformer-5)
