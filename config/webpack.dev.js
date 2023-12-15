const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    open: true, // 初次打包完成后，自动打开浏览器
    host: "127.0.0.1", //  实时打包所使用的主机地址
    port: 80, //  实时打包所使用的端口号
  },
});
