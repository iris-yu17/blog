## 什麼是 Middleware？
- Middleware 又稱為中介軟體或中間層，就是在預先定義好的起、終點之間，在中間的過程進行處理。
- 在 `Redux` 中， Middleware 是在 action(起點) 進入到 reducer(終點) 之前，讓我們做一些額外處理 
- 我們可以用 Middleware 來紀錄(log)、執行非同步任務...等。

## 使用方式
demo: https://codesandbox.io/s/redux-4-redux-logger-f68f37?file=/src/App.js

這邊使用 `redux-logger` 套件來示範 Middleware。
`redux-logger` 會幫我們在 `console` 中紀錄狀態。

![](https://hackmd.io/_uploads/Sy7U6PFc3.png)



### - step1. 配置 logger
```javascript=1
// import
import { createLogger } from 'redux-logger'

// 創建 logger
const logger = createLogger();
```

### - step2. 使用 `applyMiddleware`
把它作為 `createStore` 的參數傳入
```javascript=1
const store = createStore(reducers, applyMiddleware(logger));
```
---
> 參考資料
> https://www.youtube.com/watch?v=rRtM82jBQJo
