const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { PUBLIC } = require("./path");

module.exports = merge(common, {
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: { directory: PUBLIC },
    port: 12345,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
});
