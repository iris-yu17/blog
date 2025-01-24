## 啟用 GA

建立 GA 帳戶後，會得到一個評估 ID（measurement ID），它的格式會是 `G-XXXXXXXXXX`，例如 `G-12345ABCDE`，我們要將這個評估 ID 埋入網站。

前往 https://analytics.google.com/ 首頁，會出現此畫面：

![Imgur](https://i.imgur.com/G6ylTvq.png)

點擊「取得標記操作說明」，依照操作說明，將代碼貼入網站程式碼的 `<head>` 之後：

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-12345ABCDE"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'G-12345ABCDE');
</script>
```

若啟用成功的話，會顯示以下畫面：
![Imgur](https://i.imgur.com/zyicIPo.png)

## 事件追蹤

- 內建事件：GA4 已內建許多自動收集的事件，無需額外設定。安裝完 GA4 代碼後，即可自動追蹤，例如：

  | 事件名稱           | 作用     |
  | ------------------ | -------- |
  | page_view          | 頁面瀏覽 |
  | scroll             | 捲動頁面 |
  | click              | 外部     |
  | clicfile_downloadk | 檔案下載 |

- 自訂事件：我們也可以追蹤自定義行為（例如按下特定按鈕），就需要手動設定事件。

## 自訂事件追蹤

### - step1. 在程式中埋入事件追蹤代碼

在你的網站中，使用 GA4 的 gtag 函式記錄事件。\
以下是事件追蹤的基本格式：

```javascript
gtag('event', '事件名稱', {
  參數名稱1: '參數值1',
  參數名稱2: '參數值2',
});
```

例如：

```javascript
<button
  onClick={() => {
    gtag('event', 'toggle_theme', {
      theme: 'light',
    });
  }}
>
  切換主題色
</button>
```

### - step2. 檢查是否觸發事件

1. 打開 DevTools > 選擇 Network 頁籤 > 在篩選欄位輸入 collect
2. 接著在網頁中點擊埋了事件的按鈕，若有觸發事件，就會出現事件收集的 request，如下圖：
   ![Imgur](https://i.imgur.com/K5f9H4J.png)

### - step3. 檢查是否成功追蹤

1. 前往 https://analytics.google.com/ ，點擊「報表」>「即時總覽」，可以看到事件計數的區塊，看裡面有沒有我們埋的事件名稱
   ![Imgur](https://i.imgur.com/A4uMydc.png)
2. 點擊事件，可以看到此事件的其他事件參數，看有沒有我們自訂事件的參數（theme），再點擊進此參數，可以看到傳送的值（light, dark）。
   | ![Imgur](https://i.imgur.com/PLAoG8Q.png) | ![Imgur](https://i.imgur.com/y1ADbeq.png) |
   | ----------------------------------------- | ----------------------------------------- |

## 自訂維度

維度是用來描述資料特徵或屬性的分類方式。GA4 中已預設內建了維度，例如國家、裝置、語言、事件名稱（如 `page_view`）...等。\
除了 GA4 預設的維度以外，我們也可以使用自訂維度。

### 什麼是自訂維度？

- 自訂維度是在 GA4 是一種進階設定，允許我們為追蹤的資料新增自訂屬性，以便更有效地分類和分析用戶行為。
- 它的主要功能是擴展 GA4 預設提供的資料範圍，讓我們可以收集對於網站更具意義的資訊。

### 為什麼要自訂維度

雖然目前 GA4 已經提供了三百多個預設維度，但網站的類型跟使用者需求百百種，GA4 不可能顧及到所有需求，因此有「自訂維度」的功能。

例如我們前面的範例，在自訂的 `toggle_theme` 事件中，還帶了自訂的 `theme` 參數。但 GA4 並不認識 `theme`，即使它有收到資料、即時報表中能看到參數值，但當要製作報表時，我們是無法選到與這個參數相關維度的。

因此需要設定自訂維度，來讓 GA4 認識此參數，才能夠顯示在報表中。

### 如何設定自訂維度

點擊左下角 > 自訂定義 > 建立自訂維度
![Imgur](https://i.imgur.com/VfiPIhD.png)

在面板中填入：

| 項目     | 說明                                       |
| -------- | ------------------------------------------ |
| 維度名稱 | 自行取名                                   |
| 範圍     | 由於此維度基於按鈕的點擊事件，因此選擇事件 |
| 說明     | 維度說明（選填）                           |
| 事件參數 | 必須跟事件的參數名稱一樣                   |

![Imgur](https://i.imgur.com/mEN41fm.png)

---

參考資料：

- [MKTGholic | 行銷癮](https://mktgholic.com/google-analytics-4/ga4-custom-dimension/)
