## HTML注意事項

1. 必須寫上 lang 屬性 如 `lang="zh-Hant”`
   - lang 屬性會讓螢幕閱讀器知道要用什麼語言
   - 多語系網站應依照語系填寫 lang 值
   - [語系對照表](https://www.w3schools.com/tags/ref_language_codes.asp)
2. Landmark
   使用語意化標籤定義網頁主要結構，例如：
   `header, nav, main, aside, section, footer` 這些稱為 landmark, 能讓螢幕閱讀器的使用者跳到特定的區塊進行閱覽
   ![Imgur](https://i.imgur.com/lgBtx3r.jpg)
3. 標題
   - 每個頁面要有一個 `<h1>`
   - `<h1> - <h6>` 照順序寫，不可跳層
4. 標籤\
   要使用正確的標籤，避免用 `<div>` `<span>` 來做 table, list, button 等等。\
   若一定要用，需額外：

   - 加上 `role` 屬性，讓使用者知道這是什麼
   - 若為可互動向元素，加上 `tabindex=”0”` 讓鍵盤能focus
   - 用 `<div>` 來做按鈕的[範例](https://mdn.github.io/learning-area/tools-testing/cross-browser-testing/accessibility/fake-div-buttons.html)

5. 表格

   - 需有 `<th>` 元素，並可以用 `scope="row/col”` 來表示欄位的關聯。
   - 需有 `summary` 屬性 或 `<caption>` 來形容table內容 (比較建議 `<caption>` ，因一般使用者也能看到)

   ❌ [錯誤範例](https://mdn.github.io/learning-area/accessibility/html/bad-table.html)

   ✅️ [正確範例](https://github.com/mdn/learning-area/blob/main/css/styling-boxes/styling-tables/punk-bands-complete.html)

6. 圖片
   - 所有的 `<img>` 都必須有 `alt` 屬性
   - 裝飾性圖片可將 `alt` 屬性留空
   - 有意義的圖片避免使用 css `background-image` 來處理
7. 按鈕與連結

   - 即使視覺上長得像按鈕，只要把使用者導到另一個頁面，應使用 `<a>` 撰寫，讓輔助工具使用者能預期互動後會出現什麼結果
   - 若用 `<a>` 來模擬按鈕，補上 `role=”button”` 來釐清元件的功能
   - 按鈕及連結內必須要有文字，讓螢幕閱讀器使用者知道作用
     若為圖片按鈕或圖片連結，可用以下方法：

   ```html
   // 方法一 (詳見 **CSS注意事項** 第5點)
   <a href="./member/center.html">
     <span class="visually-hidden">到會員中心</span>
     <img src="user.svg" alt="user" />
   </a>

   // 方法二 (詳見 **WAI-ARIA** Property)
   <button class="navbar-toggler" aria-label="登入">
     <img src="user.svg" alt="user" />
   </button>
   ```

## CSS注意事項

1. 不要移除 outline 樣式（❌ `outline: none` ）

   因為元素被 focus 時，如果看不出差異，會造成使用者辨識困難。

2. 文字要用相對字級尺寸或具名字級尺寸，不能用 px 定義字級

   相對字級尺寸：%, em, rem

   具名字級尺寸：small, large

3. 避免把重要內容放在偽元素裡
4. `Bootstrap4` 部分支援無障礙（有些文字沒使用相對字級）

   `Bootstrap5` 以上有支援無障礙

5. 隱藏內容

   使用 `display:none` `visibility:hidden` 螢幕閱讀器會讀不到

   若想要視覺上隱藏，但須提供資訊給螢幕閱讀器，可使用 `Bootstrap` class `.sr-only` (v4) 或 `.visually-hidden` (v5)

## Javascript相關

1. `<noscript>`\
   若使用 `javascript`，需使用 `<noscript>` 標籤，以文字告知使用者，請他打開 JavaScript 的選項，或是提供相關超連結作適當的指引。

```jsx
<noscript>
  您的瀏覽器不支援JavaScript功能，若本網站功能無法正常使用，請開啟瀏覽器JavaScript狀態
</noscript>
```

2. 控制 focus 順序

   情境[範例](https://cdpn.io/pen/debug/YNyPMj)：使用 tab 鍵在頁面中移動並打開 modal，但由於 DOM 順序的關係，modal 出現後，下一個 focus 的元素並不是在 modal 裡，造成使用不順暢。

   解決[範例](https://cdpn.io/pen/debug/BpQreX)：打開 modal 時，要 focus 在 modal 上。

```jsx
function showModal() {
  ...
  const modal = document.getElementById('modal');
  modal.focus();
  ...
}
```

3. 事件觸發

   情境[範例](http://demo.hi-interactive.tw/inhouse/web-accessibility/div-button.html)：用 div 做按鈕時，即使用 `tabindex=”0”` 讓 div 可 focus，並加了 `role=”button”`，div 按鈕仍不會有 `button` 的特性。如範例中，三個按鈕都加上 click 事件，但只有第一個**一般按鈕**能用鍵盤控制。

   解決：自行為 div 按鈕加上 keypress 事件，按下 enter 或 空白鍵時觸發。

```jsx
divButton.addEventListener('keypress', function (e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
        ...
    }
})
```

## WAI-ARIA

用於html元素上，提供額外的語意、改善無障礙問題\
主要有三類：`Role`, `Property`, `State`，可互相搭配使用\
[Role總覽](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)\
[Property和State總覽](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes)

### Role(角色)：定義元素是什麼或做什麼事

大致可分為三方面

1. 做為部件(Widget)角色

   > 如：button, checkbox, link, tab, etc.

   範例：

   ```html
   // 用 div 來做按鈕
   <div role="button" tabindex="0" class="btn">div按鈕</div>

   // 用 a 來做按鈕
   <a href="#" role="button">a按鈕</a>
   ```

2. 做為地標(Landmark)角色

   > 如：banner, main, navigation, region, etc.

   ```html
   <nav>Nav</nav>
   <main>Main</main>
   ```

   相當於

   ```html
   <div role="navigation">Nav</div>
   <div role="main">Main</div>
   ```

3. 即時區域(Live Region)角色

   網頁上即時更新的內容(toast, modal, 錯誤提示…等)，可使用這些角色，讓無障礙輔助工具能知道他們存在並做處理。

   > 如：alert, log, status, timer, etc.

   ```html
   <div class="toast" role="alert">This is a toast message!</div>
   ```

### Property(屬性)：賦予元素額外的意義或語義

以 `aira-*` 做為前綴

例如：

- `aria-label`
  > 標籤，用來給元素加上描述，且視覺上看不到。
  > 範例：一個關閉按鈕，但輔助工具不知道 `X` 是什麼意思，因此需要 `aria-label` 來做描述。
  ```html
  <button class="navbar-toggler" aria-label="關閉">Ｘ</button>
  ```
- `aria-labelledby`
  > 作用和 `aria-label` 相同，但是用在可見元素上。\
  > 範例：用 `span` 來做 checkbox， 缺少 `label`，輔助工具無法知道此 checkbox 是做什麼的，用 `I agree to the Terms and Conditions.` 這段來當作 label。
  ```html
  <span role="checkbox" aria-checked="false" tabindex="0" aria-labelledby="tac">
  </span>
  <span id="tac">I agree to the Terms and Conditions.</span>
  ```
- `aria-live`
  可與 `role="alert"` 搭配或替代使用。
  **[demo](http://demo.hi-interactive.tw/inhouse/web-accessibility/toast.html)**

  > 表示這個元素會被更新，當內容更新時，輔助工具就會知道，並唸出內容。\
  > 參數有三個選擇：
  > 1. `off` 不做處理
  > 2. `polite` 用戶當前行為結束後，螢幕閱讀器才讀出內容
  > 3. `assertive` 打斷當前行為，直接先讀出內容
  >
  > 範例：點擊按鈕時顯示並更新 toast 內容

  ```html
  <button class="btn btn-primary">show taost</button>
  <div class="toast" aria-live="assertive"></div>
  // 空白內容
  ```

  ```jsx
  document.querySelector('button').addEventListener('click', function () {
    document.querySelector('.toast').classList.add('show');

    // 更新 taost 內容
    document.querySelector('.toast-body').innerText = 'This is a toast';
  });
  ```

### State(狀態)：定義目前元素的狀態

以 `aria-*` 做為前綴

例如：

- `aria-hidden`
  > 設定元素是否要對輔助工具隱藏
  > 常用於裝飾性內容(如圖片)，或重複的內容，隱藏後就不會被螢幕閱讀器唸出來，提升無障礙用戶體驗。
  > ⚠️ 注意： `aria-hidden` 不應該被使用在可聚焦的元素上。
  ```html
  <i class="icon" aria-hidden="true" />
  ```
- `aira-checked`
  > 表示這個元素是否為勾選狀態。
  > 例：手刻 checkbox，設定狀態 `aria-checked`，使用者勾選時，再用 javascript 將值改成 `true`，讓輔助工具知道。
  ```html
  <span role="checkbox" aria-checked="false" tabindex="0" aria-labelledby="tac">
  </span>
  ```

## 動態內容及多媒體

- 影片
  - 需提供字幕給聽覺障礙使用者
  - 需提供音訊描述給視覺障礙使用者
  - 要讓使用者可以暫停、終止、或隱藏。
  - [範例](https://www.w3.org/WAI/perspective-videos/contrast/)
- 音訊\
  要能夠被終止或能夠調整音量，常見的處理方式是提供靜音 / 取消靜音按鈕。
- 輪播
  - 輪播自動播放會造成內容自動消失，且可能會導致螢幕報軟體和鍵盤使用者的焦點消失
  - 需有上一張、下一張按鈕（讓使用者可以控制輪播動作）
  - 提供可以「停止播放」與「繼續播放」的按鈕
  - 當 focus 在輪播組件上時，需停止播放
- 會閃爍的內容\
  因為快速閃動的畫面有可能引發癲癇，不可以有任何元件在一秒內會閃爍三次以上

## 其他

- 要有網站導覽頁\
  範例：
  [https://accessibility.moda.gov.tw/Sitemap](https://accessibility.moda.gov.tw/Sitemap)
  [https://www.pco.npa.gov.tw/ch/sitemap](https://www.pco.npa.gov.tw/ch/sitemap)
- 無障礙定位點（導盲磚）

  幫助使用者快速跳至網頁不同區塊，其顯示方式是利用三個冒號 `:::` 來代表，且需要搭配快速鍵 `accesskey` 來使用。\

  範例：在網頁中設定 nav 導盲磚，使用快速鍵 ALT+U 就可跳至 nav 區域。

  ```html
  <nav>
    <a href="#main-nav" accesskey="U" title="上方導覽連結區：ALT+U">:::</a>
    ... nav內容
  </nav>
  ```

- 跳至主要區塊

  在網頁中使用鍵盤 tab 切換時第一個必須是跳到主要內容區的連結，方便跳過每頁都會重複出現的區域，例如跳過選單直接進到主要內容。

  用 `tabindex=”1”` 來設定。

  ```html
  <a href="#content" title="跳到主要內容區塊" tabindex="1">跳到主要內容區塊</a>
  ```

## 模擬/測試工具

### 檢測報告

- axe DevTools\
  [axe DevTools - Web Accessibility Testing](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd/related)
  Chrome擴充功能，會檢測網站的無障礙問題
  ![Imgur](https://i.imgur.com/uSUjzTR.jpg)
  並且會指出有問題的程式碼在哪裡，以及該如何修正
  ![Imgur](https://i.imgur.com/ngeCRF0.jpg)
- lighthouse\
  ![Imgur](https://i.imgur.com/OKT8Qy0.jpg)
  lighthouse會分析頁面的效能、無障礙、SEO 以及 PWA
  ![Imgur](https://i.imgur.com/YI14bMu.jpg)
  產出報告，指出須改善的問題及有問題的畫面
  ![Imgur](https://i.imgur.com/kB6TvJv.jpg)
- Freego（臺灣無障礙標章）\
  無障礙申請流程第一步為軟體檢測，需通過 Freego 檢測。
  Freego下載位置在[這邊](https://accessibility.moda.gov.tw/Download/Detail/1749?Category=70)\
  操作說明：\
  ![Imgur](https://i.imgur.com/kLn4DkI.jpg)
  ![Imgur](https://i.imgur.com/uJNuytJ.jpg)

### 顏色對比

- WCAG Color contrast checker\
  詳見[這邊](https://chrome.google.com/webstore/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf?hl=zh-tw)\
  檢測網站的顏色對比度
  ![Imgur](https://i.imgur.com/WPBeBgF.jpg)
  並且可在下方輸入新顏色，看是否符合標準
  ![Imgur](https://i.imgur.com/SxDf6ni.jpg)
  ![Imgur](https://i.imgur.com/tueNJv6.jpg)
- 開發者工具\
  可檢視目前文字與背景色的對比數值\
  ![Imgur](https://i.imgur.com/MacbNYi.jpg)
  ![Imgur](https://i.imgur.com/Xcm37QP.jpg)
  在 color picker 把 Contrast ration 的下拉視窗展開，上方顏色區塊會出現兩條曲線，曲線範圍以上即符合無障礙顏色對比標準，下面的線符合AA標準，上面的線符合AAA標準，可在曲線內取色。
  ![Imgur](https://i.imgur.com/OvQ2XWc.jpg)

### 自我檢測

- 使用鍵盤操作
  - 能用 tab 鍵完成整個頁面的瀏覽
  - 按鈕等可互動內容，能用鍵盤控制
  - 操作流程順暢、focus 順序合理
- 螢幕閱讀器
  - Apple 使用者可用內建螢幕閱讀器**旁白(VoiceOver)**，快捷鍵 `command + F5`
    Win7 以上使用者可下載 [NVDA](https://www.nvaccess.org/download/)

---

參考資料：

- [Writing JavaScript with accessibility in mind](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9)
- [【無障礙網頁祕技】前端切版前要注意什麼細節呢？](https://ru-hsu916.medium.com/%E7%84%A1%E9%9A%9C%E7%A4%99%E7%B6%B2%E9%A0%81%E7%A5%95%E6%8A%80-%E5%89%8D%E7%AB%AF%E5%88%87%E7%89%88%E5%89%8D%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E9%BA%BC%E7%B4%B0%E7%AF%80%E5%91%A2-f1b5715a2c06)
- [漫談無障礙網頁設計-1
](https://apodesign.tw/uiux/website-accessibility-1/)
- [h第四日：無障礙網頁設計 CSS 注意事項](https://ithelp.ithome.com.tw/articles/10289037)
- [Build an accessible HTML structure using ARIA landmark regions and headings.](https://levelup.gitconnected.com/build-an-accessible-html-structure-using-aria-landmark-regions-and-headings-4647d22c2cc7)
- [無障礙規範-90條檢測碼](https://accessibility.moda.gov.tw/Download/Category/39/1)
