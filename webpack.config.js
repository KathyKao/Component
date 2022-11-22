const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, "./src"), // 用來統一定義 entry 資料夾
  entry: {
    index: "./js/index.js",
    about: "./js/about.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"), // 預設就是 dist 資料夾
    filename: "./js/[name].js", // [name] 會依照 entry 的 Object(Key) 來更改 output
  },
  devServer: {
    compress: true,
    port: 3000,
    // hot: true, // 預設 HMR 就是 true
  },
  resolve: {
    modules: [
      path.resolve("src"),
      path.resolve("src/js"),
      path.resolve("src/js/object"),
      path.resolve("src/scss"),
      path.resolve("src/images"),
      path.resolve("node_modules"),
    ],
    extensions: [".js"],
  },
  module: {
    rules: [
      // webpack5 改使用 asset module
      {
        test: /\.html$/,
        type: "asset/resource",
        generator: {
          filename: "[path][name][ext]",
        },
      },
      // webpack4 寫法
      // {
      //   // 不需要 html-loader, 因為 html 本來就不需要轉換格式
      //   // file-loader 幫我們做 html 搬移的動作
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         // [路徑][檔名].[副檔名]
      //         // path 抓到 dist 根目錄
      //         name: "[path][name].[ext]",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // Loader 執行順序是從後面依序執行到前面
      },
      {
        test: /\.(sass|scss)$/,

        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 底下資料夾
        use: "babel-loader",
      },
      // // webpack5 改使用 asset module
      // {
      //   test: /\.(jpe?g|png|gif)$/,
      //   type: "asset/inline", // 以前的 url-loader, 輸出的資源 data URI 以 base64 格式輸出
      // },
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
      // // webpack4 寫法
      // {
      //   test: /\.(jpe?g|png|gif)$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8192, // 檔案小於 8192 kb, 會轉成 base64 資料
      //         name: "[path][name].[ext]?[hash:8]", // hash 亂數避免瀏覽器快取問題
      //       },
      //     },
      //   ],
      //   type: "javascript/auto",
      // },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    //   "window.jQuery": "jquery",
    //   "window.$": "jquery",
    // }),
  ],
};
