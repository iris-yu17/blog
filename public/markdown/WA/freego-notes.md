> 無障礙檢測常遇到許多惱人的問題😡，FB 甚至有個"臺灣無障礙標章受害者聯盟"社團。
> 本篇是記錄一些使用 Freego 檢測時的注意事項、遇到的問題以及解決方式。

## 下載 Freego

- 只能使用 Windows 系統
- 根據[這篇](https://accessibility.moda.gov.tw/News/Detail/4441?Category=43)，「網站無障礙規範2.0版」，已改名為「網站無障礙規範」，別因為有 `2.0` 而誤以為是新版，而下載到錯的版本囉～
- 可在[這邊](https://accessibility.moda.gov.tw/Download/Detail/1743?Category=70)下載目前的最新版本。

## 問題

### 1. 瀏覽器開啟錯誤，請檢查ChromeDriver與本機Chrome瀏覽器的版本是否相應

新版的 Freego 檢查時會開啟 Chrome。若你的電腦 Chrome 版本跟 Freego 裡面的 ChromeDriver 不相符，就會跳出這個錯誤。
可以依[這邊](https://accessibility.moda.gov.tw/Questions/Detail/4467?Category=20)指示的步驟，下載 ChromeDriver，並覆蓋 Freego 裡的 ChromeDriver。

若還是無法運作，可以檢查自己電腦的 Chrome 版本，跟下載的 ChromeDrive 版本是否一致。
![Imgur](https://i.imgur.com/WaImf6r.png)

![Imgur](https://i.imgur.com/KmK5LoY.png)

### 2. 檢測到無效的連結

因 Freego 是從 html 原始碼裡面找連結進行檢測，所以如果是相對路徑，就會造成出錯，應使用絕對路徑。
