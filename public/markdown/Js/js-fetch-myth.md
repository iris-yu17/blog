## 觀念釐清：HTTP 錯誤 vs. 網路錯誤

在進入正文前，我們要先理解 HTTP 錯誤與真正的網路錯誤的差別，因為 fetch 只有在網路錯誤時才會進入 catch。

### HTTP 錯誤

- 如 404 Not Found, 500 Internal Server Error
- 伺服器有回應，但回應的狀態碼不是 2xx。
- fetch 仍會被視為成功的請求，不會進入 catch，但 `res.ok` 會是 `false`

### 真正的網路錯誤

- 如 CORS 問題、伺服器無回應、網路中斷
- fetch 會直接進入 catch，拋出 `TypeError`

## 誤解：fetch 有錯誤時一定會進入 catch

現實情況：

- fetch 只有在網路錯誤（如伺服器無回應、域名錯誤、CORS 問題）時才會進入 catch。
- 如果 API 回傳 `404`、`500`，fetch 仍然會被視為成功的請求，不會進入 catch。

```typescript
try {
  // 若打 api 沒取得資料（例如嘗試取得不存在的資料），並不會進入 catch
  const res = await fetch('https://example.com/data.json');

  // 而是會繼續往下執行
  // 到這邊執行 res.json() 就會出錯
  const data = await res.json();
} catch (error) {
  // 這邊捕捉到的錯誤會是 res.json() 的，而不是 API 回傳的錯誤
  console.log('Error:', error);
}
```

## 檢查 `res.ok`，手動拋出錯誤

`res.ok` 只有當 status 在 `200-299` 範圍內時才會是 `true`，當 `404`、`500` 時 `res.ok` 則會是 `false`。

因此可以透過 `res.ok`，來處理 HTTP 錯誤。

```typescript
try {
  const res = await fetch('https://example.com/data.json');

  // res.ok 為 false，表示本身是成功的，只是伺服器回應錯誤
  if (!res.ok) {
    // 這邊手動拋錯，進入 catch
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json();
  console.log(data);
} catch (error) {
  console.log('Error:', error);
}
```

## 總結

> fetch 只會在「真正的網路錯誤」時才會進入 catch，所以要手動處理 HTTP 錯誤！
