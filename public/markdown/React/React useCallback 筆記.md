## 範例

> Demo: https://codesandbox.io/s/usecallback-nzebwi?file=/src/App.js

## 畫面說明：

> 1. 在 input 輸入數字後，下面列表會顯示此 input 值加1、加2、加3的結果
> 2. 點擊 toggle theme 按鈕可把畫面轉為亮/暗色模式

![Imgur](https://i.imgur.com/ohyRSmA.png)

## Code說明：

### - 父元件

- 父元件包含一個 input 和按鈕，並引入子元件 `<List/>`
- 父元件有個 `getData` function，我們就假裝它裡面會呼叫 api 獲取資料並 return 這筆資料
- `getData` return 的資料會依 `input` 值而改變
- 把 `getData` 作為 props 傳到子元件 `<List/>`

```javascript
import List from "./List";

export default function App() {
  const [input, setInput] = useState(0);
  const [themeDark, setThemeDark] = useState(false);

  const style = {
    color: themeDark ? "#fff" : "#1b1b1b",
    background: themeDark ? "#1b1b1b" : "#fff"
  };

  // 假裝它會呼叫 api、回傳資料
  const getData = () => {
    // getData return 的資料會依 input 值而改變
    return [input + 1, input + 2, input + 3];
  };

  return (
    <div className="App" style={style}>
      <input
        value={input}
        type="number"
        onChange={(e) => {
          setInput(parseInt(e.target.value));
        }}
      />
      <button
        onClick={() => {
          setThemeDark(!themeDark);
        }}
      >
        Toggle Theme
      </button>
      // getData 作為 props 傳入
      <List getData={getData} />
    </div>
  );
}

```

### - 子元件

- 子元件接收 `getData` 這個 props，呼叫並使用 `getData` 回傳的資料
- 每次 `getData` 改變時，就重新用 `setArray` 設置畫面所顯示的 list 項目，並印出 "get data" 文字

```javascript
export default function List(props) {
  const { getData } = props;
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray(getData());
    console.log("get data");
  }, [getData]);

  return (
    <>
      {array.map((item) => {
        return <li key={item}>{item}</li>;
      })}
    </>
  );
}
```

## 發現問題

- input 值改變時，`getItem` function 會跟著改變，因此在 `<List/>` 裡面的 `useEffect` 會被觸發，執行 `getData()` ，並印出 "get data"，這很好理解
- 但是當按下 toggle theme 按鈕來切換主題時，**也會觸發 `useEffect` ，印出 "get data"**

這代表 `getData` 在點擊按鈕時也改變了，原因是點擊按鈕時會改變 `themeDark` 狀態，然後觸發父元件的 re-render；父元件重新 render 時，就會創造一個新的 `getData` function。

## 解決

**使用 `useCallback`**

- `useCallback` 用法跟 `useMemo` 一樣，有兩個參數：
  第一個：callback function
  第二個：是一個陣列，像 useEffect 那樣，當陣列裡某元素的值改變時，就會執行第一個參數的 function

```javascript
// 原本寫法
const getData = () => {
  return [input + 1, input + 2, input + 3];
};

// 改為
const getData = useCallback(() => {
  return [input + 1, input + 2, input + 3];
}, [input]);
```

**`useCallback` 跟 `useMemo` 比較** 1.`useMemo` 不能傳入參數，而 `useCallback` 可以2. `useCallback` `useMemo` 都會接收一個 function，但`useMemo` 會回傳此 function 的回傳值，而 `useCallback` 會回傳此 function 3. `useCallback(fn, [deps])` 就相當於 `useMemo(() => fn, [deps])`

```javascript
// 也可用 useMemo 寫法
const getData = useMemo(() => {
  return () => {
    return [input + 1, input + 2, input + 3];
  };
}, [input]);
```
