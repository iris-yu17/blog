## 前言

> 有興趣的話可以先試玩我製作的 [Pixel Adventure](https://pixel-adventure-six.vercel.app/)，按照這系列文章，我們會做出一個類似這樣的簡易版遊戲。

- 這系列文章會一步步教學如何使用 PixiJS v8 來製作平台遊戲，範例程式碼可以參考[這邊](https://codesandbox.io/p/sandbox/pixi-tutorial-gm6gjv)。
- 可以先閱讀 [PixiJS v7 基礎筆記](./pixi-notes)，但由於那篇的版本是 `v7`，寫法會稍有不同，不過還是建議先看完那篇，來了解 PixiJS 的基本知識與運作，在實作時會更得心應手。
- 此專案使用的圖檔都是網路上的免費素材，可以在[這邊](https://pixelfrog-assets.itch.io/pixel-adventure-1)找到。

## 準備

1. 建立專案：此篇範例是使用 vite 搭配 ts，可以用以下指令建立專案：

```
npm create vite@latest my-game -- --template vite-ts
```

2. 安裝 PixiJS v8
3. 下載素材：遊戲製作會用到許多素材，例如背景、角色圖片...等。可以直接到[範例程式碼](https://codesandbox.io/p/sandbox/pixi-tutorial-gm6gjv)裡的 `public` 資料夾下載。

## 基本專案配置

### 資料夾結構

```
專案/
├─ public/ 📌 遊戲需要用的json檔, 圖片等資源
│  ├─ character/
│  ├─ fruit/
│  ├─ background/
│  ├─ ...
├─ constants/ 📌 遊戲參數
│  ├─ config.ts
│  ├─ fruit.ts
│  ├─ ...
├─ src/
│  ├─ components/ 📌 元件
│  │  ├─ 元件1
│  │  ├─ 元件2
│  ├─ app.ts 📌 在這邊創建 pixi app
│  ├─ index.ts 📌 在這邊寫遊戲邏輯
├─ index.html
├─ package.json
```

### index.html

- 設定基本的樣式配置
- 我們的 Pixi app 會被放在 `#screen` 裡
- 備註：我們預設好 `#screen` 的寬度為 608px, 高度為 368px，在之後遊戲舞台就會固定使用這寬高

```html
<html>
  <head>
    <title>Pixi Platformer Game</title>
    <meta charset="UTF-8" />
    <style>
      .h1 {
        color: #fff;
        font-size: 24px;
        letter-spacing: 0.25ch;
      }

      body {
        margin: 0;
        display: flex;
        height: 100vh;
        background-color: rgba(26, 26, 43, 1);
      }

      #app {
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #screen {
        width: 608px;
        height: 368px;
        background-color: #fff;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <h1 class="h1">Pixel Adventure</h1>
      <div id="screen"></div>
    </div>

    <script src="src/index.ts"></script>
  </body>
</html>
```

## 創建 Pixi App

在 `app.ts` 創建一個

```javascript
import { Application } from 'pixi.js';

// 創建 pixi app
const app = new Application();

(async () => {
  await app.init({
    background: '#1099bb',
    width: 608,
    height: 368,
  });

  // 放到 DOM 裡面
  document.querySelector('#screen')?.appendChild(app.canvas);
})();

export { app };
```

## 使用 Pixi app

在 `index.ts` 中引入

```javascript
import './app';
```

接著查看畫面，若沒出錯的話，畫面應會長這樣：\
沒問題的話就可以前往[下一篇](./pixi-platformer-2)了🎉

![Imgur](https://i.imgur.com/nqIAjaP.png)
