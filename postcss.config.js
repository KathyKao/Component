module.exports = {
  plugins: [
    require("autoprefixer"),
    // 建議使用 .browserslistrc 檔案來做設定
    // 請包含所有使用率 > 1% 的瀏覽器，並且支援該瀏覽器最新的5個版本
    // require("autoprefixer")({
    //   browsers: [" > 1%", "last 5 versions"],
    // }),
  ],
};
