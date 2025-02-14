這章節會教學如創建遊戲地形場景，首先會創建 `Tile` 元件，它是地形的基本組成單位，代表了一個個的小方塊；接著再使用 `Tile` 組合成 `Terrain`（地形）。

## 素材說明

> 📌 建議先閱讀先前文章的[ (9) Sprite sheet ](<./pixi-notes#(9)-sprite-sheet>)以及[ (10) JSON Sprite Sheet ](<./pixi-notes#(10)-json-sprite-sheet>)，會比較好理解。

我已用線上工具產生了 sprite sheet，在 `public/tile` 中，有 tile 的 png 及 JSON 檔。：

- `tile.png` 中，有一格一格的 tile，總共 114 個，每個 tile 的尺寸都是 16x16，我們會像積木一樣把這些 tile 拼湊起來，成為遊戲場景。
- `tile.json` 中，可以看到 `frames` 中有 `1.png`, `2.png`, `3.png`... 直到 `114.png`，他們對應的就是 `tile.png` 中的每個 tile，其對應的 tile 如下圖。

![GIF](https://i.imgur.com/RQGr2S5.png)

## - step1. 建立 Tile 元件

1. 在 `src/component` 下新增 `Tile.ts` 的檔案，在裡面創建一個 Tile class
2. 建立幾個屬性

- frameNo: 對應素材的 tile 編號
- x: 此 tile 的 x 座標
- y: 此 tile 的 y 座標

3. 創建一個 `create` 方法，我們將在裡面載入素材、初始化元件

```javascript
class Tile {
  constructor(frameNo: number, x: number, y: number) {
    this.frameNo = frameNo;
    this.x = x;
    this.y = y;
  }

  async create() {
  }
}
```

## - step2. create 方法

1. 首先用 `Assets` 載入 `tile.json`
2. 用 `Texture.from()` 將圖片轉為 texture
3. 再用 `Sprite.from` 將 texture 轉為 sprite
4. 設定 sprite 的位置與錨點，並將它加入舞台

```javascript
class Tile {
  constructor() {
    //...
  }

  async create() {
    // 1. 載入 tile.json
    await Assets.load('/public/tile/tile.json');

    // 2. 將圖片轉為 texture
    // 3. 再將 texture 轉為 sprite
    this.tile = Sprite.from(Texture.from(`${this.frameNo}.png`));

    // 4. 設定位置、錨點
    this.tile.position.set(this.x, this.y);
    this.tile.anchor.set(0.5, 0.5);

    // 4. 加到舞台
    app.stage.addChild(this.tile);
  }
}
```

## - step3. 使用 Tile

在 `src/index.ts`中，使用創建的 Tile Class

```javascript
import Background from './components/Background';
import Fruit from './components/Fruit';
import Character from './components/Character';
import Tile from './components/Tile';

const bg = new Background('Brown');
const apple = new Fruit('apple', 200, 150);
const character = new Character(300, 300);

// 創建 tile 實例，傳入 tile編號, x座標, y 座標
const tile1 = new Tile(77, 84, 250);
const tile2 = new Tile(78, 100, 250);
const tile3 = new Tile(79, 116, 250);

const initGame = async () => {
  await bg.init();
  await apple.init();
  await character.init();

  // 使用 create 方法
  await tile1.create();
  await tile2.create();
  await tile3.create();
};

initGame();
```

結果如下：
![GIF](https://i.imgur.com/6l7hIKn.gif)

## - step4. 創建 Terrain 元件
