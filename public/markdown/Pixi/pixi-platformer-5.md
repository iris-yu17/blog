> 這章節會調整角色的細節，例如：\
> 左右移動時，角色要面向該方向；跑步時，要使用跑步的動畫；跳躍時，要使用跳躍的動畫。

## 切換方向

做法：

1. 加上一個 `facingRight` 屬性
2. 改變方向時，更新 `facingRight`
3. 新增 `turnFace` 方法，在這邊改變角色的 scale.x（scale.x 是用來調整物件在 X 軸方向的縮放比例，若為負數就會水平翻轉）
4. 在 `tick` 裡呼叫 `turnFace`

```javascript
class Character {
  // 1. 加上 `facingRight` 屬性，預設為 true
  facingRight: number = 1;

  // ...略

  run(deltaTime) {
    // 2. 依據方向更新 facingRight
    if (this.pressedKeys.has(KEY.ArrowRight)) {
      // 更新 facingRight
      this.facingRight = true;
      this.x += SPEED.CHARACTER_RUN * deltaTime;
    }
    if (this.pressedKeys.has(KEY.ArrowLeft)) {
      // 更新 facingRight
      this.facingRight = false;
      this.x -= SPEED.CHARACTER_RUN * deltaTime;
    }
  };

  // 3. 新增 turnFace 方法
  turnFace = (() => {
    let lastFacingRight = null; // 用閉包變數記住先前的方向

    return () => {
      if (lastFacingRight === this.facingRight) return; // 方向沒變，不做任何事

      lastFacingRight = this.facingRight; // 更新記錄的方向
      this.avatar.scale.x = this.facingRight ? 1 : -1;
    };
  })();

  tick = (ticker) => {
    // ...略

    // 4. 在 tick 中呼叫 turnFace 方法
    this.turnFace();

    this.avatar?.position?.set(this.x, this.y);
  };
}
```

## 依狀態使用不同動畫

### 定義狀態

角色會有三種狀態：

1. 閒置（idle）
2. 跑步（run）
3. 跳躍（jump）

在 `src/components/Character.ts` 裡，定義 enum

```javascript
enum Action {
  Idle = "idle",
  Run = "run",
  Jump = "jump",
}
```

### 創建不同狀態的 texture

在 `public/character` 資料夾裡，有三種狀態的 png 以及 JSON 檔案，我們要在 `init` 時，載入這些素材並創建 texture。

創建一個 `createTexture` 方法，`createTexture` 接收兩個參數：

1. action: 狀態名稱，對應素材的檔名
2. frame: 對應素材動畫的圖片數量，例如 `jump.json` 裡的 frames 有 6 個物件，對應到 `jump.png` 裡的 6 張圖片，因此跳躍的 frame 就會是 6，

將先前 `init` 方法中，處理 texture 的部分移到 `createTexture` 中，並改寫一下，讓它可以依傳入的參數處理不同 texture：

```javascript
class Character {
  // ...

  async init() {
    // 改為用 createTexture 方法
    await this.createTexture(Action.Idle, 11);
    await this.createTexture(Action.Run, 12);
    await this.createTexture(Action.Jump, 6);

    // ...略
  }

  async createTexture(action: Action, frame: number) {
    await Assets.load(`/public/character/${action}.json`);

    const textureArray = [];
    for (let i = 1; i <= frame; i++) {
      textureArray.push(Texture.from(`${action}_${i}.png`));
    }
  };
}
```

### 使用不同狀態的 texture

1. 首先要創建一個屬性，存放不同狀態的 texture，它是一個物件，裡面有三個 key，分別存放 idle、run 和 jump 的 textureArray。
2. 在 `createTexture` 中，將 textureArray 放入 actionTextures
3. 在 `init` 中，使用 `Idle` 也就是閒置狀態的 texture

```javascript
class Character{
  // ...略（其他屬性）
  // 1. 創建 actionTextures 屬性
  actionTextures: {
    idle: Texture[];
    run: Texture[];
    jump: Texture[];
  } = {
    idle: [],
    run: [],
    jump: [],
  };

  async init() {
    await this.createTexture(Action.Idle, 11);
    await this.createTexture(Action.Run, 12);
    await this.createTexture(Action.Jump, 6);

    // 3. 使用閒置狀態的 texture
    this.avatar = new AnimatedSprite(this.actionTextures[Action.Idle]);

    // ...略
  }


  async createTexture (action: Action, frame: number) {
    // ...略

    // 2. 在最後將 textureArray 存入 textures 屬性
    this.actionTextures[action] = textureArray;
  };
}
```

### 切換 texture

為了依據動作切換 texture，我們要：

1. 新增一個 `currentAction` 屬性，記錄下當前的狀態
2. 新增一個 `handleTextureChange` 方法，在裡面判斷目前有什麼鍵被按著，來決定要切換成什麼 texture
3. 在 `tick` 裡呼叫 `handleTextureChange`

```javascript
class Character {
  // 新增屬性
  currentAction: Action = Action.Idle;

  // ...略

  tick = (ticker) => {
    const { deltaTime } = ticker;

    // ...
    // 3. 呼叫方法
    this.handleTextureChange();

    this.avatar?.position?.set(this.x, this.y);
  };

  // 2. 新增方法
  handleTextureChange() {
    let action;
    switch (true) {
      // 若"上"鍵被按著，判斷為"跳躍"狀態
      case this.pressedKeys.has(KEY.ArrowUp):
        action = Action.Jump;
        break;
      // 若"左右"鍵被按著，判斷為"跑步"狀態
      case this.pressedKeys.has(KEY.ArrowLeft) ||
        this.pressedKeys.has(KEY.ArrowRight):
        action = Action.Run;
        break;
      default:
      // 預設為"閒置"狀態
        action = Action.Idle;
        break;
    }

    // 若紀錄的狀態與當前狀態一致，就不需往下執行
    if (this.currentAction === action) return;

    // 更新狀態記錄
    this.currentAction = action;

    // 抽換 texture
    this.avatar.textures = this.actionTextures[action];

    // 播放動畫
    this.avatar.play();
  }
}
```

結果如下：
![GIF](https://i.imgur.com/LVQGeQt.gif)

---

閱讀下一章：[手把手教你用 PixiJS 做一個平台遊戲 #6 創建地形場景](./pixi-platformer-6)
