---
tags: pixi
---

> 以下內容為 PIXI.js 版本為 v7

## 載入Pixi.js

1. 安裝 pixi.js
https://www.npmjs.com/package/pixi.js?activeTab=readme
```
> npm install pixi.js
```
2. 在 `js` 檔案裡面引入pixi
```javascript=
import * as PIXI from 'pixi.js';
```



---

## (1) 創建Pixi application

1. 要使用Pixi，我們要先創建一個`Pixi Application`的實例。
2. Pixi會產生canvas元素，我們要再把它放到DOM裡。
- `new PIXI.Application` 的 arguments 可參考官方文件
（範例中使用 `antialias: true` 可讓畫面不會有鋸齒狀、寬高設為`window.innerWidth`和`window.innerHeight` 來填滿畫面）

```javascript=1
// 創建 pixi app
const app = new PIXI.Application({ 
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  background: '0x23395d'
});

// 放到 DOM 裡面
document.body.appendChild(app.view);
```

---

## (2) 用`Graphics`畫各種形狀
- Pixi的各種形狀都在`Grahpics`這個Class底下，我們創建的形狀無論是方形、圓型、線條...等，都是`Grahpics`的實例。
- 畫好形狀後，要把這個形狀放到舞台(stage)上面。
可把stage想像成是`HTML`的`<body>`，所有要顯示的東西都要放到這邊。

### - 線條
> lineStyle的三個參數如下：
> lineStyle(寬度, 顏色, 透明度)
```javascript=1
const line = new PIXI.Graphics();

line.lineStyle(5, 0xDE3249, 1)
line.moveTo(100, 500) // (起始點x座標, 起始點y座標)
line.lineTo(200, 500) // (結束點x座標, 結束點y座標)

// 也可以這麼寫
line
  .lineStyle(5, 0xDE3249, 1)
  .moveTo(100, 500)
  .lineTo(200, 500) 

// 呼叫addChild這個方法，把線放到畫面上
app.stage.addChild(line)
```


### - 方形
```javascript=1
const rectangle = new PIXI.Graphics();

rectangle
  .beginFill(0x2a9d8f); // 開始畫、並設定顏色
  .drawRect(50, 50, 150, 100); // drawRect(x座標, y座標, 寬, 高)
  .endFill(); // 結束

app.stage.addChild(rectangle)
```

### - 圓型
> drawCircle的三個參數如下：
> drawCircle(圓心的x座標, 圓心的y座標, 半徑長度)
```javascript=1
// 有外框線的圓型
const circleWithStroke = new PIXI.Graphics();

circleWithStroke.lineStyle(2, 0xFEEB77, 1)
  .beginFill(0xDE3249, 1)
  .drawCircle(100, 400, 50)
  .endFill();

// 圓型
const circle = new PIXI.Graphics();

circle.lineStyle(0)
  .beginFill(0xDE3249, 1)
  .drawCircle(100, 250, 50)
  .endFill();

// 放到畫面上
app.stage.addChild(circleWithStroke, circle)
```

---
## (3) 文字

- 要創建文字，使用`Text` Class
- 若要給文字加上樣式，使用`TextStyle`這個Class
```javascript=1
// 樣式
const myStyle = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'italic',
  fontWeight: 'bold',
  fill: '#ffffff',
  stroke: '#4a1850',
});

// 創建文字
const myText = new PIXI.Text('Hello World!!', myStyle);

app.stage.addChild(myText);
```

- 若要改變文字內容，使用`text`這個property
```javascript=1
myText.text = 'Text changed！'
```
---
## (4) `Texture` 和 `Sprite`
- 在 pixi 中，不能直接使用圖片，要先把圖片轉為 `texture`，再把 `textrure` 轉成 `sprite`。
- 什麼是 `texture`？
因為 Pixi 使用 WebGL 在 GPU 上渲染圖像，圖像需要轉換為 GPU 可以處理的東西，這個東西被稱為 `texture`
- 什麼是 `sprite` ?
`sprite` 是 pixi 的物件，我們可以控制它的大小、位置...等，圖片都要轉為 `sprite` 的形式，才能添加到舞台。

**步驟**
1. 用 `Texture.from()` 將圖片轉為 texture
2. 再用 `Sprite()` 將 texture 轉為 sprite
3. 放到舞台上

