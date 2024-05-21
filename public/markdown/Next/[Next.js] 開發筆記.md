> 這篇是紀錄一些工作開發時學到的小知識

## 1. `ENV` 變數的使用

### 用 `NEXT_PUBLIC_` 前綴

- `Next.js` 中，我們的環境變數可以用 `NEXT_PUBLIC_` 作為前綴，在build 的時候，這變數的值就會直接注入程式碼裡面。
- 由於這個值是可以在客戶端被看到的，所以通常是用來儲存比較不敏感的配置信息。

例如：
在 `.env` 中

```
NEXT_PUBLIC_API_DOMAIN=https://my-api.com
```

使用時我們這樣寫

```javascript=1
const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user`);
```

build 完之後查看 `.next` 裡的內容，會發現原本的 `process.env.NEXT_PUBLIC_API_DOMAIN` 全都被替換成 `https://my-api.com` 了。

### 不用 `NEXT_PUBLIC_` 前綴

- 不用 `NEXT_PUBLIC_` 前綴的環境變數只有在伺服器端能得到，客戶端沒辦法讀取
- 可用來儲存敏感信息
- 若不想要這些值在建構時被寫死，希望能在 runtime 時改變，就可使用（例如有些狀況是要在不同環境下 run）

## 2. 版本`13.4` 的 `generateMetadata` 不適用 `error.tsx`

### 說明：

在 `app-router` 裡面，我們可以創建一個 `error.tsx`（相當於 `page-router` 的 `500.tsx`），只要 throw Error，就會自動顯示這個畫面。

### 發現問題：

情境：
我們在一個 `getData` function 裡打 api 得到資料，若過程出錯，就 throw error。這時運作如預期，出現錯誤時會顯示 `error.tsx` 的畫面。
但在`generateMetadata` 中，若 throw error，會顯示 next 預設的錯誤畫面。

![Imgur](https://i.imgur.com/yJY3AqB.png)

### 解決：

升級到版本 `13.5`

## 3. `error.tsx` status code 問題

版本 `14` 以下，`error.tsx` 的 status code 會是 200，若想要正確顯示，需升級至 `v14` 以上。
