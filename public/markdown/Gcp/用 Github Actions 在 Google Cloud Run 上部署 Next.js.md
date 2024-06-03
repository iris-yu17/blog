## 前言

### Cloud Run 是什麼？

是Google Cloud 的 Serverless 服務之一。

讓使用者僅需透過簡單的指令或 Console 介面即可直接在 Google Cloud 上開發及快速部署具備高擴充性的容器化應用程式及管理服務。

必須將程式包裝成 Container image ，才能夠部署至 Cloud Run。

### Docker 是什麼?

為了將程式包裝成 Container image，我們會使用 Docker。
Docker 是個輕量級的虛擬化技術，可以把你的應用程式連同環境一起打包，部屬的時候就不用再擔心環境的問題。

## - step1. 把我們的 Next.js 應用程式 Docker 化

### 1. 在我們的 Next.js 專案裡創建一個 Dockerfile

簡單的內容配置如下

```dockerfile=
#指定使用 Node.js 18.17.0 版本
FROM node:18.17.0

#設定工作目錄為 /app，表示之後的命令將在這個目錄下執行
WORKDIR /app

#安裝相依套件
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean

#將本地目錄下的所有檔案複製到容器的 /app 目錄中
COPY . .

#在容器中執行 yarn build 命令
RUN yarn build

#使用 3000 port
EXPOSE 3000

#設定容器啟動時執行的預設命令為 yarn start
CMD [ "yarn", "start" ]
```

![Imgur](https://i.imgur.com/4Yvedna.png)

### 2. 再來我們要確認是否 container 可以在本地正常運行

使用以下指令來創建一個映像 (image)

```
docker build -f Dockerfile -t <專案名稱> .
```

使用以下指令來運行一個基於剛剛創建的映像的容器 (container)

```
docker run -i -p 3000:3000 <專案名稱>
```

然後到 `http://localhost:3000/` 看看程式是否正常運行

## - step2. 配置 Google Cloud

### 1. 創建一個專案

到這個連結 [https://console.cloud.google.com/projectcreate](https://console.cloud.google.com/projectcreate)
輸入專案名稱，這邊使用 `cloud-run-demo`

![Imgur](https://i.imgur.com/T9MCi4e.png)

### 2. 創建一個服務帳戶

這是要用在 `Github Actions` 的
IAM 管理 > 服務帳戶 > 建立服務帳戶

![Imgur](https://i.imgur.com/f1XoPBl.png)

![Imgur](https://i.imgur.com/KsH25PI.png)

### 3.依序填入三個步驟

![Imgur](https://i.imgur.com/2iivD2x.png)

### 4.再來要創建一個金鑰

這個金鑰是用於跑 `Github Actions` 時認證身分的
點擊管理金鑰
![Imgur](https://i.imgur.com/xEidy9a.png)

點擊建立新的金鑰，會跳出一個彈窗，選擇 `JSON` ，會下載一個金鑰的 `JSON` 檔
![Imgur](https://i.imgur.com/eMkquGA.png)

## -step3. 更新 `package.json` 的 `Scripts`

執行 `start` 時，需要從 `cloud run` 接收一個 PORT

```j=
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p $PORT" // <-- update here
},
```

補充：改成這樣後想在本地端執行的話，可用以下指令

```
PORT=3000 npm start
```

## -step4. 配置 `Github Actions`

### 1. 創建 `cloud-run.yml`

.github > workflows > cloud-run.yml

![Imgur](https://i.imgur.com/bt4Rbj5.png)

`cloud-run.yml` 內容如下

```=
name: nextjs-cloud-run

# 工作流程將在將代碼推送到 master 或 main 分支時觸發。
on:
  push:
    branches:
      - master
      - main

# 定義環境變數，用於設定 Cloud Run 相關的項目
env:
  CLOUD_RUN_PROJECT_ID: ${{ secrets.CLOUD_RUN_PROJECT_NAME }}
  CLOUD_RUN_REGION: asia-northeast1
  # 自行填入專案名稱
  REPO_NAME: cloud-run-demo

# 定義了一個名為 build-and-deploy 的工作，這個工作將運行在 ubuntu-latest 環境上。
jobs:
  build-and-deploy:
    name: Setup, Build, and Deploy
    runs-on: ubuntu-latest
    steps:

    # 步驟：從 GitHub 倉庫中檢出代碼。
    - name: Checkout
      uses: actions/checkout@v2

    # 步驟：使用 Google Cloud Actions 設置 gcloud 並驗證服務帳戶。
    - uses: google-github-actions/setup-gcloud@v0.2.0
      with:
        project_id: ${{ secrets.CLOUD_RUN_PROJECT_NAME }}
        service_account_key: ${{ secrets.CLOUD_RUN_SERVICE_ACCOUNT }}
        service_account_email: ${{ secrets.CLOUD_RUN_SERVICE_ACCOUNT_EMAIL }}

    # 步驟：啟用 Container Registry 和 Cloud Run API，並設置 Docker 認證。
    - name: Enable the necessary APIs and enable docker auth
      run: |-
        gcloud services enable containerregistry.googleapis.com
        gcloud services enable run.googleapis.com
        gcloud --quiet auth configure-docker

    # 構建映像，並為鏡像添加標籤。
    - name: Build and tag image
      run: |-
        docker build . --tag "gcr.io/$CLOUD_RUN_PROJECT_ID/$REPO_NAME:$GITHUB_SHA"

    # 將映像推送到 Google Container Registry。
    - name: Push image to GCR
      run: |-
        docker push gcr.io/$CLOUD_RUN_PROJECT_ID/$REPO_NAME:$GITHUB_SHA

    # 部署
    - name: Deploy
      run: |-
        gcloud components install beta --quiet
        gcloud beta run deploy $REPO_NAME --image gcr.io/$CLOUD_RUN_PROJECT_ID/$REPO_NAME:$GITHUB_SHA \
          --project $CLOUD_RUN_PROJECT_ID \
          --platform managed \
          --region $CLOUD_RUN_REGION \
          --allow-unauthenticated \
          --quiet
```

### 2. 設定 `secrets`

在 `cloud-run.yml` 中可以看到有些 `secrets`，例如 `${{ secrets.CLOUD_RUN_PROJECT_NAME }}` ，我們要在 Github 的 Action Secrets 來做設定。
![Imgur](https://i.imgur.com/giqaKoH.png)

- Secrets:
  - `CLOUD_RUN_PROJECT_NAME`: 專案的 ID
  - `CLOUD_RUN_SERVICE_ACCOUNT` — 這是 base64 編碼的私鑰。我們要把剛剛下載的 `JSON` 檔轉為 base64 編碼並貼上。
    在 `macOS` ，可以直接這樣：
    `    base64 <存放JSON檔的路徑>`
  - `CLOUD_RUN_SERVICE_ACCOUNT_EMAIL`：服務帳戶的 EMAIL
    ![Imgur](https://i.imgur.com/7os5XPw.png)

## - step5. Push code 至 Github 就完成了 🎉

---

參考資料：

- https://larrylu.blog/step-by-step-dockerize-your-app-ecd8940696f4
- https://medium.com/weekly-webtips/this-is-how-i-deploy-next-js-into-google-cloud-run-with-github-actions-1d7d2de9d203
