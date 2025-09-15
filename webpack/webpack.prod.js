const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "nosources-source-map", // 맵 배포 + 소스 미포함
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/[name].css",
    }),
  ],
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
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"],
      },
    ],
  },
});
