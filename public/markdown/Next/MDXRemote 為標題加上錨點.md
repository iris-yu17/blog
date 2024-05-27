> 本篇文章使用 Next.js App router 及 MDXRemote

## 說明
假設我們的 markdown 長這樣
```
# 這是大標題
內文內文內文....
```
結果會長這樣
```html
<h1>這是大標題</h1>
<p>內文內文內文....</p>
```
而這是我們希望的樣子
```html
<a href="#unique-id">
  <h1 id="unique-id">這是大標題
</h1>
</a>
<p>內文內文內文....</p>
```

## 需要使用兩個套件
要達到希望的樣子，我們需要：
1. 給標題一個 id：使用 `rehype-slug`
2. 加上連結：使用 `rehype-autolink-headings` ，他會把有 id 的標題都加上連結

## 為標題加上 id
### 安裝 `rehype-slug`
```
yarn add rehype-slug
```
### 使用 `rehype-slug`
```javascript
import rehypeSlug from 'rehype-slug';

// ...

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [rehypeSlug],
  },
};

// ...

export default function Markdown() {
  return <MDXRemote source={data} options={options} />
}
```

檢查：我們打開 `f12` 看看元素，會發現標題都多了一個 id 屬性了。

## 加上連結
### 安裝 `rehype-autolink-headings`
```
yarn add rehype-autolink-headings
```

### 使用
使用方法及參數詳見[這邊](https://www.npmjs.com/package/rehype-autolink-headings)。
稍微說明幾個參數：
1. `behavior` : 可以是 `'after' | 'append' | 'before' | 'prepend' | 'wrap'`，連結要放在哪邊，例如 `wrap`，代表要包住標題；使用 `before` 則會把連結放在標題元素前。
2. `content` ：連結元素的內容，預設會是 `<span class="icon icon-link"></span>`。
```javascript
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// ...

const options = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: {
            type: 'element',
            tagName: 'span',
            properties: { class: 'text-tertiary text-3xl' },
            children: [{ type: 'text', value: '#' }],
          },
        },
      ],
    ],
  },
};

// ...

export default function Markdown() {
  return <MDXRemote source={data} options={options} />
}
```
---
簡單兩步驟，就完成啦🎉🎉🎉