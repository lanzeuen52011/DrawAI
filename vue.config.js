const { defineConfig } = require("@vue/cli-service");
// // 原版
// module.exports = defineConfig({
//   transpileDependencies: true,
// });
//CSS優化
// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/DrawAI/" : "/",
//   transpileDependencies: true,
// };

// // 為了sitemap，"npm install raw-loader --save-dev"
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("xml")
      .test(/\.xml$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
});
