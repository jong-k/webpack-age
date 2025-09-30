const { merge } = require("webpack-merge");
const dotenv = require("dotenv");
dotenv.config();
const common = require("./webpack.common");
const { PUBLIC } = require("./path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  devtool: "eval-cheap-module-source-map",
  output: {
    devtoolModuleFilenameTemplate: "webpack://[namespace]/[resource-path]",
    devtoolNamespace: "webpack-age",
  },
  devServer: {
    static: { directory: PUBLIC },
    port: 12345,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              transform: {
                react: { development: true, refresh: true },
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }, "postcss-loader"],
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
