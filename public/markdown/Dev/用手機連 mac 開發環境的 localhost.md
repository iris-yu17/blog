本篇文章會介紹兩種方法：
1. 使用本機 IP
2. 使用 `ngrok`

## 使用本機 IP
這個方法需要手機和電腦在同一個網路下才可以使用
### 找到本機 IP
在終端機輸入下面指令，可得到本機 `IP`
```
ipconfig getifaddr en0
```

### 設定 package.json
在專案 run dev 的地方加上 `--hostname={ip}`，例如：
```
  "scripts": {
    "dev": "next dev --hostname=192.168.xx.xx",
    "build": "next build",
  },
```
接著重新啟動專案，就可以在手機上輸入 IP 來訪問網站，例如 `192.168.xx.xx:3000`

### 補充
`--hostname={ip}` 的地方，若使用上述的方法，就只能透過這個 ip 來訪問網站。
如果想要用本地地址（如 `127.0.0.1` 或 `localhost` ），可使用 `--hostname=0.0.0.0` ，這樣使用 `127.0.0.1:3000`、
`localhost:3000` 或 `192.168.xx.xx:3000` 就都可以訪問網站了。

## 使用 ngrok
`ngrok` 可以將外界的請求轉發到我們指定的 Port，它會產生一個公共網址，別人就可以透過這個網址來訪問我們 local 的網站。
### 安裝 ngrok
`mac` 可直接使用 `homebrew` 來安裝，使用以下指令：
```
brew install --cask ngrok
```
### 註冊一個帳號並設定 authtoken
到 `ngrok` 官網註冊一個帳號，接著按照指示，在終端機輸入
```
ngrok config add-authtoken {你的authtoken}
```
### 啟動
在終端機輸入 `ngrok http {localhost}`
```
ngrok http http://localhost:3000
```
它會產生一個 url，透過這個 url 訪問 local 網站了