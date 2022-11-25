#### webpack 專案步驟

1. 輸入指令 npm init, 產生一個 package.json 檔案
   ```
   npm init
   ```
2. 安裝 webpack webpack-cli
   ```
   npm install webpack webpack-cli --save-dev
   ```
3. 新增 webpack.config.js 檔案
4. 在 package.json 加入 npm script 執行語法

#### npm (Node Package Management)

--save-dev 等同於 -D
--save-dev 是指在 development 開發環境時會使用到的套件
--save 是指在 production 正式環境時會使用到的套件

#### path.resolve()

Node.js 語法, 可以將相對路徑或路徑片段解析成絕對路徑

#### \_\_dirname

在 Node.js 裡代表一個全域特殊變數, 指向當前執行文件所在目錄位置

#### 環境變數 NODE_ENV

Node.js 的一個環境變數, 在 webpack 讀取 NODE_ENV 指令使用 process.env.NODE_ENV
Windows 作業系統下必須安裝 cross-env 套件不然會認不得 NODE_ENV, mac 則不需要

```
npm install cross-env --save-dev
```

#### Loader

Loader 是為了讓 webapck 可以去讀取解析 JS 以外的檔案, ex. css-loader

```
npm install css-loader --save-dev
```

#### Plugins

Plugins 就是做 Loader 做不到的事情, ex. 拆分獨立 CSS 檔案

> > webpack4 使用 extract-text-webpack-plugin
> > webpack5 使用 mini-css-extract-plugin

```
npm install mini-css-extract-plugin --save-dev
```

#### PostCSS 與 autoprefixer CSS 瀏覽器相容性

PostCSS 是一個使用 JS 轉換 CSS 的工具
PostCSS 搭配 autoprefixer 加入瀏覽器的 prefix, ex. -webkit-, -moz-, -ms-

```
npm install postcss-loader autoprefixer --save-dev
```

> > 官網建議要新增 postcss.config.js 給 postCSS loader 讀取
> > browserslist 設定可參考 github
> > https://github.com/browserslist/browserslist

#### file-loader

file-loader 當 JS / CSS 要讀取其他檔案類型, 需要透過 file-loader 去辨別搬移檔案, ex. .html 檔案

```
npm install file-loader --save-dev
```

```
// webpack.config.js
// webpack5 使用 file-loader
{
   // 不需要 html-loader, 因為 html 本來就不需要轉換格式
   // file-loader 幫我們做 html 搬移的動作
   test: /\.html$/,
   use: [
      {
         loader: "file-loader",
         options: {
         esModule: false,
         // [路徑][檔名].[副檔名]
         // path 抓到 dist 根目錄
         name: "[path][name].[ext]",
         },
      },
   ],
   type: "javascript/auto",
},
```

webpack5 改使用 Asset Modules

```
// webpack.config.js
 {
    test: /\.html$/,
    type: "asset/resource",
    generator: {
      filename: "[path][name][ext]",
    },
  },
```

#### sass-loader & node-sass

```
npm install sass-loader node-sass --save-dev
```

> > sass-loader: 讓 webpack 認得 sass 檔案
> > node-sass: 透過 Node.js 環境編譯 sass

#### webpack-dev-server

webpack-dev-server 是 webapck 幫我們起一個 local server(類似 live server)
webpack-dev-server 並不會在 dist 產生實體檔案, 而是把 src 資料夾下的檔案預處理編譯存到電腦記憶體裡

```
npm install webpack-dev-server --save-dev
```

加入 npm scripts,

> > webapck4 使用 webpack-dev-server 指令
> > webpack5 使用 webpack serve 指令

```
{
    "scripts": {
        "serve": "webpack serve"
    }
}
```

#### babel

https://babeljs.io/
webpack 編譯高版本 JS 語法, 需要 babel 轉譯器

