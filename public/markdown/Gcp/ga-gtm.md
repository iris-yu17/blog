> 這篇文章是介紹 GA, GTM 的差異，以及如何使用 GTM 來追蹤網站事件，若想了解如何使用 GA，請參考[這篇文章](./ga4-setup.md)。

## 追蹤網站資料

可以使用幾種方式追蹤網站資料

1. 僅使用 Google Analytics（直接在網頁上加入 GA 代碼）
2. Google Analytics 搭配 Google Tag Manager（使用 Google 代碼管理工具加入代碼）

### 僅使用 Google Analytics 的情境

Google Analytics 本身具備強大的事件追蹤功能，包括自動收集事件、自訂事件追蹤...等。\
如果只需要追蹤基本的網站數據（如訪客數量、流量來源、使用者行為），那麼直接在網站中加入 GA 的追蹤代碼即可。

優點：

- 簡單直接，不需要學習額外的工具。
- 適合技術需求較低、追蹤項目較少的網站。

缺點：

- 需要修改網站程式碼來新增或調整追蹤代碼。
- 如果有多個追蹤工具管理起來較麻煩。

### 搭配 Google Tag Manager 的情境

Google Tag Manager(GTM) 是 Google 的代碼管理工具，提供我們一個平台來管理所有與追蹤相關的代碼（例如 Google Analytics、Google Ads、Google Adsense 等）。\
如果需要多種追蹤功能或頻繁更新追蹤代碼，GTM 會是更好的選擇。

優點：

- 集中管理追蹤代碼：可以管理所有追蹤工具的代碼（不只 GA）。
- 靈活性高：可以即時新增、修改追蹤設定，而不需要每次改動都更新程式碼。
- 進階功能：支援事件追蹤（如按鈕點擊、表單提交）、電子商務追蹤等，無需額外修改網站程式碼。

缺點：

- 技術需求較高，需學習如何設定 GTM。
- 進階設定（例如事件或自訂變數）可能會比較複雜。

## Google Tag Manager(GTM)

### - step1. 建立帳戶和容器

- 帳戶是 GTM 的最上層結構，通常是公司名稱等
- 容器是在帳戶下的第二層結構，代表一個網站或應用程式，每個容器包含了網站或應用程式所需要的所有代碼（以前稱為標籤）和配置。
- 每個容器會有一個容器 ID，格式為 `GTM-XXXXXXX`

### - step2. 程式碼設定

1. 前往 https://tagmanager.google.com
2. 依照"安裝 Google 代碼管理工具"彈窗的步驟將程式碼複製並貼入網頁中

貼到 head 內

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-XXXXXXXX');
</script>
<!-- End Google Tag Manager -->
```

貼到 body 內

```html
<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXXX"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe
></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### - step3. 測試網站

貼上你的網址並點擊"測試"，他會告訴你在網站上是否有偵測到 Google 代碼。

## 在 GTM 創建 Google 代碼

通常若我們想使用 Google Analytics 或 Google AdSense 等工具，都要在網站程式碼中埋碼。\
而完成前面的安裝步驟後，我們之後就可以在不直接修改網站程式碼的情況下，直接使用 GTM 管理並設定 Google Analytics 或 Google AdSense 等工具的代碼。\
若要使用 Google Analytics 等工具，首先要有 Google 代碼。

### - step1. 在 Google 代碼管理工具中新增代碼

1. 前往 https://tagmanager.google.com
2. 選擇容器
3. 在「工作區」分頁 > 點按左側的「代碼」> 點按右上方的「新增」
4. 在面板中按照下列步驟操作：

   (1) 將「未命名的代碼」改成代碼名稱 (例如「Google 代碼」)\
   (2) 在「請選擇代碼類型」中，選擇 Google 代碼\
   (3) 填寫代碼 ID（若要搭配 GA，就填 GA4 的評估 ID，格式為 `G-XXXXXXXXXX`）\
   (4) 觸發條件選取 Initialization - All Pages\
   (5) 儲存

