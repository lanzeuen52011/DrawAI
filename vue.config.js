const { defineConfig } = require("@vue/cli-service");
//原版
module.exports = defineConfig({
  transpileDependencies: true,
});
//CSS優化
// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/DrawAI/" : "/",
//   transpileDependencies: true,
// };
