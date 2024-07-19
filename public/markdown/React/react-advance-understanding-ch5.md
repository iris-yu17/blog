## 前言

這系列文章是一邊閱讀 《React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者》，一邊做的筆記摘要。\
從 Chapter 2 ～ Chapter 5，總共會有四篇文章。

## 5-1 React 中的副作用處理：useEffect 初探

### 什麼是 effect

程式設計中的 effect，全名 side effect，中文稱「副作用」。\
是指當一個函式除了回傳結果值外，還會依賴或影響函式外的某些狀態、或是與外部環境產生互動。\
例如：修改函式外的全域變數、發起網路請求、操作 DOM element...等。

### React Component Function 中的副作用

1.  函式多次執行所疊加造成的副作用影響難以預測：\
    經過前面章節，我們都知道當 re-render 時，component function 就會重新執行一次，因此當 component function 的 render 流程包含了會造成副作用的處理時，就有可能隨著後續不斷的 re-render 讓這些副作用產生的影響不斷疊加、導致一些不可預測的問題。

2.  副作用可能會拖慢、阻塞函式本身的計算流程：\
    如以下程式碼，修改 DOM element 的動作本身會需要與瀏覽器互動。在這段修改 DOM 的處理完成前，程式碼就無法往下執行。

```javascript
const calculate = (num) => {
  document.querySelector('#App').style.color = 'black';

  return num * 2;
};
```

### 為什麼需要 useEffect 來處理副作用

當一個 component function 的 render 流程中，包含了會造成副作用的動作時，就有可能隨著後續不斷的 re-render 而讓副作用產生的影響不斷疊加。\
這些副作用也有可能會阻塞 component function 本身產生 React element 的過程，造成畫面更新的效能問題。

因此 useEffect 能夠做到以下兩件事，幫助解決上面兩個問題：

1. 清除或逆轉副作用造成的影響：\
   useEffect 讓開發者能夠定義副作用、也可以透過 cleanup 函式來指定如何消除副作用造成的影響。
2. 隔離副作用的執行時機：\
   當我們在 component function 直接執行副作用，有可能會阻塞產生 React element 的過程，造成畫面更新的效能問題。使用 useEffect 能夠將副作用的處理隔離到 render 完之後才執行，避免它影響到畫面的產生及更新。

### useEffect 初探

許多人會對 useEffect 有個誤解，以為 useEffect 是 Functional Component 的生命週期 API，而實際上 useEffect 是用來管理副作用的，它可以清除或逆轉副作用造成的影響，並將副作用的處理隔離在渲染流程之外，避免影響到畫面的更新。

```javascript
useEffect(effectFunction, dependencies?)
```

#### - effectFunction（effect 函式）

- 是個函式，我們會在裡面放副作用的處理邏輯。並且如果需要清理副作用的影響的話，可以讓 effectFunction 回傳一個副作用清理流程的 cleanup 函式。
- 會在 component 每次 render 完成、且實際 DOM 被更新後執行一次。每次 render 完成後，會先執行**前一次的 render 的 cleanup 函式**，然後才執行本次 render 的 effect 函式。
- component unmount 時，也會執行最後一次 render 的 cleanup 函式。

```javascript
useEffect(
  // effectFunction
  () => {
   // 執行副作用的處理邏輯

   // 回傳 cleanup 函式
   return () =>{
      // 副作用清理流程
   }
  },
  dependencies?,
);
```

#### - dependencies

- 是一個可選填的陣列參數，應包含在 effectFunction 所有依賴到的 component 資料項目，例如 props, state。
- 若不提供此參數的話，effectFunction 會在每次 render 都執行一次。
- 若有提供，React 會以 `Object.is()` 來一一比較陣列中所有依賴項目的值，與前次 render 時是否相同。若相同則不執行本次 render 的 effectFunction。

### 執行流程說明

```javascript
export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`count 為 ${count} 時的 effect 函式`);

    return () => {
      console.log(`count 為 ${count} 時的 cleanup 函式`);
    };
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
    </div>
  );
}
```

