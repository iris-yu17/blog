> 在許多遊戲中，玩家可收集的金幣、果實、寶石等道具，這章節要來製作道具的動畫。\
> 會使用到 PixiJS 的 `AnimatedSprite`，以及 `public/fruits` 資料夾裡的水果 png, JSON 素材。

## - step1. 創建水果元件

1. 在 `src/component` 下新增 `Fruit.ts` 的檔案，在裡面創建一個 Fruit class
2. 建立屬性：

- name: 我們會用到這個屬性來決定要拿哪個水果素材，在 `public/fruit` 下已有各種素材可以使用
- x: 水果要擺放的 x 座標
- y: 水果要擺放的 y 座標

3. 創建一個 `init` 方法，我們將在裡面載入背景素材、初始化元件

```javascript
class Background {
  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  async init() {
    // ...
  }
}
```

## - step2. 載入素材

### 素材

需要載入 `public/fruits` 資料夾裡水果的 png 以及 json 檔

**png:**\
我們看一下 `apple.png`，會看到一排共 17 個蘋果，這些蘋果連續播放，就會成為一個動畫。\
這張圖片裡面各個蘋果的尺寸都是 32x32，合在一起成為寬 32px, 高 544px 的圖片。

**JSON:**\
查看 `apple.json`，會發現有 `apple_1.png`, `apple_2.png`...等以及 x, y 座標，實際上它們對應的是 `apple.png` 內的不同區塊（也就是 `apple.png` 裡的第一顆蘋果、第二顆蘋果...等）。

### 載入素材

建議先閱讀先前文章的[ (9) Sprite sheet ](<./pixi-notes#(9)-sprite-sheet>)以及[ (10) JSON Sprite Sheet ](<./pixi-notes#(10)-json-sprite-sheet>)。

1. 使用 `Assets.load` 載入 JSON 檔，它定義了這張 spritesheet 的內容，當 PixiJS 載入這個 JSON 時，它會自動解析對應的圖片（例如 apple.png）。
2. 建立一個陣列
3. 使用 `Texture.from` 將這些圖片轉為 texture，再放入陣列裡。

```javascript
import { Assets, Texture, AnimatedSprite } from 'pixi.js';

class Fruit {
  constructor() {
    // ...
  }

  async init() {
    // 1. 載入 JSON
    await Assets.load(`/public/fruits/${this.name}.json`);

    // 2 .建立陣咧
    const textureArray = [];

    // 3. 將圖片轉為 texture，並放入陣列
    for (let i = 1; i <= 17; i++) {
      textureArray.push(Texture.from(`${this.name}_${i}.png`));
    }
  }
}

export default Fruit;
```

## - step3. 建立動畫

用 `AnimatedSprite` 將 texture 陣列轉為動畫\
有一些參數可以設置：
| 參數 |值| 說明 |
| ------- | --- | ---------------------------------------- |
|animationSpeed| 數字 |動畫速度|
| anchor | 數字 0~1 |錨點，用來決定旋轉、縮放與定位時的基準點，例如：(0, 0)為左上角，(0.5, 0.5)為中心 |
| position | 數字 (x,y) | 位置 |

```javascript
import { Assets, Texture, AnimatedSprite } from 'pixi.js';

class Fruit {
  constructor() {
    // ...
  }

  async init() {
    // - step2 內容
    // ....

    // 將 texture 陣列轉為動畫
    this.fruit = new AnimatedSprite(textureArray);

    // 參數設定
    this.fruit.animationSpeed = 0.35;
    this.fruit.anchor.set(0.5, 0.5);
    this.fruit.position.set(this.x, this.y);

    // 播放動畫
    this.fruit.play();

    // 加到舞台
    app.stage.addChild(this.fruit);
  }
}

export default Fruit;
```

## - step4. 使用水果

在 `src/index.ts`中，使用創建的 Fruit Class

```javascript
import Background from './components/Background';
import Fruit from './components/Fruit';

const bg = new Background('Brown');

// 建立一個 Fruit 實例，使用 apple 素材，位置設為 x: 200, y: 150
const apple = new Fruit('apple', 200, 150);

const initGame = async () => {
  await bg.init();

  // 調用 Fruit 的 init 方法
  await apple.init();
};

initGame();
```

結果如下
![GIF](https://i.imgur.com/6Eik7qR.gif)
