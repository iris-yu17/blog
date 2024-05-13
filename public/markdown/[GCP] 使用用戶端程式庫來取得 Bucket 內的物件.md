> 這篇文章是使用 node.js

官方文件：https://cloud.google.com/storage/docs/samples/storage-list-files?hl=en#storage_list_files-nodejs

## - Step1. 設置授權
- 首先，需要先到 IAM 管理的服務帳戶設置授權，詳細步驟可參考 [這篇](https://hackmd.io/@iris-yu17/deploy-project-on-gcp) 的 step2-2
- **一樣點擊建立新的金鑰後**，會下載一個金鑰的 JSON 檔

## - Step2. 建立 `node.js` 專案並配置授權
1. 建立 `node.js` 專案
```
npm init
```

2. 安裝用戶端程式庫
```
npm install --save @google-cloud/storage
```
3. 設置授權
記得剛剛的 `json` 檔嗎？
我們要在終端機輸入以下代碼，`"[PATH]"` 要替換為剛剛存放 `json`金鑰的位置
```
export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"
```
## - Step3. 列出 bucket 裡的物件
```javascript=1
// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');
// Creates a client
const storage = new Storage();

// 帶入自己的 bucket 名稱
const bucketName = 'your_bucket_name';

async function listFiles() {
  // Lists files in the bucket
  const [files] = await storage.bucket(bucketName).getFiles();

  console.log('Files:');
  files.forEach(file => {
    console.log(file.name);
  });
}

listFiles().catch(console.error);
```

## 完成 🎉