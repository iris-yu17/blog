> Demo: https://codesandbox.io/s/redux-5-redux-thunk-dmlq7x

## `Redux-thunk` 介紹

- 什麼是 `thunk`？
  被另一個函式回傳出來的函式，就叫做 `thunk`。
- 在 `Redux` 中，`reducer` 的 `action` 必須是物件，而`Redux-thunk` 讓我們可以寫一個回傳 function 的 `action creator`。透過這個 `thunk`，我們可以控制發送 `action` 的時機。
- `Redux-thunk` 的源碼就是單純判斷 `action` 是否為 `function` 而已 ，如果是的話，就執行這個 `function`。

```javascript
// Redux-thunk 的源碼
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

## 情境

假設我們要拿取遠端 user 資料，並在拿取資料時顯示 loader，若有錯誤顯示 error。

我們先建立好 `state`, `action creator` 和 `reducer`

### - `State`

```javascript
const initialState = {
  loading: false,
  users: [],
  error: ""
};
```

### - `Action`

```javascript
const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FALIED = "FETCH_USER_FALIED";

// action creators
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUESTED
  };
};
const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users
  };
};
const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FALIED,
    payload: error
  };
};
```

### - `Reducer`

```javascript
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: ""
      };
    case FETCH_USER_FALIED:
      return {
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return;
  }
};
```

## 發送 Request

### - 未使用 `Redux-thunk` 寫法

#### function

```javascript
const fetchUser = () => {
  store.dispatch(fetchUserRequest());
  fetch("https://jsonplaceholder.typicodes.com/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const userName = data.map((item) => item.name);
      store.dispatch(fetchUserSuccess(userName));
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(fetchUserFailure(err));
    });
};
```

#### Store

```javascript
const store = createStore(reducer);
fetchUser();
```

### - 使用 `Redux-thunk` 寫法

- 創建一個回傳 function 的 `action creator`
- 回傳的 funcion (`thunk`) 接收 `dispatch` 作為參數。

#### Action creator

```javascript
const fetchUserActionCreator = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    fetch("https://jsonplaceholder.typicode.com/users")
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

#### Store

```javascript
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.dispatch(fetchUserActionCreator());
```

## 為何要使用 `Redux-thunk`

1. 統一管理：把非同步操作的邏輯在單獨的地方集中管理，提高程式碼的重用性和可測試性。
2. 分開邏輯：分開元件的渲染邏輯和網路請求邏輯，元件不用直接處理非同步操作，只需呼叫 action creator，不需要處理請求、回應等細節。
3. 程式碼的可讀性：以本文章的例子，不使用 `Redux-thunk` 的情況，我們會呼叫 `fetchUser()` ；使用 `Redux-thunk` 的情況，則是 `dispatch(fetchUserActionCreator())`。相比起來，當我們一看到 `dispatch(fetchUserActionCreator())` 就會知道這是非同步的行為，而不是單純的函式調用。
