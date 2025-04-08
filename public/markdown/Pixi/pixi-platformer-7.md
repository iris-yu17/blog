在遊戲中，會需要「碰撞偵測」，例如角色吃到水果、角色碰到牆壁、或是在不同高度的地形間跳躍...等。\
在我們的遊戲中，需要偵測碰撞的東西有兩個：水果與地形，我們要偵測角色是否有碰到他們，而這章節會教學如何做到這件事。

## 說明

這章節會偵測地形的碰撞，我們先簡單說明要做什麼事。

1. 首先要取得 `Terrain` 中的地形資料（也就是各個 `Tile` 的 x, y 座標），將地形資料傳入 `Character` 讓它使用（因這只是個簡單的小遊戲教學，所以用最簡便的方法，直接傳入）
2. 創建一個 getNearbyTiles 函式，用來取得角色四周的 tiles
3. 創建一個 checkIfCollide 函式，用來判斷物體與角色是否有碰撞
4. 創建一個 handleCollision 函式，在此函式中，做相對應的處理，例如：碰撞到水果要讓水果消失，碰撞到牆壁，就不能繼續往該方向移動...等。
5. 將 handleCollision 放入 `tick` 函式，讓它每一幀都執行。

## - step1. 讓 `Character` 使用地形資料

在 `src/index.ts` 中，將 `Terrain` 實例的 `tiles` 傳入 `Character` 中

```javascript
import Background from './components/Background';
import Fruit from './components/Fruit';
import Character from './components/Character';
import Terrain from './components/Terrain';
import { map } from './constants/map';

const bg = new Background('Brown');
const apple = new Fruit('apple', 200, 150);

// Terrain 實例
const terrain = new Terrain(map);
// 取得 tiles
const tilesMap = terrain.tiles;
// 傳入 Character
const character = new Character(300, 300, tilesMap);

const initGame = async () => {
  await bg.init();
  await apple.init();
  await character.init();
  await terrain.init();
};

initGame();
```

而在 `Character` 中，要加上 `tiles` 屬性

```javascript
class Character {
  constructor(x: number, y: number, tiles: Tile[]) {
    this.x = x;
    this.y = y;
    this.jumpAt = y;
    // 加上 tiles
    this.tiles = tiles;
  }

  // ...略
}
```

## - step2. 加上 CHARACTER config

在 `config.ts` 中，加上角色相關的常數。

```javascript
const CHARACTER = {
  SIZE: 32,
  HALF_SIZE: 16,
  OFFSET_X: 4,
  OFFSET_Y: 6,
};
```

- `SIZE`：代表角色的大小，為 32px
- `OFFSET_`：由於角色寬高皆為 32px，但角色本身並不是剛好填滿這個 32x32 的方形，若直接以 32px 來計算碰撞，視覺上會感覺明明還沒碰到，就被判斷碰到了，因此使用這個常數來修正。

