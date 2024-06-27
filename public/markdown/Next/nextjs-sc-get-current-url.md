## 使用 usePathname ?

若 google 如何取得當前 url，會得到很多回答說可以用 `usePathname` 來做到 ，但 `usePathname` 只能在 `Client components` 中使用。
最簡單的方法就是把那個元件改為 `Client components` ，但如果我一定要用 `Server Components` 來做呢？

## 利用 middleware

我們可以建立一個 `middleware.ts` ，在 `middleware` 中得到當前 `pathname` ，內容如下：

```javascript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 印出當前 pathname
  console.log("Current path:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 除了 APIs 和靜態資料外，其他都路徑都套用
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

這樣當我們到每個頁面，就會印出當前的 `pathname`

```
Current path: {pathname}
```

## 如何在 Server Components 得到 Middleware 裡的資訊呢？

現在我們能得到路徑了，不過是在 `middleware` 中，需要把訊息從 `middleware` 傳到 `Server Component` 裡，唯一的方法就是：`Headers`

```javascript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 自己加上一個 header `x-current-path`
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // 除了 APIs 和靜態資料外，其他都路徑都套用
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

## 在 Server Componets 中讀取 Header

```javascript
import { headers } from 'next/headers';

export default async function Sidebar() {
  const headerList = headers();
  const pathname = headerList.get('x-current-path');

  // ...etc
}
```

## 完成🎉

---

參考資料：

- https://www.propelauth.com/post/getting-url-in-next-server-components
