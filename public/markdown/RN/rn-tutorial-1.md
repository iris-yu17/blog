本篇是照著 [Expo 官方文件](https://docs.expo.dev/get-started/create-a-project/) 建立一個新專案的教學。

## - step1. 安裝

```
npx create-expo-app@latest
```

## - step2. Expo Go

在 App 商店下載 Expo Go\
Expo Go 讓我們開發時，可以直接在手機上同步看到畫面

## - step3. Start developing

啟動專案

```
npx expo start
```

在 terminal 中會出現一個 QR code，直接用手機掃那個 QR code，就能在手機的 Expo Go 上看到專案的畫面。\
接著可以在 `app/(tabs)/index.tsx` 檔案中，試著改一小段文字，看看畫面有沒有改變。

## - step4. 開始我們全新的專案

在 terminal 輸入以下指令，來得到一個全新的 app 目錄。（而目前產出的範本則會被放到 `app-example`）

```
npm run reset-project
```

會發現 `app` 目錄下只剩下兩個檔案，`_layout.tsx` 與 `index.tsx`。\
接著可以看看手機，是否變成只剩 index 這個頁面。我們可以修改 `app/index.tsx` 裡的文字，看看有沒有連動。\
沒問題的話就可以正式進入開發了！🎉
