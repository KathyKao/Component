const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, "./src"), // 用來統一定義 entry 資料夾
  entry: {
    index: "./js/index.js",
    //about: "./js/about.js",
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
  module: {
    rules: [
      {
        // 不需要 html-loader, 因為 html 本來就不需要轉換格式
        // file-loader 幫我們做 html 搬移的動作
        test: /\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // [路徑][檔名].[副檔名]
              // path 抓到 dist 根目錄
              name: "[path][name].[ext]",
            },
          },
        ],
      },
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