```javascript=1
// 1.轉為 texture
const carTexture = PIXI.Texture.from('./src/images/car.svg');

// 2.再轉為 sprite
const car = new PIXI.Sprite(carTexture);

// 設置位置、寬高
car.position.set(100, 200);
car.width = 50;
car.height = 25;

// 3.加到舞台
app.stage.addChild(car);
```
---
## (5) `Container`
- 前面範例中，都是把文字、形狀、圖片...等直接加到舞台，我們也可以先把這些東西放到 `container` 裡變成一組，再加到舞台上。
- 使用 `Container()` 創建 container
- 也可改變 `container` 及裡面物件的的大小、位置。
- `container` 裡面物件的位置是相對於 `container` (可以想像成：`container` 是 css 中的 `position: relative`，而裡面物件是 `position: absolute` 的概念)
```javascript=1
// 創建 container
const container = new PIXI.Container();

// 圖片 sprite
const texture = PIXI.Texture.from('./src/images/banana.svg');
const banana = new PIXI.Sprite(texture);

// 創建文字
const myText = new PIXI.Text('Banana!!');

// 將 sprite, 文字放入 container
container.addChild(banana);
container.addChild(myText);

// 調整位置
container.position.set(100, 100);
myText.position.set(10, 50)

// 將 container 加到舞台
app.stage.addChild(container);
```

---

## (6) 用 `Ticker` 做動態效果
- 使用 pixi 的 `ticker` 來創建循環函數
- 每秒循環次數依使用者裝置的幀數而不同，例如：使用者用的是60hz的螢幕，函數就會每秒被呼叫60次。
- `ticker` 有一個 `delta` 參數，因使用者裝置的幀數不同，動畫效果會有差異，要用 `delta` 來修正。

先畫一個方形
```javascript=1
// 方形
const rectangle = new PIXI.Graphics();
rectangle
  .beginFill(0xffaaff) // 顏色
  .drawRect(200, 200, 100, 100) // 位置,大小
  .endFill()

app.stage.addChild(rectangle);
```

用ticker讓方形移動
- 用 `ticker.add()` 方法來製造動態
- 用 `ticker.remove()` 來移除動態
```javascript=1
// 方形移動function
const move = (delta) => {
  // x座標加1 (往右移)
  rectangle.x += 1 * delta;
}

// 開始動態
app.ticker.add(move);

// 停止
app.ticker.remove(move);
```

--- 
## (7) 事件綁定
- 前面介紹的物件（`Container`, `Graphics`, `Text`, `Sprite` ... 等）都是可以互動的，我們可以用 `eventMode = 'dynamic'` 來將他們設定為可互動，並綁定事件。
- 下面範例中，我們要讓方形在點擊、按下空白鍵時，往右移動。

先畫一個方形
```javascript=1
const rectangle = new PIXI.Graphics();
rectangle
  .beginFill(0xaaffaa) // 顏色
  .drawRect(300, 400, 100, 100) // 位置,大小
  .endFill()

app.stage.addChild(rectangle);
```

寫好一個往右移動的function
```javascript=1
function moveRight () {
  rectangle.x += 10;
}
```

設定互動
```javascript=1
// 設為可互動的
rectangle.eventMode = 'dynamic';

// hover時鼠標為pointer
rectangle.cursor = 'pointer';
```

綁定事件
```javascript=1
// 綁定點擊事件
rectangle.on('pointerdown', moveRight);

// 綁定鍵盤事件
window.addEventListener("keydown", (e) => {
  const { code } = e;
  // 按空白鍵時，往右移
  if (code === 'Space') {
    moveRight();
  }
});
```

---
## (8) `Asset`
- 我們可以用 `Asset` 來載入需要的素材，如 `json` 或是圖片

**步驟**
1. 用 `Assets` 來載入圖片，它會回傳一個 promise
2. 當 promise 執行成功，就會回傳這個圖片的 `texture`
3. 再把這個 `texture` 轉成 `sprite`
4. 放到舞台上

```javascript=1
// 1.載入圖片
const texturePromise = PIXI.Assets.load('./src/images/car.png');

// 2.當 promise resolve 時，回傳 texture
texturePromise.then((texture) => {
  // 3.將 texture 轉為 sprite
  const car = PIXI.Sprite.from(texture);

  // 設置位置、寬高
  car.position.set(100, 200);
  car.width = 50;
  car.height = 25;

  // 4.加到舞台
  app.stage.addChild(car);
});
```
---

