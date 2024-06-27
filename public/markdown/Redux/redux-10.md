> Demo: https://codesandbox.io/p/devbox/redux-10-redux-toolkit-with-async-thunk-zj6fg3

## 前言

在這一章節，我們要學習如何在 `Redux-toolkit` 中處理非同步動作。\
首先稍微提一下純 `Redux` 處理非同步的作法：\
（詳細說明可以看看 [Redux#5 用 Redux-thunk Middleware 處理非同步動作](./redux-5)）

- 使用 `Redux-thunk` middleware 來創建一個回傳 function 的 `action creator`
- 在這個 function 裡控制發送 action 的時機：執行 fetch 前、成功獲得資料、取得資料失敗時發送對應的 `action`

```javascript
const fetchUserActionCreator = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const userName = data.map((item) => item.name);
        dispatch(fetchUserSuccess(userName));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchUserFailure(err));
      });
  };
};
```

接下來我們看看如何使用 `Redux-toolkit` 處理非同步動作。

## - step1. 創建 userSlice

- 在 `features/user` 創建 `userSlice.js`
- 如同前面章節所提，使用 `createSlice` 建立 `slice`

```javascript
const createSlice = require('@reduxjs/toolkit').createSlice;

// state
const initialState = {
  loading: false,
  users: [],
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  // ...
});
```

## - step2. 使用 createAsyncThunk

- `Redux-toolkit` 提供了 `createAsyncThunk` 這個 function 來幫我們建立、發送非同步的 `action`
- `createAsyncThunk` 接收兩個參數：
  1. action 的名稱
  2. 一個回傳 promise 的 callback function
- `createAsyncThunk` 會自動發送基於這個 promise 生命週期 (pending, fulfilled, rejected) 的 `action`，因此會有三個 `action types`： `pending`, `fulfilled`, `rejected`

```javascript
const createSlice = require('@reduxjs/toolkit').createSlice;

// state
const initialState = {
  loading: false,
  users: [],
  error: '',
};

// 使用 createAsyncThunk
// 自動產生 `pending`, `fulfilled`, `rejected` 三個 action types
const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const userName = data.map((item) => item.name);
    });
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  // ...
});
```

## - step3. 使用 extraReducers

- 因這些 actions 是外部的 action（並不是使用 `createSlice` 創建出來的），我們要使用 `extraReducers` 來監聽這些 `action types`。
- `builder.addCase()` 裡面，第一個參數是 `action type`，第二個則是我們修改 `state` 的 function。
- `fetchUsers.pending` 這個 `action type` 其實就是 `'user/fetchUsers/pending'`，前半段 user/fetchUsers 是上一步驟在 `createAsyncThunk` 定義的第一個參數，pending 則是 `createAsyncThunk` 自動產生的 type。

```javascript
const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error;
    });
  },
});

// export
module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
```

## - step4. 配置 userReducer

### 在 `store.js`

```javascript
const configureStore = require('@reduxjs/toolkit').configureStore;
const userReducer = require('../features/user/userSlice');

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

module.exports = store;
```

在 `index.js`

```javascript
const store = require('./app/store');
const fetchUsers = require('./features/user/userSlice').fetchUsers;

console.log('Initial State:', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('Updated State:', store.getState());
});

store.dispatch(fetchUsers());
```

## 結果

可以看到 `state` 從 `loading: false` 變為 `loading: true`\
再變成 `loading: false`，並且 users 陣列產生了資料。

```javascript
Initial State: {
  user: { loading: false, users: [], error: '' }
}
Updated State: {
   user: { loading: true, users: [], error: '' }
}
Updated State: {
  user: {
    loading: false,
    users: [
      'Leanne Graham',
      'Ervin Howell',
      'Clementine Bauch',
      'Patricia Lebsack',
      'Chelsey Dietrich',
      'Mrs. Dennis Schulist',
      'Kurtis Weissnat',
      'Nicholas Runolfsdottir V',
      'Glenna Reichert',
      'Clementina DuBuque'
    ],
    error: ''
  }
}
```

## 總結

- 在 `Redux-toolkit` 中，要處理非同步動作，可使用它提供的 `createAsyncThunk` 函式。

```javascript
createAsyncThunk(
  // 第一個參數：action 名稱
  'actionName',
  // 第二個參數：一個回傳 Promise 的 callback function
  () => {
    return new Promise();
  },
);
```

- `createAsyncThunk` 會依據 Promise 狀態自動發送 `pending`, `fulfilled`, `rejected` 三種 type。
- 用 `extraReducers` 來監聽 action type。

---

參考資料：

- https://youtu.be/Tay06Rk881Y?si=zfqugEPcR2xRtPHA