1. 首次 render 會執行 effect 函式，印出 `count 為 0 時的 effect 函式` 文字
2. 點擊 `+1`，component re-render，畫面上的數字從 0 變為 1
3. 先執行前一次版本的 cleanup 函式，因此會印出 `count 為 0 時的 cleanup 函式`
4. 再執行此次 render 版本的 effect 函式，印出 `count 為 1 時的 effect 函式`
5. 若再次點擊 `+1`，component re-render，畫面上的數字從 1 變為 2
6. 先執行前一次版本的 cleanup 函式，因此會印出 `count 為 1 時的 cleanup 函式`
7. 再執行此次 render 版本的 effect 函式，印出 `count 為 2 時的 effect 函式`

## 5-2 useEffect 的設計概念與 dependencies 正確用途

useEffect 的用途是：將原始資料同步化到畫面以外的副作用處理。

這邊的同步化指的就是讓資料可以一致。\
例如以下程式碼，component 在每次 render 時都會建立一個全新的 effect 函式，並且以 closure 記住該次 render 版本的 count 值，來讓瀏覽器標題可以跟這個資料同步（也就是能跟 count 保持一致）。

```javascript
export function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      Click
    </button>
  );
}
```

### 宣告式（declarative）與指令式（imperative）程式設計

上面那個範例，React 並不在乎這是初始 render（也就是 mount），還是第二次之後的 render（也就是 update），這個副作用在兩種情況的目標都是一樣的，也就是「把該次版本的 count 資料同步化到瀏覽器標題上」。

這種程式設計概念被稱為「宣告式」，意思是：我們只關注預期的結果是什麼樣子，不在乎中間是如何一步步走到結果的。\
其實 React 的畫面管理方式，就是一種宣告式的設計，像前面章節提到，state 改變時，會觸發 re-render，產生一個新版本的畫面，然後 React 會去對比新舊版本差別。開發者不需要關心新舊畫面的細節差異、以及 DOM 要更新哪邊，我們只需要「宣告」新畫面要長什麼樣子。

相對於宣告式，「指令式」則相反，著重於關心「如何達到目標的細節流程」。例如當我們手動操作 DOM 來更新畫面，必須非常清楚具體該修改哪些地方，並且一個步驟一個步驟疊加 DOM 的操作，不能有任何疏漏，結果才會是正確的。另外也較難直覺地想像結果會如何，因為最後的畫面是各種操作「疊加」累積而成的。

回到 useEffect，它是宣告式的設計，我們該以類似的想法來思考 React 中的副作用處理：\
useEffect 讓我們能夠根據 render 中的 props 和 state 資料來同步化那些跟畫面無關的東西，也就是副作用的處理。白話來說，就是**使用 useEffect，能夠讓副作用的處理所使用的 props, state 資料跟 render 的原始資料一致。**\
因此 useEffect 並不是 function component 的生命週期 API，雖然它的執行時機確實跟 class component 的一些生命週期類似，但這不是 useEffect 的用途。
它的目標是「同步化」而非「控制執行時機」，**這也是為什麼 effect 函式要在每次 render 後都執行的原因，為了確保「副作用會隨著資料變化而不斷執行對應的同步化」**。

## 5-4 dependencies 是一種效能優化手段，而非邏輯控制

這是非常重要的觀念，一般我們知道，當 dependencies 陣列裡的值沒有改變時，就會跳過 effect 函式。\
然而這個行為雖然在大多數情況下會如期發生，但**並不是保證的**。如果我們將它用於效能優化以外的用途，例如模擬生命週期、或是依賴於「因 dependencies 沒更新因此這段副作用會被跳過」的邏輯控制，這可能會讓我們設計出來的副作用處理不可靠、不安全。\
由於 dependencies 是一種效能優化手段，我們應該以效能優化的原則去思考：「即使沒有做這個效能優化的時候，程式也應該要能正常運作。」

因此，想要確認副作用處理是否安全可靠，最好的辦法就是：\
讓你的副作用處理即使根本沒提供 dependencies 參數（以至於每次都會執行），仍然可以正確運行。

所以當我們在設計 effect 函式的邏輯時，不該考慮這個 effect 函式會在什麼時候被執行，而是即使每次 render 都執行，程式仍能正常運作。副作用處理的重點應是「能夠完整的同步化原始資料到副作用」。

## 5-3 維護資料的流動：不要欺騙 hooks 的 dependencies

### 欺騙 dependencies 會造成什麼問題

