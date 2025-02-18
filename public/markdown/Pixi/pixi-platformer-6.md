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

前面 step3 只是個示例，展示 `Tile` 如何使用。\
接下來我們要將 `Tile` 拼湊成遊戲地形，`Terrain` 就是我們的遊戲地形元件。

1. 在 `src/component` 下新增 `Terrain.ts` 的檔案，在裡面創建一個 Terrain class
2. 建立屬性 map，代表這個地形的地圖，它會是個數字矩陣（由數字陣列構成的陣列）
3. 創建一個 `init` 方法，我們將在裡面依據 map 來創建 `Tile` 實例，製作地圖

```javascript
import Tile from "./Tile";

class Terrain {
  constructor(map: number[][]) {
    this.map = map;
  }

  async init() {
  }
}

export default Terrain;
```

## - step5. 建立常數

1. 在 `src/constants/config.ts` 中，定義 TILE 相關的常數

備註：前面說過，我們已預設好遊戲畫面範圍為寬 608px, 高 368px，因此 X_COUNT 為 `608 ÷ 16`；Y_COUNT 為 `368 ÷ 16`

```javascript
const TILE = {
  SIZE: 16, // tile 的尺寸，寬高都是 16px
  HALF_SIZE: 8, // tile 尺寸的一半，8px
  X_COUNT: 38, // 水平方向的 tile 數量
  Y_COUNT: 23, // 垂直方向的 tile 數量
  GROUND_BASE_Y: 336, // 地面的最低高度（目前還不會用到）
};
```

2. 在 `src/constants` 中，新增 `map.ts` 檔案，在裡面定義地圖

- `map` 會是一個包含 23 個陣列的陣列，而每個陣列中陣列中又會有 38 個數值
- 23 和 38 是怎麼來的呢？它們就是 Y_COUNT 和 X_COUNT，代表垂直和水平方向的 tile 數量
- 陣列裡面的每個數值，代表一個 Tile。數字就是 frameNo（tile 編號）會決定要使用哪個圖片，例如 1 就是 `1.png`，數字及對應的圖片可以看[前面](./pixi-platformer-6#素材說明)
- 數字為 0 的話，代表不需渲染 Tile

```javascript
const map = [
  [
    1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 114,
  ],
  [
    8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 114,
  ],
  [
    8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 114,
  ],
  // ... 略
];

export { map };
```

## - step6. 創建地形

在 `Terrain.ts` 中：

1. 引入 TILE 相關常數
2. 建立 tiles 參數，我們要用它來存放這個 map 的所有 tile
3. 建立 init 方法，在裡面會根據 map 的數據，逐步建立遊戲地圖的 tile

```javascript
import Tile from "./Tile";
import { TILE } from "../constants/config";

class Terrain {
  tiles: Tile[] = [];

  constructor(map: number[][]) {
    this.map = map;
  }

  async init() {
    // 用來存放 Promise 的陣列，稍後會用 Promise.all() 來等待所有 tile 建立完成
    const tilePromises = [];

    // 用兩層迴圈逐格掃描整個地圖的數字矩陣
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        // 對應的 tile 編號，用來決定該位置要用哪張圖片
        const frameNo = this.map[y][x];

        // 若為 0 的話代表空白，不需要 tile
        if (frameNo !== 0) {
          // 計算 tile 的座標
          const xPosition = TILE.SIZE / 2 + x * TILE.SIZE;
          const yPosition = TILE.SIZE / 2 + y * TILE.SIZE;

          // 建立 Tile 實例
          const tile = new Tile(frameNo, xPosition, yPosition);

          // 等待 tile 創建完成
          // 當 tile.create() 完成後，會將 tile 加入 this.tiles 陣列
          tilePromises.push(tile.create().then(() => this.tiles.push(tile)));
        }
      }
    }
    // Promise.all 會等待所有 tile 創建完成，確保 init() 在所有 tile 準備好後才結束。
    await Promise.all(tilePromises);
  }
}

export default Terrain;
```

## - step7. 使用 Terrain

在 `src/index.ts` 中，使用 Terrain

```javascript
import Background from './components/Background';
import Fruit from './components/Fruit';
import Character from './components/Character';
import Terrain from './components/Terrain';
import { map } from './constants/map';

const bg = new Background('Brown');
const apple = new Fruit('apple', 200, 150);
const character = new Character(300, 300);

// 創建 Terrain 實例，傳入 map
const terrain = new Terrain(map);

const initGame = async () => {
  await bg.init();
  await apple.init();
  await character.init();

  // init
  await terrain.init();
};

initGame();
```

結果如下：
![IMG](https://i.imgur.com/iLiHqrC.png)
