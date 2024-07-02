## 範例

> Demo：https://codesandbox.io/p/sandbox/usecontext-4m5drb

## 說明：

- 使用 `useContext` 就可以跨元件讀取狀態，不需用 `props` 一層層傳下去。
- 使用的方式就是在最頂層元件中創建 `Context` 存放所有狀態，然後在它之下的所有組件都可以存取。
- 可把它想成是一個 global state 的概念，所有元件都可以讀取這個 `state`。

## 使用方式：

### 父元件

1. 使用 `createContext`，在最頂層創建 `Context`
2. 把子元件用 `Provider` 包住
3. 在 `Provider` 的 `value` 傳入需要傳遞的值

```javascript
import { createContext, useState } from "react";

// 1. 創建 Context
export const ThemeContext = createContext();

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    // 2. 用 provider 包住
    // 3. value 傳入要共用的值
    <ThemeContext.Provider value={darkTheme}>
      <div className="App">
        <Child />
      </div>
    </ThemeContext.Provider>
  );
}

```

### 子元件

1. import `Context`
2. 使用 `useContext` 來讀取狀態

```javascript
// 1. import context
import { ThemeContext } from "./App";

const Child = (props) => {
  // 2. 使用 useContext 來讀取
  const darkTheme = useContext(ThemeContext);

  return (
    <>
      ...
    </>
  );
};

export default Child;

```
