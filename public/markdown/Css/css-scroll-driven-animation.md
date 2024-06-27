> Demo: https://codesandbox.io/p/sandbox/css-scroll-driven-animation-kcxtxz

## 前言

在網頁中，我們可能會用 `GSAP`、`ScrollMagic` 之類的 JS 套件來製作滾動動畫。\
但在 `animation-timeline` 推出之後，我們可以用純 `CSS` 來達到相同的效果了 🤩 真的很讓人驚奇！！\
不過由於瀏覽器兼容性的問題，目前還無法實際應用在專案中。

## animation-timeline 種類

`animation-timeline` 可分為三種：

1. 預設：載入後就執行動畫
2. `Scroll Progress Timeline`（滾動進度時間軸）：
   動畫的時間軸是根據滾動容器的 scrollbar 位置來決定。\
   例如：scrollbar 滾到一半，時間軸會是 50%；scrollbar 滾到最底，時間軸為 100%。
3. `View Progress Timeline`（視區進度時間軸）：
   動畫的時機軸是根據目標元素在的滾動容器中的顯示比例來決定。\
   例如：目標元素剛進入容器時，時間軸會是 0%；當目標元素到達滾動容器邊緣時，則是 100%。

## Scroll Progress Timeline 寫法

有兩種寫法：匿名時間軸跟具名時間軸

### 範例程式碼

我們先把基本 `HTML`, `CSS` 準備好。\
範例中，設定 `#container` 高度為 `100vh`，`#square` 是主要動畫的元素；`#stretcher` 只是用來撐開高度的；

#### HTML

```html
<div id="container">
  <h1>Scroll Progress Timeline</h1>
  <div id="square"></div>
  <div id="stretcher"></div>
</div>
```

#### CSS

```css
@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

body {
  margin: 0;
}

#container {
  height: 100vh;
  overflow-y: scroll;
  position: relative;
}

#square {
  background-color: lightcoral;
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 0;
  animation-name: rotateAnimation;

  animation-timeline: ???;
}

#stretcher {
  height: 200vh;
}
```

### 匿名時間軸

使用匿名時間軸，要在滾動元素使用 `animation-timeline: scroll()`。\
scroll() 裡面的參數可以參考[這邊](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll)。

大致說明一下 scroll() 的參數，可放入兩個參數，一個是 `scroller`，一個是 `axis`。\
1. `scroller`：要以什麼元素來控制動畫滾動。\
   預設為 `nearest`，代表使用最近可滾動的父元素。
2. `axis`：滾動方向。\
   預設為 `block`，代表與書寫方向垂直，例如中文是橫向書寫，滾動方向就是直向 (y軸)。

```css
#square {
  animation-timeline: scroll(block nearest);
}
```

### 具名時間軸

- 自訂 timeline 的名稱，記得名稱要加上 `--` 前綴。
- 在滾動元素加上 `animation-timeline`，並使用 `scroll-timeline-name` 來指定滾動容器。

```css
#container {
  scroll-timeline-name: --squareTimeline;
}
#square {
  animation-timeline: --squareTimeline;
}
```

## View Progress Timeline 寫法

一樣有兩種寫法：匿名時間軸跟具名時間軸

### 範例程式碼

#### HTML

```html
<h1>View Progress Timeline</h1>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Risus quis varius quam quisque
  id. Et ligula ullamcorper malesuada proin libero nunc consequat interdum
  varius. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at
  augue.
</p>
<p>
  Dolor sed viverra ipsum nunc aliquet. Sed sed risus pretium quam vulputate
  dignissim. Tortor aliquam nulla facilisi cras. A erat nam at lectus urna duis
  convallis convallis. Nibh ipsum consequat nisl vel pretium lectus. Sagittis
  aliquam malesuada bibendum arcu vitae elementum. Malesuada bibendum arcu vitae
  elementum curabitur vitae nunc sed velit.
</p>

<div class="square animation"></div>

<p>
  Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Arcu
  cursus vitae congue mauris rhoncus aenean vel. Sit amet cursus sit amet
  dictum. Augue neque gravida in fermentum et. Gravida rutrum quisque non tellus
  orci ac auctor augue mauris. Risus quis varius quam quisque id diam vel quam
  elementum. Nibh praesent tristique magna sit amet purus gravida quis. Duis
  ultricies lacus sed turpis tincidunt id aliquet. In egestas erat imperdiet sed
  euismod nisi. Eget egestas purus viverra accumsan in nisl nisi scelerisque.
  Netus et malesuada fames ac.
</p>
```

#### CSS

```css
@keyframes appear {
  from {
    opacity: 0;
    transform: scaleX(0);
  }

  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.square {
  width: 300px;
  height: 200px;
  margin: 0 auto;
  background-color: deeppink;
}

p {
  font-size: 1.5rem;
  line-height: 1.5;
}
```

### 匿名時間軸

要在滾動元素使用 `animation-timeline: view()`。\
大致說明 view() 的參數，有兩個， `inset` 和 `axis`：\
1. `inset`：可以有兩個值，預設是 `auto`。 `inset` 是用來設定動畫的起訖點。若為正，表示觸發動畫開始或結束的位置向內移動（也就是動畫會變晚開始或變早結束），反之亦然。
2. `axis`：和 scroll() 一樣。

```css
.animation {
  animation-timeline: view();
}
```

### 具名時間軸

```css
.animation {
  view-timeline-name: --squareAppear;
  animation-timeline: --squareAppear;
}
```
