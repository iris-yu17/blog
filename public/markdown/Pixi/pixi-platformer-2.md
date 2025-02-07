> 這章節會教學如何創建遊戲背景，會使用到 PixiJS 的 `Assets`, `Ticker`, `TilingSprite`。

## - step1. 創建背景元件

1. 在 `src/component` 下新增 `Background.ts` 的檔案，在裡面創建一個 Background class
2. 建立一個 `color` 屬性，我們會用到這個屬性來決定背景的顏色，在 `public/background` 下已有各種顏色的背景素材可以使用
3. 創建一個 `init` 方法，我們將在裡面載入背景素材、初始化元件

```javascript
class Background {
  constructor(color: string) {
    this.color = color;
  }

  async init() {
    // ...
  }
}
```

## - step2. init 方法

### Assets

首先會使用到 `Assets`，當我們需要使用到素材時，就可以用 `Assets.load` 來取得，它會返回一個 promise，當 promise resolve 時，我們就可以取得此素材的 texture。

關於什麼是 texture，可以看前面提到的[基礎筆記](<./pixi-notes#(4)-%E5%92%8C->)

### TilingSprite

接著要使用 `TilingSprite`，它用來處理並渲染可以重複平鋪的畫面，當圖片大小不夠填滿畫布時，它會自動在水平方向和垂直方向上重複。

需要傳入三個參數：

1. texture
2. width: 要填滿的寬度
3. height: 要填滿的高度

```javascript
import { Assets, Ticker, TilingSprite } from "pixi.js";
import { app } from "../app";

class Background {
  constructor(color: string) {
    this.color = color;
  }

  async init() {
    // 1. 使用 Assets 產生 texture
    const bgTexture = await Assets.load(`/background/${this.color}.png`);

    // 2. 使用 TilingSprite 產生平鋪背景
    this.tilingSprite = new TilingSprite({
        // 三個參數
        texture: bgTexture,
        width: 608,
        height: 368,
    });

    // 3. 添加到舞台
    app.stage.addChild(this.tilingSprite);
  }
}
```

## - step3. 使用背景

在 `src/index.ts` 中，使用剛剛創建的 Background Class

```javascript
import './app';
import Background from './components/Background';

// 創建背景實例，這邊使用咖啡色背景
const bg = new Background('Brown');

const initGame = async () => {
  // 調用 Background 的 init 方法
  await bg.init();
};

initGame();
```

接著畫面應該長這樣，可以看到他自動重複了那個小小的 `Brown.png`，填滿成為一個大背景。
![Imgur](https://i.imgur.com/CJA3HgE.png)

## - step4. 給背景加上動態

這會使用到 `Ticker`，`Ticker` 會負責定期調用回調函數來執行每幀的更新，讓我們可以製造動畫效果。
`Ticker` 有一個 `deltaTime` 參數，因使用者裝置的幀數不同，動畫效果會有差異，要用 `deltaTime` 來修正。

範例：

```javascript
import { Ticker } from 'pixi.js';

// 定義回調函數
const callback = (ticker: Ticker) => {
   // 要重複做的事
};

// 創建一個 ticker
const ticker = new Ticker();

// 在 ticker 註冊回調函數
ticker.add(callback);

// 開始執行 ticker
ticker.start();
```

回到 `Background.ts`：\
新增 animate 方法，讓 tilingSprite 每幀往下移動 0.5px

```javascript
import { Assets, Ticker, TilingSprite } from "pixi.js";

class Background {
  constructor(color: string) {
   // ...
  }

  async init() {
    // ...

    // 在最後加上這行，調用 animate 函式，讓背景動起來
    this.animate();
  }

  animate() {
    this.ticker = new Ticker();
    this.ticker.add(({ deltaTime }) => {
      this.tilingSprite.tilePosition.y += 0.5 * deltaTime;
    });

    this.ticker.start();
  }
}
```

結果如下，可以看到背景動起來了
![Imgur](https://i.imgur.com/FrICmjT.gif)

## - step5. 別忘了 destroy ‼️

雖然目前還不會用到，但當切換場景或是移除物件時，要記得使用 `destroy()` 銷毀 `tilingSprite` 和 `ticker`，以免造成不必要的運算消耗、效能下降等問題。

```javascript
import { Assets, Ticker, TilingSprite } from "pixi.js";

class Background {
  constructor(color: string) {
   // ...
  }

  async init() {
    // ...
  }

  animate() {
    // ...
  }

  destroy() {
    this.ticker.destroy();
    this.tilingSprite.destroy();
  }
}
```
