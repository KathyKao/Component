webpack 筆記:

---------- 建立 webpack 專案步驟 ----------

1. 輸入指令 npm init, 產生一個 package.json 檔案

   > > npm init

2. 安裝 webpack webpack-cli

   > > npm install webpack webpack-cli --save-dev

3. 新增 webpack.config.js 檔案

4. 在 package.json 加入 npm script 執行語法

---------- npm (Node Package Management) ----------
--save-dev 等同於 -D
--save-dev 是指在 development 時會使用到的套件
--save 是指在 production 時會使用到的套件

path.resolve()
Node.js 語法, 可以將相對路徑或路徑片段解析成絕對路徑

\_\_dirname
在 Node.js 裡代表一個全域特殊變數, 指向當前執行文件所在目錄位置

---------- 環境變數 NODE_ENV ----------
Node.js 的一個環境變數, 在 webpack 讀取 NODE_ENV 指令使用 process.env.NODE_ENV
Windows 作業系統下必須安裝 cross-env 套件不然會認不得 NODE_ENV, mac 則不需要

> > npm install cross-env --save-dev

---------- Loader ----------
Loader 是為了讓 webapck 可以去讀取解析 JS 以外的檔案
ex. css-loader

> > npm install css-loader --save-dev

---------- Plugins ----------
Plugins 就是做 Loader 做不到的事情
ex. 拆分獨立 CSS 檔案

---------- 獨立拆分 CSS 檔案 ----------
webpack4 使用 extract-text-webpack-plugin
webpack5 使用 mini-css-extract-plugin

> > npm install mini-css-extract-plugin --save-dev

---------- PostCSS 與 autoprefixer CSS 瀏覽器相容性 ----------
PostCSS 是一個使用 JS 轉換 CSS 的工具
PostCSS 搭配 autoprefixer 加入瀏覽器的 prefix
ex. -webkit-, -moz-, -ms-

> > npm install postcss-loader autoprefixer --save-dev
> > 官網建議要新增 postcss.config.js 給 postCSS loader 讀取
> > browserslist 設定可參考 github
> > https://github.com/browserslist/browserslist

---------- file-loader ----------
file-loader 幫我們做 html 搬移的動作

> > npm install file-loader --save-dev

---------- sass-loader & node-sass ----------

> > npm install sass-loader node-sass --save-dev
> > sass-loader: 讓 webpack 認得 sass 檔案
> > node-sass: 透過 Node.js 環境編譯 sass

---------- webpack-dev-server ---------
webpack-dev-server 是 webapck 幫我們起一個 local server(類似 live server)
webpack-dev-server 並不會在 dist 產生實體檔案, 而是把 src 資料夾下的檔案預處理編譯存到電腦記憶體裡

> > npm install webpack-dev-server --save-dev
> > 加入 npm scripts,
> > webapck4 使用 webpack-dev-server 指令
> > webpack5 使用 webpack serve 指令
> > {
> > "scripts": {

    "serve": "webpack serve"

}
}

---------- babel ----------
https://babeljs.io/
webpack 編譯高版本 JS 語法, 需要 babel 轉譯器

> > npm install babel-loader @babel/core @babel/preset-env --save-dev
> > babel-loader: 轉譯高版本 JS 語法
> > @babel/core: Babel 核心, 程式需要調用 Babel API 進行編譯
> > @babel/preset-env: 使用最新版本的 JS 去編譯, 不用去理會哪些語法需要轉換
> > @babel/preset-env: Babel 默認只轉換語法, 不轉換 API(Map, Set, Promise), 如果要轉換 API 需要開啟 useBuiltIns 配置
> > useBuiltIns 有三種配置
> > false: 預設是 false, 不對 polyfill 做處理。如果 import @bebel/polyfill, 則無視瀏覽器的配置(.browserslistrc), 會 import 所有 polyfill
> > "entry": 入口文件 import @bebel/polyfill
> > "useage": 根據瀏覽器配置(.browserslistrc)自動判斷用了哪些 API 而會去載入

webpack.config.js 加入 loader 語法
{
test: /\.js$/,
exclude: /node_modules/, // 排除 node_modules 底下資料夾
use: "babel-loader",
},

新增 babel.config.json 檔案, 調用 @babel/preset-env plugin
{
"presets": ["@babel/preset-env"]
}

---------- resolve ----------
在 webpack 加上 resolve 物件時, modules 屬性設定引入模塊可以省略路徑, extensions 設定可以省略副檔名
建議除了 .js 以外的副檔名不要設 extensions