## (9) Sprite sheet
- 在前面我們都是把一張圖片轉為 `texture`，再轉為 `sprite`，但做遊戲通常會有很多張圖片，一張一張載入不僅不方便，還會影響性能。
- 因此，我們會使用 sprite sheet 的作法。sprite sheet就是把好幾個圖片，集合到一張圖片裡。如下：
![](https://i.imgur.com/lBQ7lf5.png)
- 要使用的話，就裁切下那部分，這樣就只要載入一次就好。

### 範例
我們用下面壽司圖片來做練習
兩個壽司圖案寬高都是96px

| ![](https://i.imgur.com/1iOYfbv.png)| ![](https://i.imgur.com/m0MediE.png) |
| -------- | -------- |

```javascript=1
// 載入壽司圖片
const texturePromise = PIXI.Assets.load('./src/images/sushi.png');

texturePromise.then((texture) => {
  // 創建長方形來裁切
  // PIXI.Rectangle(裁切的起點x, 裁切的起點y, 寬, 高)
  const rect = new PIXI.Rectangle(0, 0, 96, 96);
  texture.frame = rect;

  // 將 texture 轉為 sprite
  const sushi = PIXI.Sprite.from(texture);

  // 設置位置
  sushi.position.set(300, 200);

  // 加到舞台
  app.stage.addChild(sushi);
});
```

這樣的結果就會得到上面那個壽司，若想要裁出下面的壽司，要改變裁切的位置。
如下：
```javascript=1
  const rect = new PIXI.Rectangle(0, 96, 96, 96);
```

---
## (10) JSON Sprite Sheet

我們可以用一些工具(https://www.piskelapp.com/p/create/sprite)來產生 JSON sprite sheet，它會把好幾個圖片集合起來，產出一張 png，和一個 json 檔，這個 json 檔會包含各圖片的大小位置等資訊。

以下的壽司圖片和 json 就是線上工具產生出來的。

- 壽司圖片
![](https://i.imgur.com/UJbhoTA.png)

- 壽司 json 檔
  可以看到 json 檔產出時，它自動把上面那張壽司的檔名叫 `sushi0.png`，下面那張壽司叫 `sushi1.png`。
```json=1
{
  "frames": {
    "sushi0.png": {
      "frame": {
        "x": 0,
        "y": 0,
        "w": 96,
        "h": 96
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 96,
        "h": 96
      },
      "sourceSize": {
        "w": 96,
        "h": 96
      }
    },
    "sushi1.png": {
      "frame": {
        "x": 0,
        "y": 96,
        "w": 96,
        "h": 96
      },
      "rotated": false,
      "trimmed": false,
      "spriteSourceSize": {
        "x": 0,
        "y": 0,
        "w": 96,
        "h": 96
      },
      "sourceSize": {
        "w": 96,
        "h": 96
      }
    }
  },
  "meta": {
    "app": "https://github.com/piskelapp/piskel/",
    "version": "1.0",
    "image": "sushi.png",
    "format": "RGBA8888",
    "size": {
      "w": 96,
      "h": 192
    }
  }
}
```

**練習：**
用 json 的方式來產生 `sprite`
```javascript=1
// 載入 json
const promise = PIXI.Assets.load('./src/images/sushi.json');

promise.then(() => {
  // 轉為 texture
  const sushi0Texture = PIXI.Texture.from('sushi0.png');
  const sushi1Texture = PIXI.Texture.from('sushi1.png');

  // 轉為 sprite
  const sushi0 = PIXI.Sprite.from(sushi0Texture);
  const sushi1 = PIXI.Sprite.from(sushi1Texture);

  // 加到舞台 
  app.stage.addChild(sushi0, sushi1)
})
```

## (11) AnimatedSprite
- 可以用 `AnimatedSprite` 來製作 `sprite` 動畫
- 例如遊戲中會有道具不斷閃爍的效果，就可以用 `AnimatedSprite` 來作
![](https://i.imgur.com/gRNVVpg.gif)
```javascript=1
import app from "./index.js";

const promise = PIXI.Assets.load('./src/images/sushi.json');

promise.then(() => {
  // 創建一個 array 來存放 texture
  const sushiTextureArray = [];

  for (let i = 0; i < 2; i++) {
    // 轉為 texture 並放入 array
    sushiTextureArray.push(PIXI.Texture.from(`sushi${i}.png`));
  }

  // 轉為 AnimatedSprite
  const sushi = new PIXI.AnimatedSprite(sushiTextureArray);

  // 設置位置, 動畫速度
  sushi.position.set(500, 300);
  sushi.animationSpeed = 0.05;
    
  // 動畫開始
  sushi.play();

  // 加到舞台 
  app.stage.addChild(sushi)
})
```