```
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

> > babel-loader: 轉譯高版本 JS 語法
> > @babel/core: Babel 核心, 程式需要調用 Babel API 進行編譯
> > @babel/preset-env: 使用最新版本的 JS 去編譯, 不用去理會哪些語法需要轉換
> > @babel/preset-env: Babel 默認只轉換語法, 不轉換 API(Map, Set, Promise), 如果要轉換 API 需要 babel-polyfill 配置

useBuiltIns 有三種配置

1. false: 預設是 false, 不對 polyfill 做處理。如果 import @bebel/polyfill, 則無視瀏覽器的配置(.browserslistrc), 會 import 所有 polyfill
2. "entry": 入口文件 import @bebel/polyfill
3. "useage": 根據瀏覽器配置(.browserslistrc)自動判斷用了哪些 API 而會去載入

#### resolve

在 webpack 加上 resolve 物件時, modules 屬性設定引入模塊可以省略路徑, extensions 設定可以省略副檔名
建議除了 .js 以外的副檔名不要設 extensions

#### url-loader

會將過小的圖片轉換成 Base64 格式來使用, 來減少實體檔案載入造成的負擔

```
npm install url-loader --save-dev
```

```
// webpack5 使用 url-loader
{
   test: /\.(jpe?g|png|gif)$/,
   use: [
      {
         loader: "url-loader",
         options: {
         esModule: false,
         limit: 1000 * 1024, // 檔案小於 1000 kb, 會轉成 Base64 資料
         name: "[path][name]_[hash:8].[ext]", // hash 亂數避免瀏覽器快取問題
         },
      },
   ],
   type: "javascript/auto",
},
```

webpack5 改使用 Asset Modules

```
// webpack.config.js
  {
    test: /\.(jpe?g|png|gif)$/,
    type: "asset", // 以前有 limit 限制的 url-loader, 選擇是輸出 data URI 還是輸出一個單獨的文件
    parser: {
      dataUrlCondition: {
        maxSize: 1000 * 1024, // 1000kb
      },
    },
    generator: {
      filename: "[path][name][ext]?[hash:8]",
    },
  },
```

#### CopyWebpackPlugin

用來搬移不需要經過 loader 處理的 plugins, 從一個資料夾搬移到另一個資料夾

```
npm install copy-webpack-plugin --save-dev
```

```
// webpack.config.js
// 載入 CopyWebpackPlugin 模組
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	// 部分省略
plugins: [
        // 加入 plugins 使用
		new CleanWebpackPlugin({
            verbose: true,
         }),
    ],
	// 部分省略
}
```

#### ProvidePlugin

可以讓每支 JS 不用去 import 第三方套件就可以全域取得
原本就在 webpack 裡面的一個功能, 直接抓取模組使用, 常見例子 jquery
非必要盡量不要使用這個做法, 會失去模組化的意義

```
const webpack = require('webpack');

module.exports = {
	// 部分省略
plugins: [
      new webpack.ProvidePlugin({
         $: "jquery",
         jQuery: "jquery",
         "window.jQuery": "jquery",
      }),
    ],
	// 部分省略
}

```

#### HtmlWebPlugin

可以透過模板的方式讓 webpack 幫我們產生 html 檔案

```
npm install html-webpack-plugin --save-dev
```

<%= htmlWebpackPlugin.options.[參數] %> 透過這方式去接收 webpack 帶過來的參數

#### Vendor & Entry

將 node_modules 透過 Vendor.js 獨立出來可以更有效率進行打包, 自己寫的 JS 則是打包在 Entry.js

```
// webpack.config.js
module.exports = {
	// 部分省略
	optimization: {
	    splitChunks: {
	      cacheGroups: {
	        vendor: {
	          test: /node_modules/,
	          name: "vendor",
	          chunks: "initial",
	          enforce: true,
	        },
	      },
	    },
	  },
	// 部分省略
}
```

#### 檔案打包與排除

設置 include / exclude 可以提升一定程度的打包效率
include: 表示哪些目錄中的文件需要進行 loader 轉換
exclude: 表示哪些目錄中的文件不需要進行 loader 轉換

#### local 連線 dev server 的 host 設定

在同個區域網路下手機可以連線測試
在 package.json 加入 npm script 執行語法 --host 192.168.1.12

> > 參考
> > https://www.notion.so/Webpack-24263c885633443ca558cf8b423e73d4
