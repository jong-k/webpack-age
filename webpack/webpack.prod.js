const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "nosources-source-map", // 맵 배포 + 소스 미포함
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: { transform: { react: { development: false } } },
          },
        },
      },
    ],
  },
});