我們看看以下範例，範例連結在[這邊](https://codesandbox.io/p/sandbox/react-advance-ch5-3-1-mr3s8k)。\
我們嘗試要讓 count 值每隔一秒就加一，然而這段程式碼是有問題的，畫面上會顯示它只增加一次就不動了。

```javascript
export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="App">
      <h1>Count: {count}</h1>
    </div>
  );
}
```

你可能會有這樣的思考脈絡：「我想要自動執行重複更新 count 的動作，為此我們使用 `setInterval` 來讓它不斷執行 setCount 的呼叫。所以我只想要觸發一次這個 effect 函式來執行 `setInterval`，也只在 unmount 時做一次 `clearInterval`。所以把 dependencies 設置為 `[]`，這樣就只會在 mount 跟 unmount 時才會執行。」

這個 effect 函式明明就依賴了 count 這個 state 資料，我們卻沒有把它放進 dependencies，因此發生了問題。\
問題出在哪裡呢？

第一次 render：

1. count 值為 0，渲染出畫面
2. 執行 effect 函式，呼叫 setInterval（它裡面的 `setCount(count + 1)` 固定會是 `setCount(0 + 1)`）
3. 過了一秒，呼叫 setCount 將 count 值加一
4. count 舊的值為 0，新的值為 1，觸發 re-render

第二次 render：

1. count 值為 1，渲染出畫面
2. React 會逐一比較 dependencies 陣列所有項目與上一版本是否相同來決定是否跳過而因為 dependencies 是 `[]`，React 會認為沒有依賴資料而直接跳過。setInterval 裡面的 `setCount(count + 1)` 會是 `setCount(1 + 1)`，但由於 effect 函式直接被跳過，不會重新設定 `setInterval`，它執行的永遠都是 `setCount(0 + 1)`。

這就是欺騙 dependencies 所連帶導致的問題。\
我們應該永遠誠實地依據 effect 函式實際的資料依賴來填寫 dependencies。

正確寫法：

```javascript
export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
    // 依據 effect 函式實際的資料依賴來填寫 dependencies
  }, [count]);

  return (
    <div className="App">
      <h1>Count: {count}</h1>
    </div>
  );
}
```

現在正確地執行流程會如下：

第一次 render：

1. count 值為 0，渲染出畫面
2. 執行 effect 函式，呼叫 setInterval（它裡面的 `setCount(count + 1)` 固定會是 `setCount(0 + 1)`）
3. 過了一秒，呼叫 setCount 將 count 值加一
4. count 舊的值為 0，新的值為 1，觸發 re-render

第二次 render：

1. count 值為 1，渲染出畫面
2. React 會逐一比較 dependencies 陣列所有項目與上一版本是否相同，發現前一版本是 0，這一版本是 1，因此執行判定這個副作用依賴的資料有更新，所以本次副作用處理應照常執行，不會被跳過。
3. 執行本次 render 版本的 effect 函式前，會先執行上一版本的 cleanup 函式：執行 `clearInterval` 來清除上次 render 設定的 `setInterval`
4. 執行本次 render 版本的 effect 函式，以新的 count 值來設定 `setInterval`（它裡面的就會是 `setCount(1 + 1)`，也就是 `setCount(2)`）

之後每次 render 都是以此類推。

### 讓 effect 函式對於依賴的資料自給自足

接續前面的範例情況，`count` 會在不同 render 間頻繁更新，因此會不斷地清除又重新設定 `setInterval`，我們可以再調整寫法，讓它不再需要依賴一個會在不同 render 間頻繁更新的值。\
我們仍然要保持對 dependencies 誠實，但可以透過一些安全的手段盡量**減少依賴項目**，讓 effect 函式對於依賴的資料自給自足。\
白話來說就是可以透過一些安全方法，就不用再把 count 放到 dependencies 了。

我們可以先想想，為何上面那個範例需要依賴 count 變數？\
因為我們需要得到它當前的值。

在[前面章節](.react-advance-understanding-ch3)有介紹到，當我們想要根據既有的 state 來做計算時，可以使用 **updater function**。\
因此範例可以再改寫成：

```javascript
export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // 使用 updater function
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  // ...
}
```

這樣的做法，能夠將「資料本身的值」與「操作資料的流程」解耦。不需要再依賴資料本身的值（也就是 count 變數），只要使用 updater function 來描述操作資料的流程（也就是告訴 React：我要讓這個 state 以目前的值增加 1）。

這樣我們的 effect 函式就不需要依賴 count 變數了，可以安全地把它從 dependencies 移除。達到「自給自足」的效果，同時也對 dependencies 保持誠實。
