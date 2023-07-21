const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  productionSourceMap: false,
  pages: {
    index: {
      entry: "src/index.bootstrap.ts", // 打包入口文件
    },
  },
  devServer: {
    port: 8089,
    host: "localhost",
    https: false,
    open: true,
  },
  configureWebpack: (config) => {},
});