![img](https://i.imgur.com/M1OcHF4.png)

## - step3. 取得角色周圍的 tiles

要做碰撞偵測，我們會需要比對角色與 tiles 的 x, y 座標，來判斷是否有碰到。\
而一張地圖的 tiles 這麼多，每個都去比對太沒效率，因此在這步驟，我們要先找到角色四周九宮格範圍的 tiles，這樣之後就只要比對這些 tiles 就好。

在 `Character` 中，創建一個 `getNearbyTiles` 函式，來取得角色四周的 tiles。

```javascript
class Character {
  // ...略

  getNearbyTiles() {
    const arr = [];
    for (const tile of this.tiles) {
      if (
        Math.abs(tile.x - this.x) < CHARACTER.SIZE &&
        Math.abs(tile.y - this.y) < CHARACTER.SIZE
      ) {
        arr.push(tile);
      }
    }
    return arr;
  }
}
```

## - step4. 判斷是否碰撞

接下來，創建 `checkIfCollide` 函式，我們之後要用它來判斷角色是否有碰撞。

此函式會接收一個參數，此參數代表一個物體，在這遊戲中就是水果（Fruit）或組成地形的磚塊（Tile）。

在 `checkIfCollide` 中，我們要做的事為：

1. 計算角色的實際邊界
2. 計算物體的實際邊界
3. 判斷角色與物體是否有重疊
4. 回傳結果 `true` 或 `false`

```javascript
class Character {
  checkIfCollide(item) {
    // 計算角色的實際邊界
    const charLeft = this.x - CHARACTER.HALF_SIZE + CHARACTER.OFFSET_X;
    const charRight = this.x + CHARACTER.HALF_SIZE - CHARACTER.OFFSET_X;
    const charTop = this.y - CHARACTER.HALF_SIZE - CHARACTER.OFFSET_Y;
    const charBottom = this.y + CHARACTER.HALF_SIZE;

    // 計算 item 的實際邊界
    const itemLeft = item.x - TILE.HALF_SIZE;
    const itemRight = item.x + TILE.HALF_SIZE;
    const itemTop = item.y - TILE.HALF_SIZE;
    const itemBottom = item.y + TILE.HALF_SIZE;

    // 判斷橫向與直向是否重疊
    const xOverlap = charRight > itemLeft && charLeft < itemRight;
    const yOverlap = charBottom > itemTop && charTop < itemBottom;

    return xOverlap && yOverlap;
  }
}
```

### 詳細說明：判斷重疊

📌 可能有人會疑惑，在判斷重疊這段，為何是用 `&&` 呢？

```javascript
// 判斷橫向與直向是否重疊
const xOverlap = charRight > itemLeft && charLeft < itemRight;
const yOverlap = charBottom > itemTop && charTop < itemBottom;
```

#### 錯誤思考方式

我們先從錯誤的方式思考看看，若使用 `||` 會怎麼樣？也許你會有以下的思路：

- `charRight > itemLeft` 表示角色右方超過了物體左方，中間重疊代表他們碰撞了
- `charLeft > itemRight` 表示角色左方超過了物體右方，中間重疊代表他們碰撞了

因此使用 `||`，代表角色右方的碰撞或左方的碰撞都屬於 `xOverlap` 的範疇。

以下為角色右方超過物體左方的示意圖：
![img](https://i.imgur.com/wuefJFt.png)

感覺很有道理，但我們再仔細想想：

- 若角色本身就在物體右方，`charRight > itemLeft` 永遠會成立
- 若角色本身就在物體左方，`charLeft > itemRight` 永遠會成立

因此使用 `||` 並不能達到我們的目標。

#### 正確的理解方式

我們先假設角色與物體的 y 相同，角色從左往右移動，碰撞到物體，要滿足兩個條件：

1. 角色右方超過了物體左方，也就是 `charRight > itemLeft`
2. 角色本身位置就在物體左方，也就是 `charLeft > itemRight`

因此要使用 `&&`

反之亦然，若是角色由左方、上方、下方碰撞到物體，都是一樣的思路。

### 詳細說明：回傳也用 `&&`

📌 而在 return 時，為何也是用 `&&` 呢？

```javascript
checkIfCollide(item: Tile) {
  // ...略

  return xOverlap && yOverlap;
}
```

也許你會認為，當水平向碰撞或垂直向碰撞時，都屬於碰撞，因此該使用 `||` 才對。\
然而 xOverlap 並不代表水平向碰撞，而 yOverlap 代也不表垂直向碰撞，它們分別代表的是：**水平向重疊** 以及 **垂直向重疊**。

如以下示意圖，很明顯它並沒有碰撞：\
「角色右方超過了物體左方」並且「角色本身位置就在物體左方」，因此水平向是重疊的，xOverlap 為 `true`；垂直向並沒有交集，yOverlap 為 `false`。

因此應該用 `&&`，當水平、垂直向都有重疊時，才能算是碰撞。

![img](https://i.imgur.com/nNrHBDP.png)

## - step5. 處理碰撞

接下來我們要創建 `handleCollision` 函式，在裡面做碰撞後的相對應處理。

1. 我們在裡面使用了前面的 `getNearbyTiles` 函式來取得角色周圍的 tiles
2. 接著將這些 tiles 傳入 `checkIfCollide`，來判斷角色是否有碰撞到它
3. 若有碰撞，再做相對應的處理，這部分會在下一章節說明，這邊先簡單印出 `collide` 文字

```javascript
class Character {
  // ...略

  getNearbyTiles() {
    // ...略
  }

  checkIfCollide() {
    // ...略
  }

  // 處理碰撞
  handleCollision() {
    // 1. 取得四周 tiles
    const nearbyTiles = this.getNearbyTiles();
    for (let tile of nearbyTiles) {
      // 2. 判斷碰撞
      if (this.checkIfCollide(tile)) {
        // 在裡面要做相對應的處理
        console.log("collide");
      }
    }
  }
}
```

## - step6. 將 handleCollision 放入 tick

記得前面創建的 `tick` 函式嗎？\
`tick` 會在每一幀都執行，我們將 `handleCollision` 放入 `tick`，讓它每幀都執行碰撞偵測並做處理。

```javascript
class Character {
  // ...略

  getNearbyTiles() {
    // ...略
  }

  checkIfCollide() {
    // ...略
  }

  handleCollision() {
    // ...略
  }

  tick() {
    // ...略
    this.handleCollision();
  }
}
```

--- 

接著可以試著在畫面控制角色，看看是否碰到地形時，console 會印出 `collide` 文字。\
若沒問題的話，就可以前往[下一章節](./pixi-platformer-8)了！
