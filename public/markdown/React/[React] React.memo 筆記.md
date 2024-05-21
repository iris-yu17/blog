> Demo: https://codesandbox.io/s/react-memo-f78zyj?file=/src/App.js

## `React.memo` 是什麼

- 當父元件 re-render 時，即使傳入子元件的資料並沒有改變，子元件也會 re-render。這時候就可以使用 `React.memo` 來避免子元件沒必要的重新渲染。
- `React.memo` 是一個 `HOC`，他會幫我們比較元件的 `props` 有沒有改變，我們把子元件用 `React.memo` 包起來，只要 `props` 沒改變，子元件就不會跟著父元件 re-render。
- 寫法： `React.memo(CustomComponent, props)`，它接收兩個參數：1.元件2.想要比較的 props。 沒輸入的話，預設為全部。

## demo 說明

### 父元件

- 在父元件引入子元件 `Child`
- 在父元件有個 counter，會顯示當前數字，並且能夠點擊按鈕來加一。
- 有一個 input，input 的值會傳入子元件 `Child`

```javascript=1
export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <div className="App">
      <div>{count}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
      <br />
      <input
        value={name}
        onInput={(e) => {
          setName(e.target.value);
        }}
      />
      <Child name={name} />
    </div>
  );
}
```

### 子元件

- 接收來自父元件的 props，並顯示在畫面中。
- 當元件渲染時，會印出 `child component re-rendered` 文字。

```javascript=1
function Child({ name }) {
  console.log("child component re-rendered");

  return <div>My name is {name}</div>;
}

export default Child;
```

## 發現問題

點擊按鈕將 count 加一時，會印出 `child component re-rendered` 文字，這代表子元件跟著父元件重新渲染了。

## 解決

使用 `React.memo` 將子元件包起來

```javascript=1
export default React.memo(Child);
```

## 注意

`React.memo` 是優化效能用，因為使用 memo 也是需要消耗記憶效能，若 props 變動頻繁時，就不需要使用。
