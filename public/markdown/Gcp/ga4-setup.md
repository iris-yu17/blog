## 啟用 GA

建立 GA 帳戶後，會得到一個評估 ID（measurement ID），它的格式會是 `G-XXXXXXXXXX`，例如 `G-12345ABCDE`，我們要將這個評估 ID 埋入網站。

前往 https://analytics.google.com/ 首頁，會出現此畫面：

[圖片]

點擊「取得標記操作說明」，依照操作說明，將代碼貼入網站程式碼的 `<head>` 之後：

```javascript
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-12345ABCDE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-12345ABCDE');
</script>
```

若啟用成功的話，會顯示以下畫面：
[圖片]

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
    gtag('event', 'check_lesson', {
      subject: '國文',
      system: '國小',
    });
  }}
>
  查看課程
</button>
```

## 什麼是維度？

維度是用來描述資料特徵或屬性的分類方式。GA4 中已預設內建了維度，例如國家、裝置、語言、事件名稱（如 `page_view`）...等。\
除了 GA4 預設的維度以外，我們也可以使用自訂維度。

## 什麼是自訂維度？

- 自訂維度是在 GA4 是一種進階設定，允許我們為追蹤的資料新增自訂屬性，以便更有效地分類和分析用戶行為。
- 它的主要功能是擴展 GA4 預設提供的資料範圍，讓我們可以收集對於網站更具意義的資訊。

## 為什麼要自訂維度

假設

https://mktgholic.com/google-analytics-4/ga4-custom-dimension/
