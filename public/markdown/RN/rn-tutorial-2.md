## 專案基本配置

expo 的範例自動幫我們產生了許多檔案，我們要把一些不必要的檔案刪掉、並設定一些此次專案的基本配置：

1. 清空 `components` 資料夾
2. 刪除 `app/index.tsx` 檔案
3. 在 `constants/Color.ts`，刪除原本內容，改為以下的顏色配置

```javascript
export default {
  black: '#1a1a1a',
  grey: '#242424',
  white: '#fcfcfc',
  tintColor: '#723feb',
  blue: '#97e0f7',
};
```

3. 刪除 `hooks` 資料夾
4. 刪除 `app-example` 資料夾
5. 在 `assets` 資料夾新增 `icons` 資料夾，裡面放本專案需要用到的 icon
6. 在 `constants` 資料夾新增 `icons.tsx`，裡面 import 及 export 所有 icon
7. 新增 `data` 資料夾，裡面放此專案用到的假資料

## 頁面設置

1. `app/_layout.tsx` 改成以下

```javascript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

2. 在 `app` 資料夾下新增 `(tabs)` 資料夾，裡面再加入 `index.tsx`, `profile.tsx`, `transaction.tsx`，內容如下：

`(tabs)` 是 Expo 的文件夾命名約定，這個文件夾中的所有文件將被處理為 Tab 導覽的一部分。

```javascript
import { StyleSheet, View, Text } from 'react-native';

export default function Page() {
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
```

3. 在 `app/(tabs)` 下新增 `_layout.tsx`，使用 Tabs，內容如下：

```javascript
import { Tabs } from 'expo-router';

export default function Layout() {
  return <Tabs />;
}
```

接著啟動專案，我們在手機上就可以看到 tab 成功設置，並且可以切換頁面了。

## 安裝套件

### 1. react-native-gifted-charts

[這個套件](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)讓我們可以在專案中使用圖表

```
npx expo install react-native-gifted-charts expo-linear-gradient react-native-svg
```

### 2. react-native-svg-transformer

[這個套件](https://github.com/kristerkari/react-native-svg-transformer)讓我們能夠在專案中使用 svg icon。

```
npm install --save-dev react-native-svg-transformer
```

安裝完後，依照文件的步驟，在專案根目錄新增 `metro.config.js`，並貼上內容：

```javascript
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],
  };

  return config;
})();
```

接著如果專案是使用 `typescript`，同樣在根目錄新增 `declarations.d.ts`，並貼上內容：

```javascript
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

試試 icon 套件是否有用，在 `(tabs)` 的隨便一個 page 引入 icon 來使用看看：

```javascript
import { NetflixIcon } from '@/constants/Icons';
import { StyleSheet, View, Text } from 'react-native';

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
      <NetflixIcon width={22} height={22} color={'#000'} />
    </View>
  );
}

const styles = StyleSheet.create({});
```
