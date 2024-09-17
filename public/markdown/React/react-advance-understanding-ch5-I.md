## 前言

這系列文章是一邊閱讀 《React 思維進化：一次打破常見的觀念誤解，躍升專業前端開發者》，一邊做的筆記摘要。\
由於主要是寫給自己看的筆記，所以會比較精簡，也會省略一些細節說明。從 Chapter 2 ～ Chapter 5，總共會有五篇文章。

- [《React 思維進化》Chapter 2 筆記](./react-advance-understanding-ch2)
- [《React 思維進化》Chapter 3 筆記](./react-advance-understanding-ch3)
- [《React 思維進化》Chapter 4 筆記](./react-advance-understanding-ch4)
- [《React 思維進化》Chapter 5 筆記（上）](./react-advance-understanding-ch5-I)
- [《React 思維進化》Chapter 5 筆記（下）](./react-advance-understanding-ch5-II)

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
   副作用（如 API 請求、操作 DOM 等）通常是較耗時的操作，如果在渲染過程中進行這些操作，有可能會阻塞產生 React element 的過程，造成畫面更新的效能問題。使用 useEffect 能夠將副作用的處理隔離到 render 完之後才執行，避免它影響到畫面的產生及更新。

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
export default function SearchResults() {
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
export function SearchResults() {
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

### dependencies 是一種效能優化手段，而非邏輯控制

這是非常重要的觀念，一般我們知道，當 dependencies 陣列裡的值沒有改變時，就會跳過 effect 函式。\
然而這個行為雖然在大多數情況下會如期發生，但**並不是保證的**。如果我們將它用於效能優化以外的用途，例如模擬生命週期、或是依賴於「因 dependencies 沒更新因此這段副作用會被跳過」的邏輯控制，這可能會讓我們設計出來的副作用處理不可靠、不安全。\
由於 dependencies 是一種效能優化手段，我們應該以效能優化的原則去思考：「即使沒有做這個效能優化的時候，程式也應該要能正常運作。」

因此，想要確認副作用處理是否安全可靠，最好的辦法就是：

> 讓你的副作用處理即使根本沒提供 dependencies 參數（以至於每次都會執行），仍然可以正確運行。

所以當我們在設計 effect 函式的邏輯時，不該考慮這個 effect 函式會在什麼時候被執行，而是即使每次 render 都執行，程式仍能正常運作。副作用處理的重點應是「能夠完整的同步化原始資料到副作用」。

## 5-3 維護資料的流動：不要欺騙 hooks 的 dependencies

### 欺騙 dependencies 會造成什麼問題

我們看看以下範例，範例連結在[這邊](https://codesandbox.io/p/sandbox/react-advance-ch5-3-1-mr3s8k)。\
我們嘗試要讓 count 值每隔一秒就加一，然而這段程式碼是有問題的，畫面上會顯示它只增加一次就不動了。

```javascript
export default function SearchResults() {
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
2. React 會逐一比較 dependencies 陣列所有項目與上一版本是否，而因為 dependencies 是 `[]`，React 會認為沒有依賴資料而直接跳過。此次 render 的 setInterval 裡面的 `setCount(count + 1)` 會是 `setCount(1 + 1)`，但由於 effect 函式直接被跳過，不會重新設定 `setInterval`，它執行的永遠都是 `setCount(0 + 1)`。

這就是欺騙 dependencies 所連帶導致的問題。\
我們應該永遠誠實地依據 effect 函式實際的資料依賴來填寫 dependencies。

正確寫法：

```javascript
export default function SearchResults() {
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

接續前面的範例情況，`count` 會在不同 render 間頻繁更新，因此會不斷地清除又重新設定 `setInterval`，這顯然不是最好的做法。我們可以再調整寫法，讓它不再需要依賴一個會在不同 render 間頻繁更新的值。\
我們仍然要保持對 dependencies 誠實，但可以透過一些安全的手段盡量**減少依賴項目**，讓 effect 函式對於依賴的資料自給自足。\
白話來說就是可以透過一些安全方法，就不用再把 count 放到 dependencies 了。

我們可以先想想，為何上面那個範例需要依賴 count 變數？\
因為我們需要得到它當前的值。

在[前面章節](./react-advance-understanding-ch3)有介紹到，當我們想要根據既有的 state 來做計算時，可以使用 **updater function**。\
因此範例可以再改寫成：

```javascript
export default function SearchResults() {
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

### 函式型別的依賴

看以下的範例中，副作用的處理是：「根據 query 的值來呼叫 API 請求」，當呼叫 setQuery 而更新 query 並 re-render 時，照理來說這個副作用應該重新被執行，以反應新的資料所對應的同步化動作。

按照 dependecnies 的填寫原則，fetchData 定義於 effect 函式之外，我們應將它填入於 dependecnies 陣列中。\
當我們沒有誠實把 fetchData 填入 dependencies 裡面，React 會誤以為這個副作用沒有依賴任何資料，因此跳過執行，導致「將資料同步化到副作用處理」的連動反應失敗。

```javascript
export default function SearchResults() {
  const [query, setQuery] = useState('react');

  async function fetchData() {
    const result = await fetch(`
    https://foo.com/api/search?query=${query}
    `);
    // ...
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ...
}
```

這時，我們的第一反應可能會是：那就把 fetchData 填到 dependecnies 裡。

```javascript
export default function SearchResults() {
  const [query, setQuery] = useState('react');

  async function fetchData() {
    const result = await fetch(`
    https://foo.com/api/search?query=${query}
    `);
    // ...
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ...
}
```

這樣一來，確實對 dependecnies 誠實，成功讓 query 資料連動 API 請求的副作用處理，然而會產生一個問題：\
**useEffect 的 dependecnies 效能優化是失敗的。**
每次 render 時，fetchData 就會執行一次，即使 query 並沒有改變。

因為每次 render 都會重新產生一個 fetchData 函式，所以在 dependecnies 的比較時，它會判斷依賴發生更新，導致每次 render 時，fetchData 都會執行。

那我們可以怎麼做呢？

#### - 把函式定義移到 effect 函式裡

這樣一來 fetchData 就只有在 effect 函式有被執行到時才會重新產生，而 fetchData 也不再是 effect 函式的依賴，現在依賴變數為 query。

```javascript
export default function SearchResults() {
  const [query, setQuery] = useState('react');

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(`
    https://foo.com/api/search?query=${query}
    `);
      // ...
    }

    fetchData();
  }, [query]);

  // ...
}
```

#### - 但若我不想將這個函式放入 effect 函式裡

有時我們不想值些將函式定義在 effect 函式中，例如當 component 不同的副作用處理都需要呼叫該函式時，我們希望可以重用它：\
以下的做法，將 fetchData 放入 dependecnies，如前面所說，雖然對 dependecnies 誠實了，但效能優化是失敗的。

```javascript
export default function SearchResults() {
  async function fetchData(query) {
    const result = await fetch(`
    https://foo.com/api/search?query=${query}
    `);
    // ...
  }

  useEffect(() => {
    fetchData('react').then((res) => {
      // 用資料進行某些操作
    });
  }, [fetchData]);

  useEffect(() => {
    fetchData('vue').then((res) => {
      // 用資料進行某些操作
    });
  }, [fetchData]);

  // ...
}
```

#### 解決方法一：把跟 component 資料流無關的流程抽到 component 外部

如果一個函式內容沒有直接依賴於 component function 內的任何 props, state 或相關衍生資料，我們可以將其移到外面。\
此時就可以不用把 fetchData 放到 dependecnies，因為它不是定義在 component function 中，不會因為每次 render 就重新產生一次，其值是永遠不變的。

換句話說，**只有那些「值可能會因為不同次 render 而改變的資料」才需要被填寫到 dependecnies 陣列中。**

```javascript
async function fetchData(query) {
  const result = await fetch(`
    https://foo.com/api/search?query=${query}
    `);
  // ...
}

export default function SearchResults() {
  useEffect(() => {
    fetchData('react').then((res) => {
      // 用資料進行某些操作
    });
  }, []);

  useEffect(() => {
    fetchData('vue').then((res) => {
      // 用資料進行某些操作
    });
  }, []);

  // ...
}
```

#### 解決方案二：使用 useCallback

我們應該先嘗試前面把函式抽到 component 外部的做法，但有時候函式可能會依賴許多 component 中的資料，此時如果把函式抽到 component 外部的話，反而會需要傳遞過多的參數，造成程式碼的可讀性下降。

遇到這種情況，我們會希望將依賴了 props, state 的函式定義在 component function 中。然而前面也說了，這樣就需要將 fetchData 填入 dependencies 陣列，而面臨效能優化失效的問題。

這個問題的本質是因為這個 component 資料流的依賴鏈：\
`資料` => `函式` => `副作用`\
在這個依賴鏈中，`函式` 這個節點沒辦法正確地反應資料更新與否（無論 `資料` 有沒有更新，`函式` 都會重新產生），而 `副作用` 又依賴了這個 `函式`，在每次 render 時都會判定它有改變，造成優化失效。

幸好 React 有個內建的配套措施來幫我們解決這個問題 —— `useCallback`\
**它可以將 render 之間的資料流變化正確地連動、反應到函式身上**

useCallback 會接收兩個參數：第一個參數是個函式，第二個參數是個 dependencies 陣列。\
簡單來說，useCallback 會記住這個函式，當 dependencies 資料有改變時，才會去更新函式。\
useCallback 的使用方法可以看[這邊](./react-usecallback)

```javascript
const cachedFn = useCallback(fn, dependencies);
```

在第一次 render 時，useCallback 接收我們傳入的函式及 dependencies 並記憶起來，然後將我們所傳入的函式原封不動的傳回。\
當後續 re-render 時，useCallback 會比較 dependencies 是否有改變。若沒改變，就直接回傳前一次 render 時記住的那個舊函式；若有改變，就會記住本次傳入的新函式及 dependencies，並將新函式原封不動的回傳。

舉例來說，假設 fetchData 依賴了 `props.rows` 資料。\
我們可以使用 useCallback 記住 fetchData 函式，並讓它只有在 `props.rows` 資料改變時才更新。\
然後我們在 useEffect 的 dependencies 填入 fetchData，

```javascript
export default function SearchResults(props) {
  // 使用 useCallback
  const fetchData = useCallback(
    async (query) => {
      const result = await fetch(`
      https://foo.com/api/search?
      query=${query}&rows=${props.rows}
      `);
      // ...
    },
    // dependencies 誠實，這個函式中依賴了 props.rows 資料
    [props.rows],
  );

  useEffect(() => {
    fetchData('react').then((res) => {
      // 用資料進行某些操作
    });
    /**
     * dependencies 誠實，
     * 只有當 props.rows 與前一次 render 不同，
     * fetchData 才會發生改變，
     * 連帶的此副作用才會被執行
     */
  }, [fetchData]);

  useEffect(() => {
    fetchData('vue').then((res) => {
      // 用資料進行某些操作
    });
  }, [fetchData]);

  // ...
}
```

### Effect dependencies 常見的錯誤用法

我們一直在強調幾個概念：

> useEffect 的用途是個資料同步化到畫面渲染以外的副作用處理，而不是 function component 的生命週期 API。
>
> useEffect 的 dependecies 是一種「跳過某些不必要的執行」的效能優化，而不是用來控制 effect 函式的執行時機。

#### 常見誤用一：模擬 ComponentDidMount

我們不該用 useEffect 搭配不誠實的 dependecies 來模擬 class component 的生命週期 API。\
實際上，function component 本身也沒有提供生命週期 API，因為有了 useEffect 這個「將資料同步化到副作用」的設計，在絕大多數情況都能滿足我們的開發需求。\
我們開發時，可能都會有過此想法：「在 dependecies 填入 `[]`，就只會在 mount 時執行一次。」

以下範例，執行結果可以看[這邊](https://codesandbox.io/p/sandbox/react-advance-ch5-3-2-n7mtqh)

```javascript
export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Effect start`);
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="App">
      <h1>{count}</h1>
    </div>
  );
}
```

畫面上出現的是 `2`。\
因為 React 18 開始，在嚴格模式下，effect 函式有可能會在 mount 時被執行兩次。\
如前面所說，dependecies 是用來優化效能的，不是保證在某情況後會跳過。而在未來，React 也有可能在 dependecies 沒有更新的情況下，仍重新執行副作用的處理。

那當我們真的需要在副作用在 component 的生命週期中只執行一次時要怎麼辦呢？\
自己寫一段判斷邏輯即可。

```javascript
export default function App() {
  const [count, setCount] = useState(0);
  const isEffectCalledRef = useRef(false);

  useEffect(() => {
    if (!isEffectCalledRef.current) {
      console.log(`Effect start`);
      setCount((prev) => prev + 1);

      isEffectCalledRef.current = true;
    }
  }, []);

  return (
    <div className="App">
      <h1>{count}</h1>
    </div>
  );
}
```

由於 `useRef` 所保存的值是可以跨 render 存取的，可以用來儲存跟畫面連動沒有關係的跨 render 資料。\
我們可以發現這完全無關乎 dependencies，即使將 `[]` 拿掉，讓它每次 render 時都會重新執行 effect 函式，這段副作用也不會因此出錯。

#### 常見誤用二：以 dependencies 來判斷副作用處理的執行時機

如以下的[範例](https://codesandbox.io/p/sandbox/react-advance-ch5-3-3-r5k547)：\
有兩個 state 資料：count 跟 todos。\
我們想要做到當首次 render 以及在 re-render 發現 todos 資料改變時，count 就要加一。

在這個錯誤示範中，我們欺騙 dependencies 這個 effect 函式有依賴 todos 變數，想藉此達成「只有當 todos 更新才執行這段副作用」的效果。

```javascript
export default function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(['foo']);

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, [todos]);

  // ...
}
```

正確寫法應該如下：\
我們只要自己去撰寫「比較本次跟上一次 render 的資料，如果有不同才執行副作用」的判斷即可。

```javascript
export default function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(['foo']);

  const prevTodosRef = useRef();

  useEffect(() => {
    // 比較前一次跟這一次 render 的 todos
    if (prevTodosRef.current !== todos) {
      setCount((prev) => prev + 1);
    }
    // dependencies 誠實，函式中依賴了 todos 變數來做判斷
  }, [todos]);

  useEffect(() => {
    // 在其他副作用處理完成之後，將本次 render 的資料存起來，以供下次 render 時進行比較
    prevTodosRef.current = todos;
  }, [todos]);

  // ...
}
```

## 5-4 React 18 的 effect 函式在 mount 時為何會執行兩次？

在前面提過的[這個](https://codesandbox.io/p/sandbox/react-advance-ch5-3-2-n7mtqh)範例，我們知道在 React 18 中，effect 函式可能會被執行兩次。

這是在開發環境使用嚴格模式才會發生，主要是為了幫助開發者檢查到不夠安全、可靠的副作用處理。因為在 React 未來版本中，加入了一個新的概念：Reusable State。

Reusable State 是指：從畫面中移除 component 後，仍能保留其 state 狀態，以便需要時重新 mount 後再次還原。

而當然，在每次 mount 時，component 就會再次執行副作用的處理。這意味著，在未來版本的 React 中，即使 dependencies 沒有變化，effect 函式仍有可能再次被執行。

所以為了確保 component 支援上述的特性，副作用的處理就必須滿足「無論被重複多少次也不會壞掉」的目標。

React 18 的嚴格模式，就是添加了模擬 `mount` => `unmount` => `mount` 的行為。所以我們才會在 component 在 mount 時自動發起 `執行 effect 函式` => `執行 cleanup 函式` => `執行 effect 函式` 的動作。
