## 範例

> Demo: https://codesandbox.io/s/usememo-nffpkl?file=/src/App.js:0-716

## 畫面說明：

> 1. 有個 input，我們可以輸入數字，輸入後在 Double Value 就會顯示所輸入數字乘以二的結果
> 2. 有個 change theme 按鈕，可把畫面轉為暗色模式（黑背景白字）

![](https://i.imgur.com/0bATFA9.png)

## Code 說明：

- 我們用一個 `slowFunction` 來模擬複雜、要跑很久的 function
- input 填入數字後，會使 `value` 狀態改變
- 每次 render 的時候都會執行 `slowFunction` ，在 [demo](https://codesandbox.io/s/usememo-nffpkl?file=/src/App.js) 中可以看到輸入後，都要等約一秒，Double value 才改變
- 在切換 theme 的時候也一樣，點擊按鈕後也會有 lag，主題顏色才改變，這是因為只要 state 有改變，**就會觸發畫面的 re-render，`slowFunction` 都會再執行一次**

```javascript
function slowFunction(num) {
  for (let i = 0; i < 1000000000; i++) {}
  return num * 2;
}

export default function App() {
  const [value, setValue] = useState(0);
  const [darkTheme, setDarkTheme] = useState(false);
  const doubleValue = slowFunction(value);

  const themeStyle = {
    color: darkTheme ? "#fff" : "#1b1b1b",
    background: darkTheme ? "#1b1b1b" : "#fff"
  };

  return (
    <div className="App" style={themeStyle}>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div>Double Value: {doubleValue}</div>
      <button
        onClick={() => {
          setDarkTheme(!darkTheme);
        }}
      >
        Change Theme
      </button>
    </div>
  );
}

```

## 解決

**使用 `useMemo`**

- `useMemo` 有點像快取，把複雜運算完的值記起來，就不用每次都重跑一次
- 有兩個參數：
  第一個：callback function
  第二個：是一個陣列，像 `useEffect` 那樣，當陣列裡某元素的值改變時，就會執行第一個參數的 function

```javascript
// 原本寫法
const doubleValue = slowFunction(value);

// 改為
const doubleValue = useMemo(() => {
  return slowFunction(value);
}, [value]);
```

## 注意

**不可以在所有地方都使用 `useMemo`**
`useMemo` 是用來優化效能的，過度使用反而會造成效能跟記憶體的額外消耗，原因說明：

1. `useMemo` 要判斷 dependency array 裡面元素的值是否有改變，若有的話才執行callback function，所以它**在每次 render 都會執行**，會造成不必要的性能消耗。
2. `useMemo` 要記住 function 回傳的值，造成額外記憶體消耗。

## 正確使用時機

1. 像範例中想避免重複進行複雜耗時的計算時
2. Referential Equality

簡單解釋什麼是 Referential Equality：物件型別擁有 call by reference 的特性，所以即使字面上看起來一樣，兩個物件其實是不一樣的。

```javascript
const person1 = {
    name: 'Ben'
}
const person2 = {
    name: 'Ben'
}

console.log(person1 === person2) // -> false
```

若我們在範例中加上

```javascript
useEffect(() => {
    console.log("theme changed");
}, [themeStyle]);
```

在我們點擊按鈕改變 `darkTheme` 時， `themeStyle` 就會跟著改變，因此會印出 theme changed，這很好理解。

但是在改變 input 值的時候，也會印出 theme changed，這是因為每次 render 時，都會產生一個新的 `themeStyle` 物件，這個`themeStyle` 物件跟 render 前的 `themeStyle` 是不一樣的。

因此也可以使用 `useMemo` 來解決這個問題

```javascript
// 原本
const themeStyle = {
  color: darkTheme ? "#fff" : "#1b1b1b",
  background: darkTheme ? "#1b1b1b" : "#fff"
};

// 改為
const themeStyle = useMemo(() => {
  return {
    color: darkTheme ? "#fff" : "#1b1b1b",
    background: darkTheme ? "#1b1b1b" : "#fff"
  };
}, [darkTheme]);
```