![Imgur](https://i.imgur.com/68SykqI.png)

### - step2. 驗證及發布代碼

#### 驗證代碼

1. 在「工作區」分頁中，點按右上方的「預覽」，即可在新分頁開啟 Google Tag Assistant。
2. 輸入網站網址，然後按一下「連結」

#### 發布代碼

![google](https://storage.googleapis.com/support-kms-prod/BV3VZVDefaYhcijpuxpJkX8Ps3gOxcPOxvQJ)

1. 在「工作區」分頁中，點按右上方的「提交」
2. 在「提交設定」部分：
   - 選取「發布及建立版本」，將變更內容發布到網站。如果只想儲存但不發布，改為選取「建立版本」。
   - 輸入版本的名稱和說明。
3. 點選發布

## 使用 GTM 設定 GA - GTM 內建事件

完成 Google 代碼發布後，再來就可以設定 GA 代碼了，我們可以直接在 GTM 直接設定事件追蹤，它會連動至我們的 Google Analytics 報表。

假如我們想追蹤網站的點擊事件，可以照以下步驟：

### - step1. 在 Google 代碼管理工具中新增代碼

1. 前往 https://tagmanager.google.com
2. 選擇容器
3. 在「工作區」分頁 > 點按左側的「代碼」> 點按右上方的「新增」
4. 在面板中按照下列步驟操作：

   (1) 將「未命名的代碼」改成自訂代碼名稱 (例如「GA4 - Click」)\
   (2) 在「請選擇代碼類型」中，選擇 Google Analytics，接著再選擇「Google Analytics：GA4 事件」\
   (3) 填寫代碼 ID，也就是就填 GA4 的評估 ID，格式為 `G-XXXXXXXXXX`\
   (4) 填寫事件名稱，例如 user_click\
   (5) 觸發條件選取「點擊 - 所有元素」\
   (6) 儲存

### - step2. 發布代碼

步驟就和 [#在 GTM 創建 Google 代碼](#在-gtm-創建-google-代碼) 的 step2 一樣。

1. 在「工作區」分頁中，點按右上方的「提交」
2. 在「提交設定」部分：
   - 選取「發布及建立版本」，將變更內容發布到網站。如果只想儲存但不發布，改為選取「建立版本」。
   - 輸入版本的名稱和說明。
3. 點選發布

### - step3. 確認是否有成功追蹤

完成後開啟自己的網頁，點擊網頁上的任何元素，接著到 Google Analytics 的即時總覽中，就會看見 user_click 事件。

## 使用 GTM 設定 GA - 自訂事件

### - step1. 創建自訂變數

1. 在工作區 > 左側選單選擇「變數」> 在「使用者定義的變數」點擊「新增」
2. 將「未命名變數」改成自訂的變數名稱，例如 Button Name
3. 在「請選擇變數類型」選擇「資料層變數」
4. 填入資料層變數名稱，例如 button_name，這將會是 Data Layer 的 key
5. 儲存

### - step2. 設定觸發條件

1. 在工作區 > 左側選單選擇「觸發條件」> 點擊「新增」
2. 將「未命名的觸發條件」改成自訂的名稱，例如 Button A Click
3. 在「請選擇觸發條件類型」選擇「自訂事件」
4. 設定事件名稱（例如 button_a_click），這將是我們埋在程式碼中的 Data Layer 的事件名稱（event）\
   備註：可以多個觸發條件都使用同一個事件名稱
5. 啟動時機選擇「部分的自訂事件」，設定條件為：
   - 變數：選擇剛剛創建的 Button Name 變數
   - 條件：選擇「等於」(Equals)。
   - 值：依照你想要觸發的按鈕來設定，例如 btn_a
6. 儲存

### - step3. 設定代碼

1. 在工作區 > 左側選單選擇「代碼」> 點擊「新增」
2. 將「未命名代碼」改成自訂，例如 GA4 - btn A clicked
3. 選擇「Google Analytics: GA4 事件」作為代碼類型
4. 填入剛剛設定的事件名稱（例如：button_a_click）
5. 在「事件參數」中設定：\
   event_label: 這邊選擇前面設定的變數 `Button Name`\
   這會使用從 Data Layer 來的 button_name 值
6. 在「觸發條件」選擇我們剛剛寫好的 Button A Click
7. 儲存
8. 發布

---

參考資料：

- [Haren的行銷筆記](https://www.haranhuang.com/google-tag-manager-debug-mode.html)
